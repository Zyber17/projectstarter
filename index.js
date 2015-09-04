#! /usr/bin/env node
var fs = require('fs');

var css = {
	"reset": 'html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section,span{-webkit-font-smoothing:antialiased;-moz-font-smoothing:antialiased;-o-font-smoothing:antialiased;font-smoothing:antialiased;text-rendering:optimizeLegibility;margin:0;padding:0;border:0;outline:0;font-weight:inherit;font-style:inherit;font-size:100%;font-family:inherit;vertical-align:baseline}:focus{outline:0}body{line-height:1;color:black;background:white}ol,ul{list-style:none}table{border-collapse:separate;border-spacing:0}caption,th,td{text-align:left;font-weight:normal}blockquote:before,blockquote:after,q:before,q:after{content:""}blockquote,q{quotes:"" ""}input{-ms-box-sizing:content-box;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;outline:0}button::-moz-focus-inner,input[type="reset"]::-moz-focus-inner,input[type="button"]::-moz-focus-inner,input[type="submit"]::-moz-focus-inner,input[type="file"]>input[type="button"]::-moz-focus-inner{border:0;padding:0;margin:0}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}'
};

var jade = {
	"main": {
		"index": "include mixins/socialitem\n\nextends includes/wrapper\n\n//- block settings\n//- \t- var title = 'Example';\n\n//- block head\n//- \t+css(['index','etc'])\n//- \t+js(['index','etc'])\n\nblock content\n\t#wrapper\n\t\theader\n\t\t\th1 \n\t\t\th2\n\n\t\tsection\n\t\t\t"},
	"includes": {
		"jquery": "script(src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js')",
		"wrapper": 'include ../mixins/css\ninclude ../mixins/favicon\ninclude ../mixins/js\ninclude ../mixins/googlefonts\n\nblock settings\n\ndoctype html\nhtml\n\thead\n\t\ttitle= (title ? title : "Title")\n\t\tmeta(http-equiv="Content-Type", content="text/html; charset=UTF-8")\n\t\tmeta(name="viewport", content="initial-scale=1.0, maximum-scale=1.0, user-scalable=1")\n\t\t+favicon()\n\t\t\n\t\t+css(["reset","index"])\n\t\t//- include jquery\n\n\t\tblock head\n\n\t\t+googlefonts(["Open+Sans"])\n\t\t\n\n\tbody\n\t\tblock content'
	},
	"mixins": {
		"css": 'mixin css(items)\n\tfor item in items\n\t\tlink(rel="stylesheet", href="assets/styles/#{item}.css")',
		"favicon": 'mixin favicon()\n\tlink(rel="icon", type="image/x-icon", href="assets/images/favicon.ico")\n\tlink(rel="icon", type="image/png", href="assets/images/favicon.png")',
		"googlefonts": 'mixin googlefonts(items)\n\tfor item in items\n\t\tlink(href="http://fonts.googleapis.com/css?family=#{item}", rel="stylesheet", type="text/css")',
		"js": 'mixin js(items)\n\tfor item in items\n\t\tscript(src="res/js/#{item}.js")',
	}
};

var stylus = {
	"main": {
		"index": "@import 'includes/helper'\n\nbody\n\tbackground $background\n\tcolor $text\n\tfont-family $OpenSans\n\tfont-size $textSize\n\na\n\t&:link, &:visited\n\t\tcolor $link\n\t\ttext-decoration none\n\t&:hover\n\t\tcolor tint($link,10%)\n\t&:active\n\t\tcolor shade($link,10%)\n\n#wrapper\n\t"},
	"includes": {
		"helper": "$maxWidth = 800px\n//$maxHeight = 1000px\n\n$background = #fff\n$hero = #111\n$text = #333\n$link = #06c3d1\n$textSize = 18px\n\n$OpenSans = 'Open Sans','Helvetica Neue',Helvetica,Arial,Verdana,sans-serif\n\nretina(query)\n\t@media (min--moz-device-pixel-ratio: 1.25), (-o-min-device-pixel-ratio: 5/4), (-webkit-min-device-pixel-ratio: 1.25), (min-device-pixel-ratio: 1.25), (min-resolution: 1.25dppx)\n\t\tbackground-image url(query)\n\nborderBox()\n\t-webkit-box-sizing border-box\n\t-moz-box-sizing border-box\n\t-ms-box-sizing border-box\n\t-o-box-sizing border-box\n\tbox-sizing border-box\n\nborderRadius(radius)\n\t-webkit-border-radius radius\n\t-moz-border-radius radius\n\t-o-border-radius radius\n\tborder-radius radius"
	}
};

var coffee = {
	"main": {
		"index": ""
	}
};

var args = process.argv.slice(2);

if (args.indexOf("node") > -1) {
	makeNodeProject();
} else if (args.indexOf("html") > -1) {
	makeHtmlProject(css,jade,stylus,coffee);
}


function makeNodeProject() {
	console.log("Ugh, it's been too longs ince I started a node project.");
	process.exit(0);
}

function makeHtmlProject(css,jade,stylus,coffee) {
	mkdir("post", function() {
		mkdir("post/assets", function() {
			mkdir(["post/assets/styles","post/assets/js","post/assets/images"], function() {
				for (var key in css) {
					if (css.hasOwnProperty(key)) {
						fs.writeFile("post/assets/styles/"+key+".css", css[key], function(err) {
							if (err) throw err;
						});
					}
				}
			});
		});
	});

	mkdir("pre", function() {
		mkdir(["pre/jade","pre/stylus","pre/coffee"], function() {

			for (var key in jade.main) {
				if (jade.main.hasOwnProperty(key)) {
					fs.writeFile("pre/jade/"+key+".jade", jade.main[key], function(err) {
						if (err) throw err;
					});
				}
			}

			for (var key in stylus.main) {
				if (stylus.main.hasOwnProperty(key)) {
					fs.writeFile("pre/stylus/"+key+".styl", stylus.main[key], function(err) {
						if (err) throw err;
					});
				}
			}

			for (var key in coffee.main) {
				if (coffee.main.hasOwnProperty(key)) {
					fs.writeFile("pre/coffee/"+key+".coffee", coffee.main[key], function(err) {
						if (err) throw err;
					});
				}
			}

			mkdir(["pre/jade/includes","pre/jade/mixins"], function() {
				for (var key in jade.includes) {
					if (jade.includes.hasOwnProperty(key)) {
						fs.writeFile("pre/jade/includes/"+key+".jade", jade.includes[key], function(err) {
							if (err) throw err;
						});
					}
				}
				for (var key in jade.mixins) {
					if (jade.mixins.hasOwnProperty(key)) {
						fs.writeFile("pre/jade/mixins/"+key+".jade", jade.mixins[key], function(err) {
							if (err) throw err;
						});
					}
				}
			});

			mkdir("pre/stylus/includes", function() {
				for (var key in stylus.includes) {
					if (stylus.includes.hasOwnProperty(key)) {
						fs.writeFile("pre/stylus/includes/"+key+".styl", stylus.includes[key], function(err) {
							if (err) throw err;
						});
					}
				}
			});
		});
	});

	fs.stat("README.md", function(err, stats) {
		if (err) {
			fs.stat("README", function(err2, stats2) {
				if (err) {
					fs.writeFile("readme.md","# Readme", function(err3) {
						if (err3) throw err3;
					});
				} else {
					throw err2;
				}
			});
		} else {
			throw err;
		}
	});

}

function mkdir(dirs, callback) {
	var what = Object.prototype.toString; //http://blog.niftysnippets.org/2010/09/say-what.html

	if (typeof dirs === "string") {
		fs.mkdirSync(dirs);
		if (typeof callback === 'function' && callback()) {
			callback();
		}
	} else if (what.call(dirs) === '[object Array]') {
		for (var i = dirs.length - 1; i >= 0; i--) {
			fs.mkdirSync(dirs[i]);
		}
		if (typeof callback === 'function' && callback()) {
			callback();
		}
	}
}