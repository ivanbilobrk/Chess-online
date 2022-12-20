import React from 'react'
import NewsElement from './NewsElement'
import TrainingElement from './TrainingElement'

const TrainingList = ({data, trainerId, date, duration, setTrainerId, setDate, setDuration, user}) => {
  return (
    <> 
    {!data?.length ? (
        <p style={{margin:'2rem', fontSize:'18px'}}>Nema novih treninga.</p>
      ) : (
        data.map((element) => (
                <TrainingElement 
                    element = {element}
                    trainerId = {trainerId}
                    date = {date}
                    duration = {duration}
                    setTrainerId = {setTrainerId}
                    setDate = {setDate}
                    setDuration = {setDuration}
                    user = {user}
                />
        )
        ))}
    </>
    )}

export default TrainingList