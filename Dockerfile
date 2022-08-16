# Dockerfile
FROM node:16.16-alpine3.16

WORKDIR /app

RUN apk add dumb-init

# create destination directory

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# copy the app, note .dockerignore
COPY . /app

RUN yarn install
RUN yarn build

# Copy your code in the docker image
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["yarn", "start"]
