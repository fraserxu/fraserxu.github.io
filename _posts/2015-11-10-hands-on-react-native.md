---
title: Building a Native Soundcloud Android app with React Native and Redux
layout: post
published: true
---

Seven months ago, React Native for iOS came out. I built the [ShenJS app](https://facebook.github.io/react-native/docs/android-setup.html#content) for the [2015 JSConf China](http://2015.jsconf.cn) the day after the release. It was more out of curiosity than anything else.

At [Wiredcraft](http://wiredcraft.com), we've also been building apps with the Ionic framework (Cordova + Angular.js) for one of our clients, so it's only fair that I compare these two.

### Working with Ionic

* Write once, run everywhere
* Poor performance with complex components (e.g. Google Maps)
* Toyish
* <u>Note</u>: The apps we built were iOS only - I have no idea how it plays on Android.

Mostly, we were kind of bummed by the performance. Before React Native for Android came out a few weeks ago, we had been building web and Windows (desktop) apps (really) with React (and [Electron](http://electron.atom.io/)) for the [Myanmar elections](https://wiredcraft.com/work/voter-registration-for-the-myanmar-elections/), so I got excited about giving React another try.

Our team is very comfortable with React + Redux, and I happened to find the [soundredux](https://soundredux.io) project by [Andrew Nguyen](https://github.com/andrewngu). It's a great app and I've been using it instead of the official Soundcloud client for a week. I liked it so much that I wanted to make it work on Android.

So, in an effort to learn ES6 and [redux](https://github.com/rackt/redux), I started to work on [SoundRedux Native, a simple Soundcloud native client](https://github.com/fraserxu/soundredux-native).

[![soundredux-native](https://cloud.githubusercontent.com/assets/1183541/11113509/83e13790-8958-11e5-9faa-831b7f7ba0e8.gif)](https://github.com/fraserxu/soundredux-native)

<!-- more -->

## How

So far I've only focused on Android development because I don't have an iOS device and it's only fun when your code runs on your own device.

### Setup your local dev environment

1. `npm install`
2. Check [Android Setup](https://facebook.github.io/react-native/docs/android-setup.html#content)
3. `react-native run-android`

To run it on a real device, bundle the js file into the apk:

1. create an assets folder under `android/app/src/main`
1. `curl "http://localhost:8081/index.android.bundle?platform=android" -o "android/app/src/main/assets/index.android.bundle"`

## The code logic

For a typical browser-based web app with React + Redux, you will probably write your root component for your app like this (sample code from sound-redux again!):

```JavaScript
// root.js
import React from 'react'
import { Provider } from 'react'
import configureStore from './store/configure-store'

import App from './containers/app'

const store = configureStore()

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    )
  }
 }

export default Root
```

To make it work for React Native, import `react-native` instead:

```JavaScript
// import react-native
import React from 'react-native'
// same for react-redux
import { Provider } from 'react-redux/native'
```

The next step is to **mount** it to the DOM or native view if it's for mobile:

```JavaScript
import ReactDOM from 'react-dom'
import React from 'react'

import Root from './root'

ReactDOM.render(Root, document.getElementById('main'))
```

And for React Native:

```JavaScript
import React from 'react-native'

const {
  AppRegistry
} = React

import Root from './root'

AppRegistry.registerComponent('soundreduxNative', () => Root)
```

That's all you need to use Redux with React Native. The next step is to build the view part.

With all we've done for the data layer, there's no wonder that Facebook wrote this in their blog "React Native for Android: [How we built the first cross-platform React Native app"](https://code.facebook.com/posts/1189117404435352/react-native-for-android-how-we-built-the-first-cross-platform-react-native-app/) by the time they opened source react-native for Android.

> So instead of introducing explicit if/else checks for the platform, we tried to refactor platform-specific parts of the UI into separate components that would have an Android and iOS implementation. At the time of shipping Ads Manager for Android, that approach yielded around 85 percent reuse of app code.

Here's a diagram that explains how the whole thing works:

![redux-diagram](https://cloud.githubusercontent.com/assets/1183541/11114172/986a2104-895d-11e5-89cb-9f22d2e6aaa5.jpg)

After spending some time on it, I found there was still a lot of work that needed to be done, either by improving my own code or Facebooks's design on their thread system (here we are talking about the UI thread which has a direct impact on the user experience).

They have a very long section about [common sources of performance problems](https://facebook.github.io/react-native/docs/performance.html#common-sources-of-performance-problems) on the performance page which is exactly what I've run into with my app.

Since we're using redux in the app, and for each scene, I have a `mapStateToProps` method which connects the needed data to each component container (to avoid having to pass every props from the root component all the way down - this could save a few rerenders because not all components need the whole state tree).

When the user clicks a song from the song list, a few actions will be triggered.

```JavaScript
<TouchableOpacity onPress={this.playSong.bind(this, parseInt(rowId))}>
  <SongDetail />
</TouchableOpacity>
```

And in the `playSong` function I will need to `dispatch` the `playSong` action which will change a few states in the redux reducer (with lots of calculation and network request). After that, I will `navigator` the screen to the `Song` scene which will show the user the detail view of the current playing song.

```JavaScript
playSong(i) {
  const {playlist, dispatch, navigator} = this.props
  dispatch(playSong(playlist, i))
  navigator.push({
    component: SongContainer,
    name: 'Song'
  })
}
```

If I leave it like this without doing anything, when the user touches the screen to play a song, the `TouchableOpacity` component will have a noticeable lag and the opacity effect won't kick in until the `dispatch` operation is finished. In other words "Dropping JS thread FPS because of doing a lot of work on the JavaScript thread at the same time".

So what I can do here is use the `InteractionManager` to postpone a few actions and let the animation finish first and then do the other operation, so the user won't feel the lag from the UI.

```JavaScript
playSong(i) {
  const {playlist, dispatch, navigator} = this.props
  // use this to leave room for animation
  InteractionManager.runAfterInteractions(() => {
    dispatch(playSong(playlist, i))
    navigator.push({
      component: SongContainer,
      name: 'Song'
    })
  })
}
```

This is what it does from the documentaion:

> InteractionManager allows long-running work to be scheduled after any interactions/animations have completed. In particular, this allows JavaScript animations to run smoothly.

Apart from that, this React specific performance trick also works:


```JavaScript
shouldComponentUpdate(nextProps, nextState) {
  const shouldUpdate =
    !shallowEqual(this.props, nextProps) ||
    !shallowEqual(this.state, nextState)
  return shouldUpdate
}
```

## What I've achieved so far

* Reuse the data fetching logic from soundredux and store it with redux
* Infinite scroll with react-native `ListView` component
* Player component with the help from @xeodou's [react-native-player](https://github.com/xeodou/react-native-player) module
* Search songs in a separate search scene

TODO:

* Clean up code
* Improve performance
* Make it work on iOS
* Add user login logic, and potentially try out `DrawerLayoutAndroid` component
* Publish to Google Play or even App store

## What I've learned

* Having `redux` as the data layer; it takes no effort to switch the view layer from DOM to React Native.

  Two lines of code to change

  - Delete this line `import fetch from 'isomorphic-fetch';` because `fetch` is built in for react-native
  - From `import { Provider } from 'react-redux'` to `import { Provider } from 'react-redux/native'`

* Writing CSS with flexbox is easier than normal CSS (for me personally because I'm bad at it) and you don't have to worry about browser compatibility
* Building a native module for react-native is simple and straightforward thanks to Facebook's nice design
* The Soundcloud API is awesome

## The good and the bad

The bad first, and then the good will make it right :D

### Bad:

* **Ecosystem**: There's not enough modules (yet), especially for Android.
* **Documentation**: Still needs to improve, `UIExplorer` is a good place to start.
* **Performance**: Animations and slow navigator transitions as mentioned in the [performance page](https://facebook.github.io/react-native/docs/performance.html) on the official documentation website

**Note:** I'm pretty sure the performance is something that could be fixed by improving my own code, and this is part of the reason that I'm sharing this with you. If you have any experience or suggestion, I'm all ears. Either a pull request or a [new issue](https://github.com/fraserxu/soundredux-native/issues/new) in the repo would be great!

### Good:

* **Good community and ecosystem.** No wonder the React communutiy is one of the best and active open source communities.
* **Native UI component! Good performance!**
* **Learn once, write everywhere!** If you know React, you already know how to write React Native apps.
* **Code reuse, from the Web.** If your project happens to use React for the web part, you can reuse lots of code for your mobile client.
* **Wrapping native modules is easy**, so when there's not enough modules or you have a performance issue, you can write your own and contribute to the ecosystem.

**PS:** As a JavaScript developer without any Java programming experience, I made this Couchbase-Lite binding for react-native at weekend [react-native-couchbase-lite](https://github.com/fraserxu/react-native-couchbase-lite). It's fun!

## Conclusion

As you are reading this post, there's a chance you may be wondering whether or not react-native is right for your next production project. This is not the purpose of this post and I do not have a clear answer. I've been enjoying the process and learning React Native helps me in many ways. I suggest that you check out what other people are doing:

* React Native official [showcase page](https://facebook.github.io/react-native/showcase.html) - A list of apps using React Native.
* [The Making of Gyroscope Running](https://blog.gyrosco.pe/the-making-of-gyroscope-running-a4ad10acc0d0?x) - Codename Quicksilver: Our first React Native iPhone app

Original post on Wiredcraft Blog [BUILDING A NATIVE SOUNDCLOUD ANDROID APP WITH REACT NATIVE AND REDUX](https://wiredcraft.com/blog/native-soundcloud-android-app/)
