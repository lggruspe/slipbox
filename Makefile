PANDOC_VERSION = 2.17
PYTHON_VERSION = 3.7
DOCKER_IMAGE = slipbox-test-pandoc$(PANDOC_VERSION)-python$(PYTHON_VERSION)

.PHONY:	all init init-lua check-js check-lua build-lua bundle check docs examples dist
.PHONY:	lint test

all:
	@echo "Some valid targets:"
	@echo "> init - Initialize project."
	@echo "> init-lua - Initialize lua dev requirements."
	@echo "> check-js - Run JS tests."
	@echo "> check-lua - Run lua tests."
	@echo "> check - Run all tests."
	@echo "> docs - Generate docs."
	@echo "> dist - Release slipbox."
	@echo "> lint - Run python linters."
	@echo "> test - Run python tests."
	@echo "> docker - Run tests in Docker. (PYTHON_VERSION=$(PYTHON_VERSION), PANDOC_VERSION=$(PANDOC_VERSION))"

# Initialize project.
init:
	cd js; npm ci
	pip install --upgrade pip wheel
	pip install -r requirements/dev.requirements.txt

# Initialize lua dev requirements.
init-lua:
	luarocks install amalg
	luarocks install busted
	luarocks install luacheck

# Run JS tests.
check-js:
	cd js; npm run check && npm test

# Run lua tests.
check-lua:
	cd filters; luacheck src/*.lua --std max+busted
	cd filters; busted src -p '.*.test.lua'

# Build Lua filters.
build-lua:	check-lua
	mkdir -p filters/build
	cd filters; \
		amalg.lua src.csv src.filters src.links src.log src.slipbox src.utils src.metadata \
			-s src/zk.lua -o build/filter.lua

# Copy JS and Lua filters into slipbox/
bundle:	check-js build-lua
	cd js; npm run build
	mkdir -p slipbox/data
	cp -r js/dist/* slipbox/data
	cp filters/build/filter.lua slipbox/data

# Run python linters.
lint:
	flake8 setup.py slipbox tests --max-complexity=6
	pylint setup.py slipbox tests --fail-under=10 -d R0903,C0415,W0621
	mypy setup.py slipbox tests --strict

# Run python tests.
test:
	pytest --cov=slipbox --cov=tests --cov-fail-under=90 --cov-report=term-missing --cov-branch --verbose

# Run all tests.
check: lint test

# Generate docs.
docs:	bundle
	cd docs-src; rm -rf .slipbox
	cd docs-src; PYTHONPATH=.. python -m slipbox init
	cd docs-src; cp slipbox.cfg .slipbox/config.cfg
	cd docs-src; PYTHONPATH=.. python -m slipbox build

# Generate examples.
examples:
	cd examples; rm -rf .slipbox
	cd examples; PYTHONPATH=.. python -m slipbox init
	cd examples; PYTHONPATH=.. python -m slipbox build

# Release slipbox.
dist:	bundle check
	python setup.py sdist bdist_wheel

docker:
	docker build -t $(DOCKER_IMAGE) --build-arg PANDOC_VERSION=$(PANDOC_VERSION) --build-arg PYTHON_VERSION=$(PYTHON_VERSION) .
	docker run $(DOCKER_IMAGE)
