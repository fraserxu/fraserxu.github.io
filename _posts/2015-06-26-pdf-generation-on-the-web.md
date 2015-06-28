---
title: PDF Generation On The Web 
layout: post
published: true
---

The Wiredcraft team is working on the Myanmar voter registration system during the past half year. One part of the systems we are building is a native Windows application that needs to work offline and generate a PDF from a list of voters.

## There're serval challenges we need to tackle:

* Native application that needs to run on Windows
* The client needs to run offline due to the poor Internet connection
* Generate a single PDF with 1000 pages with web technology
* The text on the PDF should be in Myanmar language

## The stack we're using:

* Electron to build and pack the application for Windows
* A Go lang CLI to interact with encrypted sqlite database
* React to build the user interface
* Flux + Immutablejs to deal with front-end data flow

## The workflow

Data + Template => Rendered HTML => PDF

### Prepare the data

```JSON
{
  "id": 1,
  "voter_name": "ဒေါ်ကြည်စိန်",
  "gender": "မ",
  "dob": "1989-04-17",
  "father_name": "ဦးအုန်းဇော်",
  "mother_name": "ဒေါ်စန်းရီ",
  "address": "ခုံကြီးကျေးရွာ"
}
```

A simple `reader.js` function to read the data. In production this could be a restful api or something like that.

```JavaScript
var fs = require('fs');

module.exports = function(path, cb) {
  fs.readFile(path, function(err, data) {
    if (err)
      return cb(err)
    else
      try {
        cb(null, JSON.parse(data.toString()))
      } catch (e) {
        cb(e)
      }
  })
}

```

### Prepare the template

A `render.js` to take in the **template path** and **formatted data**. 

```JavaScript
var Handlebars = require('handlebars')
var fs = require('fs')

module.exports = function(tplPath, data, cb) {

  // registe a each helper
  Handlebars.registerHelper('each', function(context, options) {
    var ret = ""
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + options.fn(context[i])
    }
    return ret
  })

  fs.readFile(tplPath, function(err, tpl) {
    if (err)
      cb(err)
    else
      var template = Handlebars.compile(tpl.toString())
      var rendered = template({pages: data})

      cb(null, rendered)
  })

}

```

With the `render.js` we now have a `HTML` file with rendered data.

### The code to generate PDF

Now we've got a rendered HTML. The next step is to generate the PDF with it.

The solutions for generating PDF:

* [Phantomjs](http://phantomjs.org/): a headless WebKit scriptable with a JavaScript API. It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG.
* [jsPDF](http://parall.ax/products/jspdf): A HTML5 client-side solution for generating PDFs. Perfect for event tickets, reports, certificates, you name it!
* [wkhtmltopdf](http://wkhtmltopdf.org/) wkhtmltopdf and wkhtmltoimage are open source (LGPLv3) command line tools to render HTML into PDF and various image formats using the QT Webkit rendering engine. 
* [Pandoc](http://pandoc.org/): If you need to convert files from one markup format into another, pandoc is your swiss-army knife. 

Since in our stack, we don't have server running somewhere. But luckily we have nodejs/iojs in Electron. All the tools above have a command interface that we could start a `child_process` to run it, and send back the progress while callback function.

The first thing we try is `Phantomjs` together with a [rasterize.js](https://github.com/ariya/phantomjs/blob/master/examples/rasterize.js) rasterizes a web page to image or PDF

```JavaScript
/**
 * generatePDF function
 * @param  {String}   the path of the template
 * @param  {String}   the PDF file destination
 * @param  {Function} A callback function when job is done
 */
function generatePDF(tplPath dist, cb) {
  var childArgs = [ './rasterize.js', tplPath, dist, 'A4', 1.00];

  childProcess.execFile(phantomBinPath, childArgs, function(err, stdout, stderr) {
    if (err) alert('generatae pdf err', err);
    cb(null);
  });
}
```

This approach works fine for us except:

* The `Phantomjs` binary file is about 30MB on Mac or Windows, which is a little heavy
* It works fine for English language but not Myanmar, we tried lots of Myanmar font but none of them work on Winodws 
* Even it works on Mac, the file generated is 988MB in total for 1000 pages and the text on PDF is not selectable
* The text of PDF generated on Windows is 60MB for 1000 pages and text is selectable, and that's also one reason why the size is way small than the one on Mac(using rasterize.js)

Note that in order to fix the font issue, we have tried to convert the font file into base64 file and svg, but none of them work on Windows. :(

Since we could never resolve the font issue on Windows, we dropped `Phantomjs`. So next we tried `wkhtmltopdf`.

The `wkhtmltopdf` provide a simple cli interface that we could simply call 

```
$ wkhtmltopdf voters.html voters.pdf
```
in a `child_process` the same way we did with `Phantomjs`.

But the font is still broken, not even work on Mac.

