import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Banner() {
    return (
        <div className="h-full relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
            <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center flex-col pb-10 pt-24'>
                <div className='flex justify-center'>
                    <Link href={'/dashboard/billing'} className='inline-flex items-center gap-x-2 bg-white hover:bg-gray-50 border border-gray-200 text-sm text-gray-800 p-1 ps-3 rounded-full transition hover:border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-neutral-600 dark:text-neutral-200'>
                        Upgrade Membership - Join Now
                        <span className='py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-200 font-semibold text-sm text-gray-600 dark:bg-neutral-700 dark:text-neutral-400'>
                            <ChevronRight size={16} />
                        </span>
                    </Link>
                </div>
                {/* text */}
                <div className='mt-5 max-w-2xl text-center mx-auto'>
                    <h1 className='flex items-center gap-3 font-bold text-gray-800 text-3xl sm:text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200'>
                        AI Content
                        <span className='bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent'>Generator</span>
                    </h1>
                </div>
                {/* paras */}
                <div className='mt-5 max-w-3xl text-center mx-auto'>
                    <p className='text-lg text-gray-600 dark:text-neutral-400'>
                        Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.
                    </p>
                </div>
                {/* buttons */}
                <Link href={"/dashboard"}>
                    <Button className='mt-8 gap-3 flex justify-center items-center min-h-[46px] gap-x-3 text-center bg-gradient-to-tl from-primary to-violet-600 hover:from-violet-600 hover:to-blue-600 border border-transparent text-white text-sm font-medium rounded-md focus:outline-none focus:ring-1 focus:ring-gray-600 py-3 px-4 dark:focus:ring-offset-gray-800'>
                        Get started
                        <ChevronRight size={16} />
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Banner