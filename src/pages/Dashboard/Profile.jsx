import { GridContent } from "@components/GridContent"
import Title from "@components/Title"
import { useAuthStore } from "@store/authStore"

const UserTypeToString = (type) => {

  if (type === 0) return 'undefined'
  if (type === 1) return 'Student'
  if (type === 2) return 'Teacher'
  if (type === 3) return 'Admin'

}


const ProfilePicture = ({ src }) => <img src={src} className="mx-auto w-[100px] bg-black rounded-full " alt="" />
const ProfileInfo = ({ name }) => <p className=" text-center capitalize ">{name}</p>
const UserType = ({ type }) => <p className="text-sm text-center text-blue-500">{UserTypeToString(type)}</p>

const Profile = () => {


  const { session } = useAuthStore()

  console.log(session)

  const updatePanel = (e) => {
    document.querySelector('.active-panel').classList.remove('active-panel')
    e.target.classList.add('active-panel')
    updatePanelHandle(e.target.dataset.panelName)
  }


  return (
    <>
      <Title>Perfil</Title>
      <GridContent>
        <ProfilePicture src='/images/JohnWick.png' />
        <ProfileInfo name={session.name} />
        <ProfileInfo name={session.email} />
        <UserType type={session.type} />
      </GridContent>
    </>

  );
}

export default Profile;