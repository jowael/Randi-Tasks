<script lang="ts">
  import { cn } from "$lib/utils";
  import { btns } from "./data.svelte";

  let calculation = $state("History");
  let displayValue = $state("0");
  let previousValue = $state(0);
  let currentOperator = $state<string | null>(null);
  let resetOnNextInput = $state(false);

  function focusCalculator(value: string) {
    if (
      resetOnNextInput &&
      value !== "." &&
      value !== "*" &&
      value !== "/" &&
      value !== "+" &&
      value !== "-" &&
      value !== "DEL" &&
      value !== "C" &&
      value !== "="
    ) {
      displayValue = value;
      resetOnNextInput = false;
      return;
    }
    if (value === "=" && !currentOperator) return;
    if (value === "C") {
      displayValue = "0";
      currentOperator = null;
      previousValue = 0;
      return;
    }
    if (value === "DEL") {
      if (displayValue.length == 1) {
        displayValue = "0";
        return;
      }
      displayValue = displayValue.slice(0, -1);
      return;
    }
    if (value === ".") {
      if (displayValue.includes(".")) return;
      displayValue += ".";
      return;
    }
    if (
      displayValue === "0" &&
      (value === "=" ||
        value === "DEL" ||
        value === "C" ||
        value === "+" ||
        value === "-" ||
        value === "*" ||
        value === "/")
    ) {
      return;
    }
    if (displayValue === "0") {
      displayValue = value;
      return;
    }
    if (value === "/" || value === "*" || value === "-" || value === "+") {
      currentOperator = value;
      previousValue = parseFloat(displayValue);
      displayValue = "0";
      return;
    }
    if (value === "=" && currentOperator) {
      if (currentOperator === null) {
        console.log(currentOperator);
        return;
      }

      console.log(previousValue, displayValue);
      let result = 0;
      switch (currentOperator) {
        case "+":
          result = previousValue + parseFloat(displayValue);
          break;
        case "-":
          result = previousValue - parseFloat(displayValue);
          break;
        case "*":
          result = previousValue * parseFloat(displayValue);
          break;
        case "/":
          result = previousValue / parseFloat(displayValue);
          break;
      }
      calculation = `${previousValue} ${currentOperator} ${displayValue} = ${result}`;
      displayValue = result.toString();
      currentOperator = null;
      resetOnNextInput = true;
      return;
    }
    displayValue += value;
  }
  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "2") {
      // add the code here
    }
  }
</script>

<main
  id="calculatorRef"
  class="m-28 flex h-[500px] justify-center rounded-3xl bg-gradient-to-b from-gray-100 to-purple-100 p-4 dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-800"
>
  <div class="overflow-hidden rounded-2xl shadow-2xl dark:backdrop-blur-2xl">
    <!-- Display area -->
    <div class="bg-gray-300 p-4 text-right dark:bg-gray-600">
      <div class="h-6 overflow-hidden text-sm text-gray-500 dark:text-gray-400">
        {calculation}
      </div>
      <div class="overflow-hidden text-3xl font-semibold dark:text-white">
        {displayValue}
      </div>
    </div>

    <div class="grid grid-cols-4 gap-2 p-4">
      {#each btns as btn}
        <button
          class={cn(btn.style, "cursor-pointer")}
          onclick={() => focusCalculator(btn.value)}
        >
          {#if btn.icon}
            <btn.icon class="mx-auto h-5 w-5" />
          {:else}
            {btn.title}
          {/if}
        </button>
      {/each}
    </div>
  </div>
</main>

<svelte:window on:keydown|preventDefault={onKeyDown} />

<style>
  button:active {
    scale: 0.93;
    transition: transform 0.1s;
  }
</style>
