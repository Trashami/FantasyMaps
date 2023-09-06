<template>
  <div
    id="places-list"
    class="bg-white md:w-175 flex flex-col p-4 shadow border relative"
  >
    <div
      v-for="place in currentPlaces"
      :key="place.Name"
      class="place-card relative p-4 border rounded-md"
    >
      <div class="place-content">
        <h3 class="font-bold text-lg">{{ place.Name }}</h3>
        <div class="place-description">
          <p class="truncate mb-2">{{ place.Description }}</p>
          <button
            @click="editPlace(place)"
            class="edit-button bg-blue-500 text-white rounded-md py-2 px-4"
          >
            Edit
          </button>
        </div>
        <div class="place-details absolute top-0 right-0 mt-2 mr-2">
          <span class="place-type" :class="getBadgeColor(place.PlaceType)">
            {{ place.PlaceType }}
          </span>
        </div>
      </div>

      <div class="absolute bottom-0 right-0 mb-2 mr-2">
        <p v-if="place.CreatedAt">
          Created at: {{ formatDate(place.CreatedAt) }}
        </p>
        <p v-else>No creation date available.</p>
      </div>
    </div>


    <div class="pagination">
      <button
        @click="currentPage--"
        :disabled="currentPage <= 1"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button
        @click="currentPage++"
        :disabled="currentPage >= totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
    <EditPlacesForm v-if="editingPlace" :editingPlace="editingPlace" @close="editingPlace = null" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  getCurrentInstance,
  computed,
} from 'vue';
import EditPlacesForm from './EditPlacesForm.vue';
export default defineComponent({
  setup () {
    const places = ref([]);
    const instance = getCurrentInstance();
    const { emit } = getCurrentInstance();
    const editingPlace = ref(null); // Add this ref for the editing place
    const editPlace = (place) => {
      editingPlace.value = place; // Set the editingPlace to the clicked place
    };
    const currentPage = ref(1);
    const placesPerPage = 5;
    const totalPages = ref(0);
    const currentPlaces = computed(() => {
      console.log('currentPage:', currentPage.value);
      console.log('totalPages:', totalPages.value);
      console.log('Computed currentPlaces:', places.value); // Log the entire places array
      return places.value; // Return the entire array without slicing
    });
    const onDragStart = (event, place) => {
      event.dataTransfer.setData('application/json', JSON.stringify(place));
    };
    const fetchPlaces = async () => {
      try {
        const response = await fetch(
          'http://127.0.0.1:8080/api.cfc?method=getPlaces',
          {
            headers: {
              apiKey:
                'OfPeqRcpga9AXQNFE89O96nBqPMaSF8pGZZ1WcuGt9yf91wAQYNXFibIIUvlUv5IX2NLp4FntnYvOLSQ5wHPkLyp30F9aUy38CHP4VTtutuG9QB1H1qj9hwgqALosYIe',
            },
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        let parsedData = data;
        if (typeof data === 'string') {
          parsedData = JSON.parse(data);
        }

        if (!Array.isArray(parsedData)) {
          throw new Error('Data is not an array');
        }

        const fetchedPlaces = parsedData.map(place => {
          return {
            PlaceType: place.PlaceType,
            Longitude: place.Longitude,
            CreatedAt: place.CreatedAt,
            Enemies: place.Enemies,
            Lore: place.Lore,
            Latitude: place.Latitude,
            Allies: place.Allies,
            Religion: place.Religion,
            IsVisited: place.IsVisited,
            Name: place.Name,
            Description: place.Description,
          };
        });
        places.value = fetchedPlaces;
        totalPages.value = Math.ceil(places.value.length / placesPerPage);
      } catch (error) {
        console.error('Error fetching places:', error);
        return []; // Return an empty array or handle the error as needed
      }
    };

    onMounted(async () => {
      await fetchPlaces();
      console.log(currentPlaces.value); // Log the data after it's been set
    });

    const formatDate = dateString => {
      const formatDate = dateString => {
        const parsedDate = new Date(dateString); // Parse the date string
        return format(parsedDate, 'MMMM d, yyyy HH:mm:ss'); // Format the parsed date
      };
    };

    const getBadgeColor = type => {
      switch (type) {
        case 'Personal place':
          return 'bg-red-500';
        case 'Public place':
          return 'bg-blue-500';
        default:
          return 'bg-gray-500';
      }
    };

    const saveEditedPlace = async () => {
            try {
                // Perform the necessary API call to update the place data
                const response = await fetch('http://127.0.0.1:8080/api.cfc?method=updatePlace', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        apiKey:  'OfPeqRcpga9AXQNFE89O96nBqPMaSF8pGZZ1WcuGt9yf91wAQYNXFibIIUvlUv5IX2NLp4FntnYvOLSQ5wHPkLyp30F9aUy38CHP4VTtutuG9QB1H1qj9hwgqALosYIe',
                    },
                    body: JSON.stringify(editingPlace.value),
                });

                if (!response.ok) {
                    throw new Error('Failed to save edited place');
                }

                // If successful, update the places array with the edited data
                const updatedPlaces = places.value.map(place => {
                    if (place.Name === editingPlace.value.Name) {
                        return editingPlace.value;
                    }
                    return place;
                });

                places.value = updatedPlaces;

                // Reset the editingPlace to null to close the edit form
                editingPlace.value = null;

            } catch (error) {
                console.error('Error saving edited place:', error);
            }
        };

    return {
      places,
      currentPlaces,
      getBadgeColor,
      formatDate,
      totalPages,
      currentPage,
      editingPlace,
      editPlace,
      saveEditedPlace,
    };
  },
});
</script>

<style scoped>
.place-card {
  padding: 1rem;
  border: 1px solid #ccc;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
}

.place-content {
  overflow: hidden;
}

.place-type {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: white;
  font-size: 0.75rem;
}

.tags {
  margin-top: 0.5rem;
}

.tag {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background-color: #f2f2f2;
  margin-right: 0.25rem;
  font-size: 0.75rem;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.pagination button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
