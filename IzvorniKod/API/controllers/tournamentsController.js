const userInfo = require('../helpFunctions/userInfo');
const Tournament = require('../models/TournamentModel');
const { StatusCodes } = require('http-status-codes');


const getAllTournaments = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403) {
        return res.sendStatus(403);
    } else {
        try {
            let allTournaments = await Tournament.getAllTournaments();
            console.log(allTournaments);
            return res.status(StatusCodes.OK).json({tournamentsAll: allTournaments});
        } catch(err) {
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti turnire.'});
        }
    }
}


const getAllScheduledTournaments = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403) {
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user") {
        try {
            let allUserTourneys = await Tournament.getAllScheduledTournaments(result.podatci[0]);
            return res.status(StatusCodes.OK).json({allUserTournaments: allUserTourneys});
        } catch(err) {
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dohvatiti prijavljene turnire.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dohvatiti prijavljene turnire ovog usera.'});
    }
}


const addNewTournament = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403) {
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener") {

        try {
            let tournament = new Tournament(result.podatci[0], req.body.tournament.tournamentStart, req.body.tournament.tournamentDuration);
            await tournament.persist();
            return res.sendStatus(StatusCodes.OK);
        } catch(err) {
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu dodati turnir.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za dodati turnir.'});
    }
}


const updateExistingTournament = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403) {
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener") {

        try {
            let currentTrainerId = (await Tournament.getTournamentById(req.body.tournament.id)).trainerId;

            if(currentTrainerId != result.podatci[0] && result.podatci[5] != "admin"){
                return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za mijenjati turnir.'})
            }

            let tournament = new Tournament(currentTrainerId, req.body.tournament.tournamentStart, req.body.tournament.tournamentDuration);
            tournament.showing = req.body.tournament.showing;
            tournament.participantsNo = req.body.tournament.participantsNo;
            tournament.id = req.body.tournament.id;
            await tournament.updateTournament();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu mijenjati turnir.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za mijenjati turnir.'});
    }
}


const deleteExistingTournament = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403) {
        return res.sendStatus(403);
    } else if(result.podatci[5] == "admin" || result.podatci[5] == "trener") {

        try {
            let currentTrainerId = (await Tournament.getTournamentById(req.body.tournament.id)).trainerId;

            if(currentTrainerId != result.podatci[0] && result.podatci[5] != "admin"){
                return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za brisati turnir.'})
            }

            let tournament = new Tournament(currentTrainerId, req.body.tournament.tournamentStart, req.body.tournament.tournamentDuration);
            tournament.id = req.body.tournament.id;
            tournament.participantsNo = req.body.tournament.participantsNo;
            tournament.showing = req.body.tournament.showing;
            await tournament.deleteTournament();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu izbrisati turnir.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za brisati turnir.'});
    }
}


const signupForTournament = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user") {

        try {
            let currentTrainerId = (await Tournament.getTournamentById(req.body.tournament.id)).trainerId;

            let tournament = new Tournament(currentTrainerId, req.body.tournament.tournamentStart, req.body.tournament.tournamentDuration);
            tournament.showing = req.body.tournament.showing;
            tournament.participantsNo = req.body.tournament.participantsNo;
            tournament.id = req.body.tournament.id;
            console.log(tournament);
            await tournament.signupForTournament(result.podatci[0]);
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu se prijaviti na turnir.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za prijaviti se na turnir.'});
    }
}


const cancelTournamentSubscription = async(req, res) => {
    let result = await userInfo.getUserInfo(req, res);

    if(result == 401) {
        return res.sendStatus(401);
    } else if(result == 403){
        return res.sendStatus(403);
    } else if(result.podatci[5] == "user") {

        try {
            let currentTrainerId = (await Tournament.getTournamentById(req.body.tournament.id)).trainerId;

            let tournament = new Tournament(currentTrainerId, req.body.tournament.tournamentStart, req.body.tournament.tournamentDuration);
            tournament.showing = req.body.tournament.showing;
            tournament.participantsNo = req.body.tournament.participantsNo;
            tournament.id = req.body.tournament.id;
            await tournament.cancelTournament();
            return res.sendStatus(StatusCodes.OK);
        } catch(err){
            return res.status(StatusCodes.BAD_REQUEST).json({'error':'Ne mogu se odjaviti s turnira.'});
        }
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({'error':'Nemate ovlasti za odjaviti se s turnira.'});
    }
}


module.exports = {getAllTournaments, getAllScheduledTournaments, addNewTournament, updateExistingTournament,
                  deleteExistingTournament, signupForTournament, cancelTournamentSubscription};
