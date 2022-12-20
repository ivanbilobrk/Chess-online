import * as React from 'react';
import DailyTacticsList from './DailyTacticsList'

const DailyTactics = ({loadAllTactics, data, title, content, user}) => {
  return (
    <div style={{width:'550px'}}>
      <DailyTacticsList
        data={!data ? null : data.filter(item => item.showing == 1)}
        loadAllTactics= {loadAllTactics}
        title = {title}
        content={content}
        user = {user}
      />

    </div>
  );
}

export default DailyTactics;