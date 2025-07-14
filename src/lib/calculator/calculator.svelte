<script lang="ts">
  import { cn } from "$lib/utils";
  import { btns } from "./data.svelte";

  // Calculator state
  let calculation = $state("History");
  let displayValue = $state("0");
  let previousValue = $state(0);
  let currentOperator = $state<string | null>(null);
  let resetOnNextInput = $state(false);
  let lastInputWasOperator = $state(false); // Track operator input

  // Reactive button references
  let buttonRefs: Record<string, HTMLButtonElement> = {};
  let reactiveRefs = $derived(buttonRefs); // Make the object reactive

  // Keyboard to button mapping
  const keyMap: Record<string, string> = {
    "0": "0",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    ".": ".",
    "+": "+",
    "-": "-",
    "*": "*",
    "/": "/",
    x: "*",
    X: "*",
    Enter: "=",
    "=": "=",
    Escape: "C",
    Backspace: "DEL",
    Delete: "DEL",
    c: "C",
    C: "C",
  };

  // Custom action for reactive binding
  function bindButton(node: HTMLButtonElement, value: string) {
    buttonRefs[value] = node;
    return {
      destroy() {
        delete buttonRefs[value];
      },
    };
  }

  // Enhanced calculator logic
  function handleInput(value: string) {
    if (resetOnNextInput && !["+", "-", "*", "/"].includes(value)) {
      displayValue = "0";
      resetOnNextInput = false;
    }

    // Handle operator switching
    if (["+", "-", "*", "/"].includes(value)) {
      if (lastInputWasOperator) {
        // Allow switching operators without resetting
        currentOperator = value;
        return;
      }
      lastInputWasOperator = true;
    } else {
      lastInputWasOperator = false;
    }

    // Existing logic with fixes
    if (value === "=" && !currentOperator) return;
    if (value === "C") {
      displayValue = "0";
      currentOperator = null;
      previousValue = 0;
      resetOnNextInput = false;
      lastInputWasOperator = false;
      return;
    }

    if (value === "DEL") {
      if (displayValue.length === 1 || resetOnNextInput) {
        displayValue = "0";
        resetOnNextInput = false;
      } else {
        displayValue = displayValue.slice(0, -1);
      }
      return;
    }

    if (value === ".") {
      if (resetOnNextInput) {
        displayValue = "0.";
        resetOnNextInput = false;
        return;
      }
      if (!displayValue.includes(".")) {
        displayValue += ".";
      }
      return;
    }

    if (["+", "-", "*", "/"].includes(value)) {
      currentOperator = value;
      previousValue = parseFloat(displayValue);
      resetOnNextInput = true;
      return;
    }

    if (value === "=" && currentOperator) {
      const currentValue = parseFloat(displayValue);
      let result = 0;
      switch (currentOperator) {
        case "+":
          result = previousValue + currentValue;
          break;
        case "-":
          result = previousValue - currentValue;
          break;
        case "*":
          result = previousValue * currentValue;
          break;
        case "/":
          result = previousValue / currentValue;
          break;
      }

      calculation = `${previousValue} ${currentOperator} ${currentValue} = ${result}`;
      displayValue = result.toString();
      currentOperator = null;
      resetOnNextInput = true;
      return;
    }

    // Handle numeric input
    if (resetOnNextInput) {
      displayValue = value;
      resetOnNextInput = false;
    } else {
      displayValue = displayValue === "0" ? value : displayValue + value;
    }
  }

  // Enhanced keyboard handling
  function onKeyDown(e: KeyboardEvent) {
    const key = e.key;
    const value = keyMap[key];

    if (value) {
      e.preventDefault();
      const button = buttonRefs[value];

      if (button) {
        button.classList.add("active-key");
        setTimeout(() => button.classList.remove("active-key"), 100);
        handleInput(value);
      }
    }
  }
</script>

<main
  id="calculatorRef"
  class="m-4 flex h-[500px] justify-center rounded-3xl bg-gradient-to-b from-gray-100 to-purple-100 p-4 select-none md:m-28 dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-800"
>
  <div
    class="w-full max-w-md overflow-hidden rounded-2xl shadow-2xl dark:backdrop-blur-2xl"
  >
    <!-- Display area -->
    <div class="bg-gray-300 p-4 text-right dark:bg-gray-600">
      <div
        class="h-8 truncate overflow-hidden text-sm text-gray-500 dark:text-gray-400"
      >
        {calculation || "History"}
      </div>
      <div
        class="h-12 max-w-[263px] truncate overflow-hidden text-3xl font-semibold dark:text-white"
      >
        {displayValue}
      </div>
    </div>

    <div class="grid grid-cols-4 gap-2 p-4">
      {#each btns as btn}
        <button
          use:bindButton={btn.value}
          class={cn(
            btn.style,
            "flex cursor-pointer items-center justify-center transition-all duration-100",
          )}
          onclick={() => handleInput(btn.value)}
          aria-label={btn.title}
        >
          {#if btn.icon}
            <btn.icon class="h-5 w-5" />
          {:else}
            {btn.title}
          {/if}
        </button>
      {/each}
    </div>
  </div>
</main>

<svelte:window on:keydown={onKeyDown} />

<style>
  button:active,
  .active-key {
    transform: scale(0.93);
    transition: transform 0.1s;
    filter: brightness(0.95);
  }

  .truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
