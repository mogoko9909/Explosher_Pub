import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors, spacing, typography } from '../theme/theme';

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
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html, body, #map { height: 100%; width: 100%; margin: 0; padding: 0; }
    #error {
      display: none;
      position: absolute;
      inset: 0;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 24px;
      font-family: -apple-system, Roboto, sans-serif;
      color: #6B7280;
      font-size: 14px;
    }
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
  <div id="error">Couldn't load the map. Check your internet connection and try again.</div>
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    function showError() {
      document.getElementById('map').style.display = 'none';
      document.getElementById('error').style.display = 'flex';
    }

    window.addEventListener('error', showError);

    try {
      if (typeof L === 'undefined') {
        showError();
      } else {
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

        // The WebView can report a zero-size container at the moment Leaflet
        // initializes (before native layout settles), which renders a blank
        // grey square with no error. Re-measure shortly after mount and on
        // any resize to recover from that.
        setTimeout(function () { map.invalidateSize(); }, 300);
        window.addEventListener('resize', function () { map.invalidateSize(); });
      }
    } catch (e) {
      showError();
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
  const [loadFailed, setLoadFailed] = useState(false);

  if (loadFailed) {
    return (
      <View style={[styles.webview, styles.errorWrap]}>
        <Text style={styles.errorText}>Couldn't load the map. Check your internet connection.</Text>
      </View>
    );
  }

  return (
    <WebView
      source={{ html, baseUrl: 'https://explosher.app' }}
      style={styles.webview}
      onMessage={(event) => onMarkerPress?.(event.nativeEvent.data)}
      onError={() => setLoadFailed(true)}
      onHttpError={() => setLoadFailed(true)}
      javaScriptEnabled
      domStorageEnabled
      originWhitelist={['*']}
      mixedContentMode="always"
    />
  );
}

const styles = StyleSheet.create({
  webview: { flex: 1, backgroundColor: colors.pillBg },
  errorWrap: { alignItems: 'center', justifyContent: 'center', padding: spacing.lg },
  errorText: { ...typography.body, color: colors.textMuted, textAlign: 'center' },
});
