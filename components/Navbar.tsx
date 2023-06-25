'use client'

import { useState, useEffect } from 'react'
import { poppins } from '@/app/fonts'
import './styles.css'

export default function Navbar(){
    const [show, setShow] = useState(false)
    const [burgerOpened, setburgerOpened] = useState(false)

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
                    <div className='Navbar-item'>
                        <button className='Navbar-button'>Use-cases</button>
                    </div>
                    <div className='Navbar-item'>
                        <button className='Navbar-button'>Technology</button>
                    </div>
                    <div className='Navbar-item'>
                        <button className='Navbar-button'>Integration</button>
                    </div>
                    <div className='Navbar-item'>
                        <button className='Navbar-button'>Support</button>
                    </div>
                    <div className='Navbar-item'>
                        <button className='Navbar-button'>Channels</button>
                    </div>
                    <div className='Navbar-item'>
                        <button className='Navbar-button'>Clients</button>
                    </div>
                </div>
                <button className={`${poppins.className} Navbar-login`}>Log in</button>
            </div>
        </>
    )
}