import React, { useEffect, useState } from 'react'
import "../stylesheets/ImageSlider.css"

export default function ImageSlider({ images,title }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [pause, setPause] = useState(false);
    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % images.length;
        setCurrentIndex(newIndex);
        setPause(false);
    };

    const prevSlide = () => {
            const newIndex = (currentIndex - 1 + images.length) % images.length;
            setCurrentIndex(newIndex);
            setPause(true);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (!pause) {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }
        }, 2000)

        return () => {
            clearInterval(timer);
        };
    }, [images,pause])

    return (
        <div className="image-slider">
            <img src={images[currentIndex]} alt="Slide" className="slide-image" />

            <button className="prev-button" onClick={prevSlide}>
                &lsaquo;
            </button>
            <button className="next-button" onClick={nextSlide}>
                &rsaquo;
            </button>
            <div className="title-wrapper">
                <div className="top-title">{title} Products</div>
            </div>
        </div>
    )
}
