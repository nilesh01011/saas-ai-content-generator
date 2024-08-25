"use client"
import React, { useContext, useState } from 'react';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { TEMPLATE } from '../../_components/TemplateListSection';
import Templates from '@/app/(data)/Templates';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { chatSession } from '@/utils/AiModel';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { useUser } from '@clerk/clerk-react';
import moment from 'moment';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';
import { useRouter } from 'next/navigation';
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext';
import { UpdateCreditUsage } from '@/app/(context)/UpdateCreditUsageContext';

interface PROPS {
    params: {
        'template-slug': string
    }
}

function CreateNewContent(props: PROPS) {
    const selectedTemplate: TEMPLATE | undefined = Templates?.find((template) => template.slug === props.params['template-slug']);
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>("");
    const { user } = useUser();
    const {totalUsage,setTotalUsage}= useContext(TotalUsageContext);
    const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext)
    const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsage)
    const router = useRouter()

    const GenerateAIContent = async (formData: any) => {
        if(totalUsage>=10000&&!userSubscription) {
            router.push('/billing')
            return
        }
        setLoading(true)
        const SelectedPrompt = selectedTemplate?.aiPrompt;
        const finalAIPrompt = JSON.stringify(formData) + ", " + SelectedPrompt;

        const result = await chatSession?.sendMessage(finalAIPrompt);

        if (result?.response?.text()) {
            setAiOutput(result.response.text());
            await SaveInDB(formData, selectedTemplate?.slug, result?.response?.text())
            setLoading(false);

            setUpdateCreditUsage(Date.now())
        }
    }

    const SaveInDB = async (formData: any, slug: any, aiResp: string) => {
        const result = await db.insert(AIOutput).values({
            formData: formData,
            templateSlug: slug,
            aiResponse: aiResp,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('DD/MM/yyyy')
        })
    }
    return (
        <div className='p-5'>
            <Link href={"/dashboard"} className='group transition-all'>
                <Button className='flex gap-1'><ArrowLeft className='scale-75 group-hover:scale-90' /> Back</Button>
            </Link>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
                {/* FormSection */}
                <FormSection selectedTemplate={selectedTemplate} userFormInput={(v: any) => GenerateAIContent(v)} loading={loading} />
                {/* OutputSection */}
                <div className='col-span-2'>
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </div>
        </div>
    )
}

export default CreateNewContent