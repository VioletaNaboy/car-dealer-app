import React from "react";


export interface Make {
    id: number;
    name: string;
}

interface DropDownProps {
    array: (Make | number)[];
    title: string;
    func: (arg0: number) => void
}


export const DropDownEl: React.FC<DropDownProps> = ({ array, title, func }) => {
    const isMake = (item: Make | number): item is Make => {
        return (item as Make).id !== undefined;
    };
    return (<select name={title} id={title} defaultValue="" onChange={(e) => { func(Number(e.target.value)) }}>
        <option value="" disabled>Select {title}</option>
        {
            array.map((item, i) =>
                <option key={i} value={isMake(item) ? item.id : item}>
                    {isMake(item) ? item.name : item}
                </option>
            )
        }
    </select >)

}