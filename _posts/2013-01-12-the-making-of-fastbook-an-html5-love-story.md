---
layout: post
title: Fastbook 的制作过程 : 邂逅 HTML5
date: 2013-01-12 18:49
comments: true
categories: []
---
在开始 Sencha 的开发之前，我们对 web 开发抱有一个希望：希望现代应用程序的开发只需要一个浏览器，而不需要其他的任何环境，另外加上一组足够强大的开发框架和强大的编码工具。以上三件武器在手，我们相信开发者一定可以开发出用户喜欢的应用程序。HTML5 的出现，为程序员提供了更多的开发工具，使得他们可以将浏览器看作应用的开发平台而不是页面渲染引擎。开发者们迅速抓住这个机会，并发布了大量基于桌面端和移动端的程序-充分利用了 HTML5 的特性，使用 web 标准建立强大的应用程序。<!--more-->

因此，当马克 扎克伯格谈到<a href="http://techcrunch.com/2012/09/11/mark-zuckerberg-our-biggest-mistake-with-mobile-was-betting-too-much-on-html5/" target="_blank"> HTML5 还没准备好</a>时，我们对此不以为然。

<img class="aligncenter size-full wp-image-1990" alt="fastbook" src="http://www.coursegarden.com/wp-content/uploads/2013/01/fastbook.png" width="508" height="339" />

<a href="http://www.geekpark.net/read/view/157633" target="_blank">HTML5 不是 Facebook 移动客户端速度慢的原因</a>。我们非常清楚现代智能手机的浏览器能够做什么， HTML5 又提供了如何丰富的特性。我们同时看到了运行最新版 iOS 5 和 Android 4.1 移动设备上性能的逐步提升以及 HTML5 应用跑分(测试浏览器对 HTML5 兼容性)的不断增加。但最重要的还是，我们看到了我们的客户(这里指使用 Sencha 的开发者)正在做什么和他们使用 HTML5 所创造出的神奇事物。

<a href="http://www.theregister.co.uk/2012/09/14/facebook_html_5_vs_native_apps/" target="_blank">Facebook 的移动客户端开发团队遇到问题</a>是因为他们碰到了一个常见的错误模式。在 Sencha 中，我们为程序员提供了开发框架和工具，因此我们对于建立 HTML5 项目的开发团队有相当成熟的经验。当一个团队在使用 HTML5 时遇到问题，通常是因为他们使用传统的'网页'开发方式去开发应用程序，而且在实际开发过程中没有使用正确的工具和架构。这正是我们质疑 Facebook HTML5 应用的地方。导致程序经常出现加载缓慢，读取用户新动态卡屏的症状。

在任何场合下，我们都想去证明 HTML5 实际上已经准备好了。因此我们决定利用空余时间重新设计 Facebook HTML5 移动客户端中最具挑战性的部分。今天，我们推出了 Sencha<a href="http://fb.html5isready.com/" target="_blank">Fastbook </a>。从技术的角度验证了 HTML5 到底可以多块，并演示 HTML5 是如何去化解这些程序开发中的最大挑战。

下面四分钟的简短视频将会展示 HTML5 客户端在面对原生 iOS 和 Android Facebook 客户端时的精彩表现（分别对应 iOS 5.2 版本和 1.9.12 版本，也是到 12 月 10 日为止的最新版本）。文章的剩余部分将会介绍 Fastbook 制作的技术细节。

<object width="480" height="400" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" align="middle"><param name="src" value="http://player.youku.com/player.php/sid/XNDg5OTAyNzA4/v.swf" /><param name="quality" value="high" /><param name="allowscriptaccess" value="sameDomain" /><param name="allowfullscreen" value="true" /><embed width="480" height="400" type="application/x-shockwave-flash" src="http://player.youku.com/player.php/sid/XNDg5OTAyNzA4/v.swf" quality="high" allowscriptaccess="sameDomain" allowfullscreen="true" align="middle" /></object>
<h4>细看“原生” Facebook 客户端</h4>
扎克伯格抱怨 HTML5 “还没准备好”，理解这句话最好的方式莫过于深入挖掘最新版本的 Facebook iOS 原生客户端。我们将 iPhone 连接到一个 web 调式代理中( web debugging proxy )，观察客户端发送数据时的 HTTP 流量变化。令我们吃惊的是，客户端的很多地方依然是原始的 HTML 页面编写。最新动态部分，也就是我们所看到的用户资料页面，全部被移到了本地。但是程序的很多其他界面仍然是发送简单的 HTTP GET 请求连接到 m.facebook.com 。现在我们看到的“原生” Facebook 应用实际上是' web/原生'混合应用：既有基于 m.facebook.com 渲染显示在 UIWebView 里的内容，也有原生的 Objective C 组件混合在一起。
<h4>重新编写“最新动态”( News Feed )页面</h4>
在了解了原生 Facebook 客户端是如何工作之后，我们很快就清楚了，体验中最难建立的就是“最新动态”部分。同时处理由上亿的用户，使用完全无法预料的方式所创造的无限数量的内容，即便对于那些最有经验的开发者来说也是一个很难解决的问题，不管他们所使用的是什么技术。

我们迫切的想要确定，在使用 HTML5 重构应用时，“最新动态”部分能够拥有很流畅的体验。为了使它变得可能，我们添加了一些新的特性，并把它们添加到了现有的 Sencha 触控框架中。

我们从实现一个能够处理未知大小的无限列表组件开始。在实际的可视屏幕区域内，建立了很少的几组 DOM 节点。这些节点将会被持续的用于循环渲染下一条或者上一条所需数据。这样一来，不管储存的数据有多大，内存的开销始终被控制的很小。实现这个部分非常简单，但是要使它在复杂多变的情况下，例如加载最新动态时，仍然能够保证速度才是最大的挑战。瓶颈来源于浏览器执行的核心进程：布局以及渲染。

建立( Sencha )框架的经验告诉我们，一些小的演示组件单独执行时能够正常工作，但是把它放入一个比较大型的应用中时表现通常比较糟糕。随着应用的逐渐变大，DOM 树也随之增加；浏览器计算布局就会需要更长时间，性能也随之下降。另外，随着可视图层数量增加，页面对于每个图层的渲染性能也会急剧下降。

因此，Fastbook 客户端是第一使用全新的"沙盒容器( Sandbox Container )"技术，将复杂的试图按照编程的方式进行分离，然后分别渲染到各自的 iframe 里，将 DOM 树分成了多个部分。从应用层面来讲，这个特殊的容器不需要额外的触发器，因此对于开发者来说会比较容易（这意味着任何被添加到容器的组建都会被自动沙盒化）。但它同样会产生一些开销：事件，定位，样式化，JavaScript 代码也需要在父窗口与子沙盒之间通过代理才能执行。这个过程非常复杂，如果没有一个强大适用的架构框架，实践起来将会非常困难。沙盒允许布局单独存在，因而能够保证主 DOM 树足够的轻。为了避免后者带来的不便，我们在使用沙盒时必须足够小心。

对于 Fastbook，最新动态，时间轴，故事板视图都是被<a href="http://www.geekpark.net/read/view/160168" target="_blank">单独的放在沙盒中</a>。所有的 DOM 元素都被高频复用于渲染所需数据，回流( reflow )是不可避免的。关键在于让这个过程变得更加简单。沙盒使得最新动态部分执行起来很像单独存在，但实际上它仍然是整个大 DOM 树的一部分。

接着，我们在任务队列( TaskQueue )中加入了最近在 Sencha Touch 中引入的特性-深度整合。任务队列避免了 DOM 读取和写入的交叉，清除了所有不必要的布局。这个与新的沙盒技术相结合，能够显著的减少复杂视图(例如时间轴和最新动态)下的布局开销。

我们添加了一个准们负责所有动画和事件的类-动画队列( AnimationQueue ), 它同样负责将比较繁重的任务推迟到 CPU 有空闲时间时才执行。它的功能类似交通警察，为不同的操作指定优先级并确保程序时刻保持待命。当程序在执行动画时，它会停止优先级比较低的功能。当程序空闲时，动画队列开始执行那些被中断的任务。例如，为了提升滑动性能，最新动态页面高速滑动时，图片加载和渲染将会被中断，直到程序空闲下来才执行。通过使用高速计时器( timer ),繁重的任务会以一种非阻塞的方式逐渐执行。这能确保触摸事件总是能被最快的执行。

另外一方面，有一些你不想被中断的函数类，例如从动态列表获取更多数据。为了确保这些不会是滑动变动缓慢，我们使用了 Web Workers 。这样我们就可以从界面( UI )线程中移除 XHR/RPC 通信。使用<a href="http://www.w3.org/TR/workers/" target="_blank"> Web Workers </a>储存网络请求开销，执行 JSON 编译与反编译可以更大程度的利用现在的多核设备。

以上是设计 Fastbook 时的技术要点，这些技术的运用让基于 web 技术的开放标准能够被更好的执行。同时，我们也非常激动，能够有这样一个机会向你展示如何巧妙的应用 HTML5 去建立这样的应用。
<h4>加分项</h4>
在分析 Facebook 原生 iOS 应用的网络性能时，我们发现了一个很有意思的地方: API 请求返回了大量拥有原始数据到客户端。连接到<a href="https://graph.facebook.com/graphql" target="_blank"> https://graph.facebook.com/graphql </a>渲染最新动态元素的 API 调用就是一个很典型的例子。平均下来，每 10 项内容就会有产生 15-20KB 的经过 gzip 压缩的 JSON 数据，但实际上，以上部分都不是渲染实际视图所需要的。

为了演示哪些方法可以优化网络流量，我们从 Facebook FQL API 返回的原始数据中添加了一个具有过滤和解析功能的代理服务器。结果是，渲染同样的页面，Fastbook 所请求的数据远小于原生客户端:在最新动态内容中，同样的内容可以减少 10% 左右。代理的使用，同样可以让我们将那些例如内容的格式化和过滤这些普通的任务卸载至服务器端进行操作。

同样，你可能会注意到<a href="http://www.geekpark.net/read/view/156827" target="_blank">原生 iOS 客户端</a>与 Fastbook 在滑动减速时间上的不同。在原生客户端里，滑动至少会持续 3s.但我们决定将动画渐变时间减少到 1.4s 。这样不仅可以加快内容读取速度，同时能够在用户阅读现有内容的时候为加载更多地内容提供额外的空闲时间。
<h4>亲手实践</h4>
Fastbook 并不能使 Facebook 客户端的替代品。它只是一个技术的展示，目的在于告诉开发者能够通过正确的使用 HTML5，相关框架和工具来做什么。如果你还在怀疑 HTML5 是否准备好了，你可以自己在现代的智能手机（我们推荐 iOS 5 或者 Android 4.1 以上系统）上测试使用<a href="http://fb.html5isready.com/" target="_blank"> Fastbook </a>.你会发现只要你将浏览器看作是应用开发平台，巧妙的运用 HTML5 的特性，再复杂的应用也能使用 HTML5 来开发。

译文来源：<a href=" http://www.sencha.com/blog/the-making-of-fastbook-an-html5-love-story/" target="_blank">the-making-of-fastbook-an-html5-love-story</a>

原文由<a href="http://coursegarden.com" target="_blank">本人</a>发表在<a href="http://geekpark.net" target="_blank">极客公园</a>，链接地址：<a href="http://www.geekpark.net/read/view/168794" target="_blank">Fastbook 的制作过程 : 邂逅 HTML5</a>

&nbsp;
