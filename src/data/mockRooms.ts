import { Room } from '../types/rental';

export const DHANGADHI_LOCATIONS = [
  'Hasanpur',
  'Campus Road',
  'Traffic Chawk',
  'Uttarbehedi',
  'Boradi',
  'Rato Pul',
  'LN Chawk',
  'Buspark Area',
  'Shivapuri Area',
  'Chautara',
  'Mukti Chawk'
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-dhn-101',
    title: {
      np: 'हसनपुरमा २ कोठाको आधुनिक फ्ल्याट (२४ घण्टा पानी र पार्किङ)',
      en: 'Modern 2-Room Flat in Hasanpur (24h Water & Parking)'
    },
    description: {
      np: 'हसनपुर मुख्य सडक नजिकै पहिलो तल्लामा रहेको २ ठूला कोठा, भान्सा र बाथरुम भएको शान्त र सफा फ्ल्याट। परिवार वा विद्यार्थीहरूको लागि उपयुक्त।',
      en: 'Quiet and clean 1st-floor flat with 2 spacious rooms, kitchen, and private bathroom near Hasanpur main road. Ideal for small families or students.'
    },
    price: 12500,
    deposit: 12500,
    roomType: 'flat_2bhk',
    floor: '1st',
    sizeSqFt: 480,
    bedrooms: 2,
    bathrooms: 1,
    kitchen: true,
    balcony: true,
    parking: 'car_and_bike',
    water: '24h',
    electricity: 'dedicated_submeter',
    wifi: true,
    furnished: 'semi_furnished',
    availableDate: '2026-08-01',
    postedDate: '2026-07-20',
    featured: true,
    isBooked: false,
    generalLocation: 'Hasanpur',
    photos: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    mapApprox: {
      lat: 28.6853,
      lng: 80.5982,
      radiusMeters: 400
    },
    ownerName: 'Ram Bahadur Chand',
    ownerPhone: '9848412345',
    exactAddress: 'Hasanpur Ward No. 5, Near Kailali Multiple Campus Gate 2, House No. 124',
    exactMap: {
      lat: 28.6861,
      lng: 80.5991,
      directionsHint: 'Take the right alley opposite Kailali Campus Gate 2, second white house on the left.'
    }
  },
  {
    id: 'room-dhn-102',
    title: {
      np: 'क्याम्पस रोडमा प्राइभेट बाथरुमसहित सिङ्गल कोठा',
      en: 'Single Room with Attached Bathroom near Campus Road'
    },
    description: {
      np: 'कैलाली बहुमुखी क्याम्पस नजिकै रहेको सफा सिंगल कोठा। २४ घण्टा पानी, वाइफाइ र सुरक्षित मोटरसाइकल पार्किङ उपलब्ध छ। विद्यार्थीहरूको लागि उत्तम छनौट।',
      en: 'Clean single room with attached bathroom near Kailali Multiple Campus. Includes 24h water, WiFi, and secure bike parking. Perfect for students.'
    },
    price: 6500,
    deposit: 6500,
    roomType: 'single_room',
    floor: 'ground',
    sizeSqFt: 220,
    bedrooms: 1,
    bathrooms: 1,
    kitchen: false,
    balcony: false,
    parking: 'bike',
    water: '24h',
    electricity: 'dedicated_submeter',
    wifi: true,
    furnished: 'unfurnished',
    availableDate: '2026-07-25',
    postedDate: '2026-07-21',
    featured: true,
    isBooked: false,
    generalLocation: 'Campus Road',
    photos: [
      'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: '',
    mapApprox: {
      lat: 28.6890,
      lng: 80.6015,
      radiusMeters: 350
    },
    ownerName: 'Sita Devi Joshi',
    ownerPhone: '9868723456',
    exactAddress: 'Campus Road Ward No. 4, Behind SPA College, Green Gate House',
    exactMap: {
      lat: 28.6898,
      lng: 80.6022,
      directionsHint: 'Directly behind SPA College, green metal gate.'
    }
  },
  {
    id: 'room-dhn-103',
    title: {
      np: 'ट्राफिक चोक नजिकै ३ बीएचके लक्जरी फ्ल्याट (व्यापारिक र आवासीय)',
      en: '3 BHK Premium Flat near Traffic Chawk'
    },
    description: {
      np: 'धनगढीको मुटु मानिने ट्राफिक चोक नजिकै दोस्रो तल्लामा ३ सुत्ने कोठा, ठूलो हल, २ वटा बाथरुम र किचन। कार पार्किङ र लिफ्ट सुविधा सहित।',
      en: '3 BHK flat on the 2nd floor near Traffic Chawk, Dhangadhi center. Features 3 bedrooms, spacious living hall, 2 bathrooms, kitchen, car parking.'
    },
    price: 22000,
    deposit: 30000,
    roomType: 'flat_3bhk',
    floor: '2nd',
    sizeSqFt: 1100,
    bedrooms: 3,
    bathrooms: 2,
    kitchen: true,
    balcony: true,
    parking: 'car_and_bike',
    water: '24h',
    electricity: 'dedicated_submeter',
    wifi: true,
    furnished: 'furnished',
    availableDate: '2026-08-05',
    postedDate: '2026-07-22',
    featured: true,
    isBooked: false,
    generalLocation: 'Traffic Chawk',
    photos: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    mapApprox: {
      lat: 28.6812,
      lng: 80.5891,
      radiusMeters: 300
    },
    ownerName: 'Ganesh Raj Shrestha',
    ownerPhone: '9858422110',
    exactAddress: 'Traffic Chawk Main Highway Road, Opposite Prabhu Bank, Commercial Complex 3rd Floor',
    exactMap: {
      lat: 28.6818,
      lng: 80.5899,
      directionsHint: 'Opposite Prabhu Bank building, entry from side staircases.'
    }
  },
  {
    id: 'room-dhn-104',
    title: {
      np: 'उत्तरबेहेडीमा १ बीएचके पूर्ण सुसज्जित (Furnished) फ्ल्याट',
      en: 'Furnished 1 BHK Apartment in Uttarbehedi'
    },
    description: {
      np: 'सोफा, बेड, दराज, टेलिभिजन र किचन सामानहरू सहितको १ बीएचके फ्ल्याट। तुरुन्त सर्न मिल्ने।',
      en: 'Fully furnished 1 BHK apartment with sofa set, bed, wardrobe, TV and ready kitchen. Ready to move in immediately.'
    },
    price: 11000,
    deposit: 11000,
    roomType: 'flat_1bhk',
    floor: '1st',
    sizeSqFt: 380,
    bedrooms: 1,
    bathrooms: 1,
    kitchen: true,
    balcony: true,
    parking: 'bike',
    water: '24h',
    electricity: 'dedicated_submeter',
    wifi: true,
    furnished: 'furnished',
    availableDate: '2026-07-24',
    postedDate: '2026-07-19',
    featured: false,
    isBooked: false,
    generalLocation: 'Uttarbehedi',
    photos: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: '',
    mapApprox: {
      lat: 28.6920,
      lng: 80.5910,
      radiusMeters: 450
    },
    ownerName: 'Nirmala Thapa',
    ownerPhone: '9812345678',
    exactAddress: 'Uttarbehedi Ward 3, Near Health Post Lane, Yellow House',
    exactMap: {
      lat: 28.6925,
      lng: 80.5918,
      directionsHint: '50m inside Health Post lane, yellow 2-storey house.'
    }
  },
  {
    id: 'room-dhn-105',
    title: {
      np: 'बोराडीमा १ कोठा र छुट्टै भान्सा (Kitchen)',
      en: '1 Bedroom with Separate Kitchen in Boradi'
    },
    description: {
      np: 'बोराडी क्षेत्रमा ग्राउण्ड फ्लोरमा १ सुत्ने कोठा, भान्सा कोठा र बाथरुम। शान्त वातावरण, प्रसस्त घाम लाग्ने।',
      en: 'Ground floor unit in Boradi with 1 bedroom, separate kitchen, and bathroom. Peaceful location with good sunlight.'
    },
    price: 7500,
    deposit: 7500,
    roomType: 'double_room',
    floor: 'ground',
    sizeSqFt: 300,
    bedrooms: 1,
    bathrooms: 1,
    kitchen: true,
    balcony: false,
    parking: 'car_and_bike',
    water: 'morning_evening',
    electricity: 'dedicated_submeter',
    wifi: true,
    furnished: 'unfurnished',
    availableDate: '2026-08-01',
    postedDate: '2026-07-18',
    featured: false,
    isBooked: false,
    generalLocation: 'Boradi',
    photos: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: '',
    mapApprox: {
      lat: 28.6750,
      lng: 80.6050,
      radiusMeters: 500
    },
    ownerName: 'Dharma Raj Bhatta',
    ownerPhone: '9848899000',
    exactAddress: 'Boradi Army Camp Road, House No. 89',
    exactMap: {
      lat: 28.6758,
      lng: 80.6055,
      directionsHint: 'Opposite Army Camp north wall, blue building.'
    }
  },
  {
    id: 'room-dhn-106',
    title: {
      np: 'रातो पुल नजिकै २ बीएचके सस्तो फ्ल्याट',
      en: 'Affordable 2 BHK Flat near Rato Pul'
    },
    description: {
      np: 'रातो पुल नजिकै मुख्य बाटोबाट २ मिनेटमा पुगिने २ कोठा, किचन र बाथरुम। बाइक पार्किङ, धाराको पानी सुविधा।',
      en: '2 BHK flat 2 minutes walk from Rato Pul main road. Features 2 rooms, kitchen, and bathroom with bike parking.'
    },
    price: 9500,
    deposit: 9500,
    roomType: 'flat_2bhk',
    floor: '1st',
    sizeSqFt: 420,
    bedrooms: 2,
    bathrooms: 1,
    kitchen: true,
    balcony: true,
    parking: 'bike',
    water: '24h',
    electricity: 'dedicated_submeter',
    wifi: false,
    furnished: 'unfurnished',
    availableDate: '2026-07-22',
    postedDate: '2026-07-15',
    featured: false,
    isBooked: false,
    generalLocation: 'Rato Pul',
    photos: [
      'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: '',
    mapApprox: {
      lat: 28.6830,
      lng: 80.6120,
      radiusMeters: 400
    },
    ownerName: 'Prem Bahadur Singh',
    ownerPhone: '9868112233',
    exactAddress: 'Rato Pul Chowk, East Side Lane, House No. 12',
    exactMap: {
      lat: 28.6836,
      lng: 80.6128,
      directionsHint: 'Turn east from Rato Pul bridge, third house on right.'
    }
  },
  {
    id: 'room-dhn-107',
    title: {
      np: 'एलएन चोकमा व्यापारिक शटर/अफिस स्पेस',
      en: 'Commercial Shutter / Office Space in LN Chawk'
    },
    description: {
      np: 'धनगढी LN चोक नजिकै व्यापारिक प्रयोजन, परामर्श केन्द्र वा अफिसको लागि उपयुक्त ग्राउन्ड फ्लोर शटर/स्पेस।',
      en: 'Commercial shutter / office space on ground floor near LN Chawk, Dhangadhi. Perfect for shops, consultancies or offices.'
    },
    price: 18000,
    deposit: 25000,
    roomType: 'commercial',
    floor: 'ground',
    sizeSqFt: 350,
    bedrooms: 0,
    bathrooms: 1,
    kitchen: false,
    balcony: false,
    parking: 'car_and_bike',
    water: '24h',
    electricity: 'dedicated_submeter',
    wifi: true,
    furnished: 'unfurnished',
    availableDate: '2026-08-01',
    postedDate: '2026-07-22',
    featured: true,
    isBooked: false,
    generalLocation: 'LN Chawk',
    photos: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: '',
    mapApprox: {
      lat: 28.6800,
      lng: 80.5850,
      radiusMeters: 300
    },
    ownerName: 'Janak Raj Pant',
    ownerPhone: '9848001122',
    exactAddress: 'LN Chawk Main Road, Beside Laxmi Sunrise Bank',
    exactMap: {
      lat: 28.6805,
      lng: 80.5858,
      directionsHint: 'Beside Laxmi Sunrise Bank branch entrance.'
    }
  },
  {
    id: 'room-dhn-108',
    title: {
      np: 'शिवपुरीमा १ तल्ले सिङ्गल घर (Full House Rental)',
      en: '1-Storey Independent Full House in Shivapuri'
    },
    description: {
      np: 'शिवपुरी क्षेत्रमा १ तल्ले पुरै घर भाडामा। ३ सुत्ने कोठा, १ ठूलो हल, किचन, २ बाथरुम, गाडी पार्किङ र सानो बगैंचा सहित।',
      en: 'Independent full house rental in Shivapuri. Features 3 bedrooms, 1 big hall, kitchen, 2 bathrooms, private garden and car garage.'
    },
    price: 25000,
    deposit: 25000,
    roomType: 'full_house',
    floor: 'ground',
    sizeSqFt: 1400,
    bedrooms: 3,
    bathrooms: 2,
    kitchen: true,
    balcony: true,
    parking: 'car_and_bike',
    water: '24h',
    electricity: 'dedicated_submeter',
    wifi: true,
    furnished: 'semi_furnished',
    availableDate: '2026-08-10',
    postedDate: '2026-07-23',
    featured: true,
    isBooked: false,
    generalLocation: 'Shivapuri Area',
    photos: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80'
    ],
    videoUrl: '',
    mapApprox: {
      lat: 28.6870,
      lng: 80.5780,
      radiusMeters: 600
    },
    ownerName: 'Bhagawati Rawal',
    ownerPhone: '9858009988',
    exactAddress: 'Shivapuri Ward 2, Near Shivapuri Dham Temple, House No. 45',
    exactMap: {
      lat: 28.6878,
      lng: 80.5788,
      directionsHint: '100m north of Shivapuri Dham entrance arch.'
    }
  }
];

export const MOCK_INITIAL_PAYMENT_REQUESTS = [
  {
    id: 'req-1001',
    fullName: 'Kamal Bahadur Bohara',
    mobileNumber: '9848123999',
    roomId: 'room-dhn-101',
    roomTitle: 'हसनपुरमा २ कोठाको आधुनिक फ्ल्याट',
    roomPrice: 12500,
    paymentMethod: 'esewa' as const,
    amountPaid: 100,
    transactionRef: 'ESW-98231456',
    submittedAt: '2026-07-23T05:15:00.000Z',
    status: 'approved' as const,
    adminNote: 'Verified payment via eSewa.',
    userToken: 'default_user_token_demo'
  },
  {
    id: 'req-1002',
    fullName: 'Sita Sharma',
    mobileNumber: '9812398765',
    roomId: 'room-dhn-102',
    roomTitle: 'क्याम्पस रोडमा प्राइभेट बाथरुमसहित सिङ्गल कोठा',
    roomPrice: 6500,
    paymentMethod: 'khalti' as const,
    amountPaid: 100,
    transactionRef: 'KHL-44219087',
    submittedAt: '2026-07-23T06:00:00.000Z',
    status: 'pending' as const,
    adminNote: '',
    userToken: 'demo_user_token_2'
  }
];
