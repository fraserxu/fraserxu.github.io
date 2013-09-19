---
layout: post
title: '如何组织AngularJS项目代码结构'
---

学习AngularJS有一段时间了。对比其他一些MVC框架，AngularJS可以帮你更好的去组织代码。公司当前在开发一个单页面的WebApp，之前使用Backbone开发。但是经过一段时间讨论，我们最终决定转向使用AngularJS。二者对比起来，AngularJS代码结构更加清晰，即便没有写过多少前端代码或者使用过MVC框架，你都可以直接的去理解代码。

但是这并不能意味着使用AngularJS组织代码就会很容易。一不小心，你就可能会使你的代码乱做一团。

废话少说，下面就我使用AngularJS一段时间之后总结出来的一些好的实践。对我个人的项目是很有帮助的，也拿出来跟大家分享。

请看下面例子。

访问某个地址得到如下页面:

![angular_post_01](https://raw.github.com/xufeng123/xufeng123.github.com/master/images/angular_post_01.png)

然后登录，并跳转到/sports页面:

![angular_post_02](https://raw.github.com/xufeng123/xufeng123.github.com/master/images/angular_post_02.png)

之后再跳转到/players页面:

![angular_post_03](https://raw.github.com/xufeng123/xufeng123.github.com/master/images/angular_post_03.png)

这个例子里面涵盖了一个WebApp的大部分常见操作。那么如何来实现这些功能呢？

1) 首先就是定义路由和控制器Controller。每个页面都由一个主要的Controller来控制：

<script src="https://gist.github.com/xufeng123/5487373.js"></script>

2) 现在我们定义好了路由，模板以及Controller。你会发现，每个页面都有Footer且内容一样。Header也出现在每个页面，内容也基本一致。考虑到我们会多次使用到Footer，这里我们定义一个directive。这个directive拥有一个模板以及一个controller。这样，我们在需要使用时只用添加一个链接就可以了。

<script src="https://gist.github.com/xufeng123/5487466.js"></script>

3) Header部分也基本一样。我们会在很多地方使用到它，但是这里和Footer还是有点区别。在这里，我使用AngularUI ui-if directive。根据不同的需求显示不同的内容。

<script src="https://gist.github.com/xufeng123/5487504.js"></script>

这里有两点需要注意。首先是scope属性，我们使用了user:"=". 这是什么意思？这里将会添加user到外部的scope($scope.user).它将会把HTML里的值作为参数建立双向绑定。如果user没有输入任何值，它就会假设父级scope变量的名称为user.有点疑惑，到底是啥意思？

如果你在HTML模板中插入`<div header user="userModel">`, 这将意味着Header directive中的$scope.user永远与Controller里的$scope.userModel一致。如果其中一个发生变化，另外一个也会随之变化。这实在是酷了！因此，我们可以使用ui-if来检查$scope.user是否存在于模板当中。同样，因为这里使用的是双向绑定，如果$scope.userModel从undefined变为user(假设用户登录后), header也会随之变化。

4) 现在我们要做的就是使用我们的directive为每个controller分别创建主模板。

<script src="https://gist.github.com/xufeng123/5487885.js"></script>

到这里我们就完成了。我们拥有了一个由页头，页尾以及特定内容的页面。现在，每次我们需要添加页面，只需要建立一个controller, 创建一个模板，然后根据需要添加header和footer。

related post: [http://www.blogeek.com.ar/2013/03/23/the-right-way-of-coding-angularjs-how-to-organize-a-regular-webapp/](http://www.blogeek.com.ar/2013/03/23/the-right-way-of-coding-angularjs-how-to-organize-a-regular-webapp/)
