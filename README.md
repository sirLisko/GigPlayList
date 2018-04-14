# Should I Listen It

[![Codeship Status for sirLisko/shouldilistenit](https://app.codeship.com/projects/e29af940-2243-0136-ace1-4263fc77234a/status?branch=master)](https://app.codeship.com/projects/286005) [![dependency Status](https://david-dm.org/sirlisko/shouldilistenit/status.svg)](https://david-dm.org/sirlisko/shouldilistenit#info=dependencies) [![devDependency Status](https://david-dm.org/sirlisko/shouldilistenit/dev-status.svg)](https://david-dm.org/sirlisko/shouldilistenit#info=devDependencies)

> Set you up for your next Gig.

Check a live example @ [https://shouldilistenit.sirlisko.com/the+strokes](http://shouldilistenit.sirlisko.com/the+strokes)

---

The Website is powered by [NodeJs](https://nodejs.org/).

In order to have the Website up and running NodeJs is mandatory, it can be installed using [n](https://github.com/tj/n), a handy NodeJs binary manager, or using the official installer present in the NodeJs website ([https://nodejs.org/download/](https://nodejs.org/download/)).

### Build steps

Now the build consists of 2 steps:

- Install all the FE dependencies for the build (i.e. webpack, postcss, etc.)
- Build the assets (javascript, templates, etc.)

### Install the dependencies

Once NodeJs is installed, its package manager NPM will be available, all you need to do is run in the main directory of the project the following command.

```bash
npm install --production
```

This will install all the software needed in order to build and run the Website.

In addition of that NPM allows us to run base commands that could be plugged to gulp functions or utilities.

### Build the Front-End

```bash
npm run build
```

It runs the following tasks:

- check the syntax of the JS, according to [StandardJS](http://standardjs.com/) (via [ESLint](http://eslint.org/))
- check the syntax of the CSS, using [stylelint](https://stylelint.io/)
- compile the CSS files using [PostCss](http://postcss.org/) and [cssnext](http://cssnext.io/)
- compile the JS files using [webpack 2.x](https://webpack.github.io/)
- compress javascript (via [Uglify](https://github.com/mishoo/UglifyJS)) and CSS (via [CSSNano](http://cssnano.co/))

### Work with the Front-End (Develop)

The easier way to build the Front-End in Develop mode is with:

```bash
npm run watch
```

In addition to the build, this command is also **watching the file system** looking for files change. Once one of the resources changes the relative assets are immediately recompiled.

### Running the tests

In order to running the tests and linters the **dev dependencies** need to be installed.

```bash
npm install
```

Once the dependencies are installed:

```bash
npm test
```

The test command is running the unit test relative to the javascript and the linting of the code (JS/CSS).

### API keys

The following API keys are needed in order to have everything up and running:

- [SetListFM](https://api.setlist.fm/docs/1.0/index.html)

```bash
export SETLISTFMAPIKEY={token}
```

- [Songkick](https://www.songkick.com/api_key_requests/new)

```bash
export SKAPI={token}
```

- [Spotify Auth Token](https://developer.spotify.com)

```bash
export SPOTIFYTOKEN={token}
```
