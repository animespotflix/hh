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
