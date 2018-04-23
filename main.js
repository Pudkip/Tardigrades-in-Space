var height = $(window).height(); 
var width = $(window).width(); 
var player_x = 32;
var player_y = 200+32;
var asteroid_x = 300;
var asteroid_y = 0;
var moon_x = 600;
var moon_y = 150;
var moon_dir = 1;
var counter = 0;
var launch_dist = (width/4);

function Console_Text (txt){
	document.getElementById('Console').innerHTML = txt; 
}

function Launch () {
	//Phase 1
	if (player_x == 32) {
		console.log("phase 1: X:"+player_x+" Y:"+player_y+" asteroid:"+asteroid_y);
		$("#Sprite").attr("src","media/player_moving.gif");
		if (asteroid_y < 100 || asteroid_y > (height - 175)) { 
			player_x += launch_dist;
			$("#Player").finish().animate({
				left: player_x
			},750);
			Console_Text("Landed safely on this rocket.");

		}else {
			player_x = (width);
			$("#Player").finish().animate({
				left: player_x
			},2250);
			Console_Text('Trajectory missed: floating into the oblivion...');
			setTimeout(location.reload.bind(location), 3000);
		}
	}else if (player_x == launch_dist+32) {
		console.log("phase 2: "+"X:"+player_x+" Y:"+player_y+" moon:"+moon_y);
		if (Math.abs(moon_y - player_y) < 100) {
			player_x += launch_dist-16;
			$("#Player").finish().animate({
				left: player_x
			},750);
			Console_Text("Chillin' on a moon.");
		}else {
			player_x = width;
			$("#Player").finish().animate({
				left: player_x
			},1750);
			Console_Text('Trajectory missed: floating into the oblivion...');
			setTimeout(location.reload.bind(location), 3000);
		}
	}else if (player_x == 2*launch_dist+16) {
		console.log("phase 3: "+"X:"+player_x+" Y:"+player_y+" Mars:"+"doesn't matter lol");
		player_x += launch_dist+82;
		$("#Player").finish().animate({
			left: player_x
		},750);
		Console_Text('Made it to Mars...feelsgoodman!');
		setTimeout(function(){window.location.replace("http://www.github.com/pudkip")},2000);
	}
	setTimeout(function(){counter += 1;},700)
}

function Move_Vertical_1 () {
	if (counter == 0) {
		spd = 750;
	}else if (counter == 1) {
		spd = 0;
	}
	if (player_x == launch_dist+32) {
		setTimeout(function(){
			$("#Player").finish().animate({
				top: asteroid_y+32
		},10);},spd);
		player_y = asteroid_y;
	}
}

function Move_Vertical_2 () {
	if (counter == 1) {
		spd = 750;
	}else if (counter == 2) {
		spd = 0;
	}
	if (player_x == 2*launch_dist+16) {
		setTimeout(function(){
			$("#Player").finish().animate({
				top: moon_y+18
		},10);},spd);
		player_y = moon_y;
	}
}

function Move_Asteroid () {
	if (asteroid_y >= (height-150)) {
		asteroid_y = 0;
		$("#Asteroid1").finish().animate({
			top: asteroid_y
		},10);
	}else {
		asteroid_y += 2;
		$("#Asteroid1").finish().animate({
			top: asteroid_y
		},10);
	}
}

function Move_Moon () {
	moon_y += (moon_dir * 1);
	$("#Moon").finish().animate({
		top: moon_y
	},10);
	if (moon_y == 450){
		moon_dir = -1;
	}
	else if (moon_y == 150) {
		moon_dir = 1;
	}
}

setInterval(Move_Vertical_1,10)

setInterval(Move_Vertical_2,10)

setInterval(Move_Asteroid,10)

setInterval(Move_Moon,10)

