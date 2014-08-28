---
layout: post
title: Tmux Cheat Sheets

---

Tmux是一个命令行下的session管理器。

### 安装

1. 使用你喜欢的包管理器来安装。这里以`port`为例

```
$ sudo port install tmux
```

2. 检查是否安装成功

```
$ tmux -V
tmux 1.8

$ which tmux
/opt/local/bin/tmux

$ man tmux
```

### 创建一个session

这里我们创建一个简单的nodejs静态服务器(假设有一个简单的server.js文件)

1. 没有tmux的情况下：

* 运行`node server.js`
* 浏览器端访问服务器地址`http://127.0.0.1:3000`
* 退出命令行/终端
* 再次访问`http://127.0.0.1:3000`会发现服务器已经停止运行

2. 有tmux的情况下

* 运行`tmux`
* 执行`node server.js`
* 浏览器端访问服务器地址`http://127.0.0.1:3000`
* 退出命令行/终端
* 再次访问`http://127.0.0.1:3000`会发现服务器仍然正常运行

### Session管理

1. 启动session

```
tmux
```

2. 启动一个自定义名称的session

```
tmux new -s [your-session-name]
```

3. 列出所有运行中的session

```
tmux ls
```

4. 添加一个session

```
tmux attach -t [your-session-name]
```

5. 关闭一个session

```
tmux kill-session -t [your-session-name]
```

6. 关闭所有sesion

```
tmux kill-server
```

### 窗口管理

1. 在使用Tmux命令之前，**默认需要同时按住`Ctrl+b`的前缀**(这里注意是先同时按住，之后松开键盘，最后才输入需要执行的指令)

2. 创建一个带有session的新窗口

```
tmux new -s [your-session-name] -n [your-window-name]
tmux new -s monitor -n top
```

3. 在当前session中创建新窗口

```
Ctrl+b c
```

4. 重命名当前窗口

```
Ctrl+b ,
```

5. 使用`Ctrl+b c`和`Ctrl+b ,`,创建在四个窗口中运行的四个进程

* 窗口名为*top*的运行`top`命令
* 窗口名为*ping*的运行`ping google.com`命令
* 窗口名为*node*的运行`node server.js`命令
* 窗口名为*errlog*的运行`tail -f /var/log/apache2/error_log`命令

6. 窗口间的移动

```
Ctrl+b n    // 跳到下个窗口
Ctrl+b p    // 跳到前一个窗口

Ctrl+b 0    // 跳到第一个窗口
Ctrl+b 1    // 跳到第二个窗口
Ctrl+b 2    // 跳到第三个窗口
Ctrl+b 3    // 跳到第四个窗口

Ctrl+b w    // 显示菜单选择
Ctrl+b f    // 查找窗口
```

### panes

1. 创建新session

```
tmux new -s monitor
```

2. 竖直切割窗口

```
Ctrl+b %
```

3. 水平切割

```
Ctrl+b "
```

4. panes间的切换

```
Ctrl+b o
```

5. 在预定义布局间切换

```
Ctrl+b spacebar
```

6. 关闭当前pane

```
Ctrl+b x
```
