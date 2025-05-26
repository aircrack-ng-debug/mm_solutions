import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Constants used by CreatorPage
// Ideally, move these to a shared constants.js file and import them
const creatorImageUrl = '/images/Creator.png';
const getPlaceholderUrl = (width, height, text) => `https://placehold.co/${width}x${height}/e0e0e0/757575?text=${encodeURIComponent(text)}`;
const subpageContentPaddingStyle = {
    paddingTop: `calc(var(--nav-obstruction-height, 70px) - 2.5rem)`,
    paddingBottom: '2rem'
};
const pageTitle = "M&M Solutions | TikTok Shop Partner & Creator Agency";
const pageDescription = "M&M Solutions Studio - Your official TikTok Shop partner agency. We connect Creator & Seller for maximum growth and authentic marketing on TikTok Shop..";
const pageCanonicalUrl = "https://mm-solutions.studio/home";
const ogImageUrl = "https://mm-solutions.studio/og-image.png";

const CreatorPage = () => (
    <div className="min-h-screen flex flex-col text-gray-800">
        <div className="visually-hidden">
            Creator Agency, TikTok-Shop Partner, Brand-Agency, Creator Agentur, Brand-Agentur, M&M Solutions Studio, M&M
            Solutions TikTok, M&M Solutions Agency .
            M&M Solutions ist Ihr offizieller TikTok-Shop Partner und Ihre Creator Agentur für umfassendes
            Brand-Management.
            Wir agieren als Creator Agency und Brand-Agency, um Ihre Präsenz auf TikTok Shop zu maximieren.
            Keywords: Creator Agency Nürtingen, TikTok-Shop Partner Deutschland, Brand-Agency für Social Media, Creator
            Agentur für Influencer Marketing, Creator Agency, Marketing-Agency, M&M Solutions TikTok, M&M Solutions
            Agency, M&M Solutions, M&M Solutions, M&M Solutions Creator Agency, M&M Solutions Creator, M&M Solutions
            Partner.
        </div>
        {/* Meta-Tags direkt mit React 19 setzen */}
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageCanonicalUrl} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageCanonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:site_name" content="M&M Solutions" />
        <meta property="og:locale" content="de_DE" />
        <div
            className="flex-grow flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8"
            style={subpageContentPaddingStyle}
        >
            <div className="max-w-6xl w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8 text-center">
                    For Creators
                </h1>
                <div className="flex flex-col md:flex-row md:items-stretch md:space-x-8 lg:space-x-12">
                    <div className="w-full md:w-5/12 lg:w-1/2 mb-6 md:mb-0 flex justify-center items-center">
                        <div className="relative aspect-square w-full max-w-[280px] sm:max-w-[320px] md:max-w-full">
                            <img
                                src={creatorImageUrl}
                                alt="Creator Illustration"
                                className="absolute top-0 left-0 w-full h-full object-contain rounded-lg"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = getPlaceholderUrl(300, 300, 'Creator Bild');
                                    e.target.alt = `Platzhalter für Creator Bild`;
                                }}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-7/12 lg:w-1/2 text-gray-700 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-5">
                                Become Part of Our Community
                            </h2>
                            <p className="mb-3 text-sm md:text-base">
                                As a creator, you tell stories. You have a face, a community, and you know how to
                                communicate on social media. Sellers, especially in e-commerce, often find themselves
                                working behind the scenes of their shops. They need creators to market their products.
                                The question often arises: "But which creators are the right fit for my product?". This
                                is where M&M Solutions comes in. We provide the tools and the network to set up targeted
                                marketing campaigns, efficiently connecting creators and products.
                            </p>
                            <p className="mb-3 text-sm md:text-base">
                                As a creator, you'll find several advantages here:
                            </p>
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mt-4 md:mt-5 mb-2 md:mb-3">Benefits
                                for Creators:</h3>
                            <ul className="list-disc list-inside pl-4 space-y-1.5 md:space-y-2 mb-4 md:mb-5 text-sm md:text-base">
                                <li><strong>Access to diverse and often carefully curated product
                                    ranges:</strong> Campaigns offer creators the opportunity to discover a wide
                                    selection of products and sellers. This makes it easier for them to find and present
                                    thematically relevant and in-demand items for their content.
                                </li>
                                <li><strong>Flexible cooperation models and attractive, performance-based earning
                                    opportunities:</strong> Through campaigns, creators can generate individual
                                    affiliate links for products. For every sale made via these links, they receive a
                                    commission, enabling direct monetization of their reach and content.
                                </li>
                            </ul>
                        </div>
                        <div className="mt-auto pt-4">
                            <RouterLink
                                to="/home/#contact-form-section"
                                className="inline-block px-6 py-2 sm:px-7 sm:py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base md:text-lg"
                            >
                                Contact Us Now
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="text-center py-4 sm:py-6">
            <RouterLink to="/"
                        className="px-5 py-1.5 sm:px-6 sm:py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 text-xs sm:text-sm md:text-base">
                Back to Homepage
            </RouterLink>
        </div>
    </div>
);

export default CreatorPage;