// JAVASCRIPT


// MOVES
var moveList = [{
    name: "Dig",
    type: ["Ground"],
    attDef: "Attack",
    power: 100,
    accuracy: 1,
    priority: 0,
    pp: 10
},
{
    name: "Slash",
    type: ["Normal"],
    attDef: "Attack",
    power: 70,          // hit crit percentage move
    accuracy: 1,
    priority: 0,
    pp: 20
},
{
    name: "Flamethrower",
    type: ["Fire"],
    attDef: "Attack",
    power: 95,
    accuracy: 1,
    priority: 0,
    pp: 15
},
{
    name: "Mega Punch",
    type: ["Normal"],
    attDef: "Attack",
    power: 80,
    accuracy: 0.85,
    priority: 0,
    pp: 20
},
{
    name: "Thunder Wave",
    type: ["Electric"],
    attDef: "Attack",
    power: 0,
    accuracy: 1,
    priority: 0,
    pp: 20
},
{
    name: "Quick Attack",
    type: ["Normal"],
    attDef: "Attack",
    power: 40,
    accuracy: 1,
    priority: 1,
    pp: 30
},
{
    name: "Thunderbolt",
    type: ["Electric"],
    attDef: "Attack",
    power: 95,
    accuracy: 1,
    priority: 0,
    pp: 15
},
{
    name: "Thunder",
    type: ["Electric"],
    attDef: "Attack",
    power: 120,
    accuracy: 0.7,
    priority: 0,
    pp: 10
}];


// POKEMON
var charmander = {
    name: "Charmander",
    //health: 100,
    lvl: 50,
    type: ["Fire"],
    base_hp: 145,
    hp: base_hp,
    base_attack: 103,
    attack: base_attack,
    base_defense: 94,
    defense: base_defense,
    base_speed: 116,
    speed: base_speed,
    base_special: 101,
    special: base_special,
    effect: null,
    moves: [moveList[0], moveList[1], moveList[2], moveList[3]]
};

var pikachu = {
    name: "Pikachu",
    //health: 100,
    lvl: 50,
    type: ["Electric"],
    base_hp: 141,
    hp: 141,
    base_attack: 106,
    attack: base_attack,
    base_defense: 81,
    defense: base_defense,
    base_speed: 141,
    speed: base_speed,
    base_special: 101,
    special: base_special,
    effect: null,
    moves: [moveList[4], moveList[5], moveList[6], moveList[7]]
};

// TYPE EFFECTIVENESS CHART
var typeEffectiveness = {
    list: ["Normal", "Fight", "Flying", "Poison", "Ground", "Rock", "Bug", "Ghost", "Fire",
            "Water", "Grass", "Electric", "Psychic", "Ice", "Dragon"],

    specialMoves: ["Psychic", "Grass", "Dragon", "Fire", "Water", "Electric", "Ice"],
    physicalMoves: ["Rock", "Ground", "Flying", "Poison", "Fighting", "Bug", "Ghost", "Normal"],

    chart: [[1, 1, 1, 1, 1, 0.5, 1, 0, 1, 1, 1, 1, 1, 1, 1],
            [2, 1, 0.5, 0.5, 1, 2, 0.5, 0, 1, 1, 1, 1, 0.5, 2, 1],
            [1, 2, 1, 1, 1, 0.5, 2, 1, 1, 1, 2, 0.5, 1, 1, 1],
            [1, 1, 1, 0.5, 0.5, 0.5, 2, 0.5, 1, 1, 2, 1, 1, 1, 1],
            [1, 1, 0, 2, 1, 2, 0.5, 1, 2, 1, 0.5, 2, 1, 1, 1],
            [1, 0.5, 2, 1, 0.5, 1, 2, 1, 2, 1, 1, 1, 1, 2, 1],
            [1, 0.5, 0.5, 2, 1, 1, 1, 0.5, 0.5, 1, 2, 1, 2, 1, 1],
            [0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 0.5, 2, 1, 0.5, 0.5, 2, 1, 1, 2, 0.5],
            [1, 1, 1, 1, 2, 2, 1, 1, 2, 0.5, 0.5, 1, 1, 1, 0.5],
            [1, 1, 0.5, 0.5, 2, 2, 0.5, 1, 0.5, 2, 0.5, 1, 1, 1, 0.5],
            [1, 1, 2, 1, 0, 1, 1, 1, 1, 2, 0.5, 0.5, 1, 1, 0.5],
            [1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 1, 1],
            [1, 1, 2, 1, 2, 1, 1, 1, 1, 0.5, 2, 1, 1, 0.5, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]],

    getStabMult: function(moveType, pokeType)
    {
        for(let type of pokeType)
        {
            if(this.getChartIndex(type) == this.getChartIndex(moveType))
            {
                return 1.5;
            }
        }

        return 1;
    },

    getEffMult: function(moveType, defTypes)
    {
        var eff = 1;

        for(let def of defTypes)
        {
            eff *= this.chart[this.getChartIndex(moveType)][this.getChartIndex(def)];
        }

        return eff;
    },

    getChartIndex: function(type)
    {
        for(var i = 0; i < this.list.length; i++)
        {
            if(this.list[i].localeCompare(type) == 0)
            {
                return i;
            }
        }
    },

    // param the move
    // return true if special move, false otherwise.
    isSpecialMove: function(move)
    {
        return (this.specialMoves.indexOf(move.type) > -1) && (this.physicalMoves.indexOf(move.type) == -1);
    }
};



// START OF BATTLE
var currentState;
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
            var critPerc = userPokemon.speed / 512;
            var rand = Math.random();
            var damage;

            if(!userPokemon.effect) 
            {
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

    if(isSpecialMove(move))  // use special stat if it is a special move type
    {
        att = offPoke.special;
        def = defPoke.special;
    }

    var level = offPoke.lvl * crit;
    var power = move.power;
    var stab = typeEffectiveness.getStabMult(move.type, offPoke.type);
    var type = typeEffectiveness.getEffMult(move.type, defPoke.type)
    var mod = (Math.random() * (1 - 0.85) + 0.85) * stab * type;

    var damage = ((((2 * level / 5 + 2) * power * att / def) / 50) + 2) * mod;
 

    if(debug)
    {
        console.log("level: " + level + ", power: " + power + ", att: " + att +
                ", def: " + def + ", stab: " + stab + ", type: " + type + ", mod: " + mod)
    }


    return Math.floor(damage);
};

var loop = function() 
{
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
        currentState.play();
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

    loop();
};

init();
