var express = require('express');
var app= express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.set("port", process.env.PORT || 3000);

app.get("/",function(req,res){
	res.render("index.html");
})

app.get("/", function(req, res) {
	res.send("Wow");
});

io.on("connection", function(socket) {
	console.log('a user connected');

	socket.on("moving", function(msg) {
		socket.broadcast.emit("moving", msg);
	})
});

http.listen("3000", function() {
	console.log("Listening on port", app.get("port"));
});
