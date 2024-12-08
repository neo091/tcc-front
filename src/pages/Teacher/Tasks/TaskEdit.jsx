import ExamGeneratedList from "@components/ExamGeneratedList";
import { ArrowUpTrayIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { useAuthStore } from "@store/authStore";
import { useRoomStore } from "@store/roomStore";
import { useTaskStore } from "@store/useTaskStore";
import { useEffect, useState } from "react";

const TaskEdit = () => {
  const { task, setTask } = useTaskStore()
  const { room_id } = useRoomStore()
  const { token } = useAuthStore()
  const [files, setFiles] = useState([])
  const [text, setText] = useState('')
  const [examTypes, setExamTypes] = useState([])
  const [taskType, setTaskType] = useState('multiple_choise')
  const [tasks, setTasks] = useState([])

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
    console.log(json);
  }

  useEffect(() => {
    getFile()
    getExamTypes()
  }, [])

  const selectFileHandle = async (file) => {

    const result = await fetch(`http://localhost:4000/uploads/${file.name}.txt`)
    const text = await result.text()
    setText(text)
  }

  const generateTask = async (e) => {

    e.target.disabled = true

    if (text.length <= 0) return
    if (taskType === '') return
    const data = {
      "task": task.id,
      "type": taskType,
      text
    }
    const result = await fetch(`http://localhost:4000/api/teacher/tasks/content/generate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })

    const json = await result.json()

    if (result.ok) {

      if (json.body.questions && json.body.questions.length > 0) {
        console.log(json.body?.questions);
        setTasks([...tasks, json.body?.questions[0]])
      } else {
        console.log('error al generar tarea');
      }

    }

    e.target.disabled = false
  }

  const setTypeHandle = (e) => {
    setTaskType(e.target.value)
  }

  return (
    <section className="w-[88%]">
      {task.title} {task.id}

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

        <button className="bg-green-500 hover:bg-green-400 text-green-950 font-semibold p-2 rounded flex gap-2 disabled:bg-gray-500" onClick={generateTask}>
          Generar tarea
          <SparklesIcon className="w-6" />

        </button>
      </div>

      <div className="p-2 mt-2">
        <ExamGeneratedList examList={tasks} />
      </div>
    </section>
  );
}

export default TaskEdit;
