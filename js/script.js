// JAVASCRIPT

// START OF BATTLE
var currentState = "";
var foe;
var user;
var numMovesMade;
var cpuPokemon;
var userPokemon;
var running = false;
var debug = true;


// param: critical hit value, attacking pokemon, move played, defending pokemon
// return: value of damage given (int)
var damageFormula = function(crit, offPoke, move, defPoke) 
{    
    var att = offPoke.attack;
    var def = defPoke.defense;

    if(typeEffectiveness.isSpecialMove(move))  // use special stat if it is a special move type
    {
        att = offPoke.special;
        def = defPoke.special;
    }

    var level = offPoke.lvl * crit;
    var power = move.power;
    var stab = typeEffectiveness.getStabMult(move.type, offPoke.type);
    var type = typeEffectiveness.getEffMult(move.type, defPoke.type)
    var mod = (Math.random() * (255 - 217 + 1) + 217) / 255 * stab * type;  // random a number [217, 255] divided by 255

    var damage = Math.floor((Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * power) * att) / def) / 50) + 2) * mod);
 

    if(debug)
    {
        console.log("level: " + level + ", power: " + power + ", att: " + att +
                ", def: " + def + ", stab: " + stab + ", type: " + type + ", mod: " + mod)
    }


    return Math.floor(damage);
};

var checkWinLoss = function()
{
    if(cpuPokemon.hp <= 0) 
    {
        //$("#game-over").removeClass("hide");
        //$("#game-over").text("Game Over!\n You win!");
        $("#chat-text").text("Foe " + cpuPokemon.name + " fainted!");
        //if enter is pressed
        //$("#chat-text").text("You win!");
        return true;
        document.addEventListener('keydown', function(event) 
        {
            if(event.keyCode == 13) 
            {
                $("#chat-text").text("You win!");
            }
        });
    }

    else if(userPokemon.hp <= 0) 
    {
        //$("#game-over").removeClass("hide");
        //$("#game-over").text("Game Over!\nCPU wins!");
        $("#chat-text").text(userPokemon.name + " fainted!");
        return true;
    }

    return false;
}

var loop = function() 
{
    if(!checkWinLoss())
    {
        // still need to ask for move first (some moves have higher priority)
        if(numMovesMade % 2 == 0 && !running)
        {
            console.log("HERE" + running);
            var m = getMoves();
            
            if(running)
                setState(m);        
        }
        if(numMovesMade % 2 == 0 && currentState.localeCompare("foe") == 0 && running)
        {   
            foe.play();
            numMovesMade++;
            setTimeout(function() {
                if(!checkWinLoss())
                {
                    setTimeout(user.play(), 1500);
                    numMovesMade++;
                    running = false;
                }
            }, 3000);
        }
        else if(numMovesMade % 2 == 0 && running)
        {
            user.play();
            numMovesMade++;
            setTimeout(function() {
                if(!checkWinLoss())
                {
                    setTimeout(foe.play(), 1500);
                    numMovesMade++;
                    running = false;
                }
            }, 3000);
        }
    }
}

var showUserButtons = function() 
{
    var moveButtons = ["#move1-text", "#move2-text", "#move3-text", "#move4-text"];

    $("#user-buttons").removeClass("hide");

    for(var i = moveButtons.length - 1; i >= 0; i--) 
    {
        $(moveButtons[i]).html(userPokemon.moves[i].name + "<br> (pp: " + userPokemon.moves[i].pp + ")");
    }
};

var hideUserButtons = function() 
{
    $("#user-buttons").addClass("hide");
};

var getMoves = function()
{
    var movesForTurn = [];  
    showUserButtons();

    $("#move1-button, #move2-button, #move3-button, #move4-button").unbind().click(function() 
    {
        var move = $(this).attr("value");
        user = playerTurn;
        user.currentUserMove = userPokemon.moves[move];
        movesForTurn[0] = user.currentUserMove;
        hideUserButtons();
        var randomMove = Math.floor(Math.random() * 4);
        foe = cpuTurn;
        foe.currentCpuMove = cpuPokemon.moves[randomMove];
        movesForTurn[1] = foe.currentCpuMove;
        console.log("Moves picked");
        setState(movesForTurn);
    });
}

var setState = function(moves)
{
    // FIX THIS TO LOOK AT SPEED STAT
    // If same, it's random
    // Quick Attack has priority 1
    // Counter has priority -1
    // Everything else is 0
    // If paralyzed, speed reduced by 25%

    console.log("setState");
    var playerMovePriority;
    var cpuMovePriority;

    if(moves != undefined)
    {
        playerMovePriority = moves[0].priority;
        cpuMovePriority = moves[1].priority;

        if(playerMovePriority > cpuMovePriority)
        {
            currentState = "user";
        }
        else if(cpuMovePriority > playerMovePriority)
        {
            currentState = "foe";
        }
        else if(userPokemon.speed > cpuPokemon.speed)
        {
            currentState = "user";
        }
        else if(cpuPokemon.speed > userPokemon.speed)
        {
            currentState = "foe";
        }
        else 
        {
            var rand = Math.random();

            if(rand < 0.5)
                currentState = "foe";
            else
                currentState = "user";
        }

        running = true;
    }

    loop();
}

// START
var init = function() 
{
    cpuPokemon = pikachu;
    $("#cpu-name").text(cpuPokemon.name);
    $("#cpu-lvl").text("Lv" + cpuPokemon.lvl);
    $("#cpu-hp").text(cpuPokemon.hp + " / " + cpuPokemon.hp);

    userPokemon = charmander;
    $("#user-name").text(userPokemon.name);
    $("#user-lvl").text("Lv" + userPokemon.lvl);
    $("#user-hp").text(userPokemon.hp + " / " + userPokemon.hp);

    if(debug)
    {
        console.log("DEBUGGING\n\n");
    }

    numMovesMade = 0;
    loop();
};

init();
