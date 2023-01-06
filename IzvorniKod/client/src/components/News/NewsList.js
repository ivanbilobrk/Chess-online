import React from 'react'
import NewsElement from './NewsElement'

const NewsList = ({data, loadAllNews, title, content, setTitle, setContent, user}) => {
  return (
    <> 
    {!data?.length ? (
        <p style={{margin:'2rem', fontSize:'18px'}}>Nema novih novosti.</p>
      ) : (
        data.map((element) => (
                <NewsElement 
                    element = {element}
                    loadAllNews={loadAllNews}
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
