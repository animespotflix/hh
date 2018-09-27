// POKEMON
var charmander = {
    name: "Charmander",
    //health: 100,
    lvl: 50,
    type: ["Fire"],
    hp: 145,
    base_hp: 145,
    base_attack: 103,
    attack: 103,
    attack_mod: 0,
    base_defense: 94,
    defense: 94,
    defense_mod: 0,
    base_speed: 116,
    speed: 116,
    speed_mod: 0,
    base_special: 101,
    special: 101,
    special_mod: 0,
    effect: null,
    moves: [moveList[0], moveList[1], moveList[2], moveList[10]]
};

var pikachu = {
    name: "Pikachu",
    //health: 100,
    lvl: 50,
    type: ["Electric"],
    hp: 141,
    base_hp: 141,
    base_attack: 106,
    attack: 106,
    attack_mod: 0,
    base_defense: 81,
    defense: 81,
    defense_mod: 0,
    base_speed: 141,
    speed: 141,
    speed_mod: 0,
    base_special: 101,
    special: 101,
    special_mod: 0,
    effect: null,
    moves: [moveList[4], moveList[5], moveList[6], moveList[7]]
};

// stat multipliers (stages), accuracy, evasion
// 25/100	28/100	33/100	40/100	50/100	66/100	100/100	150/100	200/100	250/100	300/100	350/100	400/100
var stageMultiplier = function(poke, stat, stage)
{
    var mod = 0;  // percentage of BASE stat

    if(stage == 1)
        mod = 1.5;
    else if(stage == 2)
        mod = 2;
    else if(stage == 3)
        mod = 2.5;
    else if(stage == 4)
        mod = 3;
    else if(stage == 5)
        mod = 3.5;
    else if(stage == 6)
        mod = 4;
    else if(stage == -1)
        mod = 0.667;
    else if(stage == -2)
        mod = 0.5;
    else if(stage == -3)
        mod = 0.4;
    else if(stage == -4)
        mod = 0.333;
    else if(stage == -5)
        mod = 0.28;
    else if(stage == -6)
        mod = 0.25;

    if(stat.localeCompare("Attack") == 0)
        poke.attack = poke.base_attack * mod;

    else if(stat.localeCompare("Defense") == 0)
        poke.defense = poke.base_defense * mod;

    else if(stat.localeCompare("Special") == 0)
        poke.special = poke.base_special * mod;

    else if(stat.localeCompare("Speed") == 0)
        poke.speed = poke.base_speed * mod;

    //else if(stat.localeCompare("Accuracy") == 0)
    //    poke.accuracy = poke.base_accuracy * mod;
}
