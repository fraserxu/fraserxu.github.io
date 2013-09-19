---
layout: post
title: Nodejs Job Queue With Kue

---

As our project move from v0.0.1 to v0.0.2, we need to add a job queue into our existing project. 

The reason behind this is that while performing the whole story, we have multiple operation in a row like init storage, update cloud information from aws, log out error, etc. So the job queue is need to be added here.

We search solutions over the internet with google to find a way to implement this in nodejs, and [kue](http://learnboost.github.com/kue/) comes to rescue. And after checking that we found it was an open source project contribute by the [LearnBoost](http://learnboost.com) guys.

So the LearnBoost crew are up to their goodness once again. They are prolific with open source, adn have now make Kue avaliable on [Github](https://github.com/learnboost/kue).

> Kue is a feature rich priority job queue for node.js backed by redis. A key feature of Kue is it’s clean user-interface for viewing and managing queued, active, failed, and completed jobs.

As described above, it's using node.js along with redis, and also have a beautiful front-end interface. So that's just check the `package.json` file to see what's in there:

<script src="https://gist.github.com/xufeng123/5558696.js"></script>

Before this project, I don't have any background information around this. So I started everything from beginning.

First let's have a look at an example list in the `readme.md` file:

<script src="https://gist.github.com/xufeng123/5558699.js"></script>

Simple and easy to understand, it just requires the `kue` library and then create a new `jobs` instance with the `createQueue()` method.

> Calling jobs.create() with the type of job ("email"), and arbitrary job data will return a Job, which can then be save()ed, adding it to redis, with a default priority level of "normal". The save() method optionally accepts a callback, responding with an error if something goes wrong. The title key is special-cased, and will display in the job listings within the UI, making it easier to find a specific job.

<script src="https://gist.github.com/xufeng123/5558708.js"></script>

After that, It will create a jobs to be called later.

And that's it, our job is created. And once we need to excute the job later, What we need to do is just use the process method:

<script src="https://gist.github.com/xufeng123/5558712.js"></script>

Kue also have other rather useful method avaible for us to use like **job priority** which can be used to control the priority of jobs to be excuted, **failure attempts** which can excuted the job after the job failed serval times, **job log** and so on. The `readme.md` is quite clear and simple to get started.

At the end of the `readme.md`, there's also two videos [Introduction to Kue](http://www.screenr.com/oyNs) and [API walkthrough to Kue](http://nodetuts.com/tutorials/27-kue-jobs.html#video) which is quite userful I think.

And that's it, there's more fine to play with this.

I get excited about the vast majority of what comes out of LearnBoost. Node and redis are also a fantastic combination, especially for job systems.
