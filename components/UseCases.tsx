import './styles.css'

export default function({notion} : {notion:any}){

    const ucItems = notion.slice(1);

    return(
        <section style={{height: '1000px', backgroundColor: 'white'}}>
            <div className="Container" style={{height: '100%', color: 'black'}}>

                <h3>{notion[0].h}</h3>
                <p>{notion[0].p}</p>
                <div style={{display: 'flex'}}>
                    {ucItems.map((item:any, index:number) => (
                        <div key={index}>
                            <h4>{item.h}</h4>
                            <p>{item.p}</p>
                            <img src={item.img} alt="usecases"></img>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}