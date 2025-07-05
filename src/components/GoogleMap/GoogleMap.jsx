import React from "react";
import {
  GoogleMap as OriginMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "200px",
};

const GoogleMap = ({ latitude, longitude }) => {
  return (
    <LoadScript
      loadingElement={<div>Loading...</div>}
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAP_KEY}
    >
      <OriginMap
        mapContainerStyle={mapContainerStyle}
        center={{ lat: latitude, lng: longitude }}
        zoom={12}
        options={{
          disableDefaultUI: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          zoomControl: false,
        }}
      >
        <Marker position={{ lat: latitude, lng: longitude }} />
      </OriginMap>
    </LoadScript>
  );
};

export default GoogleMap;
