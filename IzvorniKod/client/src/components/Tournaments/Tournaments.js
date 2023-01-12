import * as React from 'react';
import TournamentsList from './TournamentsList';


const Tournaments = ({data, trainersId, date, duration, setTrainersId, setDate, setDuration, handleUpdateTournaments, handleScheduleTournaments,scheduledData, user}) => {
  console.log(data)
  return (
    <div style={{}}>
      <TournamentsList
        data={data}
        trainersId = {trainersId}
        date = {date}
        duration = {duration}
        setTrainersId = {setTrainersId}
        setDate = {setDate}
        setDuration = {setDuration}
        handleUpdateTournaments = {handleUpdateTournaments}
        handleScheduleTraining = {handleScheduleTournaments}
        scheduledData = {scheduledData}
        user = {user}
      />
    </div>
  );
}

export default Tournaments;