import * as React from 'react';
import TrainingList from './TrainingList';

const Training = ({data, trainersId, date, duration, setTrainersId, setDate, setDuration, handleUpdateTraining, handleScheduleTraining, handleCancelTraining, scheduledData, user}) => {
  console.log(data)
  return (
    <div style={{}}>
      <TrainingList
        data={!data ? null : data.filter(item => item.showing == 1)}
        trainersId = {trainersId}
        date = {date}
        duration = {duration}
        setTrainersId = {setTrainersId}
        setDate = {setDate}
        setDuration = {setDuration}
        handleUpdateTraining = {handleUpdateTraining}
        handleScheduleTraining = {handleScheduleTraining}
        handleCancelTraining = {handleCancelTraining}
        shceduledData = {scheduledData}
        user = {user}
      />
    </div>
  );
}

export default Training;
