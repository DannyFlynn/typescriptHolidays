import React from 'react';
import Search from './Search';

type PlaneProps = {
    selectValue: string;
    handleSelectInput: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PlaneBackground: React.FC<PlaneProps> = ({ selectValue, handleSelectInput }) => {
    return (
        <div className='plane-bg-container text-white text-center'>
            <h2 className='p-3 mt-2'>"Discover the World, Create Lifelong Stories."</h2>
            <h2 className='p-3'>"Escape, Explore, Embrace.... </h2>
            <Search selectValue={selectValue} handleSelectInput={handleSelectInput} />
        </div>
    )
}

export default PlaneBackground