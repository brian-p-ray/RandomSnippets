document.getElementById("image").onload = function() {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var img = document.getElementById("image");
    ctx.drawImage(img, 0, 0);
    var imgData = ctx.getImageData(0, 0, c.width, c.height);
    // invert colors
    var i;
	var r = 0;
	var g = 0;
	var b = 0;
    for (i = 0; i < imgData.data.length; i += 4) {
		r += imgData.data[i];
		g += imgData.data[i+1];
		b += imgData.data[i+2];
    }
	var newI = i/4;
	var newR = Math.round(r/newI);
	var newG = Math.round(g/newI);
	var newB = Math.round(b/newI);
	c.style.display = 'none';
	document.body.style.backgroundColor = 'rgb(' + newR + ',' + newG + ',' + newB + ')';
};
