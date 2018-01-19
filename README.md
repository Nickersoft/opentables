# OpenTable Search

Welcome! If you're reading this, then there's a 99% chance your a recruiter at the company this project was built for.
Considering this is an open-source repository that anyone can read, the name of that company and the position this coding
challenge is used for will not be disclosed. The fact this project uses Algolia search does not necessarily mean anything.
Algolia is simply awesome.

This is a search interface for OpenTable data built in React. Getting up and running with it is fairly straightforward.

## Building the Data

The data this project uses comes in two separate JSON files: `restaurants_info.csv` and `restaurants_list.json`. This data is
combined into a single JSON file, included in this repo as `restaurants_all.json`. However, if you need to regenerate that
data at all you can do so using the `mkdataset.sh` Node script:

```bash
$ ./mkdataset.sh
```

Note that this script was written on macOS, a Unix system, and has not been tested against the Windows platform. Worst
case, if you remove the shebang line you can run it as a JavaScript file using `node`.

## Running Locally

By default, the server runs on `localhost:8080`. To run the development server, you just have to run:

```bash
$ npm run server:dev
```

The server uses a Webpack hot loading middleware to swap out React components at runtime (how cool is that?!). While
this project could have used `nodemon`, it was never setup due to time constraints, so if you run into any issues with
the site, manually restarting the server should fix them. The code was written for Node 9, so unless you're running the
production server, which is transpiled to ideally work with version 6.10, you may run into issues if you're not using
Node 9 or above.

## Building For Production

To build for production, simply run the command:

```bash
$ npm run build
```

This will output a transpiled, minified server file, as well as all production assets, to the `dist` directory. To run
the production server, simply run:

```bash
$ npm run server:prod
```

## Building A Container

If you wish to build a Docker container out of this repo (which is how this site is deployed), you can do so with
Docker's `build` command:

```bash
$ docker build . -t opentables
```

And to run it:

```bash
$ docker run -p 8080:8080 --name opentables -d opentables
```
