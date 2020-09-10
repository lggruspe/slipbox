.PHONY:	all
all:

.PHONY:	init
init:
	cd filters; npm ci
	cd frontend; npm ci
	cd cli; pip install -r requirements.txt

.PHONY:	build
build:
	cd filters; npm run build

.PHONY:	bundle
bundle: build
	cd frontend; npm run bundle
	cd filters; npm run bundle
	mkdir -p cli/slipbox/data
	cp frontend/dist/frontend.js filters/dist/filter.js cli/slipbox/data
	chmod +x cli/slipbox/data/filter.js

.PHONY:	check
check: bundle
	cd frontend; npx eslint test --global describe --global it --global beforeEach --rule 'no-unused-vars: 0'
	cd frontend; npm run lint
	cd filters; npm run lint
	cd frontend; npm test
	cd cli; pylint slipbox --fail-under=10 -d R0903 -d W0621
	cd cli; mypy -p slipbox
	cd cli; cd slipbox; pytest --cov=. --cov-fail-under=90 --cov-report=term-missing --cov-branch -x --verbose
	@echo "Yay!"

.PHONY:	docs
docs:	bundle
	PYTHONPATH=cli python -m slipbox -s docs/docs.db -P docs/*.md \
		-c ' --bibliography docs/tutorial.bib' \
		-d ' -o docs/index.html -c basic.css'

.PHONY:	dist
dist:	bundle check
	cd cli; python setup.py sdist bdist_wheel
	cd cli; twine upload dist/*
