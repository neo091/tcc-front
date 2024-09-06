const UserTypeToString = (type) => {

    if (type === 0) return 'undefined'
    if (type === 1) return 'Student'
    if (type === 2) return 'Teacher'
    if (type === 3) return 'Admin'

}


const ProfilePicture = ({ src }) => <img src={src} className="mx-auto w-[200px] bg-black rounded-full " alt="" />
const ProfileInfo = ({ name }) => <p className=" text-center capitalize ">{name}</p>
const UserType = ({ type }) => <p className="text-sm text-center text-blue-500">{UserTypeToString(type)}</p>

const Profile = ({ user }) => {

    const updatePanel = (e) => {
        document.querySelector('.active-panel').classList.remove('active-panel')
        e.target.classList.add('active-panel')
        updatePanelHandle(e.target.dataset.panelName)
    }


    return (
        <>
            <ProfilePicture src='../images/user-4-xxl.png' />
            <ProfileInfo name={user.name} />
            <UserType type={user.type} />
        </>

    );
}

export default Profile;