import Image from 'next/image'
import './styles.css'

import { poppinsH2, poppinsSemiBold } from '@/app/fonts'

import content1 from '../public/1.webp'

export default function Banner(){
    return(
        <section className='Banner-Area'>
            <div className='Container Banner-Container'>
                <div className='Content1'>
                    <h2 className={`${poppinsH2.className} Content1H2 slide-in-left animation-delay-1`}>
                        Customer Service Platform for Airports
                    </h2>
                    <p className='Content1p slide-in-left animation-delay-2'>{"Start using automation and Artificial Intelligence to improve your airport's passenger experience while reducing customer service costs."}</p>
                    <div className='Content1Email slide-in-left animation-delay-3'>
                        <div>email</div>
                    </div>
                    <button className={`${poppinsSemiBold.className} Content1Button slide-in-left animation-delay-4`}>Schedule a demonstration</button>
                </div>
                <div className='Content1ImageContainer'>
                    <div className='Content1Image slide-in-right animation-delay-1'>
                        <Image
                            src={content1}
                            alt="1st Content"
                            fill
                            placeholder="blur"
                        ></Image>
                    </div>
                </div>
            </div>
        </section>
    )
}