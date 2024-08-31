import React from 'react'
import { UserButton } from '@clerk/nextjs'
import { Menu, Search, X } from 'lucide-react'
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import UsageTrack from './UsageTrack'
import { MenuList } from './SideNav'
import { usePathname } from 'next/navigation'

function Header() {
  const path = usePathname();
  return (
    <div className='p-5 shadow-sm border-b-2 flex justify-between items-center bg-white'>
      <div className='md:flex gap-2 items-center p-2 border rounded-md max-w-lg w-full hidden'>
        <Search />
        <input type='text' placeholder='Search...' className='outline-none' />
      </div>
      {/* menu lines */}
      <div className='md:hidden flex items-center border border-gray-100 p-2 rounded-sm cursor-pointer'>
        <Sheet>
          <SheetTrigger>
            <Menu size={18} />
          </SheetTrigger>
          <SheetContent side="left" hideClose>
            <SheetHeader>
              <SheetTitle className='w-full flex justify-between items-center'>
                <Image src={'/logo.svg'} alt="logo" width={120} height={100} />
                {/* close icons */}
                <SheetClose className='p-2 hover:bg-gray-100 rounded-sm cursor-pointer'>
                  <X size={18} />
                </SheetClose>
              </SheetTitle>
            </SheetHeader>
            <hr className='my-6 border' />
            {/* Menu list */}
            <div className='mt-3'>
              {MenuList.map((menu, index) => (
                <Link href={menu?.path} key={index} className={`flex gap-2 items-center mb-2 p-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer ${path === menu.path && "bg-primary text-white"}`}>
                  <menu.icon className='w-6 h-6' />
                  <h2 className='text-lg'>{menu.name}</h2>
                </Link>
              ))}
            </div>

            {/* usage */}
            <div className='absolute bottom-10 left-0 w-full'>
              <UsageTrack />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        {/* <h2 className='bg-primary p-1 rounded-full text-xs text-white px-2'>🔥 Join Membership just for $9.99/Month</h2> */}
        <UserButton />
      </div>
    </div>
  )
}

export default Header