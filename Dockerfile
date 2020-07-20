FROM pandoc/core:latest
RUN apk --no-cache add python3 make git npm grep luarocks
RUN luarocks-5.3 install basexx
WORKDIR /home
RUN git clone https://github.com/lggruspe/slipbox.git
WORKDIR slipbox
RUN npm ci; make bundle
ENTRYPOINT ["python3", "-m", "slipbox"]
