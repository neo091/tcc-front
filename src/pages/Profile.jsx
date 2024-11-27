import Title from '@components/Title';
import { ProfileBg, ProfileInfo, ProfilePicture, ProfileUserType } from '@components/Profile';
import { useAuthStore } from '@store/authStore';

const Profile = () => {

  const { session } = useAuthStore()

  return (
    <>
      <Title>Perfil</Title>
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg space-y-3">
        <ProfileBg />
        <ProfilePicture />
        <ProfileInfo name={session?.name} />
        <ProfileInfo name={session?.email} />
        <ProfileUserType type={session?.type} />
      </div>
    </>
  );
}

export default Profile;
