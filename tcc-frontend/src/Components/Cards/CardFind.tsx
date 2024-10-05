import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
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
  const [selected, setSelected] = useState<TimeClassification>("7days ago"); // Default selected option
  const [filteredPosition, setFilteredPosition] = useState<IPosition[]>([]); // Dados filtrados

  const isSelected = (option: string) => {
    return selected === option
      ? "bg-amber-900 text-white"
      : "bg-lime-50 text-black";
  };

  // Inicializar refPosition apenas se ref for definido
  const refPosition: LatLngTuple | undefined = positionRef
    ? [positionRef.latitudeRef, positionRef.longitudeRef]
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

  const handleSelect = (option: TimeClassification) => {
    setSelected(option);
    const filteredData = filterByTime(position, option);
    console.log(filteredData);
    setFilteredPosition(filteredData);
  };

  const filterByTime = (
    positions: IPosition[],
    timeFilter: TimeClassification
  ): IPosition[] => {
    const now = new Date();

    let timeAgo: Date;
    switch (timeFilter) {
      case "Last seen":
        timeAgo = new Date(now.getTime() - 5 * 60 * 1000);
        break;
      case "1h ago":
        timeAgo = new Date(now.getTime() - 60 * 60 * 1000);
        break;
      case "1d ago":
        timeAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case "7days ago":
        timeAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "A month ago":
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
          onClick={() => handleSelect("Last seen")}
          className={`border-2 border-amber-400 rounded-md p-1 text-center font-semibold ${isSelected(
            "Last seen"
          )}`}
        >
          Last seen
        </h3>
        <h3
          onClick={() => handleSelect("1h ago")}
          className={`border-2 border-amber-400 rounded-md p-1 text-center font-semibold ${isSelected(
            "1h ago"
          )}`}
        >
          1h ago
        </h3>
        <h3
          onClick={() => handleSelect("1d ago")}
          className={`border-2 border-amber-400 rounded-md p-1 text-center font-semibold ${isSelected(
            "1d ago"
          )}`}
        >
          1d ago
        </h3>
        <h3
          onClick={() => handleSelect("7days ago")}
          className={`border-2 border-amber-400 rounded-md p-1 text-center font-semibold ${isSelected(
            "7days ago"
          )}`}
        >
          7days ago
        </h3>
        <h3
          onClick={() => handleSelect("A month ago")}
          className={`border-2 border-amber-400 rounded-md p-1 text-center font-semibold ${isSelected(
            "A month ago"
          )}`}
        >
          A month ago
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
          Seu pet não tem localizador cadastrado ou ponto de referência
          cadastrado
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
