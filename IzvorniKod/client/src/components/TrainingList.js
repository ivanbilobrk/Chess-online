import React from 'react'
import NewsElement from './NewsElement'
import TrainingElement from './TrainingElement'

const TrainingList = ({data, trainersId, date, duration, setTrainersId, setDate, setDuration, handleUpdateTraining, user}) => {
  return (
    <> 
    {!data?.length ? (
        <p style={{margin:'2rem', fontSize:'18px'}}>Nema novih treninga.</p>
      ) : (
        data.map((element) => (
                <TrainingElement 
                    element = {element}
                    trainersId = {trainersId}
                    date = {date}
                    duration = {duration}
                    setTrainersId = {setTrainersId}
                    setDate = {setDate}
                    setDuration = {setDuration}
                    handleUpdateTraining = {handleUpdateTraining}
                    user = {user}
                />
        )
        ))}
    </>
    )}

export default TrainingList