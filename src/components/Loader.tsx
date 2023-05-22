import React from 'react';
import { SquareLoader } from 'react-spinners';

const Loader: React.FC = () => {
    return (
        <div className='w-100 d-flex justify-content-center align-items-center loader-container'>
            <SquareLoader color='lightblue' />
        </div>
    )
}

export default Loader