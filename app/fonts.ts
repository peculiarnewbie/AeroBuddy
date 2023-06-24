import { Inter, Poppins } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ['latin']
})