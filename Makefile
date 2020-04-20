SOURCES = $(shell find -name "*.md")
TARGETS = $(SOURCES:./%.md=%.html)
ZETTEL_BIB = zettel.bib
ZETTEL_CSS = zettel.css
ZETTEL_DB = zettel.db.sqlite3
ZETTEL_FILTER = "$(shell python3 -m filterdir)/zettel-compile.lua"

.PHONY:	all
all:	$(TARGETS)

$(TARGETS):	%.html:	%.md | $(ZETTEL_BIB) $(ZETTEL_DB)
	@pandoc -s $< -o $@ --bibliography=$(ZETTEL_BIB) \
		--lua-filter=$(ZETTEL_FILTER) --filter=pandoc-citeproc \
		--metadata=basedir:"$$(pwd)" --metadata=database:$(ZETTEL_DB) \
		--metadata=relpath:$< -c $$(python3 -m relpar $(ZETTEL_CSS) $<)

.PHONY:	scan
scan:
	python3 -m scan

.PHONY:	clean
clean:
	find -name "*.html" -delete
