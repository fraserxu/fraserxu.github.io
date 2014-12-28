---
title: Why We May Ditch AngularJS For React
layout: post
---

![HCD](http://wiredcraft.com/images/posts/react.png)

[Our team](http://wiredcraft.com) has been building quite a few things with AngularJS, from our products ([SweepBoard](http://sweepboard.com) and [devo.ps](http://devo.ps)) to client work for the World Bank. It was a great step forward from backbones.js for building [static clients and single page apps](http://devo.ps/blog/farewell-to-regular-web-development-approaches/).

While building these applications we ran into some performance issues known of the the AngularJS community; AngularJS two way data-binding is at the same time a great strength and its Achilles heel. Dealing with complex and/or large collections of items can significantly slow down rendering. We started looking for a solution to this problem and stumbled upon things like [Thierry Nicola's post about his use of [React](http://facebook.github.io/react/) to improve AngularJS rendering time](http://www.williambrownstreet.net/blog/2014/04/faster-angularjs-rendering-angularjs-and-reactjs/) (I strongly recommend reading it).

With more recent news of well known players move to React, like [GitHub's Atom editor](http://blog.atom.io/2014/07/02/moving-atom-to-react.html), the Wiredcraft team is getting serious about making the switch as well.

### Dependencies and Components

We've been using Node.js for about 3 years now, going as far as co-organizing Javascript conferences in China in [Shanghai](http://2012.jsconf.cn/), [Beijing](2013.jsconf.cn) and more recently [Hangzhou](http://2014.jsconf.cn/).

npm is a big reason why we're so inclined to use Node.js. So much so that we tried to use it in the front-end with AngularJS using [browserify](http://browserify.org/) as a way of handling dependencies and components. Truth be told, it never felt right; AngularJS dependency injection seems to fundamentally oppose browserify.

In comparison, React is a lot more fitting; everything is a component, you can simply roll your own and import it with a simple `require('my-component')`. It even provide a [commonjs](http://facebook.github.io/react/docs/getting-started.html#want-commonjs) module allowing you to install through npm.

### Virtual DOM

If you are experiencing performance issues, "virtual DOM" may be enough of a reason to try React. It provides you with a lightweight implementation of the DOM and events system. Instead of dealing with the browser, you manipulate an in-memory version of the DOM, which is significantly faster.

With AngularJS, data that is binded to the DOM will trigger a full render of the page whenever it changes. That's what makes it expensive for large or complex sets of data. With the virtual DOM, you don't do this, instead you work entirely in Javascript and then apply only the changes (thanks to React's diff algorithm). From React's own documentation:

> React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required.

If you want to learn more about it, I recommend you read Pete Hunt's [The Secrets of React's Virtual DOM](http://fluentconf.com/fluent2014/public/schedule/detail/32395) (who happens to be React's lead developer).

### Learning curve

Getting started with AngularJS means you need to absorb a lot of specific concepts: directives, filters, factories, services... Combined with some conventions, you get a lot of magic out of it. The problem is, magic has a price. Debugging can be frustrating when you're still an AngularJS newbie.

React on the other hand has a fairly straightfoward API: create an element with `React.createClass()` and then render it on the page with `React.renderComponent()`. No need to chase code over in 3 different places to understand what's happening. Now, this is an intentional simplification, but getting started with React will most likely be a lot easier than with AngularJS.

### A few more things

Like any deal that seems too good to be true, there are a few drawbacks:

- React positions itself as the "V" in MVC; you'll have to write the "M" and "C" by yourself. Though there are some pretty good third party libraries like [react-router-component](https://github.com/andreypopp/react-router-component) or [react-router](https://github.com/rackt/react-router) to deal with this.

- The recommended application architecture for React, [Flux](http://facebook.github.io/react/docs/flux-overview.html), is actually a tad complicated. If you check out the [to-do list example](http://facebook.github.io/react/docs/flux-todo-list.html), you'll see that it's definitely not geared towards simple applications. You'll need to learn about concepts like dispatcher or store.

We're still confident that the advantages far outweigh these few issues, which moreover will likely disappear as React gains adoption.

For those of you interested in digging further, here are a few things worth reading:

* [http://www.quora.com/Pete-Hunt/Posts/Facebooks-React-vs-AngularJS-A-Closer-Look](http://www.quora.com/Pete-Hunt/Posts/Facebooks-React-vs-AngularJS-A-Closer-Look)
* [http://jonykrau.se/posts/the-value-of-react](http://jonykrau.se/posts/the-value-of-react)
* [http://swannodette.github.io/2013/12/17/the-future-of-javascript-mvcs/](http://swannodette.github.io/2013/12/17/the-future-of-javascript-mvcs/)
* [http://blog.andyet.com/2014/08/13/opinionated-rundown-of-js-frameworks](http://blog.andyet.com/2014/08/13/opinionated-rundown-of-js-frameworks)

_This post was original posted on [wiredcraft blog](http://wiredcraft.com/posts/2014/08/20/why-we-may-ditch-angularjs-for-react.html)._