<script lang="ts">
 import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
 import { Button } from "$lib/components/ui/button/index.js";
 import { availableApps, showComp } from "$lib/values.svelte";

 let chosenComponent = $state(showComp.name);

$effect(() => {
    showComp.name = chosenComponent;
})
</script>
 
<DropdownMenu.Root>
 <DropdownMenu.Trigger>
  {#snippet child({ props })}
   <Button {...props} variant="outline">{chosenComponent}</Button>
  {/snippet}
 </DropdownMenu.Trigger>
 <DropdownMenu.Content class="w-56">
  <DropdownMenu.Group>
   <DropdownMenu.Label>Available Apps:</DropdownMenu.Label>
   <DropdownMenu.Separator />
   <DropdownMenu.RadioGroup bind:value={chosenComponent}>
    {#each availableApps as app}
    <DropdownMenu.RadioItem value={app.value}>{app.name}</DropdownMenu.RadioItem>
    {/each}
   </DropdownMenu.RadioGroup>
  </DropdownMenu.Group>
 </DropdownMenu.Content>
</DropdownMenu.Root>