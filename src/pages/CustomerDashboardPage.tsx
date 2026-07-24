import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRental } from '../context/RentalContext';
import { 
  UserCheck, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Unlock, 
  PhoneCall, 
  MessageCircle, 
  MapPin, 
  ExternalLink, 
  PlusCircle, 
  Building, 
  ShieldCheck,
  Eye
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { paymentRequests, userToken, rooms, navigateTo } = useRental();

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Filter requests submitted in this browser session (or demo session)
  const myRequests = paymentRequests.filter(
    r => r.userToken === userToken || r.userToken === 'default_user_token_demo'
  );

  const filteredRequests = myRequests.filter(req => {
    if (activeTab === 'all') return true;
    return req.status === activeTab;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider">
            ग्राहक ड्यासबोर्ड
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2 mt-1">
            <UserCheck className="w-6 h-6 text-emerald-600" />
            <span>{t('मेरो अनुरोध तथा अनलक इतिहास', 'My Submitted Requests & Unlocks')}</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t('तपाईंले बुझाउनुभएका सम्पूर्ण भुक्तानी र अनलक स्थिति', 'Track your unlock payment request statuses in real-time')}
          </p>
        </div>

        <button
          onClick={() => navigateTo('search')}
          className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>{t('नयाँ कोठा अनलक गर्नुहोस्', 'Unlock New Room')}</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'pending', 'approved', 'rejected'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize whitespace-nowrap ${
              activeTab === tab
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab === 'all' && `${t('सबै अनुरोध', 'All Requests')} (${myRequests.length})`}
            {tab === 'pending' && `⏳ ${t('पेन्डिङ', 'Pending')} (${myRequests.filter(r => r.status === 'pending').length})`}
            {tab === 'approved' && `✅ ${t('स्वीकृत (Approved)', 'Approved')} (${myRequests.filter(r => r.status === 'approved').length})`}
            {tab === 'rejected' && `❌ ${t('अस्वीकृत', 'Rejected')} (${myRequests.filter(r => r.status === 'rejected').length})`}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map(req => {
            const matchedRoom = rooms.find(r => r.id === req.roomId);

            return (
              <div
                key={req.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs p-6 space-y-4"
              >
                {/* Top Status Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-400">#{req.id}</span>
                    <span className="text-xs font-bold text-slate-500">• {new Date(req.submittedAt).toLocaleDateString()}</span>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {req.status === 'pending' && (
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-700 animate-spin" />
                        <span>Pending Approval</span>
                      </span>
                    )}
                    {req.status === 'approved' && (
                      <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Approved & Unlocked</span>
                      </span>
                    )}
                    {req.status === 'rejected' && (
                      <span className="bg-rose-100 text-rose-900 border border-rose-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Rejected</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Body Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Request Info */}
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-slate-900">
                      {req.roomTitle}
                    </h3>
                    <div className="text-xs text-slate-600 font-semibold space-y-1">
                      <div>ग्राहक नाम: <strong className="text-slate-900">{req.fullName}</strong></div>
                      <div>मोबाईल नम्बर: <strong className="text-slate-900">{req.mobileNumber}</strong></div>
                      <div>भुक्तानी: <strong className="uppercase text-emerald-700">{req.paymentMethod}</strong> (रु. {req.amountPaid})</div>
                      {req.transactionRef && <div>Ref: <span className="font-mono">{req.transactionRef}</span></div>}
                    </div>
                  </div>

                  {/* Right: Unlocked Details or Pending Message */}
                  <div>
                    {req.status === 'approved' && matchedRoom ? (
                      /* APPROVED REVEAL BOX */
                      <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 space-y-3 text-xs">
                        <div className="flex items-center gap-2 text-emerald-950 font-black">
                          <Unlock className="w-4 h-4 text-emerald-600" />
                          <span>🔓 UNLOCKED OWNER INFORMATION</span>
                        </div>

                        <div className="space-y-1 text-slate-900 font-bold">
                          <div>घरधनी नाम (Owner Name): <strong className="text-emerald-950 font-black">{matchedRoom.ownerName}</strong></div>
                          <div>फोन नम्बर (Owner Phone): <strong className="text-emerald-950 font-black">+977 {matchedRoom.ownerPhone}</strong></div>
                          <div>पुरा ठेगाना (Exact Address): <span className="font-semibold text-slate-800">{matchedRoom.exactAddress}</span></div>
                        </div>

                        {/* Direct Call & WhatsApp Buttons */}
                        <div className="flex gap-2 pt-1">
                          <a
                            href={`tel:${matchedRoom.ownerPhone}`}
                            className="flex-1 bg-slate-900 text-white hover:bg-slate-800 font-extrabold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{t('कल गर्नुहोस्', 'Call Owner')}</span>
                          </a>

                          <a
                            href={`https://wa.me/977${matchedRoom.ownerPhone}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 font-extrabold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>

                        <button
                          onClick={() => navigateTo('details', matchedRoom.id)}
                          className="w-full text-center text-emerald-800 font-bold hover:underline pt-1 text-[11px] block"
                        >
                          {t('कोठाको पूरा विवरण र नक्सा हेर्नुहोस् →', 'View Full Details & Map →')}
                        </button>
                      </div>
                    ) : req.status === 'pending' ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs space-y-2">
                        <div className="font-extrabold text-amber-900">
                          ⏳ "Please wait for approval."
                        </div>
                        <p className="text-amber-800 leading-relaxed font-medium">
                          तपाईंको भुक्तानी एडमिनले जाँच गर्दैछन्। सामान्यतया १०-१५ मिनेटभित्र स्वीकृत हुनेछ।
                        </p>
                      </div>
                    ) : (
                      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 text-xs space-y-2">
                        <div className="font-extrabold text-rose-900">
                          ❌ Payment Request Rejected
                        </div>
                        <p className="text-rose-800">
                          कारण: {req.adminNote || 'भुक्तानी प्रमाणित हुन सकेन।'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
            <Building className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-extrabold text-slate-900">
              {t('कुनै अनुरोध फेला परेन', 'No Submitted Requests Yet')}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {t(
                'तपाईंले अहिलेसम्म कुनै कोठाको सम्पर्क अनलक अनुरोध गर्नुभएको छैन।',
                'You have not submitted any room unlock payment requests yet.'
              )}
            </p>
            <button
              onClick={() => navigateTo('search')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs inline-flex items-center gap-2"
            >
              <span>{t('कोठाहरू खोज्नुहोस्', 'Search Rooms Now')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
