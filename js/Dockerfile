FROM node

RUN mkdir js
WORKDIR js
COPY package.json .
COPY package-lock.json .
RUN npm ci

COPY . .

CMD npm run lint && npm test && npm run build && echo ":)"
