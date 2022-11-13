// const Data = ["Nome", "Rua", "Cidade", "País", "Peso", "Lat", "Lng"];

// type Person = {
//   Nome: string;
//   Rua: string;
//   Cidade: string;
//   País: string;
//   Peso: number;
//   Lat: number;
//   Lng: number;
// };
// const defaultData: Person[] = [
//   {
//     Nome: "tanner",
//     Rua: "aaaa",
//     Cidade: "Friburgo",
//     País: "Brasil",
//     Peso: 50,
//     Lat: -24.4345,
//     Lng: -0.049,
//   },
//   {
//     Nome: "tanner",
//     Rua: "aaaa",
//     Cidade: "Friburgo",
//     País: "Brasil",
//     Peso: 50,
//     Lat: -24.4345,
//     Lng: -0.049,
//   },
//   {
//     Nome: "tanner",
//     Rua: "aaaa",
//     Cidade: "Faaa",
//     País: "Brasil",
//     Peso: 50,
//     Lat: -24.4345,
//     Lng: -0.049,
//   },
//   {
//     Nome: "tanner",
//     Rua: "aaaa",
//     Cidade: "Faaa",
//     País: "Brasil",
//     Peso: 50,
//     Lat: -24.4345,
//     Lng: -0.049,
//   },
// ];
// function Table2({ data }: any) {
//   return (
//     <>
//       <table>
//         <thead>
//           <tr>
//             {Data.map((title, index) => (
//               <th key={index}>{title}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data?.map((delivery, index) => (
//             <tr key={index}>
//               <td>{delivery.NomeDoCliente}</td>
//               <td>{delivery.Endereço.Logradouro}</td>
//               <td>{delivery.Endereço.Cidade}</td>
//               <td>{delivery.Endereço.País}</td>
//               <td>{delivery.Peso}</td>
//               <td>{delivery.Endereço.Logradouro}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </>
//   );
// }

// export default Table2;
