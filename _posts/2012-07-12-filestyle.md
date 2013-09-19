---
layout: post
title: jQuery文件上传框样式插件简单使用说明
date: 2012-07-12 21:53
comments: true
categories: []
---
浏览器通常不允许为文件输入框添加样式。今天介绍的这个jQuery filestyle插件就是来解决这个问题的。它允许你使用图片来代替默认的浏览器文件按钮。同样的，你也可以使用css吧文件名区域定义成普通的文本框。该插件仅仅由简单的JavaScript和jQuery 实现。

插件如何工作？

首先将文件输入区域用div嵌套。这个div同时拥有作为背景图片的按钮。图片按钮与浏览器上的普通文件输入区域按钮对齐。之后我们把默认的文件输入区域的透明度设为0.之后所选中的文件就会一普通文本输入框来模拟文件输入框来进行显示。<!--more-->

如何使用？

文件样式完全取决于jQuery.首先将代码加载到头部。
<pre class="brush: html; gutter: true">&lt;script type=&quot;text/javascript&quot; src=&quot;jquery.js&quot;&gt;&lt;/script&gt;

&lt;script type=&quot;text/javascript&quot; src=&quot;jquery.filestyle.js&quot;&gt;&lt;/script&gt;</pre>
同时你还需要一张你自己定义的按钮图片。以下为示例图片

之后就是开始定义外观了
<pre class="brush: javascript; gutter: true">$(&quot;input[type=file]&quot;).filestyle({
image: &quot;choose-file.gif&quot;,
imageheight : 22,
imagewidth : 82,
width : 250
});</pre>
下面就是插件的下载地址了

最新版插件地址： <a title="源代码" href="http://www.appelsiini.net/download/jquery.filestyle.js">source</a> 或者 <a title="minified" href="http://www.appelsiini.net/download/jquery.filestyle.mini.js">minified</a> 版本.

插件作者主页：http://www.appelsiini.net
