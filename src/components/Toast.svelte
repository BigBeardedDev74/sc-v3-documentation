<script>
  import { onMount } from "svelte";
  export let message = "New Config Added!",
    duration = 3000,
    type = "success",
    showPopover = false;

  /**
   * @type {HTMLElement | null}
   */
  let toastContainer;
  $: console.log("showPopover", showPopover, toastContainer);

  $: if (showPopover && toastContainer) {
    toastContainer?.showPopover();
  } else {
    toastContainer?.hidePopover();
  }

  onMount(() => {
    toastContainer = document.getElementById("toastContainer");
  });
</script>

<div popover="auto" class="toastContainer" id="toastContainer">
  <div class="toast">
    <p class="toastText">{message}</p>
    <button class="toastClose" on:click={() => (showPopover = false)}>X</button>
  </div>
</div>

<style>
  :popover-open {
    position: fixed;
    inset: unset;
    top: 5vh;
    left: 50%;
    padding: 0.5rem 4rem;
    transform: translateX(-50%);
    margin: 0;
    border-radius: 0.5rem;
    background-color: var(--buttonBgColor);
    color: var(--buttonTextColor);
  }
</style>
