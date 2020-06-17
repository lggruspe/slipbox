.PHONY:	example.html
example.html:
	PYTHONPATH=.. python -m slipbox example.db notes -d ' -o example.html -c basic.css' -p '*.md' '*.html' '*.rst' '*.tex'

.PHONY:	clean
clean:
	rm -rf example.html example.db
