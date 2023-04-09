import { useState,useEffect } from 'react';
import { getAll } from './utils';
import User from './User';

const usersUrl = 'https://jsonplaceholder.typicode.com/users';


//Filter by name OR email-specific by capital letter or small
const getfilteredItems=(name,users)=>{
    if(!name){
        return users;
    }
    return (users.filter(user=>user.name.includes(name)||user.email.includes(name)))
}



const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [newUser, setNewUser] = useState({id:'',name:'',email:'',address:{street:'',city:'',zipcode:''}});
  const [showHideNewUser,setShowNewUser]=useState(false)
  const filteredItems=getfilteredItems(name,users);

  useEffect(()=>{
    const fetchData=async()=>{
      const {data}=await getAll(usersUrl);
      setUsers(data)
      
    };
    fetchData();
  },[])

useEffect(()=>{
    const updated=()=>{
        setUsers(users)
    };
    updated();
  },[users])

  

 const ShowHideNewUserfunc=()=>{
    setShowNewUser(!showHideNewUser)
  } 

 const DeleteUser=(ID)=>
 {
    const tempArr=[...users]
    const index=tempArr.findIndex(user=>user.id===ID);
    tempArr.splice(index,1)
    setUsers(tempArr)
    console.log(tempArr);
 }
 const getid=()=>{
    const id=users.length+1
    setNewUser({ ...newUser, id:id })  
  }
  
 const addnew=()=>{
    console.log(users.slice(-1));
    setUsers([...users,newUser])
 } 


    return (
        <div>
             <h1>users</h1>
            <h4 style={{width:'50%'}}>search:<input type='text' onChange={e => setName(e.target.value)}/></h4>
            <button style={{marginLeft:"45%"}} onClick={()=>{ShowHideNewUserfunc()}} >Add New User</button>
            

            <div style={{marginLeft:"55%",border:"2px solid black",width:"30%",height:"100px",display:showHideNewUser?"block":"none"}}>
                <strong>New User</strong><br/>
            name:<input type='text'  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} /><br/>
            email:<input type='email'  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} /><br/>
            <button onClick={()=>{addnew();ShowHideNewUserfunc()}}onMouseOver={()=>{getid()}}>Add New User</button>
            <button style={{marginLeft:"45%"}} onClick={()=>{ShowHideNewUserfunc()}} >Cancel</button>
            </div>
            <br/><br/>
             {filteredItems.map((user) => {return <User key={user.id} id={user.id} user={user} callback={DeleteUser} />;})}
    
        </div>
    );
};

export default Users;