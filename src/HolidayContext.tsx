import { createContext, useContext } from "react";

export type HolidayProps = {
    id: number;
    name: string;
    price: string;
    picture: string;
    description: string;
    seeMore: boolean;
}[];

export const myHolidayContext = createContext<HolidayProps>([]);

export const useHolidayContext = () => useContext(myHolidayContext);
