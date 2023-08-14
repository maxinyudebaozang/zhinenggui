import { useState } from 'react'
import myImage from '../../assets/u224.svg'
import myImage1 from '../../assets/u225.svg'
import myImage2 from '../../assets/u226.svg'
import myImage3 from '../../assets/u227.svg'
import myImage4 from '../../assets/u228.svg'
import './infoList.css'
import Bpp from "./tubiao2"



const Home= () => {
    return (
        <div>
            <div  id="main">
                <ul className="ulcard">
                    <li>
                        <div>
                            <p>1648</p>
                            <p>今日派件量</p>
                            <span></span>
                        </div>
                        <div>
                            <p>
                                <img src={myImage} />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>648</p>
                            <p>今日寄件量</p>
                        </div>
                        <div>
                            <p>
                                <img src={myImage1} />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>₱164,800</p>
                            <p>今日派件收入</p>
                        </div>
                        <div>
                            <p>
                                <img src={myImage2} />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>₱51,840</p>
                            <p>今日寄件收入</p>
                        </div>
                        <div>
                            <p>
                                <img src={myImage3} />
                            </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>₱216,640</p>
                            <p>今日总收入</p>
                        </div>
                        <div>
                            <p>
                                <img src={myImage4} />
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
            <div>
            {/* <App></App> */}
            <Bpp></Bpp>
            </div>



        </div>
    )
}

export default Home

