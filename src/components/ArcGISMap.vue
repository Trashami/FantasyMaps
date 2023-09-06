
<template>
    <div id="map" @dragover.prevent></div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import TileLayer from "@arcgis/core/layers/TileLayer";
import Graphic from "@arcgis/core/Graphic";
import Point from "@arcgis/core/geometry/Point";
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";
import PopupTemplate from '@arcgis/core/PopupTemplate';

export default defineComponent({
    name: 'ArcGISMap',
    props: {
        noteToUpdate: {
            type: Object,
            required: false,
            default: null,
        },
    },
    setup(props) {
        const view = ref(null);
        onMounted(async () => {
            // Create the map and view
            const layer = new TileLayer({
                url: "https://tiles.arcgis.com/tiles/zKTV4rJLrODweSOU/arcgis/rest/services/Icrandor_World_Map/MapServer"
            });

            const map = new Map({
                layers: [layer]
            });

            const mapView = new MapView({
                map,
                container: "map",
                zoom: 4,
                center: [-25, 5],
                spatialReference: { wkid: 4326 },
                popup: {
                    dockEnabled: true,
                    dockOptions: {
                        buttonEnabled: false,
                        breakpoint: false,
                        position: "bottom-left"
                    }
                }
            });
            
            mapView.when(async function () {
                const layer = mapView.map.layers.getItemAt(0);
                mapView.constraints = {
                    minZoom: mapView.zoom,
                    maxZoom: mapView.zoom + 3,
                    rotationEnabled: false,
                    geometry: layer.fullExtent
                };
                mapView.extent = layer.fullExtent;

                // Fetch notes and add them as points to the map
                const fetchedNotes = await fetchNotes();
                addMarkersToMap(mapView, fetchedNotes);
            });

    mapView.when(function () {
        mapView.on("click", function (event) {
            console.log(event);
            const lat = event.mapPoint.latitude;
            const lng = event.mapPoint.longitude;

            const popupContent = `Latitude: ${lat.toFixed(6)}<br>Longitude: ${lng.toFixed(6)}`;
            mapView.openPopup({
                location: event.mapPoint,
                content: popupContent,
            });
        });
    // Attach the drop event listener to the mapView
        mapView.container.addEventListener('drop', async function (event) {
            event.preventDefault();
            console.log(event)
            const NoteID = JSON.parse(event.dataTransfer.getData('application/json')).NoteID;

            const mapViewRect = mapView.container.getBoundingClientRect();
            const offsetX = event.clientX - mapViewRect.left;
            const offsetY = event.clientY - mapViewRect.top;

            // Convert screen point to map point using webMercatorUtils
            const mapPoint = mapView.toMap({ x: offsetX, y: offsetY });
            console.log(mapPoint);
            const lat = mapPoint.latitude;
            const lng = mapPoint.longitude;

            updateNoteLocation(NoteID, lat, lng);
        });
                    });

                    view.value = mapView;
                });

        const fetchNotes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8080/getNotes.cfm', {
                    headers: {
                        'apiKey': 'OfPeqRcpga9AXQNFE89O96nBqPMaSF8pGZZ1WcuGt9yf91wAQYNXFibIIUvlUv5IX2NLp4FntnYvOLSQ5wHPkLyp30F9aUy38CHP4VTtutuG9QB1H1qj9hwgqALosYIe',
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                let parsedData = data;

                // Parse the data if it's a JSON string
                if (typeof data === 'string') {
                    parsedData = JSON.parse(data);
                }

                return parsedData; // Make sure the data returned is an array of notes
            } catch (error) {
                console.error('Error fetching notes:', error);
                return []; // Return an empty array or handle the error as needed
            }
        };

        // Add markers to the map
    const addMarkersToMap = (mapView, notes) => {
    notes.forEach(note => {
        const point = new Point({
            x: note.X,
            y: note.Y, 
        });

        let iconUrl;
        if (note.TYPE === 'Personal Note') {
            iconUrl = 'src/assets/secret-book.png'; // Replace with the path to your secret-book icon
        } else if (note.TYPE === 'Public Note') {
            iconUrl = 'src/assets/black-book.png'; // Replace with the path to your black-book icon
        }

        const markerSymbol = new PictureMarkerSymbol({
            url: iconUrl,
            width: 18,
            height: 18,
        });

        const popupContent = `
        <div style="flex-grow: 1;">
            <div style="text-align: center; background-color: #A0522D; padding: 10px; margin: -5px -5px 10px; border-radius: 10px 10px 0 0; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <img alt="" src="${markerSymbol.iconUrl}" height=100 />
                <br />
                <div style="color: white; font-weight: bold; font-size: 1.5em;">
                    ${note.TITLE}
                </div>
            </div>
            <div style="padding: 10px;">
                <div style="font-size: 1.2em; text-align: justify;">
                    ${note.CONTENT}
                </div>
            </div>
        </div>
        <div style="padding: 10px; text-align: left;">
            <p style="font-size: 1em; margin: 0;"><strong>Created On:</strong> ${note.CreatedAt}</p>
        </div>
`;





        const graphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            attributes: {
                SQL_X: note.X,
                SQL_Y: note.Y,
            },
            popupTemplate: new PopupTemplate({
                title: note.TITLE,
                content: popupContent,
            }),
        });

        mapView.graphics.add(graphic);
    });

const fetchPlaces = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8080/getPlaces.cfm', {
          headers: {
            'apiKey': 'OfPeqRcpga9AXQNFE89O96nBqPMaSF8pGZZ1WcuGt9yf91wAQYNXFibIIUvlUv5IX2NLp4FntnYvOLSQ5wHPkLyp30F9aUy38CHP4VTtutuG9QB1H1qj9hwgqALosYIe',
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        let parsedData = data;

        // Parse the data if it's a JSON string
        if (typeof data === 'string') {
          parsedData = JSON.parse(data);
        }

        return parsedData; // Make sure the data returned is an array of places
      } catch (error) {
        console.error('Error fetching places:', error);
        return []; // Return an empty array or handle the error as needed
      }
    };

    const addPlacesToMap = (mapView, places) => {
    places.forEach(place => {
        const point = new Point({
            x: place.Longitude,
            y: place.Latitude,
        });

        

        const markerSymbol = new PictureMarkerSymbol({
            url: 'src/assets/castle.png',
            width: 24,
            height: 24,
        });

        const sizeVV = {
  type: "size",
  valueExpression: "$view.scale",
  stops: [
    { size: 24, value: 1155581 },   // Adjust the size based on your needs
    { size: 18, value: 9244648 },   // Adjust the size based on your needs
    { size: 12, value: 73957190 },  // Adjust the size based on your needs
    { size: 6, value: 591657527 }   // Adjust the size based on your needs
  ]
};

// Apply the size visual variable to the marker symbol
markerSymbol.visualVariables = [sizeVV];

const popupContent = `
  <div style="background-color: #fff; color: #000; border-radius: 10px; padding: 10px; font-family: 'Arial', sans-serif;">
    <h1 style="font-size: 2em; margin-bottom: 10px;">The ${place.PlaceType} of ${place.Name}</h1>
    <div style="font-size: 1.2em; line-height: 1.4;">
      <h2 style="font-size: 1.5em; margin-bottom: 10px;">Description</h2>
      <p>${place.Description}</p>
      
      <h2 style="font-size: 1.5em; margin-top: 20px; margin-bottom: 10px;">Lore</h2>
      <p>${place.Lore}</p>
      
      <h2 style="font-size: 1.5em; margin-top: 20px; margin-bottom: 10px;">Religion</h2>
      <p>${place.Religion}</p>
      
      <h2 style="font-size: 1.5em; margin-top: 20px; margin-bottom: 10px;">Allies</h2>
      <p>${place.Allies}</p>
      
      <h2 style="font-size: 1.5em; margin-top: 20px; margin-bottom: 10px;">Enemies</h2>
      <p>${place.Enemies}</p>
    </div>
    <div style="font-size: 0.9em; color: #999; margin-top: 20px;">
      <p><strong>Latitude:</strong> ${place.Latitude}, <strong>Longitude:</strong> ${place.Longitude}</p>
      <p><strong>Note Created On:</strong> ${place.CreatedAt}</p>
    </div>
  </div>
`;






        const graphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            attributes: {
                SQL_X: place.Longitude,
                SQL_Y: place.Latitude,
            },
            popupTemplate: new PopupTemplate({
                title: place.Name,
                content: popupContent,
            }),
        });

        mapView.graphics.add(graphic);
    });
};
mapView.when(async function () {
    const fetchedPlaces = await fetchPlaces();
    addPlacesToMap(mapView, fetchedPlaces);
});
};

    const updateNoteLocation = async (NoteID, lat, lng) => {
    // Send the new coordinates to your server to update the note
    const response = await fetch('http://127.0.0.1:8080/updateNoteLocation.cfm', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'apiKey': 'OfPeqRcpga9AXQNFE89O96nBqPMaSF8pGZZ1WcuGt9yf91wAQYNXFibIIUvlUv5IX2NLp4FntnYvOLSQ5wHPkLyp30F9aUy38CHP4VTtutuG9QB1H1qj9hwgqALosYIe',
        },
        body: JSON.stringify({ apiKey: 'OfPeqRcpga9AXQNFE89O96nBqPMaSF8pGZZ1WcuGt9yf91wAQYNXFibIIUvlUv5IX2NLp4FntnYvOLSQ5wHPkLyp30F9aUy38CHP4VTtutuG9QB1H1qj9hwgqALosYIe', NoteID, lat, lng }),

    });

        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
    };
    },
});
</script>

<style scoped>
@import 'rpg-awesome/css/rpg-awesome.css';
    #map {
        width: 100vw;
        height: 100%;
        display: flex;
        background-color: black;
    }
      .container {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
        background-color: #f8f4e3;
    }

    .note {
        font-family: 'Cormorant Garamond', serif;
        border: 2px solid #8a6d3b;
        border-radius: 10px;
        padding: 20px;
        background-color: #ffffff;
        color: #3e4a52;
    }

    .note-title {
        text-align: center;
        color: #8a6d3b;
        font-size: 2em;
        border-bottom: 2px solid #8a6d3b;
        margin-bottom: 10px;
        padding-bottom: 10px;
    }

    .note-content {
        font-size: 1.2em;
        line-height: 1.5em;
        text-align: justify;
    }


</style>
