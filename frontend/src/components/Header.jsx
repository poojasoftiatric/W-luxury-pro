import React, { useState, useRef } from 'react';
import { HelpCircle, Car, Globe, User, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import LanguageCurrencyModal from './LanguageCurrencyModal';
import { useUserSettings } from '../hooks/useUserSettings';

const CustomMenuIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M3 6h12 M19 6h2 M3 12h18 M3 18h18" />
  </svg>
);

const CustomCloseIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
    <path d="M6 6 L18 18" />
    <path d="M6 18 L13.5 10.5 M16.5 7.5 L18 6" />
  </svg>
);

export default function Header({ onResetView, isResultsPage, searchParams, onEditSearch, onOpenFilters, onOurFleetClick, onAboutUsClick, onContactUsClick }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const { langCode, setLangCode, currencySymbol, setCurrencySymbol, langName, setLangName, currencyName, setCurrencyName } = useUserSettings();
  const headerRef = useRef(null);
  const mobileHeaderRef = useRef(null);
  const sidebarOverlayRef = useRef(null);
  const sidebarPanelRef = useRef(null);
  const sidebarTl = useRef(null);

  useGSAP(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, { y: -100, opacity: 0, duration: 1, ease: 'power3.out' });
    }
    if (mobileHeaderRef.current) {
      gsap.from(mobileHeaderRef.current, { y: -100, opacity: 0, duration: 1, ease: 'power3.out' });
    }
  }, []);

  useGSAP(() => {
    if (isResultsPage || !sidebarOverlayRef.current || !sidebarPanelRef.current) return;

    const tl = gsap.timeline({ paused: true });
    sidebarTl.current = tl;

    tl.to(sidebarOverlayRef.current, {
      opacity: 1,
      pointerEvents: 'auto',
      duration: 0.5,
      ease: 'power2.out'
    }, 0);

    tl.to(sidebarPanelRef.current, {
      x: 0,
      duration: 0.7,
      ease: 'power3.out'
    }, 0);

    const items = gsap.utils.toArray('.sidebar-nav-item', sidebarPanelRef.current);
    tl.fromTo(items,
      { opacity: 0, x: 25 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: 'power2.out',
        stagger: {
          each: 0.08,
          from: "end" // Starts from the last item
        }
      },
      0.3 // start slightly after panel starts sliding
    );

    return () => {
      tl.kill();
      sidebarTl.current = null;
    };
  }, [isResultsPage]);

  useGSAP(() => {
    if (sidebarTl.current) {
      if (isSidebarOpen) {
        sidebarTl.current.play();
      } else {
        sidebarTl.current.reverse();
      }
    }
  }, [isSidebarOpen]);

  if (isResultsPage) {
    return (
      <>
        {isLangModalOpen && (
          <LanguageCurrencyModal
            isOpen={isLangModalOpen}
            onClose={() => setIsLangModalOpen(false)}
            onSelectLang={(code, name) => { setLangCode(code); setLangName(name); }}
            onSelectCurrency={(sym, name) => { setCurrencySymbol(sym); setCurrencyName(name); }}
            initialLangName={langName}
            initialCurrencyName={currencyName}
          />
        )}
        {/* --- DESKTOP RESULTS HEADER --- */}
        <header ref={headerRef} className="hidden md:block w-full bg-black text-white select-none z-50 sticky top-0 border-b border-neutral-800/80 shadow-md">
          <div className="w-full max-w-[1100px] mx-auto px-4 py-3 h-[64px]">
            <div className="flex items-center justify-between h-full">
              {/* Logo */}
              <div className="flex items-center gap-4">
                <div
                  onClick={onResetView}
                  className="flex flex-col items-center cursor-pointer select-none leading-none active:scale-95 transition-transform duration-100"
                >
                  <span className="font-sans font-bold text-[40px] bg-gradient-to-b from-[#EAE0C8] via-[#C5A059] to-[#997A3D] bg-clip-text text-transparent leading-none mb-1">
                    W
                  </span>
                  <span className="text-[6.5px] tracking-[0.45em] font-bold text-white uppercase block text-center ml-[0.45em] opacity-90">
                    LUXURY RENTAL
                  </span>
                </div>
              </div>

              {/* Search Capsule (Shifted to right) */}
              <div
                onClick={onEditSearch}
                className="flex items-center gap-4 bg-[#191919] hover:bg-[#252525] rounded-full px-6 py-2 cursor-pointer premium-transition group max-w-[500px] w-full ml-auto mr-0 shadow-sm"
              >
                <div className="flex-grow text-left">
                  <p className="text-[13px] font-bold text-white tracking-wide leading-tight">
                    {searchParams?.pickupLocation || 'Frankfurt Airport'}
                  </p>
                  <p className="text-[11px] font-semibold text-neutral-300 leading-tight mt-0.5">
                    {searchParams?.pickupDate || 'Jun 30'} | {searchParams?.pickupTime || '12:00 PM'} - {searchParams?.returnDate || 'Jul 15'} | {searchParams?.returnTime || '12:00 PM'}
                  </p>
                </div>
                <button className="text-white hover:text-[#C5A059] premium-transition ml-2">
                  <svg className="w-4 h-4 text-white stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* --- MOBILE RESULTS HEADER (Non-sticky Top Bar) --- */}
        <div ref={mobileHeaderRef} className="md:hidden w-full bg-white text-neutral-900 select-none z-50 relative">
          {/* Top row: Back button, Globe, User */}
          <div className="flex items-center justify-between px-4 py-2">
            <button onClick={onResetView} className="p-1 -ml-2">
              <svg className="w-5 h-5 text-neutral-900 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsLangModalOpen(true)}><Globe className="w-5 h-5 text-neutral-900" /></button>
              <button onClick={() => alert("Registration and member accounts are currently visual-only in this demonstration.")}>
                <User className="w-5 h-5 text-neutral-900" />
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE RESULTS HEADER (Sticky Search Bar) --- */}
        <div className="md:hidden w-full bg-white text-neutral-900 select-none z-50 sticky top-0 border-b border-neutral-200 shadow-sm">
          <div className="px-4 pb-3 pt-2 flex items-center gap-3">
            <div onClick={onEditSearch} className="flex-grow flex items-center justify-between bg-neutral-100/80 rounded-xl px-4 py-2.5 cursor-pointer">
              <div>
                <p className="text-sm font-bold text-neutral-900 leading-tight">
                  {searchParams?.pickupLocation || 'Frankfurt Airport'}
                </p>
                <p className="text-[10px] font-bold text-neutral-500 leading-tight mt-0.5">
                  {searchParams?.pickupDate || 'Jun 29'} | {searchParams?.pickupTime || '12:00 PM'} - {searchParams?.returnDate || 'Jul 03'} | {searchParams?.returnTime || '12:00 PM'}
                </p>
              </div>
              <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>
            </div>
            {/* Filter icon button */}
            <button onClick={onOpenFilters} className="flex-shrink-0 w-[46px] h-[46px] bg-neutral-100/80 rounded-xl flex items-center justify-center cursor-pointer">
              <svg className="w-4 h-4 text-neutral-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="8" y1="12" x2="20" y2="12" />
                <line x1="12" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  }


  return (
    <>
      <header ref={headerRef} className="w-full flex flex-col z-50 absolute top-0 left-0 select-none">


        {/* Main Navbar */}
        <div className="w-full bg-black/60 md:bg-black/30 backdrop-blur-md text-white px-4 md:px-6 py-3 h-[64px]">
          <div className="w-full max-w-[1100px] mx-auto h-full flex flex-col justify-center">

            {/* --- MOBILE LAYOUT --- */}
            <div className="flex items-center justify-between h-full md:hidden">
              <div className="flex items-center gap-3">
                <button onClick={() => setIsSidebarOpen(true)} className="text-white hover:text-[#C5A059] transition-colors p-1 -ml-1">
                  <CustomMenuIcon className="w-6 h-6" />
                </button>
                <div
                  onClick={onResetView}
                  className="flex flex-col items-center cursor-pointer select-none leading-none active:scale-95 transition-transform duration-100"
                >
                  <span className="font-sans font-bold text-[28px] bg-gradient-to-b from-[#EAE0C8] via-[#C5A059] to-[#997A3D] bg-clip-text text-transparent leading-none mb-1">
                    W
                  </span>
                  <span className="text-[4.5px] tracking-[0.45em] font-bold text-white uppercase block text-center ml-[0.45em] opacity-90">
                    LUXURY RENTAL
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button>
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V16C21 17.1046 20.1046 18 19 18H14.1L12 21L9.9 18H5C3.89543 18 3 17.1046 3 16V5ZM12 15.5C12.8284 15.5 13.5 14.8284 13.5 14C13.5 13.1716 12.8284 12.5 12 12.5C11.1716 12.5 10.5 13.1716 10.5 14C10.5 14.8284 11.1716 15.5 12 15.5ZM11.1674 9.14432C11.5432 8.41624 12.4302 8.1224 13.1582 8.49826C13.8863 8.87413 14.1802 9.76106 13.8043 10.4891L13.8043 9.73307C13.7291 9.87877 13.5786 9.98222 13.3904 10.018L12.9184 10.1078C11.676 10.3441 10.5979 11.2625 10.2919 12.4866C10.1717 12.9674 10.4628 13.4534 10.9436 13.5736C11.4243 13.6938 11.9103 13.4026 12.0305 12.9219C12.1581 12.4116 12.6074 12.0289 13.125 11.9304L13.597 11.8407C14.1206 11.7411 14.595 11.453 14.8291 10.9996C15.5858 9.53385 14.9936 7.7465 13.5279 6.98978C12.0622 6.23306 10.2748 6.82522 9.51811 8.29093C9.28371 8.74519 9.46178 9.30784 9.91605 9.54224C10.3703 9.77665 10.9329 9.59858 11.1674 9.14432Z" />
                  </svg>
                </button>
                <button onClick={onResetView}>
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 7h11l1.04 3H5.46l1.04-3zM7.5 17a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm9 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </button>
                <button onClick={() => setIsLangModalOpen(true)}>
                  <Globe className="w-5 h-5 stroke-current stroke-[2.5] text-white" />
                </button>
                <button onClick={() => alert("Registration and member accounts are currently visual-only in this demonstration.")}>
                  <svg className="w-5 h-5 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* --- DESKTOP LAYOUT --- */}
            <div className="hidden md:flex items-center justify-between h-full">
              {/* Left Side: Logo */}
              <div className="flex items-center gap-6">
                <button onClick={() => setIsSidebarOpen(true)} className="text-white hover:text-[#C5A059] transition-colors p-2 -ml-2">
                  <CustomMenuIcon className="w-7 h-7" />
                </button>
                <div
                  onClick={onResetView}
                  className="flex flex-col items-center cursor-pointer select-none leading-none active:scale-95 transition-transform duration-100"
                >
                  <span className="font-sans font-bold text-[46px] bg-gradient-to-b from-[#EAE0C8] via-[#C5A059] to-[#997A3D] bg-clip-text text-transparent leading-none mb-1">
                    W
                  </span>
                  <span className="text-[7.5px] tracking-[0.45em] font-bold text-white uppercase block text-center ml-[0.45em] opacity-90">
                    LUXURY RENTAL
                  </span>
                </div>
              </div>

              {/* Right Side: Navigation Links */}
              <div className="flex items-center gap-7 text-[18px] font-medium text-white tracking-tight">

                {/* Our Fleet Link */}
                <button 
                  onClick={onOurFleetClick}
                  className="text-white hover:text-[#C5A059] premium-transition"
                >
                  Our Fleet
                </button>

                {/* About Us Link */}
                <button 
                  onClick={onAboutUsClick}
                  className="text-white hover:text-[#C5A059] premium-transition"
                >
                  About Us
                </button>

              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- SIDEBAR DRAWER --- */}
      {/* Black overlay */}
      <div
        ref={sidebarOverlayRef}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] opacity-0 pointer-events-none`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Sidebar Panel */}
      <div
        ref={sidebarPanelRef}
        className={`fixed top-0 left-0 h-full w-[85vw] sm:w-[400px] lg:w-[35vw] max-w-[500px] bg-black/40 backdrop-blur-md z-[110] flex flex-col border-r border-white/5 -translate-x-full`}
      >

        {/* Close Button */}
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="absolute left-8 top-8 w-[40px] h-[40px] flex items-center justify-center transition-colors group"
        >
          <CustomCloseIcon className="w-6 h-6 md:w-7 md:h-7 text-white/60 group-hover:text-white transition-colors" />
        </button>

        {/* Navigation Items */}
        <div className="flex flex-col items-end justify-start h-full pt-32 pr-12 md:pr-16 lg:pr-24 space-y-7">
          {[
            'OUR FLEET',
            'ABOUT W',
            'CONTACT US'
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="sidebar-nav-item group cursor-pointer flex items-center" 
              onClick={() => {
                setIsSidebarOpen(false);
                if (item === 'OUR FLEET') {
                  onOurFleetClick();
                } else if (item === 'ABOUT W') {
                  onAboutUsClick();
                } else if (item === 'CONTACT US' && onContactUsClick) {
                  onContactUsClick();
                }
              }}
            >
              <span className="font-sans font-normal uppercase tracking-[0.22em] text-[14px] md:text-[16px] text-[#999999] group-hover:text-white transition-colors duration-300">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>

      <LanguageCurrencyModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
        onSelectLang={(code, name) => { setLangCode(code); setLangName(name); }}
        onSelectCurrency={(sym, name) => { setCurrencySymbol(sym); setCurrencyName(name); }}
        initialLangName={langName}
        initialCurrencyName={currencyName}
      />
    </>
  );
}
