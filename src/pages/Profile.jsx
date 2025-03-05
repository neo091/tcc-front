import Title from '@components/Title';
import { ProfileBg, ProfileInfo, ProfilePicture, ProfileUserType } from '@components/Profile';
import { useAuthStore } from '@store/authStore';
import { useEffect, useState } from 'react';

const Profile = () => {

  const { session } = useAuthStore()

  const [colorblindSelected, setColorblindSelected] = useState("")


  const setAccessibility = (type) => {
    let filter = '';
    switch (type) {
      case 'protanopia':
        filter = 'grayscale(30%) contrast(120%)';
        break;
      case 'deuteranopia':
        filter = 'sepia(50%) saturate(150%)';
        break;
      case 'tritanopia':
        filter = 'hue-rotate(200deg) contrast(110%)';
        break;
      case 'normal':
      default:
        filter = 'none';
        break;
    }
    document.body.style.filter = filter

    window.localStorage.setItem(
      'colorblind', type
    )
  }

  const detectColorBlind = () => {
    const colorBlindStorage = window.localStorage.getItem("colorblind")

    if (!colorBlindStorage) return

    setColorblindSelected(colorBlindStorage)
    console.log(colorBlindStorage)

  }

  useEffect(() => {
    detectColorBlind()

  }, [])

  return (
    <>
      <Title>Perfil</Title>
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg space-y-3">
        <ProfileBg />
        <ProfilePicture />
        <ProfileInfo name={session?.name} />
        <ProfileInfo name={session?.email} />
        <ProfileUserType type={session?.type} />

        <div className=' max-w-60 m-auto text-center'>
          <p>Filtro Daltónico</p>
          <select defaultValue={colorblindSelected} onChange={(e) => setAccessibility(e.target.value)} className='outline-none capitalize w-full h-10 rounded bg-slate-600' >
            <option disabled selected className='capitalize'>{colorblindSelected}</option>
            <option value="normal" >Normal</option>
            <option value="protanopia">Protanopia</option>
            <option value="deuteranopia">Deuteranopia</option>
            <option value="tritanopia">Tritanopia</option>
          </select>
        </div>


      </div>
    </>
  );
}

export default Profile;
