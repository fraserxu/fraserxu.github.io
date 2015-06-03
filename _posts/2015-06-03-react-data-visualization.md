---
title: React & Data Visualization
layout: post
published: true
---

This post is based on the talk I gave about **[React & Data Vsiualization](http://slides.com/fraserxu/deck)** on a [React Meetup](http://segmentfault.com/e/teambition-02) in Shanghai on 05/30. And the code sample I used here is in [react-data-visualization](https://github.com/fraserxu/react-data-visualization)

### This post is *not* about
* React tutorial
* Data visualisation tutorial
* D3 introduction

### Process of Data Visualization
* Analysis data
* Data aggregation
* Visualize data(rendering)

### How With D3?

> D3.js is a JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS. D3’s emphasis on web standards gives you the full capabilities of modern browsers without tying yourself to a proprietary framework, combining powerful visualization components and a data-driven approach to DOM manipulation.

Here I will give an example of using the speaker votes data from this year's [JSConf China](http://2015.jsconf.cn/), which simly contain the name and votes count.

```
name  votes
Thomas Gorissen 56
Tomasz Janczuk  25
Brian Holt  59
Mikael Karon  29
Mathias Buus  35
Chriest Yu  28
Evan You(尤雨溪) 249
Eyal Arubas 30
雷宗民 82
```

**Prepare HTML**

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>D3 Demo</title>
  <script type="text/javascript" src="../node_modules/d3/d3.min.js"></script>
</head>
<body>
  <script>
  </script>
</body>
</html>
```

**Append SVG**

```JavaScript
var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
```

**Set Scale**

```JavaScript
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");
```

**Load Data**

```JavaScript
d3.tsv("../data/votes.tsv", type, function(error, data) {
  // do something here with data

  // set domain
  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.votes; })]);
});
```

**Append Bar**

```JavaScript
svg.selectAll(".bar")
    .data(data)
  .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.name); })
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.votes); })
    .attr("height", function(d) { return height - y(d.votes); });
```

**Append Axis**

```JavaScript
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("votes");
```

**Result**

![D3.js](https://cloud.githubusercontent.com/assets/1183541/7949685/fb4b29a0-09c2-11e5-8a4a-f7a397736216.png)

### How with React?

Now we know the basic step of using D3.js to do Data Visualization, let's try to do it with React. The steps are still much similar, analysis data and transform data, then use React to render it.

**Three simple guidelines**

* One source of truth
* Stateless all the things
* Don't make to many assumptions

**A typical React App**

```JavaScript
'use strict';
import React from 'react';
class App extends React.Component {
  displayName: 'App'
  constructor() {
    super();
    this.state = {
      name: 'Fraser Xu'
    };
  }
  render() {
    let { name } = this.state;
    return (
      <h1>Hi {name}</h1>
    )
  }
}
export default App;
```

**What We Want With React**

I like using React because everything I use is a component, that can be any component writen by myself in the project or 3rd party by awesome people on NPM. When we want to use it, just `import` or `require` it, and then pass in the data, and we get the visualization result.

```JavaScript
constructor() {
  super();
  this.state = {
    data: [1, 2, 3, 4, 5]
  };
}
render() {
  let { data } = this.state;
  return (
    <ChartComponent data={data} />
  )
}
```

**The Chart Component**

Now we have the basic structure, what we need to do next is to implement our own chart component.

But before we start, let's check what choice we have in terms of making graphs in React.

**With D3**

* Low level API
* Flexible code structure
* Easy customisation
* Lots of code

**With High Level Chart Library**

* High level API
* Ready for use style
* Hard to customisation

Let's start with using D3.

**A chart component With D3**

```JavaScript
'use strict';
import React from 'react';
import d3 from 'd3';
class Barchart extends React.Component {
  displayName: 'Barchart'
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.renderBarChart();
  }
  renderBarChart() {
    // render chart
  }
  render() {
    return (
      <svg />
    )
  }
}
Barchart.defaultProps = {
  width: 800,
  height: 200,
  fillColor: '#d70206'
}
export default Barchart;
```

What we need to do is the `rederBarChart` function. Here we have a problem again. Both `React` and `D3` need to own the DOM, but how do we decide which one to use.

**Use D3 build DOM**

* Powerful D3 functions and layout available for use
* Lost control of DOM by React
* No Virtual DOM

**Use SVG build DOM**

* Virtual DOM
* Lost built-in D3 update and animation

**The D3 way redenering logic**

```JavaScript
let { width, height, fillColor, data } = this.props;

let values = data.slice();

let yScale = d3.scale.linear()
  .range([height, 0]);

yScale.domain([0, Math.max.apply(null, values)]);

let svg = React.findDOMNode(this);

let chart = d3.select(svg)
  .attr('width', this.props.width)
  .attr('height', this.props.height + 1);

let barWidth = width / values.length;

let bar = chart.selectAll('g')
    .data(values)
  .enter().append('g')
    .attr('transform', (d, i) => `translate(${i * barWidth}, 0)`);

bar.append('rect')
  .attr('y', (d) => yScale(d))
  .attr('height', (d) => height - yScale(d))
  .attr('width', (d) => barWidth - 1)
  .attr('fill', fillColor);
```

**The React(SVG) way redenering logic**

A Chart component that wrap up the SVG.

```JavaScript
'use strict';

import React from 'react';

class Chart extends React.Component {

  displayName: 'Chart'

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    )
  }
}

export default Chart;
```

A rect bar component

```JavaScript
'use strict';
import React from 'react';
class Bar extends React.Component {
  displayName: 'Bar'
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <rect fill={this.props.color}
        width={this.props.width} height={this.props.height}
        x={this.props.offset} y={this.props.availableHeight - this.props.height} />
    )
  }
}
Bar.defaultProps = {
  width: 800,
  height: 200,
  fillColor: '#d70206'
}
export default Bar;
```

Together with data

```JavaScript
'use strict';
import React from 'react';
import d3 from 'd3';
import Bar from './Bar';
class DataSeries extends React.Component {
  displayName: 'DataSeries'
  constructor(props) {
    super(props);
  }
  render() {
    let { data, width, height, color } = this.props;
    let yScale = d3.scale.linear().domain([0, d3.max(data)])
      .range([0, height]);
    let xScale = d3.scale.ordinal().domain(d3.range(data.length))
      .rangeRoundBands([0, width], 0.05);
    let bars = this.props.data.map((point, i) => {
      return (
        <Bar
            height={yScale(point)}
            width={xScale.rangeBand()}
            offset={xScale(i)}
            availableHeight={height}
            color={color}
            key={i}
        />
      )
    });
    return (
      <g>{bars}</g>
    );
  }
}
export default DataSeries;
```

Finally the chart!

```JavaScript
'use strict';
import React from 'react';
import Chart from './Chart';
import DataSeries from './DataSeries';
class App extends React.Component {
  displayName: 'App'
  render() {
    return (
      <Chart width={this.props.width} heigh={this.props.heigh}>
        <DataSeries
          data={[ 30, 10, 5, 8, 15, 10 ]}
          width={this.props.width}
          height={this.props.height}
          color="cornflowerblue"
        />
      </Chart>
    )
  }
}
React.render(<App width={600} height={800} />, document.body);
```

### How with high level libraries?

Since we can already do Data Visualization with React and D3, why should I still bother with high level libraries. The reason is clear, it's simple to.

I wrapped the [Chartist.js](http://gionkunz.github.io/chartist-js/index.html) library and made this [react-chartist](https://github.com/fraserxu/react-chartist) component available on NPM.

First you just need to install with `npm install react react-chartist --save`

```JavaScript
'use strict';

import React from 'react';
import ChartistGraph from 'react-chartist';
class App extends React.Component {
  displayName: 'App'
  render() {
    let data = {
      labels: ['W1', 'W2', 'W3', 'W4', 'W5'],
      series: [
        [1, 2, 4, 8, 6]
      ]
    };
    let options = {
      high: 10,
      axisX: {
        labelInterpolationFnc: function(value, index) {
          return index % 2 === 0 ? value : null;
        }
      }
    };
    let type = 'Bar'
    return (
      <div>
        <ChartistGraph data={data} options={options} type={type} />
      </div>
    )
  }
}
React.render(<App />, document.body);
```

That's it. This approach works well for most case in our product. But once you have really complex Data Visualization to be impletment, you still have to use D3.


### Disclaimer

This post is not telling you that you should use `React` and `D3` together, but a way to demostrate that the possibility of using them together and potentially help speed up your development workflow.

### Conclusion

**Choose the way you like!**

### Further reading

The following links are what I checked while preparing this post and you should check them out.

* [Scalable Data Visualisation](https://docs.google.com/presentation/d/1DDlR6Hd03G2HcIjHzEkUf9GhX-bbaDyIl0CTUNsO1rI/pub?start=false&loop=false&delayms=60000&slide=id.p)
* [Integrating D3.js visualizations in a React app](http://nicolashery.com/integrating-d3js-visualizations-in-a-react-app/)
* [Ways of integrating React.js with D3](http://ahmadchatha.com/writings/article1.html)
* [D3 + React.js - the future of charting components?](http://10consulting.com/2014/02/19/d3-plus-reactjs-for-charting/)
