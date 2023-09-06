<template>
    <div id="noteform-main" class="bg-white md:w-175 flex flex-col p-4 shadow border">
        <h1 class="text-xl font-bold mb-4 text-center">Create a New Note</h1>
        <h3 class="text-l font-bold mb-4">Title</h3>
        <textarea v-model="newNoteTitle" class="h-8  mb-4 min-h-8 shadow border" placeholder="Title"></textarea>
        <h3 class="text-l font-bold mb-4">Select a Note Type</h3>
        <select v-model="newNoteType" class="mb-4 shadow border">
            <option value="Personal Note">Private Note</option>
            <option value="Public Note">Public Note</option>
        </select>
        <div>
            <h3 class="text-l font-bold mb-4">Associated Players</h3>
            <div v-for="player in players" :key="player.name" class="mb-2">
                <input type="checkbox" :value="player.name" v-model="player.selected"> {{ player.name }}
            </div> 
        </div>
        <textarea v-model="newNoteContent" class="h-64 mt-4 shadow border" placeholder="Write your notes here..."></textarea>
        <h3 class="text-l font-bold mb-4">Add Tags</h3>
        <div class="flex flex-wrap items-center mb-4 shadow border p-2">
            <span v-for="tag in enteredTags" :key="tag" class="bg-green-400 text-gray-700 px-3 py-1 rounded-full text-xs mr-2 mb-2">
                {{ tag }}
                <button @click="removeTag(tag)" class="ml-2 text-black hover:text-red">&times;</button>
            </span>
            <input v-model="newTag" @keyup="checkForCommaOrTab" ref="tagInput" class="flex-1 outline-none bg-transparent" placeholder="tag1, tag2, ...">
        </div>
        <div class="flex justify-end mt-4">
            <button class="block py-2.5 px-4 rounded transition duration-200 hover:bg-red-600 hover:text-white" @click="cancelNote">Cancel</button>
            <button class="block py-2.5 px-4 rounded transition duration-200 hover:bg-green-600 hover:text-white" @click="submitNote">Submit</button>
        </div>
    </div>
</template>

<script lang="ts">
    import { ref, onMounted } from 'vue';
    export default {
        props: {
            cancelAction: {
                type: Function,
                required: true
            }
        },
        methods: {
            dragStart(event, note) {
                event.dataTransfer.setData("text/plain", JSON.stringify(note));
            }
        },
        setup(props: any) {
            const newNoteTitle = ref("");
            const newNoteType = ref("Personal Note");
            const newNoteContent = ref("");
            const enteredTags = ref([]); 
            const newTag = ref("");  
            const players = ref([]);
            const selectedPlayers = ref([]);
            
            onMounted(async () => {
                try {
                    const response = await fetch('http://127.0.0.1:8080/getPlayers.cfm', {
                        headers: {
                            'apiKey': 'OfPeqRcpga9AXQNFE89O96nBqPMaSF8pGZZ1WcuGt9yf91wAQYNXFibIIUvlUv5IX2NLp4FntnYvOLSQ5wHPkLyp30F9aUy38CHP4VTtutuG9QB1H1qj9hwgqALosYIe'
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    console.log(data);

                    players.value = data.map(playerData => ({ name: playerData.PLAYERNAME, selected: false }));
                } catch (error) {
                    console.error('Error fetching players:', error);
                }
            });

            const cancelNote = () => {
                props.cancelAction();
            };

            const submitNote = async () => {
                enteredTags.value.push(newTag.value);
                const newNote = {
                    TITLE: newNoteTitle.value,
                    TYPE: newNoteType.value,
                    CONTENT: newNoteContent.value,
                    TAGS: enteredTags.value.join(','),
                    X: 0, 
                    Y: 0, 
                };
                console.log(newNote)
                try {
                    const response = await fetch('http://127.0.0.1:8080/submitNote.cfm', {
                        method: 'POST',
                        headers: {
                            'apiKey': 'OfPeqRcpga9AXQNFE89O96nBqPMaSF8pGZZ1WcuGt9yf91wAQYNXFibIIUvlUv5IX2NLp4FntnYvOLSQ5wHPkLyp30F9aUy38CHP4VTtutuG9QB1H1qj9hwgqALosYIe',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newNote),
                    });

                    if (response.status === 200) {
                        recentNotes.value.push(newNote);
                        newNoteTitle.value = "";
                        newNoteType.value = "Personal Note";
                        newNoteContent.value = "";
                        enteredTags.value = [];

                        } else {
                            console.error('Error submitting note:', response.statusText);
                            console.error('Response Headers:', response.headers);
                            console.error('Response Content:', await response.text());
                        }
                } catch (error) {
                    console.error('Error submitting note:', error);
                }
            };

            const checkForCommaOrTab = (event) => {
                if ((event.key === "Tab" || (event.key === "," && event.shiftKey === false)) && newTag.value) {
                    event.preventDefault(); 
                    addTag();
                }
            };

            const addTag = () => {
                const tagValue = newTag.value.replace(',', '').trim();
                if (tagValue && !enteredTags.value.includes(tagValue)) {
                    enteredTags.value.push(tagValue);
                    newTag.value = "";  
                }
            };

            const removeTag = (tagToRemove) => {
                enteredTags.value = enteredTags.value.filter(tag => tag !== tagToRemove);
            };

            const getBadgeColor = (noteType: string) => {
                switch (noteType) {
                    case 'Personal Note': return 'bg-blue-500';
                    case 'Public Note': return 'bg-green-500';
                    default: return 'bg-gray-500';
                }
            };

            return {
                newNoteTitle,
                newNoteType,
                newNoteContent,
                enteredTags,  // Expose the enteredTags instead of newNoteTags
                newTag,
                cancelNote,
                players,
                selectedPlayers,
                submitNote,
                checkForCommaOrTab,
                addTag,
                removeTag,
                getBadgeColor
            };
        }
    };
</script>

<style>
    .note-card {
        position: relative; /* This is essential for the absolute positioning of the badge */
        height: 125px; /* Fixed card height */
    }

    .note-content {
        overflow: hidden; /* Hide overflow */
        text-overflow: ellipsis; /* Add ... for overflowed content */
        display: -webkit-box; /* Required for line-clamp */
        -webkit-line-clamp: 4; /* Show only the first 4 lines, adjust as needed */
        -webkit-box-orient: vertical; /* Required for line-clamp */
    }
</style>
