---
layout: post
title: My Front-end Development Workflow

---

I happened to read the post [Front-End Technology Stack Round-Up](https://medium.com/@rogerdudler/front-end-technology-stack-survey-2014-809f7a8c92f3) on [Medium](https://medium.com) by Roger Dudler.

> An experiment to understand the usage, relationships and trends in the massive jungle of modern front-end technologies.

As for myself, I'm trying to move to another company, and sometimes I need to explain to people the front-end development workflow in my current office. So I decide to write this post, to have a brief summary of how I work in [Wiredcraft](http://wiredcraft.com) as a front-end developer.

It's far from being great, and it's nothing fancy. I just write it down so that sometime later in the future, I know how I work at a certain period of time. In the mean time, to whom that may interest how I work, you should be able to find something here, and I hope it will be helpful to you.

#### Editor / IDE

I'm not a big fan of any kind of IDE. They are often too large in size, and may consume large memory usage. But as a front-end developer, there seems not too much benefit that an IDE could bring me compare to a light weight text editor.

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

Choosing a right JavaScript is always a hot topic, and I don't want to start a war here. But as the title of this post, it's the workflow for me, not the best workflow.



#### Package Manager

#### Build System

