import * as React from 'react';
import TrainingList from './TrainingList';

const Training = ({data, trainersId, date, duration, setTrainersId, setDate, setDuration, handleUpdateTraining, handleScheduleTraining, handleCancelTraining, user}) => {
  console.log(data)
  return (
    <div style={{width:'550px'}}>
      <TrainingList
        data={data}
        trainersId = {trainersId}
        date = {date}
        duration = {duration}
        setTrainersId = {setTrainersId}
        setDate = {setDate}
        setDuration = {setDuration}
        handleUpdateTraining = {handleUpdateTraining}
        handleScheduleTraining = {handleScheduleTraining}
        handleCancelTraining = {handleCancelTraining}
        user = {user}
      />
    </div>
  );
}

export default Training;