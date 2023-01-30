
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

function nextSequence(){
    userClickedPattern = [];
    randomNumber = Math.floor(Math.random() * 3);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    chooseElement = "#" + randomChosenColour;
    $(chooseElement).fadeOut(100).fadeIn(100);
    level++;
    document.getElementById('level-title').innerHTML = "Level " + level;
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length == gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("failure");
        $('body').addClass("game-over");
        setTimeout(function() {
        $('body').removeClass('game-over');
        }, 200);
        wrongAudio = new Audio('sounds/wrong.mp3');
        wrongAudio.play();
        document.getElementById('level-title').innerHTML = "Game Over, Press Any Key to Restart";
        $(".btn").off('click');
        startOver();

    }

    
}

function startOver(){
    level = 0;
    gamePattern = [];
}





document.addEventListener("keypress", function(){
        if(level==0){
            $(".btn").click(function(){
                userChosenColor = $(this).attr('id');
                userClickedPattern.push(userChosenColor);
                console.log(userClickedPattern); 
                
                playSound(userChosenColor);
                checkAnswer(userClickedPattern.lastIndexOf(userChosenColor));
                console.log(userClickedPattern);
                console.log(gamePattern);
            }) 
            
            nextSequence(); 
        }

        
})



function playSound(name){

    chooseElement = "#" + name;
    elementSound = "sounds/" + name + ".mp3";
    var audio = new Audio(elementSound);
    
    audio.play();
    animatePress(chooseElement);
}


function animatePress(currentColor){
    $(currentColor).addClass("pressed");
    setTimeout(function() {
        $(currentColor).removeClass('pressed');
    }, 100);
}