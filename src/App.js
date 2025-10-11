import React,{useState} from 'react';
// App.js
import './App.css';
import'./index.css';


export default function MyApp() {
  const [task, setTask] = useState('');
  const  [tasks, setTasks] = useState([]);
  const [clicked,setClicked] = useState([]);
  //Add function
  const handleAdd = () => {
    if (task.trim()){
      setTasks([...tasks,task]);
      setClicked([...clicked,false]);
      setTask('');
    }};
    //Delete function
  const handleDelete = (index)=>{
    const updatedTasks = tasks.filter((_,i)=> i !== index);
    const updatedClicked = clicked.filter((_,i)=> i !== index);
    setClicked(updatedClicked);
    setTasks(updatedTasks);
      
   };
  const handleCheck = (index)=>{
    setClicked(clicked => {
      const updated = [...clicked];
      updated[index]=!updated[index];
      return updated;
    });
  };
  //Shows on display
  return (
    <div id='div1'>
      <h1>To do list</h1> <br />
      <input id='input' className='Addtask' type="text" value={task} onChange={(e) => setTask(e.target.value)}  placeholder='New task' / >&nbsp;
      <button id='Add' className='Addtask' onClick={handleAdd} >Add</button>  &nbsp;&nbsp;&nbsp;
      
      
        {tasks.map((t,index)=>
        <div id='list' key={index}> <button onClick={() => handleCheck(index)} id="checkbutton" >  {clicked[index] ? '✅':'🔲'}</button>
        &nbsp;{t}  &nbsp;
        <button onClick={() => handleDelete(index)}>🗑️</button>
        </div>)}
     
    </div>
  );
}
 