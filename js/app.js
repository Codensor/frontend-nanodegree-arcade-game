// Cars our player must avoid
var Enemy = function(speed) {
    // Variables applied to each of our car instances
    var enemyX = [0, viewWidth]; // Possible x co-ordinate values of car
    this.x = enemyX[Math.floor(Math.random() * enemyX.length)]; // Assigning car x co-ordinate
    this.y = enemyY[Math.floor(Math.random() * enemyY.length)]; // Assigning car y co-ordinate
    this.speed = speed; // Assigning car speed
    // Assigning car sprites based on car x co-ordinate
    if (this.x === 0) {
        this.sprite = 'images/enemy-car.png'; // The image/sprite for the car
    } else {
        this.sprite = 'images/enemy-car1.png'; // The image/sprite for the car
    }
    var yIndex = enemyY.indexOf(this.y); // Assigning current y co-ordinate of car to yIndex
    // Removing current y co-ordinate from enemyY array
    if (yIndex > -1) {
        enemyY.splice(yIndex, 1);
    }
};

Enemy.prototype.update = function(dt) {
    // All updates applied to the car
    if (this.sprite === 'images/enemy-car.png') {
        this.x += this.speed * dt; // Updates the enemy location
        // Loop enemy from left side after it reaches the right end of the canvas
        if (this.x >= viewWidth) {
            this.x = 0;
        }
    }
    if (this.sprite === 'images/enemy-car1.png') {
        this.x -= this.speed * dt; // Updates the enemy location
        // Loop enemy from right side after it reaches the left end of the canvas
        if (this.x <= 0) {
            this.x = viewWidth;
        }
    }

    checkCollision(this); // Check for collision with enemies or barrier-walls
};

Enemy.prototype.render = function() {
    // Draw the car on the screen
    var putImg = Resources.get(this.sprite);;
    var newWidth = viewWidth / 5;
    var newHeight = (putImg.height * newWidth) / putImg.width;
    ctx.drawImage(putImg, this.x, this.y, newWidth, newHeight);
};

// Function to create our Player
var Player = function(sprite) {
    // Variables applied to our player instance
    this.x = playerXLoc; // Assigning player x co-ordinate
    this.y = playerYLoc; // Assigning player y co-ordinate
    this.sprite = sprite; // The image/sprite for our player
};

Player.prototype.update = function(dt) {
    // All updates to the player go here
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 505, 171);
    gameStatUpdater(); // Calling function to update score and level
};

Player.prototype.render = function() {
    // Draw the player on the screen
    var putImg = Resources.get(this.sprite);
    var newWidth = viewWidth / 5;
    var newHeight = (putImg.height * newWidth) / putImg.width;
    ctx.drawImage(putImg, this.x, this.y, newWidth, newHeight);
};

Player.prototype.handleInput = function(keyPress) {
    // The player keyboard controls go here
    var putImg = Resources.get(this.sprite);
    var newWidth = viewWidth / 5;
    var newHeight = (putImg.height * newWidth) / putImg.width;
    if (keyPress == 'left') {
        player.x -= (newWidth / 2);
    }
    if (keyPress == 'up') {
        player.y -= (newHeight / 6.2);
    }
    if (keyPress == 'right') {
        player.x += (newWidth / 2);
    }
    if (keyPress == 'down') {
        player.y += (newHeight / 6.2);
    }
};

// Function to create gems
var Gems = function() {
    // Variables applied to each of our gem instances
    var gemArray = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png']; // Types of gems
    var gemY = [];
    var gemX = [];
    var gemLoc = [10.73, 23.93, 37.95];
    for (var i = 0; i < gemLoc.length; i++) {
        gemY.push((viewHeight * gemLoc[i]) / 100);
    }
    for (var i = 0; i < 5; i++) {
        gemX.push((viewWidth / 5) * i);
    }
    var gemRand = gemArray[Math.floor(Math.random() * gemArray.length)];
    this.x = gemX[Math.floor(Math.random() * gemX.length)]; // Assigning gem x co-ordinate
    this.y = gemY[Math.floor(Math.random() * gemY.length)]; // Assigning gem y co-ordinate
    this.sprite = gemRand; // The image/sprite for our gem
};

Gems.prototype.update = function(dt) {
    // All updates to the gem go here
    checkObatined(this);
};

Gems.prototype.render = function() {
    // Draw the gem on the screen
    var putImg = Resources.get(this.sprite);
    var newWidth = viewWidth / 5;
    var newHeight = (putImg.height * newWidth) / putImg.width;
    ctx.drawImage(putImg, this.x, this.y, newWidth, newHeight);
};

// Function to check for collision between car and player
var checkCollision = function(enemy) {
    var putImg = Resources.get('images/enemy-car.png');
    var newWidth = viewWidth / 5;
    var newHeight = (putImg.height * newWidth) / putImg.width;
    if (
        player.y + ((newHeight * 76.6) / 100) >= enemy.y + ((newHeight * 52.63) / 100) &&
        player.x + ((newWidth * 24.75) / 100) <= enemy.x + ((newWidth * 87.13) / 100) &&
        player.y + ((newHeight * 42.7) / 100) <= enemy.y + ((newHeight * 78.95) / 100) &&
        player.x + ((newWidth * 75.24) / 100) >= enemy.x + ((newWidth * 10.89) / 100)) {
        var hit = document.getElementById('music1');
        hit.play(); // Playing audio for collision
        avatarHealth -= 10; // Reducing player health
        var healthStat = document.getElementById('meter');
        healthStat.value = avatarHealth; // Updating player health on the document
        //Reseting player location the intial position
        player.x = playerXLoc;
        player.y = playerYLoc;
        // Condition if player health falls to 0
        if (avatarHealth <= 0) {
            var lose = document.getElementById('music2');
            lose.play();
            swal({
                title: 'You Lose! Try Again?',
                text: 'Achievements',
                html: `Score: ${score}`,
                type: 'error',
                confirmButtonText: 'Play again!',
                allowOutsideClick: false,
                allowEscapeKey: false,
                onClose: function() {
                    window.location.reload(false)
                }
            })
        }
    }

    // Check for player reaching top of canvas and winning the game
    if (player.y + (viewHeight / 14) <= 0) {
        player.x = playerXLoc;
        player.y = playerYLoc;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 505, 171);
        // Upadating player score,level and health
        score += 50;
        gameLevel += 1;
        avatarHealth = 100;
        var healthStat = document.getElementById('meter');
        healthStat.value = avatarHealth;
        // Condition if player has finished 12 levels of the game
        if (gameLevel > 12) {
            var win = document.getElementById('music3');
            win.play();
            swal({
                title: 'Congratulations! You Won!',
                text: 'Achievements',
                html: `Score: ${score}`,
                type: 'success',
                confirmButtonText: 'Play again!',
                allowOutsideClick: false,
                allowEscapeKey: false,
                onClose: function() {
                    if (leaderScore <= score || leaderScore === 'No Score') {
                        localStorage.setItem('name', avatarName);
                        localStorage.setItem('score', score);
                    }
                    window.location.reload(false);
                }
            })
        }
        enemyY.length = 0; // Reseting the no.of cars
        setEnemyArray(); // Setting possible y co-ordinates for the car in enemyY array
        increaseDifficulty(gameLevel); // Increasing game difficulty
        gemSpawn(Math.floor(Math.random() * 4)); // Spawning gems on each level
    }
    // check if player runs into left, bottom, or right canvas walls
    // prevent player from moving beyond canvas wall boundaries
    if (player.y > playerYLoc) {
        player.y = playerYLoc;
    }
    if (player.x > newWidth * 4) {
        player.x = newWidth * 4;
    }
    if (player.x < 0) {
        player.x = 0;
    }
};

// Function to update player score and level
var gameStatUpdater = function() {
    var gamerScore = document.getElementById('points');
    var gamerLevel = document.getElementById('level');
    gamerScore.innerHTML = `Score : ${score}`;
    gamerLevel.innerHTML = `Level : ${gameLevel}`;
};

// Function to check if gem obtained by player
var checkObatined = function(gemGet) {
    var putImg = Resources.get('images/Gem Blue.png');
    var newWidth = viewWidth / 5;
    var newHeight = (putImg.height * newWidth) / putImg.width;
    if (
        player.y + ((newHeight * 76.6) / 100) >= gemGet.y + ((newHeight * 52.63) / 100) &&
        player.x + ((newWidth * 24.75) / 100) <= gemGet.x + ((newWidth * 87.13) / 100) &&
        player.y + ((newHeight * 42.7) / 100) <= gemGet.y + ((newHeight * 78.95) / 100) &&
        player.x + ((newWidth * 75.24) / 100) >= gemGet.x + ((newWidth * 10.89) / 100)) {

        var get = document.getElementById('music0');
        get.play(); // Playing audio for obatining gem
        // Removing gem from game
        gemGet.x = -1000;
        gemGet.y = -1000;
        // If blue gem add 10 to score and health
        if (gemGet.sprite === 'images/Gem Blue.png') {
            score += 10;
            avatarHealth += 10;
            // If green gem add 20 to score and health
        } else if (gemGet.sprite === 'images/Gem Green.png') {
            score += 20;
            avatarHealth += 20;
            // If gold gem add 30 to score and health
        } else {
            score += 30;
            avatarHealth += 30;
        }
        // Setting player health max value
        if (avatarHealth > 100) {
            avatarHealth = 100;
        }
        var healthStat = document.getElementById('meter');
        healthStat.value = avatarHealth;
    }
};

// Funtion to set possible y co-ordinate values for the car
var setEnemyArray = function() {
    var locArray = [4.95, 11.55, 18.98, 25.58, 32.18, 38.78];
    for (var i = 0; i < locArray.length; i++) {
        enemyY.push((viewHeight * locArray[i]) / 100);
    }
};

// Increase number of enemies on screen based on player's score
var increaseDifficulty = function(numEnemies) {
    // remove all previous enemies on canvas
    allEnemies.length = 0;
    var counter;
    // load new set of enemies based on game level
    if (numEnemies % 2 === 0) {
        counter = numEnemies / 2;
        for (var i = 1; i <= counter; i++) {
            var enemy = new Enemy(Math.random() * 100);

            allEnemies.push(enemy);
        }
    } else {
        counter = (numEnemies - 1) / 2;
        for (var i = 0; i <= counter; i++) {
            var enemy = new Enemy(Math.random() * 100);

            allEnemies.push(enemy);
        }
    }
};

// Spawing gems randomly every level
var gemSpawn = function(numGem) {
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

var playerXLoc = (viewWidth / 5) * 2; // Player x co-ordinate
var playerYLoc = (viewHeight * 62.75) / 100; // Player y co-ordinate
var allEnemies = []; // Array of all cars on the canvas
var allGems = []; // Array of all gems on the canvas
setTimeout(function() {
    keypad()
}, 500); // Adding keypad to the document after 500ms
var player = new Player(avatar); // Creating player object
var enemyY = []; // Array to hold possible y co-ordinate values for the car
setEnemyArray(); // Funtion to set possible y co-ordinate values for the car
var enemy = new Enemy(Math.random() * 100); // // Creating car object
var gem = new Gems(); // Creating gem object

allGems.push(gem);
allEnemies.push(enemy);


var reload = document.getElementById('reload');
// Event listener if reload is clicked
reload.onclick = function() {
    swal({
        title: 'Reload! Are you sure?',
        type: 'warning',
        confirmButtonText: 'Reload!',
        allowOutsideClick: false,
        showCancelButton: true,
        cancelButtonText: 'Continue?',
        allowEscapeKey: false,
    }).then(function() {
        window.location.reload(false);
    }, function() {})
};

// Function Adding keypad to the document
var keypad = function() {
    var keypadOne = document.createElement('div');
    keypadOne.className += 'keys';
    keypadOne.id = 'arrowone';
    document.body.appendChild(keypadOne);

    var keypadTwo = document.createElement('div');
    keypadTwo.className += 'keys';
    keypadTwo.id = 'arrowtwo';
    document.body.appendChild(keypadTwo);

    var keypadThree = document.createElement('div');
    keypadThree.id = 'arrowthree';
    keypadThree.className += 'keys';
    document.body.appendChild(keypadThree);

    var keypadUp = document.createElement('img');
    keypadUp.className += 'keyimg';
    keypadUp.id = 'arrowup';
    keypadUp.src = 'images/up.png';
    keypadOne.appendChild(keypadUp);

    var keypadLeft = document.createElement('img');
    keypadLeft.className += 'keyimg';
    keypadLeft.id = 'arrowleft';
    keypadLeft.src = 'images/left.png';
    keypadTwo.appendChild(keypadLeft);

    var keypadRight = document.createElement('img');
    keypadRight.className += 'keyimg';
    keypadRight.id = 'arrowright';
    keypadRight.src = 'images/right.png';
    keypadTwo.appendChild(keypadRight);

    var keypadDown = document.createElement('img');
    keypadDown.className += 'keyimg';
    keypadDown.id = 'arrowdown';
    keypadDown.src = 'images/down.png';
    keypadThree.appendChild(keypadDown);
}

// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// This listens for clicks on the keypad and moves the player accordingly
setTimeout(function() {
    var putImg = Resources.get('images/char-boy.png');
    var newWidth = viewWidth / 5;
    var newHeight = (putImg.height * newWidth) / putImg.width;
    var buttonLeft = document.getElementById('arrowleft');
    buttonLeft.onclick = function() {
        player.x -= (newWidth / 2);
    };
    var buttonUp = document.getElementById('arrowup');
    buttonUp.onclick = function() {
        player.y -= (newHeight / 6.2);
    };
    var buttonRight = document.getElementById('arrowright');
    buttonRight.onclick = function() {
        player.x += (newWidth / 2);
    };
    var buttonDown = document.getElementById('arrowdown');
    buttonDown.onclick = function() {
        player.y += (newHeight / 6.2);
    };
}, 500);