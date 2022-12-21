const db = require('../db/index');

module.exports = class Training {

    constructor(trainerId, trainingStart, trainingDuration) {
        this.id = undefined;
        this.trainerId = trainerId;
        this.trainingStart = trainingStart;
        this.trainingDuration = trainingDuration;
        this.showing = 1;
    }

    static getAllTrainings = async() => {
        let results = await dbGetAllTrainings();

        if(results?.length != 0){
            let allTrainings = [];
            
            for(let i = 0; i < results.length; i++){
                //let date = new Date();
                let temp = new Training(results[i].trainer_id, results[i].trainingstarttimedate, results[i].trainingdurationmin);
                temp.id = results[i].id;
                temp.showing = results[i].showing;
                allTrainings[i] = temp;
            }
            return allTrainings;
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

    static async getTrainingById(newsId) {
        let results = await dbGetTrainingById(newsId);

        if(results?.length == 1){
            let training = new Training(results[0].trainer_id, results[0].trainingstarttimedate, results[0].trainingdurationmin);
            training.id = results[0].id;
            training.showing = results[0].showing;
            return training;
        }
        return undefined;
    }

    async updateTraining() {
        await dbUpdateTraining(this);
    }

    async deleteTraining() {
        await dbDeleteTraining(this);
    }

    async signupForTraining(user) {
        await dbSignupForTraining(this, user);
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


dbGetTrainingById = async(id) =>{
    const sql = "select * from training where id = '"+ id+"'";

    try{
        const result = await db.query(sql, []);
        return result.rows;
    } catch(err){
        console.log(err);
        throw err;
    }
}


const dbAddNewTraining = async (training) => {
    const sql = "insert into training (trainer_id, trainingstarttimedate, trainingdurationmin, showing) values('"+training.trainerId+"', '"+training.trainingStart+"', '"+training.trainingDuration+"', '"+training.showing+"') returning id";

    try {
        await db.query(sql, []);
    } catch (err) {
        console.log(err);
        throw err
    }
}


const dbUpdateTraining = async (training) => {
    const sql = "update training set trainer_id = '" + training.trainerId + "', trainingStartTimeDate = '" + training.trainingStart +
                    "', trainingDurationMin = '" + training.trainingDuration + "' where id = '" + training.id + "'";

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