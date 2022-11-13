import ClientForms from "../components/forms/ClientRegisterForm";
import dynamic from "next/dynamic";
import style from "../styles/Home.module.css";
import { useEffect, useMemo, useState } from "react";
import { getList } from "../lib/GetDeliveries";
import Table2 from "../components/tabela/tabl2";
import Table1 from "../components/tabela/table";
const Map = dynamic(() => import("../components/map/DeliveryMap"), {
  ssr: false,
});

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Home() {
  const [data1, setData] = useState<any>([]);
  const [isChanged, setIsChanged] = useState(false);
  useEffect(() => {
    async function getData() {
      const { data } = await getList()!;
      setData([...data.deliveries]);
    }
    getData();
    return () => {
      setIsChanged(false);
    };
  }, [isChanged]);
  return (
    <div className={style.container}>
      <ClientForms test={isChanged} setTest={setIsChanged} />
      <div className={style.section_wrapper}>
        <Map data={data1!} />
        <Table1 data={data1!} />
      </div>
    </div>
  );
}