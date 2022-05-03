const db = require('./../services/db');

class Teams{
    teamid;
    teamname;

    constructor(team_id, team_name){
        this.teamid=team_id;
        this.teamname=team_name;
    }

    async getTeamName(){
        if (typeof this.team_id !=='string'){
            var sql="SELECT team_id, team_name FROM teams WHERE tournament_id=?";
            const results=await db.query(sql,[this.tournament_id]);
            
            this.tournamentid=results[0].tournament_id;
            this.teamname=results[0].team_name;
        }

    }

}

module.exports = {
    Teams
}