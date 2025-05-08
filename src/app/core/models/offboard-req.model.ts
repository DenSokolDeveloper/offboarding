export interface AddressModel {
  streetLine1: string;
  country: string;
  postalCode: string;
  receiver: string;
  city: string;
}

export interface OffboardReqModel {
  address: AddressModel;
  notes: string;
  phone: string;
  email: string;
}
