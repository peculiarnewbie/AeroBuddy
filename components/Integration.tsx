'use client'

import './styles.css'
import './additionalstyles.css'
import { useState } from 'react';

import { poppins } from '@/app/fonts';

export default function Integration({notion} : {notion:any}){

    const [inView, setInView] = useState(false);

    const ucItems = notion.slice(1);

    return(
        <section className='Integration'>
            <div className="Container" style={{height: '100%', color: 'black'}}>
                <div style={{marginBottom:'70px'}}>
                    <h3 className={`${poppins.className}`} style={{fontWeight:'300', fontSize:'34'}}>{notion[0].h}</h3>
                    <h3 className={`${poppins.className}`} style={{marginBottom:'15px', fontSize:'34'}}>{notion[0].p}</h3>
                </div>
                <div className='IntegrationItemsContainer'>
                    {ucItems.map((item:any, index:number) => (
                        <div className={`IntegrationItem p${index}`} key={index}>
                            <div className='IntegrationImgContainer'>
                                <img className='IntegrationImg' src={item.img} alt="usecases"></img>
                            </div>
                            <div className='IntegrationText'>
                                <h4 className={`${poppins.className}`} style={{fontSize:'24px', fontWeight:'500'}}>{item.h}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}