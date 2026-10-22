import React from 'react'
import ProfileForm from './ProfileForm'
import { useSelector } from 'react-redux'

const Profile = () => {

  const user = useSelector((store) => store.user);
  return (

    <>
    {user && <ProfileForm user={user} />  }
    </>
   
  )
}

export default Profile