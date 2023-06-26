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
import Integration from '@/components/Integration'
import Splash from '@/components/LoadingSplash'
import Support from '@/components/Support'
import Channels from '@/components/Channels'





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
      next: { tags: ['content'] },
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

    console.log('fetched', section);

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
  const integrationData = getSectionData('Integration')
  const supportData = getSectionData('Support')
  const channelsData = getSectionData('Channels')

  const [banner, client, usecases, technology, integration, support, channels] = await Promise.all([bannerData, clientsData, usecasesData, technologyData, integrationData, supportData, channelsData])

  const allData = [banner, client, usecases, technology, integration, support, channels]

  const sIndex = {
    banner: 0, 
    clients: 1, 
    usecases: 2, 
    technology: 3, 
    integration: 4, 
    support: 5, 
    channels: 6
  }

  function getText(groupIndex:number, index:number){
    //@ts-ignore
    const text = allData[groupIndex].results[index]?.properties.Text.rich_text[0]?.plain_text
    return text ? text : 'missing notion block'
  }

  function getAltText(groupIndex:number, index:number){
    //@ts-ignore
    const text = allData[groupIndex].results[index]?.properties.altText.rich_text[0]?.plain_text
    return text ? text : 'missing notion block'
  }

  function getImage(groupIndex:number, index:number){
    //@ts-ignore
    const url = allData[groupIndex].results[index]?.properties.URL?.url
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
    ],
    integration:[
      getObject(sIndex.integration, 0),
      getObject(sIndex.integration, 1),
      getObject(sIndex.integration, 2),
      getObject(sIndex.integration, 3),
    ],
    support:[
      getObject(sIndex.support, 0),
      getObject(sIndex.support, 1),
      getObject(sIndex.support, 2),
      getObject(sIndex.support, 3),
    ],
    channels:[
      getObject(sIndex.channels, 0),
      getObject(sIndex.channels, 1),
      getObject(sIndex.channels, 2),
      getObject(sIndex.channels, 3),
    ]
  }

  return (
    <main className={styles.main} style={{justifyContent: 'start'}}>
        <Splash></Splash>
        <Header></Header>
        <Banner notion={content.banner}></Banner>
        <Clients notion={content.clients}></Clients>
        <UseCases notion={content.usecases}></UseCases>
        <Technology notion={content.technology}></Technology>
        <Integration notion={content.integration}></Integration>
        <Support notion={content.support}></Support>
        <Channels notion={content.channels}></Channels>
        
        <div style={{height: '1000px'}}>
        </div>
        <p>whaa</p>
    </main>
  )
}
