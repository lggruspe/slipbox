.PHONY:	all
all:

.PHONY:	init
init:
	cd frontend; npm ci
	pip install --upgrade pip
	cd cli; pip install -r requirements.txt

.PHONY:	bundle
bundle:
	cd frontend; npm run bundle
	mkdir -p cli/slipbox/data
	cp frontend/dist/frontend.js cli/slipbox/data
	cp -r filters cli/slipbox

.PHONY:	check
check: bundle
	luacheck filters/*.lua --std max+busted
	busted . -p '.*.test.lua'
	cd frontend; npx eslint test --global describe --global it --global beforeEach --rule "no-unused-vars: 0"
	cd frontend; npm run lint
	cd frontend; npm test
	# cd cli; pylint slipbox --fail-under=10 -d R0903 -d W0621 -d C0415
	cd cli; mypy -p slipbox
	cd cli; cd slipbox; pytest --cov=. --cov-fail-under=90 --cov-report=term-missing --cov-branch -x --verbose
	@echo "Yay!"

.PHONY:	docs
docs:	bundle
	cd docs; rm -rf .slipbox \
	cd docs; PYTHONPATH=../cli python -m slipbox init \
		-c "--bibliography example.bib --citeproc" \
		-d "-o index.html -s"
	cd docs; PYTHONPATH=../cli python -m slipbox build

.PHONY:	dist
dist:	bundle check
	cd cli; python setup.py sdist bdist_wheel
	cd cli; twine upload dist/*
