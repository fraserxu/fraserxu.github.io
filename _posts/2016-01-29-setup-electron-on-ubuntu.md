---
title: Setup Electron on Ubuntu
layout: post
---

#### Start from a fresh ubuntu server.

```sh
$ docker-machine start dev
$ eval "$(docker-machine env dev)"
```

#### Running docker in interactive mode

```sh
# run docker in interactive mode
$ docker run -i -t ubuntu:14.04.3 /bin/bash
```

#### Install nodejs on Ubuntu

```sh
# install node
$ apt-get install -y curl
$ curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
$ sudo apt-get install -y nodejs
```

####  Install tape-run.

```sh
# install tape-run
npm i -g tape-run
```

#### Checking what's missing

```sh
# checking missing dependencies
root@8aabd4ac0ce8:/# /usr/lib/node_modules/tape-run/node_modules/browser-run/node_modules/electron-stream/node_modules/electron-prebuilt/dist/electron --help
/usr/lib/node_modules/tape-run/node_modules/browser-run/node_modules/electron-stream/node_modules/electron-prebuilt/dist/electron: error while loading shared libraries: libgtk-x11-2.0.so.0: cannot open shared object file: No such file or directory
```

#### Install missing dependencies

```sh
# install missing dependencies
apt-get install -y libgtk2.0-0 libnotify-bin libgconf-2-4 libnss3 xvfb
```

#### Start xvfb server

```sh
# start xvfb server
export DISPLAY=':99.0'
Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

#### Start tape-run

```sh
# start tape-run
$ root@8aabd4ac0ce8:/# echo "console.log('yo'); window.close()" | tape-run
yo
```
