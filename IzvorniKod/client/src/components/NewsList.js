import React from 'react'
import NewsElement from './NewsElement'

const NewsList = ({data, handleClickUpdateNews, title, content, setTitle, setContent, user}) => {
  return (
    <> 
    {!data?.length ? (
        <p style={{margin:'2rem', fontSize:'18px'}}>Nema novih novosti.</p>
      ) : (
        data.map((element) => (
                <NewsElement 
                    element = {element}
                    handleClickUpdateNews = {handleClickUpdateNews}
                    title = {title}
                    content = {content}
                    setTitle = {setTitle}
                    setContent = {setContent}
                    user = {user}
                />
        )
        ))}
    </>
    )}

export default NewsList
