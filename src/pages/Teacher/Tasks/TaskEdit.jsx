import TasksOfList from "@components/TasksOfList";
import { ArrowUpTrayIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useAuthStore } from "@store/authStore";
import { useRoomStore } from "@store/roomStore";
import { useTaskStore } from "@store/useTaskStore";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TaskEdit = () => {
  const { task, setTask } = useTaskStore()
  const { room_id } = useRoomStore()
  const { token } = useAuthStore()
  const [files, setFiles] = useState([])
  const [text, setText] = useState('')
  const [examTypes, setExamTypes] = useState([])
  const [taskType, setTaskType] = useState('multiple_choise')
  const [tasks, setTasks] = useState([])
  const [tasksLoader, setTasksLoader] = useState(null)

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#1e293b',
    color: '#fff',
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  const getExamTypes = async () => {
    const result = await fetch('/examTypes.json')
    const json = await result.json()

    setExamTypes(json)
  }

  const openFileDialog = () => {
    let input = document.createElement("input");
    input.type = "file";
    input.setAttribute("multiple", false);
    input.setAttribute("accept", "pdf/*");
    input.onchange = async function (event) {
      //
      console.log(this.files);

      const formData = new FormData()
      formData.append('file', this.files[0])
      formData.append('room', room_id)
      formData.append('task', task.id)

      const result = await fetch(`http://localhost:4000/api/teacher/tasks/content/file`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      const json = await result.json()
      if (!json.error) {
        setFiles([
          ...files,
          { ...json.body.myData, archivo_id: json.body.insertId }
        ])
      }
      console.log(json);
    };
    input.click();
  }

  const getFile = async () => {
    const result = await fetch(` http://localhost:4000/api/teacher/tasks/content/file/${task.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const json = await result.json()
    setFiles(json.body)
  }

  const loadTasks = async () => {
    console.log('load contents', task.id);

    const result = await fetch(` http://localhost:4000/api/teacher/tasks/content/${task.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const json = await result.json()
    console.log(json);
    if (result.ok) {
      if (json.body) {
        const tasks = json.body
        setTasksLoader(tasks.id)
        //console.log(tasks.value);
        setTasks(JSON.parse(tasks.value))
      }
    }

  }

  useEffect(() => {
    getFile()
    getExamTypes()
    loadTasks()
  }, [])

  const selectFileHandle = async (file) => {

    const result = await fetch(`http://localhost:4000/uploads/${file.name}.txt`)
    const text = await result.text()
    setText(text)
  }

  const generateTask = async (e) => {

    e.target.disabled = true

    if (!text) {
      e.target.disabled = false

      Toast.fire({
        icon: "warning",
        title: "please select a TEXT or PDF file"
      })

      return;
    }

    if (text.length <= 0) return
    if (taskType === '') return
    const data = {
      "task": task.id,
      "type": taskType,
      text: text,
      amount: 1
    }
    const result = await fetch(`http://localhost:4000/api/teacher/tasks/content/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const json = await result.json()

    if (result.ok) {

      if (json.body.questions) {
        const questions = json.body.questions
        let myShift = [...tasks]
        questions.forEach(e => {
          myShift.unshift(e)
          setTasks(myShift)
        })

        //setTasks(tasks.unshift(questions))

        //const myShift = tasks
        //myShift.unshift(json.body.questions)
        //console.log(myShift);
        //setTasks(tasks.concat(json.body.questions))
      } else {
        console.log('error al generar tarea');
      }

    }

    e.target.disabled = false
  }

  const setTypeHandle = (e) => {
    setTaskType(e.target.value)
  }

  const saveTasks = async () => {
    const result = await fetch(`http://localhost:4000/api/teacher/tasks/content`, {
      method: tasksLoader ? 'PATCH' : 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        task: task.id,
        tasks: tasks
      })
    })

    const json = await result.json()

    if (result.ok) {
      if (json.error) {
        console.log('error al Actualizar');
        return;
      }
      console.log('Actualizado', json);

      if (tasksLoader) {
        Toast.fire({
          icon: "success",
          title: "Update success!"
        })
      } else {
        Toast.fire({
          icon: "success",
          title: "Saved success!"
        })
      }
    }
  }

  return (
    <section className="xl:w-[80vh] m-auto">
      <h1 className="text-2xl font-semibold">{task.title} {task.id}</h1>

      <div className="p-2 mt-4">
        <button onClick={openFileDialog} className="p-2 bg-sky-500 rounded flex gap-2">
          Subir Archivo PDF
          <ArrowUpTrayIcon className="w-6" />

        </button>
      </div>
      <div>
        {files.map(file => {
          return (
            <p key={file.archivo_id}><a href={`http://localhost:4000/uploads/${file.name}`} target="_blank" className="inline-block p-2 hover:underline">{file.name}</a> | <button className="text-red-500 inline-block p-2 hover:underline">borrar</button> <input type="radio" name="selectedFile" onClick={(e) => selectFileHandle(file)} />
            </p>
          )
        })}
      </div>

      <div className="p-2 mt-4">

        <div className="my-2">
          <label htmlFor="">Tipo de Contenido</label>
          <select name='type' className='w-full h-10 text-black' onChange={setTypeHandle}>
            {
              examTypes.map(item => item.value !== 0 ? <option key={item.value} value={item.value}>{item.name}</option> : <option key={item.value} value={0} disabled >{item.name}</option>)
            }
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center">
          <button className="bg-teal-500 hover:bg-teal-400 text-green-950 font-semibold p-2 rounded flex gap-2 disabled:bg-gray-500 justify-center" onClick={generateTask}>
            Generar tarea
            <SparklesIcon className="w-6" />

          </button>

          <button onClick={saveTasks} className="bg-green-600 p-2 rounded text-green-950 font-semibold">
            {tasksLoader ? 'Actualizar Tareas' : 'Guardar Tareas'}
          </button>
        </div>
      </div>



      <div className="p-2 mt-2 max-h-[88vh]">
        <TasksOfList list={tasks} update={setTasks} />
      </div>


    </section>
  );
}

export default TaskEdit;
