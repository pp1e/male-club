import { ReactElement } from "react";
import { START_PAGE_CHILD1, START_PAGE_CHILD2 } from '../../resources/Images';
import Image from 'react-bootstrap/Image';
import "./styles/startpage.css";


/**
 * Старстовая страница
 * @author Гусева П.Н.
 */
const StartPage = (): ReactElement => {
    return (
        <>
            <div className="text-start container mt-4 d-flex flex-row justify-content-center">
                <div className="d-flex flex-column font-weight-normal start-page__content">
                    <div className="d-flex flex-column align-items-end justify-content-end start-page__container__margin-left">
                        <span className="text-warning start-page__text-big">Ma Le Club</span>
                        <div className="d-flex flex-row align-items-center justify-content-between">
                            <div className="d-flex flex-column start-page__text-container justify-content-between">
                                <span className="start-page__text-medium text-dark">Подарите вашему ребёнку<br></br>счастливое детство</span>
                                <span className="start-page__text-small text-muted">Если ваш ребёнок непоседа и любит проводить время весело и с пользой, тогда ему точно понравится у нас в гостях</span>
                            </div>
                            <Image
                                src={START_PAGE_CHILD2}
                                className="start-page__image ms-4"
                            />
                        </div>
                    </div>                    
                    <div className="d-flex flex-row align-items-center justify-content-between start-page__container__margin-top start-page__container__margin-right">
                        <Image
                            src={START_PAGE_CHILD1}
                            className="start-page__image me-4"
                        />
                        <div className="d-flex flex-column start-page__text-container justify-content-between">
                            <span className="start-page__text-medium text-dark">Всестороннее развитие<br></br>и творчество</span>
                            <span className="start-page__text-small text-muted">Мы создали все условия для детского творчества, социализации и приятного времяпрепровождения</span>
                        </div>                    
                    </div>                
                </div>
            </div>
        </>   
    )
};

export default StartPage;