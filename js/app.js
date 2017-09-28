// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our enemy instances go here
    this.x = x; // Assigning enemy x co-ordinate
    this.y = y; // Assigning enemy y co-ordinate
    this.speed = speed; // Assigning enemy speed
    this.sprite = 'images/enemy-bug.png'; // The image/sprite for our enemies
};

Enemy.prototype.update = function(dt) {
    // All updates to the enemy go here
    this.x += this.speed * dt; // Updates the enemy location
    // loop enemy from left side after it reaches the right end of the canvas
    if(this.x >= 505){
        this.x = 0;
    }
};

Enemy.prototype.render = function() {
    // Draw the enemy on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function(x, y, speed) {
    // Variables applied to each of our player instances go here
    this.x = x; // Assigning player x co-ordinate
    this.y = y; // Assigning player y co-ordinate
    this.speed = speed; // Assigning player speed
    this.sprite = 'images/char-boy.png'; // The image/sprite for our player
};

Player.prototype.update = function (dt) {
    // All updates to the player go here
};

Player.prototype.render = function () {
    // Draw the player on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
    // The player controls go here
if (keyPress == 'left') {
        player.x -= player.speed;
    }
    if (keyPress == 'up') {
        player.y -= player.speed - 20;
    }
    if (keyPress == 'right') {
        player.x += player.speed;
    }
    if (keyPress == 'down') {
        player.y += player.speed - 20;
    }
};

// Instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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
