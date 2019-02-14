#!/bin/bash

set -e
export YARN_PRODUCTION=false

echo
echo "↔ Installing dependencies…"
echo
yarn

echo
echo
echo "🔨 Building embed-api…"
echo
yarn workspace @widgetbot/embed-api build

echo
echo
echo "🔨 Building react-embed…"
echo
yarn workspace @widgetbot/react-embed build

echo
echo
echo "🔨 Building html-embed…"
echo
yarn workspace @widgetbot/html-embed build

echo
echo
echo "🔨 Building embed…"
echo
yarn workspace embed build

echo
echo
echo "🔨 Building crate…"
echo
yarn workspace @widgetbot/crate build

echo
echo
echo "🔨 Building server…"
echo
yarn workspace server build

echo
echo "--------------------------------------------------------------------------------"
echo
echo "🎉 All packages have been built!"
echo
echo "If you haven't done so already then go to \`packages/server/data\`,"
echo "    copy \`config.template.yml\` to \`config.yml\` and set it up correctly."
echo
echo
echo "To run the server:"
echo
echo "    yarn workspace server start    -or-    cd packages/server && yarn start"
echo
echo
echo "To run the embed webserver:"
echo
echo "    yarn workspace embed start     -or-    cd packages/embed && yarn start"
echo
echo "--------------------------------------------------------------------------------"
echo
