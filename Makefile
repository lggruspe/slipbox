.PHONY:	all
all:

.PHONY:	bundle
bundle:
	npx rollup -c

.PHONY:	check
check: bundle
	cd slipbox; cat filters/*.test.lua | lua
	cd slipbox; pytest --cov=. --cov-fail-under=80 --cov-report=term-missing --cov-branch
	pylint slipbox --fail-under=9
	@echo "Yay!"

.PHONY:	dist
dist:	bundle check
	python setup.py sdist bdist_wheel
	twine upload dist/*
