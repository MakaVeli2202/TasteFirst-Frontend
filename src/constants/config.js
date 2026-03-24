export const API_CONFIG = {
    BASE_URL : import.meta.VITE_API_URL,
    TIMEOUT  : import.meta.VITE_API_TIMEOUT
}

export const APP_CONFIG ={
    APP_NAME : import.meta.VITE_APP_NAME,
    APP_VERSION : import.meta.VITE_APP_VERSION,
    SUPPORT_EMAIL : 'support@Tastefirst.qa',
    SUPPORT_NUMBER : '000000000000000'
}


export const DELIVERY_AREAS = {
  AL_SADD: { label: 'Al Sadd', fee: 5 },
  THE_PEARL: { label: 'The Pearl', fee: 7 },
  WEST_BAY: { label: 'West Bay', fee: 8 },
  LUSAIL: { label: 'Lusail', fee: 10 },
  OTHER: { label: 'Other', fee: 10 },
};

export const PAYMENT_METHODS = {
  CASH: { id: 0, label: 'Cash on Delivery', value: 'CASH_ON_DELIVERY' },
  BANK_TRANSFER: { id: 1, label: 'Bank Transfer', value: 'BANK_TRANSFER' },
  CARD: { id: 2, label: 'Credit Card', value: 'CREDIT_CARD' },
};


export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?974?\d{8}$/,
  MIN_PASSWORD_LENGTH: 8,
};


export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};