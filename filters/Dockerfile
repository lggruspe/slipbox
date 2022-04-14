FROM alpine

RUN apk add gcc libc-dev lua5.3-dev luarocks5.3
RUN luarocks-5.3 install amalg
RUN luarocks-5.3 install busted
RUN luarocks-5.3 install luacheck

RUN mkdir -p build
COPY src src

CMD luacheck src/*.lua --std max+busted && \
	busted src -p '.*.test.lua' && \
	amalg.lua src.csv src.filters src.links src.log src.slipbox src.utils src.metadata -s src/zk.lua -o build/filter.lua && \
	echo ":)"
