'use client'
import { useEffect, useState } from 'react'
import './additionalstyles.css'
import { poppins } from '@/app/fonts'

export default function LoadingSplash(){
    const [loading, setLoading] = useState(true);
    const [finished, setFinished] = useState(false)


    useEffect(() => {
        const handleResize = () => {
            setLoading(false)
            setFinished(false)
        };

      
          window.addEventListener("resize", handleResize);
          handleResize();
          
  
          return () => {
            window.removeEventListener("resize", handleResize);
          };
      }, []);

    return(
        finished ? (
            null
        ) : (
            
            <div className={`SplashContainer ${loading ? '' : 'finished'}`}>
                <div className='loader'></div>
                <h2 className={`${poppins.className} title`}>{'Aerobuddy'}</h2>
            </div>
        )
    )
}