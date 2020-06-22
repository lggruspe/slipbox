FROM pandoc/core:latest
RUN apk --no-cache add python3 graphviz
RUN python3 -m pip install --upgrade pip
RUN python3 -m pip install slipbox
