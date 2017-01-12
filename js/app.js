//Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + (dt * this.speed);
    if (this.x > 505) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.checkCollisions();
};

    // Checking collision detection
Enemy.prototype.checkCollisions = function(){
        if (this.x < (player.x + 32) &&
            (this.x + 32) > player.x &&
            this.y < (player.y + 50) &&
            (this.y + 50) > player.y) {
            console.log("Oops..Collision!");
            player.colrst();
        }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
    this.sprite = 'images/char-pink-girl.png';
    this.x = x;
    this.y = y;
    this.score = 0;
    this.life = 5; //Setting the no. of life available.
};

Player.prototype.update = function(dt) {};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.update_score();
    this.update_lives();
    //If collision not detected win the game!
    if (this.y < 10) {
        this.won();
    }
};

Player.prototype.handleInput = function(key) {
    if (key === 'up' && this.y >= 35) {
        this.y -= 50;
    }
    if (key === 'down' && this.y <= 380) {
        this.y += 55;
    }
    if (key === 'left' && this.x >= 35) {
        this.x -= 50;
    }
    if (key === 'right' && this.x <= 380) {
        this.x += 55;
    }
};


//Score board function
Player.prototype.update_score = function() {
    ctx.clearRect(0, 590, 400, 50);
    ctx.font = "20px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "left";
    ctx.fillText("Score: " + " " + this.score, 2, 580);
}

//Function for displaying the remaining life
Player.prototype.update_lives = function() {
    ctx.clearRect(350, 590, 505, 50);
    ctx.font = "20px Arial";
    ctx.fillStyle = "yellow";
    ctx.textAlign = "left";
    ctx.fillText("Lives: " + " " + this.life, 350, 580);
};

//Calling reset function during collision
Player.prototype.colrst = function() {
    this.x = 200;
    this.y = 400;
    this.score -= 100;
    this.update_score();
    this.life -= 1;
    this.lyf();
};

//Calling reset function when game is won
Player.prototype.won = function() {
    this.x = 200;
    this.y = 400;
    this.score += 100;
    this.update_score();
    alert("You WIN!");
};

//Checking whether the game is over
Player.prototype.lyf = function() {
    if (this.life === 0) {
        alert("Game Over!!");
        this.reset();
    }
    if ( this.life >0){
    alert("Damm! You got eaten by a BUG!");
    }
    this.update_lives();
};

//Reset function calling to end the game
Player.prototype.reset = function() {
     alert("You have no more life.Click 'ok' to play again.Good Luck!!");
     this.refresh();
};

//Resetting the score to initial value
Player.prototype.refresh=function(){
    this.score -= this.score ;
    this.update_score();
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(50, 50, 310);
var enemy2 = new Enemy(100, 100, 510);
var enemy3 = new Enemy(200, 240, 80);
var enemy4 = new Enemy(85, 160, 180);
var allEnemies = [enemy1, enemy2, enemy3, enemy4];
var player = new Player(200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});