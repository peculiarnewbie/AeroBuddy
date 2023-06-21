'use client'

import { useState, useEffect } from 'react'
import './styles.css'

export default function Navbar(){
    const [show, setShow] = useState(true)
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
      }, []);

    const OnBurgerClick = () => {
        setburgerOpened(!burgerOpened)
        setShow(window.innerWidth < 991 && burgerOpened)
    }

    return(
        <>
            <div className='Collapsed Navbar-burger'>
                <div style={{display: 'flex', justifyContent: 'right', alignItems: 'center', height: '100%'}}>
                    <button onClick={OnBurgerClick}>burger</button>
                </div>
            </div>
            

            <div className={`Collapse ${show ? 'show' : ''} Navbar-main`}>

                <div className='Navbar-buttons'>

                </div>
                <div style={{display: 'flex', justifyContent: 'right', alignItems: 'center', height: '100%'}}>
                    <button className='Navbar-login'>Log in</button>
                </div>
            </div>
        </>
    )
}