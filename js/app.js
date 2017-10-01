// Enemies our player must avoid
var Enemy = function(speed) {
    // Variables applied to each of our enemy instances go here
    var enemyX = [0, 505];
    this.x = enemyX[Math.floor(Math.random() * enemyX.length)]; // Assigning enemy x co-ordinate
    this.y = enemyY[Math.floor(Math.random() * enemyY.length)]; // Assigning enemy y co-ordinate
    this.speed = speed; // Assigning enemy speed
    if (this.x === 0) {
        this.sprite = 'images/enemy-car.png'; // The image/sprite for our enemies
    } else {
        this.sprite = 'images/enemy-car1.png'; // The image/sprite for our enemies
    }
    var yIndex = enemyY.indexOf(this.y);
    if (yIndex > -1) {
        enemyY.splice(yIndex, 1);
    }
};

Enemy.prototype.update = function(dt) {
    // All updates to the enemy go here
    if (this.sprite === 'images/enemy-car.png') {
        this.x += this.speed * dt; // Updates the enemy location
        // Loop enemy from left side after it reaches the right end of the canvas
        if(this.x >= 505){
            this.x = 0;
        }
    }
    if (this.sprite === 'images/enemy-car1.png') {
        this.x -= this.speed * dt; // Updates the enemy location
        // Loop enemy from right side after it reaches the left end of the canvas
        if(this.x <= 0){
            this.x = 505;
        }
    }

    checkCollision(this); // // Check for collision with enemies or barrier-walls
};

Enemy.prototype.render = function() {
    // Draw the enemy on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function to create our Player
var Player = function(x, y, speed, sprite) {
    // Variables applied to our player instance go here
    this.x = x; // Assigning player x co-ordinate
    this.y = y; // Assigning player y co-ordinate
    this.speed = speed; // Assigning player speed
    this.sprite = sprite; // The image/sprite for our player
};

Player.prototype.update = function (dt) {
    // All updates to the player go here
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 505, 171);
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
        var hit = document.getElementById("music1");
        hit.play();
        avatarHealth -= 10;
        var healthStat = document.getElementById("meter");
        healthStat.value = avatarHealth;
        player.x = 202.5;
        player.y = 383;

        if (avatarHealth <= 0) {
            var lose = document.getElementById("music2");
            lose.play();
            swal ({
                title: 'You Lose! Try Again?',
                text: 'Achievements',
                html: `Score: ${score}`,
                type: 'error',
                confirmButtonText: 'Play again!',
                allowOutsideClick: false,
                allowEscapeKey: false,
                onClose: function () {
                    window.location.reload(false)
                }
            })
        }
    }

    // check for player reaching top of canvas and winning the game
    if (player.y + 63 <= 0) {
        player.x = 202.5;
        player.y = 383;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);
        // Upadating player score and level
        score += 50;
        gameLevel += 1;
        avatarHealth = 100;
        if (gameLevel > 12) {
            var win = document.getElementById("music3");
            win.play();
            swal ({
                title: 'Congratulations! You Won!',
                text: 'Achievements',
                html: `Score: ${score}`,
                type: 'success',
                confirmButtonText: 'Play again!',
                allowOutsideClick: false,
                allowEscapeKey: false,
                onClose: function () {
                    window.location.reload(false)
                }
            })
        }
        enemyY.length = 0;
        enemyY = [30, 70, 115, 155, 195, 235];
        increaseDifficulty(gameLevel); // Increasing game difficulty
        gemSpawn(Math.floor(Math.random() * 4)); // Spawning gems on each level
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
    scoreLevelDiv.innerHTML = 'Score: ' + score + ' | ' + 'Level: ' + level;
    document.body.insertBefore(scoreLevelDiv, firstCanvasTag[0]);
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;
    var counter;
    // load new set of enemies
    if (numEnemies % 2 === 0) {
        counter = numEnemies / 2;
        for (var i = 1; i <= counter; i++) {
            var enemy = new Enemy(Math.random() * 256);

            allEnemies.push(enemy);
        }
    } else {
        counter = (numEnemies - 1) / 2;
        for (var i = 0; i <= counter; i++) {
            var enemy = new Enemy(Math.random() * 256);

            allEnemies.push(enemy);
        }
    }
};

var Gems = function() {
    // Variables applied to each of our gem instances go here
    var gemArray = ["images/Gem Blue.png", "images/Gem Green.png", "images/Gem Orange.png"];
    var gemY = [65, 145, 230];
    var gemRand = gemArray[Math.floor(Math.random() * gemArray.length)];
    this.x = (Math.floor(Math.random() * 4) * 100) + 2.25; // Assigning gem x co-ordinate
    this.y = gemY[Math.floor(Math.random() * gemY.length)]; // Assigning gem y co-ordinate
    this.sprite = gemRand; // The image/sprite for our enemies
};

Gems.prototype.update = function(dt) {
    // All updates to the gems go here
    checkObatined(this);
};

Gems.prototype.render = function() {
    // Draw the enemy on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var checkObatined = function (gemGet) {
    if (player.y + 131 >= gemGet.y + 90
        && player.x + 25 <= gemGet.x + 88
        && player.y + 73 <= gemGet.y + 135
        && player.x + 76 >= gemGet.x + 11) {

        var get = document.getElementById("music0");
        get.play();
        gemGet.x = -1000;
        gemGet.y = -1000;
        if (gemGet.sprite === "images/Gem Blue.png") {
            score += 10;
            avatarHealth += 10;
        } else if (gemGet.sprite === "images/Gem Green.png") {
            score += 20;
            avatarHealth += 20;
        } else {
            score += 30;
            avatarHealth += 30;
        }
        if (avatarHealth > 100) {
            avatarHealth = 100;
        }
        var healthStat = document.getElementById("meter");
        healthStat.value = avatarHealth;
    }
};

var gemSpawn = function (numGem) {
    // remove all previous gems on canvas
    allGems.length = 0;

    // load new set of gems
    for (var i = 0; i <= numGem; i++) {
        var gem = new Gems();

        allGems.push(gem);
    }
};

// Instantiating objects.
// Placeing all enemy objects in an array called allEnemies
// Placeing the player object in a variable called player

var allEnemies = [];
var allGems = [];
var player = new Player(202.5, 383, 50, avatar);
var score = 0;
var gameLevel = 1;
var scoreLevelDiv = document.createElement('div');
var enemyY = [30, 70, 115, 155, 195, 235];
var enemy = new Enemy(Math.random() * 256);
var gem = new Gems();

allGems.push(gem);
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

var reload = document.getElementById('reload');
reload.onclick = function () {
    var flag = false;
    swal ({
        title: 'Reload! Are you sure?',
        type: 'warning',
        confirmButtonText: 'Reload!',
        allowOutsideClick: false,
        showCancelButton: true,
        cancelButtonText: 'Continue?',
        allowEscapeKey: false,
        onClose: function () {
            flag = true;
        }
    })
    if (flag) {
        window.location.reload(false);
    }
};