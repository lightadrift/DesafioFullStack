import { GoogleReqProps } from "API/GoogleAPI";
import { Delivery } from "../models/DeliveriesSchema";

export const register = async (
  data: GoogleReqProps,
  Nome: string,
  Peso: string
) => {
  Delivery.create(
    {
      NomeDoCliente: Nome,
      Peso: Peso,
      Endereço: {
        Logradouro: data.address_components[1].short_name,
        Número: data.address_components[0].long_name,
        Bairro: data.address_components[2].long_name,
        Cidade: data.address_components[3].long_name,
        Estado: data.address_components[4].short_name,
        País: data.address_components[5].short_name,
        Geolocalização: {
          Latitude: data.geometry.location.lat,
          Longitude: data.geometry.location.lng,
        },
      },
    },
    (err) => {
      if (err) {
        console.log("deu ruim");
      }
    }
  );
};




export const deleteOne = async (id: string) => {
  return await Delivery.findByIdAndDelete(id)
}