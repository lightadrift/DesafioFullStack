import style from "../../styles/infos/Infos.module.css";

type Props = {
  ticketMedio: string;
};

const Results = (ticketMedio: string) => { 
  if(isNaN(parseFloat(ticketMedio))) {
    return '0'
  } else {
    return ticketMedio
  }

}



function Infos({ data }: any) {
  const sum = data.reduce((accumulator: any, object: any) => {
    return accumulator + object.Peso;
  }, 0);

  const TicketMedio = String(sum / data.length).substring(0,6);

  return (
    <>
      <div className={style.infos}>
        <div className={style.wrapper}>
          <h1>Total de Clienter: {data.length};</h1>
          <h1>Peso Total: {sum}kg;</h1>
          <h1>Ticket Médio*: {Results(TicketMedio)} </h1>
        </div>
      </div>
    </>
  );
}

export default Infos;
