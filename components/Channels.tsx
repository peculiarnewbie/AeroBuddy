'use client'

import './styles.css'
import './additionalstyles.css'
import { useState } from 'react';
import * as Tabs  from '@radix-ui/react-tabs';

import { poppins } from '@/app/fonts';

export default function Channels({notion} : {notion:any}){

    const [inView, setInView] = useState(false);
    const [selected, setSelected] = useState(0)

    function handleClick(index:number){
        setSelected(index);
    }

    const ucItems = notion.slice(1);

    return(
        <section className='Channels'>
            <div className="Container" style={{height: '100%', color: 'black'}}>
                <div style={{marginBottom:'70px'}}>
                    <h3 className={`${poppins.className}`} style={{marginBottom:'8px'}}>{notion[0].h}</h3>
                    <p className={`${poppins.className}`} style={{marginBottom:'15px'}}>{notion[0].p}</p>
                </div>
                <Tabs.Root className='ChannelsItemsContainer' defaultValue="tab1" orientation="vertical">
                    <Tabs.List className='ChannelsItemsSelection' aria-label="tabs example">
                        {ucItems.map((item:any, index:number) => (
                            <Tabs.Trigger className={`ChannelsItem${selected == index ? ' active' : ''}`} value={`tab${index}`} onClick={() => handleClick(index)} key={index}>
                                <h4 className={`${poppins.className}`} style={{margin:'0 0 18px', fontWeight:'600'}}>{item.h}</h4>
                                <p className={`${poppins.className}`} style={{color: 'inherit'}} >{item.p}</p>
                            </Tabs.Trigger>
                        ))}

                        {/* <Tabs.Trigger value="tab1">One</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Two</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Three</Tabs.Trigger> */}
                    </Tabs.List>
                    {ucItems.map((item:any, index:number) => (
                        <Tabs.Content value={`tab${index}`} key={index}>
                            <div className='ChannelsImgContainer'>
                                <img className='ChannelsImg' src={item.img} alt="Channels"></img>
                            </div>
                        </Tabs.Content>
                    ))}
                    {/* <Tabs.Content value="tab1">Tab one content</Tabs.Content>
                    <Tabs.Content value="tab2">Tab two content</Tabs.Content>
                    <Tabs.Content value="tab3">Tab three content</Tabs.Content> */}
                </Tabs.Root>
            </div>
            {/* @ts-ignore */}
            {/* <iframe width="600" height="1464" src="https://lookerstudio.google.com/embed/reporting/54e2fcc2-06e6-421a-8a66-c00471e8f260/page/OJgDD" frameborder="0" style={{border: '0'}} allowfullscreen></iframe> */}
        </section>
    )
}