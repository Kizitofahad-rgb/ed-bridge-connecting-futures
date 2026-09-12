// Payment Provider Adapter Architecture for Uganda Mobile Money (MTN / Airtel) and Stripe

export type PaymentMethod = "mtn_mobile_money" | "airtel_money" | "card_stripe" | "simulated_demo";

export interface PaymentInitiation {
  amount: number;
  currency: "UGX" | "USD";
  phoneNumber?: string;
  email?: string;
  requestId: string;
  donorUserId: string;
  privacy: "private" | "recognized" | "public";
}

export interface PaymentResult {
  transactionId: string;
  status: "pending" | "successful" | "failed";
  provider: PaymentMethod;
  reference: string;
  message: string;
  timestamp: string;
}

export interface PaymentAdapter {
  initiatePayment(initiation: PaymentInitiation): Promise<PaymentResult>;
  verifyPayment(transactionId: string): Promise<PaymentResult>;
}

// Mock/Demo Payment Adapter used during prototype phase
export class MockDemoPaymentAdapter implements PaymentAdapter {
  async initiatePayment(initiation: PaymentInitiation): Promise<PaymentResult> {
    const txId = `tx-demo-${Math.random().toString(36).slice(2, 9)}`;
    return {
      transactionId: txId,
      status: "successful",
      provider: "simulated_demo",
      reference: `REF-UGX-${initiation.amount}`,
      message: `Simulated support of UGX ${initiation.amount.toLocaleString()} recorded for prototype.`,
      timestamp: new Date().toISOString(),
    };
  }

  async verifyPayment(transactionId: string): Promise<PaymentResult> {
    return {
      transactionId,
      status: "successful",
      provider: "simulated_demo",
      reference: `VERIFIED-${transactionId}`,
      message: "Transaction verified successfully.",
      timestamp: new Date().toISOString(),
    };
  }
}

// Default payment gateway adapter instance
export const activePaymentAdapter: PaymentAdapter = new MockDemoPaymentAdapter();
