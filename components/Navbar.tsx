'use client'

import { useState, useEffect } from 'react'
import { poppins } from '@/app/fonts'
import './styles.css'

import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname } from 'next/navigation';

import Link from 'next/link';

//@ts-ignore
export default function Navbar({logFunction}){
    const [show, setShow] = useState(false)
    const [burgerOpened, setburgerOpened] = useState(false)

    const pathname = usePathname();

    const { data: session } = useSession()
    
    useEffect(() => {
        logFunction(pathname)
    }, [])

    useEffect(() => {
        const handleResize = () => {
          setShow(window.innerWidth > 991 || window.innerWidth < 991 && burgerOpened);
        };
    
        window.addEventListener("resize", handleResize);
        handleResize();
        

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, [burgerOpened]);

    const OnBurgerClick = () => {
        setburgerOpened(!burgerOpened)
        setShow(window.innerWidth < 991 && burgerOpened)
    }

    return(
        <>
            <div className='Collapsed Navbar-burger'>
                <div style={{display: 'flex', justifyContent: 'right', alignItems: 'center', height: '100%'}}>
                    <div className={burgerOpened ? 'open' : ''} id="nav-icon3" onClick={OnBurgerClick}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
            

            <div className={`Collapse ${show ? 'show' : ''} Navbar-main`}>

                <div className={`${poppins.className} Navbar-buttons`}>
                    {( !session && pathname == '/' ? 
                        <>
                            <div className='Navbar-item'>
                                <Link href='#UseCases' className='Navbar-button'>Solution</Link>
                            </div>
                            <div className='Navbar-item'>
                                <Link href='#Technology' className='Navbar-button'>Technology</Link>
                            </div>
                            <div className='Navbar-item'>
                                <Link href='#Integration' className='Navbar-button'>Integration</Link>
                            </div>
                            <div className='Navbar-item'>
                                <Link href='#Support' className='Navbar-button'>Support</Link>
                            </div>
                            <div className='Navbar-item'>
                                <Link href='#Channels' className='Navbar-button'>Use-cases</Link>
                            </div>
                            <div className='Navbar-item'>
                                <Link href='#Testimonial' className='Navbar-button'>Clients</Link>
                            </div>
                        
                        </> : <>
                            <div className='Navbar-item'>
                                <a className='Navbar-button' href='/applications/lookerstudio'>Looker Studio</a>
                            </div>
                            <div className='Navbar-item'>
                                <a className='Navbar-button' href='/applications/prompt'>Prompt app</a>
                            </div>
                        </>
                    )}
                </div>
                {
                    session ? (
                            <button className={`${poppins.className} Navbar-login`} onClick={() => signOut()}>
                                <p style={{ color:'inherit', fontWeight:'inherit'}}>Log out</p>
                                {(session?.user?.image ? <img src={session.user.image} className='Navbar-login-avatar' style={{marginLeft:'5px', height: '25px', width:'25px'}} /> : null)}
                            </button>
                        ) : (
                            <button className={`${poppins.className} Navbar-login`} onClick={() => signIn()}>Log in</button>
                        )
                }
            </div>
        </>
    )
}