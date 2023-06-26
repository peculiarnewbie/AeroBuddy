'use client'

import './styles.css'
import './additionalstyles.css'
import { useEffect, useState } from 'react';

export default function Clients({notion} : {notion:any}){

    const [imgLoaded, setimgLoaded] = useState(Array.from({ length: notion.length }, () => true))

    const[loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function WaitForJS(){
            await new Promise((resolve) => {
                let intervalId = setInterval(() => {
                    if(window.document.readyState === 'complete'){
                        resolve(clearInterval(intervalId))
                    }
                }, 100)
            })
            setLoaded(true)
        }

        WaitForJS()

    }, [])
    
    return(
        <section className="Container">
            <div className='ClientsArea'>
                {notion.map((item:any, index:number) => (
                    <div key={index} className='ClientsItem'>
                        <img loading="lazy" className={`ClientsItemsimg ${imgLoaded[index] ? 'loaded' : ''}`} src={item} alt='airport'  />
                    </div>
                ))}
            </div>
        </section>
    )
}