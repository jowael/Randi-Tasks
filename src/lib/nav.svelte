<script lang="ts">
  import { ModeWatcher} from 'mode-watcher';
  import Input from '$lib/components/ui/input/input.svelte';
  import Switch from './switch.svelte';
  import DropDownBtn from './dropDownBTN.svelte';
  import { showComp } from "./values.svelte";

  let searchQuery: string = '';


</script>

<ModeWatcher />

<nav class="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center justify-between">
  <!-- Logo -->
  <div class="text-2xl font-bold text-gray-800 dark:text-white">
    <a href="/">Randi Tasks</a>
  </div>

  <!-- Search Input -->
   {#if showComp.name === "NoteApp"}
   <form class="flex-1 max-w-lg mx-4" on:submit|preventDefault={() => console.log('Search:', searchQuery)}>
    <Input
      type="text"
      placeholder="Search products..."
      bind:value={searchQuery}
      class="w-full p-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
    />
  </form>
   {/if}

  <!-- right part -->
  <div class="flex items-center space-x-4">
    <!-- Cart Icon -->
    <!-- <a href="/cart" class="text-gray-800 dark:text-white hover:text-blue-500">
      <ShoppingCartIcon class="w-6 h-6" />
    </a> -->

    <!-- Theme Switch & DropDownBtn -->
      <Switch/>
      <DropDownBtn/>
  </div>
</nav>