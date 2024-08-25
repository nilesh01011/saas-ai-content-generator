"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Check, Loader2Icon } from 'lucide-react'
import axios from 'axios';
import Razorpay from 'razorpay'
import { db } from '@/utils/db';
import { UserSubscription } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';

function BillingPage() {
  const [loading, setLoading] = useState(false);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext)
  const { user } = useUser()
  const zeroPrice = [
    {
      name: "10,000 Words/Month"
    },
    {
      name: "50+ Content Templates"
    },
    {
      name: "Unlimited Download & Copy"
    },
    {
      name: "1 month of History"
    },
  ];

  const paidPrice = [
    {
      name: "1,00,000 Words/Month"
    },
    {
      name: "50+ Templates Access"
    },
    {
      name: "Unlimited Download & Copy"
    },
    {
      name: "1 Year of History"
    },
  ];

  const CreateSubscription = () => {
    setLoading(true);
    axios.post('/api/create-subscription', {})
      .then((resp) => {
        onPayment(resp?.data?.id)
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)
      })
  };

  const onPayment = (subId: string) => {
    const options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      "subscription_id": subId,
      "name": "Nilesh Rathod",
      "description": "Monthly subscription",
      handler: async (resp: any) => {
        console.log(resp)
        if (resp) {
          SaveSubscription(resp?.razorpay_payment_id)
        }
        setLoading(false);
      }
    }
    // @ts-ignore

    if (window.Razorpay) {
      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error("Razorpay SDK not available");
      setLoading(false);
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log("Razorpay script loaded");
    };
    document.body.appendChild(script);
  }, []);

  const SaveSubscription = async (paymentId: string) => {
    const result = await db.insert(UserSubscription).values({
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      active: true,
      paymentId: paymentId,
      joinDate: moment().format('DD/MM/yyyy'),
    });

    if (result) window.location.reload();
  }
  return (
    <div>
      <div className='mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12'>
        <h2 className='text-center font-bold text-3xl my-3'>Upgrade With Monthly Plan</h2>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center'>
          {/* current plan */}
          <div className='rounded-2xl bg-white border border-gray-200 p-10'>
            <div className='text-center'>
              <h2 className='text-lg font-medium text-gray-900'>
                Free
                <span className='sr-only'></span>
              </h2>
              <p className='mt-2 sm:mt-4'>
                <strong className='text-3xl font-bold text-gray-900'>0$</strong>
                <span className='text-sm font-medium text-gray-700'>/monthly</span>
              </p>

              <div className='flex flex-col gap-2 mt-4'>
                {zeroPrice.map((item: any, index: number) => (
                  <h2 key={index} className='flex gap-2 items-center text-sm'>
                    <Check className='h-5 w-4' />
                    <span>{item?.name}</span>
                  </h2>
                ))}
              </div>

              <Button className={`${userSubscription ? "bg-transparent hover:bg-transparent outline outline-2 text-primary" : "bg-gray-500"} rounded-full mt-5 w-full`}>{userSubscription ? "Get this plan" : "Currently Active Plan"}</Button>
            </div>
          </div>
          {/* paid plan */}
          <div className='rounded-2xl bg-white border border-gray-200 p-10'>
            <div className='text-center'>
              <h2 className='text-lg font-medium text-gray-900'>
                Monthly
                <span className='sr-only'></span>
              </h2>
              <p className='mt-2 sm:mt-4'>
                <strong className='text-3xl font-bold text-gray-900'>9.99$</strong>
                <span className='text-sm font-medium text-gray-700'>/monthly</span>
              </p>

              <div className='flex flex-col gap-2 mt-4'>
                {paidPrice.map((item: any, index: number) => (
                  <h2 key={index} className='flex gap-2 items-center text-sm'>
                    <Check className='h-5 w-4' />
                    <span>{item?.name}</span>
                  </h2>
                ))}
              </div>

              <Button onClick={() => CreateSubscription()} disabled={loading} className={`rounded-full mt-5 flex items-center gap-2 ${userSubscription ? "bg-gray-500" : "bg-transparent hover:bg-transparent outline outline-2 text-primary"} w-full`}>
                {loading && <Loader2Icon className='animate-spin' />}
                {
                  userSubscription ? "Currently Active Plan" : "Get this plan"
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillingPage