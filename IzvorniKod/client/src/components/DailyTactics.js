import * as React from 'react';
import DailyTacticsList from './DailyTacticsList'

const DailyTactics = ({data, title, setTitle, user}) => {
  return (
    <div style={{width:'550px'}}>
      <DailyTacticsList
        data={!data ? null : data.filter(item => item.showing == 1)}
        title = {title}
        setTitle = {setTitle}
        user = {user}
      />

    </div>
  );
}

export default DailyTactics;