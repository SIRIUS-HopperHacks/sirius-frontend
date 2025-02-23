import React from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "1rem",
};

const center = {
  lat: 37.7749,
  lng: -122.4194,
};

const Map: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDaJxSlku3EfQzz7K4sYcllE4FzbiQxqOM",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      <Marker position={center} />
    </GoogleMap>
  );
};

export default Map;
