import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRental } from '../context/RentalContext';
import { RoomCard } from '../components/RoomCard';
import { DHANGADHI_LOCATIONS } from '../data/mockRooms';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  Home, 
  Sparkles, 
  Lock, 
  ShieldCheck, 
  QrCode, 
  PhoneCall, 
  MessageCircle, 
  ArrowRight,
  CheckCircle2,
  Building,
  Key,
  Users
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { rooms, navigateTo, setSearchFilter, searchFilter } = useRental();

  const [heroLocation, setHeroLocation] = useState('all');
  const [heroBudget, setHeroBudget] = useState(35000);
  const [heroRoomType, setHeroRoomType] = useState('all');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchFilter(prev => ({
      ...prev,
      location: heroLocation,
      maxPrice: heroBudget,
      roomType: heroRoomType
    }));
    navigateTo('search');
  };

  const selectLocationPill = (loc: string) => {
    setSearchFilter(prev => ({ ...prev, location: loc }));
    navigateTo('search');
  };

  const selectBudgetFilter = (max: number) => {
    setSearchFilter(prev => ({ ...prev, maxPrice: max }));
    navigateTo('search');
  };

  const selectRoomTypeFilter = (type: string) => {
    setSearchFilter(prev => ({ ...prev, roomType: type }));
    navigateTo('search');
  };

  const featuredRooms = rooms.filter(r => r.featured);
  const latestRooms = rooms.slice(0, 6);

  return (
    <div className="space-y-12 pb-16">
      {/* 1. HERO BANNER */}
      <section className="relative bg-slate-900 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-b-3xl border-b border-slate-800 shadow-lg">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-slate-800/90 text-emerald-400 text-xs font-bold px-3.5 py-1.5 rounded-full border border-slate-700/80 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t('धनगढीको नम्बर १ कोठा भाडा पोर्टल', 'Dhangadhi #1 Verified Room Rental Portal')}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white max-w-3xl mx-auto">
            {t(
              'धनगढीमा कोठा, फ्ल्याट र घर भाडामा सजिलै खोज्नुहोस्',
              'Find Rooms, Flats & Houses for Rent in Dhangadhi Easily'
            )}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto font-medium leading-relaxed">
            {t(
              'हसनपुर, क्याम्पस रोड, ट्राफिक चोक, उत्तरबेहेडी, बोराडी लगायतका सबै स्थानहरूमा प्रमाणित कोठाहरू। घरधनी र भाडामा बस्ने बीच सीधा अनलक।',
              'Verified rooms across Hasanpur, Campus Road, Traffic Chawk, Uttarbehedi, Boradi and more. Directly unlock verified owner contacts.'
            )}
          </p>

          {/* Quick Search Card */}
          <form 
            onSubmit={handleHeroSearch}
            className="bg-white text-slate-900 p-4 sm:p-5 rounded-2xl shadow-2xl max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-left border border-slate-200"
          >
            {/* Location Select */}
            <div className="space-y-1">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>{t('स्थान (Location)', 'Location')}</span>
              </label>
              <select
                value={heroLocation}
                onChange={(e) => setHeroLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              >
                <option value="all">{t('सबै स्थान (All Locations)', 'All Locations')}</option>
                {DHANGADHI_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Budget Select */}
            <div className="space-y-1">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t('अधिकतम बजेट', 'Max Budget')}</span>
              </label>
              <select
                value={heroBudget}
                onChange={(e) => setHeroBudget(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              >
                <option value={35000}>{t('सबै बजेट (Any Budget)', 'Any Budget')}</option>
                <option value={8000}>{t('रु. ८,००० सम्म', 'Up to Rs. 8,000')}</option>
                <option value={15000}>{t('रु. १५,००० सम्म', 'Up to Rs. 15,000')}</option>
                <option value={25000}>{t('रु. २५,००० सम्म', 'Up to Rs. 25,000')}</option>
              </select>
            </div>

            {/* Room Type Select */}
            <div className="space-y-1">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-blue-600" />
                <span>{t('कोठा प्रकार', 'Room Type')}</span>
              </label>
              <select
                value={heroRoomType}
                onChange={(e) => setHeroRoomType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              >
                <option value="all">{t('सबै प्रकार (All Types)', 'All Room Types')}</option>
                <option value="single_room">{t('सिंगल कोठा', 'Single Room')}</option>
                <option value="flat_1bhk">{t('१ बीएचके फ्ल्याट', '1 BHK Flat')}</option>
                <option value="flat_2bhk">{t('२ बीएचके फ्ल्याट', '2 BHK Flat')}</option>
                <option value="full_house">{t('सम्पूर्ण घर', 'Full House')}</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="sm:col-span-3 lg:col-span-1 flex items-end">
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold p-3 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Search className="w-4 h-4 text-emerald-400" />
                <span>{t('खोजी गर्नुहोस्', 'Search Now')}</span>
              </button>
            </div>
          </form>

          {/* Call & WhatsApp Quick Buttons */}
          <div className="pt-4 flex flex-wrap justify-center gap-3 text-xs font-bold">
            <a
              href="tel:+9779848400000"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-xs transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t('कल गर्नुहोस्: ९८४८४०००००', 'Call Us: 9848400000')}</span>
            </a>
            <a
              href="https://wa.me/9779800000000?text=Hello%20Dhangadhi%20Room%20Rental"
              target="_blank"
              rel="noreferrer"
              className="bg-slate-800 hover:bg-slate-700 text-emerald-400 px-4 py-2.5 rounded-xl flex items-center gap-2 border border-slate-700 shadow-xs transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{t('WhatsApp मा कुरा गर्नुहोस्', 'Chat on WhatsApp')}</span>
            </a>
          </div>
        </div>
      </section>

      {/* GHARBETI (LANDLORD) BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-emerald-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-black px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider inline-flex items-center gap-1">
              <Building className="w-3.5 h-3.5" />
              {t('घरबेटीहरूका लागि विशेष', 'FOR LANDLORDS & HOUSE OWNERS')}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {t('तपाईंको कोठा, फ्ल्याट वा घर खाली छ?', 'Have a vacant room, flat or house in Dhangadhi?')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl">
              {t(
                'धनगढी रुम रेन्टलमा नि:शुल्क कोठा दर्ता गर्नुहोस्। बिचौलिया बिना सीधा भरपर्दो भाडावाल पाउनुहोस्।',
                'List your property 100% free. Find verified tenants directly without middleman hassle.'
              )}
            </p>
          </div>

          <button
            onClick={() => navigateTo('list_property')}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3.5 px-6 rounded-2xl text-xs sm:text-sm shadow-lg transition-all shrink-0 flex items-center gap-2 active:scale-95"
          >
            <Key className="w-4 h-4" />
            <span>{t('आफ्नो कोठा सूचीकृत गर्नुहोस्', 'List Your Property Free')}</span>
          </button>
        </div>
      </section>

      {/* 2. POPULAR LOCATIONS IN DHANGADHI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-500" />
              <span>{t('लोकप्रिय स्थानहरू (Popular Locations)', 'Popular Locations in Dhangadhi')}</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {t('धनगढीका प्रमुख क्षेत्रहरू अनुसार कोठा छान्नुहोस्', 'Select rooms by major neighborhoods in Dhangadhi')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {DHANGADHI_LOCATIONS.map((loc) => (
            <button
              key={loc}
              onClick={() => selectLocationPill(loc)}
              className="bg-white hover:bg-slate-900 hover:text-white text-slate-700 font-bold px-3.5 py-2 rounded-xl text-xs border border-slate-200 shadow-xs transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>{loc}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 3. FEATURED ROOMS */}
      {featuredRooms.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-emerald-700 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{t('विशेष सिफारिस', 'RECOMMENDED')}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900">
                {t('मुख्य आकर्षक कोठा तथा फ्ल्याटहरू', 'Featured Room & Flat Listings')}
              </h2>
            </div>

            <button 
              onClick={() => navigateTo('search')}
              className="text-xs font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1 transition-colors"
            >
              <span>{t('सबै हेर्नुहोस्', 'View All')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        </section>
      )}

      {/* 4. HOW UNLOCK WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-800 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="bg-rose-500/20 text-rose-300 text-xs font-extrabold px-3 py-1 rounded-full border border-rose-500/30 uppercase tracking-wider inline-flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              {t('सुरक्षा र गोपनीयता', 'Privacy & Security')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t('घरधनीको नम्बर र ठेगाना कसरी अनलक गर्ने?', 'How to Unlock Owner Contact & Exact Map?')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              {t('हामी नक्कली बिचौलिया र स्पाम फोन रोक्न घरधनीको फोन र exact नक्सा सुरक्षित राख्छौँ।', 'We prevent spam and fake brokers by securing the owner contact behind an easy verification request.')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* Step 1 */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 bg-emerald-500 text-slate-950 rounded-xl font-extrabold flex items-center justify-center text-lg shadow-md">
                1
              </div>
              <h3 className="font-extrabold text-white text-sm">
                {t('१. कोठा छान्नुहोस्', '1. Select Your Room')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t('आफ्नो बजेट र स्थान अनुसार मनपर्ने कोठा/फ्ल्याट रोज्नुहोस्।', 'Browse rooms in Dhangadhi that fit your budget and preferred location.')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 bg-emerald-500 text-slate-950 rounded-xl font-extrabold flex items-center justify-center text-lg shadow-md">
                2
              </div>
              <h3 className="font-extrabold text-white text-sm">
                {t('२. QR स्क्यान र अनुरोध पठाउनुहोस्', '2. Submit Request via eSewa / Khalti')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t('eSewa वा Khalti मार्फत १०० रुपैयाँ शुल्क बुझाएर स्क्रिनसट अपलोड गर्नुहोस्।', 'Pay Rs. 100 via eSewa or Khalti QR and upload screenshot.')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/60 space-y-3">
              <div className="w-10 h-10 bg-emerald-500 text-slate-950 rounded-xl font-extrabold flex items-center justify-center text-lg shadow-md">
                3
              </div>
              <h3 className="font-extrabold text-white text-sm">
                {t('३. सीधा फोन र Google Map हेर्नुहोस्', '3. Call Owner & Get Exact Location')}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t('एडमिन स्वीकृति पछि घरधनीको फोन नम्बर, नाम र घरको exact location तुरुन्त खुल्छ।', 'After approval, owner phone, name, and exact house location unlock instantly.')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LATEST ROOMS LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black text-slate-900">
              {t('भर्खरै थपिएका कोठाहरू', 'Latest Rooms in Dhangadhi')}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {t('धनगढीका नयाँ अपडेट गरिएका उपलब्ध कोठाहरू', 'Freshly updated room listings')}
            </p>
          </div>

          <button 
            onClick={() => navigateTo('search')}
            className="text-xs font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1 transition-colors"
          >
            <span>{t('सबै हेर्नुहोस्', 'View All')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </div>
  );
};
