---
layout: post
title: My Front-end Development Workflow

---

I happened to read the post [Front-End Technology Stack Round-Up](https://medium.com/@rogerdudler/front-end-technology-stack-survey-2014-809f7a8c92f3) on [Medium](https://medium.com) by Roger Dudler.

> An experiment to understand the usage, relationships and trends in the massive jungle of modern front-end technologies.

Sometimes I need to explain to people the front-end development workflow in my current company. So I decide to write this post, to have a brief summary of how I work in [Wiredcraft](http://wiredcraft.com) as a front-end developer.

It's far from being great, and it's nothing fancy. I just write it down so that sometime later in the future, I know how I worked at that certain period of time. In the mean time, to whom that may interest in how I work, you should be able to find something here, and I hope it will be helpful to you :)

#### Editor / IDE

I'm not a big fan of any kind of IDE. They are often too large in size, and may consume large memory usage. As a front-end developer, there seems not too much benefit that an IDE could bring me compare to a light weight text editor.

The main editor I use on a daily basis is `Sublime Text`. It's light, fast, yet powerful. I'm not quite good at `Vim`, but I like it. I use it when I need to work on small project, or on environment that without GUI.

#### Version Control System

I believe I'm too young to know any version control system other than **git**.

#### CSS

Lots of project begin with a **demo**, or **prototype**. And when you start building a prototype, you want to make it fast. But how? The easiest way is to find the existing solution. Here comes CSS frameworks, **Bootstrap** from twitter is the best example. 40000+ of stars on Github means everything. Me, personally, started using Bootstrap when it was still quite young, I've enjoyed how it help me to build the website I want to build.

But it's not an happy story forever. Once you want something more than a prototype, **Bootstarp** becomes a pain, it's hard to maintain, to develop, and to customize. And if you believe in yourself, you may want to override some of the class from it, but you only ends up with code that you hate even by yourself.

That's a true story for me.

I don't write too much CSS now in my current company. But after trying with a lot of different solutions, we end up with a project called [eggshell](https://github.com/Wiredcraft/eggshell).

It's not a CSS framework, but just a couple of `SASS` files that build on top of `node-bourbon`, it defines the basic components that you need in every projects such as `form`, `font`, `button`. In this way, you can simply manage it with your favorite package management tool, and reuse it in other projects. It's not only a time saver, but also make all projects in your company more persistence.

It's tiny, and very useful, and doesn't take much time to build, every team should have one.

Another point I may miss here is coding style. People may struggle with camelCase class name or  spaces, but I really don't care too much about it. As soon as it works for the team, it works for me. But do notice that once there's a style in the code, everyone should follow it.

However, I do suggest people to try those standards build from large companies, like [style guide from Github](https://github.com/styleguide/css). They exist for large teams, and there must be value in it. 

#### JavaScript(CoffeeScript)

I've been working with pure CoffeeScript in two projects(write CoffeeScript in `/src` folder, and then compile to `/build` folder for browser to use). Comparing using it to JavaScript, your code becomes clean, and also you can benefit from some of the feature from it such as `Class`, `Splats`, that can save you a lot of code than using `prototype`.

But it's totally fine when not using it, as you are not always coding alone, you have teammates to work with, not all of them like `CoffeeScript`. Also, in the world of open source community, JavaScript is still the main stream. And people would more likely to contribute to a JavaScript project than in CoffeeScript.

#### JS Framework

Choosing the right JavaScript framework is always a hot topic, and I don't want to start a war here. But as the title of this post indicate, it's the workflow for me, not the best workflow.

My last 3 projects are all using `Angularjs`, including  a native chat application with `node-webkit`, iOS app with `Ionic` framework. I start working as a front-end developer with `jQuery`, after half a year of experience, I switched to `Angularjs`, and started to know what is a `MVC` framework. Comparing to work with `jQuery`, Angularjs really provide lots of powerful feature to develop single page applications.

`Directive`, `filter`, `two way data-binding`, those are all functions that myself alone can't write on my own. But alone with those power it brings, `Angularjs` force you to learn about those concepts, and you lose the flexibilities of your app.

That's why `frameworkless` single page application, also called modular web development, is becoming popular again. It's come from the group of smart people from the nodejs community. They've been enjoy develop and code management with `npm`, writing code with `commonjs` and share tiny modules that works to the open source community, and now, they want to bring it to the web.

I've been trying to learn to write code in that way for sometime, and I really like this way. I recommend those who interested in this to read the book [Human Javascript](read.humanjavascript.com)($39.00 ebook, but now free to read online) by [@HenrikJoreteg](http://twitter.com/henrikjoreteg).

I'm still new to this, and I'd like to share the learning experience with you.

#### Package Manager

When talking about front-end package manager, 'bower' seems to be the first choice. It's true. And in order to find a 3rd party library for use in client-side application, bower is always the best choice, as most library author opting to publish their code with it.

But as I've talked above about modular web development, there's also tools for this. `Component.io` and `npm` are the most famous. Both of them using commonjs syntax, and follow the UNIX philosophy which write tiny module that does one thing well.

There's one tool has to be mentioned when talking about using `npm` in client-side - `[Browserify](http://browserify.org/)`.

> Browserify lets you require('modules') in the browser by bundling up all of your dependencies.

#### Build System

Build system has been an essential part of front-end development. I put it at last, but I think it's the most important part, especially for large size client-side application.

When talking about build system, we often means code minification, testing, compiling or even deploying. `Grunt` has been and still being the most popular build tool, with the largest amount of plugins.

But recently, there's another popular build tool called `Gulp`, which based on nodejs stream, is drawing people's attention. I'm a guy who always want to try new stuff, and it turns out I am right this time.

We had a Grunt based angularjs application which has a lot of task need to be run, and also in order to speed up the development process, we've include livereload in our task. We ended up with a 500+ lines of `Gruntfile`. The size is OK, as there's really a lot of tasks out there.

But when our code become much complex, we felt the build process was really slow. Every time we changed some code, the task took 3-5 seconds to run which is totally unacceptable. So we decide to try `Gulp`.

After trying with gulp, our `Gulpfile` became to 400 lines, but what's more importantly, the time that takes to rebuild is within 2 seconds, which is a huge win for us. Guess how much time we could saved in one day, one week. 

But this is not the end of the story, I've found the same group of those smart people, they like neither `Grunt` nor `Gulp`, they like `Makefile`. If you are interested in this approach, I suggest you to read this post [Building JavaScript projects with Make](https://blog.jcoglan.com/2014/02/05/building-javascript-projects-with-make/) from James Coglan.

#### Conclusion

As you can see from how I work, there's always things become popular, and new things appear to replace them. But they all come for the same goal, to make the front-end development better. I've been enjoy the process, and I'm still eager to learn new things.

I hope my workflow does make some sense for you. And I'm more than happy to hear the story from you.
