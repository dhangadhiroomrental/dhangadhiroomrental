export type PaymentMethod = 'esewa' | 'khalti';

export type PaymentStatus = 'pending' | 'approved' | 'rejected';

export interface PaymentRequest {
  id: string;
  fullName: string;
  mobileNumber: string;
  roomId: string;
  roomTitle: string;
  roomPrice: number;
  paymentMethod: PaymentMethod;
  amountPaid: number;
  transactionRef?: string;
  screenshotUrl?: string; // base64 or photo URL
  submittedAt: string;
  status: PaymentStatus;
  adminNote?: string;
  userToken: string; // Session / device persistent identifier
}
