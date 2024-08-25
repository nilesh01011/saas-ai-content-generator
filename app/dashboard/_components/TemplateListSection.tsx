import Templates from '@/app/(data)/Templates'
import React from 'react'
import TemplateCard from './TemplateCard'

export interface TEMPLATE {
    name: string,
    desc: string,
    icon: string,
    category: string,
    slug: string,
    aiPrompt: string,
    form?: FORM[]
}

export interface FORM {
    label: string,
    field: string,
    name: string,
    required?: boolean
}

function TemplateListSection({ userSearchInput }: any) {

    const filteredTemplates = userSearchInput
        ? Templates?.filter(item => item.name.toLowerCase().includes(userSearchInput.toLowerCase()))
        : Templates;
    return (
        <div className={`${filteredTemplates.length > 0 && "grid grid-cols-1 xss:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"} p-5`}>
            {/* {
                filteredTemplates.length > 0 ? (
                    <div className='grid grid-cols-1 xss:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        {filteredTemplates.map((item: TEMPLATE, index: number) => (
                            <TemplateCard key={index} {...item} />
                        ))}
                    </div>
                ) : (
                    <p>No Data found with your search input '{userSearchInput}'</p>
                )
            } */}
            {
                filteredTemplates.map((item: TEMPLATE, index: number) => (
                    <TemplateCard key={index} {...item} />
                ))
            }
        </div>
    )
}

export default TemplateListSection