---
title: My First Production Isomorphic React Graphql Project
layout: post
published: false
---

### The story

During the past few weeks, I've been given the opportunity to rebuild the front-end of a project
with "modern approach" to replace an existing CoffeeScript, jQuery, Bower based app running on Ruby
on Rails.

After about 2 sprints of work(2 weeks for each sprint), we shipped our first version to production last
week.

Before I started to share my experience, I'd like to give an overview of the architecture for the project.

#### The current stack

|                         | Library |
| ----------------------  | -------------------
|  View                   | React         |
|  (UI) State management  | send-actions(like Redux, but simper)  |
|  Date fetching          | GraphQL, Relay|
|  Route                  | React-Router  |
|  Assets serving         | Webpack       |
|  Precompile JS          | Babel         |
|  Server                 | Node.js(for server side rendering React) |

#### Why the current stack?

I've worked on lots of different projects before with different stack. And I always have the idea to **not use
any boilerplate** in mind when start a new project. Boileplates are usually built by and for people with different
requirements for a project, and none of them are identical to the one you are trying to solve. So usually I will
only keep a list of well maintained boilerplate project, and only use them as a reference when my own stack gets
into trouble.

The new project has a few requirements:

* Server side rendering for progressive enhanced experience so the page could work for user without JavaScript
* SEO, we are mainly a e-commerical website, so SEO is the number one priority
* The app needs to talk to a couple of micro-services, and tokens are usually stored on the server for safety reasons
* UI state should persiste from url, not only for SEO, but also for a better user experience

There are also other requirements which are not for business, and most of them are acutally for a better developer experience.

* Babel. For use a couple of handy syntax today that are only available in future browser
* Webpack. For compiling assets, hot code load, uglify
* Modern JavaScript libraries that have best practises in the community

With the above requirements, I started from the simplest hello world express server, and deployed it to Heroku. The other day I
need to build the static part of the page, and need to render from the server side, so I installed `React` and render a few of
Header and Footer component and rendered them on server with `React.renderToString`.

Since I also need to have other pages for `404`, `500`, I added `React-Router` to have the router support. It works super fine
and I love what I did so far.

But I think I forget to mention the setup I need to make in order to make those 3 libraries to work for both browser and server.
Here's the depencies list:

* babel-cli
* babel-core
* babel-loader
* babel-plugin-transform-runtime
* babel-preset-es2015
* babel-preset-react
* babel-preset-stage-0
* babel-register
* react
* react-dom
* react-router
* react-hot-loader
* webpack
* webpack-dev-server

And along with them I will need to have 3 webpack configs.

* webpack.client.config.js
* webpack.server.config.js
* webpack.dev.config.js

And another `.babelrc` which include the babel plugins.

I've done Webpack config for a while and for serval projects already, but it
stills feels very hard to make it right. Although I'm using some of the plugins in my configs, to be honest I don't know what exactly what those individual plugs does in the project. Some of them are inherits from `Babel 5`, and others may be something new only in `Babel 6`, I don't have time to go through each of them. And I fix all the error message by re-running the build and install each missing plugins.

It's an OK experience so far, I managed to have a nice working demo. And I could show my manager what I've achieved so far in a rather short time.

The next step is to be able to load dynamic content through our api-gateway. Since we only want to keep the token for internally use and don't want to expose it in the browser, we had the idea to build a simple "proxy" server which re-direct the request from the browser and then pass the request
together with token saved on the server to make a request to the api-gateway.

In addition, if a page need to load multple results, we could make them together into one and have a custom api endpoint. For example if we want to
get the stats `total user` and `total items` on our website, normally we should do two individual requests, but we could do this via a `/api/stats`
so the browser only to make one request. This could help user on a mobile device since network request on the server side is relativly realible and faster.

When we get to this stage, we came to the idea of trying our GraphQL, because the "proxy" server is similar to what GraphQL wants to achieve. Given that this is an experienment project so we decide to try it out.

To get started, we need to install the following packages, and it still kind of making sense to do so:

* express-graphql
* graphql
* react-relay
* graphql-relay
* babel-relay-plugin

Oh, wait! Since we are using `react-router`, we need a tool to fetch the data based on the current router so we could fetch all the data before rendering the page:

* react-router-realay

And, we are not done yet. We are doing isomporphic, so we still need to do something to make them work on server side, let's install some other plugins:

* isomorphic-relay
* isomporphic-relay-router

Okay, I think we are almost there, we'e got almost every tool we need. We're going to ship the product to production.

Here's a few problem I got that does not belong to any of the framework itself, but how to make them work together. I've heard lots of success stories for isomorphic application, I've also heard people talking how awesome GraphQL and Relay is for data fetching. But I can hardly find any live example of using all of them together:

* `process.env` management for application running in different environment(dev, ci, staging, production), most boilerplate project do not cover that
* `process.env`managemetn for isomporphic applications, using them with Webpack is trick because it's mostly design for client-side code, and covert varibles from varibles to strings and then back to variables to work them work for both env
* debug with source map support for code compiled for different environment
* the `.babelrc` file that varies on different environmetn

Luciky, with enough time spend on thoese probelms and wonderful resources over the internet, I managed to make the whole stack working.

### After shipping it to production


### Conclusion

I'm not a super fan of hearing people talking about `JavaScript fatigue`, the main reason I explain why I bring in those libraies into my project is because when I get a problem, I need a tool to help me solve the problem. And thanks to the hard work of thoese tool makers, they spend their spare time to make those tools for us for free, they are making our life easier. Me persoanlly also have lots of open source code pushed to npm and Github, and I can't tell how much I've leared from it.

But let's go back and think about the probelm we're trying to solve.
