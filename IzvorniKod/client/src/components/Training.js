import * as React from 'react';
import NewsList from './NewsList';
import TrainingList from './TrainingList';

const Training = ({data, trainerId, date, duration, setTrainerId, setDate, setDuration, user}) => {
  return (
    <div style={{width:'550px'}}>
      <TrainingList
        data={!data ? null : data.filter(item => item.showing === 1)}
        trainerId = {trainerId}
        date = {date}
        duration = {duration}
        setTrainerId = {setTrainerId}
        setDate = {setDate}
        setDuration = {setDuration}
        user = {user}
      />
    </div>
  );
}

export default Training;