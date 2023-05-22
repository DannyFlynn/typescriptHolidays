import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

type ReviewsProps = {
    reviewRef: React.RefObject<HTMLDivElement>
}

const Reviews: React.FC<ReviewsProps> = ({ reviewRef }) => {

    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: "John Smith",
            review: "An incredible holiday! The stunning views, friendly locals, and delicious cuisine made it a memorable experience."
        },
        {
            id: 2,
            name: "Emily Johnson",
            review: "Jetset Getaways exceeded my expectations. The accommodations were top-notch, and the guided tours were informative and fun."
        },
        {
            id: 3,
            name: "David Thompson",
            review: "I had the best time on my holiday with Jetset Getaways. Everything was well-organized, and the activities were thrilling."
        },
        {
            id: 5,
            name: "Michael Wilson",
            review: "My holiday with Jetset Getaways was simply amazing. The cultural immersion and friendly locals made it an unforgettable experience."
        },

    ]);

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
        }, 5000); // Adjust the time interval (in milliseconds) between slides

        return () => clearInterval(interval);
    }, [reviews.length]);

    return (
        <Container className="d-flex flex-column align-items-center reviews-wrapper">
            <div ref={reviewRef}>
                <div className='text-center text-decoration-underline mb-5'>
                    <h3 className='p-2'>Reviews</h3>
                </div>
            </div>
            <Card className='review-cards shadow-lg p-3 mb-5 bg-white rounded'>
                <Carousel activeIndex={activeIndex} indicators={false} prevIcon={null} nextIcon={null} >
                    {reviews.map((review) => (
                        <Carousel.Item key={review.id} className='text-center fw-italic p-3'>
                            <p>{review.review}</p>
                            <p className='text-end'>{review.name}</p>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Card>
        </Container >
    )
}

export default Reviews