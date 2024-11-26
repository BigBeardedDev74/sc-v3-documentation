<script>
  let message = $state(`<p>${title} copied!</p>`);
  import { slide } from "svelte/transition";

  import Toast from "$components/Toast.svelte";
  /**
   * @typedef {Object} Props
   * @property {boolean} [open]
   * @property {any} title
   * @property {any} type
   * @property {any} desc
   * @property {any} required
   */

  /** @type {Props} */
  let { open = $bindable(false), title, type, desc, required } = $props();
  const handleClick = () => (open = !open);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${title}":`);
    message = `<p>${title} copied!</p>`;
    showPopover = true;
    setTimeout(() => {
      showPopover = false;
    }, 1500);
  };

  let requiredText = $derived(required === 1 ? "Yes" : "No");
  let showPopover = $state(false);
</script>

<div class="configs">
  <button class="copyButton" aria-label="Copy" onclick={copyToClipboard}>
    <div class="buttonIcon">
      <svg viewBox="0 0 554 686" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1_3321_9" fill="white">
          <rect width="442" height="575" rx="20" />
        </mask>
        <rect
          width="442"
          height="575"
          rx="20"
          stroke-width="100"
          mask="url(#path-1-inside-1_3321_9)"
          class="iconPath"
        />
        <mask id="path-2-inside-2_3321_9" fill="white">
          <rect x="112" y="111" width="442" height="575" rx="20" />
        </mask>
        <rect
          x="112"
          y="111"
          width="442"
          height="575"
          rx="20"
          stroke-width="100"
          mask="url(#path-2-inside-2_3321_9)"
          class="iconPath"
        />
      </svg>
    </div>
  </button>
  <div class="header">
    <button class="openButton" onclick={handleClick}>
      <h4 class={open ? "option open" : "option"}>{title}</h4>
    </button>
    {#if showPopover}
      <Toast
        {showPopover}
        message={`<span>"${title}":</span> copied to clipboard`}
        duration={1500}
        }
      />
    {/if}
  </div>

  {#if open}
    <div class="configDetails" transition:slide>
      <p class="type"><strong>Type:</strong> {type}</p>
      <p class="desc"><strong>Description:</strong> {@html desc}</p>
      <p class="required"><strong>Required:</strong> {requiredText}</p>
    </div>
  {/if}
</div>

<style lang="postcss">
  .configs {
    margin-left: 2rem;
    width: 100%;
    display: grid;
    grid-template-columns: 2rem 1fr;
    gap: 1rem;
  }

  .configDetails {
    padding: 1rem;
    border: 2px solid #ccc;
    border-radius: 10px;
    background: var(--bgColor);
    margin: 0 2rem 1rem;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    grid-column: 2/3;
  }

  .openButton {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }
  .copyButton {
    anchor-name: copyButton;
    margin: 0 1rem 0 0;
    width: 2rem;
    height: 2rem;
    background: var(--buttonBgColor);
    color: var(--buttonTextColor);
    padding: 0.3rem 0.5rem 0.1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease-in-out;

    svg {
      width: 0.8rem;
    }
    &:hover {
      background: oklch(47.44% 0.077 233.06);
    }
  }

  .iconPath {
    stroke: var(--buttonTextColor);
  }

  .option {
    margin: 10px 0 5px 0;
    font-size: 1.1em;
    color: var(--textColor);

    &:before {
      content: "▷";
      margin-right: 5px;
      display: inline-block;
      transition: all 0.2s ease-in-out;
    }

    &.open:before {
      transform: rotate(90deg);
    }
  }
</style>
