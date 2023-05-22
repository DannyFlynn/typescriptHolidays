import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';

import { useHolidayContext } from '../HolidayContext';

type HolidayProps = {
    holidayRef: React.RefObject<HTMLDivElement>
    clickedHoliday: (holiday: string) => void
}


const Holidays: React.FC<HolidayProps> = ({ holidayRef, clickedHoliday }) => {

    const data = useHolidayContext()
    const [holidayData, setHolidayData] = useState(data);


    const infoToggle = (id: number) => {

        setHolidayData(holidayData.map(holiday => {
            if (holiday.id === id) {
                return { ...holiday, seeMore: !holiday.seeMore }
            } else {
                return { ...holiday, seeMore: false }
            }
        }))

    }

    return (
        <Container className='margin mb-5'>
            <div className='text-center text-decoration-underline'>
                <h3 className='p-2'>Places To Visit!</h3>
            </div>
            <div className='holiday-wrapper' ref={holidayRef}>
                {holidayData.map(hols => (
                    <div key={hols.id} className='holiday-containers mt-5' >
                        <div className='holiday-name'>
                            <h4 className='holiday-title'>{hols.name}</h4 >
                        </div>
                        <div className='hol-pics-container'>
                            <Image src={hols.picture} alt="desination" className='hol-pics' />
                        </div>
                        <div>
                            <p>£{hols.price} pp</p>
                        </div>
                        <div>
                            {hols.seeMore === false ?
                                <p>
                                    {hols.description.substring(0, 75)} <button className='hol-info-btn'
                                        onClick={() => infoToggle(hols.id)}
                                        onTouchEnd={() => infoToggle(hols.id)}>see more....</button> </p>
                                :
                                <p>{hols.description.substring(0)} <button className='hol-info-btn'
                                    onClick={() => infoToggle(hols.id)}
                                    onTouchEnd={() => infoToggle(hols.id)}>see less...</button></p>}
                        </div>
                        <div className='d-flex justify-content-center'>
                            <button className='btn btn-success'
                                onClick={() => clickedHoliday(hols.name)}
                                onTouchEnd={() => clickedHoliday(hols.name)}>
                                Book Now!!!
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Container>
    );
}

export default Holidays;
