import React, { useState } from 'react';
import { Room } from '../types/rental';
import { useLanguage } from '../context/LanguageContext';
import { useRental } from '../context/RentalContext';
import { 
  Lock, 
  Unlock, 
  MapPin, 
  Bed, 
  Bath, 
  Car, 
  Wifi, 
  Droplets, 
  Zap, 
  Calendar, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Eye, 
  Phone, 
  MessageCircle,
  Building,
  Sparkles,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const { lang, t } = useLanguage();
  const { navigateTo, isRoomUnlockedForUser } = useRental();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const isUnlocked = isRoomUnlockedForUser(room.id);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (room.photos && room.photos.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % room.photos.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (room.photos && room.photos.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + room.photos.length) % room.photos.length);
    }
  };

  // Translation helpers
  const getRoomTypeLabel = (type: string) => {
    switch (type) {
      case 'single_room': return t('एकल कोठा (Single Room)', 'Single Room');
      case 'double_room': return t('दोहोरो कोठा (Double Room)', 'Double Room');
      case 'flat_1bhk': return t('१ बीएचके फ्ल्याट (1 BHK Flat)', '1 BHK Flat');
      case 'flat_2bhk': return t('२ बीएचके फ्ल्याट (2 BHK Flat)', '2 BHK Flat');
      case 'flat_3bhk': return t('३ बीएचके फ्ल्याट (3 BHK Flat)', '3 BHK Flat');
      case 'full_house': return t('सम्पूर्ण घर भाडा (Full House)', 'Full House');
      case 'commercial': return t('व्यापारिक शटर / अफिस', 'Commercial / Office');
      default: return type;
    }
  };

  const getFurnishedLabel = (f: string) => {
    switch (f) {
      case 'furnished': return t('पूर्ण सुसज्जित (Furnished)', 'Fully Furnished');
      case 'semi_furnished': return t('अर्ध सुसज्जित (Semi-Furnished)', 'Semi-Furnished');
      case 'unfurnished': return t('बिना सामान (Unfurnished)', 'Unfurnished');
      default: return f;
    }
  };

  return (
    <div 
      onClick={() => navigateTo('details', room.id)}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group cursor-pointer"
    >
      {/* Photo Gallery Top Area */}
      <div className="relative h-56 bg-slate-200 overflow-hidden">
        <img 
          src={room.photos[currentImageIndex] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'} 
          alt={room.title[lang]}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {room.featured && (
            <span className="bg-slate-900/90 backdrop-blur-xs text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wider uppercase flex items-center gap-1 shadow-xs border border-amber-300/30">
              <Sparkles className="w-3 h-3 text-amber-400" />
              {t('विशेष (Featured)', 'Featured')}
            </span>
          )}

          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-1 rounded-md">
            {getRoomTypeLabel(room.roomType)}
          </span>

          {room.isBooked && (
            <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-1 rounded-md uppercase">
              {t('बुक भइसकेको (Booked)', 'Booked')}
            </span>
          )}
        </div>

        {/* Video Badge */}
        {room.videoUrl && (
          <div className="absolute top-3 right-3 bg-red-600/90 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 z-10 shadow-xs">
            <Play className="w-3 h-3 fill-white" />
            <span>{t('भिडियो', 'Video')}</span>
          </div>
        )}

        {/* Gallery Carousel Arrows */}
        {room.photos.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-slate-900 text-white p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-slate-900/60 hover:bg-slate-900 text-white p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {room.photos.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {room.photos.map((_, idx) => (
              <span 
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-900/95 backdrop-blur-md text-white px-3 py-1.5 rounded-xl shadow-md border border-slate-700/50 flex items-baseline gap-1">
          <span className="text-sm font-semibold text-emerald-400">रु.</span>
          <span className="text-lg font-extrabold">{room.price.toLocaleString('ne-NP')}</span>
          <span className="text-[10px] text-slate-300 font-medium">/ {t('महिना', 'mo')}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* General Location & Floor */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-2">
            <div className="flex items-center gap-1 text-slate-700 font-bold bg-slate-100 px-2.5 py-1 rounded-md">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{room.generalLocation}, {t('धनगढी', 'Dhangadhi')}</span>
            </div>
            <div className="bg-slate-100 px-2.5 py-1 rounded-md text-slate-600 font-bold">
              {room.floor === 'ground' ? t('ग्राउन्ड तल्ला', 'Ground Floor') : `${room.floor} ${t('तल्ला', 'Floor')}`}
            </div>
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-base text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug mb-3">
            {room.title[lang]}
          </h3>

          {/* Key Attributes Pills */}
          <div className="grid grid-cols-3 gap-2 text-[11px] font-bold text-slate-600 bg-slate-50 p-2.5 rounded-xl mb-4 border border-slate-100">
            <div className="flex items-center gap-1">
              <Bed className="w-3.5 h-3.5 text-slate-400" />
              <span>{room.bedrooms} {t('कोठा', 'Bed')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-3.5 h-3.5 text-slate-400" />
              <span>{room.bathrooms} {t('बाथ', 'Bath')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-slate-400" />
              <span className="capitalize">{room.parking === 'car_and_bike' ? t('कार/बाइक', 'Car & Bike') : room.parking}</span>
            </div>
          </div>

          {/* Additional Features List */}
          <div className="flex flex-wrap gap-1.5 mb-4 text-[10px] font-semibold text-slate-600">
            {room.wifi && (
              <span className="bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1 text-slate-700">
                <Wifi className="w-3 h-3 text-emerald-600" /> WiFi
              </span>
            )}
            <span className="bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1 text-slate-700">
              <Droplets className="w-3 h-3 text-blue-500" /> {room.water === '24h' ? t('२४घ घण्टा पानी', '24h Water') : t('पानी', 'Water')}
            </span>
            <span className="bg-slate-100 px-2 py-0.5 rounded flex items-center gap-1 text-slate-700">
              <Zap className="w-3 h-3 text-amber-500" /> {t('सबमिटर', 'Submeter')}
            </span>
            <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
              {getFurnishedLabel(room.furnished)}
            </span>
          </div>
        </div>

        {/* LOCKED vs UNLOCKED Status Bar & Primary Action */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          {isUnlocked ? (
            /* UNLOCKED STATE */
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-extrabold">
                <Unlock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('सम्पर्क अनलक छ', 'Contact Unlocked')}</span>
              </div>
              <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                <a 
                  href={`tel:${room.ownerPhone}`}
                  className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
                  title={t('फोन गर्नुहोस्', 'Call Owner')}
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                </a>
                <a 
                  href={`https://wa.me/977${room.ownerPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 text-white p-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            /* LOCKED STATE (Exact requirement: Lock badges in red style) */
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-2.5 rounded-xl text-xs flex flex-col gap-1">
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1.5 text-rose-700">
                  <Lock className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  {t('सम्पर्क र ठेगाना लक छ', 'Contact & Exact Location Locked')}
                </span>
                <span className="text-[10px] bg-rose-200/60 text-rose-800 px-1.5 py-0.5 rounded font-extrabold">
                  {t('अनलक गर्नुहोस्', 'Unlock')}
                </span>
              </div>
              <p className="text-[10px] text-rose-600/90 leading-tight">
                {t('घरधनीको फोन र exact location हेर्न अनलक अनुरोध गर्नुहोस्।', 'Unlock request needed to see owner contact & exact pin.')}
              </p>
            </div>
          )}

          {/* View Details Button */}
          <button 
            onClick={() => navigateTo('details', room.id)}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Eye className="w-4 h-4 text-emerald-400" />
            <span>{t('पुर्ण विवरण हेर्नुहोस्', 'View Full Details')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
