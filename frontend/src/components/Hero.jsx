import React, { useState, useEffect, useRef } from 'react';
import { Plane, Calendar, Clock, User, Info, RotateCcw, ChevronLeft, ChevronRight, Briefcase, Globe, Car, ShieldCheck, Check, Sparkles, Building, HandHeart, CarFront, Fuel, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import CarCard from './CarCard.jsx';

const RevealOnScroll = ({ children, className = "w-full flex flex-col items-center justify-center" }) => {
  const ref = useRef(null);

  useGSAP(() => {
    gsap.fromTo(ref.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
};

const AnimatedBannerText = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const lines = gsap.utils.toArray('.banner-line', containerRef.current);
    gsap.fromTo(lines,
      { x: -60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.8,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          end: "top 25%", // Triggers the reverse animation while the text is still clearly visible on screen
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="text-white text-[32px] md:text-[44px] lg:text-[52px] font-sans font-normal leading-[1.15] tracking-tight mb-8 max-w-[600px] drop-shadow-md overflow-hidden">
      <div className="banner-line">PREMIUM CARS,</div>
      <div className="banner-line">FLAWLESS SERVICE,</div>
      <div className="banner-line">UNFORGETTABLE</div>
      <div className="banner-line">JOURNEYS</div>
    </div>
  );
};

// Hardcoded location data matching the reference details
const stationsData = {
  'Munich Airport': {
    name: 'Munich Airport',
    address: 'Terminalstr. Mitte/MWZ, München, 85356, DE',
    hours: '05:00 AM - 11:59 PM',
    holidays: '05:00 AM - 11:59 PM'
  },
  'Frankfurt Airport': {
    name: 'Frankfurt Airport',
    address: 'Hugo-Eckener-Ring, Frankfurt am Main, 60549, DE',
    hours: '06:00 AM - 11:30 PM',
    holidays: '06:00 AM - 11:30 PM'
  },
  'San Francisco Int Airport': {
    name: 'San Francisco Int Airport',
    address: 'SFO Rental Car Center, San Francisco, CA 94128, US',
    hours: '05:00 AM - 11:59 PM',
    holidays: '05:00 AM - 11:59 PM'
  },
  'Los Angeles Int Airport': {
    name: 'Los Angeles Int Airport',
    address: '9000 Airport Blvd, Los Angeles, CA 90045, US',
    hours: '05:00 AM - 11:59 PM',
    holidays: '05:00 AM - 11:59 PM'
  },
  'New York City Long Island City': {
    name: 'New York City Long Island City',
    address: '21-16 44th Dr, Long Island City, NY 11101, US',
    hours: '07:00 AM - 07:00 PM',
    holidays: '08:00 AM - 04:00 PM'
  }
};

const SolidPlaneIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M21,16v-2l-8-5V3.5C13,2.67 12.33,2 11.5,2S10,2.67 10,3.5V9l-8,5v2l8-2.5V19l-2,1.5V22l3.5-1l3.5,1v-1.5L13,19v-5.5L21,16z" />
  </svg>
);

const SolidCalendarIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
  </svg>
);

// Calendar days for June, July, August 2026
const juneDays = [
  { day: null },
  { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 },
  { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 },
  { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 },
  { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 },
  { day: 28 }, { day: 29 }, { day: 30 }
];

const julyDays = [
  { day: null }, { day: null }, { day: null },
  { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 },
  { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 },
  { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 },
  { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 },
  { day: 29 }, { day: 30 }, { day: 31 }
];

const augustDays = [
  { day: null }, { day: null }, { day: null }, { day: null }, { day: null }, { day: null },
  { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 }, { day: 6 }, { day: 7 },
  { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 }, { day: 13 }, { day: 14 },
  { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 }, { day: 20 }, { day: 21 },
  { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 }, { day: 28 },
  { day: 29 }, { day: 30 }, { day: 31 }
];


// ── Time Picker Popup sub-component ──────────────────────────────────────────
const TIME_GROUPS = [
  {
    label: 'Early Morning',
    slots: ['5:00 AM', '5:30 AM', '6:00 AM', '6:30 AM', '7:00 AM', '7:30 AM'],
  },
  {
    label: 'Morning - afternoon',
    slots: [
      '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM',
      '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
      '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
      '4:00 PM', '4:30 PM',
    ],
  },
  {
    label: 'Evening',
    slots: [
      '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM',
      '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM',
    ],
  },
  {
    label: 'Night',
    slots: [
      '9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM',
      '11:00 PM', '11:30 PM', '12:00 AM',
    ],
  },
];

function TimePickerPopup({ activeTimeField, currentTime, selectTime }) {
  const scrollRef = useRef(null);
  const selectedRef = useRef(null);

  // Auto-scroll to selected time slot when popup opens
  useEffect(() => {
    if (selectedRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const el = selectedRef.current;
      const elTop = el.offsetTop;
      const elHeight = el.offsetHeight;
      const containerHeight = container.clientHeight;
      container.scrollTop = elTop - containerHeight / 2 + elHeight / 2;
    }
  }, []);

  return (
    <>
      {/* Header */}
      <div className="pt-5 pb-4 px-5">
        <p className="text-[16px] font-bold text-center text-neutral-900 mb-4">
          Select {activeTimeField} time
        </p>
        <div className="flex items-center gap-2">
          <Clock className="w-[14px] h-[14px] text-black stroke-[2.5]" />
          <span className="text-[13px] text-neutral-800 font-normal">
            {activeTimeField === 'return' ? '24-hour return' : 'Opening Times: -'}
          </span>
        </div>
      </div>

      {/* Scrollable body */}
      <div ref={scrollRef} className="max-h-[220px] overflow-y-auto px-5 pb-3">
        {TIME_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            {/* Section heading */}
            <p className="text-[13px] font-bold text-neutral-900 mb-3">
              {group.label}
            </p>
            {/* Slot buttons */}
            <div className="grid grid-cols-2 gap-2">
              {group.slots.map((slot) => {
                const isSelected = slot === currentTime;
                return (
                  <button
                    key={slot}
                    ref={isSelected ? selectedRef : null}
                    type="button"
                    onClick={() => selectTime(slot, activeTimeField)}
                    className={`text-[13px] font-semibold py-3 px-3 rounded-xl text-center transition-colors premium-transition ${isSelected
                        ? 'bg-[#191919] text-white'
                        : 'bg-[#fafafa] text-neutral-800 hover:bg-[#f3f3f3]'
                      }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
// ─────────────────────────────────────────────────────────────────────────────
const moreSixtCards = [
  {
    title: "FASTER BOOKINGS. INSTANT REWARDS.",
    subtext: "Earn, skip the counter, redeem - all in one app.",
    buttonText: "Get the W App",
    image: "/assets/cars/more_sixt_app_bg.png",
    isApp: true
  },
  {
    title: "W ONE. LOYALTY REWARDED.",
    subtext: "You're ONE membership away from discounts and priority service.",
    buttonText: "Join for free",
    image: "/assets/cars/more_sixt_loyalty_bg.png"
  },
  {
    title: "W BUSINESS",
    subtext: "Custom mobility solutions for all businesses.",
    buttonText: "Register now",
    image: "/assets/cars/more_sixt_business_bg.png"
  },
  {
    title: "W+ CAR SUBSCRIPTION",
    subtext: "The better way of owning a car.",
    buttonText: "Learn more",
    image: "/assets/cars/more_sixt_subscription_bg.png"
  },
  {
    title: "W SHARE",
    subtext: "On-the-go flexibility with premium car sharing.",
    buttonText: "Learn more",
    image: "/assets/cars/more_sixt_share_bg.png"
  },
  {
    title: "W RIDE",
    subtext: "Sit back with your personal chauffeur.",
    buttonText: "Learn more",
    image: "/assets/cars/more_sixt_ride_bg.png"
  }
];

const BoutiqueCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const slides = [
    {
      title: "W Luxury Car Rental",
      desc: "Drive your dream car in style with a luxury rental from W. From sleek sports cars to elegant sedans, explore our meticulously curated fleet and elevate every journey into an unforgettable premium experience.",
      image: "/macro_texture.png",
    },
    {
      title: "Experience the Joy of Driving",
      desc: "Make a statement on the road with W’s exclusive exotic fleet. Whether you require the commanding presence of a premium SUV or the exhilaration of a high-performance sports car, experience the ultimate joy of driving.",
      image: "/cinematic_motion.png",
    },
    {
      title: "How to Rent with W",
      desc: "Booking your luxury vehicle is seamless and entirely tailored to your itinerary. Simply select your preferred class, customize your flexible rental options, and let our premium fleet deliver the exceptional standard you expect.",
      image: "/moody_silhouette.png",
    }
  ];

  useGSAP(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => track.scrollWidth - window.innerWidth;

    ScrollTrigger.create({
      id: "boutique-carousel",
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${getScrollAmount()}`,
      animation: gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none"
      }),
      scrub: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const currentSlide = Math.round(self.progress * (slides.length - 1));
        setActiveSlide(prev => prev !== currentSlide ? currentSlide : prev);
      }
    });

    return () => {
      const st = ScrollTrigger.getById("boutique-carousel");
      if (st) st.kill();
    };
  }, { scope: sectionRef });

  const scrollToSlide = (index) => {
    const st = ScrollTrigger.getById("boutique-carousel");
    if (st) {
      const scrollPos = st.start + (st.end - st.start) * (index / (slides.length - 1));
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  return (
    <div ref={sectionRef} className="w-full relative py-6 md:py-12 lg:py-20 bg-white border-t border-neutral-100 overflow-hidden h-screen flex flex-col justify-center">
      {/* Section Main Header */}
      <div className="max-w-[1200px] mx-auto w-full relative z-10 shrink-0">
        <h2 className="font-sans font-normal text-3xl md:text-6xl lg:text-[64px] text-[#191919] tracking-wide uppercase text-center leading-none mb-6 md:mb-12 lg:mb-16">
          <span className="text-[#C5A059]">W</span> LUXURY CAR RENTAL WORLDWIDE
        </h2>
      </div>

      {/* GSAP Scrolling Track */}
      <div
        ref={trackRef}
        className="flex w-max"
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="w-[90vw] lg:w-[85vw] shrink-0 flex flex-col lg:flex-row gap-4 md:gap-10 lg:gap-16 pr-8 pl-6 md:pl-[5vw] lg:pl-[7.5vw]"
          >
            {/* Left Image */}
            <div className="w-full lg:w-[55%] h-[200px] sm:h-[35vh] md:h-[45vh] lg:h-[60vh] relative overflow-hidden group shrink-0">
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out" />
            </div>

            {/* Right Text Content */}
            <div className={`w-full lg:w-[45%] flex flex-col justify-center pr-4 md:pr-12 lg:pr-16 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeSlide === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: activeSlide === idx ? '150ms' : '0ms' }}>
              <h3 className="font-sans font-normal text-[22px] md:text-[28px] lg:text-[34px] text-[#191919] mb-3 md:mb-6 tracking-wider uppercase leading-[1.2]">
                {slide.title}
              </h3>
              <div className="text-[14px] md:text-[15px] text-[#555555] font-normal leading-[1.6] md:leading-[1.8] space-y-4 mb-6 md:mb-10 max-w-[480px]">
                <p>{slide.desc}</p>
              </div>

              {/* Discover More Button */}
              <button className="flex items-center gap-4 text-[#191919] hover:text-[#C5A059] transition-colors group cursor-pointer w-fit">
                <div className="w-[42px] h-[42px] rounded-full border border-[#191919]/20 group-hover:border-[#C5A059] flex items-center justify-center transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="transform group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase mt-0.5">Discover More</span>
              </button>
            </div>
          </div>
        ))}
        {/* Padding block at the end so the last slide doesn't touch edge */}
        <div className="w-[10vw] lg:w-[15vw] shrink-0"></div>
      </div>

      {/* Pagination Container */}
      <div className="max-w-[1200px] mx-auto mt-6 md:mt-12 px-6 flex justify-center lg:justify-start lg:pl-[7.5vw] w-full shrink-0">
        <div className="relative flex items-center gap-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToSlide(idx)}
              className={`w-[7px] h-[7px] rounded-full transition-colors duration-300 ${activeSlide === idx ? 'bg-[#191919]' : 'bg-[#191919]/20'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
          {/* Gliding Arc SVG */}
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex justify-center items-center"
            style={{ left: `${activeSlide * 23}px`, width: '7px', height: '7px' }}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-[#191919] absolute -top-[6.5px] -left-[7.5px]">
              <path d="M 4 11 A 7 7 0 0 1 18 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const popularTypesList = [
  {
    title: "LUXURY 5 SEATER SUV",
    subtitle: "Mercedes-Benz G-Class or similar",
    seats: 5,
    suitcases: 4,
    transmission: "Automatic",
    image: "/assets/cars/g_class.png",
    desc: "Travel in comfort with space for five."
  },
  {
    title: "LUXURY 7 SEATER SUV",
    subtitle: "BMW X7 or similar",
    seats: 7,
    suitcases: 4,
    transmission: "Automatic",
    image: "/assets/cars/x7.png",
    desc: "Bring everyone together with extra seating and comfort."
  },
  {
    title: "LUXURY CONVERTIBLE",
    subtitle: "BMW Z4 Convertible or similar",
    seats: 2,
    suitcases: 2,
    transmission: "Automatic",
    image: "/assets/cars/z4.png",
    desc: "Stylish open-air drives with premium comfort."
  },
  {
    title: "LUXURY ELECTRIC VEHICLE",
    subtitle: "GMC Hummer or similar",
    seats: 5,
    suitcases: 3,
    transmission: "Range ~303 mi",
    image: "/assets/cars/hummer.png",
    desc: "Discover advanced tech with powerful electric driving."
  },
  {
    title: "LUXURY SEDANS",
    subtitle: "BMW 7 Series or similar",
    seats: 5,
    suitcases: 4,
    transmission: "Automatic",
    image: "/assets/cars/7_series.png",
    desc: "Relax with refined comfort and modern features."
  },
  {
    title: "LUXURY SPORTS CAR",
    subtitle: "BMW 8 Series or similar",
    seats: 4,
    suitcases: 3,
    transmission: "Automatic",
    image: "/assets/cars/sports_car.png",
    desc: "Combine high performance with premium comfort."
  }
];

const PopularTypesCarousel = ({ onScrollToListings }) => {
  return (
    <div className="w-full bg-white text-neutral-900 py-20 px-6 text-center select-none relative z-10 border-t border-neutral-100 overflow-hidden">
      <RevealOnScroll className="max-w-[1200px] mx-auto w-full">
        <h2 className="font-sans font-normal text-4xl md:text-6xl lg:text-[64px] text-neutral-900 tracking-wide uppercase text-center leading-none">
          BROWSE POPULAR TYPES
        </h2>

        {/* Top Row Grid: First 4 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 text-center w-full">
          {popularTypesList.slice(0, 4).map((item, index) => (
            <div
              key={`popular-${index}`}
              className="w-full flex flex-col items-center transition-all duration-200 mx-auto group cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-[180px] flex items-center justify-center mb-6">
                <div className="absolute bottom-4 w-3/4 h-4 bg-black/5 rounded-[100%] blur-md scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 pointer-events-none" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative z-10 max-h-[160px] w-[105%] object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.1)] transform group-hover:scale-[1.15] group-hover:translate-x-3 group-hover:-translate-y-3 transition-all duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]"
                />
              </div>

              {/* Text & Button Wrapper with fixed height */}
              <div className="flex flex-col items-center w-full px-2 h-[250px]">
                <h3 className="font-condensed font-normal text-[26px] md:text-[30px] text-[#191919] uppercase tracking-wide leading-[1.1] mb-1 text-center min-h-[66px] flex items-center justify-center">
                  {item.title}
                </h3>
                <span className="text-[14px] text-[#333333] block mb-3 text-center">
                  {item.subtitle}
                </span>

                {/* Specs Row with flex-wrap */}
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px] font-bold text-[#191919] mb-4 w-full">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <User className="w-3.5 h-3.5 text-[#191919] stroke-[2.5]" />
                    <span>{item.seats} seaters</span>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <Briefcase className="w-3.5 h-3.5 text-[#191919] stroke-[2.5]" />
                    <span>{item.suitcases} bags</span>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    {item.transmission.toLowerCase().includes('range') ? (
                      <svg className="w-4 h-4 text-[#191919] stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
                        <line x1="22" y1="11" x2="22" y2="13" />
                      </svg>
                    ) : (
                      <span className="w-4 h-4 bg-[#191919] text-white rounded-[2px] flex items-center justify-center text-[10px] font-black leading-none">A</span>
                    )}
                    <span>{item.transmission}</span>
                  </div>
                </div>

                <p className="text-[13px] text-[#333333] leading-relaxed max-w-[240px] text-center mx-auto mb-5">
                  {item.desc}
                </p>
                <button
                  type="button"
                  onClick={onScrollToListings}
                  className="bg-[#191919] hover:bg-black text-white font-bold text-[13px] py-2.5 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 w-fit mx-auto shadow-md mt-auto shrink-0"
                >
                  Check availability
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Row Flex: Centered remaining 2 items */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6 text-center w-full lg:max-w-[50%] mx-auto">
          {popularTypesList.slice(4, 6).map((item, index) => (
            <div
              key={`popular-${index + 4}`}
              className="w-full flex flex-col items-center transition-all duration-200 group cursor-pointer"
            >
              {/* Image */}
              <div className="relative w-full h-[180px] flex items-center justify-center mb-6">
                <div className="absolute bottom-4 w-3/4 h-4 bg-black/5 rounded-[100%] blur-md scale-75 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 pointer-events-none" />
                <img
                  src={item.image}
                  alt={item.title}
                  className="relative z-10 max-h-[160px] w-[105%] object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.1)] transform group-hover:scale-[1.15] group-hover:translate-x-3 group-hover:-translate-y-3 transition-all duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover:drop-shadow-[0_25px_25px_rgba(0,0,0,0.25)]"
                />
              </div>

              {/* Text & Button Wrapper with fixed height */}
              <div className="flex flex-col items-center w-full px-2 h-[250px]">
                <h3 className="font-condensed font-normal text-[26px] md:text-[30px] text-[#191919] uppercase tracking-wide leading-[1.1] mb-1 text-center min-h-[66px] flex items-center justify-center">
                  {item.title}
                </h3>
                <span className="text-[14px] text-[#333333] block mb-3 text-center">
                  {item.subtitle}
                </span>

                {/* Specs Row with flex-wrap */}
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px] font-bold text-[#191919] mb-4 w-full">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <User className="w-3.5 h-3.5 text-[#191919] stroke-[2.5]" />
                    <span>{item.seats} seaters</span>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <Briefcase className="w-3.5 h-3.5 text-[#191919] stroke-[2.5]" />
                    <span>{item.suitcases} bags</span>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    {item.transmission.toLowerCase().includes('range') ? (
                      <svg className="w-4 h-4 text-[#191919] stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
                        <line x1="22" y1="11" x2="22" y2="13" />
                      </svg>
                    ) : (
                      <span className="w-4 h-4 bg-[#191919] text-white rounded-[2px] flex items-center justify-center text-[10px] font-black leading-none">A</span>
                    )}
                    <span>{item.transmission}</span>
                  </div>
                </div>

                <p className="text-[13px] text-[#333333] leading-relaxed max-w-[240px] text-center mx-auto mb-5">
                  {item.desc}
                </p>
                <button
                  type="button"
                  onClick={onScrollToListings}
                  className="bg-[#191919] hover:bg-black text-white font-bold text-[13px] py-2.5 px-6 rounded-full transition-all hover:scale-[1.02] active:scale-95 w-fit mx-auto shadow-md mt-auto shrink-0"
                >
                  Check availability
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Small warning print at bottom */}
        <p className="text-[10px] text-neutral-400 font-bold mt-10 text-center leading-normal max-w-lg mx-auto">
          Vehicles shown are examples only. Availability may vary based on pickup location and dates.
        </p>
      </RevealOnScroll>
    </div>
  );
};


const MARQUEE_BRANDS = [
  { name: "ROLLS ROYCE", file: "rollsroyce.svg" },
  { name: "BUGATTI", file: "bugatti.png" },
  { name: "McLAREN", file: "mclaren_orange.svg" },
  { name: "BMW", file: "bmw.svg" },
  { name: "CADILLAC", file: "cadillac.png" },
  { name: "FERRARI", file: "ferrari.svg" },
  { name: "LAMBORGHINI", file: "lamborghini.svg" },
  { name: "PORSCHE", file: "porsche.png" },
  { name: "ASTON MARTIN", file: "astonmartin_white.svg" },
  { name: "MASERATI", file: "maserati.svg" }
];

const TIME_SLOTS = [];
for (let h = 8; h <= 20; h++) {
  for (let m = 0; m < 60; m += 30) {
    if (h === 20 && m === 30) continue;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 === 0 ? 12 : h % 12;
    const minute = m === 0 ? '00' : '30';
    const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
    TIME_SLOTS.push(`${hourStr}:${minute} ${ampm}`);
  }
}

// Helper to get calendar data for a month
function getMonthData(year, monthIndex) {
  const d = new Date(year, monthIndex, 1);
  const firstDay = d.getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const monthName = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  return { firstDay, daysInMonth, monthName };
}

export default function Hero({ onSearch, initialMobilePanel, onPanelClosed, isDropdownMode = false, initialSearchParams = null }) {
  const [pickupLocation, setPickupLocation] = useState(initialSearchParams?.pickupLocation || 'Munich Airport');
  const [pickupDate, setPickupDate] = useState(initialSearchParams?.pickupDate || 'Jun 30');
  const [pickupTime, setPickupTime] = useState(initialSearchParams?.pickupTime || '12:00 PM');
  const [returnDate, setReturnDate] = useState(initialSearchParams?.returnDate || 'Jul 15');
  const [returnTime, setReturnTime] = useState(initialSearchParams?.returnTime || '12:00 PM');
  const [driverAge, setDriverAge] = useState(initialSearchParams?.driverAge || '30+');
  const [activeTab, setActiveTab] = useState('Cars');
  const [isWidgetExpanded, setIsWidgetExpanded] = useState(false);
  const widgetRef = useRef(null);
  const stickyWidgetRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedMain = widgetRef.current && widgetRef.current.contains(event.target);
      const clickedSticky = stickyWidgetRef.current && stickyWidgetRef.current.contains(event.target);
      if (!clickedMain && !clickedSticky) {
        setIsWidgetExpanded(false);
        setShowCalendarPopup(false);
        setShowTimePopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollAnimationRef = useRef(null);

  useGSAP(() => {
    if (isDropdownMode) return;
    const trigger = scrollAnimationRef.current;
    if (!trigger) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      }
    });

    // Translate the car container from 100vw to -100vw
    tl.fromTo(".car-container-animate", {
      x: "100vw"
    }, {
      x: "-100vw",
      ease: "none"
    }, 0);

    // Rotate front wheel
    tl.to(".car-wheel-front", {
      rotation: -360 * 6,
      ease: "none"
    }, 0);

    // Rotate rear wheel
    tl.to(".car-wheel-rear", {
      rotation: -360 * 6,
      ease: "none"
    }, 0);

    // Fade in/out the text
    tl.to(".car-text-animate", {
      opacity: 1,
      duration: 0.5,
      ease: "power1.inOut"
    }, 0)
      .to(".car-text-animate", {
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut"
      }, 0.5);

  }, { scope: scrollAnimationRef, dependencies: [isDropdownMode] });


  const [isDifferentReturn, setIsDifferentReturn] = useState(false);
  const [returnLocation, setReturnLocation] = useState('');
  const [showReturnPopup, setShowReturnPopup] = useState(false);
  const [hoveredReturnStationKey, setHoveredReturnStationKey] = useState('Munich Airport');

  // Popup triggers
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [hoveredStationKey, setHoveredStationKey] = useState('Munich Airport');
  const [isSticky, setIsSticky] = useState(false);
  const [showStickySearch, setShowStickySearch] = useState(false);
  const lastScrollY = useRef(0);
  const [showCalendarPopup, setShowCalendarPopup] = useState(false);
  const [calendarOffset, setCalendarOffset] = useState(0);
  const [activeDateField, setActiveDateField] = useState(null); // 'pickup' or 'return'
  const [showTimePopup, setShowTimePopup] = useState(false);
  const [activeTimeField, setActiveTimeField] = useState(null); // 'pickup' or 'return'
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentMobileSlide, setCurrentMobileSlide] = useState(0);
  const mobileFleetScrollRef = useRef(null);

  const [moreSixtSlide, setMoreSixtSlide] = useState(0);
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [activeRegionTab, setActiveRegionTab] = useState('Australia');
  // Mobile step-by-step panel: null | 'location' | 'details' | 'calendar' | 'time-pickup' | 'time-return'
  const [mobilePanel, setMobilePanel] = useState(initialMobilePanel || null);

  useEffect(() => {
    if (initialMobilePanel) {
      setMobilePanel(initialMobilePanel);
    }
  }, [initialMobilePanel]);

  useEffect(() => {
    if (mobilePanel === null && onPanelClosed) {
      onPanelClosed();
    }
  }, [mobilePanel, onPanelClosed]);

  const handleScrollToListings = () => {
    const el = document.getElementById('listings-container');
    if (el && !isDropdownMode) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onSearch({
        pickupLocation,
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        driverAge
      });
    }
  };

  const handleDestinationClick = (city) => {
    if (city.toLowerCase().includes('los angeles')) {
      setPickupLocation('Los Angeles Int Airport');
      setHoveredStationKey('Los Angeles Int Airport');
    } else if (city.toLowerCase().includes('san francisco')) {
      setPickupLocation('San Francisco Int Airport');
      setHoveredStationKey('San Francisco Int Airport');
    } else if (city.toLowerCase().includes('munich')) {
      setPickupLocation('Munich Airport');
      setHoveredStationKey('Munich Airport');
    } else {
      setPickupLocation(city);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const openTimePopup = (e, field) => {
    e.stopPropagation();
    setShowCalendarPopup(false);
    setActiveTimeField(field);
    setShowTimePopup(true);
  };

  const selectTime = (slot, field) => {
    if (field === 'pickup') setPickupTime(slot);
    else setReturnTime(slot);
    setShowTimePopup(false);
    setActiveTimeField(null);
  };

  const parseDateStr = (dateStr) => {
    if (!dateStr) return null;
    if (dateStr.includes('-')) {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      }
    }
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length >= 2) {
      const monthStr = parts[0];
      const day = parseInt(parts[1], 10);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthIndex = months.findIndex(m => monthStr.toLowerCase().startsWith(m.toLowerCase()));
      if (monthIndex !== -1) {
        return new Date(2026, monthIndex, day);
      }
    }
    return null;
  };

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  };


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update general sticky flag
      if (currentScrollY > 120) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Update scroll-up search bar visibility
      if (currentScrollY > 300) {
        if (currentScrollY < lastScrollY.current) {
          setShowStickySearch(true);
        } else {
          setShowStickySearch(false);
        }
      } else {
        setShowStickySearch(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const historyStations = ['Munich Airport', 'Frankfurt Airport'];
  const popularStations = ['Frankfurt Airport', 'San Francisco Int Airport', 'Munich Airport', 'Los Angeles Int Airport'];

  const getFilteredStations = (list) => {
    if (!pickupLocation || list.includes(pickupLocation)) {
      return list;
    }
    const filtered = list.filter(name =>
      name.toLowerCase().includes(pickupLocation.toLowerCase())
    );
    return filtered.length > 0 ? filtered : list;
  };

  const renderMonth = (monthName, daysList, baseValueOffset) => {
    return (
      <div className="w-full">
        <h3 className="text-center font-normal text-neutral-900 mb-5 text-xl tracking-tight">
          {monthName}
        </h3>

        {/* Days of week header */}
        <div className="grid grid-cols-7 text-center mb-3">
          {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map(day => (
            <span key={day} className="text-[11px] font-bold text-neutral-400">
              {day}
            </span>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 text-center gap-y-1 text-sm font-semibold">
          {daysList.map((item, idx) => {
            if (item.day === null) {
              return <div key={`empty-${idx}`} />;
            }

            const parts = monthName.split(' ');
            const monthStr = parts[0].substring(0, 3);
            const yearVal = parseInt(parts[1], 10);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthIndex = months.findIndex(m => monthStr.toLowerCase().startsWith(m.toLowerCase()));
            const cellDate = new Date(yearVal, monthIndex, item.day);

            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const isPast = cellDate < today;
            const isToday = isSameDay(cellDate, today);

            const startDate = parseDateStr(pickupDate);
            const endDate = parseDateStr(returnDate);

            const isStart = isSameDay(cellDate, startDate);
            const isEnd = isSameDay(cellDate, endDate);
            const inRange = startDate && endDate && cellDate > startDate && cellDate < endDate;

            let dayClass = "w-9 h-9 flex items-center justify-center mx-auto rounded-full transition-colors cursor-pointer ";
            if (isPast) {
              dayClass += "text-neutral-300 cursor-not-allowed pointer-events-none";
            } else if (isStart || isEnd) {
              dayClass += "bg-black text-white font-bold rounded-full";
            } else if (inRange) {
              dayClass += "bg-neutral-100 text-neutral-900 font-bold rounded-lg";
            } else if (isToday) {
              dayClass += "text-[#C5A059] font-bold hover:bg-neutral-50";
            } else {
              dayClass += "text-neutral-800 hover:bg-neutral-50";
            }

            // Click handler
            const handleDateClick = () => {
              if (isPast) return;

              const monthPrefix = monthName.split(' ')[0].substring(0, 3); // "Jun", "Jul", "Aug"
              const dateStr = `${monthPrefix} ${item.day}`;

              if (activeDateField === 'pickup') {
                setPickupDate(dateStr);
                // Clear return date if it's before the new pickup date
                if (endVal && dayVal >= endVal) {
                  setReturnDate('');
                }
                setActiveDateField('return');
              } else if (activeDateField === 'return') {
                if (startVal && dayVal > startVal) {
                  setReturnDate(dateStr);
                  setShowCalendarPopup(false);
                  setActiveDateField(null);
                } else {
                  // If return date is before pickup date, treat it as new pickup date
                  setPickupDate(dateStr);
                  setReturnDate('');
                  setActiveDateField('return');
                }
              }
            };

            return (
              <div
                key={`day-${item.day}`}
                onClick={handleDateClick}
                className={dayClass}
              >
                {item.day}
              </div>
            );
          })}
        </div>
      </div>
    );
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      pickupLocation,
      returnLocation: isDifferentReturn ? returnLocation : pickupLocation,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      driverAge
    });
  };

  const currentStation = stationsData[hoveredStationKey] || stationsData['Munich Airport'];

  const carouselSlides = [
    [
      {
        name: "BMW 7 Series",
        category: "Luxury Sedan",
        seats: 5,
        suitcases: 4,
        transmission: "Automatic",
        image: "/assets/cars/7_series.png"
      },
      {
        name: "Mercedes E-Class",
        category: "Premium Sedan",
        seats: 5,
        suitcases: 4,
        transmission: "Automatic",
        image: "/assets/cars/mercedes_e_class.png"
      }
    ],
    [
      {
        name: "Mercedes G-Class",
        category: "Luxury 5 Seater SUV",
        seats: 5,
        suitcases: 4,
        transmission: "Automatic",
        image: "/assets/cars/g_class.png"
      },
      {
        name: "BMW X7",
        category: "Luxury 7 Seater SUV",
        seats: 7,
        suitcases: 4,
        transmission: "Automatic",
        image: "/assets/cars/x7.png"
      }
    ],
    [
      {
        name: "BMW Z4",
        category: "Luxury Convertible",
        seats: 2,
        suitcases: 1,
        transmission: "Automatic",
        image: "/assets/cars/z4.png"
      },
      {
        name: "BMW 8 Series",
        category: "Luxury Sports Car",
        seats: 4,
        suitcases: 2,
        transmission: "Automatic",
        image: "/assets/cars/sports_car.png"
      }
    ]
  ];



  const regionCountries = {
    'Australia': ['Australia', 'New Zealand'],
    'Europe': ['Germany', 'United Kingdom', 'France', 'Italy', 'Spain', 'Austria', 'Switzerland', 'Netherlands'],
    'North America': ['United States', 'Canada', 'Mexico'],
    'Africa': ['South Africa', 'Morocco', 'Egypt'],
    'Asia': ['Singapore', 'United Arab Emirates', 'Japan', 'Thailand', 'Turkey'],
    'South America': ['Brazil', 'Argentina', 'Colombia', 'Chile']
  };

  const renderSearchWidget = () => {
    return (
      <div ref={widgetRef} className="w-full z-40 relative mb-4 pointer-events-auto">
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full">
          {/* Rental Dates */}
          <div 
            onClick={() => {
              setShowCalendarPopup(!showCalendarPopup);
              setShowTimePopup(false);
            }}
            className="flex items-center justify-between bg-[#F4F5F6] rounded-[16px] px-6 py-2.5 flex-[1.2] cursor-pointer hover:bg-[#EBECEC] transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-[13px] font-normal text-neutral-400 mb-0.5">Rental dates</span>
              <span className="text-[16px] font-bold text-neutral-800">
                {pickupDate && returnDate ? `${pickupDate} - ${returnDate}` : 'Select dates'}
              </span>
            </div>
            <svg className="w-6 h-6 text-[#C5A059] stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>

          {/* Time Selectors */}
          <div 
            onClick={() => {
              setShowTimePopup(!showTimePopup);
              setShowCalendarPopup(false);
            }}
            className="flex items-center bg-[#F4F5F6] rounded-[16px] flex-[1.5] relative"
          >
            {/* Pick up time */}
            <div className="flex flex-col justify-center px-6 py-2.5 flex-1 cursor-pointer hover:bg-[#EBECEC] rounded-l-[16px] transition-colors h-full">
              <span className="text-[13px] font-normal text-neutral-400 mb-0.5">Pick up time</span>
              <span className="text-[16px] font-bold text-neutral-800">{pickupTime}</span>
            </div>
            
            {/* Divider */}
            <div className="w-[1px] h-[36px] bg-neutral-200"></div>
            
            {/* Drop-off time */}
            <div className="flex flex-col justify-center px-6 py-2.5 flex-1 cursor-pointer hover:bg-[#EBECEC] rounded-r-[16px] transition-colors h-full">
              <span className="text-[13px] font-normal text-neutral-400 mb-0.5">Drop-off time</span>
              <span className="text-[16px] font-bold text-neutral-800">{returnTime}</span>
            </div>
            
            {/* Time Popup Dropdown */}
            {showTimePopup && (
              <div 
                data-lenis-prevent
                className="absolute top-[calc(100%+12px)] left-0 w-full bg-[#F4F5F6] rounded-[24px] shadow-2xl z-50 border border-neutral-200/50 flex overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Pickup Time List */}
                <div className="flex-1 overflow-y-auto h-[320px] px-2 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {TIME_SLOTS.map(time => (
                    <div 
                      key={`pickup-${time}`}
                      onClick={() => { setPickupTime(time); }}
                      className={`text-center py-2.5 mx-4 my-1.5 rounded-full cursor-pointer transition-colors text-[15px] font-normal ${
                        pickupTime === time 
                          ? 'bg-[#C5A059] text-white shadow-sm' 
                          : 'text-neutral-800 hover:bg-neutral-200/70'
                      }`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
                
                {/* Divider */}
                <div className="w-[1px] bg-neutral-200/60 my-4"></div>

                {/* Drop-off Time List */}
                <div className="flex-1 overflow-y-auto h-[320px] px-2 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {TIME_SLOTS.map(time => (
                    <div 
                      key={`return-${time}`}
                      onClick={() => { setReturnTime(time); }}
                      className={`text-center py-2.5 mx-4 my-1.5 rounded-full cursor-pointer transition-colors text-[15px] font-normal ${
                        returnTime === time 
                          ? 'bg-[#C5A059] text-white shadow-sm' 
                          : 'text-neutral-800 hover:bg-neutral-200/70'
                      }`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Show Cars Button */}
          <button 
            onClick={handleScrollToListings}
            className="bg-[#C5A059] hover:bg-[#B28F4B] text-white rounded-[16px] px-10 py-2.5 flex items-center justify-center font-bold text-[16px] transition-colors md:w-auto shadow-md"
          >
            Show Cars
          </button>
          
        </div>

        {/* Calendar Popup Overlay */}
        {showCalendarPopup && (
          <div className="absolute top-[calc(100%+12px)] left-0 w-full bg-[#F4F5F6] rounded-[24px] px-8 py-5 shadow-2xl z-50 border border-neutral-200/50">
            {/* Header with arrows */}
            <div className="flex items-center justify-between mb-5">
              <button 
                type="button" 
                onClick={() => setCalendarOffset(Math.max(0, calendarOffset - 1))}
                className={`p-1 transition-colors ${calendarOffset > 0 ? 'text-[#C5A059] hover:text-[#B28F4B]' : 'text-neutral-300 cursor-default'}`}
              >
                <svg className="w-6 h-6 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              
              <div className="flex-1 flex justify-between px-16 lg:px-32">
                {[0, 1, 2].map(offset => (
                  <span key={offset} className="text-[16px] font-normal text-neutral-800 tracking-wide">
                    {getMonthData(2026, 6 + calendarOffset + offset).monthName}
                  </span>
                ))}
              </div>
              
              <button 
                type="button"
                onClick={() => setCalendarOffset(calendarOffset + 1)}
                className="text-[#C5A059] hover:text-[#B28F4B] p-1"
              >
                <svg className="w-6 h-6 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            
            {/* Calendars Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[0, 1, 2].map(offset => {
                const { firstDay, daysInMonth, monthName } = getMonthData(2026, 6 + calendarOffset + offset);
                
                return (
                  <div key={offset} className="flex-1">
                    <p className="text-center font-bold text-[14px] text-neutral-500 uppercase tracking-widest mb-4 md:hidden">
                      {monthName}
                    </p>
                    
                    {/* Days of week */}
                    <div className="grid grid-cols-7 gap-y-2 text-center text-xs font-bold text-neutral-400 mb-2">
                      <span>MO</span><span>TU</span><span>WE</span><span>TH</span><span>FR</span><span>SA</span><span>SU</span>
                    </div>
                    
                    {/* Month Days */}
                    <div className="grid grid-cols-7 gap-y-2 text-center">
                      {Array.from({length: firstDay}).map((_, i) => (
                        <div key={`empty-${offset}-${i}`}></div>
                      ))}
                      {Array.from({length: daysInMonth}, (_, i) => i + 1).map(date => {
                        const monthPrefix = getMonthData(2026, 6 + calendarOffset + offset).monthName.split(' ')[0].substring(0, 3);
                        const dateStr = `${monthPrefix} ${date}`;
                        
                        const startDate = parseDateStr(pickupDate);
                        const endDate = parseDateStr(returnDate);
                        const cellDate = new Date(2026, 6 + calendarOffset + offset, date);
                        const isStart = isSameDay(cellDate, startDate);
                        const isEnd = isSameDay(cellDate, endDate);
                        const inRange = startDate && endDate && cellDate > startDate && cellDate < endDate;

                        let dayClass = "text-[14px] font-semibold w-[32px] h-[32px] mx-auto flex items-center justify-center rounded-full cursor-pointer transition-colors ";
                        if (isStart || isEnd) {
                          dayClass += "bg-black text-white font-bold";
                        } else if (inRange) {
                          dayClass += "bg-neutral-200 text-neutral-900 rounded-lg";
                        } else {
                          dayClass += "text-neutral-800 hover:bg-white";
                        }

                        return (
                          <div 
                            key={date} 
                            onClick={() => {
                              if (!pickupDate || (pickupDate && returnDate)) {
                                setPickupDate(dateStr);
                                setReturnDate('');
                              } else {
                                setReturnDate(dateStr);
                                setShowCalendarPopup(false);
                              }
                            }}
                            className={dayClass}
                          >
                            {date}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Sticky Scroll-Up Search Bar */}
      <div 
        ref={stickyWidgetRef}
        className={`fixed top-0 left-0 right-0 w-full z-[100] bg-black/90 backdrop-blur-md shadow-2xl border-b border-neutral-800 py-3.5 transition-all duration-300 ease-out hidden md:block ${
          showStickySearch ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between gap-6">
          {/* Logo Brand */}
          <div 
            onClick={handleScrollToListings}
            className="flex flex-col items-center cursor-pointer select-none leading-none active:scale-95 transition-transform duration-100 flex-shrink-0"
          >
            <span className="font-sans font-bold text-[24px] bg-gradient-to-b from-[#EAE0C8] via-[#C5A059] to-[#997A3D] bg-clip-text text-transparent leading-none mb-0.5">
              W
            </span>
            <span className="text-[4px] tracking-[0.3em] font-extrabold text-neutral-400 uppercase">
              LUXURY RENTAL
            </span>
          </div>

          {/* Search Inputs Container */}
          <div className="flex flex-row gap-3 md:gap-4 flex-grow max-w-[800px] relative">
            {/* Rental Dates Selector */}
            <div 
              onClick={() => {
                setShowCalendarPopup(!showCalendarPopup);
                setShowTimePopup(false);
              }}
              className="flex items-center justify-between bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 rounded-[14px] px-5 py-2 flex-[1.2] cursor-pointer hover:bg-neutral-900 transition-colors"
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-normal text-neutral-500 mb-0.5 uppercase tracking-wider">Rental dates</span>
                <span className="text-[14px] font-bold text-neutral-200">
                  {pickupDate && returnDate ? `${pickupDate} - ${returnDate}` : 'Select dates'}
                </span>
              </div>
              <svg className="w-5 h-5 text-[#C5A059] stroke-[1.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>

            {/* Time Selectors */}
            <div 
              onClick={() => {
                setShowTimePopup(!showTimePopup);
                setShowCalendarPopup(false);
              }}
              className="flex items-center bg-neutral-900/60 border border-neutral-800 rounded-[14px] flex-[1.5] relative"
            >
              {/* Pick up time */}
              <div className="flex flex-col justify-center px-5 py-2 flex-1 cursor-pointer hover:bg-neutral-900 rounded-l-[14px] transition-colors h-full text-left">
                <span className="text-[10px] font-normal text-neutral-500 mb-0.5 uppercase tracking-wider">Pick up time</span>
                <span className="text-[14px] font-bold text-neutral-200">{pickupTime}</span>
              </div>
              
              {/* Divider */}
              <div className="w-[1px] h-[26px] bg-neutral-800"></div>
              
              {/* Drop-off time */}
              <div className="flex flex-col justify-center px-5 py-2 flex-1 cursor-pointer hover:bg-neutral-900 rounded-r-[14px] transition-colors h-full text-left">
                <span className="text-[10px] font-normal text-neutral-500 mb-0.5 uppercase tracking-wider">Drop-off time</span>
                <span className="text-[14px] font-bold text-neutral-200">{returnTime}</span>
              </div>
              
              {/* Time Popup Dropdown inside sticky bar */}
              {showTimePopup && (
                <div 
                  data-lenis-prevent
                  className="absolute top-[calc(100%+10px)] left-0 w-full bg-[#121212] rounded-[20px] shadow-2xl z-50 border border-neutral-800 flex overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex-1 overflow-y-auto h-[280px] px-1 py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {TIME_SLOTS.map(time => (
                      <div 
                        key={`pickup-sticky-${time}`}
                        onClick={() => { setPickupTime(time); }}
                        className={`text-center py-2 mx-3 my-1 rounded-full cursor-pointer transition-colors text-[14px] font-normal ${
                          pickupTime === time 
                            ? 'bg-[#C5A059] text-white shadow-sm font-bold' 
                            : 'text-neutral-300 hover:bg-neutral-800'
                        }`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                  <div className="w-[1px] bg-neutral-800 my-4"></div>
                  <div className="flex-1 overflow-y-auto h-[280px] px-1 py-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {TIME_SLOTS.map(time => (
                      <div 
                        key={`return-sticky-${time}`}
                        onClick={() => { setReturnTime(time); }}
                        className={`text-center py-2 mx-3 my-1 rounded-full cursor-pointer transition-colors text-[14px] font-normal ${
                          returnTime === time 
                            ? 'bg-[#C5A059] text-white shadow-sm font-bold' 
                            : 'text-neutral-300 hover:bg-neutral-800'
                        }`}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Calendar Popup Overlay inside sticky bar */}
            {showCalendarPopup && (
              <div 
                className="absolute top-[calc(100%+10px)] left-0 w-full bg-[#F4F5F6] rounded-[24px] px-8 py-5 shadow-2xl z-50 border border-neutral-200/50"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header with arrows */}
                <div className="flex items-center justify-between mb-5">
                  <button 
                    type="button" 
                    onClick={() => setCalendarOffset(Math.max(0, calendarOffset - 1))}
                    className={`p-1 transition-colors ${calendarOffset > 0 ? 'text-[#C5A059] hover:text-[#B28F4B]' : 'text-neutral-300 cursor-default'}`}
                  >
                    <svg className="w-6 h-6 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  
                  <div className="flex-1 flex justify-between px-16 lg:px-32">
                    {[0, 1, 2].map(offset => (
                      <span key={offset} className="text-[16px] font-normal text-neutral-800 tracking-wide">
                        {getMonthData(2026, 6 + calendarOffset + offset).monthName}
                      </span>
                    ))}
                  </div>
                  
                  <button 
                    type="button" 
                    onClick={() => setCalendarOffset(calendarOffset + 1)}
                    className="text-[#C5A059] hover:text-[#B28F4B] transition-colors p-1"
                  >
                    <svg className="w-6 h-6 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>

                {/* Calendars Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[0, 1, 2].map(offset => {
                    const { firstDay, daysInMonth } = getMonthData(2026, 6 + calendarOffset + offset);
                    return (
                      <div key={offset}>
                        <div className="grid grid-cols-7 text-center mb-3">
                          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                            <span key={day} className="text-[12px] font-normal text-neutral-500">{day}</span>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
                          {Array.from({length: firstDay}).map((_, i) => (
                            <div key={`empty-sticky-${i}`}></div>
                          ))}
                          {Array.from({length: daysInMonth}, (_, i) => i + 1).map(date => {
                            const monthPrefix = getMonthData(2026, 6 + calendarOffset + offset).monthName.split(' ')[0].substring(0, 3);
                            const dateStr = `${monthPrefix} ${date}`;
                            
                            const startDate = parseDateStr(pickupDate);
                            const endDate = parseDateStr(returnDate);
                            const cellDate = new Date(2026, 6 + calendarOffset + offset, date);
                            const isStart = isSameDay(cellDate, startDate);
                            const isEnd = isSameDay(cellDate, endDate);
                            const inRange = startDate && endDate && cellDate > startDate && cellDate < endDate;

                            let dayClass = "text-[14px] font-semibold w-[32px] h-[32px] mx-auto flex items-center justify-center rounded-full cursor-pointer transition-colors ";
                            if (isStart || isEnd) {
                              dayClass += "bg-black text-white font-bold";
                            } else if (inRange) {
                              dayClass += "bg-neutral-200 text-neutral-900 rounded-lg";
                            } else {
                              dayClass += "text-neutral-800 hover:bg-neutral-200";
                            }
                            
                            return (
                              <div 
                                key={date} 
                                onClick={() => {
                                  if (!pickupDate || (pickupDate && returnDate)) {
                                    setPickupDate(dateStr);
                                    setReturnDate('');
                                    setActiveDateField('return');
                                  } else {
                                    setReturnDate(dateStr);
                                    setShowCalendarPopup(false);
                                  }
                                }}
                                className={dayClass}
                              >
                                {date}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Show Cars Action Button */}
          <button 
            onClick={handleScrollToListings}
            className="bg-[#C5A059] hover:bg-[#B28F4B] text-white rounded-[14px] px-8 py-2.5 flex items-center justify-center font-bold text-[15px] transition-colors md:w-auto shadow-lg flex-shrink-0"
          >
            Show Cars
          </button>
        </div>
      </div>

      <section className={`relative w-full flex flex-col justify-start items-center select-none ${isDropdownMode ? 'bg-white py-4 md:py-6' : 'h-screen min-h-[520px] bg-transparent overflow-hidden pt-20'}`}>

        {/* Full-width Background Video exactly like the reference */}
        {!isDropdownMode && (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none z-0"
            >
              {/* The video source is now a local file. Drop your downloaded video into public/assets/bg-video.mp4 */}
              <source src="/assets/bg-video3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Elegant Text Overlay matching Lucid Motors */}
            <RevealOnScroll className="absolute inset-0 flex flex-col justify-start items-start px-6 md:px-12 lg:px-[10%] pt-24 md:pt-32 z-10 pointer-events-none">
              {renderSearchWidget()}

              <h1
                className="text-white text-[45px] md:text-[70px] lg:text-[85px] font-condensed font-normal tracking-tight leading-[1.1] mb-4 drop-shadow-md mt-24 md:mt-[15vh]"
              >
                W Luxury Car Rental
              </h1>
              <p className="text-white text-base md:text-[20px] font-medium max-w-lg md:max-w-2xl leading-relaxed opacity-100 font-sans tracking-wide drop-shadow-md">
                Choose from our range of top Luxury cars worldwide.
              </p>
            </RevealOnScroll>

          </>
        )}

        {isDropdownMode && (
          <div className="w-full max-w-[1100px] px-6">
            {renderSearchWidget()}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════
          MOBILE PANELS — full-screen overlays (hidden on md+)
          ═══════════════════════════════════════════════════════════ */}

        {/* ── PANEL 1B: Return Location Picker ── */}
        {mobilePanel === 'location-return' && (
          <div data-lenis-prevent className="md:hidden fixed inset-0 z-[200] bg-white flex flex-col animate-slideInLeft">
            <div className="flex items-center px-5 py-4 border-b border-neutral-100">
              <button onClick={() => setMobilePanel('details')} className="text-neutral-800 font-bold text-lg p-1 mr-3">✕</button>
              <span className="font-bold text-base text-neutral-900">Return location</span>
            </div>
            <div className="px-5 pt-4 pb-2">
              <div className="flex items-center gap-2 border-2 border-neutral-200 rounded-xl px-3 h-[46px]">
                <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                <input type="text" value={returnLocation} onChange={e => setReturnLocation(e.target.value)}
                  className="flex-grow text-sm font-bold text-neutral-900 outline-none" placeholder="City, airport, station..." autoFocus />
                {returnLocation && <button onClick={() => setReturnLocation('')} className="text-neutral-400 text-xs">✕</button>}
              </div>
            </div>
            <div className="flex-grow overflow-y-auto px-5 pb-8">
              <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mt-4 mb-3">Popular stations</p>
              {popularStations.map(name => (
                <button key={name} type="button" onClick={() => { setReturnLocation(name); setHoveredReturnStationKey(name); setMobilePanel('details'); }}
                  className="w-full flex items-center gap-4 py-3.5 border-b border-neutral-100 text-left">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" stroke="none" /><circle cx="12" cy="9" r="2.5" fill="white" stroke="none" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{name}</p>
                    <p className="text-xs text-neutral-400 truncate max-w-[240px]">{stationsData[name]?.address || ''}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── PANEL 1: Location Picker ── */}
        {mobilePanel === 'location' && (
          <div data-lenis-prevent className="md:hidden fixed inset-0 z-[200] bg-white flex flex-col animate-slideInLeft">
            <div className="flex items-center px-5 py-4 border-b border-neutral-100">
              <button onClick={() => setMobilePanel(null)} className="text-neutral-800 font-bold text-lg p-1 mr-3">✕</button>
              <span className="font-bold text-base text-neutral-900">Pickup location</span>
            </div>
            <div className="px-5 pt-4 pb-2">
              <div className="flex items-center gap-2 border-2 border-neutral-200 rounded-xl px-3 h-[46px]">
                <svg className="w-4 h-4 text-neutral-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
                <input type="text" value={pickupLocation} onChange={e => setPickupLocation(e.target.value)}
                  className="flex-grow text-sm font-bold text-neutral-900 outline-none" placeholder="City, airport, station..." autoFocus />
                {pickupLocation && <button onClick={() => setPickupLocation('')} className="text-neutral-400 text-xs">✕</button>}
              </div>
            </div>
            <div className="flex-grow overflow-y-auto px-5 pb-8">
              <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mt-4 mb-3">History</p>
              {historyStations.map(name => (
                <button key={name} type="button" onClick={() => { setPickupLocation(name); setHoveredStationKey(name); setMobilePanel('details'); }}
                  className="w-full flex items-center gap-4 py-3.5 border-b border-neutral-100 text-left">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 8 12 12 14 14" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{name}</p>
                    <p className="text-xs text-neutral-400">{stationsData[name]?.address || ''}</p>
                  </div>
                </button>
              ))}
              <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mt-5 mb-3">Popular stations</p>
              {popularStations.map(name => (
                <button key={name} type="button" onClick={() => { setPickupLocation(name); setHoveredStationKey(name); setMobilePanel('details'); }}
                  className="w-full flex items-center gap-4 py-3.5 border-b border-neutral-100 text-left">
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" stroke="none" /><circle cx="12" cy="9" r="2.5" fill="white" stroke="none" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-neutral-900">{name}</p>
                    <p className="text-xs text-neutral-400 truncate max-w-[240px]">{stationsData[name]?.address || ''}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── PANEL 2: Rental Details ── */}
        {mobilePanel === 'details' && (
          <div data-lenis-prevent className="md:hidden fixed inset-0 z-[200] bg-white flex flex-col animate-slideInLeft">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <span className="font-black text-base text-neutral-900">Your rental details</span>
              <button onClick={() => setMobilePanel(null)} className="text-neutral-800 font-bold text-lg p-1">✕</button>
            </div>
            <div className="flex-grow overflow-y-auto px-5 py-5 space-y-5">
              <div>
                <p className="text-xs font-black text-neutral-400 uppercase tracking-wider mb-2">Pickup &amp; return</p>
                <button type="button" onClick={() => setMobilePanel('location')}
                  className="w-full flex items-center gap-3 border-2 border-neutral-200 rounded-xl h-[50px] px-4 text-left">
                  <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <span className="text-sm font-bold text-neutral-900 truncate">{pickupLocation}</span>
                </button>
                <button type="button" onClick={() => setIsDifferentReturn(!isDifferentReturn)}
                  className="flex items-center gap-1.5 mt-2 text-xs font-bold text-[#C5A059]">
                  <span className="text-base leading-none">{isDifferentReturn ? '−' : '+'}</span>
                  {isDifferentReturn ? 'Same return location' : 'Different return location?'}
                </button>
                {isDifferentReturn && (
                  <div className="mt-2 flex items-center gap-3 border-2 border-neutral-200 rounded-xl h-[50px] px-4 cursor-pointer"
                    onClick={() => setMobilePanel('location-return')}>
                    <svg className="w-4 h-4 text-neutral-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    <span className="text-sm font-bold text-neutral-900 truncate">{returnLocation || 'Select return location'}</span>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <p className="text-xs font-black text-neutral-900 mb-2">Pickup</p>
                  <button type="button" onClick={() => { setActiveDateField('pickup'); setMobilePanel('calendar'); }}
                    className="w-full flex items-center gap-2 border-2 border-neutral-200 rounded-xl h-[46px] px-3 mb-2">
                    <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    <span className="text-xs font-bold text-neutral-900">{pickupDate || 'Select'}</span>
                  </button>
                  <button type="button" onClick={() => setMobilePanel('time-pickup')}
                    className="w-full flex items-center gap-2 border-2 border-neutral-200 rounded-xl h-[46px] px-3">
                    <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <span className="text-xs font-bold text-neutral-900">{pickupTime}</span>
                  </button>
                </div>
                <div>
                  <p className="text-xs font-black text-neutral-900 mb-2">Return</p>
                  <button type="button" onClick={() => { setActiveDateField('return'); setMobilePanel('calendar'); }}
                    className="w-full flex items-center gap-2 border-2 border-neutral-200 rounded-xl h-[46px] px-3 mb-2">
                    <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                    <span className="text-xs font-bold text-neutral-900">{returnDate || 'Select'}</span>
                  </button>
                  <button type="button" onClick={() => setMobilePanel('time-return')}
                    className="w-full flex items-center gap-2 border-2 border-neutral-200 rounded-xl h-[46px] px-3">
                    <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    <span className="text-xs font-bold text-neutral-900">{returnTime}</span>
                  </button>
                </div>
              </div>

              {/* Action buttons (Show Cars, Corporate Rate, Driver Age) centered at bottom of scroll content */}
              <div className="pt-4 flex flex-col items-center gap-4">
                <button type="button" onClick={() => { onSearch({ pickupLocation, returnLocation: isDifferentReturn ? returnLocation : pickupLocation, pickupDate, pickupTime, returnDate, returnTime, driverAge }); setMobilePanel(null); }}
                  className="w-full bg-[#C5A059] hover:bg-[#B28F4B] text-white font-condensed font-black text-sm uppercase h-[52px] rounded-xl shadow tracking-wider">
                  Show cars
                </button>
                <button type="button" className="text-xs font-bold text-neutral-600 underline">Apply corporate rate</button>
                <div className="relative">
                  <button type="button" onClick={() => setShowAgeDropdown(!showAgeDropdown)}
                    className="flex items-center gap-1.5 text-xs font-bold text-neutral-700">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    Driver's age {driverAge} <span className="text-[10px]">▼</span>
                  </button>
                  {showAgeDropdown && (
                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-white border border-neutral-200 rounded-xl shadow-xl w-[130px] max-h-[200px] overflow-y-auto z-10 py-1">
                      {['30+', '29', '28', '27', '26', '25', '24', '23', '22', '21', '20', '19', '18'].map(age => (
                        <button key={age} type="button" onClick={() => { setDriverAge(age); setShowAgeDropdown(false); }}
                          className={`w-full text-center px-4 py-2 text-xs font-bold ${driverAge === age ? 'text-[#C5A059]' : 'text-neutral-700'} hover:bg-neutral-50`}>
                          {age}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── PANEL 3: Calendar (full-screen stacked months) ── */}
        {mobilePanel === 'calendar' && (
          <div data-lenis-prevent className="md:hidden fixed inset-0 z-[300] bg-white flex flex-col animate-slideInLeft">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <button onClick={() => setMobilePanel('details')} className="text-neutral-700 p-1">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              </button>
              <span className="font-black text-base text-neutral-900">Trip dates</span>
              <button onClick={() => { setPickupDate(''); setReturnDate(''); }} className="text-xs font-black text-neutral-500 uppercase tracking-wide">✕ Clear</button>
            </div>
            <div className="flex-grow overflow-y-auto px-5 py-6 space-y-10">
              {renderMonth('June 2026', juneDays, 0)}
              {renderMonth('July 2026', julyDays, 30)}
              {renderMonth('August 2026', augustDays, 61)}
            </div>
            <div className="px-5 py-4 border-t border-neutral-100 bg-white">
              <button type="button" onClick={() => { if (pickupDate && returnDate) setMobilePanel('details'); }}
                disabled={!pickupDate || !returnDate}
                className="w-full bg-[#C5A059] disabled:bg-neutral-200 disabled:text-neutral-400 text-white font-condensed font-black text-sm uppercase h-[52px] rounded-xl shadow tracking-wider transition-colors">
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ── PANEL 4a: Time Picker – Pickup ── */}
        {mobilePanel === 'time-pickup' && (
          <div data-lenis-prevent className="md:hidden fixed inset-0 z-[300] bg-white flex flex-col animate-slideInLeft">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <button onClick={() => setMobilePanel('details')} className="text-neutral-700 p-1">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              </button>
              <span className="font-black text-base text-neutral-900">Select pickup time</span>
              <div className="w-8" />
            </div>
            <div className="grid grid-cols-2 gap-3 px-5 pt-4 pb-2">
              <div className="flex items-center gap-2 border-2 border-[#C5A059] bg-[#FDF8EF] rounded-xl h-[44px] px-3">
                <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <span className="text-xs font-bold text-neutral-900">{pickupDate || '—'}</span>
              </div>
              <div className="flex items-center gap-2 border-2 border-neutral-200 bg-neutral-50 rounded-xl h-[44px] px-3">
                <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <span className="text-xs font-bold text-neutral-900">{returnDate || '—'}</span>
              </div>
            </div>
            <p className="px-5 text-[11px] text-neutral-400 font-semibold mb-1">⏱ Opening Times: {stationsData[pickupLocation]?.hours || '05:00 AM - 11:59 PM'}</p>
            <div className="flex-grow overflow-y-auto px-5 pb-8">
              <TimePickerPopup activeTimeField="pickup" currentTime={pickupTime} selectTime={(slot) => { setPickupTime(slot); setMobilePanel('details'); }} />
            </div>
            <div className="px-5 py-4 border-t border-neutral-100 bg-white">
              <button type="button" onClick={() => setMobilePanel('details')}
                className="w-full bg-[#C5A059] text-white font-condensed font-black text-sm uppercase h-[52px] rounded-xl shadow tracking-wider">
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ── PANEL 4b: Time Picker – Return ── */}
        {mobilePanel === 'time-return' && (
          <div data-lenis-prevent className="md:hidden fixed inset-0 z-[300] bg-white flex flex-col animate-slideInLeft">
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <button onClick={() => setMobilePanel('details')} className="text-neutral-700 p-1">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
              </button>
              <span className="font-black text-base text-neutral-900">Select return time</span>
              <div className="w-8" />
            </div>
            <div className="grid grid-cols-2 gap-3 px-5 pt-4 pb-2">
              <div className="flex items-center gap-2 border-2 border-neutral-200 bg-neutral-50 rounded-xl h-[44px] px-3">
                <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <span className="text-xs font-bold text-neutral-900">{pickupDate || '—'}</span>
              </div>
              <div className="flex items-center gap-2 border-2 border-[#C5A059] bg-[#FDF8EF] rounded-xl h-[44px] px-3">
                <svg className="w-4 h-4 text-neutral-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                <span className="text-xs font-bold text-neutral-900">{returnDate || '—'}</span>
              </div>
            </div>
            <p className="px-5 text-[11px] text-neutral-400 font-semibold mb-1">⏱ Opening Times: {stationsData[pickupLocation]?.hours || '05:00 AM - 11:59 PM'}</p>
            <div className="flex-grow overflow-y-auto px-5 pb-8">
              <TimePickerPopup activeTimeField="return" currentTime={returnTime} selectTime={(slot) => { setReturnTime(slot); setMobilePanel('details'); }} />
            </div>
            <div className="px-5 py-4 border-t border-neutral-100 bg-white">
              <button type="button" onClick={() => setMobilePanel('details')}
                className="w-full bg-[#C5A059] text-white font-condensed font-black text-sm uppercase h-[52px] rounded-xl shadow tracking-wider">
                Continue
              </button>
            </div>
          </div>
        )}


        {isSticky && !isDropdownMode && (
          <div className="w-full max-w-[1100px] px-6 h-[420px] md:h-[310px] pointer-events-none" />
        )}

      </section>

      {!isDropdownMode && (
        <>
          {/* Section 1.5: Scroll-linked Driving Animation */}
          <div
            ref={scrollAnimationRef}
            id="car-animation-section"
            className="w-full h-[300vh] bg-transparent relative z-10 block"
          >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">
              {/* Subtle background text */}
              <h2 className="absolute top-[20%] text-[#141414] font-condensed font-normal text-[13vw] md:text-[9vw] leading-[0.9] md:whitespace-nowrap select-none pointer-events-none w-full text-center">
                DRIVE EXCELLENCE
              </h2>

              {/* Car Container that drives across */}
              <div
                className="car-container-animate absolute z-20 flex items-center justify-center drop-shadow-2xl pointer-events-none"
              >
                <div className="relative w-[800px] h-[436px] origin-center scale-[0.4] sm:scale-[0.65] md:scale-100 transition-transform duration-300">
                  {/* Main Car Body */}
                  <img
                    src="/assets/cars/rr_body.png"
                    alt="Rolls Royce"
                    className="absolute inset-0 w-full h-full object-contain z-30 origin-center"
                    style={{ 
                      // Custom mask if needed, but no mixBlendMode screen to ensure visibility
                      WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 82%), linear-gradient(to right, transparent 2%, black 7%, black 93%, transparent 98%)',
                      maskImage: 'linear-gradient(to bottom, black 70%, transparent 82%), linear-gradient(to right, transparent 2%, black 7%, black 93%, transparent 98%)',
                      WebkitMaskComposite: 'intersect',
                      maskComposite: 'intersect'
                    }}
                  />

                  {/* Front Wheel Overlay */}
                  <img
                    src="/assets/cars/rr_wheel.png"
                    alt="Front Wheel"
                    className="car-wheel-front absolute z-40"
                    style={{
                      width: '125px',
                      height: '125px',
                      left: '109px',
                      top: '240px',
                      borderRadius: '50%'
                    }}
                  />

                  {/* Rear Wheel Overlay */}
                  <img
                    src="/assets/cars/rr_wheel.png"
                    alt="Rear Wheel"
                    className="car-wheel-rear absolute z-40"
                    style={{
                      width: '125px',
                      height: '125px',
                      left: '570px',
                      top: '240px',
                      borderRadius: '50%'
                    }}
                  />
                </div>
              </div>

              <div className="car-text-animate absolute bottom-[20%] text-center z-30 pointer-events-none" style={{ opacity: 0 }}>
                <p className="text-[#C5A059] font-bold tracking-widest text-[11px] uppercase mb-2">Uncompromising Performance</p>
                <h3 className="text-white text-3xl font-normal font-condensed">The journey begins here.</h3>
              </div>
              {/* Sparkle icon removed */}
            </div>
          </div>

          {/* Section 1: Image Banner */}
          <div className="w-full bg-transparent py-12 md:py-24 px-4 md:px-8 relative z-10">
            <RevealOnScroll className="max-w-[1200px] mx-auto w-full relative rounded-[24px] md:rounded-[32px] overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center bg-neutral-900 shadow-2xl">
              <img src="/assets/premium_interior.png" className="absolute inset-0 w-full h-full object-cover" alt="Luxury car interior" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              <div className="relative z-10 px-8 md:px-16 lg:px-20 w-full text-left">
                <AnimatedBannerText />
                <button
                  type="button"
                  onClick={handleScrollToListings}
                  className="bg-white text-black hover:bg-neutral-200 px-7 py-3 md:px-8 md:py-3.5 font-sans font-semibold text-[14px] md:text-[15px] rounded-full transition-all duration-300 shadow-lg"
                >
                  Rent Now
                </button>
              </div>
            </RevealOnScroll>
          </div>

          {/* Section 1.5: Infinite Logo Marquee */}
          <div className="w-full bg-[#070707] py-12 relative overflow-hidden flex items-center">
            {/* Gradient Fades for smooth entry/exit */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#070707] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#070707] to-transparent z-10 pointer-events-none"></div>
            
            <div className="w-max flex animate-marquee cursor-default">
              {/* First Set of Logos */}
              <div className="flex space-x-20 px-10 items-center justify-center">
                {MARQUEE_BRANDS.map((brand, i) => (
                  <div key={`brand-1-${i}`} className="w-16 h-12 md:w-24 md:h-16 flex items-center justify-center transition-transform duration-500 hover:scale-110 cursor-pointer">
                    <img 
                      src={`/assets/logos/${brand.file}`} 
                      alt={brand.name} 
                      className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-all duration-500 drop-shadow-[0_8px_16px_rgba(0,0,0,1)]" 
                    />
                  </div>
                ))}
              </div>
              {/* Second Set of Logos (for seamless looping) */}
              <div className="flex space-x-20 px-10 items-center justify-center">
                {MARQUEE_BRANDS.map((brand, i) => (
                  <div key={`brand-2-${i}`} className="w-16 h-12 md:w-24 md:h-16 flex items-center justify-center transition-transform duration-500 hover:scale-110 cursor-pointer">
                    <img 
                      src={`/assets/logos/${brand.file}`} 
                      alt={brand.name} 
                      className="max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-all duration-500 drop-shadow-[0_8px_16px_rgba(0,0,0,1)]" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Spotlights Recommendation Carousel */}
          <div className="w-full bg-transparent text-white py-16 px-6 text-center select-none relative z-10 overflow-hidden">
            <RevealOnScroll className="max-w-[1100px] mx-auto w-full">
              <h2 className="font-sans font-normal text-2xl md:text-4xl text-white tracking-wide uppercase text-center leading-none">
                FIND YOUR LUXURY CAR IN OUR FLEET
              </h2>

              {/* Desktop: Carousel grid of 2 cards */}
              <div className="hidden md:grid grid-cols-2 gap-8 mt-12 text-left">
                {carouselSlides[currentSlide].map((item, idx) => (
                  <CarCard
                    key={"reco-card-" + idx}
                    car={item}
                    viewMode="fleet"
                    onClick={handleScrollToListings}
                  />
                ))}
              </div>

              {/* Section 3: Features Indicators Row */}
              <div className="w-full bg-[#070707] border-t border-neutral-900/50 py-10 px-6 relative z-10 overflow-hidden">
                <RevealOnScroll className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left w-full">
                  {/* Global reach */}
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3 text-[18px] font-bold text-white">
                      <Globe className="w-6 h-6 text-white stroke-[2.5]" />
                      <span>Global reach</span>
                    </div>
                    <p className="text-[25px] font-bold text-white leading-[1.3] pr-4">
                      2,000+ <span className="text-[#C5A059]">W</span> Luxury stations in over 105 countries
                    </p>
                  </div>

                  {/* Top fleet */}
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3 text-[18px] font-bold text-white">
                      <CarFront className="w-6 h-6 text-white stroke-[2.5]" />
                      <span>Top fleet</span>
                    </div>
                    <p className="text-[25px] font-bold text-white leading-[1.3] pr-4">
                      Choose your favorite Luxury car from our wide range
                    </p>
                  </div>

                  {/* Exceptional service */}
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-3 text-[18px] font-bold text-white">
                      <HandHeart className="w-6 h-6 text-white stroke-[2.5]" />
                      <span>Exceptional service</span>
                    </div>
                    <p className="text-[25px] font-bold text-white leading-[1.3] pr-4">
                      Stress-free, trustworthy, no hidden costs
                    </p>
                  </div>
                </RevealOnScroll>
              </div>

              {/* Mobile: Smooth Horizontal Scroll of all cards */}
              <div
                ref={mobileFleetScrollRef}
                className="flex md:hidden overflow-x-auto snap-x snap-mandatory gap-4 mt-8 pb-6 text-left no-scrollbar px-6 -mx-6"
                onScroll={(e) => {
                  const scrollLeft = e.target.scrollLeft;
                  const childWidth = e.target.scrollWidth / (carouselSlides.flat().length);
                  const newSlide = Math.round(scrollLeft / childWidth);
                  if (newSlide >= 0 && newSlide < carouselSlides.flat().length && newSlide !== currentMobileSlide) {
                    setCurrentMobileSlide(newSlide);
                  }
                }}
              >
                {carouselSlides.flat().map((item, idx) => (
                  <div key={"mobile-reco-" + idx} className="min-w-[85vw] snap-center shrink-0 flex">
                    <div className="w-full h-full">
                      <CarCard
                        car={item}
                        viewMode="fleet"
                        onClick={handleScrollToListings}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Controls (Desktop) */}
              <div className="hidden md:flex items-center justify-between mt-8 select-none">
                {/* Carousel dots indicator */}
                <div className="flex gap-2">
                  {carouselSlides.map((_, index) => (
                    <button
                      key={`desktop-dot-${index}`}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${currentSlide === index ? 'bg-white scale-110' : 'bg-neutral-600 hover:bg-neutral-500'
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Chevrons Navigation circles */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(prev => (prev === 0 ? carouselSlides.length - 1 : prev - 1))}
                    className="w-10 h-10 rounded-full border border-neutral-800 hover:border-neutral-400 hover:bg-neutral-900 flex items-center justify-center text-white transition-colors"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentSlide(prev => (prev === carouselSlides.length - 1 ? 0 : prev + 1))}
                    className="w-10 h-10 rounded-full border border-neutral-800 hover:border-neutral-400 hover:bg-neutral-900 flex items-center justify-center text-white transition-colors"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Carousel Controls (Mobile) */}
              <div className="flex md:hidden items-center justify-between mt-8 select-none">
                {/* Carousel dots indicator */}
                <div className="flex gap-2">
                  {carouselSlides.flat().map((_, index) => (
                    <button
                      key={`mobile-dot-${index}`}
                      type="button"
                      onClick={() => {
                        const mobileContainer = mobileFleetScrollRef.current;
                        if (mobileContainer) {
                          const childWidth = mobileContainer.scrollWidth / carouselSlides.flat().length;
                          mobileContainer.scrollTo({ left: index * childWidth, behavior: 'smooth' });
                        }
                      }}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${currentMobileSlide === index ? 'bg-white scale-110' : 'bg-neutral-600 hover:bg-neutral-500'
                        }`}
                      aria-label={`Go to car ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Chevrons Navigation circles */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const mobileContainer = mobileFleetScrollRef.current;
                      if (mobileContainer) {
                        const childWidth = mobileContainer.scrollWidth / carouselSlides.flat().length;
                        mobileContainer.scrollBy({ left: -childWidth, behavior: 'smooth' });
                      }
                    }}
                    className="w-10 h-10 rounded-full border border-neutral-800 hover:border-neutral-400 hover:bg-neutral-900 flex items-center justify-center text-white transition-colors"
                    aria-label="Previous car"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const mobileContainer = mobileFleetScrollRef.current;
                      if (mobileContainer) {
                        const childWidth = mobileContainer.scrollWidth / carouselSlides.flat().length;
                        mobileContainer.scrollBy({ left: childWidth, behavior: 'smooth' });
                      }
                    }}
                    className="w-10 h-10 rounded-full border border-neutral-800 hover:border-neutral-400 hover:bg-neutral-900 flex items-center justify-center text-white transition-colors"
                    aria-label="Next car"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Section 4: Browse Popular Types Carousel */}
          <PopularTypesCarousel onScrollToListings={handleScrollToListings} />

          {/* Section 4.5: Why W Luxury? */}
          <div id="why-w-luxury" className="w-full bg-[#f4f4f4] text-neutral-900 py-14 px-6 relative z-10 border-t border-neutral-100 overflow-hidden">
            <RevealOnScroll className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-8 text-left w-full">
              {/* Left Column */}
              <div className="w-full lg:w-[300px] flex-shrink-0 flex flex-col justify-center">
                <h2 className="font-sans font-normal text-4xl md:text-[48px] lg:text-[56px] text-[#191919] uppercase leading-[0.9] tracking-tight mb-5">
                  Why <br /> <span className="whitespace-nowrap"><span className="text-[#C5A059]">W</span> Luxury</span>
                </h2>
                <p className="text-[#191919]/80 text-[13px] leading-[1.6] font-normal pr-4">
                  W Luxury is a next-generation rental car service that makes driving as convenient as it is luxurious. Pick a vehicle from our exclusive fleet, get it delivered to your doorstep, and drive off in a W Luxury car.
                </p>
              </div>

              {/* Right Column (Cards) */}
              <div className="flex-grow flex flex-col md:flex-row gap-6">
                {/* Tall Card (Door-to-Door) */}
                <div className="flex-grow rounded-[32px] p-6 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300 min-h-[220px]">
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src="/assets/door_to_door_delivery.png" 
                      alt="Door-to-Door Delivery" 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                    />
                    {/* Dark gradient overlay for text readability exactly like image */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/90"></div>
                  </div>

                  {/* Top Text Content */}
                  <div className="relative z-10 mt-2">
                    <h3 className="text-[20px] md:text-[22px] font-bold text-white mb-3 leading-[1.2] tracking-wide uppercase">Door-to-Door<br/>Delivery</h3>
                    <p className="text-white/70 text-[14px] leading-[1.4] max-w-[90%] font-light">
                      W Luxury delivers and picks up your vehicle wherever you are, on your schedule.
                    </p>
                  </div>

                  {/* Bottom Link */}
                  <div className="relative z-10 mt-auto pb-2">
                    <a href="#" className="inline-flex items-center text-[#C5A059] hover:text-[#d4b472] font-semibold text-[18px] transition-colors">
                      Learn More <ArrowRight className="w-5 h-5 ml-1" />
                    </a>
                  </div>
                </div>

                {/* Two Small Cards Stacked */}
                <div className="w-full md:w-[380px] flex-shrink-0 flex flex-col gap-4">
                  {/* Top Small Card */}
                  <div className="bg-white rounded-[24px] p-5 flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-shadow border border-neutral-200/60 min-h-[95px]">
                    <div className="relative z-10 w-[80%]">
                      <h3 className="text-[18px] md:text-[20px] font-bold text-[#191919] mb-2 leading-[1.2] uppercase tracking-wide">Fair Toll + Fuel Plan</h3>
                      <p className="text-[#191919]/70 text-[13px] leading-[1.5]">
                        Pay only for what you use.<br />No surprise surcharges.
                      </p>
                    </div>
                    <div className="relative z-10 mt-6">
                      <a href="#" className="inline-flex items-center text-[#C5A059] hover:text-[#a88647] font-bold text-[15px] transition-colors">
                        Learn More <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                    <div className="absolute right-[-5%] top-[15%] w-[40%] h-[80%] opacity-20 pointer-events-none flex items-center justify-center text-[#191919]">
                      <Fuel className="w-32 h-32 transform rotate-12 drop-shadow-xl" strokeWidth={1} />
                    </div>
                  </div>

                  {/* Bottom Small Card */}
                  <div className="bg-white rounded-[24px] p-5 flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-shadow border border-neutral-200/60 min-h-[95px]">
                    <div className="relative z-10">
                      <h3 className="text-[18px] md:text-[20px] font-bold text-[#191919] mb-2 leading-[1.2] uppercase tracking-wide">The Car You Want.<br />The Car You Need</h3>
                      <p className="text-[#191919]/70 text-[13px] leading-[1.5] max-w-[90%]">
                        Only the best: Range Rover, Porsche, BMW, Mercedes, Jaguar, or Maserati.
                      </p>
                    </div>
                    <div className="relative z-10 mt-6">
                      <a href="#" className="inline-flex items-center text-[#C5A059] hover:text-[#a88647] font-bold text-[15px] transition-colors">
                        Choose a Car <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Section 5: W LUXURY CAR RENTAL WORLDWIDE Carousel */}
          <BoutiqueCarousel />

          {/* Section 6: WHERE WOULD YOU LIKE TO START FROM? */}
          <div className="w-full bg-[#f4f4f4] text-neutral-900 py-20 px-6 relative z-10 border-t border-neutral-200">
            <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 text-left items-start">
              {/* Left column */}
              <div className="lg:col-span-5 pr-4">
                <h2 className="font-sans font-normal text-4xl md:text-[56px] lg:text-[64px] text-[#191919] uppercase leading-[0.9] tracking-tight">
                  WHERE WOULD YOU LIKE TO START FROM?
                </h2>
              </div>

              {/* Right column */}
              <div className="lg:col-span-7 bg-white rounded-[32px] p-6 md:p-10 shadow-sm">
                {/* Tab Pills list */}
                <div className="flex flex-wrap gap-2 pb-6">
                  {['Europe', 'North America', 'Africa', 'Asia', 'South America', 'Australia'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveRegionTab(tab)}
                      className={`px-5 py-2.5 rounded-full text-[13px] font-bold transition-all ${activeRegionTab === tab
                          ? 'bg-[#191919] text-white'
                          : 'bg-[#f4f4f4] text-[#191919] hover:bg-[#e5e5e5]'
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Listed Countries */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-4 text-[13px] font-bold text-[#191919]">
                  {regionCountries[activeRegionTab]?.map((country) => (
                    <div
                      key={country}
                      onClick={() => handleDestinationClick(country)}
                      className="hover:text-[#C5A059] cursor-pointer transition-colors truncate pr-2"
                      title={country}
                    >
                      {country}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 7: PLACES TO START YOUR JOURNEY */}
          <div className="w-full bg-white text-neutral-900 py-20 px-6 relative z-10 border-t border-neutral-100">
            <div className="max-w-[1100px] mx-auto text-center">
              <h2
                className="font-condensed font-normal text-3xl md:text-4xl lg:text-[48px] text-[#191919] tracking-wide uppercase text-center leading-[1.1] mb-16"
                style={{ WebkitTextStroke: '1.5px #191919' }}
              >
                PLACES TO START YOUR JOURNEY
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { city: 'Los Angeles', img: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=600&q=80' },
                  { city: 'New York City', img: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=600&q=80' },
                  { city: 'Miami, FL', img: 'https://images.unsplash.com/photo-1535498730771-e735b998cd64?auto=format&fit=crop&w=600&q=80' },
                  { city: 'San Francisco', img: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=600&q=80' },
                  { city: 'Las Vegas', img: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80' },
                  { city: 'London', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80' }
                ].map((item, idx) => (
                  <div
                    key={`dest-${idx}`}
                    onClick={() => handleDestinationClick(item.city)}
                    className="h-[240px] rounded-3xl overflow-hidden relative group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
                  >
                    <img
                      src={item.img}
                      alt={item.city}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay shadow gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />

                    {/* Badge */}
                    <span className="absolute bottom-5 left-5 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border border-white/5 z-20">
                      {item.city}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 8: GOOD TO KNOW WHEN RENTING WITH W Accordion */}
          {(() => {
            const wFaqs = [
              { q: "How can I pick up a rental car?", a: "We offer door-to-door delivery and pickup. Simply select your location and our concierge will bring the vehicle directly to you." },
              { q: "Where can I rent a car with W Luxury?", a: "W Luxury is available in major cities worldwide, including New York, Miami, Los Angeles, and across Europe." },
              { q: "What types of cars can I rent with W Luxury?", a: "Our exclusive fleet features the latest models from top brands including Range Rover, Porsche, BMW, Mercedes, Jaguar, and Maserati." },
              { q: "What makes your fleet special?", a: "Every vehicle in our fleet is brand new, meticulously maintained, and fully loaded with premium options and features." },
              { q: "On what terms can I rent a luxury car?", a: "You need to be 25 or older, hold a valid driver's license, and provide a major credit card for the security deposit." },
              { q: "What happens if I need to cancel my car reservation?", a: "We offer flexible cancellation policies. Reservations can typically be canceled up to 48 hours in advance for a full refund." },
              { q: "Why should I rent in New York with W Luxury?", a: "Navigating New York is better in comfort. We skip the rental counter lines and bring the luxury directly to your hotel or residence." },
              { q: "What do I need to rent a car with W Luxury?", a: "A valid driver's license, proof of insurance, and a major credit card in the renter's name." },
              { q: "Can I rent a car for a month or longer with W Luxury?", a: "Yes, we offer flexible long-term rentals and subscriptions for month-to-month flexibility without long-term commitments." },
              { q: "Is insurance included with W Luxury rentals?", a: "All W Luxury vehicles come with comprehensive insurance coverage. Additional coverage options are available at checkout for full peace of mind." }
            ];

            return (
              <div className="w-full bg-white text-neutral-900 py-20 px-6 relative z-10 border-t border-neutral-100 overflow-hidden">
                <RevealOnScroll className="max-w-[1100px] mx-auto w-full text-center">
                  <h2
                    style={{ lineHeight: "1.2" }}
                    className="font-sans font-normal text-3xl md:text-4xl lg:text-[48px] xl:text-[56px] text-[#191919] tracking-tight uppercase text-center mb-16"
                  >
                    GOOD TO KNOW WHEN RENTING <span className="inline-block whitespace-nowrap">WITH <span className="text-[#C5A059]">W</span></span>
                  </h2>

                  <div className="text-left w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    {/* Left Column */}
                    <div className="flex flex-col gap-4 md:gap-5">
                      {wFaqs.slice(0, 5).map((faq, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? null : idx)}
                          className="bg-[#f4f4f4] rounded-2xl py-5 px-6 flex flex-col cursor-pointer transition-all duration-200 group hover:shadow-lg"
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span className={`font-normal text-[15px] md:text-[16px] transition-colors ${activeFaqIndex === idx ? 'text-[#C5A059]' : 'text-[#191919] group-hover:text-[#C5A059]'} select-none`}>
                              {faq.q}
                            </span>
                            <span className="text-[#C5A059] font-light text-2xl flex-shrink-0 leading-none">
                              {activeFaqIndex === idx ? '−' : '+'}
                            </span>
                          </div>
                          {activeFaqIndex === idx && (
                            <p className="text-[14px] text-[#191919]/80 font-light leading-[1.6] mt-4 animate-fadeIn">
                              {faq.a}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Right Column */}
                    <div className="flex flex-col gap-4 md:gap-5">
                      {wFaqs.slice(5).map((faq, index) => {
                        const idx = index + 5;
                        return (
                          <div
                            key={idx}
                            onClick={() => setActiveFaqIndex(activeFaqIndex === idx ? null : idx)}
                            className="bg-[#f4f4f4] rounded-2xl py-5 px-6 flex flex-col cursor-pointer transition-all duration-200 group hover:shadow-lg"
                          >
                            <div className="flex items-center justify-between gap-4">
                              <span className={`font-normal text-[15px] md:text-[16px] transition-colors ${activeFaqIndex === idx ? 'text-[#C5A059]' : 'text-[#191919] group-hover:text-[#C5A059]'} select-none`}>
                                {faq.q}
                              </span>
                              <span className="text-[#C5A059] font-light text-2xl flex-shrink-0 leading-none">
                                {activeFaqIndex === idx ? '−' : '+'}
                              </span>
                            </div>
                            {activeFaqIndex === idx && (
                              <p className="text-[14px] text-[#191919]/80 font-light leading-[1.6] mt-4 animate-fadeIn">
                                {faq.a}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            );
          })()}

          {/* Section 9: Instagram */}
          <div className="w-full bg-white text-neutral-900 pt-10 pb-8 relative z-10 border-t border-[#e5e5e5]">
            <div className="w-[100vw] relative left-1/2 -translate-x-1/2 bg-white pb-0 pl-6 md:pl-12 lg:pl-20 overflow-hidden">
              <RevealOnScroll className="w-full flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12">
                {/* Text Side */}
                <div className="w-full md:w-[28%] flex-shrink-0 text-left pr-6 md:pr-0 flex items-center">
                  <h2 className="font-sans font-bold text-3xl md:text-[36px] lg:text-[44px] text-neutral-500 leading-[1.2] tracking-tight">
                    Follow us <br className="hidden md:block" /> on Instagram <br />
                    <span className="mt-4 block font-bold text-[#191919]">@Real.Car</span>
                  </h2>
                </div>
                
                {/* Images Side */}
                <div className="w-full md:w-[72%] flex gap-1 overflow-x-auto no-scrollbar pb-4 pr-6 pl-0 md:pl-4">
                  {[
                    "https://cdn-api.realcar.nyc/main_banner_images/data/000/000/074/original/326f274ea93a21b59d8e7d6cec60066b.jpg",
                    "https://cdn-api.realcar.nyc/vertical_banner_images/data/000/000/077/original/b594a823867b73049cabcdb53bac0c33.jpg",
                    "https://cdn-api.realcar.nyc/main_banner_images/data/000/000/010/original/06aaeff587d0d47f0de18343d7c3b2ef.jpg",
                    "https://cdn-api.realcar.nyc/vertical_banner_images/data/000/000/010/original/a28563d1cae7ddc14cf36f62b81f356c.jpg",
                    "https://cdn-api.realcar.nyc/main_banner_images/data/000/000/011/original/273f1afb63faba2172f69c9e702deaa3.jpg",
                    "https://cdn-api.realcar.nyc/vertical_banner_images/data/000/000/011/original/22557b4957d09fc6eca26d24080e23b1.jpg",
                    "https://cdn-api.realcar.nyc/main_banner_images/data/000/000/012/original/279dcf72ecf2b72dfcf7c2cf0bff188a.jpg",
                    "https://cdn-api.realcar.nyc/vertical_banner_images/data/000/000/012/original/7f74bcb2a9e9fb9d57364ac3625bace5.jpg"
                  ].map((img, idx) => (
                    <div key={idx} className="flex-shrink-0 w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[200px] lg:h-[230px]">
                      <img
                        src={img}
                        alt="Instagram Photo"
                        className="w-full h-full object-cover select-none pointer-events-none bg-neutral-100"
                        onError={(e) => {
                          // Fallback placeholder if local image is missing
                          e.target.src = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400";
                        }}
                      />
                    </div>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>

          {/* Footer Section */}
          <footer className="w-full bg-[#1a1a1a] py-14 px-6 relative z-10 text-left">
            <div className="max-w-[1100px] mx-auto">
              {/* Logo */}
              <div className="mb-10">
                <span className="font-sans font-light text-white tracking-[0.35em] text-sm uppercase select-none">
                  W &nbsp; L U X U R Y
                </span>
              </div>

              {/* 3-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
                {/* Column 1 */}
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'FAQ', highlight: false },
                    { label: 'BONUS PROGRAM', highlight: true },
                    { label: 'CONTACT US', highlight: false },
                    { label: 'RENTAL CAR DELIVERY IN MIAMI', highlight: false },
                    { label: 'ONE-WAY CAR RENTAL', highlight: false },
                    { label: 'LONG-TERM CAR RENTAL', highlight: false },
                  ].map(({ label, highlight }) => (
                    <a
                      key={label}
                      href="#"
                      className={`text-[11px] font-semibold tracking-wider uppercase transition-colors ${highlight ? 'text-[#C5A059] hover:text-[#d4b472]' : 'text-neutral-300 hover:text-white'}`}
                    >
                      {label}
                    </a>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-3">
                  {[
                    'TERMS & CONDITIONS',
                    'PRIVACY POLICY',
                    'REVIEWS',
                    'VACANCIES',
                  ].map((label) => (
                    <a
                      key={label}
                      href="#"
                      className="text-[11px] font-semibold tracking-wider uppercase text-neutral-300 hover:text-white transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                </div>

                {/* Column 3 – Contact & Social */}
                <div className="flex flex-col gap-4">
                  <a href="mailto:HELLO@WLUXURY.NYC" className="text-[11px] font-semibold tracking-wider uppercase text-neutral-300 hover:text-white transition-colors">
                    HELLO@WLUXURY.NYC
                  </a>
                  <a href="tel:+13053062353" className="text-[13px] font-semibold text-neutral-300 hover:text-white transition-colors">
                    +1 305 306 2353
                  </a>

                  {/* Social icons */}
                  <div className="flex gap-3 mt-1">
                    {/* Facebook */}
                    <a href="#" aria-label="Facebook" className="text-neutral-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      </svg>
                    </a>
                    {/* Instagram */}
                    <a href="#" aria-label="Instagram" className="text-neutral-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a href="#" aria-label="LinkedIn" className="text-neutral-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </a>
                    {/* Pinterest */}
                    <a href="#" aria-label="Pinterest" className="text-neutral-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                      </svg>
                    </a>
                    {/* X / Twitter */}
                    <a href="#" aria-label="X" className="text-neutral-400 hover:text-white transition-colors">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>

                  {/* NYC Association badge */}
                  <div className="mt-2 flex items-center gap-2">
                    <img
                      src="https://realcar.miami/assets/images/nycahc-badge.png"
                      alt="New York City Association of Hotel Concierges"
                      className="h-12 w-auto object-contain"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <span className="text-[9px] text-neutral-500 leading-tight max-w-[120px]">
                      New York City Association<br />of Hotel Concierges
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="border-t border-neutral-800 pt-6">
                <p className="text-[9px] font-medium tracking-widest uppercase text-neutral-500">
                  © 2026 W LUXURY. ALL RIGHTS RESERVED.
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
