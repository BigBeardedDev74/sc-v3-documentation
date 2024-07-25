<script>
  export let open = false,
    title,
    type,
    desc,
    required;
  import { slide } from "svelte/transition";
  const handleClick = () => (open = !open);

  $: requiredText = required === 1 ? "Yes" : "No";
</script>

<div class="configs">
  <div class="header">
    <button class="openButton" on:click={handleClick}>
      <h4 class={open ? "option open" : "option"}>{title}</h4>
    </button>
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
  }

  .configDetails {
    padding: 1rem;
    border: 2px solid #ccc;
    border-radius: 10px;
    background: var(--bgColor);
    margin: 0 2rem 1rem;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  }

  .openButton {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
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
