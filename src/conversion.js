function utils(type, variables = []) {
	switch (type) {
		case "bound01":
			if (
				typeof variables[0] === "string" &&
				variables[0].indexOf(".") !== -1 &&
				parseFloat(variables[0]) === 1
			) {
				variables[0] = "100%";
			}
			let processPercent =
				typeof variables[0] === "string" &&
				variables[0].indexOf("%") !== -1;
			variables[0] = Math.min(
				variables[1],
				Math.max(0, parseFloat(variables[0]))
			);
			if (processPercent)
				variables[0] =
					parseInt(
						variables[0] * variables[1],
						10
					) / 100;
			if (Math.abs(variables[0] - variables[1]) < 0.000001)
				return 1;
			return (
				(variables[0] % variables[1]) /
				parseFloat(variables[1])
			);
		case "decimalHex":
			return Math.round(
				parseFloat(variables[0]) * 255
			).toString(16);
		case "isPercent":
			return (
				typeof variables[0] === "string" &&
				variables[0].indexOf("%") !== -1
			);
		case "pad2":
			return variables[0].length === 1
				? "0" + variables[0]
				: "" + variables[0];
		case "matrix":
			return variables[0].map((mat) =>
				mat.reduce(
					// (acc, value, index) => acc + params[index] * value,
					(acc, value, index) =>
						acc +
						(variables[1][index] *
							100000000 *
							(value * 100000000)) /
							100000000 /
							100000000,
					0
				)
			);
		default:
	}
}
/*
--- Conversion Functions ---
*/

function rgbRGB(r, g, b) {
	return {
		r: utils("bound01", [(r, 255)]) * 255,
		g: utils("bound01", [(g, 255)]) * 255,
		b: utils("bound01", [(b, 255)]) * 255
	};
}

function rgbHSL(r, g, b) {
	r = utils("bound01", [(r, 255)]);
	g = utils("bound01", [(g, 255)]);
	b = utils("bound01", [(b, 255)]);
	let max = Math.max(r, g, b),
		min = Math.min(r, g, b),
		h,
		s,
		l = (max + min) / 2;
	if (max === min) h = s = 0;
	else {
		let d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			default:
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return { h: h, s: s, l: l };
}
function hslRGB(h, s, l) {
	let r, g, b;

	h = utils("bound01", [(h, 360)]);
	s = utils("bound01", [(s, 100)]);
	l = utils("bound01", [(l, 100)]);

	function hue2rgb(p, q, t) {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		if (t < 1 / 6) return p + (q - p) * 6 * t;
		if (t < 1 / 2) return q;
		if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
		return p;
	}

	if (s === 0) r = g = b = l;
	else {
		let q = l < 0.5 ? l * (1 + s) : l + s - l * s,
			p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return { r: r * 255, g: g * 255, b: b * 255 };
}

function rgbHSV(r, g, b) {
	let r1 = r / 255,
		g1 = g / 255,
		b1 = b / 255,
		max = Math.max(r1, g1, b1),
		min = Math.min(r1, g1, b1),
		s,
		v = max,
		d = max - min;
	s = max === 0 ? 0 : d / max;

	return { h: rgbHSL(r, g, b).h, s: s, v: v };
}
function hsvRGB(h, s, v) {
	h = utils("bound01", [h, 360]) * 6;
	s = utils("bound01", [s, 100]);
	v = utils("bound01", [v, 100]);

	let i = Math.floor(h),
		f = h - i,
		p = v * (1 - s),
		q = v * (1 - f * s),
		t = v * (1 - (1 - f) * s),
		mod = i % 6,
		r = [v, q, p, p, t, v][mod],
		g = [t, v, v, q, p, p][mod],
		b = [p, p, t, v, v, q][mod];

	return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbHEX(r, g, b, allow3Char) {
	let hex = [
		utils("pad2", [Math.round(r).toString(16)]),
		utils("pad2", [Math.round(g).toString(16)]),
		utils("pad2", [Math.round(b).toString(16)])
	];
	if (
		allow3Char &&
		hex[0].charAt(0) === hex[0].charAt(1) &&
		hex[1].charAt(0) === hex[1].charAt(1) &&
		hex[2].charAt(0) === hex[2].charAt(1)
	)
		return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);

	return hex.join("");
}
function rgbaHEX(r, g, b, a, allow4Char) {
	let hex = [
		utils("pad2", [Math.round(r).toString(16)]),
		utils("pad2", [Math.round(g).toString(16)]),
		utils("pad2", [Math.round(b).toString(16)]),
		utils("pad2", [utils("decimalHex", [a])])
	];
	if (
		allow4Char &&
		hex[0].charAt(0) === hex[0].charAt(1) &&
		hex[1].charAt(0) === hex[1].charAt(1) &&
		hex[2].charAt(0) === hex[2].charAt(1) &&
		hex[3].charAt(0) === hex[3].charAt(1)
	)
		return (
			hex[0].charAt(0) +
			hex[1].charAt(0) +
			hex[2].charAt(0) +
			hex[3].charAt(0)
		);
	return hex.join("");
}
function rgbaAHEX(r, g, b, a) {
	let hex = [
		utils("pad2", [utils("decimalHex", [a])]),
		utils("pad2", [Math.round(r).toString(16)]),
		utils("pad2", [Math.round(g).toString(16)]),
		utils("pad2", [Math.round(b).toString(16)])
	];
	return hex.join("");
}
function rgbCMYK(r, g, b) {
	var R = r / 255,
		G = g / 255,
		B = b / 255,
		K = 1 - Math.max(R, G, B);
	return {
		c: (1 - R - K) / (1 - K),
		m: (1 - B - K) / (1 - K),
		y: (1 - G - K) / (1 - K),
		k: K
	};
}
function cmykRGB(c, m, y, k) {
	return {
		r: (1 + k) * (1 + c + k),
		g: (1 + k) * (1 + y + k),
		b: (1 + k) * (1 + m + k)
	};
}

/*
https://gist.github.com/manojpandey/f5ece715132c572c80421febebaf66ae/
*/
function rgbXYZ(r, g, b) {
	const [lr, lb, lg] = [r, g, b].map((v) =>
		v > 4.045 ? Math.pow((v + 5.5) / 105.5, 2.4) * 100 : v / 12.92
	);

	const [X, Y, Z] = utils(
		"matrix",
		[lr, lb, lg],
		[
			[0.4124564, 0.3575761, 0.1804375],
			[0.2126729, 0.7151522, 0.072175],
			[0.0193339, 0.119192, 0.9503041]
		]
	);

	return { X: X, Y: Y, Z: Z };
}

module.exports = {
	rgbCMYK,
	rgbHEX,
	rgbHSL,
	rgbHSV,
	rgbRGB,
	rgbXYZ,
	rgbaHEX,
	rgbaAHEX,
	hslRGB,
	hsvRGB,
	utils,
	cmykRGB
};
