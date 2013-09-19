---
layout: post
title: 前端模版引擎
date: 2012-12-12 23:36
comments: true
categories: []
---
模版引擎在浏览器客户端中的应用正在变得越来越广泛。随着应用程序业务逻辑从服务端转移到客户端，以及MVC式设计模式的渐渐推广（使用的增多），模板也被鼓励用于浏览器客户端程序开发了。这个在过去被认为该由服务器端所作的事。但是现在，同样也可以在客户端开发中活力四射，大放光彩。<!--more-->
<h3>为何要使用它？</h3>
通常而言，在视图中使用模板可以将语言标记与应用逻辑进行分离，同时能最大限度地提高代码复用性和可维护性。采用更接近输出语法的语言（例如HTML），你能快速清醒地完成正在做的事情。虽然模板能用来输出各种不同类型的文本，但基于HTML是我们在客户端开发时所需要的语言这一事实，此处我们就以HTML为例讲解。

时下的动态应用程序中，客户端需要经常更新用户界面（UI）。这项操作可以通过抓取服务器上的HTML代码片段来完成，这些片段能够被轻易的插入文档。但是这需要服务器提供支持返回这样代码片段（而不是返回完整的页面）的功能。而且，作为一个与标记打交道的客户端开发者，你所需要的是对整个模板的控制。你不需要懂Smarty、Velocity、ASP，或者一些不知名的服务端代码，也不需要处理那些更加糟糕的，臭名昭著的，遍布在HTML代码里的 ? 和 % 标签。

这里我们来看看一种新的替代品：基于客户端的模板引擎。
<h3>初步印象</h3>
为照顾初学者，这里我给出“模板”一词的定义。 这里 是来自foldoc的定义:
<blockquote>“一个包含了各种参数，并能够由模版处理系统通过识别某些特定语法来替换这些参数的文档。”</blockquote>
让我们一起观察这个例子，来看看一个最基本的模板是什么样子的：

如果你懂得HTML，也许会感觉似曾相识。它包含了一些含有占位标记的HTML标签。随后的代码中，我们将会用一些真实的数据来替换它。比如以下这个对象：
<pre class="prettyprint">   var data = {
       "title":"Story",
       "names":[
           {"name":"Tarzan"},
           {"name":"Jane"}
       ]
   }</pre>
结合了数据的模板所输出的结果应像下面的HTML代码所表示的样子：

模板和数据的分离，使得HTML的维护变得更加轻松。像更改标签，添加class这些修改只需要去改变模板里相应的标记。增加像 li 这样的重复元素也只需要一次修改就能搞定。
<h3>模板引擎</h3>
模板的语法（ {{title}}这样的占位标签所使用的格式）取决于你使用的模板引擎。引擎所关心的是如何解析模板，将占位标签（变量、函数、循环等）替换成提供给它们的数据。

一些模板引擎是无逻辑（logic-less）的。“无逻辑”不是说你只能在模板中使用简单的占位符，而是意味着这些逻辑性的功能只能由某些智能标签来完成（例如，数组迭代，条件式渲染等）。有些其他的引擎功能更多，可扩展性更强。这里不涉及细节，请问你自己，这个模板需要何种程度的逻辑控制。

尽管每种模板引擎都有自己的API，但你总是可以找到像 render() 和 compile()一类的方法。渲染过程就是将特定数据放入模板，生成最终结果的过程。换句话说，就是用特定数据替换占位标记。并且，如果模板中有某些生成逻辑，就一并执行它。编译一个模板也就是去解析那个模板，并将模板转换为JavaScript函数。模板中的逻辑部分被转换成普通的JavaScript语句后，数据就可以传进函数中，用一种经过优化的办法将零散的信息拼接起来。
<h3>一个使用 Mustache 的例子</h3>
以下示例可以使用 mustache.js 之类的模板引擎生成。这里使用了流行的Mustache 模板的语法。更多的说明，以及更多替代方案，我们稍后再说。首先来看一段生成某种结果的JavaScript代码：

现在我们想在网页中展示结果。使用纯JavaScript可以这么写：
<pre class="prettyprint">   document.body.innerHTML = result;</pre>
这样就可以看到效果了！你也可以在自己的代码前加上Mustache脚本，试试浏览器生成效果：
或者，你可以在 jsFiddle尝试。
<h3>组织模板</h3>
如果你跟我一样，大概也不会把HTML代码写成长长的一行吧。这样的代码不仅不便于阅读，维护起来也相当困难。理论上，模板能存放于单独的文件中，这样不仅可以拥有语法高亮的所有好处，而且可以为提高可读性，合适地调整HTML的行缩进。

但这种做法会导致另外一个问题。如果我们项目中的模板很多，那么我们并不想分别加载这么多的文件，因为这会触发许多的Ajax请求。这样不利于性能的提升。
<h4>方案一：脚本标签</h4>
一种常见的解决方案是把所有的模板放在一种有着特殊type属性的script标签中，例如type="text/template"类型的脚本标签（浏览器不会解析渲染它）
<pre class="prettyprint"><script id="myTemplate" type="text/x-handlebars-template">// <![CDATA[


<h1>{{title}}</h1>


<ul>
           {{#names}}
	<li>{{name}}</li>


           {{/names}}</ul>

// ]]]]><![CDATA[></script></pre>
这样，你就可以把所有模板放在HTML文档中，阻止对模板所发出的额外Ajax请求。

这种脚本标签里面的内容可以在随后的JavaScript代码中作为模板使用。下面的代码示例中，使用了Handlebars模板引擎和一部分jQuery代码，并利用了前面提到的script 标签：
<pre class="prettyprint">  var template = $('#myTemplate').html();
   var compiledTemplate = Handlebars.compile(template);
   var result = compiledTemplate(data);</pre>
你同样可以在 jsFiddle上尝试它。

这里的结果和前面的Mustache示例所生成的结果相同。Handlebars引擎也可以使用Mustache的模板，因而我们这里使用了同一个模板。这里有个（很重要的）不同，那就是Handlebars使用中间步骤生成了HTML结果。引擎先将模板编译成一个JavaScript函数（我们在此把它叫做 compiledTemplate ）。之后在函数执行时把数据作为它的唯一参数，并输出最终结果。
<h4>方案2：预编译的模板</h4>
虽然让单个函数进行模板渲染似乎很方便，但将编译和渲染过程相互分离还是有显著的好处的。最重要的是，这样的程序结构可以让服务端执行编译过程。我们可以在服务器端（如使用Node.js）执行JavaScript，有些引擎也支持模板的预编译。

总的来说，就是我们可以编写出并提供含有多个预编译模板的单个JavaScript文件（像 compiled.js）。整个过程粗看上去就像这样：
<pre class="prettyprint">   var myTemplates = {
       templateA: function() { â€|.},
       templateB: function() { â€|.};
       templateC: function() { â€|.};
   };</pre>
然后，程序代码中我们只需要用数据填充这些预编译的模板就行：
<pre class="prettyprint">   var result = myTemplates.templateB(data);</pre>
这么做通常要比前面讨论过的，把代码直接放入 script 标签的性能要好，因为这样客户端能跳过编译部分。我们接下来可以看到，依靠你的应用程序栈，这个目标并不难实现。
<h4>Node.js的例子</h4>
所有的模板预编译脚本至少应完成如下几点：

• 读取模板文件；
• 编译模板；
• 把生成的JavaScript合成一个或多个文件。

下面的这个基本Node.js脚本（使用Hogan.js模板引擎）做到了这些：
<pre class="prettyprint">01  var fs = require('fs'),
02      hogan = require('hogan.js');
03   
04  var templateDir = './templates/',
05      template,
06      templateKey,
07      result = 'var myTemplates = {};';
08   
09  fs.readdirSync(templateDir).forEach(function(templateFile) {
10   
11      template = fs.readFileSync(templateDir + templateFile, 'utf8');
12      templateKey = templateFile.substr(0, templateFile.lastIndexOf('.'));
13   
14      result += 'myTemplates["'+templateKey+'"] = ';
15      result += 'new Hogan.Template(' + hogan.compile(template, {asString:true}) + ');'
16   
17  });
18   
19  fs.writeFile('compiled.js', result, 'utf8');</pre>
这段代码读取 templates/ 文件夹下的所有文件，编译模板，并将其写入到compiled.js文件中。

注意，上面的代码未经任何优化，而且不包含任何错误处理代码。尽管如此，它完成了任务。这表明预编译模板并不需要很多代码。
<h3>方案3：异步模块定义（AMD）和REQUIREJS</h3>
异步模块定义（AMD）正越来越受到重视。通常而言，分离的模块是组织应用程序的更好方法。一个流行的模块加载器是RequireJS。在模块定义逻辑中，指定了的依赖关系会得到解析，成为可用的实际模块（或者工厂）。

在模板的上下文环境中，RequireJS有个让你用来指定文本式依赖关系的"文本"插件。异步模块定义（AMD）的相应代码默认将会作为JavaScript代码来对待，不过模板只是个文本文件（HTML文件是纯文本），因此我们使用这个插件。代码如下：
<pre class="prettyprint">01  define(['handlebars', 'text!templates/myTemplate.html'],function(Handlebars, template) {
02   
03      var myModule = {
04   
05          render: function() {
06   
07              var data = {"title":"Story", "names":[{"name":"Tarzan"}, {"name":"Jane"}]};
08              var compiledTemplate = Handlebars.compile(template);
09              return compiledTemplate(data);
10   
11          }
12      };
13   
14      return myModule;
15  });</pre>
这么做的好处（仅仅是）有了把模板分拆放在不同文件的能力。这种做法是不错，但它需要发送额外的Ajax请求来获取模板，在客户端编译模板仍然是必须的。不过，这些额外请求可以用RequireJS附带的 r.js 优化器消除。这个优化器解析依赖关系，把模板（或者其他依赖项）“内联（inline）”在模块定义中，大幅度减少了请求的数量。

上述过程所缺少的预编译步骤可以用多种方法解决。一种容易想到的办法是让优化器也预编译模板（就像我们可以为 r.js写个这样的插件）。不过这样一来模块的定义也需要改变，因为我们可能在优化前就会使用到模板那串字符，也有可能在优化后使用到模板函数。也许这项工作处理起来并不是十分困难，要么就需要检查this的变量类型，要么就需要把这层逻辑抽象出来（写在插件或者是写作程序里）。
<h3>监视模板</h3>
在方案2和方案3中，我们能把模板看作未编译的源文件，甚至能做得更好。就像CoffeeScript、Less、或者SCSS文件。我们能在开发时监视这些模板文件，在文件更改时重新编译他们。就像把CoffeeScript编译为JavaScript一样。这样，我们总是在与预编译的模板打交道，优化器也可以在构建过程中毫不费力地内联预编译的模板。
<pre class="prettyprint">01  define(['templates/myTemplate.js'], function(compiledTemplate) {
02   
03      var myModule = {
04   
05          render: function() {
06   
07              var data = {"title":"Story", "names":[{"name":"Tarzan"}, {"name":"Jane"}]};
08              return compiledTemplate(data);
09   
10          };
11      };               
12   
13      return myModule;
14  }</pre>
<h3>性能上的考虑</h3>
使用客户端模板重新渲染UI的更新部分已是司空见惯之事。然而性能最佳的方法仍然是通过将最初的页面整体进行加载。使用这种做法，浏览器可以直接渲染HTML页面，而无需解析任何JavaScript代码，也不必发出额外的数据请求。这对于那些既是动态，又需要尽可能最大化初始加载速度的页面而言，是一项挑战。然后，最理想的是模板已开发，能重用于客户端中，这样服务器能提供最佳性能，而且维护性仍然很好。

这里需要考虑到两个问题：

• 程序的那些部分主要是动态的？而哪些部分需要减少初始化加载的时间？
• 需要把处理过程交给客户端？还是让服务器做这样的繁重工作？

这个问题只有在实际测试了几种不同的方法才能回答。不过，使用预编译模板，客户端通常不会在渲染过程中遭罪。并且在客户端、服务端复用模板的情况下，你会发现无逻辑性模板语法更为通用。
<h3>结语</h3>
我们已经看到了客户端模板的诸多好处，包括：

• 应用服务器和API善于提供纯数据（就像JSON），使用客户端模板是最合适不过的了。
• HTML与JavaScript与客户端开发者的技能结合更为自然。
• 使用模板能加强对分离表现和逻辑的实践。
• 模板能充分预编译，能充分缓存，只需要刷新以从服务器取回实际数据。
• 把渲染过程从服务端移到客户端能极大地提高性能。

我们已经看到（客户端）模板的好几个方面了。希望你对这个概念有更好的理解，了解为何需要使用它。

原文链接：<a href="http://coding.smashingmagazine.com/2012/12/05/client-side-templating/">client-side-templating</a>

原创译文，辛勤劳动，转载还请注明！
