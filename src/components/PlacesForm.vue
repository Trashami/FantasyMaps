<template>
    <div id="placeform-main" class="bg-white md:w-175 flex flex-col p-4 shadow border">
      <h1 class="text-xl font-bold mb-8 text-center">Add a New Place</h1>
  
      <form @submit.prevent="addPlace">
        <!-- Name Field -->
        <div class="mb-4">
          <label for="name" class="text-l font-bold">Name:</label>
          <input v-model="name" id="name" class="h-8 w-full mb-2 min-h-8 shadow border" required>
        </div>
  
        <!-- Place Type Field -->
        <div class="mb-4">
          <label for="placeType" class="text-l font-bold">Place Type:</label>
          <select v-model="placeType" id="placeType" class="mb-2 w-full shadow border">
            <option value="city">City</option>
            <option value="encounter">Encounter</option>
            <!-- Add other options if needed -->
          </select>
        </div>
  
        <!-- Visited Field -->
        <div class="mb-4">
          <label for="visited" class="text-l m-2 font-bold">Visited:</label>
          <input type="checkbox" v-model="visited" id="visited">
        </div>
  
        <!-- Description Field -->
        <div class="mb-4">
          <label for="description" class="text-l font-bold">Description:</label>
          <textarea v-model="description" id="description" class="h-32 w-full mb-2 min-h-32 shadow border" rows="4"></textarea>
        </div>
  
        <!-- Lore Field -->
        <div class="mb-4">
          <label for="lore" class="text-l font-bold">Lore:</label>
          <textarea v-model="lore" id="lore" class="h-32 w-full mb-2 min-h-32 shadow border" rows="4"></textarea>
        </div>
  
        <!-- Religion Field -->
        <div class="mb-4">
          <label for="religion" class="text-l font-bold">Religion:</label>
          <textarea v-model="religion" id="religion" class="h-32 w-full mb-2 min-h-32 shadow border" rows="4"></textarea>
        </div>
  
        <!-- Allies Field -->
        <div class="mb-4">
          <label for="allies" class="text-l font-bold">Allies:</label>
          <input v-model="allies" id="allies" class="h-8 w-full mb-2 min-h-8 shadow border">
        </div>
  
        <!-- Enemies Field -->
        <div class="mb-4">
          <label for="enemies" class="text-l font-bold">Enemies:</label>
          <input v-model="enemies" id="enemies" class="h-8 w-full mb-2 min-h-8 shadow border">
        </div>
            <!-- Longitude Field -->
        <div class="mb-4">
            <label for="longitude" class="text-l font-bold">Longitude:</label>
            <input v-model="longitude" id="longitude" class="h-8 w-full mb-2 min-h-8 shadow border" type="number" step="any">
        </div>
        
        <!-- Latitude Field -->
        <div class="mb-4">
            <label for="latitude" class="text-l font-bold">Latitude:</label>
            <input v-model="latitude" id="latitude" class="h-8 w-full mb-2 min-h-8 shadow border" type="number" step="any">
        </div>
  
        <button type="submit" class="block mx-auto py-2.5 px-4 rounded transition bottom-2 left-2 duration-200 hover:bg-green-600 hover:text-white">Add Place</button>

      </form>
    </div>
  </template>
  
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: '',
        placeType: 'city',
        visited: false,
        description: '',
        lore: '',
        religion: '',
        allies: '',
        enemies: '',
        long: '',
        lat: '',
      };
    },
    methods: {
      async addPlace() {
        const visitedValue = this.visited ? "Yes" : "No";
        const placeData = {
          name: this.name,
          placeType: this.placeType,
          IsVisited: visitedValue,
          description: this.description,
          lore: this.lore,
          religion: this.religion,
          allies: this.allies,
          enemies: this.enemies,
          long: this.longitude,
          lat: this.latitude,

        };
        try {
            const response = await fetch('http://127.0.0.1:8080/submitPlaces.cfm', {
                method: 'POST',
                headers: {
                    'apiKey': 'OfPeqRcpga9AXQNFE89O96nBqPMaSF8pGZZ1WcuGt9yf91wAQYNXFibIIUvlUv5IX2NLp4FntnYvOLSQ5wHPkLyp30F9aUy38CHP4VTtutuG9QB1H1qj9hwgqALosYIe',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(placeData),
            });

            if (response.status === 200) {
                    this.clearForm();
                    this.$emit('place-added');

                } else {
                    console.error('Error submitting note:', response.statusText);
                    console.error('Response Headers:', response.headers);
                    console.error('Response Content:', await response.text());
                }
                } catch (error) {
                    console.error('Error submitting note:', error);
                }
      },
      clearForm() {
        this.name = '';
        this.placeType = 'city';
        this.visited = false;
        this.description = '';
        this.lore = '';
        this.religion = '';
        this.allies = '';
        this.enemies = '';
        this.longitude = '';
        this.latitude = '';
      },
    },
  };
  </script>
  