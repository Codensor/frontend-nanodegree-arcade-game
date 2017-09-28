// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here
    this.x = x; // assigning x co-ordinate
    this.y = y; // assigning y co-ordinate
    this.speed = speed; // assigning enemy speed
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
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
