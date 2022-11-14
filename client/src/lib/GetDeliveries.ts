import axios from "axios";
import { URL } from "../utils/API_URLS";

export async function getList() {
   const data = await axios.get(URL)
   return data
  }