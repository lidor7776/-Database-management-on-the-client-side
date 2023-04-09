import React from 'react';

const Task = ({task,taskTitle,taskCompleted,callback}) => {
   
    const taskFinish=()=>{
        const taskId=task.id;
        
        callback(taskId);
    };
    

  return (
    <div style={{ border: '2px solid purple', width: '80%',height:"auto",marginLeft:"10%"   }}>
      <strong>Title: </strong>{taskTitle}<br/>
      <strong>Is Completed: </strong>{taskCompleted.toString()}<br/>
      <button style={{display:taskCompleted?"none":"block"}} onClick={()=>{taskFinish()}}><strong>Mark as completed</strong></button>
    </div>
  );
};

export default Task;