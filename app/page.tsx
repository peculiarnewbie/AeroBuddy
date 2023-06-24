import Image from 'next/image'
import styles from './page.module.css'
import Header from '@/components/header'
import Banner from '@/components/Banner'
import { Client } from '@notionhq/client'
import { Content } from 'next/font/google'
import { equal } from 'assert'
import Clients from '@/components/Clients'
import UseCases from '@/components/UseCases'
import Technology from '@/components/Technology'



export default async function Home() {
  
  const notion = new Client({
    auth: process.env.NOTION_KEY,
  })

  
  
  async function getSectionData(section:string){

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Notion-Version': '2022-06-28',
        'content-type': 'application/json',
        'Authorization': `Bearer ${process.env.NOTION_KEY}`
      },
      cache: 'no-store',
      body: JSON.stringify(
        {
          "filter" : {
            "property": "Section",
            "select": {
                "equals": section
            },
          },
          "sorts": [{
            "property": "index",
            "direction": "ascending"
          }]
       })
    };

    //@ts-ignore
    const raw = await fetch(`https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`, options)

    const response = await raw.json()

    // const response = await notion.databases.query({
    //   database_id: process.env.NOTION_DATABASE_ID ? process.env.NOTION_DATABASE_ID : "",
    //   filter:{
    //     select: {equals: section},
    //     property: 'Section',
    //   },
    //   sorts:[
    //     {
    //       property: 'index',
    //       direction: 'ascending',
    //     }
    //   ],
    // })
    return response;
  }

  const bannerData = getSectionData('Banner')
  const clientsData = getSectionData('Clients')
  const usecasesData = getSectionData('UseCases')
  const technologyData = getSectionData('Technology')

  const [banner, client, usecases, technology] = await Promise.all([bannerData, clientsData, usecasesData, technologyData])

  let allData = [banner, client, usecases, technology]

  const sIndex = {banner: 0, clients: 1, usecases: 2, technology: 3}

  function getText(groupIndex:number, index:number){
    //@ts-ignore
    const text = allData[groupIndex].results[index]?.properties.Text.rich_text[0].plain_text
    return text ? text : 'missing notion block'
  }

  function getAltText(groupIndex:number, index:number){
    //@ts-ignore
    const text = allData[groupIndex].results[index]?.properties.altText.rich_text[0].plain_text
    return text ? text : 'missing notion block'
  }

  function getImage(groupIndex:number, index:number){
    //@ts-ignore
    const url = allData[groupIndex].results[index]?.properties.URL.url
    return url ? url : 'missing url'
  }

  function getObject(groupIndex:number, index:number){
    return {h: getText(groupIndex, index), p: getAltText(groupIndex, index), img: getImage(groupIndex, index)}
  }

  const content = {
    banner: {
      h2 : getText(sIndex.banner, 0),
      p: getText(sIndex.banner, 1),
      c: getText(sIndex.banner, 2)
    },
    clients:[
      getImage(sIndex.clients, 0),
      getImage(sIndex.clients, 1),
      getImage(sIndex.clients, 2),
      getImage(sIndex.clients, 3),
      getImage(sIndex.clients, 4),
    ],
    usecases:[
      getObject(sIndex.usecases, 0),
      getObject(sIndex.usecases, 1),
      getObject(sIndex.usecases, 2),
      getObject(sIndex.usecases, 3),
    ],
    technology:[
      getObject(sIndex.technology, 0),
      getObject(sIndex.technology, 1),
      getObject(sIndex.technology, 2),
      getObject(sIndex.technology, 3),
      getObject(sIndex.technology, 4),
    ]
  }


  return (
    <main className={styles.main} style={{justifyContent: 'start'}}>
      <Header></Header>
      <Banner notion={content.banner}></Banner>
      <Clients notion={content.clients}></Clients>
      <UseCases notion={content.usecases}></UseCases>
      <Technology notion={content.technology}></Technology>
      
      <div style={{height: '1000px'}}>
      </div>
      <p>whaa</p>
    </main>
  )
}
