import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export class DeviceMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 38.6436863,
      lng: -0.8732,
      zoom: 16,
    };
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <div id="map">
        <MapContainer
          center={position}
          zoom={this.state.zoom}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              <span>
                A pretty CSS3 popup. <br /> Easily customizable.
              </span>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default DeviceMap;
