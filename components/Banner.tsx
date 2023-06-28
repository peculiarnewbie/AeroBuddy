'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import './styles.css'
import './entry.css'

import { poppins } from '@/app/fonts'
import BannerEmail from './BannerEmail'

import content1 from '../public/1.webp'

export default function Banner({notion} : {notion:any}){

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const handleResize = () => {
            setLoading(false)
        };

      
          window.addEventListener("resize", handleResize);
          handleResize();
          
  
          return () => {
            window.removeEventListener("resize", handleResize);
          };
      }, []);

    return(
        <section className='Banner-Area'>
            <div className='Container Banner-Container'>
                <div className='Content1'>
                    <h2 className={`${poppins.className} Content1H2 ${loading ? '' : 'slide-in-left'} `}>
                        {notion[0].h}   
                    </h2>
                    <p className={`Content1p ${loading ? '' : 'slide-in-left animation-delay-1'}`}>
                        {notion[0].p}
                    </p>
                    <BannerEmail loading={loading}></BannerEmail>
                </div>
                <div className='Content1ImageContainer'>
                    <div className={`Content1Image ${loading ? '' : 'slide-in-right '}`}>
                        {/* <Image
                            src={content1}
                            alt="1st Content"
                            fill
                            priority = {true}
                            placeholder="blur"
                        ></Image> */}
                        <img className='Bannerimg' loading="lazy" src={notion[0].img} alt="1st Content"></img>
                    </div>
                </div>
            </div>
        </section>
    )
}