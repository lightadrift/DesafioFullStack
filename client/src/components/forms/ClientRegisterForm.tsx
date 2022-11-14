import style from "../../styles/forms/ClientRegisterForm.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../utils/API_URLS";

interface Props {
  Nome: string | null;
  Peso: string | null;
  Endereço: string | null;
  Latitude: string | null;
  Longitude: string | null;
}

type ClientProps = {
  test: boolean;
  setTest: (active: boolean) => void;
};

const ClientForms = ({ test, setTest }: ClientProps) => {
  const [feedback, setFeedback] = useState<string>("");
  const [Coords, setCoords] = useState({
    lat: "",
    lng: "",
  });
  const [FormsData, setData] = useState<Props>({
    Nome: null,
    Peso: null,
    Endereço: null,
    Latitude: null,
    Longitude: null,
  });

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { Nome, Peso, Endereço } = FormsData;
    if (Nome === null || Peso === null || Endereço === null) {
      setFeedback("Por favor preencher todos os campos");
      return;
    }
    const type = "Submit";
    await axios
      .post("http://localhost:5000/api/deliveries", {
        Nome,
        Peso,
        Endereço,
        type,
      })
      .then((response) => {
        if (response.data.status === false) {
          setFeedback(response.data.msg);
        } else {
          setTest(true);
        }
      })
      .catch((err) => {
        setFeedback(
          `Endereço inválido. Por favor colocar endereço no formato: "Rua" "Número" "Bairro" "Cidade" ...etc`
        );
      });

  
  };
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCoords((prevState) => ({
      ...prevState,
      lat: "",
      lng: "",
    }));
    if (feedback?.length! >= 0) {
      setFeedback("");
    }
    setData({
      ...FormsData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSearch(event: React.MouseEvent) {
    event.preventDefault();
    const { Nome, Peso, Endereço } = FormsData;
    const type = "Search";
    const { data } = await axios.post(URL, {
      Nome,
      Peso,
      Endereço,
      type,
    });
    if (data.status === false) {
      setCoords((prevState) => ({
        ...prevState,
        lat: "",
        lng: "",
      }));
    }
    if (data.status === true) {
      setCoords((prevState) => ({
        ...prevState,
        lat: data.lat,
        lng: data.lng,
      }));
    }
  }

  async function handleDelete(event: React.MouseEvent) {
    event.preventDefault();
    const data = await axios.delete(URL);
    if (data.status === 200) {
      setTest(true);
    }
  }

  return (
    <>
      <div className={style.container}>
        <div className={style.formulario_wrapper}>
          <form onSubmit={(e) => handleSubmit(e)} className={style.formulario}>
            <input
              className={style.input}
              type="text"
              name="Nome"
              placeholder="Nome do Cliente"
              onChange={(e) => handleChange(e)}
            />
            <input
              className={style.input}
              type="text"
              name="Peso"
              placeholder="Peso da Entrega"
              onChange={(e) => handleChange(e)}
            />
            <input
              className={style.input}
              type="text"
              name="Endereço"
              placeholder="Endereço do Cliente"
              onChange={(e) => handleChange(e)}
            />
            <div className={style.lat_log_wrapper}>
              <input
                className={style.input_lat_log}
                disabled={true}
                type="text"
                name="Latitude"
                placeholder="Latitude"
                value={Coords.lat}
                onChange={(e) =>
                  setCoords((prevState) => ({
                    ...prevState,
                    lat: e.target.value,
                  }))
                }
              />
              <input
                className={style.input_lat_log}
                disabled={true}
                type="text"
                name="Longitude"
                placeholder="Longitude"
                value={Coords.lng}
                onChange={(e) =>
                  setCoords((prevState) => ({
                    ...prevState,
                    lng: e.target.value,
                  }))
                }
              />
            </div>
            <div
              style={{
                display: "flex",
                position: "relative",
                placeContent: "center",
                minHeight: "2rem",
              }}
            >
              <h1
                style={{
                  fontSize: "1vw",
                  width: "100%",
                  padding: "1rem",
                }}
              >
                {feedback}
              </h1>
            </div>
            <div className={style.buttons_wrapper}>
              <div className={style.button_subwrapper}>
                <button
                  className={`${style.register_button} ${style.buttons}`}
                  type="submit"
                >
                  Salvar
                </button>
              </div>
              <div className={style.button_subwrapper}>
                <button
                  onClick={handleDelete}
                  className={`${style.delete_button} ${style.buttons}`}
                >
                  Deletar
                </button>
              </div>
              <div className={style.button_subwrapper}>
                <button
                  onClick={handleSearch}
                  className={`${style.search_button} ${style.buttons}`}
                >
                  Buscar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClientForms;
