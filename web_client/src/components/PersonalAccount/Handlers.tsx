import { ReactElement } from "react";
import { IChild, IChildCard } from './PersonalAccount';

export function getAge(date: Date): string {
    const birthdayDate  = new Date(date);
    const currentDate  = new Date();
    let currAge = currentDate.getFullYear() - birthdayDate.getFullYear();
    if (currentDate.getMonth() < birthdayDate.getMonth() || 
        (currentDate.getMonth() === birthdayDate.getMonth() && currentDate.getDate() < birthdayDate.getDate())) {
            currAge--;
    }
    return currAge > 4
            ?
                `${currAge} лет`
            :
                `${currAge} года`;
}

export function checkAge(date: Date): boolean {
    const currAge = +getAge(date).split(' ')[0];
    return currAge > 1 && currAge < 17;
}

export function getVisitsCircles(count: number): ReactElement {
    let visibleCount = count % 6;
    let emptyCirlesCount = 5 - visibleCount;
    const content = [];
    while(visibleCount>0) {
        visibleCount--;
        content.push(<div className="account__circle me-2">
                </div>)
    }
    while (emptyCirlesCount > 0) {
        emptyCirlesCount--;
        content.push(<div className="account__circle account__circle__not-visite me-2">
                </div>)
    }
    content.push(<div className="account__circle account__circle__sixth-visite me-2">
                </div>)
    return <>{content}</>;
}

export function getIChildCardList(childrenList: IChild[]): IChildCard[] {
    return childrenList.map(item => (
        {
            user: item,
            isEdit: false,
        }
    ));
}