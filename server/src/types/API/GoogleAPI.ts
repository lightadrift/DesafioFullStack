import { Response } from "express";


export interface GoogleReqProps {
  address_components: [
    Numero: {
      long_name: string;
      short_name: string;
      types: string[];
    },
    Lograoduro: {
      long_name: string;
      short_name: string;
      types: string[];
    },
    Bairro: { long_name: string; short_name: string; types: string[] },
    Cidade: {
      long_name: string;
      short_name: string;
      types: string[];
    },
    Estado: { long_name: string; short_name: string; types: string[] },
    Pais: { long_name: string; short_name: string; types: string[] },
    CEP: { long_name: string; short_name: string; types: string[] }
  ];
  formatted_address: string;
  geometry: {
    bounds: { northeast: Array<Object>; southwest: Array<Object> };
    location: { lat: number; lng: number };
    location_type: string;
    viewport: { northeast: Array<Object>; southwest: Array<Object> };
  };
  place_id: string;
  types: string[];
} 


export type RequestType = GoogleReqProps | Response