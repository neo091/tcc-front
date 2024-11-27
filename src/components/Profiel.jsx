const UserTypeToString = (type) => {

  if (type === 0) return 'undefined'
  if (type === 1) return 'Student'
  if (type === 2) return 'Teacher'
  if (type === 3) return 'Admin'

}

export const ProfilePicture = ({ src }) => <img src={src} className="mx-auto w-[100px] bg-black rounded-full " alt="" />

export const ProfileInfo = ({ name }) => <p className=" text-center capitalize ">{name}</p>
export const ProfileUserType = ({ type }) => <p className="text-sm text-center text-blue-500">{UserTypeToString(type)}</p>