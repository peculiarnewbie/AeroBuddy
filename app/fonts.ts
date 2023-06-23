import { Inter, Poppins } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
export const poppinsSemiBold = Poppins({ 
  weight: '500',
  subsets: ['latin'],
})

export const poppinsH2 = Poppins({
  weight: '700',
  subsets: ['latin'],
})