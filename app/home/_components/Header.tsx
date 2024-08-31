import React from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { UserRound } from 'lucide-react'

function Header() {
    return (
        <div className='flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-neutral-800 dark:border-neutral-700'>
            <nav className='relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-88'>
                {/* logo */}
                <div className='flex items-center justify-between'>
                    <Image src={'/logo.svg'} alt="logo" width={120} height={100} />
                </div>
                {/* login button */}
                <div className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block'>
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7'>
                        <Link href={"/dashboard"} className='flex items-center gap-x-2 font-medium sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-blue-500'>
                            <Button variant={"ghost"} className='text-gray-500 hover:text-primary flex items-center gap-2 hover:bg-transparent'>
                                <UserRound className='w-4 h-4' />
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header