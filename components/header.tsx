'use client'
import './styles.css'
import Image from 'next/image'
import logo from '../public/aiairport-black-transparent.png'

import Navbar from './Navbar'
import HeaderShadow from './HeaderShadow'

import { SessionProvider } from "next-auth/react"

export default function Header({session} : {session:any}){
    return (
        <header className="Header">
            <div className='Container HeaderContainer' style={{display:'flex', flexWrap:'wrap', alignItems: 'center'}}>
                <div className="Navbar-logo">
                    <Image
                        src={logo}
                        alt="Brand"
                        fill
                        priority = {true}
                        placeholder="blur"
                    />

                </div>
                <SessionProvider session={session}>
                    <Navbar></Navbar>
                </SessionProvider>
                
                
            </div>
                <HeaderShadow></HeaderShadow>
        </header>
    )
}