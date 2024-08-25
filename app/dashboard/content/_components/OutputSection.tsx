import React, { useEffect, useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface props {
  aiOutput: string
}

function OutputSection({ aiOutput }: props) {
  const editorRef: any = useRef();

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput)
  }, [aiOutput])
  
  return (
    <div className='bg-white shadow-lg border rounded-lg'>
      <div className='flex items-center justify-between p-5'>
        <h2 className='font-medium text-lg'>Your Result</h2>
        <Button className='flex gap-2'><Copy className='w-4 h-4' onClick={()=>navigator.clipboard.writeText(aiOutput)} /> Copy</Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result apear here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
      />
    </div>
  )
}

export default OutputSection