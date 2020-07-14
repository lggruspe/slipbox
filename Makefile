.PHONY:	all
all:

.PHONY:	check
check:
	cd slipbox; cat filters/*.test.lua | lua
	cd slipbox; pytest --cov=. --cov-fail-under=80 --cov-report=term-missing --cov-branch
	pylint slipbox --fail-under=9
	@echo "Yay!"

.PHONY:	bundle
bundle:
	npx rollup -c
