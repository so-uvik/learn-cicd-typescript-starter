FROM --platform=linux/amd64 node:22-slim

WORKDIR /usr/src/app

RUN npm install -g pnpm

ADD . .

RUN CI=true pnpm i --frozen-lockfile

RUN pnpm run build

CMD ["node", "dist/main.js"]
