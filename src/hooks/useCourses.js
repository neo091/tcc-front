import { enrollToCourse, getAllCourses } from "@services/Dashboard"
import { useAuthStore } from "@store/authStore"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export function useCourses() {

  const { getToken } = useAuthStore()

  const [courses, setCourses] = useState([])

  const loadCourses = async () => {
    const allCourses = await getAllCourses({ token: getToken() })

    if (allCourses.error) {
      return
    }

    const { rooms } = allCourses.body

    if (rooms?.length) {
      setCourses(rooms)
    }

  }

  useEffect(() => { loadCourses() }, [])


  const enroll = ({ aula_id }) => {

    Swal.fire({
      title: 'Seguro?',
      text: 'Estas seguro de inscribirte a este curso?',
      confirmButtonText: "INSCRIBIRME!",
      confirmButtonColor: 'rgb(34 197 94)',
      showCancelButton: true,
      background: "#1e293b",
      color: "white"
    }).then(async (result) => {

      if (result.isConfirmed) {

        const enrollResult = await enrollToCourse(
          {
            room: aula_id,
            token: getToken()
          }
        )

        const { exists } = enrollResult.body

        if (exists) {
          Swal.fire(
            {
              title: "Ya estas inscrito",
              icon: "error",
              showConfirmButton: false,
              timer: 1500
            }
          )

        } else {
          Swal.fire(
            {
              title: "Inscrito",
              icon: "success",
              showConfirmButton: false,
              timer: 1500
            }
          )
        }




        console.log(enrollResult)

      }

    })
  }

  return { courses, enroll }

}