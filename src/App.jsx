// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link as RouterLink, useLocation, useNavigate, Navigate } from 'react-router-dom';

// Importiere die Page-Komponenten
import HomePage from './pages/HomePage';
import CreatorPage from './pages/CreatorPage';
import SellerPage from './pages/SellerPage';
import AboutPage from './pages/AboutPage';
import ImpressumPage from './pages/ImpressumPage';

// Globale Konstanten und Hilfsfunktionen
const logoUrl = '/images/Logo_mm_solutions.png'; // Für das Logo im Header
const getPlaceholderUrl = (width, height, text) => `https://placehold.co/${width}x${height}/e0e0e0/757575?text=${encodeURIComponent(text)}`; // Wird im Layout für Fallback-Logo verwendet


// --- Komponenten ---

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

// Mobile Menu Overlay Component (angepasst für /home Logik)
const MobileMenu = ({ isOpen, onClose, navLinks, handleContactScroll, location, activeNavHash, setActiveNavHash, navigate }) => {
    if (!isOpen) return null;

    const linkBaseClasses = "block py-3 px-4 text-xl font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 rounded-md transition-colors duration-150"; //
    const activeLinkClasses = "bg-blue-100 text-blue-600"; //

    const handleMobileLinkClick = (e, link) => {
        e.preventDefault();
        if (link.isContact) {
            handleContactScroll(e); // `handleContactScroll` ist bereits für /home angepasst
        } else if (link.isRouterLink) {
            navigate(link.href);
            setActiveNavHash('');
        } else { // Hash links
            const targetHash = link.href;
            if (location.pathname === '/home') { // Wenn bereits auf /home
                setActiveNavHash(targetHash);
                const sectionId = targetHash.substring(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    const headerEl = document.querySelector('header.sticky');
                    const headerOffset = headerEl ? headerEl.offsetHeight + 20 : 70; //
                    const y = section.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                } else if (targetHash === '#hero-section') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } else { // Wenn nicht auf /home, zu /home + hash navigieren
                navigate(`/home${targetHash}`);
            }
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center p-6 md:hidden"> {/* */}
            <nav className="flex flex-col space-y-4 w-full max-w-xs text-center"> {/* */}
                {navLinks.map(link => (
                    <a
                        key={link.id}
                        href={link.isRouterLink ? link.href : (location.pathname === '/home' && link.href.startsWith('#') ? link.href : `/home${link.href}`)} // Korrekter href für "Open in new tab"
                        onClick={(e) => handleMobileLinkClick(e, link)}
                        className={`${linkBaseClasses} ${
                            link.isContact ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' : //
                                (link.isRouterLink && location.pathname === link.href) ||
                                (!link.isRouterLink && location.pathname === '/home' && activeNavHash === link.href) // Aktiv-Logik für /home
                                    ? activeLinkClasses : ''
                        }`}
                    >
                        {link.label}
                    </a>
                ))}
            </nav>
            <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2 text-gray-600 hover:text-gray-800" //
                aria-label="Menü schließen"
            >
                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"> {/* */}
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};


// Main Layout Component (angepasst für /home Logik)
const Layout = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false); //
    const location = useLocation();
    const navigate = useNavigate();
    const headerRef = useRef(null); //
    const pillNavRef = useRef(null); //

    const [activeNavHash, setActiveNavHash] = useState(''); //
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); //

    const [headerHeight, setHeaderHeight] = useState(0); //
    const [pillNavHeight, setPillNavHeight] = useState(0); //
    const [pillStickyOffset, setPillStickyOffset] = useState(8); //
    const [pillMarginTop, setPillMarginTop] = useState(0); //

    useEffect(() => { //
        if (typeof window !== "undefined") {
            if (location.pathname !== (Layout._lastPathname || '')) {
                window.scrollTo(0, 0);
            }
            Layout._lastPathname = location.pathname;
        }
    }, [location.pathname]);
    Layout._lastPathname = '';

    useEffect(() => { //
        setIsMounted(true);
        if (location.pathname === '/home') { // Geändert für /home
            setActiveNavHash(location.hash || '#hero-section');
        } else {
            setActiveNavHash('');
        }
    }, [location.pathname, location.hash]);

    useEffect(() => { //
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

    useEffect(() => { //
        if (!isMounted || typeof window === "undefined") return;

        const handleScroll = () => {
            if (location.pathname !== '/home') return; // Geändert für /home

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

        if (location.pathname === '/home') { // Geändert für /home
            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        }
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname, headerHeight, pillNavHeight, pillStickyOffset, isMounted]);


    const handleContactScroll = (e) => { //
        e.preventDefault();
        setIsMobileMenuOpen(false);
        if (location.pathname === '/home') { // Geändert für /home
            document.getElementById('contact-form-section')?.scrollIntoView({ behavior: 'smooth' });
        } else {
            navigate('/home#contact-form-section');
        }
    };

    const navLinkBaseClasses = "block px-3 py-1.5 text-xs sm:text-sm font-medium transition-all duration-200 ease-in-out rounded-full"; //
    const activeNavLinkClasses = "bg-blue-600 text-white shadow-sm"; //
    const inactiveNavLinkClasses = "text-gray-600 hover:bg-gray-200 hover:text-gray-800"; //

    const scrollToSectionHandler = (sectionId) => { //
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

    const handlePillNavLinkClick = (e, link) => { //
        e.preventDefault();
        setIsMobileMenuOpen(false);
        if (link.isRouterLink) {
            navigate(link.href);
            setActiveNavHash('');
        } else if (link.isContact) {
            handleContactScroll(e);
        } else { // Hash links
            const targetHash = link.href;
            if (location.pathname === '/home') {
                setActiveNavHash(targetHash);
                const sectionId = targetHash.startsWith('#') ? targetHash.substring(1) : targetHash;
                scrollToSectionHandler(sectionId);
            } else {
                navigate(`/home${targetHash}`);
            }
        }
    };

    const allPillNavLinks = [ //
        { id: 'hero-section', label: 'Home', href: '#hero-section', isRouterLink: false },
        { id: 'how-it-works-section', label: 'How it Works', href: '#how-it-works-section', isRouterLink: false },
        { id: 'creator', label: 'Creator', href: '/creator', isRouterLink: true },
        { id: 'seller', label: 'Seller', href: '/seller', isRouterLink: true },
        { id: 'about', label: 'About Us', href: '/about', isRouterLink: true },
        { id: 'contact-form-section', label: 'Contact Us', href: '#contact-form-section', isRouterLink: false, isContact: true },
    ];

    const desktopPillNavLinks = allPillNavLinks.filter(link => link.id !== 'contact-form-section'); //


    return (
        <>
            <style>{`
              body { background-color: #FFFFFF; color: #1f2937; font-family: 'Inter', sans-serif; margin: 0; overflow-x: hidden; } /* */
              html { scroll-behavior: smooth; } /* */
              :root { --nav-obstruction-height: 70px; /* Default fallback */ } /* */

              .logo-cube-container { perspective: 1000px; width: 36px; height: 36px; } /* */
              .logo-cube { width: 100%; height: 100%; position: relative; transform-style: preserve-3d; animation: rotateCubeMobile 5s infinite ease-in-out; } /* */
              .logo-cube-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; } /* */
              .logo-cube-face.logo-cube-back { color: #1f2937; font-weight: bold; } /* */
              .logo-cube-front { transform: translateZ(18px); } /* */
              .logo-cube-back { transform: rotateY(180deg) translateZ(18px); } /* */
              .logo-cube-face img { max-width: 100%; max-height: 100%; object-fit: contain; } /* */
              @keyframes rotateCubeMobile { 0%, 40% { transform: translateZ(-18px) rotateY(0deg); } 50%, 90% { transform: translateZ(-18px) rotateY(-180deg); } 100% { transform: translateZ(-18px) rotateY(-360deg); } } /* */
              @media (min-width: 640px) { 
                .logo-cube-container { width: 40px; height: 40px; } /* */
                .logo-cube-front { transform: translateZ(20px); } /* */
                .logo-cube-back { transform: rotateY(180deg) translateZ(20px); } /* */
                .logo-cube { animation-name: rotateCubeDesktop; } /* */
                @keyframes rotateCubeDesktop { 0%, 40% { transform: translateZ(-20px) rotateY(0deg); } 50%, 90% { transform: translateZ(-20px) rotateY(-180deg); } 100% { transform: translateZ(-20px) rotateY(-360deg); } } /* */
              }
              .fade-in-up { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; } /* */
              .fade-in-up-mounted { opacity: 1; transform: translateY(0); } /* */
              .button-glow { box-shadow: 0 0 15px 5px rgba(37, 99, 235, 0.5); } /* blue-600: #2563EB -> rgb(37,99,235) */ /* */
              .button-glow:hover { box-shadow: 0 0 20px 8px rgba(37, 99, 235, 0.7); } /* */
            `}</style>
            <div className="min-h-screen bg-white text-gray-800 flex flex-col"> {/* */}
                <header
                    ref={headerRef}
                    className={`bg-white flex justify-between items-center py-3 px-4 sm:px-6 md:px-8 fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''} z-30 md:relative sticky top-0 shadow-sm`} //
                >
                    <RouterLink to="/home" className="flex items-center gap-2 sm:gap-3 flex-shrink-0"> {/* Geändert für /home */}
                        <div className="logo-cube-container">
                            <div className="logo-cube">
                                <div className="logo-cube-face logo-cube-front">
                                    <img src={logoUrl} alt="Firmenlogo M&M" onError={(e) => e.target.src = getPlaceholderUrl(40,40,'M&M')} />
                                </div>
                                <div className="logo-cube-face logo-cube-back">M&M</div>
                            </div>
                        </div>
                        <span className="text-xl sm:text-2xl font-bold text-gray-700">SOLUTIONS</span> {/* */}
                    </RouterLink>
                    <div className="md:hidden"> {/* */}
                        <BurgerIcon onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} isOpen={isMobileMenuOpen} />
                    </div>
                </header>

                <nav
                    ref={pillNavRef}
                    className={`hidden md:flex md:sticky w-full justify-center py-2 fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''} z-40`} //
                    style={{
                        top: `${pillStickyOffset}px`,
                        marginTop: `${pillMarginTop}px`,
                        animationDelay: '0.1s',
                    }}
                >
                    <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 md:space-x-2 bg-gray-100 text-gray-700 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg"> {/* */}
                        {desktopPillNavLinks.map(link => (
                            <a
                                key={link.id}
                                href={link.isRouterLink ? link.href : (location.pathname === '/home' && link.href.startsWith('#') ? link.href : `/home${link.href}`)} // Korrekter href für "Open in new tab"
                                onClick={(e) => handlePillNavLinkClick(e, link)}
                                className={`${navLinkBaseClasses} ${
                                    (link.isRouterLink && location.pathname === link.href) ||
                                    (!link.isRouterLink && location.pathname === '/home' && activeNavHash === link.href) // Aktiv-Logik für /home
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
                    navLinks={allPillNavLinks}
                    handleContactScroll={handleContactScroll}
                    location={location}
                    activeNavHash={activeNavHash}
                    setActiveNavHash={setActiveNavHash}
                    navigate={navigate}
                />

                <div className="flex-grow"> {/* */}
                    {children}
                </div>

                <footer
                    className={`text-center py-6 md:py-8 border-t border-gray-200 fade-in-up ${isMounted ? 'fade-in-up-mounted' : ''} px-4 sm:px-6 md:px-8`} //
                    style={{ animationDelay: '0.6s' }}
                >
                    <p className="text-gray-500 text-xs sm:text-sm"> {/* */}
                        &copy; {new Date().getFullYear()} M&M Solutions. All rights reserved.
                        <RouterLink to="/impressum" className="ml-2 text-blue-600 hover:text-blue-800 underline"> {/* */}
                            Impressum
                        </RouterLink>
                    </p>
                </footer>
            </div>
        </>
    );
};


// Main App Component
export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/home" />} /> {/* Weiterleitung zu /home */}
                    <Route path="/home" element={<HomePage />} /> {/* HomePage unter /home */}
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/creator" element={<CreatorPage />} />
                    <Route path="/seller" element={<SellerPage />} />
                    <Route path="/impressum" element={<ImpressumPage />} />
                    <Route path="*" element={ // 404 Fallback
                        <div className="min-h-screen h-screen flex flex-col items-center justify-center text-center py-10 px-4">
                            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                            <p className="text-lg mb-6">The page you are looking for does not exist.</p>
                            <RouterLink to="/home" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"> {/* Geändert zu /home */}
                                Go to Homepage
                            </RouterLink>
                        </div>
                    } />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}