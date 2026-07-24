import React, { createContext, useContext, useState, useEffect } from 'react';
import { Room, SearchFilterState } from '../types/rental';
import { PaymentRequest } from '../types/payment';
import { INITIAL_ROOMS, MOCK_INITIAL_PAYMENT_REQUESTS } from '../data/mockRooms';

export type PageName = 
  | 'home' 
  | 'search' 
  | 'details' 
  | 'payment' 
  | 'customer_dashboard' 
  | 'admin_dashboard' 
  | 'contact' 
  | 'about'
  | 'list_property';

interface RentalContextType {
  rooms: Room[];
  paymentRequests: PaymentRequest[];
  userToken: string;
  activePage: PageName;
  selectedRoomId: string | null;
  selectedRoom: Room | null;
  searchFilter: SearchFilterState;
  setSearchFilter: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  resetFilters: () => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  
  // Navigation
  navigateTo: (page: PageName, roomId?: string) => void;
  
  // Room Management (Admin)
  addRoom: (roomData: Omit<Room, 'id' | 'postedDate'>) => void;
  editRoom: (id: string, roomData: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  toggleBookedStatus: (id: string) => void;
  toggleFeatured: (id: string) => void;
  
  // Payment Requests (Customer & Admin)
  submitPaymentRequest: (
    data: Omit<PaymentRequest, 'id' | 'submittedAt' | 'status' | 'userToken'>
  ) => PaymentRequest;
  approvePaymentRequest: (id: string, note?: string) => void;
  rejectPaymentRequest: (id: string, note?: string) => void;
  
  // Unlock check
  isRoomUnlockedForUser: (roomId: string) => boolean;
  
  // Quick stats
  stats: {
    totalRooms: number;
    availableRooms: number;
    bookedRooms: number;
    totalRequests: number;
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
  };
}

const DEFAULT_FILTERS: SearchFilterState = {
  location: 'all',
  minPrice: 0,
  maxPrice: 50000,
  roomType: 'all',
  floor: 'all',
  bedrooms: 'all',
  parking: 'all',
  wifi: null,
  kitchen: null,
  furnished: 'all'
};

const RentalContext = createContext<RentalContextType | undefined>(undefined);

export const RentalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Rooms state
  const [rooms, setRooms] = useState<Room[]>(() => {
    const saved = localStorage.getItem('dhn_rental_rooms');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse rooms', e);
      }
    }
    return INITIAL_ROOMS;
  });

  // Save rooms to localStorage
  useEffect(() => {
    localStorage.setItem('dhn_rental_rooms', JSON.stringify(rooms));
  }, [rooms]);

  // 2. Payment Requests state
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>(() => {
    const saved = localStorage.getItem('dhn_rental_requests');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse payment requests', e);
      }
    }
    return MOCK_INITIAL_PAYMENT_REQUESTS;
  });

  // Save requests to localStorage
  useEffect(() => {
    localStorage.setItem('dhn_rental_requests', JSON.stringify(paymentRequests));
  }, [paymentRequests]);

  // 3. Persistent User Session Token
  const [userToken] = useState<string>(() => {
    let saved = localStorage.getItem('dhn_user_token');
    if (!saved) {
      saved = 'usr_' + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem('dhn_user_token', saved);
    }
    return saved;
  });

  // 4. Admin state
  const [isAdmin, setIsAdminState] = useState<boolean>(() => {
    return localStorage.getItem('dhn_is_admin') === 'true';
  });

  const setIsAdmin = (val: boolean) => {
    setIsAdminState(val);
    localStorage.setItem('dhn_is_admin', val ? 'true' : 'false');
  };

  // 5. Navigation & Selection
  const [activePage, setActivePage] = useState<PageName>('home');
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('room-dhn-101');
  const [searchFilter, setSearchFilter] = useState<SearchFilterState>(DEFAULT_FILTERS);

  const navigateTo = (page: PageName, roomId?: string) => {
    if (roomId) {
      setSelectedRoomId(roomId);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchFilter(DEFAULT_FILTERS);
  };

  // Selected room calculation
  const selectedRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0] || null;

  // 6. Check if room contact/address is unlocked for the current user
  const isRoomUnlockedForUser = (roomId: string): boolean => {
    if (isAdmin) return true;
    
    // Also consider default demo user token to unlock room-dhn-101 as sample approved request
    return paymentRequests.some(
      req => 
        req.roomId === roomId && 
        req.status === 'approved' && 
        (req.userToken === userToken || req.userToken === 'default_user_token_demo')
    );
  };

  // 7. Actions: Admin Room Management
  const addRoom = (roomData: Omit<Room, 'id' | 'postedDate'>) => {
    const newRoom: Room = {
      ...roomData,
      id: 'room-dhn-' + Math.floor(100 + Math.random() * 900),
      postedDate: new Date().toISOString().split('T')[0]
    };
    setRooms(prev => [newRoom, ...prev]);
  };

  const editRoom = (id: string, updated: Partial<Room>) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, ...updated } : r));
  };

  const deleteRoom = (id: string) => {
    setRooms(prev => prev.filter(r => r.id !== id));
  };

  const toggleBookedStatus = (id: string) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, isBooked: !r.isBooked } : r));
  };

  const toggleFeatured = (id: string) => {
    setRooms(prev => prev.map(r => r.id === id ? { ...r, featured: !r.featured } : r));
  };

  // 8. Actions: Payment Request
  const submitPaymentRequest = (
    data: Omit<PaymentRequest, 'id' | 'submittedAt' | 'status' | 'userToken'>
  ): PaymentRequest => {
    const newReq: PaymentRequest = {
      ...data,
      id: 'req-' + Math.floor(1000 + Math.random() * 9000),
      submittedAt: new Date().toISOString(),
      status: 'pending',
      userToken: userToken
    };
    setPaymentRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  const approvePaymentRequest = (id: string, note?: string) => {
    setPaymentRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: 'approved',
          adminNote: note || 'Approved by Admin.'
        };
      }
      return req;
    }));
  };

  const rejectPaymentRequest = (id: string, note?: string) => {
    setPaymentRequests(prev => prev.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: 'rejected',
          adminNote: note || 'Rejected: Payment verification failed.'
        };
      }
      return req;
    }));
  };

  // 9. Statistics
  const stats = {
    totalRooms: rooms.length,
    availableRooms: rooms.filter(r => !r.isBooked).length,
    bookedRooms: rooms.filter(r => r.isBooked).length,
    totalRequests: paymentRequests.length,
    pendingRequests: paymentRequests.filter(r => r.status === 'pending').length,
    approvedRequests: paymentRequests.filter(r => r.status === 'approved').length,
    rejectedRequests: paymentRequests.filter(r => r.status === 'rejected').length
  };

  return (
    <RentalContext.Provider
      value={{
        rooms,
        paymentRequests,
        userToken,
        activePage,
        selectedRoomId,
        selectedRoom,
        searchFilter,
        setSearchFilter,
        resetFilters,
        isAdmin,
        setIsAdmin,
        navigateTo,
        addRoom,
        editRoom,
        deleteRoom,
        toggleBookedStatus,
        toggleFeatured,
        submitPaymentRequest,
        approvePaymentRequest,
        rejectPaymentRequest,
        isRoomUnlockedForUser,
        stats
      }}
    >
      {children}
    </RentalContext.Provider>
  );
};

export const useRental = () => {
  const context = useContext(RentalContext);
  if (!context) {
    throw new Error('useRental must be used within a RentalProvider');
  }
  return context;
};
