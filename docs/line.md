#	cread.line()

```javascript
const creadline = require('cread/line');

creadline({
	prompt: 'How old are you?',
	pattern: /^\d+$/,
	retry: 3,
	default: '18',
}).then(answer => {
	// ...
}).catch(error => {
	// ...
});
```

The method requires `options` as argument which may contain the following properties:

*	*string* __options.prompt__  
	Text displayed as title.

*	*RegExp* | *Function*  __options.pattern__ OPTIONAL  
	Used to decide whether the input is satisfying.

*	number __options.retry__ OPTIONAL DEFAULT `0`
	How many times to retry if the input is un-satisfying.

*	string __options.default__ OPTIONAL  
	This string will be returned if the input is empty (zero-length).  

*	boolean __options.null__ DEFAULT `false`  
	When set `true`, empty input is satisfying and __options.default__ will be returned.