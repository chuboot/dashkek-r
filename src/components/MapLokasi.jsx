import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Perbaiki icon default Leaflet agar muncul
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl,
  shadowUrl,
});
L.Marker.prototype.options.icon = DefaultIcon;

const MapLokasi = ({ data }) => {
    const position = data.LocationMap;
  const markerRef = useRef(null);

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, []);

  return (
    <div className="w-full h-64 md:h-100 rounded-lg overflow-hidden shadow">
      <MapContainer
        center={position}
        zoom={14}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} ref={markerRef}>
          {console.log(position)}
          <Popup autoClose={false} closeOnClick={false}>
            Lokasi KEK {data.Title}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapLokasi;
