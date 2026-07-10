import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Geographic center coordinates and zoom levels for centering
const LOCATIONS = {
  nyc: { center: [40.7128, -74.0060], zoom: 10, label: "New York City" },
  nj: { center: [40.7306, -74.1724], zoom: 11, label: "Northern New Jersey" },
  manhattan: { center: [40.7731, -73.9712], zoom: 12, label: "Manhattan" },
  brooklyn: { center: [40.6500, -73.9496], zoom: 12, label: "Brooklyn" },
  queens: { center: [40.7282, -73.7949], zoom: 11, label: "Queens" },
  bronx: { center: [40.8448, -73.8648], zoom: 12, label: "The Bronx" },
  statenisland: { center: [40.5795, -74.1502], zoom: 12, label: "Staten Island" },
  jfk: { center: [40.6413, -73.7781], zoom: 13, label: "John F. Kennedy Intl Airport (JFK)" },
  lga: { center: [40.7769, -73.8740], zoom: 13, label: "LaGuardia Airport (LGA)" },
  ewr: { center: [40.6895, -74.1745], zoom: 13, label: "Newark Liberty Intl Airport (EWR)" },
  teb: { center: [40.8501, -74.0608], zoom: 13, label: "Teterboro Airport (TEB)" },
  hpn: { center: [41.0669, -73.7075], zoom: 12, label: "Westchester County Airport (HPN)" },
  mmu: { center: [40.7993, -74.4149], zoom: 13, label: "Morristown Municipal Airport (MMU)" },
  isp: { center: [40.7952, -73.1002], zoom: 12, label: "Long Island MacArthur Airport (ISP)" }
};

const AIRPORTS = [
  { id: 'jfk', name: 'JFK', fullName: 'John F. Kennedy Intl Airport (JFK)', center: [40.6413, -73.7781], desc: 'Premium curbside drop-off and pickup concierge service directly at your terminal.' },
  { id: 'lga', name: 'LGA', fullName: 'LaGuardia Airport (LGA)', center: [40.7769, -73.8740], desc: 'Skip standard counter lines. Concierge delivery directly at baggage claim or departures.' },
  { id: 'ewr', name: 'EWR', fullName: 'Newark Liberty Intl (EWR)', center: [40.6895, -74.1745], desc: 'Serving all terminals with immediate chauffeur handoff and vehicle recovery.' },
  { id: 'teb', name: 'TEB', fullName: 'Teterboro Airport (TEB)', center: [40.8501, -74.0608], desc: 'Serving private FBO arrivals (Signature, Jet Aviation, Meridian, Atlantic).' },
  { id: 'hpn', name: 'HPN', fullName: 'Westchester County Airport (HPN)', center: [41.0669, -73.7075], desc: 'Regional boutique handoffs for Westchester and North Fairfield county clients.' },
  { id: 'mmu', name: 'MMU', fullName: 'Morristown Municipal Airport (MMU)', center: [40.7993, -74.4149], desc: 'Convenient private corporate FBO connections (Signature, FTC) for Northern NJ clients.' },
  { id: 'isp', name: 'ISP', fullName: 'Long Island MacArthur Airport (ISP)', center: [40.7952, -73.1002], desc: 'Boutique airport handoff and concierge delivery for Suffolk and Nassau county clients.' }
];

const BOROUGHS = [
  { 
    id: 'manhattan', 
    name: 'Manhattan', 
    center: [40.7731, -73.9712], 
    boundary: [
      [40.875, -73.910],
      [40.855, -73.930],
      [40.825, -73.935],
      [40.795, -73.930],
      [40.730, -73.970],
      [40.700, -74.020],
      [40.735, -74.015],
      [40.760, -74.000],
      [40.815, -73.960],
      [40.865, -73.925]
    ],
    desc: 'Full coverage across Uptown, Midtown, and Downtown. 24/7 garage service and door-to-door handoff.' 
  },
  { 
    id: 'brooklyn', 
    name: 'Brooklyn', 
    center: [40.6500, -73.9496], 
    boundary: [
      [40.735, -73.960],
      [40.705, -73.890],
      [40.670, -73.860],
      [40.640, -73.850],
      [40.590, -73.880],
      [40.570, -73.950],
      [40.570, -74.010],
      [40.610, -74.040],
      [40.655, -74.015],
      [40.705, -73.990]
    ],
    desc: 'Coverage including Williamsburg, DUMBO, Brooklyn Heights, Park Slope, and surrounding neighborhoods.' 
  },
  { 
    id: 'queens', 
    name: 'Queens', 
    center: [40.7282, -73.7949], 
    boundary: [
      [40.785, -73.930],
      [40.795, -73.850],
      [40.800, -73.800],
      [40.770, -73.740],
      [40.730, -73.700],
      [40.650, -73.720],
      [40.595, -73.745],
      [40.605, -73.865],
      [40.650, -73.855],
      [40.680, -73.865],
      [40.700, -73.905],
      [40.740, -73.955]
    ],
    desc: 'Borough-wide delivery. Immediate service to Long Island City, Astoria, and residential zones.' 
  },
  { 
    id: 'bronx', 
    name: 'Bronx', 
    center: [40.8500, -73.8648], 
    boundary: [
      [40.900, -73.910],
      [40.900, -73.860],
      [40.890, -73.820],
      [40.860, -73.780],
      [40.810, -73.780],
      [40.800, -73.850],
      [40.800, -73.910],
      [40.870, -73.900]
    ],
    desc: 'Serving all Bronx districts, including Riverdale, Pelham Parkway, and key transit points.' 
  },
  { 
    id: 'statenisland', 
    name: 'Staten Island', 
    center: [40.5795, -74.1502], 
    boundary: [
      [40.645, -74.070],
      [40.610, -74.060],
      [40.540, -74.130],
      [40.495, -74.250],
      [40.535, -74.240],
      [40.590, -74.200],
      [40.635, -74.190],
      [40.640, -74.140]
    ],
    desc: 'Concierge handoff available across the island with advanced booking scheduling.' 
  }
];

const NJ_BOUNDARY = [
  [40.950, -73.930],
  [40.940, -74.120],
  [40.850, -74.300],
  [40.750, -74.380],
  [40.620, -74.380],
  [40.530, -74.280],
  [40.560, -74.200],
  [40.650, -74.180],
  [40.740, -74.020],
  [40.850, -73.960]
];

export const ServiceAreaMap = ({ activeLocation, onSelectLocation }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const shapesRef = useRef({});
  const markersRef = useRef({});

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Create map instance
    const map = L.map(mapContainerRef.current, {
      center: LOCATIONS.nyc.center,
      zoom: LOCATIONS.nyc.zoom,
      zoomControl: false, // Custom styled zoom controls
      attributionControl: true
    });

    mapInstanceRef.current = map;

    // Load Google Maps tiles matching standard light roads style (Image 2 style)
    L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '&copy; Google Maps'
    }).addTo(map);

    // Draw Borough Coverage Zones (Custom Polygons based on actual boundaries)
    BOROUGHS.forEach((b) => {
      const polygon = L.polygon(b.boundary, {
        color: '#B28F4B',
        dashArray: '4, 4',
        weight: 1.5,
        fillColor: '#C5A059',
        fillOpacity: 0.08
      }).addTo(map);

      // Handle interactions
      polygon.on('mouseover', () => {
        setHoveredItem(b.id);
        polygon.setStyle({ fillOpacity: 0.22, weight: 2.5, color: '#C5A059' });
      });

      polygon.on('mouseout', () => {
        setHoveredItem(null);
        // Only reset style if it is not selected
        if (activeLocation !== b.id) {
          polygon.setStyle({ fillOpacity: 0.08, weight: 1.5, color: '#B28F4B' });
        }
      });

      polygon.on('click', () => {
        onSelectLocation(b.id);
      });

      shapesRef.current[b.id] = polygon;
    });

    // Draw Northern NJ Coverage Zone (Custom Polygon boundary)
    const njPolygon = L.polygon(NJ_BOUNDARY, {
      color: '#B28F4B',
      dashArray: '4, 4',
      weight: 1.5,
      fillColor: '#C5A059',
      fillOpacity: 0.05
    }).addTo(map);

    njPolygon.on('mouseover', () => {
      setHoveredItem('nj');
      njPolygon.setStyle({ fillOpacity: 0.15, weight: 2.5, color: '#C5A059' });
    });

    njPolygon.on('mouseout', () => {
      setHoveredItem(null);
      if (activeLocation !== 'nj') {
        njPolygon.setStyle({ fillOpacity: 0.05, weight: 1.5, color: '#B28F4B' });
      }
    });

    njPolygon.on('click', () => {
      onSelectLocation('nj');
    });

    shapesRef.current['nj'] = njPolygon;

    // Draw Custom Airport Pin Markers (Styled with golden Airplane logo icon)
    AIRPORTS.forEach((a) => {
      // Custom HTML Marker matching luxury gold styling with a rotated plane icon
      const customIcon = L.divIcon({
        html: `
          <div class="relative flex items-center justify-center">
            <div class="absolute w-8 h-8 bg-[#C5A059]/25 rounded-full animate-ping pointer-events-none" style="animation-duration: 2.5s;"></div>
            <div class="w-6 h-6 bg-white border-2 border-[#C5A059] rounded-full shadow-lg flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="#C5A059" style="transform: rotate(45deg);">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-5.5L21 16z"/>
              </svg>
            </div>
            <div class="absolute top-[26px] bg-white text-neutral-800 border border-neutral-200/80 text-[8.5px] font-black tracking-wider px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">
              ${a.name}
            </div>
          </div>
        `,
        className: 'custom-airport-icon',
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });

      const marker = L.marker(a.center, { icon: customIcon }).addTo(map);

      marker.on('click', () => {
        onSelectLocation(a.id);
      });

      markersRef.current[a.id] = marker;
    });

    // Cleanup map instance on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update selected region styles and center map viewport smoothly
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Reset all polygon styles
    Object.keys(shapesRef.current).forEach((key) => {
      const polygon = shapesRef.current[key];
      const isNJ = key === 'nj';
      polygon.setStyle({
        fillOpacity: isNJ ? 0.05 : 0.08,
        weight: 1.5,
        color: '#B28F4B'
      });
    });

    // Apply active highlight to selected polygon
    if (activeLocation && shapesRef.current[activeLocation]) {
      shapesRef.current[activeLocation].setStyle({
        fillOpacity: activeLocation === 'nj' ? 0.22 : 0.28,
        weight: 3.5,
        color: '#C5A059'
      });
    }

    // Smoothly fly to target center and zoom
    const target = LOCATIONS[activeLocation || 'nyc'];
    if (target) {
      map.flyTo(target.center, target.zoom, {
        animate: true,
        duration: 1.2
      });
    }
  }, [activeLocation]);

  // Zoom controls trigger
  const handleZoom = (direction) => {
    const map = mapInstanceRef.current;
    if (!map) return;
    if (direction === 'in') {
      map.zoomIn();
    } else {
      map.zoomOut();
    }
  };

  const handleReset = () => {
    onSelectLocation(null);
  };

  const getActiveDetails = () => {
    const currentId = activeLocation || hoveredItem;
    if (!currentId) return null;
    
    const airport = AIRPORTS.find(a => a.id === currentId);
    if (airport) {
      return { title: airport.fullName, type: 'Airport Hub', desc: airport.desc };
    }
    
    const borough = BOROUGHS.find(b => b.id === currentId);
    if (borough) {
      return { title: borough.name, type: 'NYC Borough', desc: borough.desc };
    }
    
    if (currentId === 'nj') {
      return { title: 'Northern New Jersey', type: 'Service Region', desc: 'Extended delivery area. Door-to-door handoff at residential addresses, offices, and Newark Liberty Airport.' };
    }
    
    return null;
  };

  const activeDetails = getActiveDetails();

  return (
    <div className="flex flex-col h-full bg-[#191919] rounded-3xl overflow-hidden shadow-lg relative select-none">
      
      {/* Zoom / Reset Controls Panel */}
      <div className="absolute top-4 left-4 z-[1000] flex flex-col gap-2 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-neutral-200/80 shadow-md">
        <button
          type="button"
          onClick={() => handleZoom('in')}
          className="w-8 h-8 rounded-full bg-neutral-50 text-neutral-600 flex items-center justify-center hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/40 active:scale-95 transition-all"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4 text-neutral-600" />
        </button>
        <button
          type="button"
          onClick={() => handleZoom('out')}
          className="w-8 h-8 rounded-full bg-neutral-50 text-neutral-600 flex items-center justify-center hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/40 active:scale-95 transition-all"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 text-neutral-600" />
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="w-8 h-8 rounded-full bg-neutral-50 text-neutral-600 flex items-center justify-center hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/40 active:scale-95 transition-all"
          title="Reset Map"
        >
          <RotateCcw className="w-4 h-4 text-neutral-600" />
        </button>
      </div>

      {/* Title Watermark */}
      <div className="absolute top-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-neutral-200/60 shadow-sm text-[10px] uppercase font-bold tracking-widest text-[#C5A059] pointer-events-none">
        Active Service Area
      </div>

      <div 
        ref={mapContainerRef} 
        className="relative flex-grow h-[260px] md:h-[300px] w-full"
        style={{ zIndex: 1 }}
      />

      {/* Info card display panel (Bottom) - Blends with Section Background */}
      <div className="bg-white border-t border-neutral-200/60 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 transition-all duration-300 min-h-[92px]">
        {activeDetails ? (
          <div className="flex-grow text-left">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-[15px] font-bold text-neutral-900 tracking-wide">{activeDetails.title}</h4>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-[#C5A059]/10 border border-[#C5A059]/20 text-[#C5A059] px-2 py-0.5 rounded-md leading-none">
                {activeDetails.type}
              </span>
            </div>
            <p className="text-[12px] text-neutral-500 leading-relaxed font-sans max-w-2xl">
              {activeDetails.desc}
            </p>
          </div>
        ) : (
          <div className="flex-grow text-left flex items-start gap-3">
            <Info className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-[13px] font-bold text-neutral-400 tracking-wide uppercase mb-0.5">Explore Our Service Area</h4>
              <p className="text-[12px] text-neutral-500 font-sans">
                Drag to pan. Scroll or use controls to zoom. Hover over regions or click pins to inspect custom delivery details.
              </p>
            </div>
          </div>
        )}

        {/* Dynamic Reset or Clear Focus CTA */}
        {activeDetails && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center justify-center gap-1 bg-neutral-50 border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 hover:border-neutral-300 font-bold text-[11px] uppercase tracking-wider px-4 py-2 rounded-xl transition-all shrink-0 self-start md:self-auto"
          >
            Clear Focus
          </button>
        )}
      </div>
    </div>
  );
};
