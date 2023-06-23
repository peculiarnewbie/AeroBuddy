import './styles.css'
import './clientsstyles.css'

export default function Clients({notion} : {notion:any}){

    console.log(notion)

    return(
        <section className="Container" style={{marginTop: '50px'}}>

            <div className='ClientsArea'>
                {notion.map((item:any, index:number) => (
                    <div className='ClientsItem'>
                        <img key={index} src={item}></img>
                    </div>
                    ))}
            </div>
        </section>
    )
}