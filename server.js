var http = require("http");
var fs = require("fs");
var mime = require("mime");

var methods = {};

methods.GET = function(path,req,res){
	var path = "/";
	var body = null;
	var code = 200;
	var type = "text/plain";

	switch(req.url){
		case "/":
			path = "./index.html";
			body = fs.createReadStream(path);
			type = mime.lookup(path);
			break;
		case "/main.css":
			path = "./main.css";
			body = fs.createReadStream(path);
			type = mime.lookup(path);
			break;
		case "/calc.js":
			path = "./calc.js";
			body = fs.createReadStream(path);
			type = mime.lookup(path);
			break;
		default:
			code = 404;
			body = "file not found";
	}

	respond(code,body,type,res);
}

var paths = ["/","/main.css","/calc.js"];

function respond(code,body,type,res){
	if(!type) type = "text/html";
	res.writeHead(code, {"content-type":type});
	if(body && body.pipe)
		body.pipe(res);
	else
		res.end(body);
}

function handler(req,res){
	if(strInArr(req.url,paths) && req.method in methods){
		methods[req.method](req.url,req,res);
	}
	else{
		res.writeHead(404,{"content-type":"text/plain"});
		res.end("Unable to find reference");
	}
}

function strInArr(str,arr){
	for(var i in arr){
		if(arr[i] === str) return true;
	}
	return false;
}

var app = http.createServer(handler).listen(8000);
