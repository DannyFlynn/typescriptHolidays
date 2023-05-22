import React from 'react';
import { Container } from 'react-bootstrap';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';


type ContactProps = {
    contactRef: React.RefObject<HTMLDivElement>
}

const Contact: React.FC<ContactProps> = ({ contactRef }) => {
    return (
        <Container className='mt-4' >
            <div ref={contactRef}>
                <div className='text-center text-decoration-underline'>
                    <h3 className='p-2'>Contact</h3>
                </div>
                <div className='d-flex flex-column my-3 justify-content-around   p-3'>
                    <a href="Tel: 0789457593" className='p-2'>07345392921</a>
                    <a href="mailto: flynny386@gmail.com" className='p-2'>jetsetholiday@gmail.com</a>
                </div>
                <footer className='d-flex'>
                    <div className='d-flex justify-content-between align-items-end footer-links p-3'>
                        <a href='https://www.facebook.com/profile.php?id=100010035339536'><FontAwesomeIcon icon={faFacebook} size={'2x'} /></a>
                        <a href='https://www.linkedin.com/in/dan-flynn-229a9b24b'><FontAwesomeIcon icon={faLinkedin} size={'2x'} /></a>
                        <a href='https://github.com/DannyFlynn'><FontAwesomeIcon icon={faGithub} size={'2x'} /></a>
                    </div>
                    <div className='d-flex justify-content-end align-items-end footer-copysymbol'>
                        <p>&copy; Jetset Getaways 2023</p>
                    </div>
                </footer>
            </div>
        </Container>
    )
}

export default Contact