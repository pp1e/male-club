import { ReactElement, useState, useMemo, ReactNode, useRef, SetStateAction, Dispatch } from "react";
import Reservation from './User';

interface IUserReservation {
    name: string;
    age: number;
    key: string;
    recordID?: number;
}

interface IProps {
    childrenList?: ReactNode;
    children?: IUserReservation[];
    setChildrenList?: Dispatch<SetStateAction<IUserReservation[]>>;
    searchChildrenListButton?: React.RefObject<HTMLButtonElement>;
}

/**
 * Блок списка детей.
 * @author Корюшкин Н.Е.
 */
const ChildrenListCard = (props: IProps): ReactElement => {
    const searchRef = useRef(null);
    const [searchValue, setSearchValue] = useState('');
    const childrenListComponent = useMemo(() => {
        const filteredChildrenList = props.children?.filter(child => 
            child.name.includes(searchValue)
        ) || [];
        return filteredChildrenList?.map(user => {
            return (
                <Reservation
                    searchChildrenListButton={props.searchChildrenListButton}
                    user={user} 
                    key={user.recordID} 
                />
            )
        })
    }, [searchValue, props.children]);

    const filterList = () => setSearchValue(searchRef.current?.['value'] || '');

    return (
        <div 
            className="
                d-flex flex-column align-items-center 
                reserve-card_children-list-card 
                border-radius-10
                shadow-lg py-4 px-2
            "
        >
            <div className="container-fluid">
                <div className="d-flex">
                    <input 
                        ref={searchRef}
                        className="form-control me-2 border border-warning" 
                        type="search" 
                        placeholder="Поиск" 
                        aria-label="Поиск"
                    />
                    <button 
                        className="btn btn btn-outline-warning" 
                        type="submit" 
                        onClick={filterList}
                    >
                        Поиск
                    </button>
                </div>
            </div>
            
            <div className="container-fluid mt-4">
                <ul className="list-group-flush reserve-card_children-list px-0">
                    {childrenListComponent}
                </ul>
            </div>
        </div>
    )
};

export default ChildrenListCard;