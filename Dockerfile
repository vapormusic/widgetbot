ARG APP_DIR=/app
ARG NODE_VERSION=lts-alpine

FROM node:${NODE_VERSION} AS package

RUN apk --update \
	add --no-cache \
	build-base \
	python

ARG APP_DIR
ENV APP_DIR=${APP_DIR}

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

# Packages
ADD packages/crate/package.json $APP_DIR/packages/crate/
ADD packages/crate-cloudflare/package.json $app_dir/packages/crate/
ADD packages/embed/package.json $APP_DIR/packages/embed/
ADD packages/embed-api/package.json $APP_DIR/packages/embed-api/
ADD packages/html-embed/package.json $APP_DIR/packages/html-embed/
ADD packages/react-embed/package.json $APP_DIR/packages/react-embed/
ADD packages/scripts/package.json $APP_DIR/packages/scripts/
ADD packages/server/package.json $APP_DIR/packages/server/
ADD package.json $APP_DIR/
ADD yarn.lock $APP_DIR/

RUN yarn --frozen-lockfile

ADD . $APP_DIR/
RUN yarn workspace @widgetbot/embed-api build \
      && yarn workspace @widgetbot/react-embed build \
      && yarn workspace @widgetbot/html-embed build \
      && yarn workspace embed build \
      && yarn workspace @widgetbot/crate build \
      && yarn workspace server build \
      && rm -rf node_modules

FROM node:${NODE_VERSION}

ARG APP_DIR
ENV APP_DIR=${APP_DIR}
WORKDIR $APP_DIR

COPY --from=package $APP_DIR $APP_DIR

RUN yarn --production --frozen-lockfile

CMD ["yarn", "workspace", "server", "start"]
