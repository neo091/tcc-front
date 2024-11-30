import Lessons from "@components/Lessons/Lessons"
import TeacherFilesRooms from "@components/TeacherFilesRooms"
import { useRoomStore } from "@store/roomStore"
import { TeacherTasksSection } from "@components/TeacherTasksSection"
import { TeacherExamsSection } from "@components/TeacherExamsSection"

const Room = () => {

  const { room } = useRoomStore()

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="bg-slate-800 rounded">
          <div className="py-4 px-4 border-b border-slate-700">
            <h2 className="font-medium text-2xl capitalize">{room.nombre_aula}</h2>
            <span className="text-slate-400 ">{room.nivel}</span>
          </div>

          <div className="p-4">
            {room.aula_descripcion}
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          <Lessons />
          <TeacherTasksSection />
          <TeacherFilesRooms />
          <TeacherExamsSection />
        </div>

      </div>

    </>
  );
}

export default Room;    