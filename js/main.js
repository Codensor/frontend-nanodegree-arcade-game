// Player Selection Function
var choosePlayer = function() {
    // Creating a modal to select player skin
    // Creating divs for the modal
    var playerCharacter = document.createElement('div');
    var modalContent = document.createElement('div');
    var heading = document.createElement('h1');
    // Insert heading to the modal
    heading.innerHTML = 'Please choose a character';
    // Appending modal to the document
    modalContent.appendChild(heading);
    playerCharacter.appendChild(modalContent);
    document.body.appendChild(playerCharacter);
    // Adding classes to the modal divs
    var models = document.getElementsByTagName('div');
    models[0].className += 'charModal';
    models[1].className += 'modalContent';
    // Adding Player Skins to the modal
    charImg = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
    for (var i = 0; i < charImg.length; i++) {
        var picHolder = document.createElement('div');
        picHolder.setAttribute('class', 'imgHold');

        var pic = document.createElement('img');
        pic.setAttribute('src', charImg[i]);
        pic.setAttribute('class', 'character animated');

        picHolder.appendChild(pic);
        models[1].appendChild(picHolder);
    }
    // Function to select player skin
    var selection = function selection() {
        models[0].style.display = 'block'; // Display selection modal
        var image = document.querySelectorAll('img.character');
        // Add modal animations
        for (var i = 0; i < image.length; i++) {
            image[i].addEventListener('mouseover', function() {
                this.classList.add("bounce");
            });
            image[i].addEventListener('mouseleave', function() {
                this.classList.remove("bounce");
            });
            // Event listner when player skin is chosen
            image[i].addEventListener('click', function() {

                avatar = this.getAttribute('src'); // Assigning the chosen skin's src
                models[0].style.display = 'none'; // Hiding the modal
                // Modal to collect player name
                swal({
                    title: 'Enter Player Name',
                    input: 'text',
                    imageUrl: avatar,
                    inputPlaceholder: 'Enter your name or nickname',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    showCancelButton: false,
                    inputValidator: function(value) {
                        return new Promise(function(resolve, reject) {
                            if (value) {
                                resolve()
                            } else {
                                reject('You need to write something!')
                            }
                        })
                    }
                }).then(function(name) {
                    avatarName = name;
                    swal({
                        type: 'success',
                        imageUrl: avatar,
                        title: `${name}<br><br>Ready to play?`,
                        // Creating required divs to display leaderboard, statusboard, reload button and health bar
                        onClose: function() {
                            var leaderBoard = document.createElement('div');
                            leaderBoard.className += 'leader';
                            leaderBoard.innerHTML = `<span>Leader Name : ${leaderName}</span> <span>Leader Score : ${leaderScore}</span>`;
                            var health = document.createElement('div');

                            health.className += 'health';
                            health.setAttribute('id', 'heal');
                            health.innerHTML = "Restart : <span id='reload'>&#10226</span> Health : ";

                            var bar = document.createElement('progress');
                            bar.className += 'bar';
                            bar.setAttribute('value', avatarHealth);
                            bar.setAttribute('max', 100);
                            bar.setAttribute('id', 'meter');

                            var statBoard = document.createElement('div');
                            statBoard.className += 'stat';
                            statBoard.innerHTML = `<span id='points'>Score : ${score}</span> <span id='level'>Level : ${gameLevel}</span>`;

                            health.appendChild(bar);
                            document.body.appendChild(leaderBoard);
                            document.body.appendChild(statBoard);
                            document.body.appendChild(health);
                            // Adding audio files to the document
                            var audioArray = ['audio/gem.mp3', 'audio/hit.mp3', 'audio/lose.mp3', 'audio/win.mp3'];
                            for (var i = 0; i < audioArray.length; i++) {
                                var audioClip = document.createElement('audio');
                                audioClip.setAttribute('id', 'music' + i);
                                audioClip.setAttribute('src', audioArray[i]);
                                audioClip.setAttribute('preload', "auto");
                                document.body.appendChild(audioClip);
                            }
                            // Adding the remaining js files the document
                            var jscripts = ['js/app.js', 'js/engine.js'];
                            for (var i = 0; i < jscripts.length; i++) {
                                var linker = document.createElement('script');
                                linker.className += 'renders';
                                linker.setAttribute('src', jscripts[i]);
                                document.body.appendChild(linker);
                            }
                        }
                    })
                })
            });
        }
    };
    selection(); // Calling the main funtion to select player skin
};

// Function to get device width
function getViewport() {

    var viewPortWidth;

    // The more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
    if (typeof window.innerWidth != 'undefined') {
        viewPortWidth = window.innerWidth;
    }

    // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
    else if (typeof document.documentElement != 'undefined' &&
        typeof document.documentElement.clientWidth !=
        'undefined' && document.documentElement.clientWidth != 0) {
        viewPortWidth = document.documentElement.clientWidth;
    }

    // Older versions of IE
    else {
        viewPortWidth = document.getElementsByTagName('body')[0].clientWidth;
    }
    return viewPortWidth;
}

// Funtion to set the viewWidth and viewHeight
function setViews() {
    // if screen width is greater than 1280px
    if (view >= 1280) {
        viewWidth = 505;
        viewHeight = 606;
    // if screen width is below 1280px
    } else {
        viewWidth = (view * (75 / 100));
        viewHeight = (606 * viewWidth) / 505;
    }
}

var view = getViewport(); // Calling getViewport function to get device width
var viewWidth = 0; // Variable to store device viewport width
var viewHeight = 0; // Variable to store device viewport height
setViews(); // Setting the viewWidth and viewHeight values
var leaderName = localStorage.getItem('name'); // Getting leader name from local storeage if it exists
var leaderScore = localStorage.getItem('score'); // Getting leader score from local storeage if it exists
// setting leader name and score if local copy doesn't exist
if (leaderName === null) {
    leaderName = 'No Leader';
    leaderScore = 'No Score';
}
var gameName = document.createElement('h1'); // Creating a h1 html element
gameName.className += 'firstHead'; // Assigning a class name to the h1 html element
gameName.innerHTML = '<span>&#127939</span><span>J</span>ayWalker<span>&#128665</span>'; // Inserting html into the h1 html element
document.body.appendChild(gameName); // Adding the h1 element to the html document
var score = 0; // VAriable to hold the player score
var gameLevel = 1; // VAriable to hold the player level
var avatarName; // Variable to store chosen player name
var avatar; // Variable to store chosen player skin's src
var avatarHealth = 100; // Setting player health points
choosePlayer(); // Calling the Player Selection Function