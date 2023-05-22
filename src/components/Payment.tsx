import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import { Data } from '../App';


type PaymentProps = {
    close: () => void;
    total: number;
    customers: {
        id: number;
        category: string;
        qty: number;
    }[]
    holidayChoice: Data;
    bookingInfo: {
        name?: string;
        aiport?: string;
        departure?: string;
        returnDate?: string;
    }
    errorMsg: string;
    displayErrorMsg: () => void;
}

type CustomerDetails = {
    adults?: number;
    children?: number;
    infants?: number;
};

const Payment: React.FC<PaymentProps> = ({ close, total, customers, bookingInfo, errorMsg, displayErrorMsg }) => {



    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");



    let customerDetails: CustomerDetails = {
    }
    customers.map(customer => {
        if (customer.category === 'Adults') {

            customerDetails.adults = customer.qty === 0 ? 0 : customer.qty
        }
        else if (customer.category === 'Children') {
            customerDetails.children = customer.qty === 0 ? 0 : customer.qty
        }
        else {
            customerDetails.infants = customer.qty === 0 ? 0 : customer.qty
        }
    })

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setFullname(e.target.value);

    }

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setEmail(e.target.value);

    }

    const purchaseHoliday = () => {
        if (fullname !== "" && email !== "") {
            console.log('yes')
        } else {

            displayErrorMsg();
        }
    }

    return (
        <Container className='mt-5 confirmation-wrapper'>

            <Card className='shadow-lg p-3 mb-5 bg-white rounded h-100 '>
                <div className='p-2 d-flex justify-content-end'>
                    <button className='btn btn-danger' onClick={close}>X</button>
                </div>
                <div className='d-flex flex-column align-items-center p-2'>
                    <div>
                        <h4 className='text-decoration-underline'>Confirmation</h4>
                    </div>
                    <div>
                        <p className='text-center text-danger'>{errorMsg !== "" ? errorMsg : false}</p>
                        <div className='d-flex flex-column p-2'>
                            <label>Fullname:</label>
                            <input type='text'
                                value={fullname}
                                onChange={handleNameChange}
                                required />
                        </div>
                        <div className='d-flex flex-column p-2'>
                            <label>Email:</label>
                            <input type='email'
                                value={email}
                                onChange={handleEmailChange}
                                required />
                        </div>
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <table className='mt-5 tableWithBorders' >
                            <thead>
                                <tr>
                                    <th>Adults:</th>
                                    <th>Children:</th>
                                    <th>Infants:</th>
                                    <th>Total:</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{customerDetails.adults}</td>
                                    <td>{customerDetails.children}</td>
                                    <td>{customerDetails.infants}</td>
                                    <td>£{total}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className='mt-5 tableWithBorders' >
                            <tr>
                                <th>Destination:</th>
                                <th>Aiport:</th>
                                <th>Departure:</th>
                                <th>Return:</th>
                            </tr>
                            <tbody>
                                <tr>
                                    <td>{bookingInfo.name}</td>
                                    <td>{bookingInfo.aiport}</td>
                                    <td>{bookingInfo.departure}</td>
                                    <td>{bookingInfo.returnDate}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-3 p-2'>
                        <button className='btn btn-primary' onClick={purchaseHoliday}>buy now</button>
                    </div>
                </div>
            </Card>

        </Container>
    )
}

export default Payment