---
layout: post
title: 在Express项目中使用Handlebars模板引擎

---

最近在用Expressjs做一个项目，前后端都用它来完成。自己之前有用过Express一段时间，但是大部分都是用它来编写Restful的API,而没有真正用它所提供的前端页面渲染功能。

所以严格意义来讲这是第一次完整的项目。开始做之后就遇到了一些需要做出决定的地方。众所周知，Express的默认模板引擎是Jade.我在之前学习Express的时候，因为它是默认的引擎，所以有接触和使用过一段时间，感觉也还行。Jade在编写页面时所提供的嵌套功能比较实用，可以节省很大的代码量。

> Jade is a high performance template engine heavily influenced by Haml and implemented with JavaScript for node. For discussion join the Google Group.

上面是Jade Github所在页面的描述。可以得知它是一个注重性能，受Hamle影响，并特别针对Nodejs而编写的前端模板引擎。

我们先来看一下[Jade官方页面](http://jade-lang.com/)所给的例子：

    doctype 5
    html(lang="en")
      head
        title= pageTitle
        script(type='text/javascript').
          if (foo) {
            bar(1 + 5)
          }
      body
        h1 Jade - node template engine
        #container.col
          if youAreUsingJade
            p You are amazing
          else
            p Get on it!
          p.
            Jade is a terse and simple
            templating language with a
            strong focus on performance
            and powerful features.

我们可以看到，对比原生的HTML, Jade明显的一个优势就是标签数量上的减少。很多地方只要按照约定的缩进规则编写，完全可以避免使用原生HTML时标签忘记闭合的问题。同时Jade还提供了一些用于渲染判断的条件，可以根据数据来决定显示的内容等功能。

另外Jade的遍历数据生成页面功能，配合使用Json数据时特别好用，可以很大程度上减少代码量。

而另外一个原因，也是觉大多数人使用Jade的原因，可能都跟我一样，因为是Express框架自带的模板引擎，而它的作者也是鼎鼎有名的TJ.

看了标题也许会奇怪，既然Jade出自大神之手，而且简单易用，我为什么还要去选择Handlebarsjs呢？

同样我们看下官方描述:

> Handlebars provides the power necessary to let you build semantic templates effectively with no frustration.

> Mustache templates are compatible with Handlebars, so you can take a Mustache template, import it into Handlebars, and start taking advantage of the extra Handlebars features.

作为一个模板引擎，它继承于著名的[Mustache](http://mustache.github.io/)模板引擎，具备了渲染页面的基础功能，并在其基础上进行拓展。

而另一个值得关注的是其作者[Yehuda Katz](https://github.com/wycats),熟悉的朋友可能知道，他是著名JavaScript MVC框架[Emberjs](http://emberjs.com)代码的主要贡献者之一，而且在他的影响下也成为了Emberjs的默认模板引擎。而另外，Yehuda本身也是W3C规范制定小组的成员之一，其影响也不亚于TJ.

抛开框架的背景，我们来看看实际的应用场景。工具无非好坏，顺手才是王道。评断一个东西好坏关键还是看它是否满足自己的应用需求。

在开始做现在的项目之前，我已经用Jade完成了所有的功能，而且对于代码也还比较满意。但是在提交之后问题产生了。

因为这个项目不是我一个人在做，和我一起合作的同事之前没有接触过Jade,而且另外一位负责编写样式的同事对于JavaScript的模板引擎也不是很熟悉。这样一来，由于我的原因，导致团队成员之间无法协作。首先是JS开发人员需要时间来掌握和熟悉Jade语法，而另外一个更为严重，Jade语法的特性决定了其不利于配套CSS的书写(这点通过编译之后可以解决，但是一定程度上增加了工作量)。

于是我开始思考使用Jade是否正确。这里的两个问题是我必须面对的，而项目的进度不能因为这个受到影响，于是我开始考虑选择其他的模板引擎。

前面提到Emberjs用到了Handlebarsjs，所以在选择时我很容易就想到了它。

[Handlebars](http://handlebarsjs.com/)的官网给出了很多例子，而且上手也很容易，前后端通用,使用起来也很简单,这里就不对其使用多做介绍。

回到文章重点，因为Express并不提供对Handlerbarjs的直接支持，这样在使用时会面临一定问题。

要在Express中使用Handlerbars作为模板引擎，首先需要做出一下设置：

1. 安装Express, Handlebars, Consolidate:

        "dependencies": {
          "express": "3.x",
          "consolidate": "0.4.0",
          "handlebars": "1.0.7"
        }

2. 配置选择引擎:

        // Use handlebars as template engine
        app.engine("html", consolidate.handlebars);
        app.set("view engine", "html");
        app.set("views", __dirname + "/views");

3. 注册模板：

        // Register partials
        var partials = "./views/partials/";
        fs.readdirSync(partials).forEach(function (file) {
          var source = fs.readFileSync(partials + file, "utf8"),
            partial = /(.+)\.html/.exec(file).pop();
            Handlebars.registerPartial(partial, source);
        })

这样我们就可以在项目中使用Handlerbars来渲染页面。但是这样做后，我又遇到了另外一个问题。通过以上的方法我可以很容易的单独去加载某个页面。但是实际应用中，一般会有多个页面，而且多个页面之间会共享页面的header和footer部分。这样会导致重复编写很多代码。

在使用Jade是我们可以很容易的使用如下代码来实现页面模板功能：

    include layout

但是由于Express并非直接支持Handlerbars，所以要实现这个功能还需要一定的设置。在Handlerbars中,可以通过{{> layout }} 来实现sub-template的功能。在查找了相关模块之后，我发现了[hbs](https://github.com/donpark/hbs)这个Express中间件。

这个模块使用起来很简单，可以完美解决我所遇到的问题。使用方法如下：

1. 安装模块：

        npm install hbs --save

2. 设置模板：

        app.set('view engine', 'html');
        app.engine('html', require('hbs').__express);

3. 注册模板：

        var hbs = require('hbs');
        hbs.registerHelper('helper_name', function(...) { ... });
        hbs.registerPartial('partial_name', 'partial value');

如果需要注册整个文件夹，也可使用如下命令：

        var hbs = require('hbs');
        hbs.registerPartials(__dirname + '/views/partials');

这样，我们就可以做到页面模板的重复利用，可以显著减少代码量。

而另外一个关键原因，在于Handlerbars对比Jade,语法更加简单。最重要的还是其普通元素同样使用原生HTML的写法，这样，对于编写样式的同事来讲就会更加友好。使用传统的方式编写样式，可以显著降低学习成本，从而加快项目进度。

而Handerbars所带来的一些其他功能，也会让项目的开发变得更加轻松。

下面附上我项目的基本结构，希望能对同样使用这种方案的同学有一定帮助。

    .
    ├── app.js
    ├── node_modules
    │   ├── express
    │   ├── handlebars
    │   ├── hbs
    │   ├── less-middleware
    │   ├── nodemon
    │   └── request
    ├── package.json
    ├── public
    │   ├── images
    │   ├── javascripts
    │   │   └── app.js
    │   ├── lib
    │   │   ├── font
    │   │   ├── js
    │   │   └── stylesheets
    │   └── stylesheets
    │       ├── style.css
    │       └── style.less
    ├── routes
    │   ├── github.js
    │   └── index.js
    └── views
        ├── index.hbs
        ├── orgs.hbs
        └── partials
          ├── footer.hbs
          └── header.hbs

