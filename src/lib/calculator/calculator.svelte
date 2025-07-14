<script lang="ts">
  import { cn } from "$lib/utils";
  import { btns } from "./data.svelte";

  let calculation = $state("History");
  let displayValue = $state("0");
  let previousValue = $state(0);
  let currentOperator = $state<string | null>(null);
  let resetOnNextInput = $state(false);
  let lastInputWasOperator = $state(false);
  let lastInputType = $state<
    "number" | "operator" | "decimal" | "equals" | "clear" | "delete"
  >("clear");
  let repeatOperand = $state<number | null>(null);
  let lastOperator = $state<string | null>(null);

  // Reactive button references
  let buttonRefs: Record<string, HTMLButtonElement> = {};

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
  function formatNumber(num: number): string {
    // Convert to string to handle floating-point precision
    const str = num.toString();

    // Check if it's a number with unnecessary decimal places
    if (str.includes(".")) {
      // Remove trailing zeros
      const trimmed = str.replace(/\.?0+$/, "");
      // If we removed all decimals, return the integer part
      if (trimmed.endsWith(".")) {
        return trimmed.slice(0, -1);
      }
      return trimmed;
    }
    return str;
  }

  function calculate(a: number, operator: string | null, b: number): number {
    if (!operator) return b;
    switch (operator) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return b;
    }
  }

  function handleInput(value: string) {
    // Handle repeating operations
    if (
      value === "=" &&
      lastInputType === "equals" &&
      lastOperator &&
      repeatOperand !== null
    ) {
      const currentValue = parseFloat(displayValue);
      const result = calculate(currentValue, lastOperator, repeatOperand);
      calculation = `${currentValue} ${lastOperator} ${repeatOperand} = ${formatNumber(result)}`;
      displayValue = formatNumber(result);
      return;
    }

    // Handle numbers
    if (!["+", "-", "*", "/", "DEL", "C", "=", "."].includes(value)) {
      // Reset state when starting new number after equals
      if (lastInputType === "equals") {
        resetCalculatorState();
      }
      if (
        resetOnNextInput ||
        displayValue === "0" ||
        lastInputType === "operator"
      ) {
        displayValue = value;
        resetOnNextInput = false;
        lastInputType = "number";
        return;
      }
      displayValue += value;
      lastInputType = "number";
      return;
    }

    // Handle operators
    if (["+", "-", "*", "/"].includes(value)) {
      if (lastInputType === "operator") {
        currentOperator = value;
        return;
      }

      // Handle operator after equals
      if (lastInputType === "equals") {
        previousValue = parseFloat(displayValue);
        currentOperator = value;
        lastInputType = "operator";
        resetOnNextInput = true;
        return;
      }
      // Perform calculation if we have a previous operation
      if (currentOperator && previousValue !== 0) {
        const currentValue = parseFloat(displayValue);
        const result = calculate(previousValue, currentOperator, currentValue);
        displayValue = formatNumber(result);
        previousValue = result;
      } else {
        previousValue = parseFloat(displayValue);
      }

      // Perform calculation if we have a previous operation
      if (currentOperator && previousValue !== 0) {
        const currentValue = parseFloat(displayValue);
        const result = calculate(previousValue, currentOperator, currentValue);
        displayValue = result.toString();
        previousValue = result;
      } else {
        previousValue = parseFloat(displayValue);
      }

      currentOperator = value;
      lastInputType = "operator";
      resetOnNextInput = true;
      return;
    }

    // Handle equals
    if (value === "=") {
      if (currentOperator && previousValue !== 0) {
        const currentValue = parseFloat(displayValue);
        const result = calculate(previousValue, currentOperator, currentValue);

        // Store for repeating operations
        repeatOperand = currentValue;
        lastOperator = currentOperator;

        calculation = `${previousValue} ${currentOperator} ${currentValue} = ${formatNumber(result)}`;
        displayValue = formatNumber(result);
        previousValue = result;
        lastInputType = "equals";
        resetOnNextInput = true;
      }
      return;
    }

    // Handle clear
    if (value === "C") {
      resetCalculatorState();
      displayValue = "0";
      return;
    }

    // Handle delete - FIXED FOR AFTER EQUALS
    if (value === "DEL") {
      // Reset state when deleting after equals
      if (lastInputType === "equals") {
        resetCalculatorState();
      }

      if (resetOnNextInput) {
        displayValue = "0";
        resetOnNextInput = false;
      } else if (displayValue.length === 1) {
        displayValue = "0";
      } else {
        displayValue = displayValue.slice(0, -1);
      }
      lastInputType = "delete";
      return;
    }

    // Handle decimal
    if (value === ".") {
      // Reset state when decimal after equals
      if (lastInputType === "equals") {
        resetCalculatorState();
        displayValue = "0.";
        lastInputType = "decimal";
        return;
      }

      if (resetOnNextInput) {
        displayValue = "0.";
        resetOnNextInput = false;
        lastInputType = "decimal";
        return;
      }
      if (!displayValue.includes(".")) {
        displayValue += ".";
        lastInputType = "decimal";
      }
      return;
    }
  }

  // Helper function to reset calculator state
  function resetCalculatorState() {
    previousValue = 0;
    currentOperator = null;
    lastOperator = null;
    repeatOperand = null;
    resetOnNextInput = true;
    lastInputWasOperator = false;
  }
  // keyboard handling
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
