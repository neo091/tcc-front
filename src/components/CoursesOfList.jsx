import { useCourses } from "@hooks/useCourses";
import Title from "@components/Title";
import { Course } from "@components/Course";

export const CoursesOfList = () => {
  const { courses, enroll } = useCourses()

  return (
    <section>
      <Title>Aulas Virtuales</Title>
      <div className="flex mt-4">
        {courses.map(course => (
          <Course
            key={course.aula_id}
            room={course}
            enroll={enroll}
          />
        ))}
      </div>
    </section>
  )
}