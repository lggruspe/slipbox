all:	index.html tutorial.png

.PHONY:	index.html
index.html:
	PYTHONPATH=.. python -m slipbox docs.db tutorial.md \
		   -c ' --bibliography tutorial.bib' \
		   -d ' -o index.html -c basic.css --bibliography tutorial.bib'

.PHONY:	tutorial.png
tutorial.png:	index.html
	PYTHONPATH=.. python -m slipbox.graph docs.db -d -s -b -o tutorial.dot
	dot tutorial.dot -Tpng -o tutorial.png

.PHONY:	clean
clean:
	rm -rf index.html tutorial.png tutorial.dot
