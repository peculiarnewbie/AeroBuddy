import Image from 'next/image'
import styles from './page.module.css'
import Header from '@/components/header'
import Banner from '@/components/Banner'

export default function Home() {
  return (
    <main className={styles.main} style={{justifyContent: 'start'}}>
      <Header></Header>
      <Banner></Banner>
      <div style={{height: '5000px'}}>

      </div>
      <p>whaa</p>
    </main>
  )
}
