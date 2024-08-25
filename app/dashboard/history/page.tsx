import React from 'react'
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { currentUser } from '@clerk/nextjs/server';
import { desc, eq } from 'drizzle-orm';
import { TEMPLATE } from '../_components/TemplateListSection';
import Templates from '../../(data)/Templates';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export interface HISTORY {
   id: Number,
   formData: string,
   aiResponse: string,
   templateSlug: string,
   createdBy: string,
   createdAt: string,
}

async function HistoryPage() {
   const user = await currentUser();
   // @ts-ignore
   const HistoryList: HISTORY[] = await db.select().from(AIOutput).where(eq(AIOutput?.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(AIOutput?.id))

   const GetTemplateName = (slug: string) => {
      const template: TEMPLATE | any = Templates?.find((item) => item?.slug === slug)
      return template;
   };
   const truncateText = (text: string, wordLimit: number) => {
      const words = text.split(' ');
      return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
   };
   return (
      <div className={`m-5 p-5 border rounded-lg bg-white`}>
         <h2 className='font-bold text-3xl'>History</h2>
         <p className='text-gray-500'>Search your previously generated</p>
         <Table className='border mt-5'>
            <TableHeader>
               <TableRow>
                  <TableHead className='font-bold'>TEMPLATE</TableHead>
                  <TableHead className='font-bold'>AI RESP</TableHead>
                  <TableHead className='font-bold'>DATE</TableHead>
                  <TableHead className='font-bold'>WORDS</TableHead>
                  <TableHead className="text-right font-bold">ACTIONS</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {HistoryList.map((item: HISTORY, index: number) => (
                  <TableRow key={index}>
                     <TableCell className='flex items-center gap-2'>
                        <Image src={GetTemplateName(item?.templateSlug)?.icon} width={20} height={20} alt={item?.templateSlug} />
                        {GetTemplateName(item?.templateSlug)?.name}
                     </TableCell>
                     <TableCell>{truncateText(item?.aiResponse || '', 10)}</TableCell>
                     <TableCell >{item?.createdAt}</TableCell>
                     <TableCell >{item?.aiResponse.length}</TableCell>
                     <TableCell >
                        <Button variant={'ghost'} className='text-primary'>Copy</Button>
                     </TableCell>
                     <hr />
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}

export default HistoryPage