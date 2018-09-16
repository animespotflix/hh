// JAVASCRIPT

// START OF BATTLE
var currentState;
var numMovesMade;
var cpuPokemon;
var userPokemon;
var debug = true;


// FIX
// moves need to be chosen before deciding who goes when
// paralyzed pokemon have 25% of not being able to attack and speed is reduced by 75%


var cpuTurn = 
{
    play: function() 
    {
        var randomMove = Math.floor(Math.random() * 4);
        var currentCPUMove = cpuPokemon.moves[randomMove];
        cpuPokemon.moves[randomMove].pp--;

        var setUpCPUField = function() 
        {
            $("#chat-text").text("What will " + cpuPokemon.name + " do?");
            setTimeout(prepareToAttack, 1000);
        };

        var prepareToAttack = function() 
        {
            $("#cpuPoke-img").stop();
            $("#cpuPoke-img").animate({
                top: "-=25",
            }, 200, function() {
                $("#cpuPoke-img").animate({
                top: "+=25",
            }, 200)
            });

            getAccuracy();
        };

        var getAccuracy = function() 
        {
            var setAccuracy = Math.random();

            if(setAccuracy <= currentCPUMove.accuracy) 
            {
                $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + "!");
                getMoveType();
            }

            else 
            {
                $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + ".\n" + cpuPokemon.name + "'s attack missed!");
                currentState = playerTurn;
                setTimeout(loop, 1500);
            }
        };

        var getMoveType = function() 
        {
            showMoveAnimation();

            if(currentCPUMove.attDef == "Attack") 
            {
                setTimeout(attackingMove, 1500);
            }

            else 
            {
                setTimeout(defensiveMove, 1500);
            }
        };

        var showMoveAnimation = function() 
        {
            $("#attack-img").addClass("cpu-attack-img");
            $("#attack-img").removeClass("hide");
            //$("#attack-img").
            //fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
            for(i = 0; i < 4; i++) 
            {
                $("#attack-img").fadeIn(100).fadeOut(100);
            }
        };

        var attackingMove = function() 
        {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("cpu-attack-img");

            var crit = 1;
            var critPerc = cpuPokemon.speed / 512;
            var rand = Math.random();
            var damage;

            if(rand <= critPerc) 
            {
                crit = 2;
            }

            if(!cpuPokemon.effect) 
            {
                damage = damageFormula(crit, cpuPokemon, currentCPUMove, userPokemon);
                userPokemon.hp -= damage;

                if(crit == 2) 
                {
                    $("#chat-text").text("Critical hit!");
                    console.log("Crit!");
                }

                console.log(crit + " Pika gave: " + damage + " Charm hp: " + userPokemon.hp + ", pp: " + currentCPUMove.pp);
            }

            else 
            {
                //userPokemon.health -= (currentCPUMove.power) - (currentCPUMove.power * cpuPokemon.effect);
                userPokemon.hp -= (currentCPUMove.power) * (1 - cpuPokemon.effect);
                cpuPokemon.effect = null;
            }

            if(userPokemon.hp < 0)
                userPokemon.hp = 0;

            $("#user-health-bar").css("width", userPokemon.hp/userPokemon.base_hp * 100 + "%");
            $("#user-hp").text(userPokemon.hp + " / " + userPokemon.base_hp);
            currentState = playerTurn;

            if(crit == 2) 
            {
                setTimeout(loop, 1500);
            }

            else 
            {
                loop();
            }
        };

        var defensiveMove = function() 
        {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("cpu-attack-img");

            userPokemon.effect = currentCPUMove.power;
            currentState = playerTurn;
            loop();
        };

        setUpCPUField();
    }
};

var playerTurn = 
{
    play: function() 
    {
        var currentUserMove;

        var setUpUserField = function() 
        {
            var moveButtons = ["#move1-text", "#move2-text", "#move3-text", "#move4-text"];

            $("#user-buttons").removeClass("hide");
            $("#chat-text").text("What will " + userPokemon.name + " do?");

            for(var i = moveButtons.length - 1; i >= 0; i--) 
            {
                $(moveButtons[i]).html(userPokemon.moves[i].name + "<br> (pp: " + userPokemon.moves[i].pp + ")");
            }
        };

        var prepareToAttack = function() 
        {
            $("#user-buttons").addClass("hide");
            $("#userPoke-img").stop();

            $("#userPoke-img").animate({
                top: "-=25",
            }, 200, function() {
                $("#userPoke-img").animate({
                top: "+=25",
            }, 200)
            });

            getAccuracy();
        };

        var getAccuracy = function() 
        {
            var setAccuracy = Math.random();

            if(setAccuracy <= currentUserMove.accuracy) 
            {
                $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!");
                getMoveType();
            }

            else 
            {
                $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + ".\n" + userPokemon.name + "'s attack missed!");
                currentState = cpuTurn;
                setTimeout(loop, 1500);
            }
        };

        var getMoveType = function () 
        {
            showMoveAnimation();

            if(currentUserMove.attDef == "Attack") 
            {
                setTimeout(attackingMove, 1500);
            }

            else 
            {
                setTimeout(defensiveMove, 1500);
            }
        };

        var showMoveAnimation = function() 
        {
            $("#attack-img").addClass("user-attack-img");
            $("#attack-img").removeClass("hide");
            //$("#attack-img").
            //fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
            for(i = 0; i < 4; i++) {
                $("#attack-img").fadeIn(100).fadeOut(100);
            }
        };

        var attackingMove = function() 
        {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("user-attack-img");

            var crit = 1;
            var critPerc = userPokemon.base_speed / 512;
            var rand = Math.random();
            var damage;

            if(!userPokemon.effect) 
            {
                // High crit ratio: Crabhammer, Karate Chop, Razor Leaf, Slash
                if(currentUserMove.name.localeCompare("Crabhammer") == 0 ||
                        currentUserMove.name.localeCompare("Karate Chop") == 0 ||
                        currentUserMove.name.localeCompare("Razor Leaf") == 0 ||
                        currentUserMove.name.localeCompare("Slash") == 0)
                {
                    critPerc = userPokemon.base_speed / 64;
                }


                if(rand <= critPerc) 
                {
                    crit = 2;
                }
                
                damage = damageFormula(crit, userPokemon, currentUserMove, cpuPokemon);
                cpuPokemon.hp -= damage;

                if(crit == 2) 
                {
                    $("#chat-text").text("Critical hit!");
                    console.log("Crit!");
                }

                console.log(crit + " Charm gave: " + damage + " Pika hp: " + cpuPokemon.hp + ", pp: " + currentUserMove.pp);
            }

            else 
            {
                //cpuPokemon.health -= (currentUserMove.power) - (currentUserMove.power * userPokemon.effect);
                cpuPokemon.hp -= (currentUserMove.power) * (1 - userPokemon.effect);
                userPokemon.effect = null;
            }

            if(cpuPokemon.hp < 0)
                cpuPokemon.hp = 0;

            $("#cpu-health-bar").css("width", cpuPokemon.hp/cpuPokemon.base_hp * 100 + "%");
            $("#cpu-hp").text(cpuPokemon.hp + " / " + cpuPokemon.base_hp);
            currentState = cpuTurn;

            if(crit == 2) 
            {
                setTimeout(loop, 1500);
            }

            else {
                loop();
            }
        };

        var defensiveMove = function() 
        {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("user-attack-img");

            cpuPokemon.effect = currentUserMove.power;
            currentState = cpuTurn;
            loop();
        };

        $("#move1-button, #move2-button, #move3-button, #move4-button").unbind().click(function() 
        {
            var move = $(this).attr("value");
            currentUserMove = userPokemon.moves[move];
            userPokemon.moves[move].pp--;
            prepareToAttack();
        });

        setUpUserField();
    }
};

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
    var mod = Math.floor(Math.floor((Math.random() * (255 - 217 + 1) + 217) / 255 * stab) * type);  // random a number [217, 255] divided by 255

    var damage = Math.floor((Math.floor(Math.floor(Math.floor(Math.floor(Math.floor(2 * level / 5 + 2) * power) * att) / def) / 50) + 2) * mod);
 

    if(debug)
    {
        console.log("level: " + level + ", power: " + power + ", att: " + att +
                ", def: " + def + ", stab: " + stab + ", type: " + type + ", mod: " + mod)
    }


    return Math.floor(damage);
};

var loop = function() 
{
    numMovesMade++;
    console.log("Moves: " + numMovesMade);
    if(cpuPokemon.hp <= 0) 
    {
        //$("#game-over").removeClass("hide");
        //$("#game-over").text("Game Over!\n You win!");
        $("#chat-text").text("Foe " + cpuPokemon.name + " fainted!");
        //if enter is pressed
        //$("#chat-text").text("You win!");

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
    }

    else 
    {
        // still need to ask for move first (some moves have higher priority)
        if(numMovesMade % 2 == 1)
            setState();
        
        currentState.play();
    }
}

var setState = function()
{
    // FIX THIS TO LOOK AT SPEED STAT
    // If same, it's random
    // Quick Attack has priority 1
    // Counter has priority -1
    // Everything else is 0
    // If paralyzed, speed reduced by 25%
    if(userPokemon.speed > cpuPokemon.speed)
        currentState = playerTurn;

    else if(cpuPokemon.speed > userPokemon.speed)
        currentState = cpuTurn;

    else 
    {
        var rand = Math.random();

        if(rand < 0.5)
            currentState = cpuTurn;
        else
            currentState = playerTurn;
    }
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
    setState();    
    loop();
};

init();
