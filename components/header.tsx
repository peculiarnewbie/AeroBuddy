import './styles.css'
import Image from 'next/image'
import logo from '../public/aiairport-black-transparent.png'

import Navbar from './Navbar'
import HeaderShadow from './HeaderShadow'

export default function Header(){
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
                <Navbar></Navbar>
                
                
            </div>
            <HeaderShadow></HeaderShadow>
        </header>
    )
}