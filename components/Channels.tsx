'use client'

import './styles.css'
import './additionalstyles.css'
import { useState, useEffect } from 'react';
import * as Tabs  from '@radix-ui/react-tabs';

import { poppins } from '@/app/fonts';
import SlideOnIntersect from './SlideOnIntersect';

export default function Channels({notion} : {notion:any}){

    const ucItems = notion.slice(1);

    const [selected, setSelected] = useState(0)

    const [imgLoaded, setimgLoaded] = useState(Array.from({ length: ucItems.length }, () => false))

    const[loaded, setLoaded] = useState(false);
    const[update, setUpdated] = useState(false)

    let intervalId:any

    function CheckLoaded(){
        if(!loaded){
            let i=0
            let allLoaded = true;
            let newLoaded = imgLoaded
            //@ts-ignore
            ucItems.forEach(item => {
                var image = new Image();
                image.src = item.img;
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
            clearInterval(intervalId)
        }
        else{
            intervalId = setInterval(() => CheckLoaded(), 10)
        }
        return () => {
            clearInterval(intervalId);
          };
    }, [loaded])

    function handleClick(index:number){
        setSelected(index);
    }

    return(
        <section className='Channels' id='Channels'>
            <div className="Container" style={{height: '100%', color: 'black'}}>
                <div style={{marginBottom:'70px'}}>
                    <SlideOnIntersect direction='up' delay={1}>
                    <h3 className={`${poppins.className}`} style={{marginBottom:'8px'}}>{notion[0].h}</h3>
                    <p className={`${poppins.className}`} style={{marginBottom:'15px'}}>{notion[0].p}</p>
                    </SlideOnIntersect>
                </div>
                <Tabs.Root className='ChannelsItemsContainer' defaultValue="tab1" orientation="vertical">
                    <Tabs.List className='ChannelsItemsSelection' aria-label="tabs example">
                        {ucItems.map((item:any, index:number) => (
                            <SlideOnIntersect direction='up' delay={1} key={index}>
                            <Tabs.Trigger className={`ChannelsItem${selected == index ? ' active' : ''}`} value={`tab${index}`} onClick={() => handleClick(index)} >
                                <h4 className={`${poppins.className}`} style={{margin:'0 0 18px', fontWeight:'500', fontSize: '17px'}}>{item.h}</h4>
                                <p className={`${poppins.className}`} style={{color: 'inherit', fontWeight:'300', fontSize: '15px'}} >{item.p}</p>
                            </Tabs.Trigger>
                            </SlideOnIntersect>
                        ))}

                        {/* <Tabs.Trigger value="tab1">One</Tabs.Trigger>
                        <Tabs.Trigger value="tab2">Two</Tabs.Trigger>
                        <Tabs.Trigger value="tab3">Three</Tabs.Trigger> */}
                    </Tabs.List>
                    {ucItems.map((item:any, index:number) => (
                        <div key={index} className={`ChannelsImgContainer ${selected == index ? 'active' : ''}`}>
                            <img loading="lazy" className={`ChannelsImg ${imgLoaded[index] ? 'loaded' : ''}`} src={item.img} alt="Channels" ></img>
                        </div>
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