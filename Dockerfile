# Dockerfile for testing
ARG PYTHON_IMAGE=python:3.7-alpine

FROM pandoc/core
FROM $PYTHON_IMAGE
COPY --from=0 / /

RUN apk add make gcc npm nodejs luacheck lua-busted luarocks libc-dev
RUN apk add libxml2 libxml2-dev libxslt libxslt-dev graphviz
RUN pip install wheel
RUN luarocks-5.3 install amalg

COPY cli/requirements.txt /
RUN pip install -r requirements.txt

COPY . /slipbox

WORKDIR /slipbox/js/
RUN npm ci

WORKDIR /slipbox
CMD make test && make lint
