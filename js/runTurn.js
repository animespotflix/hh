// FIX
// moves need to be chosen before deciding who goes when
// paralyzed pokemon have 25% of not being able to attack and speed is reduced by 75%


var cpuTurn = 
{
    currentCpuMove: null,
    play: function() 
    {
        //cpuPokemon.moves[randomMove].pp--;

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

            foe.currentCpuMove.pp--;
            getAccuracy();
        };

        var getAccuracy = function() 
        {
            var setAccuracy = Math.random();

            if(setAccuracy < foe.currentCpuMove.accuracy) 
            {
                $("#chat-text").text(cpuPokemon.name + " used " + foe.currentCpuMove.name + "!");
                getMoveType();
            }

            else 
            {
                $("#chat-text").text(cpuPokemon.name + " used " + foe.currentCpuMove.name + ".\n" + cpuPokemon.name + "'s attack missed!");
                //currentState = user;
                setTimeout(loop, 1500);
            }
        };

        var getMoveType = function() 
        {
            showMoveAnimation();

            if(foe.currentCpuMove.attDef == "Attack") 
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

            // 25% of fully paralyzed
            if(cpuPokemon.effect != null && cpuPokemon.effect.localeCompare("PAR") == 0 && Math.random() < 0.25)
            {   
                $("#chat-text").text(cpuPokemon.name + " is fully paralyzed.");
                console.log("Fully paralyzed");
            }

            else
            {
                // High crit ratio: Crabhammer, Karate Chop, Razor Leaf, Slash
                if(foe.currentCpuMove.name.localeCompare("Slash") == 0 ||
                    foe.currentCpuMove.name.localeCompare("Razor Leaf") == 0 ||
                    foe.currentCpuMove.name.localeCompare("Crabhammer") == 0 ||
                    foe.currentCpuMove.name.localeCompare("Karate Chop") == 0)
                {
                    critPerc = cpuPokemon.speed / 64;
                }

                if(rand < critPerc) 
                {
                    crit = 2;
                }

                damage = damageFormula(crit, cpuPokemon, foe.currentCpuMove, userPokemon);
                userPokemon.hp -= damage;

                if(crit == 2) 
                {
                    $("#chat-text").text("Critical hit!");
                    console.log("Crit!");
                }

                console.log(crit + " Pika gave: " + damage + " Charm hp: " + userPokemon.hp + ", pp: " + foe.currentCpuMove.pp);
            } 

            if(userPokemon.hp < 0)
                userPokemon.hp = 0;

            $("#user-health-bar").css("width", userPokemon.hp/userPokemon.base_hp * 100 + "%");
            $("#user-hp").text(userPokemon.hp + " / " + userPokemon.base_hp);

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

            var status = "None";
            if(Math.random() < foe.currentCpuMove.statusPerc && foe.currentCpuMove.status != null)
            {
                status = foe.currentCpuMove.status;
            }
            if(status.localeCompare("PAR") == 0)
            {
                userPokemon.effect = "PAR";
                userPokemon.speed *= 0.75;
                $("#user-lvl").text("PAR");
                $("#chat-text").text(userPokemon.name + " is paralyzed. It may not attack.");
                setTimeout(function() {
                    loop();
                }, 1000);
            }
            else
            {
                loop();
            }
        };

        setUpCPUField();
    }
};

var playerTurn = 
{
    currentUserMove: null,
    play: function() 
    {
        var setUpUserField = function() 
        {
            //var moveButtons = ["#move1-text", "#move2-text", "#move3-text", "#move4-text"];

            //$("#user-buttons").removeClass("hide");
            $("#chat-text").text("What will " + userPokemon.name + " do?");

            /*for(var i = moveButtons.length - 1; i >= 0; i--) 
            {
                $(moveButtons[i]).html(userPokemon.moves[i].name + "<br> (pp: " + userPokemon.moves[i].pp + ")");
            }*/
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

            user.currentUserMove.pp--;
            getAccuracy();
        };

        var getAccuracy = function() 
        {
            var setAccuracy = Math.random();

            if(setAccuracy < user.currentUserMove.accuracy) 
            {
                $("#chat-text").text(userPokemon.name + " used " + user.currentUserMove.name + "!");
                getMoveType();
            }

            else 
            {
                $("#chat-text").text(userPokemon.name + " used " + user.currentUserMove.name + ".\n" + userPokemon.name + "'s attack missed!");
                setTimeout(loop, 1500);
            }
        };

        var getMoveType = function () 
        {
            showMoveAnimation();

            if(user.currentUserMove.attDef == "Attack") 
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

            // 25% of fully paralyzed
            if(userPokemon.effect != null && userPokemon.effect.localeCompare("PAR") == 0 && Math.random() < 0.25)
            {   
                $("#chat-text").text(userPokemon.name + " is fully paralyzed.");
                console.log("Fully paralyzed");
            }

            else 
            {
                // High crit ratio: Crabhammer, Karate Chop, Razor Leaf, Slash
                if(user.currentUserMove.name.localeCompare("Crabhammer") == 0 ||
                        user.currentUserMove.name.localeCompare("Karate Chop") == 0 ||
                        user.currentUserMove.name.localeCompare("Razor Leaf") == 0 ||
                        user.currentUserMove.name.localeCompare("Slash") == 0)
                {
                    critPerc = userPokemon.base_speed / 64;
                }


                if(rand < critPerc) 
                {
                    crit = 2;
                }
                
                damage = damageFormula(crit, userPokemon, user.currentUserMove, cpuPokemon);
                cpuPokemon.hp -= damage;

                if(crit == 2) 
                {
                    $("#chat-text").text("Critical hit!");
                    console.log("Crit!");
                }

                console.log(crit + " Charm gave: " + damage + " Pika hp: " + cpuPokemon.hp + ", pp: " + user.currentUserMove.pp);
            }
            
            if(cpuPokemon.hp < 0)
                cpuPokemon.hp = 0;

            $("#cpu-health-bar").css("width", cpuPokemon.hp/cpuPokemon.base_hp * 100 + "%");
            $("#cpu-hp").text(cpuPokemon.hp + " / " + cpuPokemon.base_hp);
            //currentState = foe;

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

            var status = "None";
            if(Math.random() < user.currentUserMove.statusPerc && user.currentUserMove.status != null)
            {
                status = user.currentUserMove.status;
            }
            if(status.localeCompare("PAR") == 0)
            {
                cpuPokemon.effect = "PAR";
                cpuPokemon.speed *= 0.75;
                $("#cpu-lvl").text("PAR");
                $("#chat-text").text(cpuPokemon.name + " is paralyzed. It may not attack.");
                setTimeout(loop, 2000);
            }
            else
            {
                loop();
            }
        };

        setUpUserField();
        prepareToAttack();
    }
};
