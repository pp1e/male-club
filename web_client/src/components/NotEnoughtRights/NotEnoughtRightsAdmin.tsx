import { ReactElement } from "react";
import Image from 'react-bootstrap/Image';
import "../NotFoundPage/styles/notFoundPage.css";
import { NOT_ENOUGHT_RIGHTS } from '../../resources/Images';
import { useNavigate } from "react-router";

/**
 * Страница об ошибке, что пользователь не администратор.
 * @author Корюшкин Н.Е.
 */
const NotEnoughtRightsAdmin = (): ReactElement => {
    const navigate = useNavigate();
    return (
        <div className="
            d-flex 
            flex-column 
            align-items-center 
            justify-content-center 
            no-page__container
        ">
            <Image
                src={NOT_ENOUGHT_RIGHTS}
                className="no-page__image no-page__image-border"
            />                
            <span className="no-page__text">Ты не администратор:(</span>                
            <a 
                role="button" 
                className="btn btn-warning p-4" 
                onClick={() => navigate("/")}
            >
                Перейти на главную
            </a>
        </div>            
    )
};

export default NotEnoughtRightsAdmin;