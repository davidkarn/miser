all: block.css revert-block.css

block.css: rules.js global.js
	node rules.js

