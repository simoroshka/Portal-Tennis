
function colorRect(left, top, width, height, color) {
	context.fillStyle = color;
	context.fillRect(left, top, width, height);
}
function colorCircle(centerX, centerY, radius, color, alpha) {
	alpha = alpha || 1;
	
	context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "rgba("+color+","+ alpha +")";
    context.fill();
    context.lineWidth = 5;
	context.strokeStyle = "rgba(0, 100, 100, 1)";
    context.stroke();
}

