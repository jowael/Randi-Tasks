<script lang="ts">
  import "./app.css";
  import Nav from "./lib/nav.svelte";
  import Calcolater from "./lib/calculator/calculator.svelte";

  import { showComp } from "./lib/values.svelte";
</script>

<Nav />
<main class="flex items-center justify-center m-7">
  {#if showComp.name === "Calculator"}
    <Calcolater />
  {/if}
</main>

<style>
</style>
