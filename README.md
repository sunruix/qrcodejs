# QRCode.js
QRCode.js is javascript library for making QRCode. QRCode.js supports Cross-browser with HTML5 Canvas and table tag in DOM and SVG.
QRCode.js has no dependencies.
This project is forked from [davidshimjs/qrcodejs](https://github.com/davidshimjs/qrcodejs).
I did some refactor works so that it's more readable.
## Basic Usages
```
<script type="text/javascript" src="qrcode.js"></script>
<div id="qrcode"></div>
<script type="text/javascript">
(new QRCode(documnet.getElementById('qrcode'))).draw('https://www.qrcode.com/en/index.html');
</script>
```

or with some options

```
<div id="qrcode"></div>
<script type="text/javascript">
var qrcode = new QRCode(document.getElementById("qrcode"), {
	width: 128,
	height: 128,
	useSVG: true,
});
</script>
```

and you can use some methods

```
qrcode.clear(); // clear the code.
qrcode.makeCode("https://github.com", QRCode.ErrorCorrectionLevel.L); // make another code.
```

## Browser Compatibility
IE6~10, Chrome, Firefox, Safari, Opera, Mobile Safari, Android, Windows Mobile, ETC.

## License
MIT License

## Contact
https://u.wechat.com/MHOETfpT-bKdqPlpHKh6QNU
QR the url, then scan by wechat.

