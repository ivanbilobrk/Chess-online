import React from 'react'
import DailyTacticsElement from './DailyTacticsElement'

const DailyTacticsList = ({loadAllTactics, data, title, content, user}) => {
  return (
    <> 
    {!data?.length ? (
        <p style={{margin:'2rem', fontSize:'18px'}}>Nema novih dnevnih taktika.</p>
      ) : (
        data.map((element) => (
                <DailyTacticsElement
                    loadAllTactics= {loadAllTactics}
                    element = {element}
                    title = {title}
                    content= {content}
                    user = {user}
                />
        )
        ))}
    </>
    )}

export default DailyTacticsList