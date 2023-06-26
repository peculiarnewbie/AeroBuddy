'use client'
import { useEffect, useState } from 'react'
import './additionalstyles.css'
import { poppins } from '@/app/fonts'

export default function LoadingSplash(){
    const [finished, setFinished] = useState(false)


    useEffect(() => {
        async function WaitForJS(){
            await new Promise((resolve) => {
                let intervalId = setInterval(() => {
                    if(window.document.readyState === 'complete'){
                        resolve(clearInterval(intervalId))
                    }
                }, 100)
            })
            setFinished(true)
        }

        WaitForJS()

    }, [])

    return(
        finished ? (
            null
        ) : (
            
            <div className={`SplashContainer ${finished ? 'finished' : ''}`}>
                <div className='loader'></div>
                <h2 className={`${poppins.className} title`}>{'Aerobuddy'}</h2>
            </div>
        )
    )
}