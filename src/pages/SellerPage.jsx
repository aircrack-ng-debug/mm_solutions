import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Constants used by SellerPage
// Ideally, move these to a shared constants.js file and import them
const sellerImageUrl = '/images/Seller.png';
const getPlaceholderUrl = (width, height, text) => `https://placehold.co/${width}x${height}/e0e0e0/757575?text=${encodeURIComponent(text)}`;
const subpageContentPaddingStyle = {
    paddingTop: `calc(var(--nav-obstruction-height, 70px) - 2.5rem)`,
    paddingBottom: '2rem'
};

const SellerPage = () => (
    <div className="min-h-screen flex flex-col text-gray-800">
        <div
            className="flex-grow flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8"
            style={subpageContentPaddingStyle}
        >
            <div className="max-w-6xl w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
                    For Sellers: Maximize Your Growth with M&M Solutions
                </h1>
                <div className="flex flex-col md:flex-row-reverse md:items-stretch md:space-x-8 md:space-x-reverse lg:space-x-12 lg:space-x-reverse">
                    <div className="w-full md:w-5/12 lg:w-1/2 mb-6 md:mb-0 flex justify-center items-center">
                        <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[320px] md:max-w-full">
                            <img
                                src={sellerImageUrl}
                                alt="Seller Illustration"
                                className="absolute top-0 left-0 w-full h-full object-contain rounded-lg"
                                onError={(e) => { e.target.onerror = null; e.target.src = getPlaceholderUrl(300, 300, 'Seller Bild'); e.target.alt = `Platzhalter für Seller Bild`; }}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-7/12 lg:w-1/2 text-gray-700 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-2 md:mb-3">
                                Why Partner with M&M Solutions?
                            </h2>
                            <p className="text-sm md:text-base mb-3 text-gray-600 italic">
                                Official TikTok Shop Partner: Unlock Exclusive Insights & Optimized Strategies.
                            </p>
                            <p className="mb-2 text-sm md:text-base">
                                As official TikTok Shop partners, we provide unique insights into creator performance and product trends, forming the bedrock of our success. We meticulously vet creators for your brand and ensure only high-quality, authenticated products reach our network.
                            </p>
                            <p className="mb-2 text-sm md:text-base">
                                Our expertise lies in crafting high-impact marketing campaigns, both locally and globally. By leveraging our extensive creator network for exclusive promotions, we can amplify your product's reach, boost viral potential, and significantly drive sales.
                            </p>
                            <p className="mb-4 text-sm md:text-base">
                                Experience streamlined marketing with direct access to perfectly matched creators. This targeted exposure through authentic voices enhances visibility and skyrockets sales potential—a true win-win for sellers and creators alike.
                            </p>
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mt-4 md:mt-6 mb-2 md:mb-3">Your Advantages at a Glance:</h3>
                            <ul className="list-disc list-inside pl-4 space-y-1.5 md:space-y-2 mb-4 md:mb-5 text-sm md:text-base">
                                <li><strong>Exclusive TikTok Shop Insights:</strong> Benefit from our direct partnership and data-driven strategies.</li>
                                <li><strong>Curated Creator Network:</strong> Access vetted influencers perfectly aligned with your brand.</li>
                                <li><strong>Efficient Global Campaigns:</strong> We plan, manage, and optimize for maximum impact.</li>
                                <li><strong>Viral Reach Potential:</strong> Amplify brand awareness and sales via coordinated efforts.</li>
                                <li><strong>Quality Assurance:</strong> We ensure product and creator authenticity for credible marketing.</li>
                                <li><strong>True Win-Win Partnership:</strong> Effective promotion for you, valuable opportunities for creators.</li>
                            </ul>
                        </div>
                        <div className="mt-auto pt-4">
                            <RouterLink
                                to="/home/#contact-form-section"
                                className="inline-block px-6 py-2 sm:px-8 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base md:text-lg shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                Elevate Your Brand Today!
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center py-4 sm:py-6">
            <RouterLink to="/home" className="px-5 py-1.5 sm:px-6 sm:py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 text-xs sm:text-sm md:text-base">
                Back to Homepage
            </RouterLink>
        </div>
    </div>
);

export default SellerPage;