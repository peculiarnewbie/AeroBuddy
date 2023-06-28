"use client"

import './styles.css'
import './radixstyles.css'
import './entry.css'
import { poppins } from '@/app/fonts'
import * as Form from '@radix-ui/react-form';
import { signIn, signOut } from "next-auth/react"

export default function BannerEmail({loading}:{loading:boolean}){
    return(
        <Form.Root className="FormRoot" style={{display:'flex', flexDirection: 'column'}}>
            <Form.Field className="Content1EmailContainer" name="email">
                {/* <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', color: 'black' }}>
                    <Form.Label className="FormLabel">Email</Form.Label>
                    <Form.Message className="FormMessage" match="valueMissing">
                    Please enter your email
                    </Form.Message>
                    <Form.Message className="FormMessage" match="typeMismatch">
                    Please provide a valid email
                    </Form.Message>
                </div> */}
                <Form.Control asChild>
                    <input className={`Content1Email ${loading ? '' : 'slide-in-left animation-delay-2'}`} type="email" placeholder='E-mail' required />
                </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
                <button className={`${poppins.className} Content1Button ${loading ? '' : 'slide-in-left animation-delay-3'}`} onClick={() => signIn()}>
                    Sign in for a demonstration
                </button>
            </Form.Submit>
        </Form.Root>
    )
}