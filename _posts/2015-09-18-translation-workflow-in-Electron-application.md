---
title: Translation workflow in Electron application
layout: post
published: true
---

Steps for the translation workflow in a Electron application:

### Requirements

* jsxgettext - this is a node module to generate po file from JavaScript file
  `npm install jsxgettext --save-dev` to install
* gettext - native gettext tool to merge po files
  `brew install gettext` and run `brew link gettext --force` if needed.
* node-gettext  - this is a node module to parse and read PO file
  `npm install node-gettext --save` to install

### Prepare the folder structure

Create a `locale` directory to put the origianl `po files`

```
.
├── en.new.po
├── en.po
├── my.new.po
└── my.po
```

### Prepare a `Makefile` and add the `genPo` task

`bundle.js` is the JavaScript file which will use to generate the new PO file

```
NODE_BIN = node_modules/.bin

genPo:
  $(NODE_BIN)/jsxgettext -j dist/bundle.js > locale/my.new.po
  $(NODE_BIN)/jsxgettext -j dist/bundle.js > locale/en.new.po
  msgmerge locale/my.po locale/my.new.po -o locale/my.po
  msgmerge locale/en.po locale/en.new.po -o locale/en.po

.PHONY: genPo

```

### Run `make genPo` to generate and merge the po files
### Use it in the client

First you need to set up `gettext`

```JavaScript
/**
 * Getttext
 */
var gettext = require('node-gettext')
var fs = require('fs')

gettext = new gettext()

// add the language you need, here `my` means Myanmar
gettext.addTextdomain('en', fs.readFileSync(path.join(__dirname, './locale/en.po')))
gettext.addTextdomain('my', fs.readFileSync(path.join(__dirname, 'locale/my.po')))

// set the default domain
gettext.textdomain('my')
```

And finally you can use it in you HTML or whatever template language you have, here I use JSX with React. In the `render` function of a component

```JavaScript
render () {
  <span>{GT.gettext('Some really weird language here...')}</span>
}

```
