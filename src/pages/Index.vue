<template>
    <div id="sidebar-main" class="flex h-screen bg-white-100 md:flex-row flex-col">

        <!-- Sidebar -->
        <div class="bg-white flex flex-col w-full justify-center items-center sm:w-64 sm:justify-start shadow-lg border">
            <div class="flex items-center justify-center mt-4">
                <svg version="1.1" id="raccoon-logo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 80.957 80">
                    <a class="top-line">
                        <polygon class="ear white-animate-1" fill="#C6C6C6" points="26.35,17.589 18.435,25.475 26.311,24.191" />
                        <polygon class="top-white-line white-animate-1" fill="#DBDADB" points="18.402,25.443 10.067,33.807 22.657,33.893 26.279,24.204 26.279,24.159" />
                        <polygon class="top-white-line white-animate-1" fill="#C6C6C6" points="15.182,39.075 22.657,33.893 10.067,33.807" />
                        <polygon class="top-white-line white-animate-1" fill="#B7B7B7" points="22.657,33.893 28.134,31.308 26.279,24.204" />
                    </a>
                    <polygon class="top-white-line white-animate-2" fill="#FFFFFF" points="26.279,24.204 28.134,31.308 33.104,33.833 40.421,37.319 36.228,21.789" />
                    <polygon class="top-white-line white-animate-3" fill="#E4E4E5" points="36.228,21.789 40.421,37.319 44.728,21.789" />
                    <polygon class="top-white-line white-animate-4" fill="#B9B9B9" points="44.728,21.789 40.421,37.319 47.604,33.833 52.74,31.234 54.598,24.184" />
                    <a class="top-line">
                        <polygon class="ear white-animate-5" fill="#C6C6C6" points="54.609,17.597 54.598,24.163 62.349,25.356" />
                        <polygon class="top-white-line white-animate-5" fill="#FFFFFF" points="52.74,31.234 59.295,33.833 54.598,24.184" />
                        <polygon class="top-white-line white-animate-5" fill="#E9E8E9" points="62.349,25.356 54.598,24.163 54.598,24.184 59.295,33.833 70.719,33.748" />
                        <polygon class="top-white-line white-animate-5" fill="#C6C6C6" points="59.295,33.833 65.668,38.844 70.719,33.748" />
                    </a>
                    <a class="middle-joined">
                        <polygon class="middle-line-black black-animate-1" fill="#191C1A" points="15.192,39.071 24.198,48.086 30.599,44.12 22.667,33.888" />
                        <polygon class="middle-line-black black-animate-1" fill="#181A1" points="22.667,33.888 30.599,44.12 28.144,31.303" />
                    </a>
                    <polygon class="middle-line-black black-animate-2" fill="#464749" points="33.114,33.828 28.144,31.303 30.599,44.12 40.43,42.025 40.431,37.314" />
                    <polygon class="middle-line-black black-animate-3" fill="#181A19" points="47.614,33.828 40.431,37.314 40.43,42.025 50.104,44.085 52.75,31.229" />
                    <a class="middle-joined black-animate-4">
                        <polygon class="middle-line-black black-animate-4" fill="#393B3C" points="52.75,31.229 50.104,44.085 59.305,33.828" />
                        <polygon class="middle-line-black black-animate-4" fill="#46474A" points="59.305,33.828 50.104,44.085 56.55,48.058 65.733,38.877" />
                    </a>
                    <polygon class="bottom-white-line bottom-white-animate-1" fill="#c7c7c7" points="24.214,48.025 30.785,54.676 40.429,51.106 30.663,44.052" />
                    <polygon class="bottom-white-line bottom-white-animate-2" fill="#E4E4E5" points="30.663,44.052 40.429,51.106 40.494,41.956" />
                    <polygon class="bottom-white-line bottom-white-animate-3" fill="#E4E4E5" points="40.494,41.956 40.429,51.106 50.167,44.017" />
                    <polygon class="bottom-white-line bottom-white-animate-4" fill="#FFFFFF" points="50.167,44.017 40.429,51.106 50.055,54.595 56.711,48.064" />
                    <polygon class="bottom-line-black bottom-black-animate-1" fill="#181A19" points="30.668,54.659 40.43,64.493 40.429,51.106" />
                    <polygon class="bottom-line-black bottom-black-animate-2" fill="#46474A" points="40.429,51.106 40.43,64.493 50.192,54.644" />
                    <ellipse class="topper" cx="49" cy="39" rx="2" ry="1.5" stroke="grey" stroke-width="0" fill="#fff" transform="rotate(-20 45 40)" />
                    <ellipse class="topper" cx="32" cy="39" rx="2" ry="1.5" stroke="grey" stroke-width="0" fill="#fff" transform="rotate(20 36 40)" />
                    <polygon class="bottom-white-line bottom-white-animate-4" fill="#E4E4E5" points="56.757,47.950 49.99,54.65  55.75,56.829 58.75,55.229 60.55,50.829" />
                    <polygon class="bottom-white-line bottom-white-animate-3" fill="#C6C6C6" points="65.627,38.950 56.59,47.90  58.75,55.229" />
                    <polygon class="middle-line-black black-animate-2" fill="#464947" points="40.627,64.350 50.10,54.65  55.75,56.829" />
                    <polygon class="bottom-white-line bottom-white-animate-4" fill="#b6b6b7" points="24.17,47.950 30.99,54.65  24.75,56.829 22.25,55.229" />
                    <polygon class="bottom-white-line bottom-white-animate-3" fill="#9e9e9e" points="15.127,38.950 24.19,47.98  22.25,55.229" />
                    <polygon class="middle-line-black black-animate-2" fill="#191C1A" points="40.327,64.450 30.80,54.65  24.75,56.829" />
                    <polygon class="border" fill="#464749" points="10.067,33.807 18.437,25.438 15.692,25.887 7.698,33.881 10.078,33.817" />
                    <polygon class="border" fill="#393B3C" points="36.228,21.789 44.728,21.789 44.736,21.791 45.326,20.148 45.322,20.147 35.458,20.178 36.178,21.802" />
                    <polygon class="border" fill="#464749" points="70.719,33.748 70.717,33.75 73.258,33.823 65.35,25.899 62.332,25.339" />
                    <polygon class="border" fill="#181A19" points="54.598,24.184 54.609,17.597 62.332,25.339 65.35,25.899 52.883,13.406 52.884,21.749 54.546,24.171" />
                    <polygon class="border" fill="#464749" points="54.546,24.171 52.884,21.749 52.884,21.789 45.326,20.148 44.736,21.791" />
                    <polygon class="border" fill="#46474A" points="40.429,64.306 40.429,66.621 40.439,66.631 59.93,55.145 61.063,54.587" />
                    <polygon class="border" fill="#46474A" points="73.258,33.823 70.717,33.75 65.68,38.832 58.65,55.352 44.563,62.487 40.53,66.545 60.148,56.929 67.134,39.947 73.259,33.824" />
                    <polygon class="border" fill="#181A19" points="40.429,64.306   40.387,64.348   22.766,55.457 22.287,55.18   15.263,39.04   10.067,33.807   7.698,33.881   13.916,40.109   21.395,57.188    40.429,66.621" />
                    <polygon class="border" fill="#181A19" points="35.458,20.178 35.35,20.178 28.1,21.789 28.1,21.766 28.207,13.369 15.692,25.887 18.437,25.438 26.305,17.57 26.291,24.202 26.401,24.175 36.178,21.802" />
                </svg>
            </div>

            <!-- Sidebar Links -->
            <nav class="mt-10">
                <a @click="openNoteForm" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-600 hover:text-white" href="#">New Note</a>
               <a @click="showMyNotes = true" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-600 hover:text-white" href="#">My Notes</a>
                <a @click="showMap" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-600 hover:text-white" href="#">Icrandor Map</a>
                <a @click="openPlacesForm" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-600 hover:text-white" href="#">Add New Place</a>
                <a @click="openPlacesList" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-amber-600 hover:text-white" href="#">My Places</a>
            </nav>
        </div>

    <!-- Main Content for larger screens -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-white-200">
        <!-- Conditional rendering of components -->
        <NoteList v-if="showMyNotes" :notes="myNotes" />
        <NoteForm v-else-if="showNoteForm" :cancelAction="closeNoteForm" />
        <ArcGISMap v-else-if="isMapVisible" />
        <PlacesForm v-else-if="showPlacesForm" :cancelAction="closePlacesForm" />
        <PlacesList v-else-if="openPlacesList" :notes="myPlaces" :cancelAction="closePlacesList" />

        <!-- Other main content components can go here -->
      </main>
    </div>
  </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import NoteForm from '../components/NoteForm.vue';
  import NoteList from '../components/NoteList.vue';
  import ArcGISMap from '../components/ArcGISMap.vue';
  import PlacesForm from '../components/PlacesForm.vue';
  import PlacesList from '../components/PlacesList.vue';
  
  export default {
    components: {
      NoteForm,
      NoteList,
      ArcGISMap,
      PlacesForm,
      PlacesList
    },
    setup() {
      const showNoteForm = ref(false);
      const showMyNotes = ref(false);
      const isMapVisible = ref(false);
      const showPlacesForm = ref(false);
      const myNotes = ref([]);
  
      const openNoteForm = () => {
        showNoteForm.value = true;
        showMyNotes.value = false;
        isMapVisible.value = false;
        showPlacesForm.value = false; // Close PlacesForm
        showPlacesList.value = false; // Close PlacesList
      };
  
      const showMap = () => {
        isMapVisible.value = true;
        showNoteForm.value = false;
        showMyNotes.value = false;
        showPlacesForm.value = false;
        showPlacesList.value = false; // Close PlacesList
      };

      const openPlacesForm = () => {
        showPlacesForm.value = true;
        showNoteForm.value = false;
        showMyNotes.value = false;
        isMapVisible.value = false;
        showPlacesList.value = false; // Close PlacesList
      };

    const closePlacesForm = () => {
      showPlacesForm.value = false;
      showMyNotes.value = true;
      // ... Other necessary actions ...
    };
  
      const closeNoteForm = () => {
        showNoteForm.value = false;
        showMyNotes.value = true; 
        console.log("showMyNotes:", showMyNotes.value); 
      };

      const showPlacesList = ref(false);

      const openPlacesList = () => {
      showPlacesList.value = true;
      showNoteForm.value = false;
      showMyNotes.value = false;
      isMapVisible.value = false;
      showPlacesForm.value = false;
    };

    const closePlacesList = () => {
      showPlacesList.value = false;
      showMyNotes.value = true;
      // ... Other necessary actions ...
    };
  
      return {
        showNoteForm,
        showMyNotes,
        isMapVisible,
        showPlacesForm,
        myNotes,
        openNoteForm,
        closeNoteForm,
        showMap,
        openPlacesList,
        openPlacesForm,
        closePlacesForm
      };
    }
  }
  </script>

<style>
    a,
    .footer-link {
        @apply transition-all ease-out duration-100;
    }

    .footer-link {
        opacity: 0.8;
    }
</style>
