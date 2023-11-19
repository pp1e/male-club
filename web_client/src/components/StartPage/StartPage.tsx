import { ReactElement } from "react";
import NavBar from "../Navigation/NavBar";
import { IMAGEDATA1, IMAGEDATA2 } from './Images';
import Image from 'react-bootstrap/Image';
import "./styles/startpage.css";

interface IProps {}

const StartPage = (props: IProps): ReactElement => {
    return (
        <>
            <NavBar />
            <div className="text-start container mt-4 d-flex flex-row justify-content-center">
                <div className="d-flex flex-column  font-weight-normal start-page-content_container">
                    <div className="d-flex flex-column align-items-center justify-content-end">
                        <span className="text-warning start-page-text_big ps-3">Ma Le Club</span>
                        <div className="d-flex flex-row align-items-center justify-content-end mb-5">
                            <div className="d-flex flex-column start-page-text_container justify-content-between">
                                <span className="start-page-text_medium mb-3">Подарите вашему ребёнку<br></br>счастливое детство</span>
                                <span className="start-page-text_small">Если ваш ребёнок непоседа<br></br>и любит проводить время весело<br></br>и с пользой, тогда ему точно понравится<br></br>у нас в гостях</span>
                            </div>
                            <Image
                                src={IMAGEDATA2}
                                className="start-page_image ms-3"
                            />
                        </div>
                    </div>                    
                    <div className="d-flex flex-row align-items-center justify-content-start mb-5">
                        <Image
                            src={IMAGEDATA1}
                            className="start-page_image me-5 "
                            width="300px"
                            height="300px"
                        />
                        <div className="d-flex flex-column start-page-text_container justify-content-between px-3">
                            <span className="start-page-text_medium mb-3">Всестороннее развитие<br></br>и творчество</span>
                            <span className="start-page-text_small">Мы создали все условия для детского<br></br>творчества, социализации и приятного<br></br>времяпрепровождения</span>
                        </div>                    
                    </div>                
                </div>
            </div>
        </>   
    )
};

export default StartPage;