.PHONY:	all
all:

.PHONY:	init
init:
	npm ci
	pip install -r requirements.txt

.PHONY:	bundle
bundle:
	npm run bundle

.PHONY:	check
check: bundle
	luacheck slipbox/filters/*.lua --globals describe it assert pandoc before_each
	cd slipbox; busted . -p '.*.test.lua'
	npx eslint test --global describe --global it --global beforeEach --rule 'no-unused-vars: 0'
	npm run lint
	npm test
	pylint slipbox --fail-under=10 -d R0903
	cd slipbox; pytest --cov=. --cov-fail-under=80 --cov-report=term-missing --cov-branch
	@echo "Yay!"

.PHONY:	docs
docs:	bundle
	python -m slipbox docs/docs.db docs/tutorial.md \
		-c ' --bibliography docs/tutorial.bib' \
		-d ' -o docs/index.html -c basic.css'

.PHONY:	dist
dist:	bundle check
	python setup.py sdist bdist_wheel
	twine upload dist/*
