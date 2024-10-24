import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// Importar os ícones padrão do Leaflet
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { IPosition, IPositionRef, TimeClassification } from "../../Types/Types";
import PinHome from "../../assets/PinHome.png";

interface ICardFind {
  position: IPosition[];
  positionRef?: IPositionRef;
}

export const CardFind = ({ position, positionRef }: ICardFind) => {
  const [selected, setSelected] =
    useState<TimeClassification>("Visto por último"); // Default selected option
  const [filteredPosition, setFilteredPosition] = useState<IPosition[]>([]); // Dados filtrados
  const [refresh, setRefresh] = useState<boolean>(false);
  const isSelected = (option: string) => {
    return selected === option
      ? "bg-purple-950 text-white"
      : "bg-lime-50 text-black";
  };

  // Inicializar refPosition apenas se ref for definido
  const refPosition: LatLngTuple | undefined = positionRef?.latitudeRef
    ? [positionRef.latitudeRef!, positionRef.longitudeRef!]
    : undefined;

  const urlLeaflet: string =
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const urlGoogle: string = "http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}";

  // Configurar os ícones padrão
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41], // Tamanho padrão do ícone do Leaflet
    iconAnchor: [12, 41], // Onde o ícone será ancorado (centro inferior)
    popupAnchor: [1, -34], // Onde o popup será ancorado em relação ao ícone
    shadowSize: [41, 41], // Tamanho da sombra do ícone
  });

  // Aplicar o ícone padrão globalmente (opcional)
  L.Marker.prototype.options.icon = DefaultIcon;

  const RedIcon = L.icon({
    iconUrl: PinHome, // Substitua pelo caminho real do ícone vermelho
    shadowUrl: iconShadow, // Substitua pelo caminho real da sombra (opcional)
    iconSize: [45, 41],
    iconAnchor: [17, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  useEffect(() => {
    handleSelect(selected);
  }, []);

  const handleSelect = (option: TimeClassification) => {
    setSelected(option);
    const filteredData = filterByTime(position, option);
    console.log(filteredData);
    setFilteredPosition(filteredData);
    setRefresh(!refresh);
  };

  const filterByTime = (
    positions: IPosition[],
    timeFilter: TimeClassification
  ): IPosition[] => {
    const now = new Date();

    let timeAgo: Date;
    switch (timeFilter) {
      case "Visto por último":
        timeAgo = new Date(now.getTime() - 5 * 60 * 1000);
        break;
      case "1h atrás":
        timeAgo = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case "1d atrás":
        timeAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "7d atrás":
        timeAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "Um mês atrás":
        timeAgo = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        return positions;
    }

    return positions.filter((item) => {
      console.log(item);
      const [day, month, yearTime] = item.date.split("/");
      const [year, time] = yearTime.split(" ");
      const isoDateString = `${year}-${month}-${day}T${time}`;

      const itemDate = new Date(isoDateString);
      console.log(itemDate + "  " + now);
      return itemDate >= timeAgo;
    });
  };

  return (
    <div>
      <div className="flex-row pb-1 gap-1 flex justify-end">
        <h3
          onClick={() => handleSelect("Visto por último")}
          className={`border-2 border-purple-400 rounded-md p-1 text-center font-semibold ${isSelected(
            "Visto por último"
          )}`}
        >
          Visto por último
        </h3>
        <h3
          onClick={() => handleSelect("1h atrás")}
          className={`border-2 border-purple-400 rounded-md p-1 text-center font-semibold ${isSelected(
            "1h atrás"
          )}`}
        >
          1h atrás
        </h3>
        <h3
          onClick={() => handleSelect("1d atrás")}
          className={`border-2 border-purple-400 rounded-md p-1 text-center font-semibold ${isSelected(
            "1d atrás"
          )}`}
        >
          1d atrás
        </h3>
        <h3
          onClick={() => handleSelect("7d atrás")}
          className={`border-2 border-purple-400 rounded-md p-1 text-center font-semibold ${isSelected(
            "7d atrás"
          )}`}
        >
          7d atrás
        </h3>
        <h3
          onClick={() => handleSelect("Um mês atrás")}
          className={`border-2 border-purple-400 rounded-md p-1 text-center font-semibold ${isSelected(
            "Um mês atrás"
          )}`}
        >
          1 mês atrás
        </h3>
      </div>
      <div className="relative">
        <div
          className={`absolute inset-0 w-full h-[400px] z-10 rounded-md bg-black bg-opacity-70 flex items-center justify-center ${
            refPosition ? "hidden" : ""
          }`}
        />
        <h2
          className={`absolute z-20 w-full h-[400px] text-red-500 flex items-center justify-center text-center px-4 ${
            refPosition ? "hidden" : ""
          }`}
        >
          Seu pet não tem localizador e/ou ponto de referência cadastrado
        </h2>
        <MapContainer
          center={refPosition || [0, 0]}
          zoom={20}
          minZoom={15}
          scrollWheelZoom={true}
          className="w-full h-[400px] z-10 rounded-md"
        >
          <TileLayer url={urlGoogle} />
          {filteredPosition.map((position: IPosition, index: number) => (
            <Marker
              key={index}
              position={[position.latitude, position.longitude]}
              icon={DefaultIcon}
            >
              <Popup>{position.date}</Popup>
            </Marker>
          ))}
          {refPosition ? (
            <Marker position={refPosition} icon={RedIcon}>
              <Popup>Home</Popup>
            </Marker>
          ) : (
            ""
          )}
        </MapContainer>
      </div>
    </div>
  );
};
