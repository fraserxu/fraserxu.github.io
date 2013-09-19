---
layout: post
title: 是时候扔掉那本讲JavaScript“闭包”的书了
date: 2012-12-12 00:58
comments: true
categories: []
---
<p>来看看JavaScript中的一个强大特性-闭包。简单来讲，闭包是一个在函数内部建立的变量，并且在函数执行完并退出后依旧存在。(a closure is a variable, created inside a function, which continues to exist after the function has finished executing.)
理解好闭包概念可以帮助你避免IE浏览器的内存泄露问题，同时能够在建立JavaScript对象时充分利用私有（局部）变量和方法。</p><!--more-->

<strong>你好，闭包</strong>

<p>下面是一个可以很好的说明这个概念的例子。</p>
<pre class="prettyprint">try {
alert(closureDemo);
}
catch(err) {
alert("closureDemo doesn't exist yet, hit 'OK', we'll call the function that creates it and try again");
}
var theDemo = function () {
closureDemo = "This is a closure! This string is displayed in an alertBox outside of the function which created it.";
}
theDemo();
alert(closureDemo);
</pre>
<p>仔细阅读代码，你会发现我们正尝试在一个变量还未定义之前就访问它。我们将这个变量放在一个try/catch语句里面，从而确保知道将要发生的这个错误不会生成一条错误的信息。当然，closureDemo目前为止还不存在，所以catch语句将会被执行。之后我们定义了一个函数并创建closureDemo变量, 然后调用函数本身: theDemo(). 最后我们会得到一条closureDemo所代表的字符串，整个过程执行成功。</p>

<p>因为我们在theDemo函数内部建立了一个闭包，所以最后一个弹出语句能够执行。这里函数能够被执行是因为JavaScript有一个很奇怪的特性，在你未使用var关键字声明一个变量时，这个变量会变成全局变量。因此，你可能经常会在未意识到的情况下建立了一个闭包，造成的原因而仅仅是你很容易忘记在代码内部声明的变量之前添加关键词var.</p>

<p>你可以使用下面的button来进行测试:</p>
/** Button **/

<strong>子函数与闭包</strong>
<p>这时候你可能会在嘀咕，“那有怎样”？</p>

<p>如果仅仅是因为IE浏览器下使用它时容易发生内存泄露，实际上还是有很多的理由去了解JavaScript如何以及为什么会建立闭包。（这样做一个不好的地方就是有一句告诫：永远也不要使用子函数，因为它们会建立闭包。）这句话可能是对的，但是也有可能是错的。它完全取决于你如何编写你的代码。下面我们来看一个子函数/闭包。</p>
<pre class="prettyprint">theParent = function () {
theChild() = function() {
alert("I'm the baby!);
}
}
theParent();
theChild();
</pre>
<p>现在任何一个经过传统训练的程序员在看了这段代码之后都会认为”theChild()”只能在”theParent()”内部执行。但是在JavaScript中却不是这样。不信请点击下面的按钮，结果是”theChild()”将不用经过theParent()而被立即执行.</p>

/* Button */

<p>回答这个为什么会发生的答案当然就是因为我们把函数当成了变量来定义而且没有使用var关键字，因此theChild变成了全局变量并形成闭包。</p>

<p>同样一个却没有建立闭包的例子如下</p>
<pre class="prettyprint">var theParent = function () {
var theChild() = function() {
alert("I'm the baby!);
}
}
theParent();
theChild();
</pre>
<p>在这个例子当中，在脚本最后调用的theChild()将会生成一个错误。原因是要执行theChild()函数，调用语句必须在theParent()函数内部。</p>

<strong>不只是全局变量</strong>
<p>一个闭包不仅仅只是一个全局变量。看看下面这个在高端JavaScript代码里流行出现的一个对象。</p>
<pre class="prettyprint">var myObject = function() {
var privateVar = 'This variable is private!';
var privateFunction = function() {
alert('this function is Private!');
}
return {
showPrivateVar : function () {
alert(privateVar);
},
changePrivateVar : function(val) {
privateVar = val;
},
callPrivateFunc : function() {
privateFunction();
}
}
}();
</pre>
<p>理解这段代码如何工作的关键就是去看代码的第一行和最后一行，中间部分暂时不看。</p>
<pre class="prettyprint">var myObject = function() {} ();</pre>
<p>你可以看到我们在这里建立了一个myObject的变量，它是一个不接受任何参数的函数。花括号只是代码的去向，结尾部分包含另一对括号(), 这对结尾的括号告诉JavaScript在解析完它之后立即执行函数。这个的意思就是myObject并不等于你所看到的函数，而是那个函数所返回的内容。</p>

<p>那么JavaScript建立了这个函数，执行它，并将返回内容放在myObject内部。这里返回的内容是一个包含了三个方法(showPrivateVar, changePrivateVar, callPrivateFunc)的JavaScript对象。</p>

<p>这里最酷的地方在于privateVar和privateFunction只能通过哪些被返回的方法去访问。那个创建它们的函数已经不再存在，只有函数的结果存在，并且哪些函数能够获取privataVar和privateFunction。原因在于它们形成了闭包，实际存在但是却可以通过很有限的方式被访问。</p>

<p>这里如果我们调用myObject.showPriavateVar(),我们将会得到一个返回“这是一个私有变量的”弹出框。同样地当我们调用myObject,privateVar(‘new value’), 我们可以改变privateVar的值，这也同样是唯一能够改变privateVar值得一种方式。最后我们可以通过myObject.callPrivateFunc()来调用私有函数。</p>

<p>因此闭包相对于意外创建全局变量（潜在影响其它同名变量）和IE浏览器下导致内存泄露来讲，显得更加有用。当你开始从编写简单和进阶的JavaScript代码转到完全面向对象的程序时，闭包可以保住你保护好重要的变量和方法，避免被你自己或者其它你所使用的modules和库影响。</p>

<strong>Closure的使用</strong>
<p>因此，JavaScript闭包的第一原则就是尽量使用在函数的内部使用var关键字，除非你是故意的创建闭包，这个原则也同样适用于在使用声明变量式的语法去创建函数的时候。</p>

<p>第二个原则就是在任何你需要隐藏一个对象的变量和方法时使用闭包。这是一个相对比较高级的技巧，但是却很容易被掌握，并且最终会在建立真正面向对象的程序时起到很大作用。</p>

<p>原文链接：<a title="Closing_The_Book_On_Javascript_Closures" href="http://www.hunlock.com/blogs/Closing_The_Book_On_Javascript_Closures" target="_blank">Closing_The_Book_On_Javascript_Closures</a></p>

<p>原创译文，转载请注明！</p>
