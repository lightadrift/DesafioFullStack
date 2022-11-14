import axios from "axios";
const URL = process.env.API_URL || 'https://server-production-5420.up.railway.app/api/deliveries'

export async function getList() {
   const data = await axios.get(URL)
   return data
  }