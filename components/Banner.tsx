
import { useEffect, useState } from 'react'
import Image from 'next/image'
import './styles.css'
import './entry.css'

import { poppins } from '@/app/fonts'
import BannerEmail from './BannerEmail'

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import content1 from '../public/1.webp'
import SlideOnIntersect from './SlideOnIntersect'

export default async function Banner({notion} : {notion:any}){
    const session = await getServerSession(authOptions);


    return(
        <section className='Banner-Area'>
            <div className='Container Banner-Container'>
                <div className='Content1'>
                    <SlideOnIntersect direction='left' delay={0}>

                        <h2 className={`${poppins.className} Content1H2`}>
                            {notion[0].h}   
                        </h2>
                    </SlideOnIntersect>
                    <SlideOnIntersect direction='left' delay={1}>
                        <p className={`Content1p`}>
                            {notion[0].p}
                        </p>
                    </SlideOnIntersect>
                    <BannerEmail session={session}></BannerEmail>
                </div>
                <div className='Content1ImageContainer'>
                    <div className={`Content1Image`}>
                        {/* <Image
                            src={content1}
                            alt="1st Content"
                            fill
                            priority = {true}
                            placeholder="blur"
                        ></Image> */}
                        <SlideOnIntersect direction='right' delay={4}>
                            <img className='Bannerimg' loading="lazy" src={notion[0].img} alt="1st Content"></img>
                        </SlideOnIntersect>
                    </div>
                </div>
            </div>
        </section>
    )
}