.PHONY:	all
all:
	@echo "Some valid targets:"
	@echo "> init - Initialize project."
	@echo "> check-js - Run JS tests."
	@echo "> check-lua - Run lua tests."
	@echo "> check - Run python tests."
	@echo "> docs - Generate docs."
	@echo "> dist - Release slipbox."

# Initialize project.
.PHONY:	init
init:
	cd js; npm ci
	pip install --upgrade pip wheel
	cd cli; pip install -r requirements.txt

# Run JS tests.
.PHONY:	check-js
check-js:
	cd js; npm run lint; npm test

# Run lua tests.
.PHONY:	check-lua
check-lua:
	cd filters; luacheck src/*.lua --std max+busted
	cd filters; busted src -p '.*.test.lua'

# Build Lua filters.
.PHONY:	build-lua
build-lua:	check-lua
	mkdir -p filters/build
	cd filters; \
		eval `luarocks path`; \
		amalg.lua src.csv src.filters src.log src.slipbox src.utils src.metadata \
			-s src/zk.lua -o build/filter.lua

# Copy JS and Lua filters into slipbox/
.PHONY:	bundle
bundle:	check-js build-lua
	cd js; npm run bundle; npm run minify
	mkdir -p cli/slipbox/data
	cp js/dist/app.min.js cli/slipbox/data/app.js
	cp filters/build/filter.lua cli/slipbox/data

# Run python tests.
.PHONY:	check
check: bundle
	cd cli; flake8 slipbox --max-complexity=10
	cd cli; pylint slipbox --fail-under=10 -d R0903,C0415
	cd cli; mypy -p slipbox
	cd cli; cd slipbox; pytest --cov=. --cov-fail-under=90 --cov-report=term-missing --cov-branch --verbose

# Generate docs.
.PHONY:	docs
docs:	bundle
	cd docs-src; rm -rf .slipbox \
	cd docs-src; PYTHONPATH=../cli python -m slipbox init \
		--content_options "--bibliography example.bib --citeproc" \
		--document_options " -s" \
		--output_directory '../docs'
	cd docs-src; PYTHONPATH=../cli python -m slipbox build

# Generate examples.
.PHONY:	examples
examples:
	cd examples; rm -rf .slipbox \
	cd examples; PYTHONPATH=../cli python -m slipbox init
	cd examples; PYTHONPATH=../cli python -m slipbox build

# Release slipbox.
.PHONY:	dist
dist:	bundle check
	cd cli; python setup.py sdist bdist_wheel
	cd cli; twine upload dist/*
