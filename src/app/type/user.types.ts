export interface User {
  users: UserData[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: string;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  domain: string;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
}

export interface Hair {
  color: string;
  type: string;
}

export interface Address {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  address: CompanyAddress;
  department: string;
  name: string;
  title: string;
}

export interface CompanyAddress {
  address: string;
  city?: string;
  coordinates: CompanyCoordinates;
  postalCode: string;
  state: string;
}

export interface CompanyCoordinates {
  lat: number;
  lng: number;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}
