import { poppins } from "@/app/fonts";

import './styles.css'
import './additionalstyles.css'

export default function Support({notion} : {notion:any}){

    const ucItems = notion.slice(1);

    return(
        <section className="Support">
            <div className="Container SupportContainer">
                <div className="SupportImgContainer">
                    <div className="ImgDecor"></div>
                    <img className='SupportImg' src={notion[0].img} alt="support"></img>
                </div>
                <div className={`${poppins.className} SupportText`}>
                    <h2 style={{fontSize: '34px', fontWeight: '500', marginBottom: '25px'}}>{notion[0].h}</h2>
                    <p style={{marginBottom: '40px'}}>{notion[0].p}</p>
                    <ul className="SupportItemsContainer">
                        {ucItems.map((item:any, index:number) => (
                            <li className='SupportItems' key={index}>
                                <p  >{item.h}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}