<script lang="ts">
  import Accordion from "$components/Accordion.svelte";
  import { fly } from "svelte/transition";
  import { createSearchStore, searchHandler } from "$lib/search";
  import { onDestroy } from "svelte";

  export let data;

  let configDetails = data.configOptions;

  configDetails = configDetails.filter((option) => option.archived !== 1);

  let currentOption = null;
  let type = null;

  $: currentOption = null;
  $: type = null;

  configDetails = configDetails.map((option) => {
    let searchTerms = `${option?.title} ${option?.desc} ${option?.keywords}`;
    return { ...option, searchTerms };
  });

  const searchStore = createSearchStore(configDetails);
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  $: updatedConfigDetails = $searchStore.filtered;
  $: numOfOptions = updatedConfigDetails.length;

  let isValidUser = false;
  if (data?.validUser) {
    isValidUser = true;
  }

  const openUpdateModal = (option, event, modalType) => {
    currentOption = option;
    type = modalType;

    const UpdateModal = document.getElementById("updateModal");
    UpdateModal?.showModal();
  };

  const handleModalClose = () => {
    const UpdateModal = document.getElementById("updateModal");
    UpdateModal?.close();
    currentOption = null;
    setTimeout(() => {
      type = null;
    }, 500);
  };

  onDestroy(() => {
    unsubscribe();
  });

  $: updatedConfigDetails.sort((a, b) => {
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
</script>

<dialog class="updateModal" id="updateModal" on:close={handleModalClose}>
  {#if type === "delete"}
    <p class="confirmDelete">
      Are you sure you want to delete <span class="currentOption"
        >{currentOption?.title}</span
      >?
    </p>

    <div class="modalButtonContainer">
      <form action="?/deleteConfigOption" method="POST">
        <input type="hidden" name="id" value={currentOption?.id} />
        <input
          type="hidden"
          name="updatedBy"
          value={data?.validUser?.user_name}
        />
        <button class="button" type="submit">Yes</button>
      </form>
      <button class="button" on:click={handleModalClose}>No</button>
    </div>
  {:else}
    <h3 class="updateModalTitle">
      Update: <span class="currentOption">{currentOption?.title}</span>
    </h3>
    <form action="?/updateConfigOption" method="POST" id="updateForm">
      <input type="hidden" name="id" value={currentOption?.id} />
      <input
        type="hidden"
        name="updatedBy"
        value={data?.validUser?.user_name}
      />

      <label for="desc">Description:</label>
      <textarea name="desc" id="desc" required>{currentOption?.desc}</textarea>
      <label for="type">Type:</label>
      <select name="type" id="type" required>
        <option value="string" selected={currentOption?.type === "string"}>
          String
        </option>
        <option value="number" selected={currentOption?.type === "number"}>
          Number
        </option>
        <option value="boolean" selected={currentOption?.type === "boolean"}>
          Boolean
        </option>
      </select>
      <label for="required">Required:</label>
      <select name="required" id="required" required>
        <option value="1" selected={currentOption?.required === 1}>Yes</option>
        <option value="0" selected={currentOption?.required === 0}>No</option>
      </select>
      <label for="keywords">Keywords:</label>
      <input
        type="text"
        name="keywords"
        id="keywords"
        value={currentOption?.keywords}
      />
      <div class="modalButtonContainer">
        <button class="button" type="submit">Update</button>
        <button class="button" type="button" on:click={handleModalClose}
          >Cancel</button
        >
      </div>
    </form>
  {/if}
</dialog>
<section class="section">
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
        on:click={() => {
          $searchStore.search = "";
        }}
      >
        Clear
      </button>
    </div>
    <div class="buttonContainer">
      <button
        on:click={() => {
          updatedConfigDetails = $searchStore.filtered;
        }}>All</button
      >
      <button
        on:click={() =>
          (updatedConfigDetails = $searchStore.filtered.filter(
            (/** @type {{ required: number | boolean; }} */ option) =>
              option.required === 1 || option.required === true
          ))}>Required</button
      >
      <button
        on:click={() =>
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
        class:isValidUser
        in:fly={{ x: -200, duration: 25 * i }}
        out:fly={{ x: 200, duration: 25 * i }}
      >
        <Accordion
          title={option.title}
          type={option.type}
          desc={option.desc}
          required={option.required}
        />
        {#if isValidUser}
          <div class="deleteButtonContainer">
            {#if !option.required}
              <button
                on:click={(event) => openUpdateModal(option, event, "delete")}
              >
                Delete
              </button>
            {/if}
            <button
              on:click={(event) => openUpdateModal(option, event, "update")}
            >
              Update
            </button>
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</section>

<style lang="postcss">
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

    &.isValidUser {
      padding: 0.5rem 1rem 0.5rem 0;
      &:nth-child(odd) {
        background: var(--stripeBgColor);
      }
    }
  }
  .deleteButtonContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: fit-content;
  }

  .modalButtonContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    .button,
    form {
      width: 100%;
      margin: 0;
    }
    .button {
      height: 50px;
      font-size: 1.3rem;
      font-weight: 700;
    }
  }
  .confirmDelete {
    font-size: 1.6rem;
    margin: 2rem 0;
    font-weight: 600;
  }
  .currentOption {
    color: var(--secondaryColor);
    font-weight: 900;
  }
  #updateForm {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 50vw;
    max-width: 740px;
    @media (max-width: 768px) {
      width: 90vw;
    }
    select {
      padding: 0.5rem 1rem;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }
</style>
