PANDOC_VERSION = 2.17
PYTHON_VERSION = 3.8
DOCKER = $(shell command -v podman || command -v docker)
DOCKER_IMAGE = slipbox-test-pandoc$(PANDOC_VERSION)-python$(PYTHON_VERSION)

.PHONY:	all
all:
	@echo "Some valid targets:"
	@echo "> init - Initialize dev requirements."
	@echo "> check-js - Run JS tests."
	@echo "> check-lua - Run lua tests."
	@echo "> check - Run all tests."
	@echo "> docs - Generate docs."
	@echo "> dist - Release slipbox."
	@echo "> lint - Run python linters."
	@echo "> test - Run python tests."
	@echo "> docker - Run tests in Docker. (PYTHON_VERSION=$(PYTHON_VERSION), PANDOC_VERSION=$(PANDOC_VERSION))"

# Initialize dev requirements.
.PHONY:	init
init:	init-js init-lua init-python
	pip install --upgrade pip wheel
	pip install -r requirements/dev.requirements.txt

.PHONY:	init-js
init-js:
	cd js; npm ci

.PHONY:	init-lua
init-lua:
	cd filters; lua scripts/init.lua

.PHONY:	init-python
init-python:
	pip install --upgrade pip wheel
	pip install -r requirements/dev.requirements.txt

# Run JS tests.
.PHONY:	check-js
check-js:
	cd js; npm run check && npm test

# Run lua tests.
.PHONY:	check-lua
check-lua:
	cd filters; lua scripts/check.lua

# Build Lua filters.
.PHONY:	bundle-lua
bundle-lua:	check-lua
	cd filters; lua scripts/bundle.lua

# Copy JS and Lua filters into slipbox/
.PHONY:	bundle
bundle:	check-js bundle-lua
	cd js; npm run build
	mkdir -p slipbox/data
	cp -r js/dist/* slipbox/data
	cp filters/build/filter.lua slipbox/data

# Run python linters.
.PHONY:	lint
lint:
	flake8 setup.py slipbox tests --max-complexity=6
	pylint setup.py slipbox tests --fail-under=10 -d R0903,C0415,W0621
	mypy setup.py slipbox tests --strict

# Run python tests.
.PHONY:	test
test:
	pytest --cov=slipbox --cov=tests --cov-fail-under=90 --cov-report=term-missing --cov-branch --verbose

# Run all tests.
.PHONY:	check
check: lint test

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

.PHONY:	docker
docker:
	$(DOCKER) build -t $(DOCKER_IMAGE) --build-arg PANDOC_VERSION=$(PANDOC_VERSION) --build-arg PYTHON_VERSION=$(PYTHON_VERSION) .
	$(DOCKER) run $(DOCKER_IMAGE)
