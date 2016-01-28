---
title: NPM Cache The Right Way
layout: post
published: false
---

### Background

I've been working on bring React + Webpack stack to a large Ruby on Rails based website.

* Using sprockets managing assets
* Bower for front-end packages
* Jasmine for front-end testing

#### What we want to achieve

* Bring in React for part of the website(performance wise component)
* Use tape, sinon, enzyme to run ES6 + React tests
* Adding webpack progressively to handle assets files and make it work together with sprockets
* Webpack needs to generate fingerprint with manifest to be able to cache assets files with S3 CDN
* Eventually using webpack to handle all assets pipeline, including sass compile, image minify, ES6, CoffeeScript

#### Cache

The work flow

Hash value

```Bash
hash = shasum -a 1 package.json | cut -d ' ' -f1
```

Node version

```Bash
node_version = node -v | cut -d ' ' -f2
```

Get system architecture

```Bash
architecture = gem environment platform | cut -d ':' -f2
```

Compose cache file name

```Bash
filename = ${hash}-${node_version}-${architecture}.tar
```

Try to fetch from cache

```Bash
get_node_modules_cache () {
  echo "Fetching node_modules from S3 npm cache"
  aws s3 cp --region us-east-1 "${s3_prefix}${filename}" . && tar xf $filename $NODE_MODULES
}
```

NPM Install

```Bash
# clean up unused modules
npm prune
npm install
```

Update cache

```Bash
set_node_modules_cache () {
  echo "Updating S3 npm cache"
  tar -cf $filename $NODE_MODULES && aws s3 mv $filename $s3_prefix
}
```

