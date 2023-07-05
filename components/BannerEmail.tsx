"use client"

import './styles.css'
import './radixstyles.css'
import './entry.css'
import { poppins } from '@/app/fonts'
import * as Form from '@radix-ui/react-form';
import { signIn, signOut } from "next-auth/react"
import SlideOnIntersect from './SlideOnIntersect'

export default function BannerEmail({session}:{session:any}){
    
    return(
        <>
        {(!session ?
            <SlideOnIntersect direction='left' delay={2}>
                <button className={`${poppins.className} Content1Button`} onClick={() => signIn()}>
                    Try now
                </button> 
            </SlideOnIntersect> :
                <div className='ContentDoubleButton' style={{display:'flex', gap:'20px'}}>
                    <SlideOnIntersect direction='left' delay={3} fit>
                        <a className={`${poppins.className} Content1Button`} href='/applications/analytics'>
                            Try Analytics App
                        </a>
                    </SlideOnIntersect>
                    <SlideOnIntersect direction='left' delay={2} fit>
                        <a className={`${poppins.className} Content1Button`} href='/applications/prompt'>
                            Try Prompt App
                        </a>
                    </SlideOnIntersect>
                </div>
        )}
        </>
        
    )
}