import { Button } from '@/components/ui/button'
import { db } from '@/utils/db';
import { AIOutput, UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react'
import { HISTORY } from '../history/page';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import Link from 'next/link';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsage } from '@/app/(context)/UpdateCreditUsageContext';

function UsageTrack() {
    const { user } = useUser();
    const { totalUsage, setTotalUsage } = useContext(TotalUsageContext)
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
    const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsage)
    const [maxWord, setMaxWord] = useState(10000)

    useEffect(() => {
        user && GetData();
        user && IsUserSubscribe();
    }, [user]);

    useEffect(() => {
        user && GetData();
    }, [updateCreditUsage, user])

    const GetData = async () => {
        // @ts-ignore
        const result: HISTORY[] = await db.select().from(AIOutput).where(eq(AIOutput?.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(AIOutput?.id));

        GetTotalUsage(result)
    }

    const IsUserSubscribe = async () => {
        // @ts-ignore
        const result = await db.select().from(UserSubscription).where(eq(UserSubscription?.email, user?.primaryEmailAddress?.emailAddress))

        if (result) {
            setUserSubscription(true);
            setMaxWord(100000)
        }
    }

    const GetTotalUsage = (result: HISTORY[]) => {
        let total: number = 0;
        result.forEach((element: any) => {
            total = total + Number(element?.aiResponse?.length)
        });

        setTotalUsage(total)
    }

    return (
        <div className='m-5'>
            <div className='bg-secondary text-black rounded-lg p-3'>
                <h2 className='font-medium'>Credits</h2>
                <div className='h-2 bg-gray-300 w-full rounded-full mt-3 overflow-hidden'>
                    <div className='h-2 bg-primary rounded-full' style={{ width: totalUsage && maxWord ? (totalUsage / maxWord) * 100 + "%" : "0%" }}></div>
                </div>
                <h2 className='text-sm my-2'>{totalUsage} / {maxWord} Credits used</h2>
            </div>

            <Link href={'/dashboard/billing'}>
                <Button className='w-full my-3'>Upgrade</Button>
            </Link>
        </div>
    )
}

export default UsageTrack