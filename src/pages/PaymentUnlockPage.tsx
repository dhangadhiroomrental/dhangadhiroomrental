import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRental } from '../context/RentalContext';
import paymentQR from '../assets/payment-qr.png';
import { 
  QrCode, 
  Upload, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  ArrowLeft, 
  Phone, 
  User, 
  Image as ImageIcon, 
  Clock, 
  ShieldCheck,
  Send,
  Building
} from 'lucide-react';

export const PaymentUnlockPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { rooms, selectedRoom, submitPaymentRequest, navigateTo } = useRental();

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [roomId, setRoomId] = useState(selectedRoom ? selectedRoom.id : (rooms[0]?.id || ''));
  const [paymentMethod, setPaymentMethod] = useState<'esewa' | 'khalti'>('esewa');
  const [transactionRef, setTransactionRef] = useState('');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [submittedReqId, setSubmittedReqId] = useState<string | null>(null);

  const currentSelectedRoom = rooms.find(r => r.id === roomId) || selectedRoom || rooms[0];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !mobileNumber.trim()) {
      alert(t('कृपया आफ्नो नाम र फोन नम्बर भरनुहोस्।', 'Please fill in your Full Name and Mobile Number.'));
      return;
    }

    const req = submitPaymentRequest({
      fullName,
      mobileNumber,
      roomId: currentSelectedRoom ? currentSelectedRoom.id : roomId,
      roomTitle: currentSelectedRoom ? currentSelectedRoom.title[lang] : 'Room Request',
      roomPrice: currentSelectedRoom ? currentSelectedRoom.price : 0,
      paymentMethod,
      amountPaid: 100,
      transactionRef: transactionRef || (paymentMethod.toUpperCase() + '-' + Math.floor(100000 + Math.random() * 900000)),
      screenshotUrl: screenshotPreview || 'https://images.unsplash.com/photo-1556742049-0a67568d0d9f?auto=format&fit=crop&w=600&q=80'
    });

    setSubmittedReqId(req.id);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('details', currentSelectedRoom?.id)}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-xl transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-600" />
          <span>{t('कोठा विवरणमा फर्कनुहोस्', 'Back to Room Details')}</span>
        </button>
      </div>

      {submitted ? (
        /* AFTER SUBMISSION SUCCESS STATE (Exact requirement string) */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center space-y-6 shadow-md max-w-2xl mx-auto animate-fadeIn">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase">
              अनुरोध दर्ता भयो (Request Submitted)
            </span>
            <h2 className="text-2xl font-black text-slate-900 leading-tight">
              "Your request has been sent. Please wait for approval."
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              तपाईंको भुक्तानी अनुरोध एडमिनकहाँ पठाइएको छ। स्वीकृत हुनासाथ सम्पर्क नम्बर खुल्नेछ।
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">{t('अनुरोध आईडी:', 'Request ID:')}</span>
              <span className="font-extrabold text-slate-900">{submittedReqId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">{t('छानिएको कोठा:', 'Selected Room:')}</span>
              <span className="font-extrabold text-slate-900">{currentSelectedRoom?.title[lang]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">{t('ग्राहक:', 'Customer:')}</span>
              <span className="font-extrabold text-slate-900">{fullName} ({mobileNumber})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 font-bold">{t('स्थिति:', 'Status:')}</span>
              <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-black">
                ⏳ {t('पेन्डिङ (Pending Approval)', 'Pending Approval')}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => navigateTo('customer_dashboard')}
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs transition-all shadow-xs"
            >
              {t('मेरो ड्यासबोर्डमा स्थिति हेर्नुहोस्', 'Check Status in Customer Dashboard')}
            </button>
            <button
              onClick={() => navigateTo('search')}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 px-4 rounded-xl text-xs transition-all"
            >
              {t('थप कोठाहरू खोज्नुहोस्', 'Search More Rooms')}
            </button>
          </div>
        </div>
      ) : (
        /* PAYMENT FORM PAGE */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: QR Codes */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
                १०० रुपैयाँ प्रमाणीकरण शुल्क
              </span>
              <h2 className="text-xl font-black text-slate-900">
                {t('eSewa वा Khalti QR स्क्यान गर्नुहोस्', 'Scan eSewa or Khalti QR Code')}
              </h2>
              <p className="text-xs text-slate-500">
                {t('कुनै पनि एक डिजिटल वालेटबाट रु. १०० भुक्तानी गरी स्क्रिनसट लिनुहोस्।', 'Pay Rs. 100 via either eSewa or Khalti and capture screenshot.')}
              </p>
            </div>

            {/* Payment Method Tabs */}
            <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setPaymentMethod('esewa')}
                className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'esewa'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>eSewa QR</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('khalti')}
                className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 ${
                  paymentMethod === 'khalti'
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Khalti QR</span>
              </button>
            </div>

            {/* Real QR Code Image */}
            <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center space-y-3">
              <div className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                {paymentMethod === 'esewa' ? 'eSewa Official Payment QR' : 'Khalti Official Payment QR'}
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 w-48 h-48 mx-auto shadow-sm flex flex-col items-center justify-center relative">
                <img src={paymentQR} alt="Payment QR Code" className="w-full h-full object-contain" />
              </div>

              <div className="space-y-1 text-xs text-slate-600 font-bold">
                <div>खाता नाम: <strong className="text-slate-900">DHANGADHI ROOM RENTAL</strong></div>
                <div>नम्बर: <strong className="text-slate-900">9848400000</strong></div>
                <div>रकम: <strong className="text-emerald-600 font-black">रु. १०० (NPR 100)</strong></div>
              </div>
            </div>
          </div>

          {/* Right Column: Customer Form */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900">
                {t('भुक्तानी फारम भरनुहोस्', 'Fill Payment Details')}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {t('फारम बुझाएपछि एडमिनले जाँच गरी अनलक गरिदिनेछन्।', 'Submit this form after making payment for quick approval.')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Room Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <Building className="w-4 h-4 text-emerald-600" />
                  <span>{t('छानिएको कोठा (Selected Room)', 'Selected Room')}</span>
                </label>
                <select
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                >
                  {rooms.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.title[lang]} - (रु. {r.price.toLocaleString('ne-NP')})
                    </option>
                  ))}
                </select>
              </div>

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <User className="w-4 h-4 text-slate-600" />
                  <span>{t('पूरा नाम (Full Name)', 'Full Name')} *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ram Bahadur Thapa"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Mobile Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-slate-600" />
                  <span>{t('मोबाईल नम्बर (Mobile Number)', 'Mobile Number')} *</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9848123456"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Transaction Ref (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700">
                  {t('ट्रान्ज्याक्सन आईडी (Transaction ID / Reference)', 'Transaction Ref (Optional)')}
                </label>
                <input
                  type="text"
                  placeholder="e.g. ESW-98231456"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Screenshot Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-slate-600" />
                  <span>{t('भुक्तानी स्क्रिनसट अपलोड (Payment Screenshot)', 'Payment Screenshot')}</span>
                </label>

                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center bg-slate-50 hover:bg-slate-100 transition-colors relative cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {screenshotPreview ? (
                    <div className="space-y-2">
                      <img src={screenshotPreview} alt="Screenshot preview" className="max-h-36 mx-auto rounded-lg border" />
                      <span className="text-[11px] text-emerald-600 font-bold block">{t('फोटो छानियो! (Photo selected)', 'Photo attached!')}</span>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                      <span className="text-xs font-bold text-slate-700 block">
                        {t('फोटो यहाँ तान्नुहोस् वा थिच्नुहोस्', 'Click or drag screenshot here')}
                      </span>
                      <span className="text-[10px] text-slate-400">PNG, JPG, JPEG</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-4 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span>Submit Payment Request</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
