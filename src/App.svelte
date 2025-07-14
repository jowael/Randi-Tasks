<script lang="ts">
  import "./app.css";
  import Nav from "./lib/nav.svelte";
  import Calcolater from "./lib/calculator/calculator.svelte";
  import NoteApp from "./lib/noteapp/note.svelte";
  import { showComp } from "./lib/values.svelte";
</script>

<Nav />
<main class="m-7 flex items-center justify-center">
  {#if showComp.name === "Calculator"}
    <Calcolater />
  {:else if showComp.name === "NoteApp"}
    <NoteApp />
  {/if}
</main>

<style>
</style>
