const db = require('../db/index');

module.exports = class Tournament {

    constructor(trainerId, tournamentStart, tournamentDuration) {
        this.id = undefined;
        this.trainerId = trainerId;
        this.tournamentStart = tournamentStart;
        this.tournamentDuration = tournamentDuration;
        this.participantsNo = 0;
        this.showing = 1;
    }

    static getAllTournaments = async() => {
        let results = await dbGetAllTournaments();

        if(results?.length != 0){
            let allTournaments = [];
            
            for(let i = 0; i < results.length; i++){
                let temp = new Tournament(results[i].trainer_id, results[i].tournamentstarttimedate, results[i].tournamentdurationmin);
                temp.id = results[i].id;
                temp.participantsNo = results[i].participantsno;
                temp.showing = results[i].showing;
                allTournaments[i] = temp;
            }
            return allTournaments;
        }
        return undefined;
    }

    static getAllScheduledTournaments = async(id) => {
        let tournaments = await dbGetAllScheduledTournaments(id);
        console.log(tournaments);
        let result = [];
        if(tournaments?.length != 0){
            for(let i = 0; i < tournaments.length; i++){
                result[i] = tournaments[i];
            }
            console.log(result);
            return result;
        }
        return undefined;
    }

    static async getTournamentById(tournamentId) {
        let results = await dbGetTournamentById(tournamentId);

        if(results?.length == 1){
            let tournament = new Tournament(results[0].trainer_id, results[0].tournamentstarttimedate, results[0].tournamentdurationmin);
            tournament.id = results[0].id;
            tournament.participantsNo = results[0].participantsno;
            tournament.showing = results[0].showing;
            return tournament;
        }
        return undefined;
    }

    async updateTournament() {
        await dbUpdateTournament(this);
    }

    async deleteTournament() {
        await dbDeleteTournament(this);
    }

    async signupForTournament(userId) {
        this.participantsNo++;
        await dbUpdateParticipantsNo(this);
        await dbSignupForTournament(this, userId);
    }

    async cancelTournament(userId) {
        this.participantsNo--;
        await dbUpdateParticipantsNo(this);
        await dbCancelTournament(this, userId);
    }

    async persist() {
        try {
            await dbAddNewTournament(this);
        } catch(err) {
            console.log("ERROR persisting tournament: " + JSON.stringify(this));
            throw err;
        }
    }
}



const dbGetAllTournaments = async() => {
    const sql = "select * from tournament";

    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbGetAllScheduledTournaments = async (id)=>{
    const sql = "select * from scheduledTournament  where member_id = '" + id + "'";

    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbGetTournamentById = async(id) =>{
    const sql = "select * from tournament where id = '"+ id+"'";

    try{
        const result = await db.query(sql, []);
        return result.rows;
    } catch(err){
        console.log(err);
        throw err;
    }
}


const dbAddNewTournament = async (tournament) => {
    const sql = "insert into tournament (trainer_id, tournamentstarttimedate, tournamentdurationmin, participantsno, showing) values('"+tournament.trainerId+
                    "', '"+tournament.tournamentStart+"', '"+tournament.tournamentDuration+"', '"+0+"', '"+tournament.showing+"') returning id";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbUpdateTournament = async (tournament) => {
    const sql = "update tournament set trainer_id = '" + tournament.trainerId + "', tournamentStartTimeDate = '" + tournament.tournamentStart +
                    "', tournamentDurationMin = '" + tournament.tournamentDuration + "' where id = '" + tournament.id + "'";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err;
    }
}


const dbDeleteTournament = async (tournament) => {
    const sql = "update tournament set showing = '" + 0 + "' where id = '" + tournament.id + "'";

    try{
        const result = await db.query(sql, []);
        return result.rows;
    } catch(err){
        console.log(err);
        throw err;
    }
}


const dbSignupForTournament = async (tournament, userId) => {
    const sql = "insert into scheduledtournament values ('"+userId+"', '"+tournament.id+"') ";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbUpdateParticipantsNo = async (tournament) => {
    const sql = "update tournament set participantsno = '" + parseInt(tournament.participantsNo) + "' where id = '" + tournament.id + "'";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbCancelTournament = async (tournament, userId) => {
    const sql = "delete from scheduledtournament where tournament_id = '" + tournament.id + "' AND member_id = '" + userId+"'";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}
