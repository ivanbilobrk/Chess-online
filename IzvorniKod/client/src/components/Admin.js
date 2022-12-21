import * as React from 'react';
import AdminList from './AdminList';

const Admin = ({data, handleClickZabrani, handleClickOnemoguci}) => {
  return (
    <div style={{width:'550px'}}>
      <AdminList
        data={!data ? null : data.filter(item => item.showing === 1)}
      handleClickZabrani={handleClickZabrani}
handleClickOnemoguci={handleClickOnemoguci}
      
      />

    </div>
  );
}

export default Admin;