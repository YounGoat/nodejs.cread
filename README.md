#	cread
__Prompt in and read from console.__

>	If links in this document not avaiable, please access [README on GitHub](./README.md) directly.

##  Description

##	ToC

*	[Get Started](#get-started)
*	[API](#api)

##	Links

*	[CHANGE LOG](./CHANGELOG.md)
*	[Homepage](https://github.com/YounGoat/nodejs.cread)

##	Get Started

```javascript
const cread = require('cread');
cread.line({
    prompt: 'How old are you?',
	pattern: /^\d+$/,
}).then(answer => {
    // ...
});
```

##	API

*   [cread/line](docs/line.md)
