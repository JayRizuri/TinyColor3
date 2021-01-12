<h1 align="center">TinyColor3</h1>
<p align="center">
	<a href="https://www.npmjs.com/package/tinycolor_v3" title="NPM version"><img alt="NPM version" src="https://img.shields.io/npm/v/tinycolor_v3?logo=npm"/></a>
	<a href="https://www.npmjs.com/package/tinycolor_v3" title="NPM downloads"><img alt="NPM downloads" src="https://img.shields.io/npm/dt/tinycolor_v3?logo=npm"/></a>
	<br>
	<a href="https://github.com/jayrizuri/TinyColor3/blob/master/license" title="License"><img alt="License" src="https://img.shields.io/github/license/jayrizuri/TinyColor3?logo=github&logoColor=black"/></a>
	<a href="https://github.com/jayrizuri/TinyColor3/" title="License"><img alt="License" src="https://img.shields.io/appveyor/build/jayrizuri/TinyColor3.svg"/></a>
	<br>
	<a href="http://donate.samidb.xyz/" title="PayPal"><img alt="PayPal" src="https://img.shields.io/badge/donate-paypal-13e?logo=paypal"/></a>
</p>

TinyColor is a small, fast library for color manipulation and conversion in JavaScript. It allows many forms of input, while providing color conversions and other color utility functions. It has no dependencies.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Captcha Generator

```bash
npm i tinycolor_v3
```

## Usage

### Basic

```js
// Import the module
const TinyColor = require("tinycolor_v3");

/* Create a new TinyColor object
    - Arguments: Color
      - Color can be in these namespaces:
        - Hex, Rgb, Hsl, Hsv, Cmyk
*/
let color = new TinyColor("#80cee1");

console.log(color.rgbString);
```
