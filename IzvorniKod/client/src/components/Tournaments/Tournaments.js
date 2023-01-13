import * as React from 'react';
import TournamentsList from './TournamentsList';


const Tournaments = ({data, trainersId, date, duration, setTrainersId, setDate, setDuration, handleUpdateTournaments, handleDeleteTournaments, handleScheduleTournaments, handleCancelTournaments, scheduledData, user}) => {
  console.log(data)
  return (
    <div style={{}}>
      <TournamentsList
        data={!data ? null : data.filter(item => item.showing == 1)}
        trainersId = {trainersId}
        date = {date}
        duration = {duration}
        setTrainersId = {setTrainersId}
        setDate = {setDate}
        setDuration = {setDuration}
        handleUpdateTournaments = {handleUpdateTournaments}
        handleDeleteTournaments = {handleDeleteTournaments}
        handleScheduleTournaments = {handleScheduleTournaments}
        handleCancelTournaments = {handleCancelTournaments}
        scheduledData = {scheduledData}
        user = {user}
      />
    </div>
  );
}

export default Tournaments;