import React, { useState } from 'react';
import { Data } from '../App';
import { Container, Image, Card } from 'react-bootstrap';
import Payment from './Payment';


type HolidayProps = {
    holidayChoice: Data;
    incrementCustomer: (id: number) => void;
    decrementCustomer: (id: number) => void;
    close: () => void;
    total: number;
    paymentPage: boolean;
    payPage: () => void;
    customers: {
        id: number;
        category: string;
        qty: number;
    }[]
}



const HolidayChoice: React.FC<HolidayProps> = ({ holidayChoice, customers, incrementCustomer, decrementCustomer, total, close, paymentPage, payPage }) => {

    //will store airports and dates in this state to continue to payment.tsx and display in table
    const [bookingInfo, setBookingInfo] = useState({
    });


    const [errorMsg, setErrorMsg] = useState<string>("");

    const [airport, setAirport] = useState<string>("select airport...")
    const [departure, setDeparture] = useState<string>("");
    const [returnDate, setReturnDate] = useState<string>("")

    const handleAirportChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {

        setAirport(e.target.value);

    }


    //I have set holidays to seven days user this logic implements user can not book in the past and return date will always be 7 days after departure
    const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const selectedDeparture = e.target.value;
        const today = new Date().toISOString().split('T')[0];

        //user tries to put less that today and departure will default to the current day and return date will be 7 days after that 
        if (selectedDeparture < today) {

            setDeparture(today);
            const sevenDaysAfterDeparture = new Date(today);
            sevenDaysAfterDeparture.setDate(sevenDaysAfterDeparture.getDate() + 7);
            setReturnDate(sevenDaysAfterDeparture.toISOString().split('T')[0]);

        } else {

            setDeparture(selectedDeparture);
            const selectedDepartureDate = new Date(selectedDeparture);
            const sevenDaysAfterDeparture = new Date(selectedDepartureDate.getTime() + 7 * 24 * 60 * 60 * 1000);
            setReturnDate(sevenDaysAfterDeparture.toISOString().split('T')[0]);

        }
    }



    const proceedToPayPage = () => {

        if (airport !== "select airport..." && departure !== "" && returnDate !== "") {

            setErrorMsg("");

            const bookingObject = {
                name: holidayChoice[0]['name'],
                aiport: airport,
                departure: departure,
                returnDate: returnDate
            }

            setBookingInfo(bookingObject);
            payPage();

        } else {

            //if user tries to proceed without filling the fields
            displayErrorMsg();

        }
    }

    const displayErrorMsg = () => {

        setErrorMsg("Please fill out all fields");
        setTimeout(() => {

            setErrorMsg("");

        }, 2500)
    }

    const cancel = () => {

        close();
        setBookingInfo({});
        setAirport("select airport...");
        setDeparture("");
        setReturnDate("");

    }

    return (
        <>
            {paymentPage !== true ?
                <Container className='mt-lg-5 mt-3'>
                    <Card className='shadow-lg p-3 mb-5 bg-white rounded'>
                        <div className='d-flex justify-content-end align-items-center m-2' >
                            <button className='btn btn-danger' onClick={cancel}>X</button>
                        </div>
                        <div className='holiday-choice-wrapper d-flex flex-column flex-md-row'>

                            {holidayChoice.map(holiday => (
                                <div key={holiday.id} className='hol-choice-container'>
                                    <div className='p-2'>
                                        <h3>{holiday.name}</h3>
                                    </div>
                                    <div className='hol-pic-choice-container p-2'>
                                        <Image src={holiday.picture} alt="destination" className='hol-pic-choice' />
                                    </div>
                                    <div className='p-2'>
                                        <p>{holiday.description}</p>
                                    </div>
                                </div>
                            ))}

                            <div className='booking-container'>
                                <div className='d-flex flex-column p-2'>
                                    <p className='text-center text-danger'>{errorMsg !== "" ? errorMsg : false}</p>
                                    <label>Departure:</label>
                                    <select className='airports-select p-2'
                                        value={airport}
                                        onChange={handleAirportChange}>
                                        <option>select airport...</option>
                                        <option>Cardiff</option>
                                        <option>Heathrow</option>
                                        <option>Bristol</option>
                                    </select>
                                </div>
                                <div className='d-flex flex-column p-2'>
                                    <label>Departure Date:</label>
                                    <input type='date' placeholder='DD MMM YYYY' required
                                        className='airport-inputs'
                                        value={departure}
                                        onChange={handleDepartureChange} />
                                </div>
                                <div className='d-flex flex-column'>
                                    <label>Return Date:</label>
                                    <input type='date' placeholder='DD MMM YYYY' required className='airport-inputs'
                                        value={returnDate}
                                        onChange={handleDepartureChange}
                                    />
                                </div>
                                <div className='p-2'>
                                    {customers.map(customer => (
                                        <div key={customer.id} className='d-flex flex-column align-items-center justify-content-center'>
                                            <div className='d-flex flex-column'>

                                                <div className='d-flex'>
                                                    <div className='w-25 m-2 d-flex justify-content-center align-items-center'>
                                                        <label>{customer.category}:</label>
                                                    </div>
                                                    <div className='w-75 m-2 d-flex justify-content-center align-items-center'>
                                                        <button
                                                            className='add-minus-btns'
                                                            onClick={() => decrementCustomer(customer.id)}>-</button>
                                                        <span className='p-2'>{customer.qty}</span>
                                                        <button
                                                            className='add-minus-btns'
                                                            onClick={() => incrementCustomer(customer.id)}>+</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    <div className='p-3 d-flex justify-content-around align-items-center'>
                                        <span>Total: £{total}</span>
                                        <button className='btn btn-success mx-2' onClick={proceedToPayPage}>Proceed</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </Container>
                :
                <Payment close={close} total={total} customers={customers} holidayChoice={holidayChoice}
                    bookingInfo={bookingInfo} errorMsg={errorMsg} displayErrorMsg={displayErrorMsg} />
            }
        </>
    )
}

export default HolidayChoice