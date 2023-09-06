<template>
    <div id="notelist-main" class="bg-white md:w-175 flex flex-col p-4 shadow border relative">
        <div v-for="note in currentNotes" :key="note.NoteID" class="note-card relative p-4 border rounded-md">
            <div class="note-content">
                <h3 class="font-bold text-lg">{{ note.TITLE }}</h3>
                <p class="truncate">{{ note.CONTENT }}</p>
                <div class="note-details absolute top-0 right-0 mt-2 mr-2">
                    <span class="note-type" :class="getBadgeColor(note.TYPE)">
                        {{ note.TYPE }}
                    </span>
                </div>
                <div v-if="!note.X && !note.Y">
                    <img src="../assets/locate.jpg" @click="locateMe(note)" class="absolute left-3 cursor-pointer bottom-2" alt="Locate Me" width="40" height="40"  draggable="true" @dragstart="onDragStart($event, note)">

                </div>
                
            </div>
            
            <div class="absolute bottom-0 right-0 mb-2 mr-2">
                <p>Created at: {{ note.CreatedAt }}</p>
            </div>
        </div>
        </div>
        <div class="pagination">
            <button @click="currentPage--" :disabled="currentPage <= 1" 
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                Previous
            </button>
            <span>{{ currentPage }} / {{ totalPages }}</span>
            <button @click="currentPage++" :disabled="currentPage >= totalPages" 
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg mx-2 disabled:bg-gray-400 disabled:cursor-not-allowed">
                Next
            </button>
        </div>
        
</template>



<script lang="ts">
import { defineComponent, ref, onMounted, getCurrentInstance, computed } from 'vue';

export default defineComponent({
    setup() {
        
        const notes = ref([]);
        const instance = getCurrentInstance();
        const { emit } = getCurrentInstance();
        
        const currentPage = ref(1);
        const notesPerPage = 5;

        const currentNotes = computed(() => {
            const start = (currentPage.value - 1) * notesPerPage;
            const end = start + notesPerPage;
            return notes.value.slice(start, end);
        });

        const totalPages = computed(() => {
            return Math.ceil(notes.value.length / notesPerPage);
        });

        const onDragStart = (event, note) => {
            event.dataTransfer.setData("application/json", JSON.stringify(note));
        };

        const fetchNotes = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8080/getNotes.cfm', {
                    headers: {
                        'apiKey': 'OfPeqRcpga9AXQNFE89O96nBqPMaSF8pGZZ1WcuGt9yf91wAQYNXFibIIUvlUv5IX2NLp4FntnYvOLSQ5wHPkLyp30F9aUy38CHP4VTtutuG9QB1H1qj9hwgqALosYIe'
                    }
                });

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

                const fetchedNotes = parsedData.map(note => {
                    return {
                        NoteID: note.NoteID,
                        TITLE: note.TITLE,
                        TYPE: note.TYPE,
                        CONTENT: note.CONTENT,
                        X: note.X,
                        Y: note.Y,
                        CreatedAt: note.CreatedAt,
                    };
                });
                notes.value = fetchedNotes;

            } catch (error) {
                console.error('Error fetching notes:', error);
                return []; // Return an empty array or handle the error as needed
            }
        };

        onMounted(async () => {
            await fetchNotes();
            
        });

        const getBadgeColor = (type) => {
            switch (type) {
                case 'Personal Note':
                    return 'bg-red-500';
                case 'Public Note':
                    return 'bg-blue-500';
                default:
                    return 'bg-gray-500';
            }
        };

        return {
            notes,
            onDragStart,
            fetchNotes,
            getBadgeColor,
            currentNotes,
            totalPages,
            currentPage,
        };
    },
});
</script>

  <style scoped>
  .note-card {
    padding: 1rem;
    border: 1px solid #ccc;
    margin: 0.5rem 0;
    border-radius: 0.5rem;
  }
  
  .note-content {
    overflow: hidden;
  }
  
  .note-type {
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
  