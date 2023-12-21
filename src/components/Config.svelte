<script>
  import Accordion from "$components/Accordion.svelte";
  import configOptions from "$data/configOptions";
  import { fly, fade } from "svelte/transition";

  let configDetails = configOptions;

  configDetails.sort((a, b) => {
    if (a.required && b.required) {
      console.log("a");
      return 0;
    }
    if (a.required) {
      console.log("b");
      return -1;
    }
    if (b.required) {
      console.log("c");
      return 1;
    }
    return a.title.localeCompare(b.title);
  });
</script>

<div class="titleContainer">
  <h3 class="title">Config Options</h3>
  <div class="buttonContainer">
    <button
      on:click={() => {
        configDetails = configOptions;
      }}>All</button
    >
    <button
      on:click={() =>
        (configDetails = configOptions.filter(
          (option) => option.required === true
        ))}>Required</button
    >
    <button
      on:click={() =>
        (configDetails = configOptions.filter(
          (option) => option.required === false
        ))}>Optional</button
    >
  </div>
</div>
{#each configDetails as option, i}
  <div
    in:fly={{ x: -200, duration: 25 * i }}
    out:fly={{ x: 200, duration: 25 * i }}
  >
    <Accordion
      title={option.title}
      type={option.type}
      desc={option.desc}
      required={option.required}
    />
  </div>
{/each}

<style>
  .configDetails {
    padding: 1rem;
    border: 2px solid #ccc;
    border-radius: 10px;
    background: var(--bgColor);
    margin: 0 2rem 1rem;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  }
  button {
    margin: 0 0 0 1rem;
    background: var(--buttonBgColor);
    color: var(--buttonTextColor);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    &:hover {
      background: oklch(47.44% 0.077 233.06);
    }
  }
  .titleContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
