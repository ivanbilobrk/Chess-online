const express = require('express');
const router = express.Router();
const tournamentController = require('../controllers/tournamentsController');

router.get('/', tournamentController.getAllTournaments);
router.get('/scheduled', tournamentController.getAllScheduledTournaments);
router.post('/add', tournamentController.addNewTournament);
router.post('/update', tournamentController.updateExistingTournament);
router.post('/delete', tournamentController.deleteExistingTournament);
router.post('/signup', tournamentController.signupForTournament);
router.post('/cancel', tournamentController.cancelTournamentSubscription);

module.exports = router;
