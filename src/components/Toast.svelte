<script>
  import { fade } from "svelte/transition";
  import { onMount, onDestroy } from "svelte";
  /**
   * @typedef {Object} Props
   * @property {string} [message]
   * @property {number} [duration]
   * @property {string} [type]
   * @property {boolean} [showPopover]
   */

  /** @type {Props} */
  let {
    message = "New Config Added!",
    duration = 2500,
    type = "success",
    showPopover = $bindable(false),
  } = $props();

  /**
   * @type {HTMLElement | null}
   */
  let toastContainer = $state();

  $effect(() => {
    if (showPopover && toastContainer) {
      toastContainer?.showPopover();
      toastContainer?.classList.remove("hide");
    } else {
      toastContainer?.hidePopover();
    }
  });

  const closeToast = () => {
    toastContainer?.classList.add("hide");
    setTimeout(() => {
      showPopover = false;
    }, 550);
  };

  $effect(() => {
    if (showPopover) {
      setTimeout(() => {
        toastContainer?.classList.add("hide");
      }, duration);
      setTimeout(() => {
        showPopover = false;
      }, duration + 550);
    }
  });

  onMount(() => {
    toastContainer = document.getElementById("toastContainer");
    toastContainer?.classList.add(type);
  });

  onDestroy(() => {
    showPopover = false;
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
      <button class="toastClose" onclick={() => closeToast()}>&#10005;</button>
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
