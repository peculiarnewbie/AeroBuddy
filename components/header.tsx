import './styles.css'
import Image from 'next/image'
import logo from '../public/aiairport-black-transparent.png'

import Navbar from './Navbar'

export default function Header(){
    return (
        <div className="Header">
            <div className='Container' style={{display:'flex', alignItems: 'center'}}>
                <div className="Navbar-logo">
                    <Image
                        src={logo}
                        alt="Picture of the author"
                        fill
                    />

                </div>
                <Navbar></Navbar>
                
                
            </div>
        </div>
    )
}