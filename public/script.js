console.log("This is running in the html");
start();

var socket = io();
socket.on("moving", function(msg){

	redraw(msg);
});

var canvas,ctx=null;
var prevX, prevY, currX, currY =0;
var lineWidth=1;
var color = "#f00000";

var drawPath = false;


function start() {
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext("2d");
	canvas.addEventListener("mousemove", findPath);
	canvas.addEventListener("mousedown", findPath);
	canvas.addEventListener("mouseup", findPath);
	fitCanvas();

}

function fitCanvas() {
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
}


function draw() {

	ctx.beginPath();
	ctx.moveTo(prevX, prevY);
	ctx.lineTo(currX, currY);
	ctx.strokeStyle = color;
	ctx.lineWidth = lineWidth;
	ctx.stroke();
	ctx.closePath();
}

function redraw(path) {
	ctx.beginPath();
	ctx.moveTo(path.px, path.py);
	ctx.lineTo(path.cx, path.cy);
	ctx.strokeStyle = color;
	ctx.lineWidth = lineWidth;
	ctx.stroke();
	ctx.closePath();

}

function findPath() {
	if(event.type ==="mousedown"){
		drawPath= true;
		console.log("Mouse pressed");
	}
	else if(event.type ==="mousemove"){
		if(drawPath) {
			prevY=currY;
			prevX=currX;
			currX=event.clientX;
			currY=event.clientY;
			//socket.emit("start", "I am moving");
			socket.emit("moving", {px:prevX, py:prevY, cx:currX, cy:currY});
			draw();
		}
		
		console.log("Mouse is moving");
	}
	else if(event.type ==="mouseup"){
		drawPath= false;
		console.log("Mouse is not pressed");
	}

}

