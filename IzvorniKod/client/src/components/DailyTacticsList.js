import React from 'react'
import DailyTacticsElement from './DailyTacticsElement'

const DailyTacticsList = ({data, title, setTitle, user}) => {
  return (
    <> 
    {!data?.length ? (
        <p style={{margin:'2rem', fontSize:'18px'}}>Nema novih dnevnih taktika.</p>
      ) : (
        data.map((element) => (
                <DailyTacticsElement
                    element = {element}
                    title = {title}
                    setTitle = {setTitle}
                    user = {user}
                />
        )
        ))}
    </>
    )}

export default DailyTacticsList