import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  PhoneCall, 
  MessageCircle, 
  MapPin, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  HelpCircle 
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-md border border-slate-800 text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{t('हामीलाई सम्पर्क गर्नुहोस्', 'Get In Touch')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white">
          DHANGADHI ROOM RENTAL
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium">
          {t('धनगढीमा कोठा, फ्ल्याट वा घर भाडा सम्बन्धी कुनै पनि जिज्ञासा वा सहयोगका लागि हामीलाई सम्पर्क गर्नुहोस्।', 'Reach out for inquiries or assistance regarding rentals in Dhangadhi.')}
        </p>

        {/* Quick Contact Buttons */}
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <a
            href="tel:+9779848400000"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-5 py-3 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>+977 9848400000</span>
          </a>

          <a
            href="https://wa.me/9779800000000?text=Hello%20Dhangadhi%20Room%20Rental"
            target="_blank"
            rel="noreferrer"
            className="bg-slate-800 hover:bg-slate-700 text-emerald-400 font-extrabold px-5 py-3 rounded-xl text-xs flex items-center gap-2 border border-slate-700 shadow-sm transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Chat</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Contact Information Cards */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            {t('कार्यालय ठेगाना र विवरण', 'Office Information')}
          </h3>

          <div className="space-y-4 text-xs font-semibold text-slate-700">
            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">{t('कार्यालय स्थान', 'Office Location')}</span>
                <span className="text-slate-900 font-bold text-sm block">ट्राफिक चोक, धनगढी, कैलाली</span>
                <span className="text-slate-500">Traffic Chawk, Dhangadhi, Kailali, Sudurpashchim</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <PhoneCall className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">{t('फोन/सम्पर्क नम्बर', 'Contact Number')}</span>
                <a href="tel:+9779848400000" className="text-slate-900 font-extrabold text-sm hover:underline block">+977 9848400000</a>
                <span className="text-slate-500">24/7 Hotline Support</span>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">{t('कार्यालय समय', 'Office Hours')}</span>
                <span className="text-slate-900 font-bold block">आइतबार - शुक्रबार: बिहान ६:०० - बेलुका ८:००</span>
                <span className="text-slate-500">Sunday - Friday: 6:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            {t('हामीलाई सन्देश पठाउनुहोस्', 'Send Us a Message')}
          </h3>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-extrabold text-slate-900">{t('सन्देश प्राप्त भयो!', 'Message Received!')}</h4>
              <p className="text-xs text-slate-600">
                {t('हाम्रो टोलीले छिट्टै तपाईंलाई सम्पर्क गर्नेछ। धन्यवाद!', 'Our team will respond to your message shortly.')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-slate-700">{t('नाम', 'Full Name')} *</label>
                <input
                  type="text"
                  required
                  placeholder="Ram Bahadur"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-slate-700">{t('फोन नम्बर', 'Mobile Number')} *</label>
                <input
                  type="tel"
                  required
                  placeholder="9848123456"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-slate-700">{t('सन्देश', 'Your Message')} *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. I am looking for a 2BHK flat in Hasanpur..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span>{t('सन्देश पठाउनुहोस्', 'Send Message')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
