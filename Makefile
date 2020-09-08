.PHONY:	all
all:

.PHONY:	init
init:
	npm ci
	pip install -r requirements.txt

.PHONY:	build
build:
	npm run build

.PHONY:	bundle
bundle: build
	npx rollup -c rollup.config.frontend.js
	npx rollup -c rollup.config.filters.js --banner '#!/usr/bin/env node'

.PHONY:	check
check: bundle
	npx eslint test --global describe --global it --global beforeEach --rule 'no-unused-vars: 0'
	npm run lint
	npm test
	pylint slipbox --fail-under=10 -d R0903 -d W0621
	mypy -p slipbox
	cd slipbox; pytest --cov=. --cov-fail-under=90 --cov-report=term-missing --cov-branch
	@echo "Yay!"

.PHONY:	docs
docs:	bundle
	python -m slipbox -s docs/docs.db -P docs/*.md \
		-c ' --bibliography docs/tutorial.bib' \
		-d ' -o docs/index.html -c basic.css'

.PHONY:	dist
dist:	bundle check
	python setup.py sdist bdist_wheel
	twine upload dist/*
