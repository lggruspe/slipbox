PANDOC_VERSION = 2.17
PYTHON_VERSION = 3.8
DOCKER = $(shell command -v podman || command -v docker)
DOCKER_IMAGE = slipbox-test-pandoc$(PANDOC_VERSION)-python$(PYTHON_VERSION)

.PHONY:	all
all:
	@echo "Some valid targets:"
	@echo "> init - Initialize dev requirements."
	@echo "> check - Run tests and linters."
	@echo "> lint - Run python linters."
	@echo "> test - Run python tests."
	@echo "> docs - Generate docs."
	@echo "> dist - Release slipbox."
	@echo "> docker - Run tests in Docker. (PYTHON_VERSION=$(PYTHON_VERSION), PANDOC_VERSION=$(PANDOC_VERSION))"

# Initialize dev requirements.
.PHONY:	init
init:	init-js init-lua init-python

.PHONY:	init-js
init-js:
	cd js; npm ci

.PHONY:	init-lua
init-lua:
	cd filters; luarocks init; luarocks test --prepare

.PHONY:	init-python
init-python:
	pip install --upgrade pip wheel
	pip install -r requirements/dev.requirements.txt

# Run tests and linters.
.PHONY:	check
check: check-js check-lua check-python

.PHONY:	check-js
check-js:
	cd js; npm run check && npm test

.PHONY:	check-lua
check-lua:
	cd filters; luarocks test

.PHONY:	check-python
check-python:	lint test

# Run python linters
.PHONY:	lint
lint:
	flake8 setup.py slipbox tests --max-complexity=16
	pylint setup.py slipbox tests --fail-under=10 -d R0903,W0621
	mypy setup.py slipbox tests --strict

# Run python tests
.PHONY:	test
test:
	tox -e py311

# Copy JS and Lua filters into slipbox/
.PHONY:	bundle
bundle:	check-js bundle-lua
	cd js; npm run build
	mkdir -p slipbox/data
	cp -r js/dist/* slipbox/data
	cp filters/build/filter.lua slipbox/data
	cp data/* slipbox/data

# Build Lua filters.
.PHONY:	bundle-lua
bundle-lua:	check-lua
	cd filters; lua scripts/bundle.lua

# Generate docs.
.PHONY:	docs
docs:	bundle
	cd docs-src; rm -rf .slipbox
	cd docs-src; PYTHONPATH=.. python -m slipbox init slipbox.cfg
	cd docs-src; PYTHONPATH=.. python -m slipbox build

# Generate examples.
.PHONY:	examples
examples:
	cd examples; rm -rf .slipbox
	cd examples; PYTHONPATH=.. python -m slipbox init
	cd examples; PYTHONPATH=.. python -m slipbox build

# Release slipbox.
.PHONY:	dist
dist:	bundle check
	python setup.py sdist bdist_wheel

# Run tests in docker.
.PHONY:	docker
docker:
	$(DOCKER) build -t $(DOCKER_IMAGE) --build-arg PANDOC_VERSION=$(PANDOC_VERSION) --build-arg PYTHON_VERSION=$(PYTHON_VERSION) .
	$(DOCKER) run $(DOCKER_IMAGE)
