<script>
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  export let message = "New Config Added!",
    duration = 2500,
    type = "success",
    showPopover = false;

  $: console.log(message);

  /**
   * @type {HTMLElement | null}
   */
  let toastContainer;

  $: if (showPopover && toastContainer) {
    toastContainer?.showPopover();
    toastContainer?.classList.remove("hide");
  } else {
    toastContainer?.hidePopover();
  }

  const closeToast = () => {
    toastContainer?.classList.add("hide");
    setTimeout(() => {
      showPopover = false;
    }, 550);
  };

  $: if (showPopover) {
    setTimeout(() => {
      toastContainer?.classList.add("hide");
    }, duration);
    setTimeout(() => {
      showPopover = false;
    }, duration + 550);
  }

  onMount(() => {
    toastContainer = document.getElementById("toastContainer");
    toastContainer?.classList.add(type);
  });
</script>

<div
  popover="auto"
  class="toastContainer hide"
  id="toastContainer"
  transition:fade
>
  <div class="toast">
    <div class="toast">
      <p class="toastText">{@html message}</p>
      <button class="toastClose" on:click={() => closeToast()}>&#10005;</button>
    </div>
  </div>
</div>

<style>
  :popover-open {
    position: fixed;
    inset: unset;
    top: 8vh;
    left: 50%;
    padding: 1.25rem 4rem;
    transform: translateX(-50%);
    margin: 0;
    border-radius: 0.5rem;
    opacity: var(--toastOpacity);
    transition: opacity 0.5s ease-in-out;
  }
  .toastText {
    font-size: 1.4rem;
    margin: 0;
  }

  .toastClose {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    border: none;
    background: none;
    font-size: 1.4rem;
    color: var(--toastTextColor);
    cursor: pointer;
  }
</style>
