import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRental } from '../context/RentalContext';
import { 
  Lock, 
  Unlock, 
  MapPin, 
  PhoneCall, 
  MessageCircle, 
  Bed, 
  Bath, 
  Car, 
  Wifi, 
  Droplets, 
  Zap, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft, 
  Layers, 
  Maximize2, 
  Armchair, 
  UtensilsCrossed, 
  CheckCircle2, 
  ExternalLink,
  Play,
  Share2,
  DollarSign,
  Building,
  Check
} from 'lucide-react';

export const RoomDetailsPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { selectedRoom, navigateTo, isRoomUnlockedForUser } = useRental();
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!selectedRoom) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">{t('कोठा फेला परेन', 'Room Not Found')}</h2>
        <button 
          onClick={() => navigateTo('home')}
          className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold"
        >
          {t('गृहपृष्ठमा फर्कनुहोस्', 'Back to Home')}
        </button>
      </div>
    );
  }

  const room = selectedRoom;
  const isUnlocked = isRoomUnlockedForUser(room.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('search')}
          className="flex items-center gap-2 text-xs font-extrabold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600" />
          <span>{t('कोठा सूचीमा फर्कनुहोस्', 'Back to Room List')}</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-50 transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          <span>{copied ? t('लिङ्क कपी भयो!', 'Link Copied!') : t('शेयर गर्नुहोस्', 'Share')}</span>
        </button>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Photo Gallery, Overview & Features */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Photo Gallery View */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-3 p-3">
            <div className="relative h-72 sm:h-96 bg-slate-900 rounded-2xl overflow-hidden">
              <img
                src={room.photos[activePhotoIndex] || room.photos[0]}
                alt={room.title[lang]}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-3 left-3 flex gap-2">
                {room.featured && (
                  <span className="bg-slate-900/90 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-lg border border-amber-300/30">
                    <Sparkles className="w-3.5 h-3.5 inline mr-1" />
                    {t('विशेष कोठा', 'Featured Room')}
                  </span>
                )}
                {room.isBooked && (
                  <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-lg">
                    {t('बुक भइसकेको', 'Booked')}
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {room.photos.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {room.photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      idx === activePhotoIndex ? 'border-slate-900 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Video Preview Section */}
          {room.videoUrl && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Play className="w-4 h-4 text-red-600 fill-red-600" />
                <span>{t('कोठाको भिडियो टुर (Video Walkthrough)', 'Video Tour')}</span>
              </h3>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900">
                <iframe
                  src={room.videoUrl}
                  title="Room Video"
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Title & Price Header */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap justify-between items-start gap-3">
              <div>
                <span className="inline-block bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-md mb-2">
                  {room.generalLocation}, Dhangadhi
                </span>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {room.title[lang]}
                </h1>
              </div>

              <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-right min-w-[160px]">
                <div className="text-[10px] text-slate-400 font-bold uppercase">{t('मासिक भाडा', 'Monthly Rent')}</div>
                <div className="text-2xl font-black text-emerald-400">
                  रु. {room.price.toLocaleString('ne-NP')}
                </div>
                <div className="text-[11px] text-slate-300">
                  {t(`धरौटी: रु. ${room.deposit.toLocaleString('ne-NP')}`, `Deposit: Rs. ${room.deposit.toLocaleString()}`)}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-100">
              {room.description[lang]}
            </p>
          </div>

          {/* Detailed Property Features Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              {t('कोठाका विशेषता तथा सुविधाहरू (Room Specifications)', 'Room Specifications & Facilities')}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-bold">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Bed className="w-4 h-4 text-indigo-600" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">{t('सुत्ने कोठा', 'Bedrooms')}</span>
                  <span className="text-slate-900">{room.bedrooms} {t('वटा', 'Bedrooms')}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Bath className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">{t('बाथरुम', 'Bathrooms')}</span>
                  <span className="text-slate-900">{room.bathrooms} {t('वटा', 'Bathrooms')}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Maximize2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">{t('कोठा क्षेत्रफल', 'Room Size')}</span>
                  <span className="text-slate-900">{room.sizeSqFt} {t('वर्ग फिट', 'sq. ft.')}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-slate-600" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">{t('तल्ला', 'Floor')}</span>
                  <span className="text-slate-900">{room.floor === 'ground' ? t('ग्राउन्ड तल्ला', 'Ground') : `${room.floor} Floor`}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Car className="w-4 h-4 text-purple-600" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">{t('पार्किङ', 'Parking')}</span>
                  <span className="text-slate-900 capitalize">{room.parking === 'car_and_bike' ? t('कार तथा बाइक', 'Car & Bike') : room.parking}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Droplets className="w-4 h-4 text-sky-500" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">{t('खानेपानी', 'Water Facility')}</span>
                  <span className="text-slate-900">{room.water === '24h' ? t('२४ घण्टा निरन्तर', '24 Hours Supply') : t('बिहान/बेलुका', 'Morning/Evening')}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-amber-500" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">{t('विद्युत्', 'Electricity')}</span>
                  <span className="text-slate-900">{t('छुट्टै सबमिटर (Submeter)', 'Dedicated Submeter')}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Armchair className="w-4 h-4 text-amber-700" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">{t('फर्निसिङ', 'Furnishing')}</span>
                  <span className="text-slate-900">{getFurnishedLabel(room.furnished)}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-rose-500" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-normal">{t('उपलब्ध मिति', 'Available Date')}</span>
                  <span className="text-slate-900">{room.availableDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Approximate Location Map Representation */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>{t(`अनुमानित स्थान नक्सा (${room.generalLocation})`, `Approximate Area Map (${room.generalLocation})`)}</span>
              </h3>
              <span className="text-[11px] bg-amber-100 text-amber-800 font-extrabold px-2.5 py-1 rounded-md">
                {t('सांकेतिक नक्सा मात्र (Approximate)', 'Approximate Area')}
              </span>
            </div>

            <p className="text-xs text-slate-500 font-medium">
              {t(
                'नोट: सुरक्षा र गोपनीयताका लागि केवल टोल/क्षेत्रको सामान्य नक्सा देखाइएको छ। घरको exact location अनलक गरेपछि देखिनेछ।',
                'Note: Exact house pin is hidden to protect owner privacy until unlocked.'
              )}
            </p>

            {/* Approximate Map Representation Card */}
            <div className="relative h-56 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex flex-col items-center justify-center text-center p-6 space-y-2">
              <div className="w-16 h-16 rounded-full bg-rose-500/10 border-2 border-dashed border-rose-500 flex items-center justify-center animate-pulse-subtle">
                <MapPin className="w-8 h-8 text-rose-600" />
              </div>
              <div className="font-extrabold text-slate-900 text-sm">
                {room.generalLocation}, {t('धनगढी', 'Dhangadhi')}
              </div>
              <p className="text-xs text-slate-500 max-w-sm">
                {t(`यस कोठा ${room.generalLocation} मुख्य चोक तथा सडकको ४०० मिटरको घेराभित्र अवस्थित छ।`, `Located within 400m radius of ${room.generalLocation} area.`)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: UNLOCK BOX or UNLOCKED OWNER INFORMATION */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24">
          {isUnlocked ? (
            /* UNLOCKED OWNER INFO CARD */
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 shadow-md space-y-5 animate-fadeIn">
              <div className="flex items-center gap-3 border-b border-emerald-200 pb-4">
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-2xl flex items-center justify-center font-bold">
                  <Unlock className="w-6 h-6" />
                </div>
                <div>
                  <span className="bg-emerald-200 text-emerald-900 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                    {t('स्वीकृत र अनलक भयो', 'Approved & Unlocked')}
                  </span>
                  <h3 className="text-base font-black text-emerald-950">
                    {t('घरधनीको विवरण', 'Owner Details')}
                  </h3>
                </div>
              </div>

              {/* Owner Name */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  {t('घरधनीको नाम (Owner Name)', 'Owner Name')}
                </span>
                <div className="text-base font-extrabold text-slate-900 bg-white p-3 rounded-xl border border-emerald-200">
                  {room.ownerName}
                </div>
              </div>

              {/* Owner Phone */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  {t('फोन नम्बर (Mobile Number)', 'Phone Number')}
                </span>
                <div className="text-lg font-black text-slate-900 bg-white p-3 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <span>+977 {room.ownerPhone}</span>
                  <a
                    href={`tel:${room.ownerPhone}`}
                    className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800"
                    title={t('फोन गर्नुहोस्', 'Call Now')}
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-400" />
                  </a>
                </div>
              </div>

              {/* Exact Address */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  {t('पूरा ठेगाना (Exact Address)', 'Exact Address')}
                </span>
                <div className="text-xs font-bold text-slate-900 bg-white p-3 rounded-xl border border-emerald-200 leading-relaxed">
                  {room.exactAddress}
                </div>
              </div>

              {/* Exact Google Map Hint & Link */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                  {t('गुगल म्याप (Exact Google Maps Pin)', 'Exact Google Maps Pin')}
                </span>
                <div className="text-xs font-semibold text-slate-700 bg-white p-3 rounded-xl border border-emerald-200 space-y-2">
                  <p>{room.exactMap.directionsHint}</p>
                  <a
                    href={`https://maps.google.com/?q=${room.exactMap.lat},${room.exactMap.lng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{t('गुगल म्यापमा बाटो हेर्नुहोस् (Open Maps)', 'Open Map Location')}</span>
                  </a>
                </div>
              </div>

              {/* Quick Action Buttons */}
              <div className="pt-2 space-y-2">
                <a
                  href={`tel:${room.ownerPhone}`}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  <span>{t('घरधनीलाई सीधा कल गर्नुहोस्', 'Direct Call Owner')}</span>
                </a>

                <a
                  href={`https://wa.me/977${room.ownerPhone}?text=Hello%20I%20am%20interested%20in%20your%20room%20in%20${room.generalLocation}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t('WhatsApp मा म्यासेज गर्नुहोस्', 'Send WhatsApp Message')}</span>
                </a>
              </div>
            </div>
          ) : (
            /* LOCKED CONTACT BOX (Exact requirement) */
            <div className="bg-white border-2 border-rose-300 rounded-3xl p-6 shadow-md space-y-5">
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm">
                  <Lock className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>🔒 Contact Locked & Exact Location Locked</span>
                </div>
                <p className="text-xs text-rose-800 font-medium leading-relaxed">
                  {t(
                    'घरधनीको फोन नम्बर र घरको exact ठेगाना सुरक्षित गरिएको छ। सम्पर्क अनलक गर्न भुक्तानी अनुरोध पठाउनुहोस्।',
                    'Owner mobile number and exact address are locked to protect owner privacy and ensure authentic tenant requests.'
                  )}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t('eSewa वा Khalti मार्फत केवल रु. १०० शुल्क', 'Just Rs. 100 nominal fee via eSewa / Khalti')}</span>
                </div>
                <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t('एडमिन स्वीकृति पछि घरधनीसँग सीधा संवाद', 'Direct call & WhatsApp with owner after approval')}</span>
                </div>
                <div className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{t('गुगल म्यापबाट घरसम्म जाने exact बाटो', 'Exact Google Maps pinpoint route')}</span>
                </div>
              </div>

              <button
                onClick={() => navigateTo('payment', room.id)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <Unlock className="w-4 h-4 text-emerald-400" />
                <span>{t('सम्पर्क र ठेगाना अनलक गर्नुहोस्', 'Unlock Contact & Exact Location')}</span>
              </button>

              <div className="text-[11px] text-slate-400 text-center font-bold">
                {t('२४/७ द्रुत स्वीकृति सेवा उपलब्ध छ', 'Fast approval response within minutes')}
              </div>
            </div>
          )}

          {/* Quick Support Phone Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-center border border-slate-800">
            <span className="text-[10px] text-slate-400 font-bold uppercase">{t('मद्दत चाहियो?', 'Need Assistance?')}</span>
            <div className="font-extrabold text-sm">{t('धनगढी कोठा भाडा कार्यालय', 'Dhangadhi Room Rental Office')}</div>
            <a
              href="tel:+9779848400000"
              className="inline-flex items-center gap-2 text-emerald-400 font-extrabold text-xs hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>+977 9848400000</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
