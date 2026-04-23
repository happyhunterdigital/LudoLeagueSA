export interface RegistrationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  region: 'Alexandra' | 'Soweto' | 'Mamelodi';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Apparel' | 'Equipment' | 'Accessories';
  tag: string;
  description: string;
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: any;
}
