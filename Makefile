PYTHON_VERSION = 3.7

.PHONY:	all init check-js check-lua build-lua bundle check docs examples dist
.PHONY:	lint test

all:
	@echo "Some valid targets:"
	@echo "> init - Initialize project."
	@echo "> check-js - Run JS tests."
	@echo "> check-lua - Run lua tests."
	@echo "> check - Run all tests."
	@echo "> docs - Generate docs."
	@echo "> dist - Release slipbox."
	@echo "> lint - Run python linters."
	@echo "> test - Run python tests."
	@echo "> docker - Run tests in Docker. (PYTHON_VERSION=$(PYTHON_VERSION))"

# Initialize project.
init:
	cd js; npm ci
	pip install --upgrade pip wheel
	cd cli; pip install -r requirements.txt

# Run JS tests.
check-js:
	cd js; npm run lint && npm test

# Run lua tests.
check-lua:
	cd filters; luacheck src/*.lua --std max+busted
	cd filters; busted src -p '.*.test.lua'

# Build Lua filters.
build-lua:	check-lua
	mkdir -p filters/build
	cd filters; \
		eval `luarocks path`; \
		amalg.lua src.csv src.filters src.log src.slipbox src.utils src.metadata \
			-s src/zk.lua -o build/filter.lua

# Copy JS and Lua filters into slipbox/
bundle:	check-js build-lua
	cd js; npm run bundle; npm run minify
	mkdir -p cli/slipbox/data
	cp js/dist/app.min.js cli/slipbox/data/app.js
	cp filters/build/filter.lua cli/slipbox/data

# Run python linters.
lint:
	cd cli; flake8 slipbox tests --max-complexity=10
	cd cli; pylint slipbox tests --fail-under=10 -d R0903,C0415
	cd cli; mypy slipbox tests --strict

# Run python tests.
test:
	cd cli; pytest --cov=slipbox --cov=tests --cov-fail-under=90 --cov-report=term-missing --cov-branch --verbose

# Run all tests.
check: lint test

# Generate docs.
docs:	bundle
	cd docs-src; rm -rf .slipbox
	cd docs-src; PYTHONPATH=../cli python -m slipbox init \
		--content_options " --bibliography example.bib --citeproc" \
		--document_options " -s" \
		--output_directory '../docs'
	cd docs-src; PYTHONPATH=../cli python -m slipbox build

# Generate examples.
examples:
	cd examples; rm -rf .slipbox
	cd examples; PYTHONPATH=../cli python -m slipbox init
	cd examples; PYTHONPATH=../cli python -m slipbox build

# Release slipbox.
dist:	bundle check
	cd cli; python setup.py sdist bdist_wheel

docker:
	docker build -t slipbox-test --build-arg PYTHON_IMAGE=python:$(PYTHON_VERSION)-alpine .
	docker run slipbox-test
