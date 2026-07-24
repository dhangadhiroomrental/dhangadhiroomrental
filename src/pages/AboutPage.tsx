import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRental } from '../context/RentalContext';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  CheckCircle2, 
  HelpCircle, 
  PhoneCall, 
  MessageCircle, 
  Users, 
  Award, 
  MapPin 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { navigateTo } = useRental();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-md border border-slate-800">
        <div className="w-12 h-12 bg-emerald-500 text-slate-950 rounded-2xl flex items-center justify-center mx-auto font-black shadow-md">
          <Building2 className="w-7 h-7" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white">
          DHANGADHI ROOM RENTAL
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
          {t(
            'धनगढीमा कोठा, फ्ल्याट र घर भाडामा पाउन बिचौलिया बिनाको पहिलो डिजिटल र भरपर्दो माध्यम।',
            'Dhangadhi’s premier digital rental portal connecting real room seekers with verified home owners directly without broker hassle.'
          )}
        </p>

        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => navigateTo('search')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl text-xs shadow-sm"
          >
            {t('कोठाहरू खोज्नुहोस्', 'Browse Available Rooms')}
          </button>
        </div>
      </section>

      {/* Our Mission & Value Proposition */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-xl flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            {t('प्रमाणीकृत घरधनीहरू', '100% Verified Listings')}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {t(
              'प्रत्येक कोठा तथा फ्ल्याटको तस्बिर र ठेगाना हाम्रो टोलीद्वारा स्थलगत निरीक्षण गरी प्रमाणीकरण गरिन्छ।',
              'Every listed room and flat is field-inspected to ensure real photos and accurate descriptions.'
            )}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 bg-rose-100 text-rose-700 rounded-xl flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            {t('सुरक्षित अनलक प्रणाली', 'Protected Owner Contact')}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {t(
              'घरधनीको प्राइभेसी रक्षा गर्न र अनावश्यक फोन स्पाम रोक्न अनलक प्रणाली लागू गरिएको छ।',
              'Protects home owners from spam callers while granting real tenants verified owner contacts.'
            )}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">
            {t('बिचौलिया रहित संवाद', 'No Agent Commission')}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            {t(
              'भाडामा बस्ने र घरधनी बीच कुनै महँगो कमिसन वा एजेन्ट बिना सीधा संवाद गराइन्छ।',
              'Direct connection between tenant and owner without heavy broker commissions.'
            )}
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
        <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-emerald-600" />
          <span>{t('बारम्बार सोधिने प्रश्नहरू (FAQs)', 'Frequently Asked Questions')}</span>
        </h2>

        <div className="space-y-4 text-xs font-semibold">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <h4 className="font-extrabold text-slate-900 text-sm">
              १. घरधनीको फोन नम्बर र exact location किन लक छ?
            </h4>
            <p className="text-slate-600 leading-relaxed font-medium">
              घरधनीको फोनमा अनावश्यक स्पाम रोक्न र वास्तविक कोठा खोज्ने मानिसहरूलाई मात्र प्रमाणीकरण गरी सीधा सम्पर्क गराउन यो सुरक्षा लागू गरिएको हो।
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <h4 className="font-extrabold text-slate-900 text-sm">
              २. १०० रुपैयाँ शुल्क तिरिसकेपछि के हुन्छ?
            </h4>
            <p className="text-slate-600 leading-relaxed font-medium">
              eSewa वा Khalti बाट शुल्क बुझाएपछि तपाईंको अनुरोध एडमिनकहाँ पुग्छ। स्वीकृत हुनासाथ तपाईंको Customer Dashboard मा घरधनीको नाम, फोन नम्बर र exact Google Map देखिनेछ।
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
            <h4 className="font-extrabold text-slate-900 text-sm">
              ३. धनगढीका कुन कुन स्थानका कोठाहरू उपलब्ध छन्?
            </h4>
            <p className="text-slate-600 leading-relaxed font-medium">
              हसनपुर, क्याम्पस रोड, ट्राफिक चोक, उत्तरबेहेडी, बोराडी, रातो पुल, एलएन चोक, बसपार्क क्षेत्र लगायत धनगढीका प्रमुख सबै क्षेत्रमा कोठाहरू उपलब्ध छन्।
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
