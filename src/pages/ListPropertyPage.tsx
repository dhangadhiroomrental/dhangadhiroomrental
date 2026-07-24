import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRental } from '../context/RentalContext';
import { RoomType, FloorLevel, ParkingOption, WaterFacility, ElectricityType, FurnishedStatus, Room } from '../types/rental';
import { DHANGADHI_LOCATIONS } from '../data/mockRooms';
import { 
  Building2, 
  PlusCircle, 
  CheckCircle2, 
  Phone, 
  User, 
  MapPin, 
  Home, 
  DollarSign, 
  Upload, 
  Image as ImageIcon, 
  Lock, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft, 
  Eye, 
  ListPlus, 
  Layers, 
  Wifi, 
  Car, 
  Droplets, 
  Zap, 
  Check
} from 'lucide-react';

export const ListPropertyPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { rooms, addRoom, navigateTo } = useRental();

  const [activeTab, setActiveTab] = useState<'add' | 'my_properties'>('add');

  // Form State
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [exactAddress, setExactAddress] = useState('');
  const [generalLocation, setGeneralLocation] = useState('Hasanpur');

  const [titleNp, setTitleNp] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descNp, setDescNp] = useState('');
  const [descEn, setDescEn] = useState('');

  const [price, setPrice] = useState<number | ''>(8000);
  const [deposit, setDeposit] = useState<number | ''>(8000);
  const [roomType, setRoomType] = useState<RoomType>('single_room');
  const [floor, setFloor] = useState<FloorLevel>('1st');
  const [sizeSqFt, setSizeSqFt] = useState<number | ''>(250);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [kitchen, setKitchen] = useState(true);
  const [balcony, setBalcony] = useState(false);
  const [parking, setParking] = useState<ParkingOption>('bike');
  const [water, setWater] = useState<WaterFacility>('24h');
  const [electricity, setElectricity] = useState<ElectricityType>('dedicated_submeter');
  const [wifi, setWifi] = useState(true);
  const [furnished, setFurnished] = useState<FurnishedStatus>('semi_furnished');

  const [photoInputUrl, setPhotoInputUrl] = useState('');
  const [photosList, setPhotosList] = useState<string[]>([
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'
  ]);

  // Submission State
  const [submitted, setSubmitted] = useState(false);
  const [createdRoomId, setCreatedRoomId] = useState<string | null>(null);
  const [myAddedRoomIds, setMyAddedRoomIds] = useState<string[]>([]);

  const handleAddPhoto = () => {
    if (photoInputUrl.trim()) {
      setPhotosList(prev => [...prev, photoInputUrl.trim()]);
      setPhotoInputUrl('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotosList(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ownerName.trim() || !ownerPhone.trim() || !exactAddress.trim()) {
      alert(t('कृपया घरबेटीको नाम, फोन नम्बर र ठेगाना भर्नुहोस्।', 'Please fill in Owner Name, Contact Phone, and Exact Address.'));
      return;
    }

    const defaultTitleNp = titleNp.trim() || `${generalLocation} मा ${roomType === 'single_room' ? 'कोठा' : 'फ्ल्याट'} भाडामा`;
    const defaultTitleEn = titleEn.trim() || `Room/Flat for Rent in ${generalLocation}`;

    const newRoomPayload = {
      title: { np: defaultTitleNp, en: defaultTitleEn },
      description: {
        np: descNp.trim() || 'घरबेटीद्वारा उपलब्ध गराइएको कोठा विवरण। २४ सै घण्टा पानी र छुट्टै सबमिटर सुविधा उपलब्ध छ।',
        en: descEn.trim() || 'Property listed directly by home owner. Water and electricity available.'
      },
      price: Number(price) || 5000,
      deposit: Number(deposit) || 0,
      roomType,
      floor,
      sizeSqFt: Number(sizeSqFt) || 200,
      bedrooms: Number(bedrooms) || 1,
      bathrooms: Number(bathrooms) || 1,
      kitchen,
      balcony,
      parking,
      water,
      electricity,
      wifi,
      furnished,
      availableDate: new Date().toISOString().split('T')[0],
      featured: true,
      isBooked: false,
      generalLocation,
      photos: photosList.length > 0 ? photosList : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'],
      videoUrl: '',
      mapApprox: { lat: 28.6853, lng: 80.5982, radiusMeters: 300 },
      ownerName: ownerName.trim(),
      ownerPhone: ownerPhone.trim(),
      exactAddress: exactAddress.trim(),
      exactMap: { lat: 28.6853, lng: 80.5982, directionsHint: exactAddress.trim() }
    };

    addRoom(newRoomPayload);

    // Get latest room added
    const newId = 'room-dhn-' + (Math.floor(100 + Math.random() * 900));
    setCreatedRoomId(newId);
    setMyAddedRoomIds(prev => [newId, ...prev]);
    setSubmitted(true);
  };

  const myListedRooms = rooms.filter(r => myAddedRoomIds.includes(r.id) || r.ownerName === ownerName);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-md border border-slate-800 space-y-4 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-[11px] font-extrabold px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t('घरबेटी पोर्टल (Landlord Portal)', 'Gharbeti / Landlord Portal')}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              {t('आफ्नो कोठा, फ्ल्याट वा घर नि:शुल्क दर्ता गर्नुहोस्', 'List Your Property for Rent (100% Free)')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl mt-1">
              {t(
                'धनगढीका हजारौँ कोठा खोज्ने मानिसहरूसम्म सीधा पहुँच पुर्याउनुहोस्। घरबेटीको फोन नम्बर सुरक्षित रहन्छ।',
                'Reach thousands of room seekers in Dhangadhi directly without broker fees. Your contact info remains secure.'
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => setActiveTab('add')}
              className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'add'
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('कोठा दर्ता गर्नुहोस्', 'List Property')}</span>
            </button>

            {myListedRooms.length > 0 && (
              <button
                onClick={() => setActiveTab('my_properties')}
                className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'my_properties'
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>{t('मेरो दर्ता कोठाहरू', 'My Listings')} ({myListedRooms.length})</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {submitted ? (
        /* SUCCESS CONFIRMATION STATE */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-md max-w-2xl mx-auto animate-fadeIn">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
              कोठा दर्ता सफल भयो! (Property Listed Successfully)
            </span>
            <h2 className="text-2xl font-black text-slate-900 leading-tight">
              {t('तपाईंको कोठा सफलतापुर्वक सूचीकृत गरियो।', 'Your property is now live on Dhangadhi Room Rental!')}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              {t(
                'कोठा खोज्ने ग्राहकहरूले तपाईंको कोठा हेर्न सक्नेछन्। प्रमाणीकृत ग्राहकहरूले मात्र तपाईंको नम्बर पाउनेछन्।',
                'Prospective tenants can now view your listing. Only verified tenants can request your contact info.'
              )}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs space-y-2 text-left font-bold text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">{t('घरबेटी नाम:', 'Owner Name:')}</span>
              <span className="text-slate-900">{ownerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t('फोन नम्बर:', 'Phone Number:')}</span>
              <span className="text-slate-900">+977 {ownerPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t('कोठा स्थान:', 'Location:')}</span>
              <span className="text-slate-900">{generalLocation}, Dhangadhi</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">{t('मासिक भाडा:', 'Monthly Rent:')}</span>
              <span className="text-emerald-700 font-black">रु. {Number(price).toLocaleString('ne-NP')}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                setSubmitted(false);
                setTitleNp('');
                setTitleEn('');
                setDescNp('');
                setDescEn('');
              }}
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs transition-all shadow-xs"
            >
              {t('अर्को कोठा थप्नुहोस् (List Another Room)', 'List Another Room')}
            </button>

            <button
              onClick={() => navigateTo('search')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-4 rounded-xl text-xs transition-all"
            >
              {t('कोठा सूची हेर्नुहोस् (View All Listings)', 'View All Listings')}
            </button>
          </div>
        </div>
      ) : activeTab === 'my_properties' ? (
        /* MY LISTED PROPERTIES LIST FOR LANDLORD */
        <div className="space-y-4">
          <h3 className="text-lg font-black text-slate-900">
            {t('तपाईंले दर्ता गर्नुभएका कोठाहरू', 'My Listed Properties')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myListedRooms.map(room => (
              <div key={room.id} className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-3">
                <img src={room.photos[0]} alt="" className="w-full h-40 object-cover rounded-2xl border" />
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded uppercase">
                      Active Listing
                    </span>
                    <span className="text-xs font-black text-emerald-700">
                      रु. {room.price.toLocaleString('ne-NP')} /महिना
                    </span>
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm line-clamp-1">{room.title[lang]}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500" />
                    <span>{room.generalLocation}, Dhangadhi</span>
                  </p>
                </div>

                <button
                  onClick={() => navigateTo('details', room.id)}
                  className="w-full bg-slate-900 text-white hover:bg-slate-800 py-2 rounded-xl text-xs font-bold transition-all"
                >
                  {t('कोठा विवरण हेर्नुहोस्', 'View Details Page')}
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* FORM TO LIST PROPERTY */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <ListPlus className="w-6 h-6 text-emerald-600" />
              <span>{t('घरबेटी तथा कोठा विवरण फारम', 'Landlord & Property Registration Form')}</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {t('कृपया आफ्नो घर/कोठाको सही विवरण भरनुहोस्।', 'Please enter accurate property details for fast tenant matching.')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Gharbeti Contact Details */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs uppercase tracking-wider">
                <User className="w-4 h-4 text-emerald-600" />
                <span>१. घरबेटीको व्यक्तिगत विवरण (Landlord Information)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">
                    {t('घरबेटीको पूरा नाम (Owner Full Name)', 'Owner Full Name')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा. राम बहादुर चन्द (Ram Bahadur Chand)"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">
                    {t('सम्पर्क मोबाईल नम्बर (Contact Phone)', 'Contact Phone Number')} *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="उदा. 9848412345"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-slate-700">
                  {t('घरको exact ठेगाना र ल्यान्डमार्क (Exact House Address)', 'Exact House Address & Landmark')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. हसनपुर वडा नं. ५, क्याम्पस गेट नजिकै"
                  value={exactAddress}
                  onChange={(e) => setExactAddress(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-900 font-semibold">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  {t(
                    'तपाईंको फोन नम्बर र exact ठेगाना सुरक्षित रहनेछ। प्रमाणित ग्राहकलाई मात्र उपलब्ध हुनेछ।',
                    'Your phone number and exact address remain protected from public callers.'
                  )}
                </span>
              </div>
            </div>

            {/* 2. Property Basics & Pricing */}
            <div className="space-y-4">
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Home className="w-4 h-4 text-blue-600" />
                <span>२. कोठा/फ्ल्याटको विवरण तथा भाडा (Property & Pricing)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Location Area */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">
                    {t('धनगढीको क्षेत्र (Dhangadhi Location Area)', 'Dhangadhi Area')} *
                  </label>
                  <select
                    value={generalLocation}
                    onChange={(e) => setGeneralLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  >
                    {DHANGADHI_LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">
                    {t('कोठा/घर प्रकार (Property Type)', 'Property Type')} *
                  </label>
                  <select
                    value={roomType}
                    onChange={(e) => setRoomType(e.target.value as RoomType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="single_room">{t('सिंगल कोठा (Single Room)', 'Single Room')}</option>
                    <option value="double_room">{t('डबल कोठा (Double Room)', 'Double Room')}</option>
                    <option value="flat_1bhk">{t('१ बीएचके फ्ल्याट (1 BHK Flat)', '1 BHK Flat')}</option>
                    <option value="flat_2bhk">{t('२ बीएचके फ्ल्याट (2 BHK Flat)', '2 BHK Flat')}</option>
                    <option value="flat_3bhk">{t('३ बीएचके फ्ल्याट (3 BHK Flat)', '3 BHK Flat')}</option>
                    <option value="full_house">{t('सम्पूर्ण घर (Full House)', 'Full House')}</option>
                    <option value="commercial">{t('कमर्सियल सटर/अफिस (Commercial)', 'Commercial Space')}</option>
                  </select>
                </div>

                {/* Monthly Rent */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">
                    {t('मासिक भाडा रु. (Monthly Rent NPR)', 'Monthly Rent (NPR)')} *
                  </label>
                  <input
                    type="number"
                    required
                    min={1000}
                    placeholder="8000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-extrabold text-emerald-700 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                {/* Deposit */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">
                    {t('धरौटी/एडभान्स रु. (Advance Deposit NPR)', 'Advance Deposit (NPR)')}
                  </label>
                  <input
                    type="number"
                    placeholder="8000"
                    value={deposit}
                    onChange={(e) => setDeposit(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                {/* Floor Level */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">
                    {t('तल्ला (Floor Level)', 'Floor Level')}
                  </label>
                  <select
                    value={floor}
                    onChange={(e) => setFloor(e.target.value as FloorLevel)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-hidden"
                  >
                    <option value="ground">{t('भुइँ तल्ला (Ground Floor)', 'Ground Floor')}</option>
                    <option value="1st">{t('पहिलो तल्ला (1st Floor)', '1st Floor')}</option>
                    <option value="2nd">{t('दोस्रो तल्ला (2nd Floor)', '2nd Floor')}</option>
                    <option value="3rd">{t('तेस्रो तल्ला (3rd Floor)', '3rd Floor')}</option>
                  </select>
                </div>

                {/* Size */}
                <div className="space-y-1">
                  <label className="text-xs font-extrabold text-slate-700">
                    {t('साइज (Approx Size Sq. Ft.)', 'Approx Size (Sq. Ft.)')}
                  </label>
                  <input
                    type="number"
                    placeholder="250"
                    value={sizeSqFt}
                    onChange={(e) => setSizeSqFt(e.target.value ? Number(e.target.value) : '')}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* 3. Amenities Checklist */}
            <div className="space-y-4 border-t border-slate-100 pt-4">
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>३. सुविधाहरू (Facilities & Amenities)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {/* Water Facility */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    <span>खानेपानी सुविधा (Water Facility)</span>
                  </label>
                  <select
                    value={water}
                    onChange={(e) => setWater(e.target.value as WaterFacility)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold"
                  >
                    <option value="24h">२४ सै घण्टा पानी (24 Hours Water)</option>
                    <option value="morning_evening">बिहान-बेलुका पानी (Morning/Evening)</option>
                    <option value="tanker">ट्याङ्कर पानी (Tanker Supply)</option>
                  </select>
                </div>

                {/* Electricity */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>बिजुली प्रणाली (Electricity)</span>
                  </label>
                  <select
                    value={electricity}
                    onChange={(e) => setElectricity(e.target.value as ElectricityType)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold"
                  >
                    <option value="dedicated_submeter">छुट्टै सबमिटर (Dedicated Submeter)</option>
                    <option value="shared">शेयरिङ (Shared Meter)</option>
                    <option value="included">भाडामै समावेश (Included in Rent)</option>
                  </select>
                </div>

                {/* Parking */}
                <div className="space-y-1">
                  <label className="text-[11px] font-extrabold text-slate-700 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-slate-600" />
                    <span>पार्किङ सुविधा (Parking)</span>
                  </label>
                  <select
                    value={parking}
                    onChange={(e) => setParking(e.target.value as ParkingOption)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-bold"
                  >
                    <option value="bike">मोटरसाइकल/स्कुटर (Bike Only)</option>
                    <option value="car_and_bike">कार र मोटरसाइकल (Car & Bike)</option>
                    <option value="none">पार्किङ छैन (No Parking)</option>
                  </select>
                </div>

                {/* Wifi */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Wifi className="w-4 h-4 text-emerald-600" />
                    <span>इन्टरनेट/वाइफाइ छ (Wifi Available)</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={wifi}
                    onChange={(e) => setWifi(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
                  />
                </div>

                {/* Kitchen */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800">
                    छुट्टै भान्छा कोठा छ (Kitchen Included)
                  </span>
                  <input
                    type="checkbox"
                    checked={kitchen}
                    onChange={(e) => setKitchen(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
                  />
                </div>

                {/* Balcony */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800">
                    बार्दली/बाल्कोनी छ (Balcony Included)
                  </span>
                  <input
                    type="checkbox"
                    checked={balcony}
                    onChange={(e) => setBalcony(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
                  />
                </div>
              </div>
            </div>

            {/* 4. Photos Upload */}
            <div className="space-y-3 border-t border-slate-100 pt-4">
              <div className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-purple-600" />
                <span>४. कोठा/घरको फोटोहरू (Photos)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Option A: Direct File Upload */}
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center bg-slate-50 hover:bg-slate-100 transition-colors relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  <div className="space-y-1">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                    <span className="text-xs font-bold text-slate-700 block">
                      {t('तस्बिर अपलोड गर्नुहोस्', 'Upload Photo from Device')}
                    </span>
                    <span className="text-[10px] text-slate-400">JPG, PNG, JPEG</span>
                  </div>
                </div>

                {/* Option B: Image URL */}
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <label className="text-xs font-bold text-slate-700 block">
                    {t('वा फोटोको वेब लिङ्क हाल्नुहोस्', 'Or enter image URL')}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={photoInputUrl}
                      onChange={(e) => setPhotoInputUrl(e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-xl p-2 text-xs font-bold"
                    />
                    <button
                      type="button"
                      onClick={handleAddPhoto}
                      className="bg-slate-900 text-white font-bold px-3 py-2 rounded-xl text-xs shrink-0"
                    >
                      + थप्नुहोस्
                    </button>
                  </div>
                </div>
              </div>

              {/* Photo Previews */}
              {photosList.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pt-2">
                  {photosList.map((p, idx) => (
                    <div key={idx} className="relative group shrink-0">
                      <img src={p} alt="" className="w-24 h-18 object-cover rounded-xl border border-slate-200 shadow-xs" />
                      {photosList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => setPhotosList(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute -top-1 -right-1 bg-rose-600 text-white p-0.5 rounded-full text-xs font-black shadow-xs"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="border-t border-slate-100 pt-6">
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98"
              >
                <PlusCircle className="w-5 h-5 text-emerald-400" />
                <span>{t('कोठा/घर दर्ता गर्नुहोस् (Publish Listing)', 'Publish Property Listing')}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
