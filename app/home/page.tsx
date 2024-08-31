import React from 'react'
import Header from './_components/Header'
import Banner from './_components/Banner'
import Cards from '../(data)/Cards'
import CardsItems from './_components/CardsItems'

export interface CARD {
    title: string,
    desc: string,
    icon: string,
    link:string
}

function HomePage() {
    return (
        <div className='h-full w-full'>
            <Header />
            <Banner />
            <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
                <div className='grid sm:grid-cols-2 xl:grid-cols-4 items-start gap-2'>
                    {
                        Cards.map((item: CARD, index: number) => (
                            <CardsItems {...item} key={index} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage