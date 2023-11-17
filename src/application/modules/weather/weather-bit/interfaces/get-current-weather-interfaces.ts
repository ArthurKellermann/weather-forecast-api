export interface ByLatLon {
  lat: number;
  lon: number;
}

export interface ByCityName {
  ciry: string;
  state?: string;
  country?: string;
}

export interface ByPostalCode {
  postal_code: number;
  country?: string;
}

export interface ByCityId {
  city_id: number;
}

export interface ByCityIdList {
  cities: number[];
}
