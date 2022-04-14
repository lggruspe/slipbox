# Dockerfile for testing
ARG PYTHON_IMAGE=python:3.7-alpine

FROM pandoc/core
FROM $PYTHON_IMAGE
COPY --from=0 / /

RUN apk add make gcc libc-dev
RUN apk add libxml2 libxml2-dev libxslt libxslt-dev graphviz
RUN pip install wheel

COPY requirements.txt /
RUN pip install -r requirements.txt

COPY . slipbox
WORKDIR slipbox

CMD make check
