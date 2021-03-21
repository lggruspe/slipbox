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
	luacheck filters/*.lua --std max+busted
	busted . -p '.*.test.lua'

# Copy JS and Lua filters into slipbox/
.PHONY:	bundle
bundle:	check-js check-lua
	cd js; npm run bundle; npm run minify
	mkdir -p cli/slipbox/data
	cp js/dist/app.min.js cli/slipbox/data/app.js
	cp -r filters cli/slipbox

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
	cd docs; rm -rf .slipbox \
	cd docs; PYTHONPATH=../cli python -m slipbox init \
		--content_options "--bibliography example.bib --citeproc" \
		--document_options " -s"
	cd docs; PYTHONPATH=../cli python -m slipbox build

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
