// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our enemy instances go here
    this.x = x; // Assigning enemy x co-ordinate
    this.y = y; // Assigning enemy y co-ordinate
    this.speed = speed; // Assigning enemy speed
    this.sprite = 'images/enemy-car.png'; // The image/sprite for our enemies
};

Enemy.prototype.update = function(dt) {
    // All updates to the enemy go here
    this.x += this.speed * dt; // Updates the enemy location
    // Loop enemy from left side after it reaches the right end of the canvas
    if(this.x >= 505){
        this.x = 0;
    }
    checkCollision(this); // // Check for collision with enemies or barrier-walls
};

Enemy.prototype.render = function() {
    // Draw the enemy on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function to create our Player
var Player = function(x, y, speed, sprite) {
    // Variables applied to each of our player instances go here
    this.x = x; // Assigning player x co-ordinate
    this.y = y; // Assigning player y co-ordinate
    this.speed = speed; // Assigning player speed
    this.sprite = sprite; // The image/sprite for our player
};

Player.prototype.update = function (dt) {
    // All updates to the player go here
};

Player.prototype.render = function () {
    // Draw the player on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScoreLevel(score, gameLevel); // Displaying player score and level
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

var checkCollision = function(enemy) {
    // check for collision between enemy and player
    if (
        player.y + 131 >= enemy.y + 90
        && player.x + 25 <= enemy.x + 88
        && player.y + 73 <= enemy.y + 135
        && player.x + 76 >= enemy.x + 11) {
        player.x = 202.5;
        player.y = 383;
    }

    // check for player reaching top of canvas and winning the game
    if (player.y + 63 <= 0) {
        player.x = 202.5;
        player.y = 383;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);
        // Upadating player score and level
        score += 1;
        gameLevel += 1;
        increaseDifficulty(score); // Increasing game difficulty
    }
    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > 383 ) {
        player.y = 383;
    }
    if (player.x > 402.5) {
        player.x = 402.5;
    }
    if (player.x < 2.5) {
        player.x = 2.5;
    }
};

// Function to display player's score
var displayScoreLevel = function(score, level) {
    var canvas = document.getElementsByTagName('canvas');
    var firstCanvasTag = canvas[0];

    // add player score and level to div element created
    scoreLevelDiv.innerHTML = 'Score: ' + score + ' / ' + 'Level: ' + level;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;

    // load new set of enemies
    for (var i = 0; i <= numEnemies; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

        allEnemies.push(enemy);
    }
};

// Instantiating objects.
// Placeing all enemy objects in an array called allEnemies
// Placeing the player object in a variable called player

var allEnemies = [];
var player = new Player(202.5, 383, 50, avatar);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 256);

allEnemies.push(enemy);

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
