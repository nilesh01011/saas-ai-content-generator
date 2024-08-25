import { Search } from 'lucide-react'
import React from 'react'

function SearchSection({onSearchInput}:any) {
  return (
    <div className='sm:px-10 px-5 py-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex flex-col justify-center items-center text-white'>
        <h2 className='text-3xl font-bold'>Browse All Templates</h2>
        <p>What would you like to create today?</p>
        <div className='w-full flex justify-center'>
            <div className='flex gap-2 items-center p-2 border rounded-md bg-white my-5 sm:w-[50%] w-full'>
                <Search className='text-primary' />
                <input 
                type="text"
                 placeholder='Search blog, code, image generate' 
                className='bg-transparent outline-none text-black w-full'
                onChange={(e) => onSearchInput(e.target.value)}
                 />
            </div>
        </div>
    </div>
  )
}

export default SearchSection