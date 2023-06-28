'use client'

import './styles.css'
import './additionalstyles.css'
import { useEffect, useState } from 'react';

import { poppins } from '@/app/fonts';

export default function Testimonial({notion} : {notion:any}){

    const [inView, setInView] = useState(false);

    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(-1440);
    const [prevscrollLeft, setPrevScrollLeft] = useState(scrollLeft);
    const [activeIndex, setActiveIndex] = useState(1);

    const ucItems = notion.slice(1);

    function handleMouseDown(e:any){
        setIsDown(true)
        setStartX(e.pageX - scrollLeft)
        setPrevScrollLeft(scrollLeft)
    }
    
    function handleMouseLeave(){
        setIsDown(false)
        handleCenterItem(scrollLeft)
    }

    function handleMouseUp(){ 
        setIsDown(false) 
        handleCenterItem(scrollLeft)
    }

    function handleMouseMove(e:any){
        if(!isDown) return
        e.preventDefault()
        const x = e.pageX
        let walk = (x - startX)
        if(walk > -1439) {
            walk = walk - 720 * ucItems.length
            setPrevScrollLeft(-1440 - 720 * ucItems.length)
        }
        else if (walk < -1441 - 720 * (ucItems.length)) {
            walk = walk + 720 * (ucItems.length)
            setPrevScrollLeft(-1440)
        }
        setScrollLeft(walk)
    }

    function handleCenterItem(position:number){
        let center = -1440 
        if(prevscrollLeft > position) center = Math.floor(position / 720) * 720
        else center = Math.ceil(position / 720) * 720
        setScrollLeft(center)
        let index = Math.abs(center / 720)
        if(index > 1 + ucItems.length) index = index - ucItems.length - 1
        else index = index - 1
        setActiveIndex(index)
    }

    function handleSwitchCarousel(next:boolean){
        console.log('switch')
        let position
        if(next) position = scrollLeft - 720
        else position = scrollLeft + 720
        if(position > -1440) {position = position - 720 * ucItems.length}
        else if (position < -1440 - 720 * (ucItems.length)) position = position + 720 * (ucItems.length)
        handleCenterItem(position)
    }


    return(
        <section className='Testimonial' onPointerMove={(e) => handleMouseMove(e)} onPointerUp={handleMouseUp} onPointerLeave={handleMouseLeave}  >
            <div className="Container" style={{height: '100%', color: 'black'}}>
                <div style={{marginBottom:'70px'}}>
                    <h3 className={`${poppins.className}`} style={{marginBottom:'8px'}}>{notion[0].h}</h3>
                    <p className={`${poppins.className}`} style={{marginBottom:'15px'}}>{notion[0].p}</p>
                </div>
                <div className='TestimonialCarouselContainer'>
                    <div className='TestimonialCarousel' onPointerDown={(e) => handleMouseDown(e)} >
                        <div className={`TestimonialItemsContainer ${isDown ? 'dragging' : ''}`} 
                        style={{transform: `translateX(${scrollLeft}px)`,
                                transition: isDown ? 'none' : 'transform 0.5s ease-in-out'}}
                        >
                            <TestimonialItem item={ucItems[ucItems.length - 2]} key={-2} />
                            <TestimonialItem item={ucItems[ucItems.length - 1]} key={-1} />
                            {ucItems.map((item:any, index:number) => (
                                <TestimonialItem item={item} key={index} />
                            ))}
                            <TestimonialItem item={ucItems[0]} key={ucItems.length} />
                            <TestimonialItem item={ucItems[1]} key={ucItems.length + 1} />
                        </div>
                    </div>
                    <p>{activeIndex}</p>
                    <button onClick={() => handleSwitchCarousel(true)}>next</button>
                    <button onClick={() => handleSwitchCarousel(false)}>prev</button>
                </div>
            </div>
            {/* @ts-ignore */}
            {/* <iframe width="600" height="1464" src="https://lookerstudio.google.com/embed/reporting/54e2fcc2-06e6-421a-8a66-c00471e8f260/page/OJgDD" frameborder="0" style={{border: '0'}} allowfullscreen></iframe> */}
        </section>
    )
}

function TestimonialItem({item, key, isDummy} : {item:any, key:number, isDummy?:boolean}){
    return(
        <div className='TestimonialItem' key={key}>
            <div className='TestimonialImgContainer'>
                <img loading="lazy" className='TestimonialImg' src={item.img} alt="Testimonial" ></img>
            </div>
            <h4 className={`${poppins.className}`} style={{margin:'0 0 18px', fontWeight:'600'}}>{item.personName}</h4>
            <p className={`${poppins.className}`} >{item.position}</p>
            <p className={`${poppins.className}`} >{item.comment}</p>
        </div>
    )
}