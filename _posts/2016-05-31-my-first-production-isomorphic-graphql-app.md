---
title: My First Production Isomorphic React Graphql Project
layout: post
published: false
---

### The story

During the past few weeks, I've been given the opportunity to rebuild the front-end of a project
with "modern approach" to replace an existing CoffeeScript, jQuery, Bower based app running on Ruby on Rails.

After about 2 sprints of work(2 weeks for each sprint), we shipped our first version to production last week.

Before I started to share my experience, I'd like to give an overview of the architecture for the project.

#### The current stack

|                             | Library |
| ----------------------  | -------------------
|  View                    | React         |
|  State management       | send-actions(like Redux, but simper)  |
|  Date fetching          | GraphQL, Relay|
|  Route                  | React-Router  |
|  Assets serving         | Webpack       |
|  Precompile JS          | Babel         |
|  Server                 | Node.js(for server side rendering React) |

#### Why the current stack?

I've worked on lots of different projects before with different stacks. And I always have the idea to **not use any boilerplate** in mind when start a new project. Boilerplates are usually built by and for people with different requirements for a project, and none of them are identical to the one you are trying to build. So usually I will only keep a list of well maintained boilerplate project, and only use them as a reference when my own stack gets into trouble.

The new project has a few requirements:

* Server side rendering for progressive enhanced experience so the page could work for user without JavaScript
* SEO, we are mainly an e-commercial website, so SEO is the number one priority
* The app needs to talk to a couple of micro-services, and tokens are usually stored on the server for safety reasons
* UI state should persist from url, not only for SEO, but also for a better user experience
* Fast iteration time, to move fast and delivery better user experience
* Improve performance, the short time we delivery page to user, the longer we can keep the user on the website

There are also other requirements which are not for business, and most of them are actually for a better developer experience.

* Babel. For use a couple of handy syntax today that are only available in future browser
* Webpack. For compiling assets, hot code load, uglify
* Modern JavaScript libraries that have best practices in the community

With the above requirements, I started from the simplest hello world express server, and deployed it to Heroku. The other day I started to build the static part of the page, and since the code need to render from the server side, I installed `React` and render a few of Header and Footer component and rendered them on server with `React.renderToString`.

Since I also need to have other pages like `404`, `500`, I added `React-Router` to have the router support. It works super fine and I love what I did so far.

But I think I forget to mention the setup I need to make in order to make those 3 libraries to work for both browser and server. Here's the dependencies list:

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

I've used Webpack in several projects, but it stills feels very hard to make it right each time I do it again. I'm using lots of plugins for different purposes in my configs, but to be honest I can't say I know what exactly what those individual plugs does in the project. Some of them are inherits from `Babel 5` and I may know what it does, but others may be something totally new only in `Babel 6`, I don't have the time to go through each of them.

It's actually an OK experience so far, I managed to have a nice working demo. And I could show my manager what I've achieved so far in a rather short time.

The next step is to be able to load dynamic content through our api-gateway. Since we only want to keep the token for internally use and don't want to expose it in the browser, we had the idea to build a simple "proxy" server which re-direct the request from the browser and then pass the request together with token saved on the server to make a request to the api-gateway.

In addition, if a page need to load multiple results, we could make them together into one and have a custom api endpoint. For example if we want to get the stats `total user` and `total items` on the page, normally we will need to do two individual requests, but with the "proxy api" we could do this via a `/api/stats` so the browser only need to make one request. This could help user on a mobile device since network request on the server side is relatively reliable and faster.

When we get to this stage, we came to the idea of trying our GraphQL, because the "proxy" server is similar to what GraphQL wants to achieve, and in the future we will have more complex logic, the benefit of small pageload and flexible query language could help us in long term. Given that this is an experiment project so we decide to try it out.

To get started, we need to install the following packages, and it still kind of making sense to do so:

* express-graphql
* graphql
* react-relay
* graphql-relay
* babel-relay-plugin

Oh, wait! Since we are using `react-router`, we also need a tool to fetch the data based on the current router so we could fetch all the data before rendering the page:

* react-router-relay

And, last but not least. We are doing <del>isomorphic</del>universal app, so we still need to do something to make them work on server side, let's install some more other plugins:

* isomorphic-relay
* isomorphic

Okay, I think we are almost there, we've got almost every tool we need. We're going to ship the product to production.

With this setup, I got problems that does not belong to any of the framework itself, but how to **make them work together**. I've heard lots of success stories for isomorphic application, I've also heard people talking how awesome GraphQL and Relay is for data fetching. But I can hardly find any live example of using all of them together.

Here's a few pain point I met while hooking them together:

* `process.env` management for application running in different environment(dev, ci, staging, production), most boilerplate project do not cover that
* `process.env`management for isomorphic applications, using them with Webpack is tricky because it's mostly design for client-side code, and convert variables from variables to strings and then back to variables to make them work for both env
* debug with source map support for compiled code for different environment
* the `.babelrc` file that varies on different environment

Luckily, with enough time spend on those problems and wonderful resources over the internet, I managed to make the whole stack working, and we shipped it to production last Friday.

### After shipping it to production

Yes, please hold on and stop telling me **you should never ship something to production on Friday**. This is something we all know as developer, there's a few assumptions that we've made when ship the code:

* We have run the code on our staging and production for 1-2 weeks
* we have complete monitoring services that show the metrics of the app
* It's a shiny new stack and we can't wait until next week to ship it

And **those assumptions are wrong**.

All those metrics we have are not facing really user, it's behind a domain hosted on Heroku app, and we're the only user who knows about it. And once we resolved the DNS to use the new domain(which takes about 1 hour to take effect), we started to get some new metrics from our tracking services. It was all good at the beginning.

But not until a few hours later, we found that the memory usage of the server keeps going up. Even though I was almost sure there's a memory leak somewhere in our code, but with this **shiny** new stack I had no idea what could go wrong as there's so many possibilities. Normally you could just revert your code to a previous working commit and do a re-deploy, but we don't even have one.

I ended up sitting in front of my laptop the whole Friday night to watch the memory usage goes up and I restarted again, and wait until it goes up to restarted it.

The other day with the help from some of my nodejs developer friends, I added a process management tool called `pm2` which restart the server when memory goes to a `max_memory_restart` limit so I could have time to have a rest and time to figure out what's going on.

But `pm2` could not help fix the memory leak issue, so the rest of the week I started to look at nodejs profiling solutions and find out a few technicals to find potential memory leak. It's not the topic of this post but all I can tell is that is hard. Especially you have such a setup with isomorphic babel compiled code base.

### Have you find out the memory leak yet?

The answer is no. After discussed with the team, we decided to remove all GraphQL and Relay related code. And here's the result:

<img width="1225" alt="memory usage" src="https://cloud.githubusercontent.com/assets/1183541/15707752/d07b5b4c-283d-11e6-838b-4b719d637a1b.png">

We all know that is totally unnecessary for the app, we were keeping it to prepare the code for the future.

### Conclusion

So here's a few lessons I learned from this project:

* **Don't ship code to production on Friday, for whatever reason**.
* You can **plan big**, but **always start small**.
* There's no reason should stop you from trying new libraries, but **chose the right timing**.

Last but not least, I'm not a super fan of hearing people complaining about `JavaScript fatigue`, this post isn't about complain them at all. It's all my personal fault to use a library at a wrong time(or too many libraries at the same time). And it's also the reason I explain step by step why I bring in those libraries into my project.

It is because whenever I get a problem, those tools, build by lovely open source developers who spend their spare time, helping us solve our problems for free, they are the one making our life easier. If it happens to solve your problem, always appreciate their hard work for that, if it doesn't, build you own.
