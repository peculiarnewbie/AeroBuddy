'use client'
import { useState } from 'react'
import './revbutton.css'
import { useRouter } from 'next/navigation'


export default function RevalidateButton(){
    const[loading, setLoading] = useState(false)
    const[hasreply, setHasReply] = useState(false)
    const[reply, setReply] = useState('')

    const router = useRouter();

    async function Revalidate(){
        console.log('revalidating')

        setLoading(true)
        setHasReply(false)
        setReply('')

        const response = await fetch('/api/revalidate?tag=content')
        // router.push('/api/revalidate?tag=content')
        
        console.log(response)
        
        //@ts-ignore
        if(response.status == 200){
            setReply('revalidated')
        }
        else{
            setReply('failed')
        }
        
        setHasReply(true)
        setLoading(false)

        console.log("dun")
    }

    return(
        <div className='Container'>
            {
                loading ? (
                    <p>revalidating...</p>
                ) : (
                    <button className='RevButton' onClick={Revalidate}>
                        Revalidate
                    </button>
                )
            }
            {
                hasreply ? (
                    <p>{reply}</p>
                ) : (
                    null
                )
            }
            
        </div>
    )
}