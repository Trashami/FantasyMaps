<template>
    <div class="modal shadow">
      <div class="modal-content center border-4 shadow">
        <h2 class="text-center text-2xl font-semibold mb-6 shadow">Edit Place</h2>
        <form @submit.prevent="updatePlace" class="space-y-4 w-full md:w-96">
          <label for="name" class="block text-sm font-medium text-gray-700 font-semibold">Name:</label>
          <input v-model="editingPlace.Name" id="name" type="text" class="mt-1 block w-full rounded-md border shadow focus:border-blue-500 focus:ring focus:ring-blue-200" required>
  
          <label for="description" class="block text-sm font-medium text-gray-700 font-semibold">Description:</label>
          <textarea v-model="editingPlace.Description" id="description" class="mt-1 block w-full rounded-md border shadow focus:border-blue-500 focus:ring focus:ring-blue-200" required></textarea>
  
          <label for="placeType" class="block text-sm font-medium text-gray-700 font-semibold">Place Type:</label>
          <select v-model="editingPlace.PlaceType" id="placeType" class="mt-1 block w-full rounded-md border shadow focus:border-blue-500 focus:ring focus:ring-blue-200" required>
            <option value="Personal place">City</option>
            <option value="Public place">Encounter</option>
          </select>
  
          <label for="latitude" class="block text-sm font-medium text-gray-700 font-semibold">Latitude:</label>
          <input v-model="editingPlace.Latitude" id="latitude"   class="mt-1 block w-full rounded-md border shadow focus:border-blue-500 focus:ring focus:ring-blue-200"  required>
  
          <label for="longitude" class="block text-sm font-medium text-gray-700 font-semibold">Longitude:</label>
          <input v-model="editingPlace.Longitude" id="longitude"  s class="mt-1 block w-full rounded-md border shadow focus:border-blue-500 focus:ring focus:ring-blue-200" required>
  
          <label for="enemies" class="block text-sm font-medium text-gray-700 font-semibold">Enemies:</label>
          <input v-model="editingPlace.Enemies" id="enemies" type="text" class="mt-1 block w-full rounded-md border shadow focus:border-blue-500 focus:ring focus:ring-blue-200">
  
          <label for="allies" class="block text-sm font-medium text-gray-700 font-semibold">Allies:</label>
          <input v-model="editingPlace.Allies" id="allies" type="text" class="mt-1 block w-full rounded-md border shadow focus:border-blue-500 focus:ring focus:ring-blue-200">
  
          <label for="lore" class="block text-sm font-medium text-gray-700 font-semibold">Lore:</label>
          <textarea v-model="editingPlace.Lore" id="lore" class="mt-1 block w-full rounded-md border shadow focus:border-blue-500 focus:ring focus:ring-blue-200"></textarea>
  
          <label for="religion" class="block text-sm font-medium text-gray-700 font-semibold">Religion:</label>
          <input v-model="editingPlace.Religion" id="religion" type="text" class="mt-1 block w-full rounded-md border shadow focus:border-blue-500 focus:ring focus:ring-blue-200">
  
          <label for="isVisited" class="block text-sm font-medium text-gray-700 font-semibold">Is Visited:</label>
          <input v-model="editingPlace.IsVisited" id="isVisited" type="text" class="mt-1 block w-full rounded-md border shadow focus:border-blue-500 focus:ring focus:ring-blue-200">
  
          <button type="submit" class="mt-4 block w-full px-4 py-2 text-white bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
            Save Changes
          </button>
          <button type="button" @click="discardChanges" class="mt-4 mr-2 block w-full px-4 py-2 text-white bg-red-500 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-200">
            Discard Changes
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      editingPlace: Object,
    },
    data() {
      return {
        originalEditingPlace: { ...this.editingPlace },
      };
    },
    methods: {
      updatePlace(event) {
        event.preventDefault();
        // Perform an API request to update the place data
        // Close the modal after the update
        this.$emit('close');
      },
      discardChanges() {
        // Reset the editingPlace data to its original state
        this.editingPlace = { ...this.originalEditingPlace };
        // Emit the close event to close the modal
        this.$emit('close');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Style for the modal */
  .modal {
    position: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  }
  .modal-inner {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
  }
  </style>
  