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

    static getAllScheduledTrainings = async(id) => {
        let trainings = await dbGetAllScheduledTrainings(id);
        console.log(trainings);
        let result = [];
        if(trainings?.length != 0){
            for(let i = 0; i < trainings.length; i++){
                let newTraining = new Training(trainings[i].id, trainings[i].trainer_id, trainings[i].trainingStartTimeDate, trainings[i].trainingDurationMin);
                result[i] = newTraining;
            }
            console.log(result);
            return result;
        }
        return undefined;
    }

    static getAllTrainingsForTrainer = async(id) => {
        let trainings = await dbGetAllTrainingsForTrainer(id);
        console.log(trainings);
        let result = [];
        if(trainings?.length != 0){
            for(let i = 0; i < trainings.length; i++){
                let newTraining = new Training(trainings[i].id, trainings[i].trainer_id, trainings[i].trainingStartTimeDate, trainings[i].trainingDurationMin);
                result[i] = newTraining;
            }
            console.log(result);
            return result;
        }
        return undefined;
    }

    async updateTraining() {
        await dbUpdateTraining(this);
    }

    async deleteTraining() {
        await dbDeleteTraining(this);
    }

    async signupForTraining() {
        await dbSignupForTraining(this);
    }

    async cancelTraining() {
        await dbCancelTraining(this);
    }

    async persist() {
        try {
            await dbAddNewTraining(this);
        } catch(err) {
            console.log("ERROR persisting training: " + JSON.stringify(this));
            throw err;
        }
    }
}

//////////////////////////////////////////////////////////////////////////////////////////
// DOBRO
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

// MOZDA JE CAK DOBRO
const dbGetAllScheduledTrainings = async (id)=>{
    const sql = "select * from scheduledTraining join users on member_id = id where member_id =" + id;

    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}

// MSM DA JE CAK DOBRO
const dbGetAllTrainingsForTrainer = async (id)=>{
    const sql = "select * from training join users on trainer_id = id where trainer_id =" + id;

    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
}

// DOBRO
const dbAddNewTraining = async (training) => {
    const sql = "insert into training values('"+training.trainingId+"', '"+training.trainerId+"', '"+training.trainingStart+"', '"+training.trainingDuration+"') ";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbUpdateTraining = async (training) => {
    const sql = "update training set trainer_id = '" + training.trainerId + "', trainingStartTimeDate = '" + training.trainingStart +
                    "', trainingDurationMin = '" + training.trainingDuration + "'where id = '" + training.trainingId + "'";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err;
    } 
}


const dbDeleteTraining = async (training) => {
    const sql = "update training set showing = '" + training.showing + "'where id = '" + training.trainingId + "'";

    try{
        const result = await db.query(sql, []);
        return result.rows;
    } catch(err){
        console.log(err);
        throw err;
    }
}


const dbSignupForTraining = async (training, user) => {
    const sql = "insert into scheduledTraining values ('"+user.id+"', '"+training.trainingId+"')";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbCancelTraining = async (training) => {
    const sql = "delete from scheduledTraining where training_id = '" + training.trainingId + "'";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}