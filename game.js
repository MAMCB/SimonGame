var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var numberClicks=0;
var wrong=false;
var gameOver=false;


function nextSequence(){
    var randomNumber=Math.round(Math.random()*3);
    level++;
    $("h1").text("Level: " + level);
    var randomChosenColour = buttonColours[randomNumber];
    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);

    for (var i = 0; i < 2; i++) {
        $("#" + randomChosenColour).fadeToggle();
    }
    userClickedPattern = [];
    numberClicks=0;
}






$(document).keypress(function  (){
    if(gameOver)
    {
        startOver();
        gameOver=false;
    }
    $("h1").text("Level: "+level);
    nextSequence();
});

$(".btn").on("click",function(){
    var userChosenColour=this.id;
    userClickedPattern.push(userChosenColour);
    
   animatePress(userChosenColour);
   numberClicks++;
    checkAnswer((userClickedPattern.length)-1)
    playSound(userChosenColour);
    
})

function playSound(name){
    if(!wrong){
        var ChosenSound = "" + name + ".mp3";
    }
    else{

        var ChosenSound="wrong.mp3";
    }
    
    var audio=new Audio("sounds/"+ChosenSound);
    audio.play();

}

function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
},100)
}

function checkAnswer(currentLevel){
if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
{
    if(numberClicks===gamePattern.length)
    {
        setTimeout(function () {
            nextSequence()

        }, 1000)
    }
    
    
}
else
{
    wrong=true;
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200)
    $("h1").text("Game Over,press any key to restart.");
    gameOver=true;
}
}

function startOver(){
    level=0;
    gamePattern=[];
    wrong=false;
}