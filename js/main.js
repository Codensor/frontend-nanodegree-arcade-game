// Select player skin
var choosePlayer = function() {
    // Creating a modal to select player skin
    // Creating divs for the modal
    var playerCharacter = document.createElement('div');
    var modalContent = document.createElement('div');
    var heading = document.createElement('h1');
    // Insert heading to the modal
    heading.innerHTML = "Please choose a character";
    // Appending modal to the document
    modalContent.appendChild(heading);
    playerCharacter.appendChild(modalContent);
    document.body.appendChild(playerCharacter);
    // Adding classes to the modal divs
    var models = document.getElementsByTagName('div');
    models[0].className += "charModal";
    models[1].className += "modalContent";
    // Adding Player Skins to the modal
    charImg = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png','images/char-pink-girl.png','images/char-princess-girl.png'];
    for (var i = 0; i < charImg.length; i++) {
        var picHolder = document.createElement('div');
        var pic = document.createElement('img');
        pic.setAttribute('src', charImg[i]);
        pic.setAttribute('class', 'character animated');
        picHolder.setAttribute('class', 'imgHold');
        picHolder.appendChild(pic);
        models[1].appendChild(picHolder);
    }
    // Function to select player skin
    var selection = function selection () {
        models[0].style.display = "block"; // Display selection modal
        var image = document.querySelectorAll('img.character');
        // Add modal animations
        for (var i = 0; i < image.length; i++) {
            image[i].addEventListener('mouseover', function () {
                this.classList.add("bounce");
            });
            image[i].addEventListener('mouseleave', function () {
                this.classList.remove("bounce");
            });
            // Event listner when player skin is chosen
            image[i].addEventListener('click', function () {

                avatar = this.getAttribute("src"); // Assigning the chosen skin's src
                models[0].style.display = "none"; // Hiding the modal

                swal({
                  title: 'Enter Player Name',
                  input: 'text',
                  imageUrl: avatar,
                  inputPlaceholder: 'Enter your name or nickname',
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  showCancelButton: false,
                  inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                        if (value) {
                            resolve()
                        } else {
                            reject('You need to write something!')
                        }
                        })
                    }
                }).then(function (name) {
                    avatarName = name;
                    swal({
                        type: 'success',
                        imageUrl: avatar,
                        title: `${name}<br><br>Ready to play?`,
                        onClose: function () {
                            var leaderBoard = document.createElement('div');
                            var health = document.createElement('div');
                            var bar = document.createElement('progress');
                            var statBoard = document.createElement('div');
                            leaderBoard.className += "leader";
                            health.className += "health";
                            bar.className += "bar";
                            statBoard.className += "stat";
                            health.setAttribute('id', 'heal');
                            bar.setAttribute('value', avatarHealth);
                            bar.setAttribute('max', 100);
                            bar.setAttribute('id', 'meter');
                            leaderBoard.innerHTML = `<span>Leader Name : ${leaderName}</span> <span>Leader Score : ${leaderScore}</span>`;
                            health.innerHTML = "Restart : <span id='reload'>&#10226</span> Health : ";
                            statBoard.innerHTML = `<span>Score : ${score}</span> <span>Level : ${gameLevel}</span>`;
                            health.appendChild(bar);
                            document.body.appendChild(leaderBoard);
                            document.body.appendChild(statBoard);
                            document.body.appendChild(health);

                            var audioArray = ["audio/gem.mp3", "audio/hit.mp3", "audio/lose.mp3", "audio/win.mp3"];
                            for (var i = 0; i < audioArray.length; i++) {
                                var audioClip = document.createElement('audio');
                                audioClip.setAttribute("id", "music" + i);
                                audioClip.setAttribute("src", audioArray[i]);
                                audioClip.setAttribute("preload", "auto");
                                document.body.appendChild(audioClip);
                            }

                            var jscripts = ["js/app.js", "js/engine.js"];
                            for (var i = 0; i < jscripts.length; i++) {
                                var linker = document.createElement("script");
                                linker.setAttribute("src", jscripts[i]);
                                linker.className += "renders";
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

var leaderName = localStorage.getItem("name");
var leaderScore = localStorage.getItem("score");
if (leaderName === null) {
    leaderName = "No Leader";
}
if (leaderScore === null) {
    leaderScore = "No Score";
}
var gameName = document.createElement('h1');
gameName.className += "firstHead";
gameName.innerHTML = "<span>&#127939</span><span>J</span>ayWalker<span>&#128665</span>";
document.body.appendChild(gameName);
var score = 0;
var gameLevel = 1;
var avatarName; // Variable to store chosen player name
var avatar; // Variable to store chosen player skin's src
var avatarHealth = 100;
choosePlayer(); // Calling the Player Selection Function