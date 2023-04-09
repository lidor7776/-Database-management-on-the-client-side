import { useState,useEffect} from 'react';
import { getUserTasks,getUserPosts } from './utils';
import Task from './Task';
import Post from './Post';



const User = ({ user,callback }) => {
  const [tasks, setTasks] = useState([]);
  const [taskDup, setTaskDup] = useState();
  const [posts, setPosts] = useState([]);
  const [TasksCompleted,setTaskCompleted]= useState(false);
  const [showHideAll,setShowHideAll]=useState(false)
  const [showHide_Other,setShowHideOther]=useState(false)
  const [colorUser,setColorUser]=useState(false)
  const [addressDup,setAddressDup]=useState({street:user.address.street,city:user.address.city,zipcode:user.address.zipcode});
  const [userDup,setUserDup]=useState(user);
  const [task, setTask] = useState({title:"",completed:false});
  const [post, setPost] = useState({title:"",body:""});
  const [showHideTasks,setShowHideTasks]=useState(false)
  const [showHidePosts,setShowHidePosts]=useState(false)
  const [showHideNewTask,setShowHideNewTask]=useState(false)
  const [showHideNewPost,setShowHideNewPost]=useState(false)
  ///useEffect for first time
  useEffect(() => {
    const showTasks = async () => {
        const topTodos = await getUserTasks(user.id);
        setTasks(topTodos);
      };
      const showPosts = async () => {
        const topPosts = await getUserPosts(user.id);
        setPosts(topPosts);
      };
      showPosts();
      showTasks();
      
  },[]);

  
 const update=()=>{
    setUserDup((old)=>{
        return {
            ...old,address:addressDup
        }
    })
    user.name=userDup.name;
    user.email=userDup.email;
    user.address.street=addressDup.street;
    user.address.city=addressDup.city;
    user.address.zipcode=addressDup.zipcode;
    console.log(user);
 }
  
 //if(task.id===Id){return task.completed=true}
  //////////////////////////////////////////////////////////////////////////////////

//put this in use effect every time tasks changed>>>>>>>>>///////////////////////
  const CheckTask=()=>{
   const finder=tasks.map((task)=>{return task.completed})
    const checker=finder.find((x)=>x===false)
    if (checker===undefined){setTaskCompleted(true)} 
}
    
    
    const taskcomplete=(Id)=>{
        let task = tasks.find(x => x.id === Id);
        setTaskDup(task)
        task.completed=true
        CheckTask();
        
    
       }
  
  const deleteUser=()=>{
    const ID=user.id;
   callback(ID)
  };

  const showHideAllProp=()=>{
    setShowHideAll(!showHideAll)
    showHideAllPostsfunc();
    showHideAllTasksfunc();
  }
  const scolorUser=()=>{
    setColorUser(!colorUser)
  }
  const showOther=()=>{
    setShowHideOther(true)
  }
  const HideOther=()=>{
    setShowHideOther(false)
  }
  const showHideAllTasksfunc=()=>{
    setShowHideTasks(!showHideTasks)
  }
  const showHideAllPostsfunc=()=>{
    setShowHidePosts(!showHidePosts)
  }
  const showHideNewTaskfunc=()=>{
    setShowHideNewTask(!showHideNewTask)
  }
  const showHideNewPostfunc=()=>{
    setShowHideNewPost(!showHideNewPost)
  }
  const prinnttt=()=>{
    
    console.log(user);;
  }
  const addTask=()=>{
   // setTask({...task,completed:false})
    setTasks([...tasks,task])
  }
  const addPost=()=>{
    // setTask({...task,completed:false})
     setPosts([...posts,post])
   }
   
  return (
        
    <div style={{ border: TasksCompleted?"2px solid green":"2px solid red", width: '50%',height:"auto" }} >
      <div style={{backgroundColor:colorUser?"#FFBFA9":"white",width:"40%"}}>
      <h5 onClick={()=>{showHideAllProp();scolorUser()}}>ID:{user.id}</h5>
        name:<input type='text' value={userDup.name} onChange={(e) => setUserDup({ ...userDup, name: e.target.value })} /><br/>
        email:<input type='email' value={userDup.email} onChange={(e) => setUserDup({ ...userDup, email: e.target.value })} /><br/>
      <br/><br/>
      <button style={{ marginRight: "100px" }}  onClick={()=>{HideOther()}} onMouseOver={()=>{showOther()}}>Other Data</button>
        <div style={{display:showHide_Other?"block":"none",width:"40%",backgroundColor:"#D8D8D8",border:"2px solid grey"}}>
       Street:<input type='text' value={addressDup.street} style={{width:"93%"}} onChange={(e) => setAddressDup({ ...addressDup.address,street: e.target.value })}/><br/>
        City:<input type='text' value={addressDup.city} style={{width:"93%"}} onChange={(e) => setAddressDup({ ...addressDup,city: e.target.value })}/><br/>
  Zip Code:<input type='text' value={addressDup.zipcode} style={{width:"93%"}} onChange={(e) => setAddressDup({ ...addressDup, zipcode: e.target.value })}/><br/>
           
        </div>
      <button onClick={deleteUser}> Delete</button>
      <button onClick={()=>{update()}} >Update</button><br/><br/>
      </div>

      <div style={{border:"2px solid blue",marginLeft:"50%",width:"45%",height:"100px",display:showHideNewTask?"block":"none"}}>
      Title:<input type='text' onChange={(e) => setTask({ ...task,title: e.target.value })} /><br/>
      <button onClick={()=>{addTask();showHideNewTaskfunc();showHideAllTasksfunc()}}>Add</button>
      <button onClick={()=>{showHideNewTaskfunc();showHideAllTasksfunc()}}>Cancel</button>

        </div>
        


      <div style={{display:showHideAll?"block":"none"}}>
        <div style={{marginLeft:"50%",width:"44%",border:"2px solid black",display:showHideTasks?"block":"none"}}>
            <h5>To Do List-User: {user.id}</h5>
            <button style={{marginLeft:"82%",backgroundColor:"#FFD966"}}onClick={()=>{showHideAllTasksfunc();showHideNewTaskfunc()}}>Add</button>
      {tasks.map((task) => {
          return <Task  taskTitle={task.title} taskCompleted={task.completed} task={task} callback={taskcomplete}/>;
        })}</div>
        

        <br/>
        <div style={{border:"2px solid blue",marginLeft:"50%",width:"45%",height:"100px",display:showHideNewPost?"block":"none"}}>
      Title:<input type='text' onChange={(e) => setPost({ ...post,title: e.target.value })} /><br/>
      Body:<input type='text' onChange={(e) => setPost({ ...post,body: e.target.value })} /><br/>
      <button onClick={()=>{addPost();showHideNewPostfunc();showHideAllPostsfunc()}}>Add</button>
      <button onClick={()=>{showHideNewPostfunc();showHideAllPostsfunc()}}>Cancel</button>

        </div>
        <br/>

        <div style={{marginLeft:"50%",width:"44%",border:"2px solid black",display:showHidePosts?"block":"none"}}>
        <h5>Posts List-User: {user.id}</h5>
        <button style={{marginLeft:"82%",backgroundColor:"#FFD966"}}onClick={()=>{showHideAllPostsfunc();showHideNewPostfunc()}}>Add</button>
      {posts.map((post) => {
          return <Post  postTitle={post.title} postBody={post.body}/>;
        })}</div>
        </div>
      
    </div>
  );
};

export default User;