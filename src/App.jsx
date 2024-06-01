import { useState, useRef, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'

import { v4 as uuidv4 } from 'uuid';
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

function App() {

  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)

  const inputRef = useRef(null);
  const btnRef = useRef(null);

  useEffect( () => {
    let todoString =  localStorage.getItem("Todos")
    if(todoString) {
      let Todos = JSON.parse(todoString);
      setTodos(Todos);
    }
  }, [])
  

  const handleChange = (e) => {
      setTodo(e.target.value);
  }

  const handleAdd = (id) => {
    setTodos([...Todos, {id: uuidv4(), Todo, isCompleted: false}])
    setTodo("")

    if(btnRef.current.innerText === "Save") {
            btnRef.current.innerText = "Add";
    }

    saveToLS();

  }

  const handleEnter = (e) => {
    if(Todo.length > 3) {
      if (e.key === 'Enter') {
        handleAdd(e);
      }
  
      if(btnRef.current.innerText === "Save") {
        btnRef.current.innerText = "Add"
      }
  
      saveToLS();
    }
  }

  const handleCheckBox = (e) => {
    let id = e.target.id;
    let index = Todos.findIndex((todo) => {
      return todo.id === id;
    })

    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)

    saveToLS(newTodos);

  }
  

  const handleEdit = (id) => {
    let t = Todos.filter((todo) => {return todo.id === id})
    setTodo(t[0].Todo);

    inputRef.current.focus();

    btnRef.current.innerText = "Save";

    let newTodos = Todos.filter((todo)=> {
      return todo.id !== id
    });
    setTodos(newTodos)

    saveToLS();

  }

  const handleDelete = (id) => {

    let index = Todos.findIndex((todo) => {
      return todo.id === id;
    })

    let text = Todos[index].Todo;
    if(confirm(`Are you sure, you want to delete "${text}"`)) {
      let newTodos = Todos.filter((todo)=> {
        return todo.id !== id
      });
      setTodos(newTodos)
    }

    saveToLS();

  }

  const handleDeleteAll = () => {
    if(Todos.length != 0) {
      if(confirm("Are you sure, you want to delete All Todos")) {
        setTodos([]);
      }
    } else {
      alert("There is no Todo to Delete")
    }

    saveToLS();

  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)
  }

  const saveToLS = () => {
     localStorage.setItem("Todos", JSON.stringify(Todos))
  }


  return (
    <>
        <Navbar/>
        <div className="main flex justify-center items-center">
      <div className="mx-5 my-7 rounded-xl p-5 bg-violet-200 min-h-[85vh] w-[80vw] max-w-[80vw]">
        <div className="text-2xl font-bold items-center flex justify-center my-5">iTask - Manage your todos at one place</div>
          <div className='p-6'>
        <div className=" flex flex-col justify-center items-start addTodo mb-4 h-fit gap-4">
          <h2 className='text-xl font-bold'>Add a Todo</h2>
          <input ref={inputRef} onKeyDown={(e) => {handleEnter(e)}} type="text" value={Todo} onChange={handleChange} className='w-full h-8 rounded-md outline-none border-black border-2' />
          <button ref={btnRef} onClick={handleAdd} disabled = {Todo.length<=3} className='bg-violet-800 hover:bg-violet-950 px-4 py-1 text-white rounded-md font-bold disabled:bg-violet-600 w-full'>Add</button>
          <button onClick={handleDeleteAll} className='bg-violet-800 hover:bg-violet-950 px-4 py-1 text-white rounded-md mb-2 font-bold ml-[1020px] mt-4'>Delete All</button>
        </div>
        <input className='mb-4' type="checkbox" onChange={toggleFinished} checked = {showFinished} /> <span className='text-lg'>Show Finished</span>
        <h1 className='text-xl font-bold'>Your Todos</h1>
        <div className="todos">
          {Todos.length ===0 && <div className='m-5'>No Todos to Display.</div>}
          {Todos.map((item, index) => {
            return (showFinished || !item.isCompleted) && (
              <div key={index} className="todo flex w-[80%] h-fit m-3 border-b-4">
                <input type="checkbox" onChange={handleCheckBox} className='mr-4' checked = {item.isCompleted} name="" id={item.id}/>
              <div className= {item.isCompleted?"line-through min-w-[80%]":"min-w-[80%]"}>{item.Todo}</div>
              <div className="buttons">
                <button onClick={() => {handleEdit(item.id)}} className='bg-violet-800 hover:bg-violet-950 px-4 py-1 text-white rounded-md ml-7 mx-4 font-bold'><BiSolidEdit /></button>
                <button onClick={() => {handleDelete(item.id)}} className='bg-violet-800 hover:bg-violet-950 px-4 py-1 text-white rounded-md font-bold'><MdDelete /></button>
              </div>
          </div>
            )
          })}
        </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App
