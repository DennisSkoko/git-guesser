FROM node:20 AS build

WORKDIR /home/node/app

COPY package*.json .
RUN npm ci

COPY . .

RUN npm run build


FROM node:20-alpine

WORKDIR /home/node/app

COPY --from=build /home/node/app/build .
COPY --from=build /home/node/app/package*.json .

RUN ls
RUN npm ci --omit dev

CMD ["node", "."]
