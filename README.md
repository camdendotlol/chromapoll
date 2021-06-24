# Chromapoll 🟥🟩🟦

Super secret project 😌

More details will come soon!

## How to run

Make sure you have `yarn` installed and a MongoDB database ready for action.

First, use `yarn install` to install dependencies.

Then, set your env variables as listed in the Configuration section of this readme.

Now you can use `yarn start:full` to quickly build and run a production build.

Other commands:

* `yarn build:server` to compile the server from TypeScript.
* `yarn build:ui` to build the frontend with Webpack.
* `yarn start:server` to run the production server after building.
* `yarn start:ui` to run the production frontend after building.
* `yarn dev:server` for a development build that automatically reloads when you make a change.
* `yarn dev:ui` for a development build of the frontend.
* `yarn test:server` for some very rudimentary testing of the server API.

Builds are placed in the `/dist` directory, with `/dist/server` for the backend and `/dist/frontend` for the frontend.

## Configuration

Chromapoll looks for two env variables.

* PORT: the port on which the server will accept connections
* DB_URL: the URL to your MongoDB database