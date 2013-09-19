---
layout: post
title: 教你10分鐘內替換Jekyll博客樣式

---

閱讀本文之前，我假定你已經知道[Jekyll](http://jekyllrb.com/)是什麼，而且了解基本的使用Github生成靜態博客的相關知識(不然就沒有替換原主題這麼一說了Orz.)。如果你還不太瞭解，推薦訪問[Jekyll](http://jekyllrb.com/)的官方網站, 包含了Jekyll的詳細信息。中文教程也可參照著名博客[阮一峰的網絡日誌](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)，裏面包含入門教程，以及我們爲什麼要使用Jekyll來搭建博客。

使用之前的博客樣式有一段時間了，但是始終覺得樣式不太滿意。希望找到一個真正適合閱讀，界面更加簡潔的單欄佈局。偶然在逛Twitter時發現了一篇題爲[Things I Wish I Were Told About Angular.js](http://ruoyusun.com/)文章，然後就愛上了博客的樣式。但文章本身不是本文討論的重點。之前在很多地方也看過其他博主使用類似主題，也很容易就判斷出這是基於Jekyll的靜態博客，託管與[Github](http://github.com).

## 克隆項目代碼

首先找到了該博客的Github項目地址[git@github.com:insraq/insraq.github.com.git](git@github.com:insraq/insraq.github.com.git).下一步就是需要分別從Github克隆該項目以及自己博客代碼。

    $ cd ~/blog
    $ git clone git@github.com:fraserxu/fraserxu.github.io.git
    $ git cloen git@github.com:insraq/insraq.github.com.git

## 替換主要style, JavaScript, 以及_layouts目錄

現假設在本地有 `~/blog/` 目錄，然後克隆項目分別爲 `~/blog/insraq.github.com` , `~/blog/fraserxu.github.io `.基於Jekyll的博客的代碼目錄結構非常類似，所以我們需要做的就是簡單的替換掉負責樣式Style以及JavaScript的部分。

基本結構如下：

    ├── 404.html
    ├── CNAME
    ├── LICENSE
    ├── _config.yml
    ├── _layouts
    ├── _posts
    ├── about.html
    ├── apple-touch-icon.png
    ├── archive.html
    ├── atom.xml
    ├── css
    ├── favicon.ico
    ├── images
    ├── index.html
    ├── js
    └── readme.markdown

首先可以替換的就是 `css` , `_layouts` 以及 `javascript` 目錄，執行一下命令：
	
    $ rm -rf ~/blog/fraserxu.github.io/css
    $ rm -rf ~/blog/fraserxu.github.io/js
    $ cp -rf ~/blog/insraq.github.com/css ~/blog/fraserxu.github.io
    $ cp -rf ~/blog/insraq.github.com/js ~/blog/fraserxu.github.io
    $ rm -rf ~/blog/fraserxu.github.io/_layouts
    $ cp -rf ~/blog/insraq.github.com/_layouts ~/blog/fraserxu.github.io

## 替換作者信息，icon圖標, CNAME信息

替換完成後，下一步修改作者相關信息。

    $ vim ~/blog/fraserxu.github.io/_layout/defautl.html

替換 `header` 部分信息

    <div class="header">
        <h1><a href="/">Fraser Xu's</a></h1>
        <h2>Thoughts on life and code</h2>
    </div>

依次類推，替換代碼其他包含作者信息部分。例如 `about.html` , 替換成你自己的介紹信息。

最後一部需要修改的就是 `CNAME` 部分，替換成自己的域名。以及替換相關的 `icon` 文件。

## 提交代碼

文件替換後，最後一部提交代碼

    $ cd ~/blog/fraserxu.github.io
    $ git add .
    $ git commit -m 'another brand new awesome blog layout'
    $ git push origin master

搞定！10分鐘內替換博客佈局，Have Fun!




