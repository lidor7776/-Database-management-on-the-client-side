import React from 'react';

const Post = (props) => {
  return (
    <div style={{ border: '2px solid purple', width: '80%',height:"auto",marginLeft:"10%"}}>
      <strong>Title: </strong>{props.postTitle}<br/>
      <strong>Body: </strong>{props.postBody}

    </div>
  );
};

export default Post;