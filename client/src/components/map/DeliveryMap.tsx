import { TileLayer, Popup, Marker } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import style from "../../styles/map/MapStyles.module.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

type DataProps = {
  data: Array<any>;
};

function DeliveryMap({ data }: DataProps) {
  // [e.Endereço.Geolocalização.Latitude[0], e.Endereço.Geolocalização.Longitude[1]]

  return (
    <>
      <div className={style.container}>
        <div
          // style={{
          //   width: "60vw",
          //   height: "60vh",
          //   borderStyle: "solid",
          //   borderWidth: "0.15rem",
          //   borderColor: "red",
          // }}
          className={style.map_wrapper}
        >
          <MapContainer
            style={{ width: "100%", height: "100%" }}
            center={[-22.2854653, -42.523701]}
            zoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              noWrap
            />
            {data?.map((e, index) => (
              <Marker
                position={[
                  e.Endereço.Geolocalização.Latitude[0],
                  e.Endereço.Geolocalização.Longitude[0],
                ]}
                key={index}
              >
                <Popup>
                  <span className={style.popup_span}>
                    {e.NomeDoCliente}
                    <br />
                    {e.Peso}
                  </span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </>
  );
}

export default DeliveryMap;
