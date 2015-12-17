var charmander = {
    name: "Charmander",
    //health: 100,
    lvl: 50,
    type: ["Fire"],
    base_hp: 145,
    hp: 145,
    attack: 103,
    defense: 94,
    speed: 116,
    effect: null,
    moves: [{
        name: "Ember",
        type: ["Fire"],
        attDef: "Attack",
        power: 40,
        accuracy: 1
    },
    {
        name: "Slash",
        type: ["Normal"],
        attDef: "Attack",
        power: 70,
        accuracy: 1
    },
    {
        name: "Flamethrower",
        type: ["Fire"],
        attDef: "Attack",
        power: 95,
        accuracy: 1
    },
    {
        name: "Scratch",
        type: ["Normal"],
        attDef: "Attack",
        power: 40,
        accuracy: 1
    }]
};

var pikachu = {
    name: "Pikachu",
    //health: 100,
    lvl: 50,
    type: ["Electric"],
    base_hp: 141,
    hp: 141,
    attack: 106,
    defense: 81,
    speed: 141,
    effect: null,
    moves: [{
        name: "ThunderShock",
        type: ["Electric"],
        attDef: "Attack",
        power: 40,
        accuracy: 1
    },
    {
        name: "Quick Attack",
        type: ["Normal"],
        attDef: "Attack",
        power: 40,
        accuracy: 1
    },
    {
        name: "Thunderbolt",
        type: ["Electric"],
        attDef: "Attack",
        power: 95,
        accuracy: 1
    },
    {
        name: "Thunder",
        type: ["Electric"],
        attDef: "Attack",
        power: 120,
        accuracy: 0.7
    }]
};

var currentState;
var cpuPokemon;
var userPokemon;

var cpuTurn = {
    play: function() {
        var randomMove = Math.floor(Math.random() * 4);
        var currentCPUMove = cpuPokemon.moves[randomMove];
        
        var setUpCPUField = function() {
            $("#chat-text").text("What will " + cpuPokemon.name + " do?"); 
            setTimeout(prepareToAttack, 1000);
        };
        
        var prepareToAttack = function() {
            $("#pikachu-img").stop();
            $("#pikachu-img").animate({
                top: "-=25",
            }, 200, function() {
                $("#pikachu-img").animate({
                top: "+=25",
            }, 200)
            });
            
            getAccuracy();
        };
        
        var getAccuracy = function() {
            var setAccuracy = Math.random();
                
            if(setAccuracy <= currentCPUMove.accuracy) {
                $("#chat-text").text(cpuPokemon.name + " used " + currentCPUMove.name + "!");
                getMoveType();
            }
                
            else {
                $("#chat-text").text(cpuPokemon.name + "'s attack missed!");
                currentState = playerTurn;
                setTimeout(loop, 1500);
            }
        };
        
        
        var getMoveType = function () {
            showMoveAnimation();
            
            if(currentCPUMove.attDef == "Attack") {
                setTimeout(attackingMove, 1500);
            }
            
            else {
                setTimeout(defensiveMove, 1500);    
            }
        };
        
        var showMoveAnimation = function() {
            $("#attack-img").addClass("cpu-attack-img");
            $("#attack-img").removeClass("hide");
            //$("#attack-img").
            //fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
            for(i = 0; i < 4; i++) {
                $("#attack-img").fadeIn(100).fadeOut(100);
            }
        };
        
        var attackingMove = function() {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("cpu-attack-img");
            
            var crit = 1;
            var mod;
            var critPerc = cpuPokemon.speed / 512;
            var rand = Math.random();
            var damage;
            var damageFormula = function() {
                if(rand <= critPerc) {
                    crit = 2;
                }
                
                var x = (2 * cpuPokemon.lvl + 10) / 250;
                var y = cpuPokemon.attack / userPokemon.defense;
                var z = currentCPUMove.power;
                mod = crit * (Math.random() * (1 - 0.85) + 0.85);
                
                damage = Math.floor(mod * ((x * y * z) + 2));
            };
            
            if(!cpuPokemon.effect) {
                damageFormula();
                userPokemon.hp -= damage;
                
                if(crit == 2) {
                    $("#chat-text").text("Critical hit!");
                    console.log("Crit!");
                }
                
                console.log(mod + " " + crit + " Pika gave: " + damage + " Charm hp: " + userPokemon.hp);
            }
            
            else {
                //userPokemon.health -= (currentCPUMove.power) - (currentCPUMove.power * cpuPokemon.effect);
                userPokemon.hp -= (currentCPUMove.power) * (1 - cpuPokemon.effect);
                cpuPokemon.effect = null;
            }
            
            $("#user-health-bar").css("width", userPokemon.hp/userPokemon.base_hp * 100 + "%");
            $("#user-hp").text(userPokemon.hp + " / " + userPokemon.base_hp);
            currentState = playerTurn;
            
            if(crit == 2) {
                setTimeout(loop, 1500);
            }
            
            else {
                loop();
            }
        };
        
        var defensiveMove = function() {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("cpu-attack-img"); 
            
            userPokemon.effect = currentCPUMove.power;
            currentState = playerTurn;
            loop();
        };
        
        setUpCPUField();
    }
};
        
var playerTurn = {
    play: function() {
        var currentUserMove;
        
        var setUpUserField = function() {
            var moveButtons = ["#move1-text", "#move2-text", "#move3-text", "#move4-text"];
            
            $("#user-buttons").removeClass("hide");
            $("#chat-text").text("What will " + userPokemon.name + " do?");
            
            for(var i = moveButtons.length - 1; i >= 0; i--) {
                $(moveButtons[i]).text(userPokemon.moves[i].name);    
            }
        };
        
        var prepareToAttack = function() {
            $("#user-buttons").addClass("hide");
            $("#charmander-img").stop();
            
            $("#charmander-img").animate({
                top: "-=25",
            }, 200, function() {
                $("#charmander-img").animate({
                top: "+=25",
            }, 200)
            });
            
            getAccuracy();
        };
        
        var getAccuracy = function() {
            var setAccuracy = Math.random();
                
            if(setAccuracy <= currentUserMove.accuracy) {
                $("#chat-text").text(userPokemon.name + " used " + currentUserMove.name + "!");
                getMoveType();
            }
                
            else {
                $("#chat-text").text(userPokemon.name + "'s attack missed!");
                currentState = cpuTurn;
                setTimeout(loop, 1500);
            }
        };
        
        var getMoveType = function () {
            showMoveAnimation();
            
            if(currentUserMove.attDef == "Attack") {
                setTimeout(attackingMove, 1500);
            }
            
            else {
                setTimeout(defensiveMove, 1500);    
            }
        };
        
        var showMoveAnimation = function() {
            $("#attack-img").addClass("user-attack-img");
            $("#attack-img").removeClass("hide");
            //$("#attack-img").
            //fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100);
            for(i = 0; i < 4; i++) {
                $("#attack-img").fadeIn(100).fadeOut(100);
            }
        };
        
        var attackingMove = function() {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("user-attack-img");
            
            var crit = 1;
            var mod;
            var critPerc = userPokemon.speed / 512;
            var rand = Math.random();
            var damage;
            var damageFormula = function() {
                if(rand <= critPerc) {
                    crit = 2;
                }
                
                var x = (2 * userPokemon.lvl + 10) / 250;
                var y = userPokemon.attack / cpuPokemon.defense;
                var z = currentUserMove.power;
                mod = crit * (Math.random() * (1 - 0.85) + 0.85);

                damage = Math.floor(mod * ((x * y * z) + 2));
            };
            
            if(!userPokemon.effect) {
                damageFormula();
                cpuPokemon.hp -= damage;
                
                if(crit == 2) {
                    $("#chat-text").text("Critical hit!");
                    console.log("Crit!");
                }
                
                console.log(mod + " " + crit + " Charm gave: " + damage + " Pika hp: " + cpuPokemon.hp);
            }               
            
            else {
                //cpuPokemon.health -= (currentUserMove.power) - (currentUserMove.power * userPokemon.effect);
                cpuPokemon.hp -= (currentUserMove.power) * (1 - userPokemon.effect);
                userPokemon.effect = null;
            }
            
            $("#cpu-health-bar").css("width", cpuPokemon.hp/cpuPokemon.base_hp * 100 + "%");
            currentState = cpuTurn;
            
            if(crit == 2) {
                setTimeout(loop, 1500);
            }
            
            else {
                loop();
            }
        };
        
        var defensiveMove = function() {
            $("#attack-img").addClass("hide");
            $("#attack-img").removeClass("user-attack-img"); 
            
            cpuPokemon.effect = currentUserMove.power;
            currentState = cpuTurn;
            loop();
        };
        
        $("#move1-button, #move2-button, #move3-button, #move4-button").unbind().click(function() {
            var move = $(this).attr("value");
            currentUserMove = userPokemon.moves[move];
            prepareToAttack();
        });
        
        setUpUserField();
    }
};

var loop = function() {
    if(cpuPokemon.hp <= 0) {
        //$("#game-over").removeClass("hide");
        //$("#game-over").text("Game Over!\n You win!");
        $("#chat-text").text("Pikachu fainted!");
        //if enter is pressed
        //$("#chat-text").text("You win!");
        
        document.addEventListener('keydown', function(event) {
            if(event.keyCode == 13) {
                $("#chat-text").text("You win!");
            }
        });
    } 
    
    else if(userPokemon.hp <= 0) {
        //$("#game-over").removeClass("hide");
        //$("#game-over").text("Game Over!\nCPU wins!");
        $("#chat-text").text("Charmander fainted!");
    }
    
    else {
        currentState.play();
    }
}

var init = function() {
    cpuPokemon = pikachu;
    userPokemon = charmander;
    $("#cpu-name").text(cpuPokemon.name);
    $("#cpu-lvl").text("lvl " + cpuPokemon.lvl);
    
    var base_hp = userPokemon.hp;
    $("#user-name").text(userPokemon.name);
    $("#user-lvl").text("lvl " + userPokemon.lvl);
    $("#user-hp").text(userPokemon.hp + " / " + base_hp);
    
    currentState = playerTurn;
    loop();
};

init();
