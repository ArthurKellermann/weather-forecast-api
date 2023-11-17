export interface ByLatLonInterface {
  lat: string;
  lon: string;
}

export interface ByCityNameInterface {
  city: string;
  state?: string;
  country?: string;
}

export interface ByPostalCodeInterface {
  postal_code: string;
  country?: string;
}

export interface ByCityIdInterface {
  city_id: string;
}

export interface ByCityIdListInterface {
  cities: string[];
}
