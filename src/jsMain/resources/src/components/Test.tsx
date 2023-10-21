import { ReactElement}  from 'react';
import NavBar from "./Navigation/NavBar"

interface IProps {
}

const Test = (props: IProps): ReactElement => {
    return (
        <div>
            <NavBar />
            Тест
        </div>
    )
};

export default Test;