import './styles.css'
import './additionalstyles.css'

export default function Clients({notion} : {notion:any}){

    console.log(notion)

    return(
        <section className="Container">

            <div className='ClientsArea'>
                {notion.map((item:any, index:number) => (
                    <div key={index} className='ClientsItem'>
                        <img className='ClientsItemsimg' src={item} alt='airport' />
                    </div>
                    ))}
            </div>
        </section>
    )
}