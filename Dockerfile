FROM node:lts-alpine

ENV APP_DIR /app

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

RUN yarn

ADD . $APP_DIR/
RUN yarn workspace @widgetbot/embed-api build \
      && yarn workspace @widgetbot/react-embed build \
      && yarn workspace @widgetbot/html-embed build \
      && yarn workspace embed build \
      && yarn workspace @widgetbot/crate build \
      && yarn workspace server build

CMD ["yarn", "workspace", "server", "start"]
