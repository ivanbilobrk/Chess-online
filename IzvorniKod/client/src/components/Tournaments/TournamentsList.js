import React from 'react'
import TournamentsElement from './TournamentsElement'

const TournamentsList = ({data, trainersId, date, duration, setTrainersId, setDate, setDuration, handleUpdateTournaments, handleDeleteTournaments, handleScheduleTournaments, handleCancelTournaments, scheduledData, user}) => {
  console.log(data)
  return (
    <> 
    {!data?.length ? (
        <p style={{margin:'2rem', fontSize:'18px'}}>Trenutno nema turnira za prikaz.</p>
      ) : (
        data.map((element) => (
                <TournamentsElement 
                    element = {element}
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
        )
        ))}
    </>
    )}

export default TournamentsList
