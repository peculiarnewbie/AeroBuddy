'use client'

import './styles.css'
import './additionalstyles.css'
import { useEffect, useState } from 'react';

export default function Clients({notion} : {notion:any}){

    const [imgLoaded, setimgLoaded] = useState(Array.from({ length: notion.length }, () => false))

    const[loaded, setLoaded] = useState(false);
    const[update, setUpdated] = useState(false)

    let intervalId:any

    function CheckLoaded(){
        if(!loaded){
            let i=0
            let allLoaded = true;
            let newLoaded = imgLoaded
            //@ts-ignore
            notion.forEach(item => {
                var image = new Image();
                image.src = item;
                if(image.complete) newLoaded[i] = true
                else{
                    allLoaded = false;
                }
                i = i+1
            });
            setimgLoaded(newLoaded);
            setUpdated(!update)
            setLoaded(allLoaded)
        }
    }

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        if(loaded){
            console.log('clearing')
            console.log(loaded)
            clearInterval(intervalId)
        }
        else{
            intervalId = setInterval(() => CheckLoaded(), 10)
        }
        return () => {
            clearInterval(intervalId);
          };
    }, [loaded])

    return(
        <section className="Container">
            <div className='ClientsArea'>
                {notion.map((item:any, index:number) => (
                    <div key={index} className='ClientsItem'>
                        <img className={`ClientsItemsimg ${imgLoaded[index] ? 'loaded' : ''}`} src={item} alt='airport' />
                    </div>
                ))}
            </div>
        </section>
    )
}