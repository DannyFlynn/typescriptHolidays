import React from 'react';
import { Container } from 'react-bootstrap';

type AboutProps = {
    aboutRef: React.RefObject<HTMLDivElement>
}

const About: React.FC<AboutProps> = ({ aboutRef }) => {
    return (
        <Container>
            <div className='text-center p-md-2 p-4' ref={aboutRef}>
                <h3 className='p-2 text-decoration-underline mb-5'>About Us</h3>
                <p>Jetset Getaways: Your Gateway to Affordable Travel Experiences for 15 Remarkable Years!!!</p>
                <p>Welcome to Jetset Getaways, your trusted source for affordable and unforgettable holidays. For 15 remarkable years, we have been dedicated to curating exceptional travel experiences that won't break the bank.
                </p>
                <p>At Jetset Getaways, we understand that travel should be accessible to all. That's why we specialize in offering incredible vacation packages at unbeatable prices. Whether you're seeking a relaxing beach getaway, an exciting city adventure, or an immersive cultural exploration, we have the perfect destination waiting for you.
                </p>
                <p>
                    Our team of experienced travel experts is passionate about delivering personalized service and ensuring your journey is smooth from start to finish. With our extensive network of trusted partners and insider knowledge, we carefully select accommodations, transportation options, and activities to create unforgettable memories.
                </p>
                <p>
                    Join us in celebrating 15 years of making travel dreams come true. Choose Jetset Getaways for an affordable and remarkable holiday experience. Book your next adventure today and embark on a journey you'll cherish forever.
                </p>
            </div>
        </Container>
    )
}

export default About