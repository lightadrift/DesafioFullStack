import axios from "axios";


export async function getList() {
   const data = await axios.get("http://localhost:5000/api/deliveries")
   return data
  }