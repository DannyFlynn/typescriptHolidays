import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

type HeaderProps = {
    pagePart: (part: string) => void;
    arrowUpRef: React.RefObject<HTMLDivElement>
}


const Header: React.FC<HeaderProps> = ({ pagePart, arrowUpRef }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <Navbar ref={arrowUpRef} className='nav-bar' >
                <div className='w-100 d-flex p-1'>
                    <Navbar.Brand className='p-1 w-50 d-flex d-flex justify-content-start' href="#home">Jetset Getaways<FontAwesomeIcon
                        icon={faPlaneDeparture} className='p-1' />
                    </Navbar.Brand>
                    <Nav className="w-50 d-flex d-none d-md-flex justify-content-around ">
                        <Nav.Link onClick={() => pagePart('holidays')}>Top Deals</Nav.Link>
                        <Nav.Link onClick={() => pagePart('review')}>Reviews</Nav.Link>
                        <Nav.Link onClick={() => pagePart('about')}>About</Nav.Link>
                        <Nav.Link onClick={() => pagePart('contact')}>Contact</Nav.Link>
                    </Nav>
                    <div className="w-50 d-flex d-md-none justify-content-end">

                        <FontAwesomeIcon icon={faBars} size={'2x'}
                            className='p-1'
                            style={{ color: 'black' }}
                            onClick={handleShow} />
                        <Offcanvas show={show} onHide={handleClose}>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title>
                                    Jetset Getaways<FontAwesomeIcon
                                        icon={faPlaneDeparture} />
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <ul>
                                    <li><Nav.Link onTouchStart={() => pagePart('holidays')} onTouchEnd={handleClose}>Top Deals</Nav.Link></li>
                                    <li><Nav.Link onTouchStart={() => pagePart('review')} onTouchEnd={handleClose}>Reviews</Nav.Link></li>
                                    <li><Nav.Link onTouchStart={() => pagePart('about')} onTouchEnd={handleClose}>About</Nav.Link></li>
                                    <li><Nav.Link onTouchStart={() => pagePart('contact')} onTouchEnd={handleClose}>Contact</Nav.Link></li>
                                </ul>

                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
            </Navbar>
        </React.Fragment>
    )
}

export default Header