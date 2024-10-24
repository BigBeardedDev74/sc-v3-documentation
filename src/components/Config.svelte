<script>
  import { run } from 'svelte/legacy';

  import Accordion from "$components/Accordion.svelte";
  import { fly, fade } from "svelte/transition";
  import { createSearchStore, searchHandler } from "$lib/search";
  import { onDestroy } from "svelte";

  let { configDetails = $bindable(), validUser } = $props();

  configDetails = configDetails.map((option) => {
    let searchTerms = `${option?.title} ${option?.desc} ${option?.keywords}`;
    return { ...option, searchTerms };
  });

  const searchStore = createSearchStore(configDetails);
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  let updatedConfigDetails;
  run(() => {
    updatedConfigDetails = $searchStore.filtered;
  });

  let numOfOptions = $derived(updatedConfigDetails.length);

  onDestroy(() => {
    unsubscribe();
  });

  run(() => {
    updatedConfigDetails.sort((a, b) => {
      if (a.required && b.required) {
        return 0;
      }
      if (a.required) {
        return -1;
      }
      if (b.required) {
        return 1;
      }
      return a.title.localeCompare(b.title);
    });
  });
</script>

<div class="titleContainer">
  <h3 class="title">Config Options</h3>
  <p>{numOfOptions} Options</p>
  <div class="searchWrapper">
    <input
      type="text"
      placeholder="Search"
      class="searchBar"
      bind:value={$searchStore.search}
    />
    <button
      onclick={() => {
        $searchStore.search = "";
      }}
    >
      Clear
    </button>
  </div>
  <div class="buttonContainer">
    <button
      onclick={() => {
        updatedConfigDetails = $searchStore.filtered;
      }}>All</button
    >
    <button
      onclick={() =>
        (updatedConfigDetails = $searchStore.filtered.filter(
          (/** @type {{ required: number | boolean; }} */ option) =>
            option.required === 1 || option.required === true
        ))}>Required</button
    >
    <button
      onclick={() =>
        (updatedConfigDetails = $searchStore.filtered.filter(
          (/** @type {{ required: number | boolean; }} */ option) =>
            option.required === 0 || option.required === false
        ))}>Optional</button
    >
  </div>
</div>
{#if numOfOptions === 0}
  <h2>Hmmm... that doesn't seem to be in our configs</h2>
  <h2>Try searching for something else</h2>
{:else}
  {#each updatedConfigDetails as option, i}
    <div
      class="configDetailContainer"
      class:validUser
      in:fly={{ x: -200, duration: 25 * i }}
      out:fly={{ x: 200, duration: 25 * i }}
    >
      <Accordion
        title={option.title}
        type={option.type}
        desc={option.desc}
        required={option.required}
      />
      {#if validUser}
        <div class="deleteButtonContainer">
          <form action="/delete" method="POST">
            <input type="hidden" name="id" value={option.id} />

            <button>Delete</button>
          </form>
          <!-- <button>Edit</button>
          <button>Delete</button> -->
        </div>
      {/if}
    </div>
  {/each}
{/if}

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
  .searchBar {
    width: 350px;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .titleContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .configDetailContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &.validUser {
      margin-bottom: 1rem;
    }
  }
  .deleteButtonContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
  }
</style>
