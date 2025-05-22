import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

// Image paths
const logoUrl = '/images/Logo_mm_solutions.png';
const creatorImageUrl = '/images/Creator.png';
const sellerImageUrl = '/images/Seller.png';
const heroImageUrl = '/images/hero.png';
const hero2ImageUrl = '/images/hero_2.png';

const howItWorksLayerImages = [
    '/images/layer_1.png', '/images/layer_2.png', '/images/layer_3.png', '/images/layer_4.png',
    '/images/layer_5.png', '/images/layer_6.png', '/images/layer_7.png', '/images/layer_8.png',
];

const heroIconsData = [
    { src: '/images/hero/flower_icon.png', alt: 'Blumen Icon', positionClasses: 'md:top-[58%] md:left-[10%] md:w-20 md:h-20 top-[65%] left-[5%] w-12 h-12 sm:top-[58%] sm:left-[8%] sm:w-14 sm:h-14', animationDelay: '0s' },
    { src: '/images/hero/pakete_1.png', alt: 'Pakete Icon', positionClasses: 'md:top-[12%] md:left-[22%] md:w-20 md:h-20 top-[12%] left-[10%] w-12 h-12 sm:top-[10%] sm:left-[15%] sm:w-14 sm:h-14', animationDelay: '0.8s' },
    { src: '/images/hero/play icons.png', alt: 'Play Icon', positionClasses: 'md:top-[5%] md:left-1/2 md:transform md:-translate-x-1/2 md:w-20 md:h-20 top-[5%] left-1/2 transform -translate-x-1/2 w-12 h-12 sm:w-14 sm:h-14', animationDelay: '0.3s' },
    // Updated shopping_bags.png for mobile: top/left based, and different from desktop
    {
        src: '/images/hero/shopping_bags.png',
        alt: 'Einkaufstaschen Icon',
        positionClasses: 'md:top-[70%] md:right-[30%] md:w-20 md:h-20 top-[62%] left-[70%] w-10 h-10 sm:top-[62%] sm:left-[70%] sm:w-12 sm:h-12', // Mobile: top/left; Desktop: top/right
        animationDelay: '1.2s'
    },
    { src: '/images/hero/zahnrad.png', alt: 'Zahnrad Icon', positionClasses: 'md:top-[8%] md:right-[24%] md:w-20 md:h-20 top-[10%] right-[8%] w-12 h-12 sm:top-[8%] sm:right-[10%] sm:w-14 sm:h-14', animationDelay: '0.6s' },
];

// Helper for image placeholders
const getPlaceholderUrl = (width, height, text) => `https://placehold.co/${width}x${height}/e0e0e0/757575?text=${encodeURIComponent(text)}`;

// --- Components ---

// Burger Icon Component
const BurgerIcon = ({ onClick, isOpen }) => (
    <button
        onClick={onClick}
        className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 z-50"
        aria-label="Menü öffnen"
        aria-expanded={isOpen}
    >
        {isOpen ? (
            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        ) : (
            <svg className="h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
        )}
    </button>
);

// Mobile Menu Overlay Component
const MobileMenu = ({ isOpen, onClose, navLinks, handleContactScroll, location, activeNavHash, setActiveNavHash, navigate }) => {
    if (!isOpen) return null;

    const linkBaseClasses = "block py-3 px-4 text-xl font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors duration-150";
    const activeLinkClasses = "bg-blue-100 text-blue-600";

    const handleMobileLinkClick = (e, link) => {
        e.preventDefault();
        if (link.isContact) {
            handleContactScroll(e);
        } else if (link.isRouterLink) {
            navigate(link.href);
            setActiveNavHash('');
        } else {
            const targetHash = link.href;
            if (location.pathname === '/') {
                setActiveNavHash(targetHash);
                const sectionId = targetHash.substring(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    const headerEl = document.querySelector('header.sticky');
                    const headerOffset = headerEl ? headerEl.offsetHeight + 20 : 70;
                    const y = section.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                } else if (targetHash === '#hero-section') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } else {
                navigate(`/${targetHash}`);
            }
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center p-6 md:hidden">
            <nav className="flex flex-col space-y-4 w-full max-w-xs text-center">
                {navLinks.map(link => ( // Mobile menu uses all navLinks
                    <a
                        key={link.id}
                        href={link.href}
                        onClick={(e) => handleMobileLinkClick(e, link)}
                        className={`${linkBaseClasses} ${
                            link.isContact ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' :
                                (link.isRouterLink && location.pathname === link.href) ||
                                (!link.isRouterLink && location.pathname === '/' && activeNavHash === link.href)
                                    ? activeLinkClasses : ''
                        }`}
                    >
                        {link.label}
                    </a>
                ))}
            </nav>
            <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 text-gray-600 hover:text-gray-800"
                aria-label="Menü schließen"
            >
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

// Consistent padding for subpage content wrappers
const subpageContentPaddingStyle = {
    paddingTop: `calc(var(--nav-obstruction-height, 70px) - 2.5rem)`, // Title much closer to nav
    paddingBottom: '2rem'
};

const CreatorPage = () => (
    <div className="min-h-screen flex flex-col text-gray-800">
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
                                onError={(e) => { e.target.onerror = null; e.target.src = getPlaceholderUrl(300, 300, 'Creator Bild'); e.target.alt = `Platzhalter für Creator Bild`; }}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-7/12 lg:w-1/2 text-gray-700 flex flex-col justify-between">
                        <div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-900 mb-4 md:mb-5">
                                Become Part of Our Community
                            </h2>
                            <p className="mb-3 text-sm md:text-base">
                                As a creator, you tell stories. You have a face, a community, and you know how to communicate on social media. Sellers, especially in e-commerce, often find themselves working behind the scenes of their shops. They need creators to market their products. The question often arises: "But which creators are the right fit for my product?". This is where M&M Solutions comes in. We provide the tools and the network to set up targeted marketing campaigns, efficiently connecting creators and products.
                            </p>
                            <p className="mb-3 text-sm md:text-base">
                                As a creator, you'll find several advantages here:
                            </p>
                            <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 mt-4 md:mt-5 mb-2 md:mb-3">Benefits for Creators:</h3>
                            <ul className="list-disc list-inside pl-4 space-y-1.5 md:space-y-2 mb-4 md:mb-5 text-sm md:text-base">
                                <li><strong>Access to diverse and often carefully curated product ranges:</strong> Campaigns offer creators the opportunity to discover a wide selection of products and sellers. This makes it easier for them to find and present thematically relevant and in-demand items for their content.</li>
                                <li><strong>Flexible cooperation models and attractive, performance-based earning opportunities:</strong> Through campaigns, creators can generate individual affiliate links for products. For every sale made via these links, they receive a commission, enabling direct monetization of their reach and content.</li>
                            </ul>
                        </div>
                        <div className="mt-auto pt-4">
                            <RouterLink
                                to="/#contact-form-section"
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
            <RouterLink to="/" className="px-5 py-1.5 sm:px-6 sm:py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 text-xs sm:text-sm md:text-base">
                Back to Homepage
            </RouterLink>
        </div>
    </div>
);

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
                                to="/#contact-form-section"
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
            <RouterLink to="/" className="px-5 py-1.5 sm:px-6 sm:py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 text-xs sm:text-sm md:text-base">
                Back to Homepage
            </RouterLink>
        </div>
    </div>
);

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


// Main Layout Component
const Layout = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const pillNavRef = useRef(null);

    const [activeNavHash, setActiveNavHash] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [headerHeight, setHeaderHeight] = useState(0);
    const [pillNavHeight, setPillNavHeight] = useState(0);
    const [pillStickyOffset, setPillStickyOffset] = useState(8);
    const [pillMarginTop, setPillMarginTop] = useState(0);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (location.pathname !== (Layout._lastPathname || '')) {
                window.scrollTo(0, 0);
            }
            Layout._lastPathname = location.pathname;
        }
    }, [location.pathname]);
    Layout._lastPathname = '';

    useEffect(() => {
        setIsMounted(true);
        if (location.pathname === '/') {
            setActiveNavHash(location.hash || '#hero-section');
        } else {
            setActiveNavHash('');
        }
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const calculateLayoutParameters = () => {
            let currentHeaderHeight = 0;
            if (headerRef.current) {
                currentHeaderHeight = headerRef.current.offsetHeight;
                if (headerHeight !== currentHeaderHeight) setHeaderHeight(currentHeaderHeight);
            }

            let currentPillNavHeight = 0;
            if (pillNavRef.current) {
                currentPillNavHeight = pillNavRef.current.offsetHeight;
                if (pillNavHeight !== currentPillNavHeight) setPillNavHeight(currentPillNavHeight);
            }

            const isMobileView = window.innerWidth < 768;
            let navObstructionHeightValue = 0;

            if (isMobileView) {
                navObstructionHeightValue = currentHeaderHeight;
                setPillStickyOffset(8);
                setPillMarginTop(0);
            } else {
                let calculatedStickyOffset = (currentHeaderHeight / 2) - (currentPillNavHeight / 2);
                calculatedStickyOffset = Math.max(8, calculatedStickyOffset);
                setPillStickyOffset(calculatedStickyOffset);

                const marginTopForPill = calculatedStickyOffset - currentHeaderHeight;
                setPillMarginTop(marginTopForPill);
                navObstructionHeightValue = calculatedStickyOffset + currentPillNavHeight;
            }
            document.documentElement.style.setProperty('--nav-obstruction-height', `${navObstructionHeightValue}px`);
        };

        if (isMounted) {
            calculateLayoutParameters();
            let resizeTimeout;
            const handleResize = () => {
                clearTimeout(resizeTimeout);
                resizeTimeout = setTimeout(calculateLayoutParameters, 50);
            };
            window.addEventListener('resize', handleResize);

            const debouncedRecalculate = setTimeout(calculateLayoutParameters, 100);

            return () => {
                clearTimeout(resizeTimeout);
                window.removeEventListener('resize', handleResize);
                clearTimeout(debouncedRecalculate);
            };
        }
    }, [isMounted, location.pathname, headerHeight, pillNavHeight]);

    useEffect(() => {
        if (!isMounted || typeof window === "undefined") return;

        const handleScroll = () => {
            if (location.pathname !== '/') return;

            const heroSection = document.getElementById('hero-section');
            const howItWorksSection = document.getElementById('how-it-works-section');

            let scrollTriggerOffset = 0;
            const isMobileView = window.innerWidth < 768;

            if (isMobileView) {
                scrollTriggerOffset = headerHeight + 20;
            } else {
                scrollTriggerOffset = pillStickyOffset + pillNavHeight + 40;
            }

            const currentScrollY = window.pageYOffset;

            if (howItWorksSection && heroSection) {
                if (currentScrollY >= (howItWorksSection.offsetTop - scrollTriggerOffset)) {
                    setActiveNavHash('#how-it-works-section');
                } else if (currentScrollY >= (heroSection.offsetTop - scrollTriggerOffset)) {
                    setActiveNavHash('#hero-section');
                } else {
                    setActiveNavHash('#hero-section');
                }
            } else if (heroSection) {
                setActiveNavHash(currentScrollY >= (heroSection.offsetTop - scrollTriggerOffset) ? '#hero-section' : '#hero-section');
            }
        };

        if (location.pathname === '/') {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname, headerHeight, pillNavHeight, pillStickyOffset, isMounted, activeNavHash]);


    const handleContactScroll = (e) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        if (location.pathname === '/') {
            document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/#contact-form-section');
        }
    };

    const navLinkBaseClasses = "block px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out rounded-full";
    const activeNavLinkClasses = "bg-blue-600 text-white shadow-sm";
    const inactiveNavLinkClasses = "text-gray-600 hover:bg-gray-200 hover:text-gray-800";

    const scrollToSectionHandler = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            let yScrollOffsetValue = 0;
            const isMobileView = window.innerWidth < 768;
            if (isMobileView) {
                yScrollOffsetValue = -(headerHeight + 20);
            } else {
                yScrollOffsetValue = -(pillStickyOffset + pillNavHeight + 20);
            }
            const y = section.getBoundingClientRect().top + window.pageYOffset + yScrollOffsetValue;
            window.scrollTo({top: y, behavior: 'smooth'});
        } else if (sectionId === 'hero-section') {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    };

    const handlePillNavLinkClick = (e, link) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        if (link.isRouterLink) {
            navigate(link.href);
            setActiveNavHash('');
        } else if (link.isContact) {
            handleContactScroll(e);
        } else {
            const targetHash = link.href;
            if (location.pathname === '/') {
                setActiveNavHash(targetHash);
                scrollToSectionHandler(targetHash.substring(1));
            } else {
                navigate(`/${targetHash}`);
            }
        }
    };

    const allPillNavLinks = [ // Renamed to avoid conflict if needed elsewhere, though not strictly necessary here
        { id: 'hero-section', label: 'Home', href: '#hero-section', isRouterLink: false },
        { id: 'how-it-works-section', label: 'How it Works', href: '#how-it-works-section', isRouterLink: false },
        { id: 'creator', label: 'Creator', href: '/creator', isRouterLink: true },
        { id: 'seller', label: 'Seller', href: '/seller', isRouterLink: true },
        { id: 'about', label: 'About Us', href: '/about', isRouterLink: true },
        { id: 'contact-form-section', label: 'Contact Us', href: '#contact-form-section', isRouterLink: false, isContact: true },
    ];

    // Filter out "Contact Us" for desktop pill navigation
    const desktopPillNavLinks = allPillNavLinks.filter(link => link.id !== 'contact-form-section');


    return (
        <>
            <style>{`
              body { background-color: #FFFFFF; color: #1f2937; font-family: 'Inter', sans-serif; margin: 0; overflow-x: hidden; }
              html { scroll-behavior: smooth; }
              :root { --nav-obstruction-height: 70px; /* Default fallback */ }

              .logo-cube-container { perspective: 1000px; width: 36px; height: 36px; }
              .logo-cube { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; animation: rotateCubeMobile 5s infinite ease-in-out; }
              .logo-cube-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; }
              .logo-cube-face.logo-cube-back { color: #1f2937; font-weight: bold; }
              .logo-cube-front { transform: translateZ(18px); }
              .logo-cube-back { transform: rotateY(180deg) translateZ(18px); }
              .logo-cube-face img { max-width: 100%; max-height: 100%; object-fit: contain; }
              @keyframes rotateCubeMobile { 0%, 40% { transform: translateZ(-18px) rotateY(0deg); } 50%, 90% { transform: translateZ(-18px) rotateY(-180deg); } 100% { transform: translateZ(-18px) rotateY(-360deg); } }
              @media (min-width: 640px) { 
                .logo-cube-container { width: 40px; height: 40px; }
                .logo-cube-front { transform: translateZ(20px); }
                .logo-cube-back { transform: rotateY(180deg) translateZ(20px); }
                .logo-cube { animation-name: rotateCubeDesktop; }
                @keyframes rotateCubeDesktop { 0%, 40% { transform: translateZ(-20px) rotateY(0deg); } 50%, 90% { transform: translateZ(-20px) rotateY(-180deg); } 100% { transform: translateZ(-20px) rotateY(-360deg); } }
              }
              .fade-in-up { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
              .fade-in-up-mounted { opacity: 1; transform: translateY(0); }
              .button-glow { box-shadow: 0 0 15px 5px rgba(59, 130, 246, 0.5); }
              .button-glow:hover { box-shadow: 0 0 20px 8px rgba(59, 130, 246, 0.7); }
            `}</style>
            <div className="min-h-screen bg-white text-gray-800 flex flex-col">
                <header
                    ref={headerRef}
                    className={`bg-white flex justify-between items-center py-3 px-4 sm:px-6 md:px-8 fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''} z-30 md:relative sticky top-0 shadow-sm`}
                >
                    <RouterLink to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <div className="logo-cube-container">
                            <div className="logo-cube">
                                <div className="logo-cube-face logo-cube-front">
                                    <img src={logoUrl} alt="Firmenlogo M&M" onError={(e) => e.target.src = getPlaceholderUrl(40,40,'M&M')} />
                                </div>
                                <div className="logo-cube-face logo-cube-back">M&M</div>
                            </div>
                        </div>
                        <span className="text-xl sm:text-2xl font-bold text-gray-700">SOLUTIONS</span>
                    </RouterLink>
                    <div className="md:hidden">
                        <BurgerIcon onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isOpen={isMobileMenuOpen} />
                    </div>
                </header>

                <nav
                    ref={pillNavRef}
                    className={`hidden md:flex md:sticky w-full justify-center py-2 fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''} z-40`}
                    style={{
                        top: `${pillStickyOffset}px`,
                        marginTop: `${pillMarginTop}px`,
                        animationDelay: '0.1s',
                    }}
                >
                    <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-gray-100 text-gray-700 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
                        {desktopPillNavLinks.map(link => ( // Use filtered links for desktop
                            <a
                                key={link.id}
                                href={link.isRouterLink ? link.href : (location.pathname === '/' ? link.href : `/${link.href}`)}
                                onClick={(e) => handlePillNavLinkClick(e, link)}
                                className={`${navLinkBaseClasses} ${
                                    (link.isRouterLink && location.pathname === link.href) ||
                                    (!link.isRouterLink && location.pathname === '/' && activeNavHash === link.href)
                                        ? activeNavLinkClasses : inactiveNavLinkClasses
                                }`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </nav>

                <MobileMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                    navLinks={allPillNavLinks} // Mobile menu uses all links
                    handleContactScroll={handleContactScroll}
                    location={location}
                    activeNavHash={activeNavHash}
                    setActiveNavHash={setActiveNavHash}
                    navigate={navigate}
                />

                <div className="flex-grow">
                    {children}
                </div>

                <footer
                    className={`text-center py-6 md:py-8 border-t border-gray-200 fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''} px-4 sm:px-6 md:px-8`}
                    style={{ animationDelay: '0.6s' }}
                >
                    <p className="text-gray-500 text-xs sm:text-sm">
                        &copy; {new Date().getFullYear()} M&M Solutions. All rights reserved.
                    </p>
                </footer>
            </div>
        </>
    );
};


// Homepage Component
const HomePage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const location = useLocation();
    const heroSectionRef = useRef(null);
    const howItWorksSectionRef = useRef(null);
    const imageLayerRefs = useRef([]);
    const currentLayerTransY = useRef(howItWorksLayerImages.map(() => 0));
    const animationFrameId = useRef(null);
    const layerVelocities = useRef(howItWorksLayerImages.map(() => 0));
    const lastScrollY = useRef(0);
    const navigate = useNavigate();
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
        checkDesktop();
        window.addEventListener('resize', checkDesktop);
        return () => window.removeEventListener('resize', checkDesktop);
    }, []);


    useEffect(() => {
        setIsMounted(true);
        imageLayerRefs.current = imageLayerRefs.current.slice(0, howItWorksLayerImages.length);
        currentLayerTransY.current = howItWorksLayerImages.map(() => 0);
        layerVelocities.current = howItWorksLayerImages.map(() => 0);
        if (typeof window !== "undefined") {
            lastScrollY.current = window.pageYOffset;
        }
    }, []);

    useEffect(() => {
        if (!isMounted || typeof window === "undefined") return;
        const springConstant = 0.1; const dampingFactor = 0.75; const scrollDeltaThreshold = 1.5;
        const animateParallax = () => {
            if (!howItWorksSectionRef.current) { animationFrameId.current = requestAnimationFrame(animateParallax); return; }
            const currentScrollY = window.pageYOffset; const scrollDelta = currentScrollY - lastScrollY.current; lastScrollY.current = currentScrollY;
            howItWorksLayerImages.forEach((_, index) => {
                if (index === 0) { if (imageLayerRefs.current[index]) imageLayerRefs.current[index].style.transform = `translateY(0px)`; currentLayerTransY.current[index] = 0; layerVelocities.current[index] = 0; return; }
                const targetY = 0;
                if (Math.abs(scrollDelta) > scrollDeltaThreshold) {
                    const baseImpulseStrength = 0.022; const impulseReductionPerLayer = 0.0025;
                    const layerSpecificImpulseFactor = Math.max(0.005, baseImpulseStrength - (index * impulseReductionPerLayer));
                    const cappedScrollDelta = Math.sign(scrollDelta) * Math.min(Math.abs(scrollDelta), 50);
                    layerVelocities.current[index] -= cappedScrollDelta * layerSpecificImpulseFactor;
                }
                const displacement = targetY - currentLayerTransY.current[index]; const springForce = displacement * springConstant;
                layerVelocities.current[index] += springForce; layerVelocities.current[index] *= dampingFactor; currentLayerTransY.current[index] += layerVelocities.current[index];
                if (Math.abs(currentLayerTransY.current[index]) < 0.05 && Math.abs(layerVelocities.current[index]) < 0.05) { currentLayerTransY.current[index] = 0; layerVelocities.current[index] = 0; }
                const maxVisualOffsetBase = 2.5; const maxVisualOffsetPerLayer = 0.6; const maxOffsetForThisLayer = maxVisualOffsetBase + index * maxVisualOffsetPerLayer;
                currentLayerTransY.current[index] = Math.max(-maxOffsetForThisLayer, Math.min(maxOffsetForThisLayer, currentLayerTransY.current[index]));
                if (imageLayerRefs.current[index]) imageLayerRefs.current[index].style.transform = `translateY(${currentLayerTransY.current[index].toFixed(2)}px)`;
            });
            animationFrameId.current = requestAnimationFrame(animateParallax);
        };
        animationFrameId.current = requestAnimationFrame(animateParallax);
        return () => { if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current); };
    }, [isMounted]);

    useEffect(() => {
        if (location.hash && isMounted && typeof window !== "undefined") {
            const id = location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const headerEl = document.querySelector('header');
                    const pillNavEl = document.querySelector('nav.md\\:sticky');

                    let yOffset = 0;
                    const isMobileView = window.innerWidth < 768;

                    if (isMobileView && headerEl && getComputedStyle(headerEl).position === 'sticky') {
                        yOffset = headerEl.offsetHeight + 20;
                    } else if (!isMobileView && pillNavEl) {
                        const pillTop = parseFloat(getComputedStyle(pillNavEl).top) || 0;
                        const pillHeight = pillNavEl.offsetHeight || 0;
                        yOffset = pillTop + pillHeight + 20;
                    } else if (headerEl) {
                        yOffset = headerEl.offsetHeight + 20;
                    }

                    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
                    const scrollToPosition = elementTop - yOffset;
                    window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
                } else if (id === 'hero-section') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            }, 200);
        }
    }, [location.pathname, location.hash, isMounted]);

    const [formData, setFormData] = useState({ name: '', email: '', userType: '', tiktokHandle: '', websiteOrTiktok: '', message: '' });
    const [submissionStatus, setSubmissionStatus] = useState(null);

    const handleInputChange = (e) => { const { name, value } = e.target; setFormData(prevState => ({ ...prevState, [name]: value })); };
    const handleUserTypeChange = (e) => {
        const newUserType = e.target.value;
        setFormData(prevState => ({ ...prevState, userType: newUserType, tiktokHandle: newUserType === 'seller' ? '' : prevState.tiktokHandle, websiteOrTiktok: newUserType === 'creator' ? '' : prevState.websiteOrTiktok }));
    };
    const handleStartTodayClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/') { document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' }); }
        else { navigate('/#contact-form-section'); }
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); setSubmissionStatus('submitting'); const dataToSend = { ...formData };
        if (formData.userType === 'creator') delete dataToSend.websiteOrTiktok; else if (formData.userType === 'seller') delete dataToSend.tiktokHandle;
        try {
            const response = await fetch("https://formspree.io/f/mrbqbvvl", { method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(dataToSend) });
            if (response.ok) { setSubmissionStatus('success'); setFormData({ name: '', email: '', userType: '', tiktokHandle: '', websiteOrTiktok: '', message: '' }); setTimeout(() => setSubmissionStatus(null), 4000); }
            else { const errorData = await response.json().catch(() => ({})); const errorMessage = errorData.errors ? errorData.errors.map(err => `${err.field ? err.field + ': ' : ''}${err.message}`).join(', ') : 'An unknown error occurred.'; throw new Error(errorMessage); }
        } catch (error) { console.error("Form submission error:", error); setSubmissionStatus('error'); setTimeout(() => setSubmissionStatus(null), 6000); }
    };

    const heroImage2MobilePosition = 'bottom-16 left-[2%] w-[40vw] max-w-[170px] sm:left-[5%] sm:w-[35vw] sm:max-w-[200px]';
    const heroImage1MobilePosition = 'bottom-16 right-[2%] w-[35vw] max-w-[140px] sm:right-[5%] sm:w-[30vw] sm:max-w-[170px]';

    const heroImage1DesktopPosition = 'md:bottom-0 md:right-[10%] md:w-[22%] md:max-w-[260px] lg:right-[12%] lg:w-[18%] lg:max-w-[300px]';


    return (
        <>
            <main
                id="hero-section"
                ref={heroSectionRef}
                className={`relative flex flex-col items-center min-h-screen h-screen overflow-hidden fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''} px-4 sm:px-6 md:px-8 pb-24 sm:pb-28 md:pb-0`}
                style={{ animationDelay: '0.2s' }}
            >
                <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                    {heroIconsData.map((icon, index) => (
                        <img
                            key={`hero-icon-${index}`}
                            src={icon.src}
                            alt={icon.alt}
                            className={`floating-icon absolute ${icon.positionClasses}`}
                            style={{ animationDelay: icon.animationDelay }}
                            onError={(e) => { e.target.onerror = null; const sizeMatch = icon.positionClasses.match(/w-(\d+)/); const twUnit = sizeMatch ? parseInt(sizeMatch[1]) : 16; e.target.src = getPlaceholderUrl(twUnit*4, twUnit*4, 'Icon'); e.target.alt = `Platzhalter ${icon.alt}`; }}
                        />
                    ))}
                </div>
                <div
                    className="absolute left-1/2 w-full max-w-5xl text-center z-10 px-4"
                    style={{
                        top: '40%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <h1 className="text-[28px] leading-tight sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4">
                        <span className="block md:inline">We <span className="text-blue-600">Empower</span></span>
                        <span className="block md:inline"> Creator and drive <span className="text-blue-600">Growth</span></span>
                    </h1>
                    <p className="text-lg sm:text-xl md:text-3xl lg:text-4xl text-gray-600 mb-6 sm:mb-8 md:mb-10">
                        be <span className="text-blue-600 font-semibold">Yourself</span>, become a <span className="text-blue-600 font-semibold">Brand</span>
                    </p>
                    <a href="#contact-form-section" onClick={handleStartTodayClick}
                       className={`px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-4 text-sm sm:text-base md:text-lg rounded-full font-bold transition-all duration-300 ease-in-out transform hover:scale-105 bg-transparent text-blue-600 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 button-glow`}
                    > Start Today! </a>
                </div>
                <div className={`absolute z-20 
                                ${isDesktop ? 'md:top-[50%] md:left-[10%] md:w-[25%] md:max-w-[280px] lg:top-[45%] lg:left-[12%] lg:w-[20%] lg:max-w-[320px]' : heroImage2MobilePosition}
                                `}>
                    <img src={hero2ImageUrl} alt="Hero Frau Illustration" className="w-full h-auto object-contain"
                         onError={(e) => { e.target.onerror = null; e.target.src = getPlaceholderUrl(150, 225, 'Heldin'); e.target.alt = `Platzhalter Heroin`; }} />
                </div>
                <div className={`absolute z-5 
                                ${isDesktop ? heroImage1DesktopPosition : heroImage1MobilePosition}
                                `}>
                    <img src={heroImageUrl} alt="Hero Männchen Illustration" className="w-full h-auto object-contain"
                         onError={(e) => { e.target.onerror = null; e.target.src = getPlaceholderUrl(150,225,'Held'); e.target.alt = `Platzhalter Hero`; }} />
                </div>
            </main>

            <section
                id="how-it-works-section"
                ref={howItWorksSectionRef}
                className={`min-h-screen h-screen flex flex-col justify-center items-center bg-white relative fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''} px-4 sm:px-6 lg:px-8`}
                style={{ animationDelay: '0.3s' }}
            >
                <div className="max-w-6xl w-full">
                    <div className="text-center mb-10 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">How it Works</h2>
                        <p className="mt-3 md:mt-4 text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">Discover how our vision helps you achieve your goals.</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center md:space-x-12">
                        <div className="w-full md:w-1/2 mb-8 md:mb-0">
                            <div className="relative aspect-square max-w-[300px] sm:max-w-[350px] md:max-w-md mx-auto">
                                {howItWorksLayerImages.map((src, index) => (
                                    <img key={index} ref={el => imageLayerRefs.current[index] = el} src={src} alt={`Illustration Layer ${index + 1}`} className="absolute top-0 left-0 w-full h-full object-contain" style={{ zIndex: index }}
                                         onError={(e) => { e.target.onerror = null; e.target.src = getPlaceholderUrl(300,300,`Ebene ${index+1}`); e.target.alt = `Platzhalter Ebene ${index + 1}`; }} />
                                ))}
                                {howItWorksLayerImages.length === 0 && <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 rounded-lg"><p className="text-gray-500">Grafiken hier.</p></div>}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 text-gray-700 flex flex-col">
                            <div className="flex-grow">
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">Uniting Two Worlds</h3>
                                <p className="mb-4 text-sm md:text-base">We offer matchmaking services for both <span className="text-violet-700">sellers</span> and <span className="text-blue-600">creators</span> and assist <span className="text-violet-700">sellers</span> in distributing and promoting products through dedicated product campaign. Through our Partnership with TikTok-Shop we can efficiently reach a broad spectrum of <span className="text-violet-700">sellers</span> and <span className="text-blue-600">Creators</span>.</p>
                                <p className="mb-4 text-sm md:text-base">For our <strong className="text-blue-600">Creators:</strong> We foster a supportive network. We actively manage partnerships, protect their work, provide vital education, and offer dedicated support, empowering them to thrive and expand their brand.</p>
                                <p className="mb-4 text-sm md:text-base"><strong className="text-violet-700">Sellers:</strong> On the other hand we are partnered with different companies, especially e-commerce companies.</p>
                                <p className="text-sm md:text-base"><strong className="text-blue-600">Match</strong><strong className="text-violet-700">-up:</strong> <span className="text-blue-600">Creators</span> are basically Personal-Brands. They have a Story and a Way to communicate out there. <span className="text-violet-700">Sellers</span> need a good Story around their Product to drive Sales and growth. So lets bring this worlds together!</p>
                            </div>
                            <div className="mt-6 md:mt-8">
                                <a href="#contact-form-section" onClick={(e) => { e.preventDefault(); document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                                   className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base">Learn More Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                id="contact-form-section"
                className={`min-h-screen h-screen flex flex-col justify-center items-center fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''} px-4 sm:px-6 md:px-8`}
                style={{ animationDelay: '0.4s' }}
            >
                <div className="max-w-lg sm:max-w-xl w-full p-4 sm:p-6 md:p-8 bg-gray-50 rounded-xl shadow-2xl border border-gray-200">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-gray-900">Contact Us</h2>
                    {submissionStatus === 'success' && ( <div className="text-center p-3 md:p-4 mb-4 rounded-md bg-green-100 text-green-700 border border-green-300"> <h3 className="text-lg md:text-xl font-semibold">Thank You!</h3> <p className="text-sm md:text-base">Your message has been sent successfully.</p> </div> )}
                    {submissionStatus === 'error' && ( <div className="text-center p-3 md:p-4 mb-4 rounded-md bg-red-100 text-red-700 border border-red-300"> <h3 className="text-lg md:text-xl font-semibold">Error!</h3> <p className="text-sm md:text-base">Something went wrong. Please try again or contact us directly.</p> </div> )}
                    {submissionStatus !== 'success' && (
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div> <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Name</label> <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-sm sm:text-base" placeholder="Your Name" disabled={submissionStatus === 'submitting'} /> </div>
                            <div> <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label> <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-sm sm:text-base" placeholder="Your Email Address" disabled={submissionStatus === 'submitting'} /> </div>
                            <fieldset disabled={submissionStatus === 'submitting'} className="disabled:opacity-70">
                                <legend className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">I am...</legend>
                                <div className="flex items-center space-x-3 sm:space-x-4">
                                    <div className="flex items-center"> <input id="creator" name="userType" type="radio" value="creator" required checked={formData.userType === 'creator'} onChange={handleUserTypeChange} className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-600 border-gray-300 focus:ring-cyan-500 bg-white" /> <label htmlFor="creator" className="ml-1.5 sm:ml-2 block text-xs sm:text-sm text-gray-700">Creator</label> </div>
                                    <div className="flex items-center"> <input id="seller" name="userType" type="radio" value="seller" required checked={formData.userType === 'seller'} onChange={handleUserTypeChange} className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-600 border-gray-300 focus:ring-cyan-500 bg-white" /> <label htmlFor="seller" className="ml-1.5 sm:ml-2 block text-xs sm:text-sm text-gray-700">Seller</label> </div>
                                </div>
                                {!formData.userType && <p className="text-xs text-red-500 mt-1">Please select a type.</p>}
                            </fieldset>
                            {formData.userType === 'creator' && ( <div> <label htmlFor="tiktokHandle" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">TikTok @</label> <input type="text" name="tiktokHandle" id="tiktokHandle" required={formData.userType === 'creator'} value={formData.tiktokHandle} onChange={handleInputChange} className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-sm sm:text-base" placeholder="Your TikTok @ Handle" disabled={submissionStatus === 'submitting'} /> </div> )}
                            {formData.userType === 'seller' && ( <div> <label htmlFor="websiteOrTiktok" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">TikTok @ or Website</label> <input type="text" name="websiteOrTiktok" id="websiteOrTiktok" required={formData.userType === 'seller'} value={formData.websiteOrTiktok} onChange={handleInputChange} className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-sm sm:text-base" placeholder="Your TikTok @ or Website URL" disabled={submissionStatus === 'submitting'} /> </div> )}
                            <div> <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Message</label> <textarea name="message" id="message" rows={3} sm:rows={4} required value={formData.message} onChange={handleInputChange} className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-colors text-sm sm:text-base" placeholder="Your message to us..." disabled={submissionStatus === 'submitting'} /> </div>
                            <div> <button type="submit" className={`w-full px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed`} disabled={submissionStatus === 'submitting' || !formData.userType || !formData.name || !formData.email || !formData.message || (formData.userType === 'creator' && !formData.tiktokHandle) || (formData.userType === 'seller' && !formData.websiteOrTiktok)}> {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'} </button> </div>
                        </form>
                    )}
                </div>
            </section>
        </>
    );
};


// Main App Component
export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/creator" element={<CreatorPage />} />
                    <Route path="/seller" element={<SellerPage />} />
                    <Route path="*" element={
                        <div className="min-h-screen h-screen flex flex-col items-center justify-center text-center py-10 px-4">
                            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                            <p className="text-lg mb-6">The page you are looking for does not exist.</p>
                            <RouterLink to="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Go to Homepage
                            </RouterLink>
                        </div>
                    } />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
