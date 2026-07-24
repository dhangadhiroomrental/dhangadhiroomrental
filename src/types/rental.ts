export type RoomType = 
  | 'single_room'
  | 'double_room'
  | 'flat_1bhk'
  | 'flat_2bhk'
  | 'flat_3bhk'
  | 'full_house'
  | 'commercial';

export type FloorLevel = 'ground' | '1st' | '2nd' | '3rd' | 'top';

export type ParkingOption = 'bike' | 'car_and_bike' | 'none' | 'car';

export type WaterFacility = '24h' | 'morning_evening' | 'tanker';

export type ElectricityType = 'dedicated_submeter' | 'shared' | 'included';

export type FurnishedStatus = 'furnished' | 'semi_furnished' | 'unfurnished';

export interface LocalizedText {
  np: string;
  en: string;
}

export interface Room {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  price: number; // NPR per month
  deposit: number; // NPR
  roomType: RoomType;
  floor: FloorLevel;
  sizeSqFt: number;
  bedrooms: number;
  bathrooms: number;
  kitchen: boolean;
  balcony: boolean;
  parking: ParkingOption;
  water: WaterFacility;
  electricity: ElectricityType;
  wifi: boolean;
  furnished: FurnishedStatus;
  availableDate: string;
  postedDate: string;
  featured: boolean;
  isBooked: boolean;
  generalLocation: string; // e.g. Hasanpur, Campus Road, Traffic Chawk
  photos: string[];
  videoUrl?: string;
  mapApprox: {
    lat: number;
    lng: number;
    radiusMeters: number;
  };
  
  // PROTECTED OWNER DATA (Only unlocked after payment request approval)
  ownerName: string;
  ownerPhone: string;
  exactAddress: string;
  exactMap: {
    lat: number;
    lng: number;
    directionsHint: string;
  };
}

export interface SearchFilterState {
  location: string;
  minPrice: number;
  maxPrice: number;
  roomType: string;
  floor: string;
  bedrooms: string;
  parking: string;
  wifi: boolean | null;
  kitchen: boolean | null;
  furnished: string;
}
