# mustache-async.js - Logic-less {{mustache}} templates with async view function Support

> What could be more logical awesome than no logic at all?

[![Build Status](https://travis-ci.org/janl/mustache.js.svg?branch=master)](https://travis-ci.org/Soluto/mustache-async.js)

[mustache-async.js](https://github.com/Soluto/mustache-async.js) is a fork of the [mustache.js](https://github.com/janl/mustache.js) template system, with async view function support.
If you don't need to use async functions to generate substitution values, you should simply use [mustache.js](https://github.com/janl/mustache.js) which supports older browsers and older JS versions.

[Mustache](http://mustache.github.com/) is a logic-less template syntax. It can be used for HTML, config files, source code - anything. It works by expanding tags in a template using values provided in a hash or object.
Visit the [manpage](http://mustache.github.com/mustache.5.html) for the templating syntax.

## Usage

[mustache-async.js](https://github.com/Soluto/mustache-async.js) supports regular functions, async functions and Promises. Example:

```javascript
const view = {
    firstName: 'Art',
    lastName: 'Vandelay',
    fullName: function() {
        return this.firstName + ' ' + this.lastName;
    },
    profession: async () => new Promise(resolve => setTimeout(() => resolve('Architect'), 10))
}
const template = 'My name is {{fullName}}, I am an {{profession}}';
console.log(await Mustache.render(template, view));
//My name is Art Vandelay, I am an Architect
```



## Install

You can get Mustache via npm.

```bash
$ npm install mustache-async --save
```

## Contributing

mustache-async.js is a new project, any contribution are welcome! Visit the [issues](https://github.com/Soluto/mustache-async.js/issues) page


In this example, the `Mustache.render` function takes two parameters: 1) the [mustache](http://mustache.github.com/) template and 2) a `view` object that contains the data and code needed to render the template.

## API

Following is an [rtype](https://git.io/rtype) signature of the most commonly used functions.

```js
Mustache.render(
  template            : String,
  view                : Object,
  partials?           : Object,
  tags = ['{{', '}}'] : Tags,
) => String

Mustache.parse(
  template              : String,
  tags = ['{{', '}}']   : Tags,
) => Token[]

interface Token [String, String, Number, Number, Token[]?, Number?]

interface Tags [String, String]

```

More info and API reference on [mustache.js](https://github.com/janl/mustache.js) github page
