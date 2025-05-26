import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Constants used by AboutPage
// Ideally, move these to a shared constants.js file and import them
const subpageContentPaddingStyle = {
    paddingTop: `calc(var(--nav-obstruction-height, 70px) - 2.5rem)`,
    paddingBottom: '2rem'
};

const AboutPage = () => (
    <div className="min-h-screen flex flex-col text-gray-800">
        <div
            className="flex-grow flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8"
            style={subpageContentPaddingStyle}
        >
            <div className="max-w-3xl w-full text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 md:mb-8">About Us</h1>
                <div className="text-left space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
                    <p>Hello! We are Maurice & Marius, two computer scientists with a specialization in cyber-security, who have taken the leap into entrepreneurship. Our mission is to act as a dynamic interface between talented creators and innovative sellers on TikTok Shop.</p>
                    <p>As official TikTok Shop affiliate partners, we manage targeted marketing campaigns to effectively promote products and services, driving sales. Our tech-savviness and deep understanding of the e-commerce and media landscape empower us to actively shape the digital transformation, leveraging our technical and social skills to add significant value.</p>
                    <p>We are committed to fostering serious, transparent, and sustainable collaborations. Our focus isn't on quick sales, but on building a robust, reliable creator network founded on trust and mutual support. We believe in nurturing long-term partnerships where both creators and sellers can thrive.</p>
                    <p>We would be delighted to welcome you to our network and look forward to achieving success together. Please feel free to reach out!</p>
                    <p className="mt-4 md:mt-6 text-center text-gray-600">Best regards,<br />Maurice & Marius</p>
                </div>
                <p className="text-sm md:text-md text-gray-500 mt-8 md:mt-10 mb-6 md:mb-8">Based in Stuttgart, Germany 🇩🇪</p>
            </div>
        </div>
        <div className="text-center py-4 sm:py-6">
            <RouterLink to="/" className="px-5 py-1.5 sm:px-6 sm:py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 text-xs sm:text-sm md:text-base">
                Back to Homepage
            </RouterLink>
        </div>
    </div>
);

export default AboutPage;