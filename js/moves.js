// MOVES
var moveList = [{
    name: "Dig",  // 0
    type: ["Ground"],
    attDef: "Attack",
    status: null,
    statMod: null,
    stageMod: null,
    secStatMod: null,
    secStageMod: null,
    power: 100,
    accuracy: 1,
    priority: 0,
    pp: 10
},
{
    name: "Slash",  // 1
    type: ["Normal"],
    attDef: "Attack",
    status: null,
    statMod: null,
    stageMod: null,
    secStatMod: null,
    secStageMod: null,
    power: 70,          // high crit percentage move
    accuracy: 1,
    priority: 0,
    pp: 20
},
{
    name: "Flamethrower",  // 2
    type: ["Fire"],
    attDef: "Attack",
    status: null,
    statMod: null,
    stageMod: null,
    secStatMod: null,
    secStageMod: null,
    power: 95,
    accuracy: 1,
    priority: 0,
    pp: 15
},
{
    name: "Mega Punch",  // 3
    type: ["Normal"],
    attDef: "Attack",
    status: null,
    statusPerc: 0,
    statMod: null,
    stageMod: null,
    secStatMod: null,
    secStageMod: null,
    power: 80,
    accuracy: 0.85,
    priority: 0,
    pp: 20
},
{
    name: "Thunder Wave",  // 4
    type: ["Electric"],
    attDef: "Status",
    status: "PAR",
    statusPerc: 1,
    statMod: null,
    stageMod: null,
    secStatMod: null,
    secStageMod: null,
    power: 0,
    accuracy: 1,
    priority: 0,
    pp: 20
},
{
    name: "Quick Attack",  // 5
    type: ["Normal"],
    attDef: "Attack",
    status: null,
    statusPerc: 0,
    statMod: null,
    stageMod: null,
    secStatMod: null,
    secStageMod: null,
    power: 40,
    accuracy: 1,
    priority: 1,
    pp: 30
},
{
    name: "Thunderbolt",  // 6
    type: ["Electric"],
    attDef: "Attack",
    status: null,
    statusPerc: 0,
    statMod: null,
    stageMod: null,
    secStatMod: null,
    secStageMod: null,
    power: 95,
    accuracy: 1,
    priority: 0,
    pp: 15
},
{
    name: "Thunder",  // 7
    type: ["Electric"],
    attDef: "Attack",
    status: null,
    statusPerc: 0,
    statMod: null,
    stageMod: null,
    secStatMod: null,
    secStageMod: null,
    power: 120,
    accuracy: 0.7,
    priority: 0,
    pp: 10
},
{
    name: "Agility",  // 8
    type: ["Psychic"],
    attDef: "Status",
    status: null,
    statusPerc: 0,
    statMod: "Speed",
    stageMod: 2,
    secStatMod: null,
    secStageMod: null,
    power: 0,
    accuracy: 1,
    priority: 0,
    pp: 30
},
{
    name: "Bubblebeam",  // 9
    type: ["Water"],
    attDef: "Attack",
    status: null,
    statusPerc: 0,
    statMod: null,
    stageMod: null,
    secStatMod: "Speed",
    secStageMod: 0.332,
    power: 65,
    accuracy: 1,
    priority: 0,
    pp: 20
}];
