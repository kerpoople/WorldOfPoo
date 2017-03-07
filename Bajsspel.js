var pos_left=0;
var pos_top=0;
var move_speed=200;
var ground = 500;
var deltaTime = 0.0166666;
var jumping = false;
var input_jump = false;
var move_right = false;
var move_left = false;
var key_jump = 32;
var key_right = 37;
var key_left = 39;
var jump_speed = 500;
var gravity = 1000;
var jump_duration = 0.3;
var jump_timer = 0;
var jump_amount = 0;
var jump_amount_limit = 1;
var jump_again_time = 0.1;
var fall_speed = 0;
var on_ground = false;
var obstacles = ["toaletthinder", "rullhinder"];
var dead = false;
var lifecounter;
var restart_delay = 1;
var restart_timer = 0;



function update()
{
	//Get information to act on.
	var spelare=document.getElementById("Bajsspelare");
	//Check if poo is on ground
	if (!dead && pos_top >= ground)
	{
		on_ground = true;
		jump_amount = 0;
		fall_speed = 0;
		pos_top = ground;
	}
	else
	{
		on_ground = false;
	}

	if(!dead)
	{
		if (move_right)
		{
			pos_left += -move_speed * deltaTime;
			spelare.style.transform="scaleX(1)";
		}
		if(move_left)
		{
			pos_left += move_speed * deltaTime;
			spelare.style.transform="scaleX(-1)";

		}
		if(jumping)
		{
			pos_top += -jump_speed * deltaTime;
			jump_timer += deltaTime;
			if(jump_timer > jump_duration) 
			{
				jumping=false;
				jump_timer=0;
			}
		}
	}

	for(var i = 0; i < obstacles.length; i++)
	{
		var current_obstacle = document.getElementById(obstacles[i]);
		CheckCollision(current_obstacle);
	}


   if(dead==true)
   	{
   		restart_timer=restart_timer-deltaTime;
   		if(restart_timer < 0)
   		{
   			restart();

   		}
   	}




	addGravity();
	spelare.style.top=pos_top+"px";
	spelare.style.left=pos_left+"px";
} //end of update

	
function restart() 
{
 var spelare=document.getElementById("Bajsspelare");
 spelare.src="Bajsspelare.gif";
 dead=false;
 pos_left=0;
 pos_top=0;
 fall_speed=0;
 spelare.style.transform="scaleY(1)";
 gravity=1000;


}


//Gravity for player
function addGravity()
{
	if (!on_ground)
	{
		fall_speed = fall_speed + gravity * deltaTime;
		pos_top = pos_top + fall_speed * deltaTime;
	}
}

//jump height + speed for player
function jump()
{

	if (!dead && jump_amount < jump_amount_limit)
	{
		jumping = true;
		jump_amount += 1;
		jump_timer = 0;
		fall_speed = 0;
		//console.log("DOUBLE JUMP!")
	}

}


//When player dies
function player_died()
{
	var spelare=document.getElementById("Bajsspelare");
	spelare.src="bajsspelare_dead.gif";
	dead = true;
	gravity = 3000;
	spelare.style.transform="scaleY(-1)";
	restart_timer = restart_delay;

}

//Movement of player
function move(event) {
	var key=event.keyCode;
	if (key==key_jump && input_jump == false) { //jump
		input_jump = true;
		jump();
	}
	if (key==key_right) { //Move right
		move_right = true;	
	}
	if (key==key_left) { //Move left
		move_left = true;
	}
}

//Stopping the movement of the player
function move_stop(event) 
{
	var key=event.keyCode;
	if (key==key_jump) {
		input_jump = false;
	}
	if (key==key_right) { //Move right
		move_right = false;	
	}
	if (key==key_left) { //Move left
		move_left = false;
	}	
}

//Check for collision

function CheckCollision(obstacle)
{
	var spelare=document.getElementById("Bajsspelare");

	var spelare_width = spelare.width;	
	var spelare_height = spelare.height;

	var pos_left_center = pos_left + spelare.width / 2;
	var pos_top_center = pos_top + spelare.height / 2;
	var obstacle_left_center = obstacle.x + obstacle.width / 2;
	var obstacle_top_center = obstacle.y + obstacle.height / 2;

	if (Math.abs(obstacle_left_center - pos_left_center) < obstacle.width * 0.75 &&
		Math.abs(obstacle_top_center - pos_top_center) < obstacle.height * 0.75)
	{
		player_died();
	}

}

document.addEventListener("keydown", move);
document.addEventListener("keyup", move_stop);
window.setInterval(update, deltaTime * 1000);


