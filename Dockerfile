# Dockerfile for testing
ARG PANDOC_VERSION=2.17
ARG PYTHON_VERSION=3.7

FROM pandoc/core:$PANDOC_VERSION-alpine
FROM python:$PYTHON_VERSION-alpine
COPY --from=0 / /

RUN pip install wheel
RUN apk add make gcc libc-dev
RUN apk add libxml2 libxml2-dev libxslt libxslt-dev graphviz

COPY requirements.txt /
RUN pip install -r requirements.txt

COPY . slipbox
WORKDIR slipbox

CMD make check
