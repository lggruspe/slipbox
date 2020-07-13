all:	index.html

.PHONY:	index.html
index.html:
	PYTHONPATH=.. python -m slipbox docs.db tutorial.md \
		   -c ' --bibliography tutorial.bib' \
		   -d ' -o index.html -c basic.css'

.PHONY:	clean
clean:
	rm -rf index.html
