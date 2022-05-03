const db = require('../services/db');
const {Teams}=require('./teams')

class Brackets {
    teamid;
    tresult;
    teamname;

    constructor(team_id, result, team_name) {
        this.teamid = team_id;
        this.tresult = result;
        this.teamname=team_name;
    }

    async getWinTeam() {
        if (typeof this.bracket_id !== 'string') {
            var sql = "SELECT b.team_id, b.result, t.team_name FROM brackets b JOIN teams t on t.team_id=b.team_id\
            WHERE b.result='Win'";
            const results = await db.query(sql, [this.team_id]);
            this.teamid = results[0].team_id;
            this.tresult=results[0].result;
            this.teamname=results[0].team_name;
        }

    }


}
module.exports = {
    Brackets
}