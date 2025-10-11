import React,{useState} from 'react';
// App.js
import './App.css';


export default function MyApp() {
  const [task, setTask] = useState('');
  const  [tasks, setTasks] = useState([]);
  const [clicked,setClicked] = useState([]);
  
  const handleAdd = () => {
    if (task.trim()){
      setTasks([...tasks,task]);
      setClicked([...clicked,false]);
      setTask('');
    }};
  const handleDelete = ()=> {
   const chooesen = Array(tasks.length).fill(false);
   return (
    <div>
      clicked = chooesen ;
      {tasks.map((t,index)=>
        <li key={index}> <button onClick={() => handleCheck(index)} id="checkbutton" >  {clicked[index] ? '✅':'🔲'}</button>
        &nbsp;{t} 
        </li>)}
    </div>
   )
  }
  const handleCheck = (index)=>{
    setClicked(clicked => {
      const updated = [...clicked];
      updated[index]=!updated[index];
      return updated;
    });
  };
  return (
    <div>
      <h1>To do list</h1>
      <input type="text" value={task} onChange={(e) => setTask(e.target.value)}  placeholder='New task' / >&nbsp;
      <button onClick={handleAdd} >Add</button>  &nbsp;&nbsp;&nbsp;  <button onClick={handleDelete}>Delete</button>
      
        {tasks.map((t,index)=>
        <li key={index}> <button onClick={() => handleCheck(index)} id="checkbutton" >  {clicked[index] ? '✅':'🔲'}</button>
        &nbsp;{t} 
        </li>)}
     
    </div>
  );
}
 