import mongoose from "mongoose";
const { Schema } = mongoose;

const DeliverySchema = new Schema({
  NomeDoCliente: { type: String, required: true },
  Peso: Number,
  Endereço: {
    Logradouro: String,
    Número: String,
    Bairro: String,
    Complemento: String,
    Cidade: String,
    Estado: String,
    País: String,
    Geolocalização: {
      Latitude: [Number],
      Longitude: [Number],
    },
  },
});

export const Delivery = mongoose.model("Deliveries", DeliverySchema);
