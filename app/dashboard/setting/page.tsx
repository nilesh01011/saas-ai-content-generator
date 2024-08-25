import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function SettingPage() {
  return (
    <div className='p-10 flex items-center justify-center h-full'>
        <UserProfile />
    </div>
  )
}

export default SettingPage