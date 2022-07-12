# Dockerfile
FROM node:16

# create destination directory
WORKDIR /src

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# copy the app, note .dockerignore
COPY . /src

RUN yarn
RUN yarn build

# Copy your code in the docker image

CMD [ "npm", "start" ]
