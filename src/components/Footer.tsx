import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRental, PageName } from '../context/RentalContext';
import { 
  Building2, 
  Lock, 
  ShieldCheck, 
  PhoneCall, 
  MessageCircle, 
  MapPin, 
  Mail, 
  ExternalLink 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { navigateTo } = useRental();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: About & Branding */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 text-slate-950 rounded-xl flex items-center justify-center font-black">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <span className="font-black text-white text-base tracking-tight block">
                  DHANGADHI ROOM RENTAL
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  धनगढी कोठा र फ्ल्याट भाडा प्लेटफर्म
                </span>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed">
              {t(
                'धनगढीमा कोठा, फ्ल्याट, शटर र घर भाडामा खोज्ने सबैभन्दा सुरक्षित र भरपर्दो प्लेटफर्म। घरधनी र भाडामा बस्ने बीच प्रत्यक्ष सम्पर्क।',
                'The most trusted and secure room, flat, and house rental platform in Dhangadhi. Direct contact verification between owners and tenants.'
              )}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400 font-semibold bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('१००% प्रमाणीकृत घरधनी सम्पर्क', '100% Verified Owner Contacts')}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              {t('मुख्य लिङ्कहरू', 'Quick Links')}
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li>
                <button 
                  onClick={() => navigateTo('home')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  › {t('गृहपृष्ठ', 'Home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('search')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  › {t('कोठा खोज्नुहोस्', 'Search Rooms')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('customer_dashboard')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  › {t('मेरो अनुरोध र अनलक (My Requests)', 'My Requests & Unlocks')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('admin_dashboard')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5 text-amber-300"
                >
                  › {t('एडमिन लगइन (Admin Panel)', 'Admin Panel')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  › {t('हाम्रो बारेमा (About Us)', 'About Us')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('contact')} 
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  › {t('सम्पर्क (Contact)', 'Contact Us')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Dhangadhi Areas */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              {t('लोकप्रिय क्षेत्रहरू', 'Popular Dhangadhi Areas')}
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-400 font-medium">
              <span className="bg-slate-800/50 px-2.5 py-1 rounded text-slate-300">Hasanpur</span>
              <span className="bg-slate-800/50 px-2.5 py-1 rounded text-slate-300">Campus Road</span>
              <span className="bg-slate-800/50 px-2.5 py-1 rounded text-slate-300">Traffic Chawk</span>
              <span className="bg-slate-800/50 px-2.5 py-1 rounded text-slate-300">Uttarbehedi</span>
              <span className="bg-slate-800/50 px-2.5 py-1 rounded text-slate-300">Boradi</span>
              <span className="bg-slate-800/50 px-2.5 py-1 rounded text-slate-300">Rato Pul</span>
              <span className="bg-slate-800/50 px-2.5 py-1 rounded text-slate-300">LN Chawk</span>
              <span className="bg-slate-800/50 px-2.5 py-1 rounded text-slate-300">Buspark</span>
            </div>
          </div>

          {/* Col 4: Dhangadhi Contact & Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-sm tracking-wide uppercase border-b border-slate-800 pb-2">
              {t('सम्पर्क र भुक्तानी', 'Office & Payment')}
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{t('ट्रफिक चोक, धनगढी, कैलाली, सुदूरपश्चिम', 'Traffic Chawk, Dhangadhi, Kailali')}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+9779848400000" className="hover:text-emerald-400 font-bold">+977 9848400000</a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="https://wa.me/9779800000000" target="_blank" rel="noreferrer" className="hover:text-emerald-400 font-bold">+977 9800000000</a>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
                {t('अनलाइन भुक्तानी साझेदार:', 'Accepted Payment Methods:')}
              </span>
              <div className="flex gap-2 text-[10px] font-black">
                <span className="bg-emerald-600/20 text-emerald-400 px-2.5 py-1 rounded border border-emerald-500/30">
                  eSewa
                </span>
                <span className="bg-purple-600/20 text-purple-400 px-2.5 py-1 rounded border border-purple-500/30">
                  Khalti
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-3">
          <div>
            © 2026 <strong className="text-slate-300">DHANGADHI ROOM RENTAL</strong>. {t('सर्वाधिकार सुरक्षित।', 'All Rights Reserved.')}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Lock className="w-3 h-3 text-rose-400" />
            <span>{t('गोपनीयता र सुरक्षा नीति अनुसार घरधनी सम्पर्क सुरक्षित गरिएको।', 'Protected owner contacts for security & fraud prevention.')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
