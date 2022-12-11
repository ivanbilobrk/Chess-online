import * as React from 'react';
import NewsList from './NewsList';

const News = ({data, handleClickUpdateNews, title, content, setTitle, setContent, user}) => {
  return (
    <div style={{width:'550px'}}>
      <NewsList
        data={!data ? null : data.filter(item => item.showing == 1)}
        handleClickUpdateNews = {handleClickUpdateNews}
        title = {title}
        content = {content}
        setTitle = {setTitle}
        setContent = {setContent}
        user = {user}
      />

    </div>
  );
}

export default News;