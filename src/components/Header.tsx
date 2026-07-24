import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRental, PageName } from '../context/RentalContext';
import { 
  Home, 
  Search, 
  UserCheck, 
  ShieldAlert, 
  PhoneCall, 
  MessageCircle, 
  Globe, 
  Info, 
  HelpCircle,
  Menu,
  X,
  Building2,
  Lock,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const { activePage, navigateTo, stats, paymentRequests, userToken, isAdmin } = useRental();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // User's my requests count
  const myRequestsCount = paymentRequests.filter(
    r => r.userToken === userToken || r.userToken === 'default_user_token_demo'
  ).length;

  const navItems: { id: PageName; labelNp: string; labelEn: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', labelNp: 'गृहपृष्ठ', labelEn: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'search', labelNp: 'कोठा खोज्नुहोस्', labelEn: 'Search Rooms', icon: <Search className="w-4 h-4" /> },
    { id: 'list_property', labelNp: 'घरबेटी (कोठा थप्नुहोस्)', labelEn: 'Gharbeti (List Property)', icon: <Building2 className="w-4 h-4 text-emerald-500" /> },
    { id: 'customer_dashboard', labelNp: 'मेरो अनुरोध', labelEn: 'My Requests', icon: <UserCheck className="w-4 h-4" />, badge: myRequestsCount },
    { id: 'admin_dashboard', labelNp: 'एडमिन प्यानल', labelEn: 'Admin Panel', icon: <ShieldAlert className="w-4 h-4" />, badge: stats.pendingRequests > 0 ? stats.pendingRequests : undefined },
    { id: 'about', labelNp: 'हाम्रो बारेमा', labelEn: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'contact', labelNp: 'सम्पर्क', labelEn: 'Contact', icon: <HelpCircle className="w-4 h-4" /> }
  ];

  const handleNavClick = (page: PageName) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="bg-rose-500/20 text-rose-300 font-semibold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider flex items-center gap-1 border border-rose-500/30">
              <Lock className="w-2.5 h-2.5" /> {t('सुरक्षित भाडा', 'VERIFIED RENTALS')}
            </span>
            <span className="hidden sm:inline text-slate-300">
              {t('धनगढी क्षेत्रका कोठा, फ्ल्याट र घरहरू प्रत्यक्ष अनलक गर्नुहोस्', 'Direct room, flat & house rentals in Dhangadhi area')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="tel:+9779743577999" 
              className="flex items-center gap-1 hover:text-emerald-400 transition-colors font-medium"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>9743577999</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="https://wa.me/9779743577999?text=Hello%20Dhangadhi%20Room%20Rental" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black shadow-md group-hover:bg-slate-800 transition-all">
              <Building2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-slate-700 leading-tight">
                DHANGADHI ROOM RENTAL
              </div>
              <div className="text-[11px] font-semibold text-slate-500 tracking-normal">
                धनगढी कोठा भाडा सेवा
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all relative ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{t(item.labelNp, item.labelEn)}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language Switcher & Call/WhatsApp Buttons */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setLang('np')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  lang === 'np' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                नेपाल
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  lang === 'en' 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                EN
              </button>
            </div>

            {/* Gharbeti List Property Quick Button */}
            <button
              onClick={() => handleNavClick('list_property')}
              className="hidden sm:flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-black transition-all shadow-xs"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{t('+ कोठा थप्नुहोस्', '+ List Property')}</span>
            </button>

            {/* Direct Call Button (Desktop) */}
            <a
              href="tel:+9779848400000"
              className="hidden lg:flex items-center gap-1.5 bg-slate-900 text-white hover:bg-slate-800 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('फोन गर्नुहोस्', 'Call Now')}</span>
            </a>

            {/* Direct WhatsApp Button (Desktop) */}
            <a
              href="https://wa.me/9779800000000?text=Hello%20Dhangadhi%20Room%20Rental"
              target="_blank"
              rel="noreferrer"
              className="hidden xl:flex items-center gap-1.5 bg-emerald-600 text-white hover:bg-emerald-700 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <div className="grid grid-cols-2 gap-2 mb-3 pt-2">
            <a
              href="tel:+9779848400000"
              className="flex items-center justify-center gap-2 bg-slate-900 text-white py-2.5 px-3 rounded-lg text-xs font-bold shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>{t('कल गर्नुहोस्', 'Call Now')}</span>
            </a>
            <a
              href="https://wa.me/9779743577999?text=Hello%20Dhangadhi%20Room%20Rental"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-2.5 px-3 rounded-lg text-xs font-bold shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-slate-900 text-white' 
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span>{t(item.labelNp, item.labelEn)}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
