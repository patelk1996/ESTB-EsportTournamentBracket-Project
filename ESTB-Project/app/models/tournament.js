// Get the functions in the db.js file to use
const db = require('./../services/db');
//const {User}=require('./users')
//const {Teams}=require('./teams')


class Tournament {
    // Tournament ID
    tournament_id;
    // Tournament name
    tournament_name;
    // Tournament Date
    tournament_date;
   

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
    
  /*  async getTournamentTeams()  {
        if(typeof this.programme !== Programme) {
            var sql = "SELECT * from Programmes p \
            JOIN Student_Programme sp ON p.id = sp.programme \
            WHERE sp.id = ?"
            const results = await db.query(sql, [this.id]);
            this.programme = new Programme(results[0].programme);
            this.programme.pName = results[0].name;
        }
    }*/
    
   
}

module.exports = {
    Tournament
}

