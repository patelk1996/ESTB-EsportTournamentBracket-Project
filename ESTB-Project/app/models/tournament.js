// Get the functions in the db.js file to use

const db = require('./../services/db');
const {Brackets}=require('./brackets')
const {Teams}=require('./teams')


class Tournament {
    // Tournament ID
    tournament_id;
    // Tournament name
    tournament_name;
    // Tournament Date
    tournament_date;

    teams = [];
    teamwin=[];
    semifinalteamwin=[];
    finalteamwin=[];
   

    constructor(tournament_id) {
        this.tournament_id = tournament_id;
    }
    
    async getTournamentDetails() {
        if (typeof this.tournament_name !== 'string') {
            var sql = "SELECT * from tournaments where tournament_id = ?"
            const results = await db.query(sql, [this.tournament_id]);
            
            this.tournament_name = results[0].tournament_name;
            this.tournament_date=results[0].tournament_date;
            
        }

    }
    
    async getTournamentTeams()  {
        if(typeof this.teams !== Teams) {
            var sql = "SELECT b.team_id, t1.team_name from brackets b JOIN teams t1\
             on b.team_id=t1.team_id where b.tournament_id=?";
            const results = await db.query(sql, [this.tournament_id]);
            console.log(results);
            for(var row of results) {
                this.teams.push(new Teams(row.team_id, row.team_name));
            }
        }
    }  

    async getTournamentTeamsWins()  {
        if(typeof this.teamwin !== Brackets) {
            var sql = "SELECT b.team_id, t1.team_name, b.result from brackets b JOIN teams t1\
             on b.team_id=t1.team_id where b.tournament_id=? and b.result='Win'";
            const results = await db.query(sql, [this.tournament_id]);
            console.log(results);
            for(var row of results) {
                this.teamwin.push(new Brackets(row.team_id, row.result,row.team_name));
            }
        }
    }  
    async getTournamentTeamsWinsSemiFinal()  {
        if(typeof this.semifinalteamwin !== Brackets) {
            var sql = "SELECT b.team_id, t1.team_name, b.semifinal_result from brackets b JOIN teams t1\
             on b.team_id=t1.team_id where b.tournament_id=? and b.semifinal_result='Win'";
            const results = await db.query(sql, [this.tournament_id]);
            console.log(results);
            for(var row of results) {
                this.semifinalteamwin.push(new Brackets(row.team_id, row.semifinal_result,row.team_name));
            }
        }
    }  
    async getTournamentTeamsWinsFinal()  {
        if(typeof this.finalteamwin !== Brackets) {
            var sql = "SELECT b.team_id, t1.team_name, b.final_result from brackets b JOIN teams t1\
             on b.team_id=t1.team_id where b.tournament_id=? and b.final_result='Win'";
            const results = await db.query(sql, [this.tournament_id]);
            console.log(results);
            for(var row of results) {
                this.finalteamwin.push(new Brackets(row.team_id, row.final_result,row.team_name));
            }
        }
    }  
  
   
}

module.exports = {
    Tournament
}

