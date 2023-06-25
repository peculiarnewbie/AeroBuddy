'use client'
import { useEffect, useState } from 'react'
import './additionalstyles.css'
import { poppins } from '@/app/fonts'

export default function LoadingSplash(){
    const [finished, setFinished] = useState(false)

    function handleFinished(){
        // setFinished(true);
    }

    useEffect(() => {
        setTimeout(handleFinished, 1000)
    })

    return(
        finished ? (
            null
        ) : (
            
            <div className='SplashContainer'>
                <div className='loader'></div>
                <h2 className={`${poppins.className} title`}>{'Aerobuddy'}</h2>
            </div>
        )
    )
}