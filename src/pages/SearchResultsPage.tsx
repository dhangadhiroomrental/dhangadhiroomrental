import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRental } from '../context/RentalContext';
import { RoomCard } from '../components/RoomCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { 
  Filter, 
  RotateCcw, 
  MapPin, 
  Search, 
  SlidersHorizontal, 
  Grid, 
  List, 
  X,
  Building2
} from 'lucide-react';

export const SearchResultsPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { rooms, searchFilter, setSearchFilter, resetFilters } = useRental();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price_asc' | 'price_desc' | 'size_desc'>('newest');

  // Filter Logic
  const filteredRooms = rooms.filter(room => {
    // Location
    if (searchFilter.location !== 'all' && room.generalLocation.toLowerCase() !== searchFilter.location.toLowerCase()) {
      return false;
    }
    // Max Price
    if (room.price > searchFilter.maxPrice) {
      return false;
    }
    // Room Type
    if (searchFilter.roomType !== 'all' && room.roomType !== searchFilter.roomType) {
      return false;
    }
    // Floor
    if (searchFilter.floor !== 'all' && room.floor !== searchFilter.floor) {
      return false;
    }
    // Bedrooms
    if (searchFilter.bedrooms !== 'all') {
      const beds = Number(searchFilter.bedrooms);
      if (beds >= 3 ? room.bedrooms < 3 : room.bedrooms !== beds) {
        return false;
      }
    }
    // Parking
    if (searchFilter.parking !== 'all' && room.parking !== searchFilter.parking) {
      return false;
    }
    // WiFi
    if (searchFilter.wifi === true && !room.wifi) {
      return false;
    }
    // Kitchen
    if (searchFilter.kitchen === true && !room.kitchen) {
      return false;
    }
    // Furnished
    if (searchFilter.furnished !== 'all' && room.furnished !== searchFilter.furnished) {
      return false;
    }

    return true;
  });

  // Sorting Logic
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    if (sortBy === 'size_desc') return b.sizeSqFt - a.sizeSqFt;
    // default: newest
    return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Search Title & Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-emerald-600" />
            <span>{t('कोठा र फ्ल्याट खोजी नतिजा', 'Room Search Results')}</span>
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            {t(`धनगढी क्षेत्रमा ${sortedRooms.length} वटा कोठा फेला परे`, `Showing ${sortedRooms.length} available rooms in Dhangadhi`)}
          </p>
        </div>

        {/* Controls: Mobile Filter Button & Sort Dropdown */}
        <div className="flex items-center gap-2">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 bg-slate-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>{t('फिल्टर', 'Filters')}</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700">
            <span className="text-slate-400 font-normal hidden sm:inline">{t('क्रम:', 'Sort:')}</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-bold text-slate-900 focus:outline-hidden cursor-pointer"
            >
              <option value="newest">{t('नयाँ पहिले (Newest First)', 'Newest First')}</option>
              <option value="price_asc">{t('मूल्य: सस्तो देखि (Price Low-High)', 'Price: Low to High')}</option>
              <option value="price_desc">{t('मूल्य: महँगो देखि (Price High-Low)', 'Price: High to Low')}</option>
              <option value="size_desc">{t('साइज: ठूलो देखि (Largest Size)', 'Largest Size')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {(searchFilter.location !== 'all' || searchFilter.roomType !== 'all' || searchFilter.maxPrice < 35000 || searchFilter.wifi || searchFilter.kitchen) && (
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl">
          <span className="text-emerald-800 font-extrabold">{t('सक्रिय फिल्टरहरू:', 'Active Filters:')}</span>
          
          {searchFilter.location !== 'all' && (
            <span className="bg-white border border-emerald-200 text-emerald-900 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <MapPin className="w-3 h-3 text-rose-500" />
              {searchFilter.location}
              <button onClick={() => setSearchFilter(p => ({ ...p, location: 'all' }))} className="hover:text-rose-600 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchFilter.maxPrice < 35000 && (
            <span className="bg-white border border-emerald-200 text-emerald-900 px-2.5 py-1 rounded-lg flex items-center gap-1">
              Max: रु. {searchFilter.maxPrice.toLocaleString('ne-NP')}
              <button onClick={() => setSearchFilter(p => ({ ...p, maxPrice: 35000 }))} className="hover:text-rose-600 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {searchFilter.roomType !== 'all' && (
            <span className="bg-white border border-emerald-200 text-emerald-900 px-2.5 py-1 rounded-lg flex items-center gap-1">
              Type: {searchFilter.roomType}
              <button onClick={() => setSearchFilter(p => ({ ...p, roomType: 'all' }))} className="hover:text-rose-600 ml-1">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            onClick={resetFilters}
            className="text-rose-600 hover:underline text-xs font-extrabold ml-auto flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('सबै हटाउनुहोस्', 'Clear All')}</span>
          </button>
        </div>
      )}

      {/* Main Grid Area: Sidebar + Results */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1 sticky top-24">
          <FilterSidebar />
        </div>

        {/* Results Column */}
        <div className="lg:col-span-3 space-y-6">
          {sortedRooms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedRooms.map(room => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <Building2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {t('कुनै कोठा फेला परेन', 'No Rooms Found Matching Your Criteria')}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {t(
                  'तपाईंले छान्नुभएको फिल्टर अनुसार कुनै कोठा भेटिएन। कृपया फिल्टर परिवर्तन वा रिसेट गर्नुहोस्।',
                  'Try widening your budget range or clearing location filters to see more listings.'
                )}
              </p>
              <button
                onClick={resetFilters}
                className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs inline-flex items-center gap-2 shadow-xs"
              >
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                <span>{t('सबै फिल्टर रिसेट गर्नुहोस्', 'Reset All Filters')}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer Filter Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex justify-end lg:hidden">
          <div className="w-full max-w-xs bg-white h-full overflow-y-auto p-4 space-y-4">
            <FilterSidebar onCloseMobile={() => setMobileFilterOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};
