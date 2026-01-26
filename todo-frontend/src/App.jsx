import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [TODOs, setTODOs] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [forceUpdate, setForceUpdate] = useState(false)
  useEffect( ()=>{
    console.log("!!!Use Effect API is Called!!!")
    fetch('http://localhost:3000/api/todos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error Thrown!!!!!');
        }
        return response.json();
      })
      .then(data => {
        setTODOs(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  },[])

  if(loading && TODOs.length===0) return (<h1>Loading.......</h1>)
  //Adding a new Todo
  const handleAddClick = async() => {
    try {
        const response = await fetch('http://localhost:3000/api/todos', {
          method: 'POST', // Specify the method
          headers: {
            'Content-Type': 'application/json', // Indicate the content type
          },
          body: JSON.stringify({todoDescription:inputValue, completed: false}), // Convert data to JSON string
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const promise = await (response.json());
        const data = await promise; 
        console.log('Data from Post Api Call:', data)
        const newTODOs = [...TODOs, data]
        setInputValue('')
        setTODOs(newTODOs)
        } catch (err) {
        setError(err.message);
        console.error('There was an error!', err);
      }
  };

  //Input Field Change of new TODO Name
  const handleInputChange = (event)=>{
    setInputValue(event.target.value)
  }
  //

  //Clicking the Checkbox
  const handleCheckBoxChange= async(event) =>{
    console.log("!!!Handle Check is Called!!!")
    const targetId = (event.target.id);
      
    const newTODOs =  await Promise.all(TODOs.map(async(todo)=>{
      if(todo._id === targetId){
        const changedTodo = {_id: targetId, todoDescription:todo.todoDescription, completed:!todo.completed}
        try {
        const response = await fetch('http://localhost:3000/api/todos', {
          method: 'PUT', // Specify the method
          headers: {
            'Content-Type': 'application/json', // Indicate the content type
          },
          body: JSON.stringify(changedTodo), // Convert data to JSON string
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        } catch (err) {
        setError(err.message);
        console.error('There was an error!', err);
      }
        console.log("here:",changedTodo)
        return changedTodo
      }
      return todo
    }));
    console.log('new todo', newTODOs)
    setTODOs(newTODOs)
    setForceUpdate(!forceUpdate)
  }
  const handleDeleteButton = async(event)=>{
    const _id = event.target.id.split('DelBtn').join('');
    console.log('id to del in hadnle del:',_id)
    try {
        const response = await fetch('http://localhost:3000/api/todos', {
          method: 'DELETE', // Specify the method
          headers: {
            'Content-Type': 'application/json', // Indicate the content type
          },
          body: JSON.stringify({_id:_id}), // Convert data to JSON string
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newTODOs = TODOs.filter((todo)=> {if(todo._id!==_id) {return todo}})
        console.log('newtodos after deletion are:', newTODOs)
        setTODOs(newTODOs)
        } catch (err) {
        setError(err.message);
        console.error('There was an error!', err);
      }
  }
  return (
    <>
      <div>
        {TODOs.map((todo)=>(
          <>
            <label id={`${todo._id}`} style={{minWidth:'1000px', marginRight:'10px'}}>
              <input id ={`${todo._id}`} type='checkbox' onChange={handleCheckBoxChange} name='newCheckbox' checked = {todo.completed? true: false}/>{todo.todoDescription}
            </label>
            <button id = {`${todo._id}DelBtn`} style={{background:'lightgrey'}} onClick={handleDeleteButton}>🗑️</button>
            <br/>
          </>
        ))}
        <input type='text' value={inputValue} onChange={handleInputChange}/>
        <button onClick={handleAddClick}>Add new Value</button>
        
      </div>

    </>
  )
}

export default App
