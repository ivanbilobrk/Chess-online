import React from 'react'
import AdminElement from './AdminElement'

const AdminList = ({data, handleClickZabrani, handleClickOnemoguci}) => {
  return (
    <> 
    {!data?.length ? (
        <p style={{margin:'2rem', fontSize:'18px'}}>Nema clanova.</p>
      ) : (
        data.map((element) => (
                <AdminElement 
                    element = {element}
                    handleClickZabrani={handleClickZabrani}
                    handleClickOnemoguci={handleClickOnemoguci}
        
                />
        )
        ))}
    </>
    )}

export default AdminList
