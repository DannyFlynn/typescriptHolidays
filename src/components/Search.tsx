import React, { useState } from 'react';
import { useHolidayContext } from '../HolidayContext';

type SearchProps = {
    selectValue: string;
    handleSelectInput: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Search: React.FC<SearchProps> = ({ selectValue, handleSelectInput }) => {

    const data = useHolidayContext()

    //map the holiday from context instead of re-wrtining
    const [holidayData, setHolidayData] = useState(data);


    return (
        <div className='search-container'>
            <select value={selectValue}
                onChange={handleSelectInput}
                className='select-holiday' >
                <option>Where would you like to go...?</option>
                {holidayData.map(holiday => (
                    <option key={holiday.id}>{holiday.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Search