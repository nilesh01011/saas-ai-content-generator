import React from 'react';
import { CARD } from '../page';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

function CardsItems(items: CARD) {
    return (
        <div className='group flex flex-col justify-center hover:bg-gray-50 rounded-xl p-4 md:p-7 dark:hover:bg-neutral-800' title={items?.title}>
            {/* icons */}
            <Image src={items?.icon} alt={items?.title} width={46} height={48} />
            {/* title and desc */}
            <div className='mt-5'>
                <h3 className='group-hover:text-gray-600 line-clamp-1 text-lg font-semibold text-gray-800 dark:text-white dark:group-hover:text-gray-400'>{items?.title}</h3>
                <p className='mt-1 text-gray-600 dark:text-neutral-400'>{items?.desc}</p>
            </div>
            {/* buttons */}
            <Link href={items?.link}>
                <Button variant={"ghost"} className='max-w-max mt-2 group-hover:text-primary group-hover:underline text-primary flex items-center justify-start gap-1 p-0 bg-transparent hover:bg-transparent'>
                    Generate with AI
                    <ChevronRight size={16} />
                </Button>
            </Link>
        </div>
    )
}

export default CardsItems