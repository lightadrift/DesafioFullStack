import { NextFunction, Request, response, Response } from "express";
import { Delivery } from "../models/DeliveriesSchema";
import { GoogleGet } from "../lib/GoogleAPI/ApiGet";
import { register } from "../lib/CrudOperations";
import { GoogleReqProps } from "types/API/GoogleAPI";
// const key = "AIzaSyAPDILqiEN3jHmdgjHh8kh9jBBS-3KNPgk";

interface ReqProps {
  Nome: string;
  Peso: string;
  Endereço: string;
  type: string;
}

export const Deliveries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const method = req.method;
    const { Nome, Peso, Endereço, type } = req.body as ReqProps;
    switch (method) {
      case "GET":
        const data = await Delivery.find({});
        res.json({ deliveries: data, status: true });
        break;
      case "POST":
        if (type === "Submit") {
          console.log(req.body);
          const EndereçoFormatado = await GoogleGet(Endereço);
          console.log(EndereçoFormatado);
          if (EndereçoFormatado != undefined) {
            await register(EndereçoFormatado, Nome, Peso);
            res.json({ msg: "Cliente Cadastrado", status: true });
          } else {
            return res.json({
              msg: "Por favor especificar um número",
              status: false,
            });
          }
        } else {
          console.log(req.body);
          const EndereçoFormatado = await GoogleGet(Endereço);
          if (EndereçoFormatado != undefined) {
            return res.json({
              lat: EndereçoFormatado?.geometry.location.lat,
              lng: EndereçoFormatado?.geometry.location.lng,
              status: true,
            });
          } else {
            return res.json({
              msg: "Por favor especificar um número",
              status: false,
            });
          }
        }
        break;
      case "DELETE":
        console.log("a");
        await Delivery.deleteMany({});
        res.json({ status: 200 });
        break;
      default:
        console.log("nenhum metodo reconhecido");
    }
  } catch (ex) {
    next(ex);
  }
};
