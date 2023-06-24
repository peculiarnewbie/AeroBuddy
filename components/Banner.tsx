import Image from 'next/image'
import './styles.css'

import { poppins } from '@/app/fonts'
import BannerEmail from './BannerEmail'

import content1 from '../public/1.webp'

export default function Banner({notion} : {notion:any}){

    return(
        <section className='Banner-Area'>
            <div className='Container Banner-Container'>
                <div className='Content1'>
                    <h2 className={`${poppins.className} Content1H2 slide-in-left animation-delay-1`}>
                        {notion.h2}   
                    </h2>
                    <p className='Content1p slide-in-left animation-delay-2'>
                        {notion.p}
                    </p>
                    <BannerEmail></BannerEmail>
                </div>
                <div className='Content1ImageContainer'>
                    <div className='Content1Image slide-in-right animation-delay-1'>
                        <Image
                            src={content1}
                            alt="1st Content"
                            fill
                            priority = {true}
                            placeholder="blur"
                        ></Image>
                    </div>
                </div>
            </div>
        </section>
    )
}