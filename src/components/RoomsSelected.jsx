import { useSelectedStore } from "@store/useSelectedStore";

const RoomsSelected = () => {

  const { selected, setSelected } = useSelectedStore()

  return (
    <section>
      <header className="mt-2 flex justify-between overflow-hidden rounded">
        <button className={`bg-violet-600 hover:bg-violet-800 p-4 block w-full border-b-4 ${selected !== "lessons" && "border-transparent"} hover:border-b-4 hover:border-b-white transition-all duration-300`} onClick={() => setSelected("lessons")}>Lecciones</button>
        <button className={`bg-violet-600 hover:bg-violet-800 p-4 block w-full border-b-4 ${selected !== "tasks" && "border-transparent"} hover:border-b-4 hover:border-b-white transition-all duration-300`} onClick={() => setSelected("tasks")}>Tareas</button>
        <button className={`bg-violet-600 hover:bg-violet-800 p-4 block w-full border-b-4 ${selected !== "exams" && "border-transparent"} hover:border-b-4 hover:border-b-white transition-all duration-300`} onClick={() => setSelected("exams")}>Exámenes</button>
      </header>
    </section>
  );
}

export default RoomsSelected;
