python3 -m slipbox docs.db tutorial.md -c ' --bibliography tutorial.bib' -d ' -o index.html -c basic.css'
python3 -m slipbox.graph docs.db -d -s -b -o tutorial.dot
dot tutorial.dot -Tpng -o tutorial.png
