
export class Order {
  id?: string;
  rate: {
      origin: Origin;
      destination:  Destination;
      items: Items;
      currency: string;
      locale: string;
    }
  createdAt?: Date;
  updatedAt?: Date;
}

export class Origin {
  id?: string;
  country: string;
  postal_code: string;
  province: string;
  city: string;
  name: string;
  address1: string;
  address2: string;
  address3: string;
  phone: string;
  fax?: string;
  email?: string;
  address_type?: string;
  company_name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Destination {
  id?: string;
  country: string;
  postal_code: string;
  province: string;
  city: string;
  name: string;
  address1: string;
  address2?: string;
  address3?: string;
  phone?: string;
  fax?: string;
  email?: string;
  address_type?: string;
  company_name?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Items {
  id?: string;
  name: string;
  sku?: string;
  quantity: number;
  grams: number;
  price: number;
  vendor: string;
  requires_shipping: boolean;
  taxable: boolean;
  fulfillment_service: string;
  properties: string;
  product_id: string;
  variant_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}
