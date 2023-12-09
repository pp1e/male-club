import { ReactElement, useState, useEffect } from "react";


export function getAge(date: Date): string {
    const count = new Date().getFullYear() - date.getFullYear();
    if (count % 10 === 1) {
        return count !== 11 ? `${count} год` : `${count} лет`;
    }
    if (count % 10 > 1 && count % 10 < 5) {
        return `${count} года`;
    }
    if (count % 10 > 4) {
        return `${count} лет`;
    }
    return '';
}

export function checkAge(date: Date): boolean {
    const currAge = new Date().getFullYear() - date.getFullYear();
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