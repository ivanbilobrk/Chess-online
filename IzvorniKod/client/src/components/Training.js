import * as React from 'react';
import TrainingList from './TrainingList';

const Training = ({data, trainersId, date, duration, setTrainersId, setDate, setDuration, handleUpdateTraining, handleScheduleTraining, handleCancelTraining, user}) => {
  return (
    <div style={{width:'550px'}}>
      <TrainingList
        data={!data ? null : data.filter(item => item.showing === 1)}
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