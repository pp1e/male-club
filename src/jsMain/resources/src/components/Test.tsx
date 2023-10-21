import { ReactElement}  from 'react';

interface IProps {
    test?: string;
}

const Test = (props: IProps): ReactElement => {
    return (
        <div>
            Тест
        </div>
    )
};

export default Test;