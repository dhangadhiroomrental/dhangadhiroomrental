import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRental } from '../context/RentalContext';
import { DHANGADHI_LOCATIONS } from '../data/mockRooms';
import { 
  Filter, 
  RotateCcw, 
  MapPin, 
  DollarSign, 
  Home, 
  Layers, 
  Bed, 
  Car, 
  Wifi, 
  UtensilsCrossed, 
  Armchair,
  X
} from 'lucide-react';

interface FilterSidebarProps {
  onCloseMobile?: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ onCloseMobile }) => {
  const { t } = useLanguage();
  const { searchFilter, setSearchFilter, resetFilters } = useRental();

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter(prev => ({ ...prev, location: e.target.value }));
  };

  const handleRoomTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter(prev => ({ ...prev, roomType: e.target.value }));
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFilter(prev => ({ ...prev, maxPrice: Number(e.target.value) }));
  };

  const handleFloorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter(prev => ({ ...prev, floor: e.target.value }));
  };

  const handleBedroomsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter(prev => ({ ...prev, bedrooms: e.target.value }));
  };

  const handleParkingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter(prev => ({ ...prev, parking: e.target.value }));
  };

  const handleFurnishedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilter(prev => ({ ...prev, furnished: e.target.value }));
  };

  const toggleWifi = () => {
    setSearchFilter(prev => ({ ...prev, wifi: prev.wifi === true ? null : true }));
  };

  const toggleKitchen = () => {
    setSearchFilter(prev => ({ ...prev, kitchen: prev.kitchen === true ? null : true }));
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2 font-extrabold text-slate-900 text-sm">
          <Filter className="w-4 h-4 text-emerald-600" />
          <span>{t('खोज्नुहोस् र फिल्टर गर्नुहोस्', 'Search Filters')}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={resetFilters}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors"
            title={t('पुन: सेट गर्नुहोस्', 'Reset')}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t('रिसेट', 'Reset')}</span>
          </button>
          
          {onCloseMobile && (
            <button 
              onClick={onCloseMobile}
              className="lg:hidden text-slate-400 hover:text-slate-700 p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 1. Location Filter */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-rose-500" />
          <span>{t('स्थान (Location in Dhangadhi)', 'Location in Dhangadhi')}</span>
        </label>
        <select
          value={searchFilter.location}
          onChange={handleLocationChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
        >
          <option value="all">{t('सबै स्थानहरू (All Locations)', 'All Locations')}</option>
          {DHANGADHI_LOCATIONS.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* 2. Budget Range Filter */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t('अधिकतम बजेट (Max Budget)', 'Max Budget')}</span>
          </span>
          <span className="text-emerald-700 font-extrabold">
            रु. {searchFilter.maxPrice.toLocaleString('ne-NP')}
          </span>
        </div>
        <input 
          type="range" 
          min={4000} 
          max={35000} 
          step={500} 
          value={searchFilter.maxPrice}
          onChange={handleMaxPriceChange}
          className="w-full accent-slate-900 h-2 bg-slate-200 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-bold">
          <span>रु. ४,०००</span>
          <span>रु. ३५,०००+</span>
        </div>
      </div>

      {/* 3. Room Type Filter */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Home className="w-3.5 h-3.5 text-blue-600" />
          <span>{t('कोठा/फ्ल्याट प्रकार (Room Type)', 'Room Type')}</span>
        </label>
        <select
          value={searchFilter.roomType}
          onChange={handleRoomTypeChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
        >
          <option value="all">{t('सबै प्रकार (All Types)', 'All Room Types')}</option>
          <option value="single_room">{t('सिंगल कोठा (Single Room)', 'Single Room')}</option>
          <option value="double_room">{t('डबल कोठा (Double Room)', 'Double Room')}</option>
          <option value="flat_1bhk">{t('१ बीएचके फ्ल्याट (1 BHK Flat)', '1 BHK Flat')}</option>
          <option value="flat_2bhk">{t('२ बीएचके फ्ल्याट (2 BHK Flat)', '2 BHK Flat')}</option>
          <option value="flat_3bhk">{t('३ बीएचके फ्ल्याट (3 BHK Flat)', '3 BHK Flat')}</option>
          <option value="full_house">{t('सम्पूर्ण घर (Full House)', 'Full House')}</option>
          <option value="commercial">{t('व्यापारिक शटर / अफिस', 'Commercial Space')}</option>
        </select>
      </div>

      {/* 4. Floor Filter */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-slate-600" />
          <span>{t('तल्ला (Floor)', 'Floor Level')}</span>
        </label>
        <select
          value={searchFilter.floor}
          onChange={handleFloorChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
        >
          <option value="all">{t('सबै तल्ला (Any Floor)', 'Any Floor')}</option>
          <option value="ground">{t('ग्राउन्ड तल्ला (Ground)', 'Ground Floor')}</option>
          <option value="1st">{t('पहिलो तल्ला (1st Floor)', '1st Floor')}</option>
          <option value="2nd">{t('दोस्रो तल्ला (2nd Floor)', '2nd Floor')}</option>
          <option value="3rd">{t('तेस्रो तल्ला (3rd Floor)', '3rd Floor')}</option>
        </select>
      </div>

      {/* 5. Bedrooms Count */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Bed className="w-3.5 h-3.5 text-indigo-600" />
          <span>{t('सुत्ने कोठा (Bedrooms)', 'Bedrooms')}</span>
        </label>
        <select
          value={searchFilter.bedrooms}
          onChange={handleBedroomsChange}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
        >
          <option value="all">{t('कुनै पनि (Any)', 'Any Bedrooms')}</option>
          <option value="1">1 Bedroom</option>
          <option value="2">2 Bedrooms</option>
          <option value="3">3+ Bedrooms</option>
        </select>
      </div>

      {/* 6. Parking & Furnishing */}
      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
            <Car className="w-3 h-3 text-slate-500" />
            <span>{t('पार्किङ', 'Parking')}</span>
          </label>
          <select
            value={searchFilter.parking}
            onChange={handleParkingChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-[11px] font-semibold text-slate-800"
          >
            <option value="all">{t('सबै', 'All')}</option>
            <option value="bike">{t('बाइक', 'Bike')}</option>
            <option value="car_and_bike">{t('कार/बाइक', 'Car & Bike')}</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
            <Armchair className="w-3 h-3 text-amber-600" />
            <span>{t('सामान', 'Furnishing')}</span>
          </label>
          <select
            value={searchFilter.furnished}
            onChange={handleFurnishedChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-[11px] font-semibold text-slate-800"
          >
            <option value="all">{t('सबै', 'All')}</option>
            <option value="furnished">{t('Furnished', 'Furnished')}</option>
            <option value="semi_furnished">{t('Semi', 'Semi')}</option>
            <option value="unfurnished">{t('Empty', 'Unfurnished')}</option>
          </select>
        </div>
      </div>

      {/* 7. Quick Facility Toggles (WiFi & Kitchen) */}
      <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-700">
          {t('विशेष सुविधाहरू (Amenities)', 'Special Amenities')}
        </label>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={toggleWifi}
            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              searchFilter.wifi === true
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>WiFi</span>
          </button>

          <button
            type="button"
            onClick={toggleKitchen}
            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
              searchFilter.kitchen === true
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>{t('किचन', 'Kitchen')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
