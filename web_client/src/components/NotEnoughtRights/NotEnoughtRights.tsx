import { ReactElement } from "react";
import Image from 'react-bootstrap/Image';
import "../NotFoundPage/styles/notFoundPage.css";
import { NOT_ENOUGHT_RIGHTS } from '../../resources/Images';

const NotEnoughtRights = (): ReactElement => {
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center no-page__container">
                <Image
                    src={NOT_ENOUGHT_RIGHTS}
                    className="no-page__image no-page__image-border"
                />                
                <span className="no-page__text">Надо авторизоваться...</span>                
                <a href="/login" role="button" className="btn btn-warning p-4">Перейти к авторизации</a>
            </div>            
        </>   
    )
};

export default NotEnoughtRights;