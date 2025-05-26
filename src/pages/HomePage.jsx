import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';

// Constants used by HomePage
// Ideally, move these to a shared constants.js file and import them
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
    {
        src: '/images/hero/shopping_bags.png',
        alt: 'Einkaufstaschen Icon',
        positionClasses: 'md:top-[70%] md:right-[30%] md:w-20 md:h-20 top-[62%] left-[70%] w-10 h-10 sm:top-[62%] sm:left-[70%] sm:w-12 sm:h-12',
        animationDelay: '1.2s'
    },
    { src: '/images/hero/zahnrad.png', alt: 'Zahnrad Icon', positionClasses: 'md:top-[8%] md:right-[24%] md:w-20 md:h-20 top-[10%] right-[8%] w-12 h-12 sm:top-[8%] sm:right-[10%] sm:w-14 sm:h-14', animationDelay: '0.6s' },
];
const getPlaceholderUrl = (width, height, text) => `https://placehold.co/${width}x${height}/e0e0e0/757575?text=${encodeURIComponent(text)}`;


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
                <div className="visually-hidden">
                    Creator Agency, TikTok-Shop Partner, Brand-Agency, Creator Agentur, Brand-Agentur,.
                    M&M Solutions ist Ihr offizieller TikTok-Shop Partner und Ihre Creator Agentur für umfassendes Brand-Management.
                    Wir agieren als Creator Agency und Brand-Agency, um Ihre Präsenz auf TikTok Shop zu maximieren.
                    Keywords: Creator Agency Nürtingen, TikTok-Shop Partner Deutschland, Brand-Agency für Social Media, Creator Agentur für Influencer Marketing, Creator Agency, Marketing-Agency.
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

export default HomePage;