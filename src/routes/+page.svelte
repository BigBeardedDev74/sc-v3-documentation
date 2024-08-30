<script>
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
    setTimeout(() => {
      currentOption = null;
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
                <div class="buttonIcon">
                  <svg
                    viewBox="0 0 402 544"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M77.2117 519L38.8451 185.446H363.428L333.675 519H77.2117Z"
                      class="iconPath"
                      stroke-width="50"
                    />
                    <line
                      x1="156.684"
                      y1="499.382"
                      x2="155.262"
                      y2="311.685"
                      class="iconPath"
                      stroke-width="50"
                      stroke-linecap="round"
                    />
                    <line
                      x1="244.92"
                      y1="499.382"
                      x2="243.498"
                      y2="311.685"
                      class="iconPath"
                      stroke-width="50"
                      stroke-linecap="round"
                    />
                    <mask id="path-4-inside-1_3222_16" fill="white">
                      <rect
                        y="76.2173"
                        width="401.562"
                        height="46.8188"
                        rx="20"
                      />
                    </mask>
                    <rect
                      y="76.2173"
                      width="401.562"
                      height="46.8188"
                      rx="20"
                      class="iconPath"
                      stroke-width="46.8188"
                      mask="url(#path-4-inside-1_3222_16)"
                    />
                    <path
                      d="M270.109 92.7174H286.609V76.2174V43C286.609 28.3645 274.744 16.5 260.109 16.5H141.453C126.818 16.5 114.953 28.3644 114.953 43V76.2174V92.7174H131.453H270.109Z"
                      class="iconPath"
                      stroke-width="33"
                    />
                  </svg>
                </div>
              </button>
            {/if}
            <button
              on:click={(event) => openUpdateModal(option, event, "update")}
            >
              <div class="buttonIcon">
                <svg
                  viewBox="0 0 535 542"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M268 105.231C268 102.47 265.761 100.231 263 100.231H49C24.6994 100.231 5 119.931 5 144.231V492.231C5 516.532 24.6995 536.231 49 536.231H397C421.301 536.231 441 516.532 441 492.231V263.231C441 260.47 438.761 258.231 436 258.231H407C404.239 258.231 402 260.47 402 263.231V492.231C402 494.993 399.761 497.231 397 497.231H49C46.2386 497.231 44 494.993 44 492.231V144.231C44 141.47 46.2386 139.231 49 139.231H263C265.761 139.231 268 136.993 268 134.231V105.231Z"
                    class="iconPath iconFill"
                    stroke-width="10"
                    stroke-linejoin="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M186.705 311.883L174.677 359.266L222.063 347.236L466.712 102.587L431.357 67.2316L186.705 311.883Z"
                    class="iconFill"
                  />
                  <path
                    d="M467 32.0513L491.749 7.30253C495.654 3.39729 501.986 3.39729 505.891 7.30253L527.104 28.5157C531.009 32.421 531.009 38.7526 527.104 42.6579L502.355 67.4066L467 32.0513Z"
                    class="iconFill"
                  />
                </svg>
              </div>
            </button>
          </div>
        {/if}
      </div>
    {/each}
  {/if}
</section>

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
  .buttonIcon {
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  .iconPath {
    stroke: var(--buttonTextColor);
  }
  .iconFill {
    fill: var(--buttonTextColor);
  }
</style>
