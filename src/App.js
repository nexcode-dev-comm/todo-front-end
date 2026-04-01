import React,{useState,useEffect} from 'react';
// App.js
import './App.css';
import'./index.css';


export default function MyApp() {
  const [id, setId] = useState([]);
  const [newtask, setTask] = useState('');
  const  [tasks, setTasks] = useState([]);
  const [clicked,setClicked] = useState([]);
  //GET Method api
 async function getItem() {
  try {
    const response = await fetch(`http://127.0.0.1:8000/todos/`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    setId(data.map(item => item.id));
    setTasks(data.map(item => item.task));
    setClicked(data.map(item => item.completed));
    console.log(id);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
useEffect(() => {
  getItem();
}, []);


// POST method
async function createItem(newtask,completed) {
  const response = await fetch(`http://127.0.0.1:8000/todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      task: newtask,
      completed: false
    })
  });
    const data = await response.json();
    console.log("Created item:", data);
}
  //DELETE Method
 const deleteItem = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete todo");
    return await response.json();
  } catch (err) {
    console.error("Failed to delete todo", err);
  }
};
  //PUT Method 
  const updateTodo = async (id,task,index) => {
  try {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ task: task, completed: clicked[index] })
,
});


    if (!response.ok) throw new Error("Failed to update todo");
    const data = await response.json();
    console.log("Updated todo:", data);
  } catch (err) {
    console.error(err);
  }
};
  //Add function
  const handleAdd = () => {
    if (newtask.trim()){
      setTasks([...tasks,newtask]);
      setClicked([...clicked,false]);
      setTask('');
      createItem(newtask,false);
    }};
    //Delete function
  const handleDelete = (index)=>{
    const updatedTasks = tasks.filter((_,i)=> i !== index);
    const updatedClicked = clicked.filter((_,i)=> i !== index);
    const  deleteId = id[index];
    const updateseiId = id.filter((_,i)=> i !== index);
    setId(updateseiId);
    deleteItem(deleteId);
    setClicked(updatedClicked);
    setTasks(updatedTasks);
      
   };
  const handleCheck = (index)=>{
    setClicked(clicked => {
      const updated = [...clicked];
      updated[index]=!updated[index];
      return updated;
    });
    const task = tasks[index];
    const todoId = id[index];  
  updateTodo(todoId,task,index);

  };

  //Shows on display
  return (
    <div id='div1'>
      
      <h1>To do list</h1> 
      <div id='Addtaska'>
        <input id='input' className='Addtask' type="text" value={newtask} onChange={(e) => setTask(e.target.value)}  placeholder='New task' / >&nbsp;
        <button id='Add' className='Addtask' onClick={handleAdd} >Add</button>  &nbsp;&nbsp;&nbsp;
      
      </div>
      
      
        {tasks.map((t,index)=>
        <div id='list' key={index}> <button onClick={() => handleCheck(index)} id="checkbutton" >  {clicked[index] ? '✅':'🔲'}</button>
        &nbsp;{t}  &nbsp;
        <button id='deletebutton' onClick={() => handleDelete(index)}>🗑️</button>
        </div>)}
     
    </div>
  );
}
 