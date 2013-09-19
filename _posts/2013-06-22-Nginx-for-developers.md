---
layout: post
title: 写给Web开发人员看的Nginx介绍

---

译者注：不知道其他开发者是否和我一样，参与或者写了很多Web项目，但是却没有真正的去完整的部署应用，很多时候都是交给ops即运维的同学帮忙来做。而作为一个有节操的开发者，我认为了解一些服务器方面的知识是很有必要的，读了这篇文章之后，自己对nginx也有了一个初步的认识，对自己很有帮助，不敢独享，遂译之。

如果你是一名Web开发人员，那么你很有可能听过[nginx](http://wiki.nginx.org/Main)(读音听起来像engine-x). Nginx是一款速度快，功能强大的http以及反向代理服务器，经过简单的配置之后即可以用来托管页面。

不幸的是，和很多其他系统管理工具一样，相关的原理教程和配置说明文档都很少。虽然官方提供了一个wiki,但是内容多且复杂，却没有真正的介绍那些你可能真正需要的东西。在自己纠结这个wiki一段时间之后，我终于掌握了使用nginx的一些基础知识，并把它们在这里与其他开发者分享出来，希望你们能够更加快速的去掌握这些知识。

下面进入正题。针对本教程，你需要一个VPS（虚拟主机），最好是刚刚建立的，这样可以避免与先前的配置产生冲突。

### 初始化安装

现在假设你已经拥有一个运行ubuntu的虚拟主机(比如说托管于 [digital ocean](https://www.digitalocean.com/)),配置好登录选项并更新好 `apt` 之后，运行 `apt-get install nginx` 安装nginx.在浏览器访问你的IP地址，你会看到页面显示“welcome to ngnix”信息。OK,一切正常。

### 查找nginx目录

在我们通过 `apt` 安装完nginx后，它为我们提供了一个基本的结构，帮助我们迅速设置好配置文件。所有的nginx配置文件都在 `/etc/nginx`下（译者注：Mac OS X环境下使用homebrew路径与linux有区别，文章结尾部分提供mac下解决方案），输入 `cd` 进入该目录。你需要添加新配置选项的地方位于 `sites-enabled` 文件夹。如果你打开这个文件夹，你会发现一个名为 `default`
的txt文档，打开后你就会找到nginx的配置选项以及 "welcome to nginx"欢迎选项的代码。接下来我们开始建立属于我们自己的配置文件用于显示一个页面。在sites-enabled目录下新建一个空白文件并命名为 `test`,用你自己喜欢的文本编辑器进行编辑。

> **注意：** 在该目录下会发现一个 `/etc/nginx/sites-available` 的文件夹。这个文件夹一般在你需要建立和管理多个站点的时候非常有用，可以帮助你更好的组织不同的项目。你需要在这里添加你的nginx配置文案并将他们链接至 `sites-enabled` 目录下。命令如下：

    ln -s /etc/nginx/sites-available/dotcom /etc/nginx/sites-enabled/dotcom

只有在 `sites-enabled` 目录下的配置文件才能够真正被用户访问。但是你同样可以将文件放在 `sites-available` 目录下用来存档或者生成链接。

### 配置静态服务器

Nginx配置文件有自己的格式，好消息是文件的格式相当简单，看起来特别像CSS文件，先指定变量名，然后在花括号内编写指令。最顶层是 `server` ,代码为：

    server {
        
    }

在花括号内，我们仍然可以像书写CSS一样，键值对后接分号，或者说更像sass的语法，并添加嵌套代码块。后面两种风格的代码我们都会用到，也很容易理解。

这里可以添加的键值对和代码块（在本教程的后面我们把它称为指令）有很多种，你可以转到[官方文档](http://wiki.nginx.org/DirectiveIndex)去具体查看。对于基本的服务器设置其实只用掌握一些重要的指令即可。我会给后面的每个指令链接官方的ngnix文档。官方文档是你深入理解nginx的唯一渠道，因此你必须掌握如何更好的去使用它。

[listen](http://wiki.nginx.org/HttpCoreModule#listen)

声明服务器监听的端口号。如果你了解[rails](http://rubyonrails.org/),你一定知道本地服务器的默认端口是3000. [Roots](http://roots.cx/)运行在1111端口。SSL在443端口。互联网的默认端口是80,因此在url中未定义端口的话一般默认为80。因为你很有可能是去运行一个线上的服务器，因此最好定义成80端口。代码如下：

    server {
        listen 80;    
    }

注意默认端口严格来讲不是必要的，但是为了能够保证你对整个流程足够了解最好加上。完成了第一步，我们进入下一步server_name.

[server_name](http://wiki.nginx.org/HttpCoreModule#server_name)

server_name主要用来匹配url地址。任意请求通过nginx时，它会查看url并寻找 `server_name` 片段。如果你的站点地址为 `http://xvfeng.me`, 那么你的 `server_name` 应当也为 `xvfeng.me` . 如果你在域名解析时使用了A记录并通过服务器指向 `http://snargles.com` , 你可以添加另外一个 `server` 代码，将 `server_name` 指向 `snargles.com`, 这段代码就会匹配来自于这个域名的请求。

这个特性非常强大。这意味着你可以在单个nginx配置文件里托管无数个站点，甚至包括不同域名的网站。你需要做的只是将设置A记录并指向虚拟机所在的IP, 之后设置其他的nginx服务器配置。

针对 `server_name` 还有两点值得关注。首先是你可以设置子域名。如果你想匹配 `http://test.example.com` ,设置相当简单，甚至还可以指向一个完全不同的应用。第二点，你可以使用通配符, 即 `*` 或者正则来匹配路由。这个功能绝对强大。下面我们简单的配置一下server_name到 `example.com` .

    server {
        listen 80;
        server_name example.com;
    }

Nice.接下来再加一些配置就可以让服务器运转了。

[root](http://wiki.nginx.org/HttpCoreModule#root)

这个是托管静态站点最关键的部分。如果你只是想用它来托管一些html和css文件，root部分要定义的就是这些文件存放的路径。我喜欢把文件放在 `/var/www` 目录下，因此我们在这里建立一个文件夹。使用 `mkdir` 创建 `/var/www/example` 目录,建立一个空白的 `index.html` 文件，随便添加一些段落输出hello world之类的内容。代码如下：

    server {
        listen 80;
        server_name example.com;
        root /var/www/example;
    }

基本变量设置完毕，下一步配置路由。

[location](http://wiki.nginx.org/HttpCoreModule#location)

Location接受两个参数，一个字符串或者正则和一段代码。字符串或者正则用于匹配某个特定目录。如果你想让用户在访问 `example.com/whaterver` 时访问某个特定页面，你需要将 `whatever` 设置为uri地址。在这里我们只需要访问root目录，因此只需要加上 `/` 即可，内容暂时为空，后面再做解释。

    server {
        listen 80;
        server_name example.com;
        root /var/www/example;

        location / {
            
        }
    }

第一参数可以有很多种写法，你可以参考上面给出的链接。在以上区块内，我们需要路由指向结果页面。注意 `/` 会匹配所有的url地址，因为在这里它被解释为一个正则。如果你只想匹配某个准确的字符串，只需要在前面加上一个等号，写法如下：

    location = / { ... }

现在我们需要完成之前的代码。我们可以在区块内添加另外一段指令，用于加载名为 `try_files` 的文件。Try fiels接受了一组文件名或者正则，用于在根目录下查找，并会加载查找到的第一个结果。对于我们的静态服务器来讲，我们希望找到一个在 `/` 之后紧跟着whatever的文件，例如 `whatever.html`. 如果在斜线后面没有任何内容，则会寻找 `index.html`.
在上面给出的文档链接种你可以找到更多的关于如何设置该选项的吸纳关系介绍，这里我们只写一些简单的配置：

    server {
        listen 80;
        server_name example.com;
        root /var/www/example;

        location / {
            try_files $url $url/ /index.html;    
        }
    }

你可能会奇怪上面的 `$url` 是从哪里来的？其实是nginx所提供的。每次有请求时，nginx会生成[一系列](http://wiki.nginx.org/NginxHttpCoreModule#Variables)变量，这些变量存储了请求的相关信息。这里的[uri](http://wiki.nginx.org/NginxHttpCoreModule#.24uri)就是我们将要了解的内容之一。

* 来自 `http://example.com` 的请求进入。
* nginx找到server片段代码，其中 `server_name` 为 `example.com` ，并使用它来处理请求
* nginx匹配任意请求。因为这里的 `/` 会匹配根域名下的任意内容。
* 在匹配到的location代码种，nginx开始试图加载一个文件。首先寻找一个未命名的文件，因为这里的url匹配的就是没有名称的文件，所以无法找到。接着开始查找未命名的目录，结果还是找不到。最后开始查找并加载根目录下 `/index.html` 。

接下来想象一下如果你添加一个名为 `test.html` 的文件到根目录下并访问 `http://example.com/test.html` .自己试一下你就知道了。

你可以任意的去尝试改变这里的配置环境。例如，在[carrot.is](http://carrot.is/)这个网站里，但用户访问某个文件并且没有加上 `.html` 后缀时，try_files同样会查找 `$uri.html` 并匹配相应结果。因此在你访问 `http://carrot.is.about` 和 `http://carrot.is/about.html` 时你会得到相同的文件。你可以充分发挥你的想象力去设置你的配置文件。

### 启动服务

总结一下我们所做的事情。首先添加了 `server` 选项，在nginx运行时，会查找 `/etc/sites-enabled` 目录下的所有配置文件用于显示对应内容。但是请等一下，你可能无法马上得到结果－因为nginx并不知道你所作的这些改动。为了让nginx真正读取新配置文件，你需要重启服务器，运行以下命令：

    service nginx reload

> 注意：这里的 `service` 命令实际上是调用了配置文件里内容，这些都在使用 `apt` 时被生成。这里调用的实际上是 `/etc/init.d/nginx reload` .

接下来就是访问服务器IP地址便可得到你想要的页面。

Mac OS X下参考文档：[Installing Nginx in Mac OS X Mountain Lion With Homebrew](http://learnaholic.me/2012/10/10/installing-nginx-in-mac-os-x-mountain-lion/)

原文链接： [http://carrot.is/coding/nginx_introduction](http://carrot.is/coding/nginx_introduction)

转载请注明出处： [http://xvfeng.me/posts/Nginx-for-developers/](http://xvfeng.me/posts/Nginx-for-developers/)


