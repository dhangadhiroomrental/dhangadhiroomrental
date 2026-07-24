import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { RentalProvider, useRental } from './context/RentalContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { RoomDetailsPage } from './pages/RoomDetailsPage';
import { PaymentUnlockPage } from './pages/PaymentUnlockPage';
import { CustomerDashboardPage } from './pages/CustomerDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { ListPropertyPage } from './pages/ListPropertyPage';

// Sticky Mobile Action Bar
import { PhoneCall, MessageCircle, Search, UserCheck, PlusCircle, Building2 } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activePage, navigateTo, paymentRequests, userToken } = useRental();

  const myRequestsCount = paymentRequests.filter(
    r => r.userToken === userToken || r.userToken === 'default_user_token_demo'
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      <Header />

      <main className="flex-1">
        {activePage === 'home' && <HomePage />}
        {activePage === 'search' && <SearchResultsPage />}
        {activePage === 'details' && <RoomDetailsPage />}
        {activePage === 'payment' && <PaymentUnlockPage />}
        {activePage === 'customer_dashboard' && <CustomerDashboardPage />}
        {activePage === 'admin_dashboard' && <AdminDashboardPage />}
        {activePage === 'contact' && <ContactPage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'list_property' && <ListPropertyPage />}
      </main>

      <Footer />

      {/* Floating Sticky Mobile Navigation / Call Bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-slate-900 text-white border-t border-slate-800 p-2 z-40 shadow-2xl flex items-center justify-around">
        <button
          onClick={() => navigateTo('search')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            activePage === 'search' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <Search className="w-4 h-4" />
          <span>खोजी</span>
        </button>

        <button
          onClick={() => navigateTo('list_property')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold ${
            activePage === 'list_property' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>+ थप्नुहोस्</span>
        </button>

        <a
          href="tel:+9779848400000"
          className="bg-emerald-600 text-white p-2.5 rounded-full shadow-lg font-bold flex items-center justify-center -mt-5 border-4 border-slate-100"
          title="Direct Call"
        >
          <PhoneCall className="w-5 h-5" />
        </a>

        <button
          onClick={() => navigateTo('customer_dashboard')}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-bold relative ${
            activePage === 'customer_dashboard' ? 'text-emerald-400' : 'text-slate-400'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>अनुरोध</span>
          {myRequestsCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {myRequestsCount}
            </span>
          )}
        </button>

        <a
          href="https://wa.me/9779800000000?text=Hello%20Dhangadhi%20Room%20Rental"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-0.5 text-[10px] font-bold text-emerald-400"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <RentalProvider>
        <MainContent />
      </RentalProvider>
    </LanguageProvider>
  );
}
