import { ReactElement } from "react";
import Image from 'react-bootstrap/Image';
import "./styles/notFoundPage.css";
import { NOT_FOUND_IMAGE } from '../../resources/Images';
import { useNavigate } from "react-router";

const NotFoundPage = (): ReactElement => {
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
                src={NOT_FOUND_IMAGE}
                className="no-page__image no-page__image-border"
            />                
            <span className="no-page__text">Страница не найдена, но мы поищем...</span>                
            <a 
                role="button" 
                className="btn btn-warning p-4"
                onClick={() => navigate("/")}
            >
                На главную
            </a>
        </div>
    )
};

export default NotFoundPage;