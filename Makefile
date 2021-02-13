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
	cd frontend; npm ci
	pip install --upgrade pip wheel
	cd cli; pip install -r requirements.txt

# Run JS tests.
.PHONY:	check-js
check-js:
	cd frontend; npm run lint; npm test

# Run lua tests.
.PHONY:	check-lua
check-lua:
	luacheck filters/*.lua --std max+busted
	busted . -p '.*.test.lua'

# Copy JS and Lua filters into slipbox/
.PHONY:	bundle
bundle:	check-js check-lua
	cd frontend; npm run bundle; npm run minify
	mkdir -p cli/slipbox/data
	cp frontend/dist/frontend.min.js cli/slipbox/data/frontend.js
	cp -r filters cli/slipbox

# Run python tests.
.PHONY:	check
check: bundle
	cd cli; flake8 slipbox --max-complexity=10
	cd cli; pylint slipbox --fail-under=10 -d R0903,W0621,C0415,E1136,C0103
	cd cli; mypy -p slipbox
	cd cli; cd slipbox; pytest --cov=. --cov-fail-under=90 --cov-report=term-missing --cov-branch -x --verbose

# Generate docs.
.PHONY:	docs
docs:	bundle
	cd docs; rm -rf .slipbox \
	cd docs; PYTHONPATH=../cli python -m slipbox init \
		--content_options "--bibliography example.bib --citeproc" \
		--document_options "-o index.html -s"
	cd docs; PYTHONPATH=../cli python -m slipbox build

# Release slipbox.
.PHONY:	dist
dist:	bundle check
	cd cli; python setup.py sdist bdist_wheel
	cd cli; twine upload dist/*
