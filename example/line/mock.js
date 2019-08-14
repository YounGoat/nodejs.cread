
module.exports = {
	basic: {
		prompt: 'How old are you?',
		pattern: /^\d+$/,
		retry: 3,
		default: 18,
		prompt_expect: 'How old are you? (18) ',
	},
};