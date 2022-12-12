const db = require('../db/index');

module.exports = class Training {

    constructor(trainingId, trainerId, trainingStart, trainingDuration) {
        this.trainingId = trainingId;
        this.trainerId = trainerId;
        this.trainingStart = trainingStart;
        this.trainingDuration = trainingDuration;
    } // Moram provjeriti sto sve ide ovdje, tj sto mi je bitno za trening jer nez jel ovo dobro

    static getAllTrainings = async() => {
        let trainings = await dbGetAllTrainings();

        let result = [];
        if(trainings?.length != 0){
            for(let i = 0; i < trainings.length; i++){
                let newTraining = new Training(trainings[i].id, trainings[i].trainer_id, trainings[i].trainingStartTimeDate, trainings[i].trainingDurationMin);
                result[i] = newTraining;
            }
            return result;
        }
        return undefined;
    }
}

const dbGetAllTrainings = async() => {
    const sql = "select * from training";

    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}

const dbAddNewTraining = async (training)=>{
    const sql = "insert into training values('"+training.id+"', '"+training.trainer_id+"', '"+training.trainingStartTimeDate+"', '"+training.trainingDurationMin+"') ";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}

