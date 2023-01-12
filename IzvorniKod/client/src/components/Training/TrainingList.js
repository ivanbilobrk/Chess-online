import React from 'react'
import TrainingElement from './TrainingElement'

const TrainingList = ({data, trainersId, date, duration, setTrainersId, setDate, setDuration, handleUpdateTraining, handleScheduleTraining, handleCancelTraining, scheduledData, user}) => {
  console.log(data)
  console.log(scheduledData)
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
                    handleScheduleTraining = {handleScheduleTraining}
                    handleCancelTraining = {handleCancelTraining}
                    scheduledData = {scheduledData}
                    user = {user}
                />
        )
        ))}
    </>
    )}

export default TrainingList
