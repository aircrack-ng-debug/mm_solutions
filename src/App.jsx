import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

// Pfade zu den Bildern
const logoUrl = 'src/images/Logo_mm_solutions.png'; // Stelle sicher, dass dieser Pfad korrekt ist oder ersetze ihn
const creatorImageUrl = 'src/images/Creator.png'; // Pfad zum Creator-Bild
const sellerImageUrl = 'src/images/Seller.png'; // Pfad zum Seller-Bild

// --- Deine Ebenen-Bilder für "How it Works" ---
const howItWorksLayerImages = [
    'src/images/layer_1.png',
    'src/images/layer_2.png',
    'src/images/layer_3.png',
    'src/images/layer_4.png',
    'src/images/layer_5.png',
    'src/images/layer_6.png',
    'src/images/layer_7.png',
    'src/images/layer_8.png',
];
// --- Ende ---


// Placeholder-Seiten für Creator und Seller
const CreatorPage = () => (
    <div className="flex-grow flex flex-col items-center justify-start text-gray-800 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
                For Creators
            </h1>
            {/* Flex-Container für Bild und Text, items-stretch sorgt für gleiche Höhe auf md+ */}
            <div className="flex flex-col md:flex-row md:items-stretch md:space-x-8 lg:space-x-12">
                {/* Linke Spalte: Bild */}
                <div className="w-full md:w-5/12 lg:w-1/2 mb-8 md:mb-0 flex justify-center items-center"> {/* md:w-5/12 für etwas weniger Breite, items-center hinzugefügt */}
                    <div className="relative aspect-square max-w-sm w-full md:max-w-full"> {/* max-w-sm für kleinere Bildgröße, md:max-w-full für Flexibilität */}
                        <img
                            src={creatorImageUrl}
                            alt="Creator Illustration"
                            className="absolute top-0 left-0 w-full h-full object-contain rounded-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://placehold.co/500x500/e0e0e0/757575?text=Creator+Image`;
                                e.target.alt = `Placeholder for Creator Image`;
                            }}
                        />
                    </div>
                </div>

                {/* Rechte Spalte: Text */}
                {/* Flex-Container für Text, um Button unten zu halten */}
                <div className="w-full md:w-7/12 lg:w-1/2 text-gray-700 flex flex-col justify-between"> {/* md:w-7/12, flex flex-col justify-between */}
                    <div> {/* Wrapper für den oberen Textinhalt */}
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-5">
                            Become Part of Our Community
                        </h2>
                        {/* Textgröße hier angepasst */}
                        <p className="mb-4 text-sm sm:text-base">
                            As a creator, you tell stories. You have a face, a community, and you know how to communicate on social media. Sellers, especially in e-commerce, often find themselves working behind the scenes of their shops. They need creators to market their products. The question often arises: "But which creators are the right fit for my product?". This is where M&M Solutions comes in. We provide the tools and the network to set up targeted marketing campaigns, efficiently connecting creators and products.
                        </p>
                        {/* Textgröße hier angepasst */}
                        <p className="mb-4 text-sm sm:text-base">
                            As a creator, you'll find several advantages here:
                        </p>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mt-5 mb-3">Benefits for Creators:</h3>
                        <ul className="list-disc list-inside pl-4 space-y-2 mb-5 text-sm sm:text-base">
                            <li>
                                <strong>Access to diverse and often carefully curated product ranges:</strong> Campaigns offer creators the opportunity to discover a wide selection of products and sellers. This makes it easier for them to find and present thematically relevant and in-demand items for their content.
                            </li>
                            <li>
                                <strong>Flexible cooperation models and attractive, performance-based earning opportunities:</strong> Through campaigns, creators can generate individual affiliate links for products. For every sale made via these links, they receive a commission, enabling direct monetization of their reach and content.
                            </li>
                        </ul>
                    </div>
                    <div className="mt-auto"> {/* Sorgt dafür, dass der Button unten bleibt */}
                        <RouterLink
                            to="/#contact-form-section"
                            className="inline-block px-7 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-base sm:text-lg"
                        >
                            Contact Us Now
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-10 md:mt-16 text-center">
            <RouterLink to="/" className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 text-sm sm:text-base">
                Back to Homepage
            </RouterLink>
        </div>
    </div>
);


const SellerPage = () => (
    <div className="flex-grow flex flex-col items-center justify-start text-gray-800 py-8 md:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
                For Sellers: Maximize Your Growth with M&M Solutions
            </h1>
            <div className="flex flex-col md:flex-row-reverse md:items-stretch md:space-x-8 md:space-x-reverse lg:space-x-12 lg:space-x-reverse">
                <div className="w-full md:w-5/12 lg:w-1/2 mb-8 md:mb-0 flex justify-center items-center">
                    <div className="relative aspect-square max-w-sm w-full md:max-w-full">
                        <img
                            src={sellerImageUrl}
                            alt="Seller Illustration"
                            className="absolute top-0 left-0 w-full h-full object-contain rounded-lg"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://placehold.co/500x500/e0e0e0/757575?text=Seller+Image`;
                                e.target.alt = `Placeholder for Seller Image`;
                            }}
                        />
                    </div>
                </div>
                <div className="w-full md:w-7/12 lg:w-1/2 text-gray-700 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
                            Why Partner with M&M Solutions?
                        </h2>
                        <p className="text-sm sm:text-base mb-4 text-gray-600 italic">
                            Official TikTok Shop Partner: Unlock Exclusive Insights & Optimized Strategies.
                        </p>

                        <p className="mb-3 text-base sm:text-lg">
                            As official TikTok Shop partners, we provide unique insights into creator performance and product trends, forming the bedrock of our success. We meticulously vet creators for your brand and ensure only high-quality, authenticated products reach our network.
                        </p>
                        <p className="mb-3 text-base sm:text-lg">
                            Our expertise lies in crafting high-impact marketing campaigns, both locally and globally. By leveraging our extensive creator network for exclusive promotions, we can amplify your product's reach, boost viral potential, and significantly drive sales.
                        </p>
                        <p className="mb-5 text-base sm:text-lg">
                            Experience streamlined marketing with direct access to perfectly matched creators. This targeted exposure through authentic voices enhances visibility and skyrockets sales potential—a true win-win for sellers and creators alike.
                        </p>

                        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mt-6 mb-3">Your Advantages at a Glance:</h3>
                        <ul className="list-disc list-inside pl-4 space-y-2 mb-5 text-sm sm:text-base">
                            <li>
                                <strong>Exclusive TikTok Shop Insights:</strong> Benefit from our direct partnership and data-driven strategies.
                            </li>
                            <li>
                                <strong>Curated Creator Network:</strong> Access vetted influencers perfectly aligned with your brand.
                            </li>
                            <li>
                                <strong>Efficient Global Campaigns:</strong> We plan, manage, and optimize for maximum impact.
                            </li>
                            <li>
                                <strong>Viral Reach Potential:</strong> Amplify brand awareness and sales via coordinated efforts.
                            </li>
                            <li>
                                <strong>Quality Assurance:</strong> We ensure product and creator authenticity for credible marketing.
                            </li>
                            <li>
                                <strong>True Win-Win Partnership:</strong> Effective promotion for you, valuable opportunities for creators.
                            </li>
                        </ul>
                    </div>
                    <div className="mt-auto">
                        <RouterLink
                            to="/#contact-form-section"
                            className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-base sm:text-lg shadow-md hover:shadow-lg transform hover:scale-105"
                        >
                            Elevate Your Brand Today!
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-10 md:mt-16 text-center">
            <RouterLink to="/" className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 text-sm sm:text-base">
                Back to Homepage
            </RouterLink>
        </div>
    </div>
);


// Haupt-Layout Komponente
const Layout = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const pillNavRef = useRef(null);

    const [pillStickyOffset, setPillStickyOffset] = useState(8);
    const [pillMarginTop, setPillMarginTop] = useState(0);
    const [contentWrapperPadding, setContentWrapperPadding] = useState(24);
    const [pillActualHeight, setPillActualHeight] = useState(40);
    const [activeNavHash, setActiveNavHash] = useState('');

    // Scroll to top on page change (excluding hash changes on the same page)
    useEffect(() => {
        if (typeof window !== "undefined") {
            // Only scroll to top if the pathname changes, not just the hash
            if (location.pathname !== (Layout._lastPathname || '')) {
                window.scrollTo(0, 0);
            }
            Layout._lastPathname = location.pathname;
        }
    }, [location.pathname]);
    Layout._lastPathname = ''; // Initialize static variable


    useEffect(() => {
        setIsMounted(true);
        // Set initial active hash based on URL
        if (location.pathname === '/') {
            setActiveNavHash(location.hash || '#hero-section');
        } else {
            setActiveNavHash(''); // Clear for other pages
        }
    }, [location.pathname, location.hash]); // location.hash dependency ensures this runs if only hash changes


    useEffect(() => {
        const calculateLayoutParameters = () => {
            if (headerRef.current && pillNavRef.current) {
                const headerElement = headerRef.current;
                const pillElement = pillNavRef.current;
                const currentHeaderHeight = headerElement.offsetHeight;
                const currentPillHeight = pillElement.offsetHeight;
                setPillActualHeight(currentPillHeight);
                let calculatedStickyOffset = (currentHeaderHeight / 2) - (currentPillHeight / 2);
                calculatedStickyOffset = Math.max(8, calculatedStickyOffset);
                setPillStickyOffset(calculatedStickyOffset);
                const marginTopForPill = calculatedStickyOffset - currentHeaderHeight;
                setPillMarginTop(marginTopForPill);
                const buffer = 24;
                setContentWrapperPadding(buffer);
            }
        };

        if (isMounted) {
            // RAF for initial calculation and keep recalculating for dynamic content changes
            let frameId = requestAnimationFrame(function rafCallback() {
                calculateLayoutParameters();
                frameId = requestAnimationFrame(rafCallback);
            });
            window.addEventListener('resize', calculateLayoutParameters);
            return () => {
                cancelAnimationFrame(frameId);
                window.removeEventListener('resize', calculateLayoutParameters);
            };
        }
    }, [isMounted]);

    useEffect(() => {
        if (!isMounted || typeof window === "undefined") return;

        const handleScroll = () => {
            if (location.pathname !== '/') {
                return;
            }

            const heroSection = document.getElementById('hero-section');
            const howItWorksSection = document.getElementById('how-it-works-section');

            const navPillHeight = pillNavRef.current ? pillNavRef.current.offsetHeight : 50;
            const scrollOffset = navPillHeight + pillStickyOffset + 40; // Increased buffer slightly for better UX

            const currentScrollY = window.pageYOffset;

            if (howItWorksSection && heroSection) {
                // Check how-it-works section first as it's lower on the page
                if (currentScrollY >= (howItWorksSection.offsetTop - scrollOffset)) {
                    setActiveNavHash('#how-it-works-section');
                } else if (currentScrollY >= (heroSection.offsetTop - scrollOffset) ) {
                    setActiveNavHash('#hero-section');
                } else if (currentScrollY < (heroSection.offsetTop - scrollOffset)) { // Explicitly check if above hero
                    setActiveNavHash('#hero-section');
                }
            } else if (heroSection) {
                setActiveNavHash('#hero-section');
            }
        };

        if (location.pathname === '/') {
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname, pillStickyOffset, pillNavRef, isMounted]);


    const handleContactScroll = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/#contact-form-section');
        }
    };

    const navLinkBaseClasses = "block px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out rounded-full";
    const activeNavLinkClasses = "bg-blue-600 text-white shadow-sm";
    const inactiveNavLinkClasses = "text-gray-600 hover:bg-gray-200 hover:text-gray-800";

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const yOffset = -( (pillNavRef.current?.offsetHeight || 50) + pillStickyOffset + 20 );
            const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({top: y, behavior: 'smooth'});
        } else if (sectionId === 'hero-section') {
            window.scrollTo({top: 0, behavior: 'smooth'});
        }
    };

    const handleScrollToSectionClick = (e, sectionId) => {
        e.preventDefault();
        const targetHash = `#${sectionId}`;

        if (location.pathname === '/') {
            setActiveNavHash(targetHash);
            scrollToSection(sectionId);
        } else {
            navigate(`/${targetHash}`);
        }
    };


    return (
        <>
            <style>{`
              body { background-color: #FFFFFF; color: #1f2937; font-family: 'Inter', sans-serif; margin: 0; overflow-x: hidden; }
              html { scroll-behavior: smooth; }
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
                    className={`bg-white flex justify-start items-center py-3 px-4 sm:px-6 md:px-8 fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''} z-30`} // Changed justify-center to justify-start
                >
                    <RouterLink to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0"> {/* Added flex-shrink-0 back */}
                        <div className="logo-cube-container">
                            <div className="logo-cube">
                                <div className="logo-cube-face logo-cube-front">
                                    <img src={logoUrl} alt="Firmenlogo M&M" onError={(e) => e.target.src = 'https://placehold.co/40x40/eeeeee/999999?text=M&M'} />
                                </div>
                                <div className="logo-cube-face logo-cube-back">M&M</div>
                            </div>
                        </div>
                        <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700">SOLUTIONS</span>
                    </RouterLink>
                    {/* Contact Button removed */}
                </header>

                <nav
                    ref={pillNavRef}
                    className={`sticky z-40 w-full flex justify-center py-2 fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''}`}
                    style={{
                        top: `${pillStickyOffset}px`,
                        marginTop: `${pillMarginTop}px`,
                        animationDelay: '0.1s',
                    }}
                >
                    <div
                        className="flex items-center justify-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-gray-100 text-gray-700 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg"
                    >
                        <a
                            href="/#hero-section"
                            onClick={(e) => handleScrollToSectionClick(e, 'hero-section')}
                            className={`${navLinkBaseClasses} ${ (location.pathname === '/' && (activeNavHash === '#hero-section' || activeNavHash === '')) ? activeNavLinkClasses : inactiveNavLinkClasses}`}
                        >
                            Home
                        </a>
                        <a
                            href="/#how-it-works-section"
                            onClick={(e) => handleScrollToSectionClick(e, 'how-it-works-section')}
                            className={`${navLinkBaseClasses} ${ (location.pathname === '/' && activeNavHash === '#how-it-works-section') ? activeNavLinkClasses : inactiveNavLinkClasses}`}
                        >
                            How it Works
                        </a>
                        <RouterLink
                            to="/creator"
                            className={`${navLinkBaseClasses} ${location.pathname === '/creator' ? activeNavLinkClasses : inactiveNavLinkClasses}`}
                            onClick={() => setActiveNavHash('')}
                        >
                            Creator
                        </RouterLink>
                        <RouterLink
                            to="/seller"
                            className={`${navLinkBaseClasses} ${location.pathname === '/seller' ? activeNavLinkClasses : inactiveNavLinkClasses}`}
                            onClick={() => setActiveNavHash('')}
                        >
                            Seller
                        </RouterLink>
                        <RouterLink
                            to="/about"
                            className={`${navLinkBaseClasses} ${location.pathname === '/about' ? activeNavLinkClasses : inactiveNavLinkClasses}`}
                            onClick={() => setActiveNavHash('')}
                        >
                            About Us
                        </RouterLink>
                    </div>
                </nav>

                <div
                    className="flex-grow px-4 sm:px-6 md:px-8"
                    style={{ paddingTop: `${contentWrapperPadding}px` }}
                >
                    {children}
                </div>

                <footer
                    className={`text-center py-8 border-t border-gray-200 fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''} px-4 sm:px-6 md:px-8`}
                    style={{ animationDelay: '0.6s' }}
                >
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} M&M Solutions. All rights reserved.
                    </p>
                </footer>
            </div>
        </>
    );
};

// Komponente für die Homepage
const HomePage = () => {
    const [isMounted, setIsMounted] = useState(false);
    const location = useLocation();
    const heroSectionRef = useRef(null);
    const [heroMinHeight, setHeroMinHeight] = useState('auto');

    const howItWorksSectionRef = useRef(null);
    const imageLayerRefs = useRef([]);
    const currentLayerTransY = useRef(howItWorksLayerImages.map(() => 0));
    const animationFrameId = useRef(null);
    const layerVelocities = useRef(howItWorksLayerImages.map(() => 0));
    const lastScrollY = useRef(0);

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
        const calculateHeroHeight = () => {
            if (heroSectionRef.current) {
                const topOffset = heroSectionRef.current.getBoundingClientRect().top;
                const calculatedMinHeight = window.innerHeight - topOffset;
                setHeroMinHeight(`${Math.max(0, calculatedMinHeight)}px`);
            }
        };
        const handleResize = () => {
            calculateHeroHeight();
        };

        if (isMounted) {
            calculateHeroHeight();
            const timeoutId = setTimeout(calculateHeroHeight, 100);
            window.addEventListener('resize', handleResize);
            return () => {
                clearTimeout(timeoutId);
                window.removeEventListener('resize', handleResize);
            };
        }
    }, [isMounted]);

    useEffect(() => {
        if (!isMounted || typeof window === "undefined") return;

        const springConstant = 0.1;
        const dampingFactor = 0.75;
        const scrollDeltaThreshold = 1.5;

        const animateParallax = () => {
            if (!howItWorksSectionRef.current) {
                animationFrameId.current = requestAnimationFrame(animateParallax);
                return;
            }

            const currentScrollY = window.pageYOffset;
            const scrollDelta = currentScrollY - lastScrollY.current;
            lastScrollY.current = currentScrollY;

            howItWorksLayerImages.forEach((_, index) => {
                if (index === 0) {
                    if (imageLayerRefs.current[index]) {
                        imageLayerRefs.current[index].style.transform = `translateY(0px)`;
                    }
                    currentLayerTransY.current[index] = 0;
                    layerVelocities.current[index] = 0;
                    return;
                }

                const targetY = 0;

                if (Math.abs(scrollDelta) > scrollDeltaThreshold) {
                    const baseImpulseStrength = 0.022;
                    const impulseReductionPerLayer = 0.0025;
                    const layerSpecificImpulseFactor = Math.max(0.005, baseImpulseStrength - (index * impulseReductionPerLayer));
                    const cappedScrollDelta = Math.sign(scrollDelta) * Math.min(Math.abs(scrollDelta), 50);
                    layerVelocities.current[index] -= cappedScrollDelta * layerSpecificImpulseFactor;
                }

                const displacement = targetY - currentLayerTransY.current[index];
                const springForce = displacement * springConstant;
                layerVelocities.current[index] += springForce;
                layerVelocities.current[index] *= dampingFactor;
                currentLayerTransY.current[index] += layerVelocities.current[index];

                if (Math.abs(currentLayerTransY.current[index]) < 0.05 && Math.abs(layerVelocities.current[index]) < 0.05) {
                    currentLayerTransY.current[index] = 0;
                    layerVelocities.current[index] = 0;
                }

                const maxVisualOffsetBase = 2.5;
                const maxVisualOffsetPerLayer = 0.6;
                const maxOffsetForThisLayer = maxVisualOffsetBase + index * maxVisualOffsetPerLayer;
                currentLayerTransY.current[index] = Math.max(-maxOffsetForThisLayer, Math.min(maxOffsetForThisLayer, currentLayerTransY.current[index]));

                if (imageLayerRefs.current[index]) {
                    imageLayerRefs.current[index].style.transform = `translateY(${currentLayerTransY.current[index].toFixed(2)}px)`;
                }
            });

            animationFrameId.current = requestAnimationFrame(animateParallax);
        };

        animationFrameId.current = requestAnimationFrame(animateParallax);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [isMounted]);

    useEffect(() => {
        if (location.hash && isMounted && typeof window !== "undefined") {
            const id = location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    const pillNavElement = document.querySelector('nav[class*="sticky"]');
                    const pillNavHeight = pillNavElement?.offsetHeight || 50;
                    const pillNavTop = pillNavElement ? parseFloat(getComputedStyle(pillNavElement).top) : 8;

                    const headerOffset = pillNavHeight + pillNavTop + 20;

                    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                } else if (id === 'hero-section') {
                    window.scrollTo({top: 0, behavior: 'smooth'});
                }
            }, 100);
        }
    }, [location.pathname, location.hash, isMounted]);


    const [formData, setFormData] = useState({
        name: '', email: '', userType: '', tiktokHandle: '', websiteOrTiktok: '', message: ''
    });
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUserTypeChange = (e) => {
        const newUserType = e.target.value;
        setFormData(prevState => ({
            ...prevState, userType: newUserType,
            tiktokHandle: newUserType === 'seller' ? '' : prevState.tiktokHandle,
            websiteOrTiktok: newUserType === 'creator' ? '' : prevState.websiteOrTiktok
        }));
    };

    const handleStartTodayClick = (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
            document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/#contact-form-section');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmissionStatus('submitting');
        const dataToSend = { ...formData };
        if (formData.userType === 'creator') delete dataToSend.websiteOrTiktok;
        else if (formData.userType === 'seller') delete dataToSend.tiktokHandle;

        try {
            const response = await fetch("https://formspree.io/f/mrbqbvvl", {
                method: 'POST', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSend)
            });
            if (response.ok) {
                setSubmissionStatus('success');
                setFormData({ name: '', email: '', userType: '', tiktokHandle: '', websiteOrTiktok: '', message: '' });
                setTimeout(() => setSubmissionStatus(null), 4000);
            } else {
                const errorData = await response.json().catch(() => ({}));
                const errorMessage = errorData.errors ? errorData.errors.map(err => `${err.field ? err.field + ': ' : ''}${err.message}`).join(', ') : 'An unknown error occurred.';
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setSubmissionStatus('error');
            setTimeout(() => setSubmissionStatus(null), 6000);
        }
    };

    return (
        <>
            <main
                id="hero-section"
                ref={heroSectionRef}
                className={`relative flex flex-grow flex-col items-center justify-center text-center fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''}`}
                style={{
                    minHeight: heroMinHeight,
                    animationDelay: '0.2s',
                }}
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
                    We <span className="text-blue-600">Empower</span> <span className="text-gray-800">Creator</span> and drive <span className="text-blue-600">Growth</span>
                </h1>
                <p className="text-2xl sm:text-3xl md:text-4xl text-gray-600 mb-10">
                    be <span className="text-blue-600 font-semibold">Yourself</span>, become a <span className="text-blue-600 font-semibold">Brand</span>
                </p>
                <a href="#contact-form-section" onClick={handleStartTodayClick}
                   className={`px-8 py-3 sm:px-10 sm:py-4 text-base sm:text-lg rounded-full font-bold transition-all duration-300 ease-in-out transform hover:scale-105 bg-transparent text-blue-600 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 button-glow`}
                > Start Today! </a>
            </main>

            <section
                id="how-it-works-section"
                ref={howItWorksSectionRef}
                className={`py-16 md:py-24 bg-white relative overflow-hidden fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''}`}
                style={{ animationDelay: '0.3s' }}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                            How it Works
                        </h2>
                        <p className="mt-4 text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
                            Discover how our vision helps you achieve your goals.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:space-x-12">
                        <div className="w-full md:w-1/2 mb-10 md:mb-0">
                            <div className="relative aspect-square max-w-md mx-auto">
                                {howItWorksLayerImages.map((src, index) => (
                                    <img
                                        key={index}
                                        ref={el => imageLayerRefs.current[index] = el}
                                        src={src}
                                        alt={`Illustration Layer ${index + 1}`}
                                        className="absolute top-0 left-0 w-full h-full object-contain"
                                        style={{ zIndex: index }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = `https://placehold.co/600x600/e0e0e0/757575?text=Layer+${index+1}+missing`;
                                            e.target.alt = `Placeholder for Layer ${index + 1}`;
                                        }}
                                    />
                                ))}
                                {howItWorksLayerImages.length === 0 && (
                                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                                        <p className="text-gray-500">Graphics will be displayed here.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 text-gray-700 flex flex-col">
                            <div className="flex-grow">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Uniting Two Worlds</h3>
                                <p className="mb-6">
                                    We offer matchmaking services for both <span className="text-violet-700">sellers</span> and <span className="text-blue-600">creators</span> and assist <span className="text-violet-700">sellers</span> in distributing and promoting products through dedicated product campaign. Through our Partnership with TikTok-Shop we can efficiently reach a broad spectrum of <span className="text-violet-700">sellers</span> and <span className="text-blue-600">Creators</span>.
                                </p>
                                <div className="mb-6">
                                    <p> {/* Changed from p + ul to a single p */}
                                        For our <strong className="text-blue-600">Creators:</strong> We foster a supportive network. We actively manage partnerships, protect their work, provide vital education, and offer dedicated support, empowering them to thrive and expand their brand.
                                    </p>
                                </div>
                                <div className="mb-6">
                                    <p><strong className="text-violet-700">Sellers:</strong> On the other hand we are partnered with different companies, especially e-commerce companies.</p>
                                </div>
                                <div>
                                    <p>
                                        <strong className="text-blue-600">Match</strong><strong className="text-violet-700">-up:</strong> <span className="text-blue-600">Creators</span> are basically Personal-Brands. They have a Story and a Way to communicate out there. <span className="text-violet-700">Sellers</span> need a good Story around their Product to drive Sales and growth. So lets bring this worlds together!
                                    </p>
                                </div>
                            </div>
                            <div className="mt-6 md:mt-8">
                                <a
                                    href="#contact-form-section"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                >
                                    Learn More Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact-form-section" className={`py-16 md:py-24 fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''}`} style={{ animationDelay: '0.4s' }}>
                <div className="max-w-xl mx-auto p-6 sm:p-8 bg-gray-50 rounded-xl shadow-2xl border border-gray-200">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-gray-900">Contact Us</h2>
                    {submissionStatus === 'success' && ( <div className="text-center p-4 mb-4 rounded-md bg-green-100 text-green-700 border border-green-300"> <h3 className="text-xl font-semibold">Thank You!</h3> <p>Your message has been sent successfully.</p> </div> )}
                    {submissionStatus === 'error' && ( <div className="text-center p-4 mb-4 rounded-md bg-red-100 text-red-700 border border-red-300"> <h3 className="text-xl font-semibold">Error!</h3> <p>Something went wrong. Please try again or contact us directly.</p> </div> )}
                    {submissionStatus !== 'success' && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div> <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label> <input type="text" name="name" id="name" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" placeholder="Your Name" disabled={submissionStatus === 'submitting'} /> </div>
                            <div> <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label> <input type="email" name="email" id="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" placeholder="Your Email Address" disabled={submissionStatus === 'submitting'} /> </div>
                            <fieldset disabled={submissionStatus === 'submitting'} className="disabled:opacity-70">
                                <legend className="block text-sm font-medium text-gray-700 mb-2">I am...</legend>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center"> <input id="creator" name="userType" type="radio" value="creator" required checked={formData.userType === 'creator'} onChange={handleUserTypeChange} className="h-4 w-4 text-cyan-600 border-gray-300 focus:ring-cyan-500 bg-white" /> <label htmlFor="creator" className="ml-2 block text-sm text-gray-700">Creator</label> </div>
                                    <div className="flex items-center"> <input id="seller" name="userType" type="radio" value="seller" required checked={formData.userType === 'seller'} onChange={handleUserTypeChange} className="h-4 w-4 text-cyan-600 border-gray-300 focus:ring-cyan-500 bg-white" /> <label htmlFor="seller" className="ml-2 block text-sm text-gray-700">Seller</label> </div>
                                </div>
                                {!formData.userType && <p className="text-xs text-red-500 mt-1">Please select a type.</p>}
                            </fieldset>
                            {formData.userType === 'creator' && ( <div> <label htmlFor="tiktokHandle" className="block text-sm font-medium text-gray-700 mb-1">TikTok @</label> <input type="text" name="tiktokHandle" id="tiktokHandle" required={formData.userType === 'creator'} value={formData.tiktokHandle} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" placeholder="Your TikTok @ Handle" disabled={submissionStatus === 'submitting'} /> </div> )}
                            {formData.userType === 'seller' && ( <div> <label htmlFor="websiteOrTiktok" className="block text-sm font-medium text-gray-700 mb-1">TikTok @ or Website</label> <input type="text" name="websiteOrTiktok" id="websiteOrTiktok" required={formData.userType === 'seller'} value={formData.websiteOrTiktok} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" placeholder="Your TikTok @ or Website URL" disabled={submissionStatus === 'submitting'} /> </div> )}
                            <div> <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label> <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-cyan-500 focus:border-cyan-500 transition-colors" placeholder="Your message to us..." disabled={submissionStatus === 'submitting'} /> </div>
                            <div> <button type="submit" className={`w-full px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300 ease-in-out bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-600 hover:to-purple-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed`} disabled={submissionStatus === 'submitting' || !formData.userType || !formData.name || !formData.email || !formData.message || (formData.userType === 'creator' && !formData.tiktokHandle) || (formData.userType === 'seller' && !formData.websiteOrTiktok)}> {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'} </button> </div>
                        </form>
                    )}
                </div>
            </section>
        </>
    );
};

const AboutPage = () => (
    <div className="flex-grow flex flex-col items-center justify-start text-gray-800 py-8 md:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center"> {/* Adjusted max-width and added text-center for content */}
            <h1 className="text-4xl font-bold mb-8">About Us</h1>
            <div className="text-left space-y-4 text-base sm:text-lg text-gray-700"> {/* Container for paragraphs with left alignment and spacing */}
                <p>
                    Hello! We are Maurice & Marius, two computer scientists with a specialization in cyber-security,
                    who have taken the leap into entrepreneurship. Our mission is to act as a dynamic interface
                    between talented creators and innovative sellers on TikTok Shop.
                </p>
                <p>
                    As official TikTok Shop affiliate partners, we manage targeted marketing campaigns to effectively
                    promote products and services, driving sales. Our tech-savviness and deep understanding of the
                    e-commerce and media landscape empower us to actively shape the digital transformation, leveraging
                    our technical and social skills to add significant value.
                </p>
                <p>
                    We are committed to fostering serious, transparent, and sustainable collaborations.
                    Our focus isn't on quick sales, but on building a robust, reliable creator network founded on
                    trust and mutual support. We believe in nurturing long-term partnerships where both creators
                    and sellers can thrive.
                </p>
                <p>
                    We would be delighted to welcome you to our network and look forward to achieving success together.
                    Please feel free to reach out!
                </p>
                <p className="mt-6 text-center text-gray-600">
                    Best regards,
                    <br />
                    Maurice & Marius
                </p>
            </div>
            <p className="text-md text-gray-500 mt-10 mb-8"> {/* Adjusted margin for spacing */}
                Based in Stuttgart, Germany 🇩🇪
            </p>
        </div>
        <div className="mt-0 md:mt-4 text-center"> {/* Reduced top margin for the button */}
            <RouterLink to="/" className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 text-sm sm:text-base">
                Back to Homepage
            </RouterLink>
        </div>
    </div>
);

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/creator" element={<CreatorPage />} />
                    <Route path="/seller" element={<SellerPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    )}