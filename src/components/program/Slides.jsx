import React, { useState } from 'react';

function Slides({ slides }) {
    // 1. Create state to track the current slide index
    const [activeIndex, setActiveIndex] = useState(0);

    // 2. Define the current slide object based on the state
    const currentSlide = slides[activeIndex];

    // 3. Button Handlers
    const handleRestart = () => {
        setActiveIndex(0);
    };

    const handlePrev = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    const handleNext = () => {
        if (activeIndex < slides.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    return (
        <div>
            <div id="navigation" className="text-center">
                <button 
                    data-testid="button-restart" 
                    className="small outlined" 
                    onClick={handleRestart}
                    disabled={activeIndex === 0} 
                >
                    Restart
                </button>
                <button 
                    data-testid="button-prev" 
                    className="small" 
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                >
                    Prev
                </button>
                <button 
                    data-testid="button-next" 
                    className="small" 
                    onClick={handleNext}
                    disabled={activeIndex === slides.length - 1}
                >
                    Next
                </button>
            </div>
            
            <div id="slide" className="card text-center">
                <h1 data-testid="title">{currentSlide.title}</h1>
                <p data-testid="text">{currentSlide.text}</p>
            </div>
        </div>
    );
}

export default Slides;