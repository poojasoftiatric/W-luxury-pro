import React, { useState, useEffect } from 'react';
import { X, User, Briefcase, Info, Navigation, Car } from 'lucide-react';
import PriceDetailsModal from './PriceDetailsModal';

export default function CarCardDetails({ car, onClose, onNext, searchParams }) {
  const [bookingOption, setBookingOption] = useState('bestPrice');
  const [mileage, setMileage] = useState('included');
  const [isPriceDetailsModalOpen, setIsPriceDetailsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('side'); // 'side', 'front', 'back'

  // Rates directly matching screenshot
  const stayFlexibleRate = 4.79;
  const unlimitedMileageRate = 4.55;

  // Calculate rental days
  const getDays = () => {
    if (searchParams?.pickupDate && searchParams?.returnDate) {
      const start = new Date(searchParams.pickupDate);
      const end = new Date(searchParams.returnDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      return diffDays;
    }
    return 15; // default for UI math based on screenshot (1381.69 / 92.11 ≈ 15 days)
  };
  const days = getDays();
  
  // Calculate daily rate
  let dailyRate = car.baseRate || 92.11; 
  if (bookingOption === 'stayFlexible') dailyRate += stayFlexibleRate;
  if (mileage === 'unlimited') dailyRate += unlimitedMileageRate;
  
  const totalRate = dailyRate * days;

  const handleNext = () => {
    onNext(car, bookingOption, mileage);
  };

  const getImageStyle = () => {
    if (viewMode === 'front') {
      return {
        transform: 'perspective(600px) rotateY(-35deg) scaleX(-1) translateX(12px)',
        transition: 'transform 0.5s ease-out'
      };
    }
    if (viewMode === 'back') {
      return {
        transform: 'perspective(600px) rotateY(35deg) scaleX(1) translateX(-12px)',
        transition: 'transform 0.5s ease-out'
      };
    }
    return {
      transform: 'perspective(600px) rotateY(0deg) scaleX(1) translateX(0px)',
      transition: 'transform 0.5s ease-out'
    };
  };

  return (
    <div className="relative bg-white w-full rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden animate-fadeIn border border-neutral-200 h-[520px]">
      
      {/* Left Pane */}
      <div 
        className="relative w-full md:w-1/2 p-5 md:p-6 flex flex-col items-center justify-between text-center overflow-hidden shrink-0 h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{
          background: 'linear-gradient(to bottom, #725845 0%, #16181b 75%, #0a0a0c 100%)'
        }}
      >
        <div className="z-10 w-full">
          <h3 className="font-condensed font-normal text-2xl md:text-3xl text-white uppercase tracking-wide leading-none drop-shadow-md">
            {car.name}
          </h3>
          <p className="text-white/90 font-bold text-xs mt-1.5">{car.category}</p>
        </div>
        
        {/* Car Image Container with Prev/Next Controls */}
        <div className="z-10 flex-grow flex flex-col items-center justify-center w-full my-1.5 max-h-[220px]">
          <div className="flex items-center justify-between w-full px-1">
            {/* Back View Button (<) */}
            <button 
              type="button"
              onClick={() => setViewMode(viewMode === 'back' ? 'side' : 'back')}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 text-[14px] font-black border backdrop-blur-md shadow-md select-none ${
                viewMode === 'back' 
                  ? 'bg-[#C5A059] border-[#C5A059] text-white' 
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white/90'
              }`}
              title="Back View"
            >
              &lt;
            </button>
            
            <div className="flex-grow flex items-center justify-center overflow-visible max-w-[340px] h-[160px]">
              <img 
                src={car.image} 
                alt={car.name}
                className="w-full h-auto object-contain drop-shadow-2xl scale-110" 
                style={getImageStyle()}
              />
            </div>

            {/* Front View Button (>) */}
            <button 
              type="button"
              onClick={() => setViewMode(viewMode === 'front' ? 'side' : 'front')}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90 text-[14px] font-black border backdrop-blur-md shadow-md select-none ${
                viewMode === 'front' 
                  ? 'bg-[#C5A059] border-[#C5A059] text-white' 
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white/90'
              }`}
              title="Front View"
            >
              &gt;
            </button>
          </div>

          <span className="text-[9px] uppercase tracking-widest font-black text-white/40 mt-2.5 select-none">
            {viewMode === 'side' && 'Side View'}
            {viewMode === 'front' && 'Front Angle'}
            {viewMode === 'back' && 'Rear Angle'}
          </span>
        </div>

        <div className="z-10 w-full flex flex-col items-center gap-3.5 mt-auto">
          <div className="bg-[#EBECEC] text-neutral-800 px-3 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-md w-fit">
            Premium Brand <Info className="w-3 h-3 text-neutral-500" />
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px] font-bold text-white/90 w-full px-4">
            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-white/60"/> {car.seats} Seats</span>
            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-white/60"/> {car.suitcases} Suitcases</span>
            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-white/60"/> {car.bags} Bags</span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 bg-white text-black rounded flex items-center justify-center text-[9px] font-black leading-none mr-0.5">A</span>
              {car.transmission}
            </span>
            <span className="flex items-center gap-1.5"><Car className="w-3.5 h-3.5 text-white/60" fill="currentColor"/> {car.doors} Doors</span>
            {car.gps && <span className="flex items-center gap-1.5"><Navigation className="w-3.5 h-3.5 text-white/60"/> GPS</span>}
          </div>
        </div>
      </div>

      {/* Right Pane */}
      <div className="w-full md:w-1/2 bg-white flex flex-col relative shrink-0 h-full">
        
        <div className="p-5 md:p-6 flex-grow overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex items-center justify-between mb-3.5">
            <h4 className="font-semibold text-[13px] text-[#191919] uppercase tracking-wider">Booking option</h4>
            <button onClick={onClose} className="text-neutral-500 hover:text-black">
              <X className="w-5 h-5 stroke-[2]" />
            </button>
          </div>
          
          <div className="space-y-2 mb-4">
            <div 
              onClick={() => setBookingOption('bestPrice')}
              className={`border rounded-lg p-3 flex cursor-pointer transition-colors ${bookingOption === 'bestPrice' ? 'border-[2px] border-[#191919] bg-neutral-50/50 shadow-sm' : 'border-neutral-200 hover:border-neutral-300'}`}
            >
              <div className={`flex-shrink-0 w-4 h-4 rounded-full border-[2px] flex items-center justify-center mr-3 mt-0.5 ${bookingOption === 'bestPrice' ? 'border-[#191919]' : 'border-neutral-200'}`}>
                {bookingOption === 'bestPrice' && <div className="w-2 h-2 bg-[#191919] rounded-full" />}
              </div>
              <div className="flex-grow text-left">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#191919] text-[13px]">Best price</span>
                  <span className="font-bold text-[#191919] text-[12px] flex items-center gap-1">
                    Included <Info className="w-3.5 h-3.5 text-neutral-800" />
                  </span>
                </div>
                <p className="text-neutral-500 text-[11px] mt-0.5 pr-6 leading-snug">Pay now, cancel and rebook for a fee</p>
              </div>
            </div>
            
            <div 
              onClick={() => setBookingOption('stayFlexible')}
              className={`border rounded-lg p-3 flex cursor-pointer transition-colors ${bookingOption === 'stayFlexible' ? 'border-[2px] border-[#191919] bg-neutral-50/50 shadow-sm' : 'border-neutral-200 hover:border-neutral-300'}`}
            >
              <div className={`flex-shrink-0 w-4 h-4 rounded-full border-[2px] flex items-center justify-center mr-3 mt-0.5 ${bookingOption === 'stayFlexible' ? 'border-[#191919]' : 'border-neutral-200'}`}>
                {bookingOption === 'stayFlexible' && <div className="w-2 h-2 bg-[#191919] rounded-full" />}
              </div>
              <div className="flex-grow text-left">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#191919] text-[13px]">Stay flexible</span>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#C5A059] text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Popular</span>
                    <span className="font-bold text-[#191919] text-[12px] flex items-center gap-1">
                      + $ {stayFlexibleRate.toFixed(2)} / day <Info className="w-3.5 h-3.5 text-neutral-800" />
                    </span>
                  </div>
                </div>
                <p className="text-neutral-500 text-[11px] mt-0.5 pr-4 leading-snug">Pay at pickup, free cancellation and rebooking any time</p>
              </div>
            </div>
          </div>

          <h4 className="font-semibold text-[13px] text-[#191919] mb-3.5 uppercase tracking-wider text-left">Mileage</h4>
          
          <div className="space-y-2 mb-2">
            <div 
              onClick={() => setMileage('included')}
              className={`border rounded-lg p-3 flex cursor-pointer transition-colors ${mileage === 'included' ? 'border-[2px] border-[#191919] bg-neutral-50/50 shadow-sm' : 'border-neutral-200 hover:border-neutral-300'}`}
            >
              <div className={`flex-shrink-0 w-4 h-4 rounded-full border-[2px] flex items-center justify-center mr-3 mt-0.5 ${mileage === 'included' ? 'border-[#191919]' : 'border-neutral-200'}`}>
                {mileage === 'included' && <div className="w-2 h-2 bg-[#191919] rounded-full" />}
              </div>
              <div className="flex-grow text-left">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#191919] text-[13px]">2,820 km</span>
                  <span className="font-bold text-[#191919] text-[12px]">Included</span>
                </div>
                <p className="text-neutral-500 text-[11px] mt-0.5 leading-snug">+$0.91 for every additional km</p>
              </div>
            </div>
            
            <div 
              onClick={() => setMileage('unlimited')}
              className={`border rounded-lg p-3 flex cursor-pointer transition-colors ${mileage === 'unlimited' ? 'border-[2px] border-[#191919] bg-neutral-50/50 shadow-sm' : 'border-neutral-200 hover:border-neutral-300'}`}
            >
              <div className={`flex-shrink-0 w-4 h-4 rounded-full border-[2px] flex items-center justify-center mr-3 mt-0.5 ${mileage === 'unlimited' ? 'border-[#191919]' : 'border-neutral-200'}`}>
                {mileage === 'unlimited' && <div className="w-2 h-2 bg-[#191919] rounded-full" />}
              </div>
              <div className="flex-grow text-left">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#191919] text-[13px]">Unlimited kilometers</span>
                  <span className="font-bold text-[#191919] text-[12px]">
                    + $ {unlimitedMileageRate.toFixed(2)} / day
                  </span>
                </div>
                <p className="text-neutral-500 text-[11px] mt-0.5 leading-snug">All kilometers are included in the price</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sticky footer */}
        <div className="bg-white border-t border-[#e5e5e5] px-6 py-4 flex items-center justify-between mt-auto relative z-10 shrink-0">
          <div className="flex flex-col text-left">
            <span className="font-bold text-[13px] text-neutral-500">Total</span>
            <span className="font-black text-[22px] text-[#191919] mt-0.5">${totalRate.toFixed(2)}</span>
            <button 
              onClick={() => setIsPriceDetailsModalOpen(true)}
              className="text-[#191919] font-bold text-[12px] underline hover:text-[#C5A059] transition-colors w-fit mt-1"
            >
              Price details
            </button>
          </div>
          
          <button 
            onClick={handleNext}
            className="bg-[#C5A059] hover:bg-[#B28F4B] active:scale-95 text-white px-10 py-3.5 rounded-xl font-bold text-[15px] transition-all flex items-center justify-center shadow-md"
          >
            Next
          </button>
        </div>
      </div>

      <PriceDetailsModal 
        isOpen={isPriceDetailsModalOpen} 
        onClose={() => setIsPriceDetailsModalOpen(false)} 
        totalPrice={totalRate} 
      />
    </div>
  );
}
