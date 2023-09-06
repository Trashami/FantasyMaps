<template>
    <div id="app">
        <router-view />
        <ArcGISMap :noteToUpdate="noteToUpdate"/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import ArcGISMap from "./components/ArcGISMap.vue";  // Adjust the path if necessary

    export default defineComponent({
        name: 'App',
        components: {
            ArcGISMap
        },
        data() {
        return {
            noteToUpdate: null,
        };
    },
    methods: {
        locateMe(note) {
            this.noteToUpdate = note;
        },
    },

    });
</script>

<style>
    #app {
        display: grid;
        grid-template-columns: auto 1fr auto auto; /* Adjust this based on the actual number and size of columns you need */
        height: 100vh;
    }
</style>
