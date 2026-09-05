import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from '../theme/theme';

export type MapMarker = {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  subtitle?: string;
};

type Props = {
  markers: MapMarker[];
  onMarkerPress?: (id: string) => void;
};

// Free map: Leaflet + OpenStreetMap tiles, no API key or billing account needed
// (unlike react-native-maps' Google-Maps-on-Android default).
function buildHtml(markers: MapMarker[]): string {
  const markersJson = JSON.stringify(markers);
  return `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html, body, #map { height: 100%; margin: 0; padding: 0; }
    .marker-pin {
      background: ${colors.navy};
      width: 28px;
      height: 28px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 2px solid #fff;
      box-shadow: 0 1px 4px rgba(0,0,0,0.4);
    }
    .marker-pin::after {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background: ${colors.orange};
      border-radius: 50%;
      top: 7px;
      left: 7px;
    }
    .leaflet-popup-content { font-family: -apple-system, Roboto, sans-serif; }
    .popup-title { font-weight: 700; margin-bottom: 2px; }
    .popup-subtitle { color: #6B7280; font-size: 12px; margin-bottom: 6px; }
    .popup-link { color: ${colors.orange}; font-weight: 700; font-size: 13px; text-decoration: none; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const markers = ${markersJson};
    const map = L.map('map', { zoomControl: true, attributionControl: true });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const icon = L.divIcon({
      className: '',
      html: '<div class="marker-pin"></div>',
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28],
    });

    const bounds = [];
    markers.forEach((m) => {
      const marker = L.marker([m.latitude, m.longitude], { icon }).addTo(map);
      const popupHtml = '<div class="popup-title">' + m.title + '</div>' +
        (m.subtitle ? '<div class="popup-subtitle">' + m.subtitle + '</div>' : '') +
        '<a class="popup-link" href="#" onclick="select(\'' + m.id + '\'); return false;">View tour &rarr;</a>';
      marker.bindPopup(popupHtml);
      bounds.push([m.latitude, m.longitude]);
    });

    if (bounds.length === 1) {
      map.setView(bounds[0], 12);
    } else if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [40, 40] });
    } else {
      map.setView([20, 10], 2);
    }

    function select(id) {
      window.ReactNativeWebView.postMessage(id);
    }
  </script>
</body>
</html>`;
}

export default function LeafletMap({ markers, onMarkerPress }: Props) {
  const html = useMemo(() => buildHtml(markers), [markers]);

  return (
    <WebView
      source={{ html }}
      style={styles.webview}
      onMessage={(event) => onMarkerPress?.(event.nativeEvent.data)}
      javaScriptEnabled
      domStorageEnabled
      originWhitelist={['*']}
    />
  );
}

const styles = StyleSheet.create({
  webview: { flex: 1, backgroundColor: colors.pillBg },
});
