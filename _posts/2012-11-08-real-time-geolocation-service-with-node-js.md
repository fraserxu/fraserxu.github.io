---
layout: post
title: 使用NODE.JS建立实时地理位置服务应用
date: 2012-11-08 23:54
comments: true
categories: []
---
原创译文，原文链接：<a href="http://tympanus.net/codrops/2012/10/11/real-time-geolocation-service-with-node-js/">REAL-TIME GEOLOCATION SERVICE WITH NODE.JS</a>

伙计们，你们好！今天的教程我们将会制作一个简单的实时应用，它可以直接在地图上决定和显示当前连接用户的地理位置。这里我们将会使用Node.js和HTML5地理位置API来实现这个功能。你或许知道<a href="http://nodejs.org/" target="_blank">node.js</a>是一个异步的web服务器，它基于Google的V8 JavaScript引擎，为后台实时应用提供了完美的解决方案。我们的应用可以借助<a href="http://socket.io/" target="_blank">socket.io</a>（使用Web Sockets技术）让用户能够在地图上看到其他人的活动。示例可以在所有支持<a href="http://caniuse.com/#search=geolocation" target="_blank">HTML5 地理位置API</a>的浏览器里运行。<!--more-->

<a href="http://www.coursegarden.com/wp-content/uploads/2012/11/browser.jpg"><img class="aligncenter size-full wp-image-1792" title="browser support" src="http://www.coursegarden.com/wp-content/uploads/2012/11/browser.jpg" alt="" width="566" height="104" /></a>

<strong> 安装NODE</strong>

首先你需要在电脑上安装node.js. 你可以从官方站点的下载页面获取针对各个平台的预编译Node.js二进制文件:<a href="http://nodejs.org/download" target="_blank"> http://nodejs.org/download</a>.

安装完成后你就可以连接到npm（node package manager），借助它你可以安装教程里所有的模块。这里我们将会使用到<a href="http://socket.io/" target="_blank">socket.io</a>和<a href="https://github.com/cloudhead/node-static" target="_blank">node-static</a>模块，用于很轻松的存放我们的客户端文件。进入你的程序目录，然后运行终端或者命令行：
<pre class="brush: javascript; gutter: true">npm install socket.io node-static</pre>
提示：我建议你安装一个nodemon的工具，可以让你在每次改动之后不用去重启服务器就可以看到文件的变化：
<pre class="brush: javascript; gutter: true">npm install nodemon -g</pre>
‘-g’意为全局安装，可以从任意node目录获取

<strong> HTML部分</strong>

<strong></strong> 首先在公共目录建立index.html文件
<pre lang="html">
<!doctype html>
<html>

	<head>
		<meta charset="utf-8">
		<meta name="author" content="Dmitri Voronianski">
		<title>Real-Time Geolocation with Web Sockets</title>
		<link href='http://fonts.googleapis.com/css?family=Lato:300,400' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" href="./css/styles.css">
		<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.4/leaflet.css" />

		<!--[if lt IE 9]>
			<script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
	</head>

	<body>
		<div class="wrapper">
		  <header>
		  	<h1>Real-Time Geolocation Service with Node.js</h1>
		  	<div class="description">Using HTML5 Geolocation API and Web Sockets to show connected locations.</div>
		  </header>

		  <div class="app">
		  	<div class="loading"></div>
		  	<div id="infobox" class="infobox"></div>
		  	<div id="map">To get this app to work you need to share your geolocation.</div>
		  </div>
		</div>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js"></script>
		<script src="./js/lib/leaflet.js"></script>
		<script src="/socket.io/socket.io.js"></script>
		<script src="./js/application.js"></script>
	</body>

</html>
</pre>

看起来确实很简单对么？为了能够在页面加载地图，这里我们将会使用到一个非常优秀的开源JavaScript库-<a href="http://leaflet.cloudmade.com/" target="_blank">Leaflet.js</a>。它完全免费并且可以高度自定义。它的API文档在网站上就可以找到。style.css在’./public/css’文件夹下面。它包含了一些简单的样式。leaflet.css也在相同的目录下，用于样式化地图。 服务器端 现在开始应用的后端部分。来看看”server.js”:

<pre lang="javascript">
// including libraries
var http = require('http');
var static = require('node-static');
var app = http.createServer(handler);
var io = require('socket.io').listen(app);
 
// define port
var port = 8080;
 
// make html, js & css files accessible
var files = new static.Server('./public');
 
// serve files on request
function handler(request, response) {
    request.addListener('end', function() {
        files.serve(request, response);
    });
}
 
// listen for incoming connections from client
io.sockets.on('connection', function (socket) {
 
  // start listening for coords
  socket.on('send:coords', function (data) {
 
    // broadcast your coordinates to everyone except you
    socket.broadcast.emit('load:coords', data);
  });
});
 
// starts app on specified port
app.listen(port);
console.log('Your server goes on localhost:' + port);
</pre>

代码一点儿也不复杂。它所做的就是存放文件并从客户端监听数据。现在我们可以从终端或者命令行来启动我们的应用看看：
<pre class="brush: javascript; gutter: false">node server.js</pre>
或者，如果你按照我的方法安装了nodemon，你可以这样写：
<pre class="brush: javascript; gutter: false">nodemon server.js</pre>
现在在你的浏览器访问localhost:8080(你可以把端口号设为你想要的任意端口)。我们还没有准备好我们主要的js函数，因此所有的文件现在都为静态。

<strong> 客户端文件</strong>

现在我们终于可以打开”./public/js/application.js”文件并开始编写几段函数（这里主要使用jQuery）:

<pre lang="javascript">
$(function() {
    // generate unique user id
    var userId = Math.random().toString(16).substring(2,15);
    var socket = io.connect("/");
    var map;
 
    var info = $("#infobox");
    var doc = $(document);
 
    // custom marker's icon styles
    var tinyIcon = L.Icon.extend({
        options: {
            shadowUrl: "../assets/marker-shadow.png",
            iconSize: [25, 39],
            iconAnchor:   [12, 36],
            shadowSize: [41, 41],
            shadowAnchor: [12, 38],
            popupAnchor: [0, -30]
        }
    });
    var redIcon = new tinyIcon({ iconUrl: "../assets/marker-red.png" });
    var yellowIcon = new tinyIcon({ iconUrl: "../assets/marker-yellow.png" });
 
    var sentData = {}
 
    var connects = {};
    var markers = {};
    var active = false;
 
    socket.on("load:coords", function(data) {
        // remember users id to show marker only once
        if (!(data.id in connects)) {
            setMarker(data);
        }
 
        connects[data.id] = data;
        connects[data.id].updated = $.now(); // shorthand for (new Date).getTime()
    });
 
    // check whether browser supports geolocation api
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError, { enableHighAccuracy: true });
    } else {
        $(".map").text("Your browser is out of fashion, there\'s no geolocation!");
    }
 
    function positionSuccess(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var acr = position.coords.accuracy;
 
        // mark user's position
        var userMarker = L.marker([lat, lng], {
            icon: redIcon
        });
 
        // load leaflet map
        map = L.map("map");
 
        // leaflet API key tiler
        L.tileLayer("http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png", { maxZoom: 18, detectRetina: true }).addTo(map);
         
        // set map bounds
        map.fitWorld();
        userMarker.addTo(map);
        userMarker.bindPopup("<p>You are there! Your ID is " + userId + "</p>").openPopup();
 
        // send coords on when user is active
        doc.on("mousemove", function() {
            active = true; 
 
            sentData = {
                id: userId,
                active: active,
                coords: [{
                    lat: lat,
                    lng: lng,
                    acr: acr
                }]
            }
            socket.emit("send:coords", sentData);
        });
    }
 
    doc.bind("mouseup mouseleave", function() {
        active = false;
    });
 
    // showing markers for connections
    function setMarker(data) {
        for (i = 0; i < data.coords.length; i++) {
            var marker = L.marker([data.coords[i].lat, data.coords[i].lng], { icon: yellowIcon }).addTo(map);
            marker.bindPopup("<p>One more external user is here!</p>");
            markers[data.id] = marker;
        }
    }
 
    // handle geolocation api errors
    function positionError(error) {
        var errors = {
            1: "Authorization fails", // permission denied
            2: "Can\'t detect your location", //position unavailable
            3: "Connection timeout" // timeout
        };
        showError("Error:" + errors[error.code]);
    }
 
    function showError(msg) {
        info.addClass("error").text(msg);
    }
 
    // delete inactive users every 15 sec
    setInterval(function() {
        for (ident in connects){
            if ($.now() - connects[ident].updated > 15000) {
                delete connects[ident];
                map.removeLayer(markers[ident]);
            }
        }
    }, 15000);
});
</pre>

每次鼠标移动，我们使用socket.emit向node服务器发送信息是时奇迹就发生了。这意为这用户正活跃在页面上。socket.on也同时帮助我们从服务器端接收数据，并在地图上初始化标记。这里我们需要的主要是从浏览器里获取的标记的坐标位置。如果用户离开页面超过15秒，我们将会从地图上移除他的标记。如果用户的浏览器不支持地理位置API,我们将会弹出浏览器版本过低的信息。你可以从以下链接获取更多关于HTML5地理位置API的信息： <a href="http://diveintohtml5.info/geolocation.html" target="_blank">Geolocation - Dive Into HTML5</a>.

<strong>演示代码</strong>

你可以从我的<a href="https://github.com/voronianski/realtime-geolocation-demo" target="_blank">github仓库</a>下载源码并在本地进行测试。如果你有任何问题，请随时在评论下面或者通过e-mail与我取得联系。谢谢！ 注意，演示有时候可能会因为服务器超载而不能正常加载。

<a href="http://tympanus.net/Tutorials/RealtimeGeolocationNode/" target="_blank">查看演示</a>

<a href="https://github.com/voronianski/realtime-geolocation-demo" target="_blank">下载源码</a>

原创译文，欢迎转载，还请注明出处！
