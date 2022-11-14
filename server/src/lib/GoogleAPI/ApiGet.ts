import axios from "axios";
import { GoogleReqProps } from "API/GoogleAPI";

function ReplaceWhiteSpaces(endereço: string) {
  return endereço.replace(/\s/g, "%20");
}

function containNumber(str: string) {
  return /\d/.test(str);
}

export async function GoogleGet(Endereço: string) {
  if (containNumber(Endereço)) {
    const EndereçoFormatado = ReplaceWhiteSpaces(Endereço);
    const data = (await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${EndereçoFormatado}&key=AIzaSyAPDILqiEN3jHmdgjHh8kh9jBBS-3KNPgk`
      )
      .then((response) => response.data.results[0])
      .catch((err) => {
        return console.log(err);
      })) as GoogleReqProps;

    return data;
  } else {
    return undefined;
  }
}
