import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRental } from '../context/RentalContext';
import { Room, RoomType, FloorLevel, ParkingOption, WaterFacility, ElectricityType, FurnishedStatus } from '../types/rental';
import { DHANGADHI_LOCATIONS } from '../data/mockRooms';
import { 
  ShieldAlert, 
  Key, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Building, 
  DollarSign, 
  Check, 
  X, 
  Eye, 
  Upload, 
  Sparkles, 
  PhoneCall, 
  MapPin, 
  Lock, 
  Unlock,
  Sliders,
  LogOut
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { 
    rooms, 
    paymentRequests, 
    stats, 
    isAdmin, 
    setIsAdmin, 
    addRoom, 
    editRoom, 
    deleteRoom, 
    toggleBookedStatus, 
    toggleFeatured, 
    approvePaymentRequest, 
    rejectPaymentRequest 
  } = useRental();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [adminTab, setAdminTab] = useState<'requests' | 'rooms' | 'add_room'>('requests');

  // Add / Edit Room Modal or Form state
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);

  // Form Fields
  const [titleNp, setTitleNp] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [descNp, setDescNp] = useState('');
  const [descEn, setDescEn] = useState('');
  const [price, setPrice] = useState(10000);
  const [deposit, setDeposit] = useState(10000);
  const [roomType, setRoomType] = useState<RoomType>('flat_2bhk');
  const [floor, setFloor] = useState<FloorLevel>('1st');
  const [sizeSqFt, setSizeSqFt] = useState(400);
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [kitchen, setKitchen] = useState(true);
  const [balcony, setBalcony] = useState(true);
  const [parking, setParking] = useState<ParkingOption>('bike');
  const [water, setWater] = useState<WaterFacility>('24h');
  const [electricity, setElectricity] = useState<ElectricityType>('dedicated_submeter');
  const [wifi, setWifi] = useState(true);
  const [furnished, setFurnished] = useState<FurnishedStatus>('semi_furnished');
  const [availableDate, setAvailableDate] = useState('2026-08-01');
  const [generalLocation, setGeneralLocation] = useState('Hasanpur');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photosList, setPhotosList] = useState<string[]>([
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'
  ]);
  const [videoUrl, setVideoUrl] = useState('');

  // Protected Owner Fields
  const [ownerName, setOwnerName] = useState('Hari Bahadur Malla');
  const [ownerPhone, setOwnerPhone] = useState('9848111222');
  const [exactAddress, setExactAddress] = useState('Hasanpur Ward 5, Near Campus Gate 2');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput.toLowerCase() === 'admin') {
      setIsAdmin(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const startEditRoom = (room: Room) => {
    setEditingRoomId(room.id);
    setTitleNp(room.title.np);
    setTitleEn(room.title.en);
    setDescNp(room.description.np);
    setDescEn(room.description.en);
    setPrice(room.price);
    setDeposit(room.deposit);
    setRoomType(room.roomType);
    setFloor(room.floor);
    setSizeSqFt(room.sizeSqFt);
    setBedrooms(room.bedrooms);
    setBathrooms(room.bathrooms);
    setKitchen(room.kitchen);
    setBalcony(room.balcony);
    setParking(room.parking);
    setWater(room.water);
    setElectricity(room.electricity);
    setWifi(room.wifi);
    setFurnished(room.furnished);
    setAvailableDate(room.availableDate);
    setGeneralLocation(room.generalLocation);
    setPhotosList(room.photos);
    setVideoUrl(room.videoUrl || '');
    setOwnerName(room.ownerName);
    setOwnerPhone(room.ownerPhone);
    setExactAddress(room.exactAddress);

    setAdminTab('add_room');
  };

  const handleAddPhoto = () => {
    if (photoUrl.trim()) {
      setPhotosList(prev => [...prev, photoUrl.trim()]);
      setPhotoUrl('');
    }
  };

  const handleSaveRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const roomPayload = {
      title: { np: titleNp || 'धनगढीमा राम्रो कोठा', en: titleEn || 'Nice Room in Dhangadhi' },
      description: { np: descNp || 'विवरण उपलब्ध छ।', en: descEn || 'Description available.' },
      price: Number(price),
      deposit: Number(deposit),
      roomType,
      floor,
      sizeSqFt: Number(sizeSqFt),
      bedrooms: Number(bedrooms),
      bathrooms: Number(bathrooms),
      kitchen,
      balcony,
      parking,
      water,
      electricity,
      wifi,
      furnished,
      availableDate,
      featured: true,
      isBooked: false,
      generalLocation,
      photos: photosList.length > 0 ? photosList : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80'],
      videoUrl,
      mapApprox: { lat: 28.6853, lng: 80.5982, radiusMeters: 400 },
      ownerName,
      ownerPhone,
      exactAddress,
      exactMap: { lat: 28.6861, lng: 80.5991, directionsHint: 'Near main gate' }
    };

    if (editingRoomId) {
      editRoom(editingRoomId, roomPayload);
    } else {
      addRoom(roomPayload);
    }

    setEditingRoomId(null);
    setAdminTab('rooms');
  };

  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-lg text-center space-y-6">
          <div className="w-16 h-16 bg-slate-900 text-amber-400 rounded-2xl flex items-center justify-center mx-auto shadow-md">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900">
              {t('एडमिन प्यानल लगइन', 'Admin Panel Login')}
            </h2>
            <p className="text-xs text-slate-500">
              {t('धनगढी कोठा भाडा व्यवस्थापनका लागि लगइन गर्नुहोस् (पासकोड: 1234)', 'Enter admin PIN to manage rooms & unlock requests (Default PIN: 1234)')}
            </p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-1">
              <input
                type="password"
                placeholder="Enter PIN (Default: 1234)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-center text-sm font-extrabold text-slate-900 tracking-widest focus:outline-hidden focus:ring-2 focus:ring-slate-900"
              />
              {pinError && (
                <p className="text-xs text-rose-600 font-bold">{t('गलत पिन! कृपया 1234 हान्नुहोस्।', 'Incorrect PIN! Try 1234.')}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <Key className="w-4 h-4 text-emerald-400" />
              <span>{t('लगइन गर्नुहोस् (Log In)', 'Log In as Admin')}</span>
            </button>

            <button
              type="button"
              onClick={() => { setIsAdmin(true); }}
              className="w-full bg-emerald-50 text-emerald-800 font-bold py-2 px-3 rounded-lg text-xs hover:bg-emerald-100 transition-colors"
            >
              ⚡ {t('डेमो १-क्लिक एडमिन प्रवेश', 'Quick Demo One-Click Login')}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
              ADMIN CONTROL
            </span>
            <span className="text-xs text-slate-400">DHANGADHI ROOM RENTAL SYSTEM</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">
            {t('एडमिन ड्यासबोर्ड प्यानल', 'Admin Management Panel')}
          </h1>
        </div>

        <button
          onClick={() => setIsAdmin(false)}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>{t('एडमिन लगआउट', 'Logout Admin')}</span>
        </button>
      </div>

      {/* ADMIN STATISTICS OVERVIEW CARDS (Exact Requirement) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs text-center space-y-1">
          <div className="text-2xl font-black text-slate-900">{stats.totalRooms}</div>
          <div className="text-[11px] font-bold text-slate-500">{t('जम्मा कोठा', 'Total Rooms')}</div>
        </div>

        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-xs text-center space-y-1">
          <div className="text-2xl font-black text-emerald-800">{stats.availableRooms}</div>
          <div className="text-[11px] font-bold text-emerald-700">{t('उपलब्ध कोठा', 'Available')}</div>
        </div>

        <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 shadow-xs text-center space-y-1">
          <div className="text-2xl font-black text-rose-800">{stats.bookedRooms}</div>
          <div className="text-[11px] font-bold text-rose-700">{t('बुक भइसकेको', 'Booked')}</div>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200 shadow-xs text-center space-y-1">
          <div className="text-2xl font-black text-blue-900">{stats.totalRequests}</div>
          <div className="text-[11px] font-bold text-blue-800">{t('जम्मा अनुरोध', 'Total Requests')}</div>
        </div>

        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 shadow-xs text-center space-y-1">
          <div className="text-2xl font-black text-amber-900">{stats.pendingRequests}</div>
          <div className="text-[11px] font-bold text-amber-800">{t('पेन्डिङ', 'Pending')}</div>
        </div>

        <div className="bg-emerald-100 rounded-2xl p-4 border border-emerald-300 shadow-xs text-center space-y-1">
          <div className="text-2xl font-black text-emerald-900">{stats.approvedRequests}</div>
          <div className="text-[11px] font-bold text-emerald-800">{t('स्वीकृत', 'Approved')}</div>
        </div>

        <div className="bg-slate-100 rounded-2xl p-4 border border-slate-300 shadow-xs text-center space-y-1">
          <div className="text-2xl font-black text-slate-800">{stats.rejectedRequests}</div>
          <div className="text-[11px] font-bold text-slate-600">{t('अस्वीकृत', 'Rejected')}</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setAdminTab('requests')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            adminTab === 'requests'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>{t('भुक्तानी र अनलक अनुरोधहरू', 'Payment Requests')}</span>
          {stats.pendingRequests > 0 && (
            <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
              {stats.pendingRequests}
            </span>
          )}
        </button>

        <button
          onClick={() => setAdminTab('rooms')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            adminTab === 'rooms'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>{t('कोठा व्यवस्थापन (Manage Rooms)', 'Manage Rooms')}</span>
        </button>

        <button
          onClick={() => {
            setEditingRoomId(null);
            setAdminTab('add_room');
          }}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            adminTab === 'add_room'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>{t('नयाँ कोठा थप्नुहोस् (Add Room)', 'Add New Room')}</span>
        </button>
      </div>

      {/* TAB 1: PAYMENT REQUESTS LIST */}
      {adminTab === 'requests' && (
        <div className="space-y-4">
          <h3 className="text-base font-black text-slate-900">
            {t('ग्राहक भुक्तानी र अनलक अनुरोधहरू', 'Submitted Payment Unlock Requests')}
          </h3>

          <div className="space-y-4">
            {paymentRequests.length > 0 ? (
              paymentRequests.map((req) => (
                <div
                  key={req.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
                >
                  {/* Col 1: Customer info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-400">#{req.id}</span>
                      <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                        {req.paymentMethod}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-base text-slate-900">{req.fullName}</h4>
                    <div className="text-xs text-slate-600 space-y-1 font-semibold">
                      <div>फोन: <strong className="text-slate-900">{req.mobileNumber}</strong></div>
                      <div>कोठा: <strong className="text-slate-900">{req.roomTitle}</strong></div>
                      <div>रकम: <strong className="text-emerald-700">रु. {req.amountPaid}</strong></div>
                      <div>मिति: {new Date(req.submittedAt).toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Col 2: Screenshot preview */}
                  <div className="text-center space-y-1">
                    <span className="text-[11px] font-extrabold text-slate-500 uppercase block">
                      {t('भुक्तानी स्क्रिनसट', 'Payment Screenshot')}
                    </span>
                    <a
                      href={req.screenshotUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block border border-slate-200 rounded-xl overflow-hidden hover:opacity-90 transition-opacity"
                    >
                      <img src={req.screenshotUrl} alt="Screenshot" className="h-28 w-44 object-cover mx-auto bg-slate-100" />
                    </a>
                  </div>

                  {/* Col 3: Approve / Reject Controls */}
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between text-xs font-extrabold">
                      <span>{t('स्थिति:', 'Status:')}</span>
                      <span className={`px-2.5 py-1 rounded-full uppercase text-[10px] ${
                        req.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                        req.status === 'rejected' ? 'bg-rose-100 text-rose-800' : 'bg-amber-100 text-amber-900'
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    {req.status === 'pending' ? (
                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => approvePaymentRequest(req.id, 'Verified payment by Admin.')}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1 shadow-xs"
                        >
                          <Check className="w-4 h-4" />
                          <span>Approve (अनलक गर्नुहोस्)</span>
                        </button>

                        <button
                          onClick={() => rejectPaymentRequest(req.id, 'Payment screenshot unverified.')}
                          className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 font-semibold space-y-1">
                        <div>नोट: {req.adminNote || 'No notes.'}</div>
                        {req.status === 'approved' && (
                          <div className="text-emerald-700 font-bold flex items-center gap-1">
                            <Unlock className="w-3.5 h-3.5" />
                            <span>{t('ग्राहकलाई सम्पर्क अनलक गरियो!', 'Unlocked for customer!')}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-500 font-bold text-xs">
                {t('कुनै अनुरोध छैन।', 'No payment requests found.')}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ROOMS LIST & QUICK ACTIONS */}
      {adminTab === 'rooms' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-black text-slate-900">
              {t('उपलब्ध कोठाहरूको सूची', 'Manage All Rooms')}
            </h3>

            <button
              onClick={() => {
                setEditingRoomId(null);
                setAdminTab('add_room');
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{t('नयाँ कोठा थप्नुहोस्', 'Add Room')}</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-semibold text-slate-700">
                <thead className="bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider">
                  <tr>
                    <th className="p-4">{t('फोटो', 'Photo')}</th>
                    <th className="p-4">{t('शीर्षक र स्थान', 'Title & Location')}</th>
                    <th className="p-4">{t('भाडा', 'Price')}</th>
                    <th className="p-4">{t('स्थिति', 'Status')}</th>
                    <th className="p-4">{t('घरधनी फोन', 'Owner Phone')}</th>
                    <th className="p-4 text-right">{t('कार्यहरू (Actions)', 'Actions')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rooms.map((room) => (
                    <tr key={room.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <img src={room.photos[0]} alt="" className="w-14 h-10 object-cover rounded-lg border border-slate-200" />
                      </td>

                      <td className="p-4 max-w-xs">
                        <div className="font-extrabold text-slate-900 line-clamp-1">{room.title[lang]}</div>
                        <div className="text-[10px] text-slate-500 font-bold">{room.generalLocation}, Dhangadhi</div>
                      </td>

                      <td className="p-4 font-black text-emerald-700">
                        रु. {room.price.toLocaleString('ne-NP')}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => toggleBookedStatus(room.id)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                            room.isBooked 
                              ? 'bg-rose-100 text-rose-800 hover:bg-rose-200' 
                              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          }`}
                        >
                          {room.isBooked ? 'Booked' : 'Available'}
                        </button>
                      </td>

                      <td className="p-4 font-mono font-bold text-slate-900">
                        +977 {room.ownerPhone}
                      </td>

                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => startEditRoom(room)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 p-2 rounded-lg font-bold"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => deleteRoom(room.id)}
                          className="bg-rose-50 hover:bg-rose-100 text-rose-700 p-2 rounded-lg font-bold"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ADD / EDIT ROOM FORM */}
      {adminTab === 'add_room' && (
        <form onSubmit={handleSaveRoom} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                {editingRoomId ? t('कोठा सम्पादन गर्नुहोस् (Edit Room)', 'Edit Room') : t('नयाँ कोठा थप्नुहोस् (Add New Room)', 'Add New Room Listing')}
              </h3>
              <p className="text-xs text-slate-500">
                {t('सबै विवरण भरेर प्रकाशन गर्नुहोस्। घरधनीको फोन र exact ठेगाना स्वतः सुरक्षित हुनेछ।', 'Public info will be visible; owner contact will remain locked until approved.')}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAdminTab('rooms')}
              className="text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title NP */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700">कोठा शीर्षक (नेपालीमा) *</label>
              <input
                type="text"
                required
                placeholder="e.g. हसनपुरमा २ कोठाको आधुनिक फ्ल्याट"
                value={titleNp}
                onChange={(e) => setTitleNp(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold"
              />
            </div>

            {/* Title EN */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700">Title (In English)</label>
              <input
                type="text"
                required
                placeholder="e.g. Modern 2-Room Flat in Hasanpur"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold"
              />
            </div>

            {/* Price */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700">मासिक भाडा (NPR Price) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-emerald-700"
              />
            </div>

            {/* Deposit */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700">धरौटी रकम (Deposit NPR)</label>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold"
              />
            </div>

            {/* General Location */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700">स्थान (Dhangadhi Area) *</label>
              <select
                value={generalLocation}
                onChange={(e) => setGeneralLocation(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold"
              >
                {DHANGADHI_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            {/* Room Type */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700">प्रकार (Room Type) *</label>
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold"
              >
                <option value="single_room">Single Room</option>
                <option value="double_room">Double Room</option>
                <option value="flat_1bhk">1 BHK Flat</option>
                <option value="flat_2bhk">2 BHK Flat</option>
                <option value="flat_3bhk">3 BHK Flat</option>
                <option value="full_house">Full House</option>
                <option value="commercial">Commercial Space</option>
              </select>
            </div>

            {/* Floor */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700">तल्ला (Floor Level)</label>
              <select
                value={floor}
                onChange={(e) => setFloor(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold"
              >
                <option value="ground">Ground Floor</option>
                <option value="1st">1st Floor</option>
                <option value="2nd">2nd Floor</option>
                <option value="3rd">3rd Floor</option>
              </select>
            </div>

            {/* Size */}
            <div className="space-y-1">
              <label className="text-xs font-extrabold text-slate-700">साइज (Size Sq. Ft.)</label>
              <input
                type="number"
                value={sizeSqFt}
                onChange={(e) => setSizeSqFt(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold"
              />
            </div>
          </div>

          {/* PROTECTED OWNER DETAILS BOX */}
          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2 text-rose-800 font-extrabold text-xs">
              <Lock className="w-4 h-4 text-rose-600" />
              <span>सुरक्षित घरधनी विवरण (LOCKED OWNER INFORMATION)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-slate-700">घरधनीको नाम (Owner Name) *</label>
                <input
                  type="text"
                  required
                  placeholder="Ram Bahadur Thapa"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full bg-white border border-rose-200 rounded-xl p-2.5 text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-slate-700">घरधनीको फोन (Owner Mobile) *</label>
                <input
                  type="tel"
                  required
                  placeholder="9848412345"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  className="w-full bg-white border border-rose-200 rounded-xl p-2.5 text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-extrabold text-slate-700">पूरा ठेगाना (Exact Address) *</label>
                <input
                  type="text"
                  required
                  placeholder="Hasanpur Ward 5, Near Kailali Campus"
                  value={exactAddress}
                  onChange={(e) => setExactAddress(e.target.value)}
                  className="w-full bg-white border border-rose-200 rounded-xl p-2.5 text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* Photos Upload / URLs */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold text-slate-700">फोटो लिंक (Photo URL)</label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold"
              />
              <button
                type="button"
                onClick={handleAddPhoto}
                className="bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl text-xs"
              >
                थप्नुहोस्
              </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pt-2">
              {photosList.map((p, idx) => (
                <div key={idx} className="relative group shrink-0">
                  <img src={p} alt="" className="w-20 h-16 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={() => setPhotosList(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute -top-1 -right-1 bg-rose-600 text-white p-0.5 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setAdminTab('rooms')}
              className="bg-slate-100 text-slate-700 font-bold px-5 py-3 rounded-xl text-xs"
            >
              रद्द गर्नुहोस्
            </button>

            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 py-3 rounded-xl text-xs shadow-md"
            >
              {editingRoomId ? 'Save Changes' : 'Publish Room Listing'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
