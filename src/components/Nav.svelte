<script>
  import { page } from "$app/stores";
  import { slide, fade, scale } from "svelte/transition";

  let showNav = false;

  const clickHandler = () => {
    showNav = !showNav;
  };
</script>

<div class="navButtonContainer">
  <button on:click={clickHandler} class="navButton">
    {#if !showNav}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 38"
        fill="none"
        in:scale={{ delay: 151, duration: 150 }}
        out:scale={{ duration: 150 }}
      >
        <line
          x1="4"
          y1="34"
          x2="46"
          y2="34"
          stroke="black"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line
          x1="4"
          y1="19"
          x2="36"
          y2="19"
          stroke="black"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line
          x1="4"
          y1="4"
          x2="46"
          y2="4"
          stroke="black"
          stroke-width="8"
          stroke-linecap="round"
        />
      </svg>
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 41 40"
        fill="none"
        in:scale={{ delay: 151, duration: 150 }}
        out:scale={{ duration: 150 }}
      >
        <line
          x1="5.65685"
          y1="4.35547"
          x2="35.3553"
          y2="34.054"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line
          x1="5"
          y1="33.6986"
          x2="34.6985"
          y2="4.00013"
          stroke="white"
          stroke-width="8"
          stroke-linecap="round"
        />
      </svg>
    {/if}
  </button>
</div>

{#if showNav}
  <!-- svelte-ignore a11y-interactive-supports-focus -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="navWrapper"
    on:click={clickHandler}
    role="button"
    transition:slide
  >
    <nav class="nav" in:fade={{ delay: 200 }} out:fade>
      <a href="/" class={$page.data.pathname === "/" ? "active" : ""}
        >New Site Creation</a
      >
      <a
        href="/development"
        class={$page.data.pathname === "/development" ? "active" : ""}
        >Development</a
      >
      <a
        href="/deployment"
        class={$page.data.pathname === "/deployment" ? "active" : ""}
        >Deployment</a
      >
      <a
        href="/config-options"
        class={$page.data.pathname === "/config-options" ? "active" : ""}
        >Config Options</a
      >
      <a
        href="/testing"
        class={$page.data.pathname === "/testing" ? "active" : ""}>Testing</a
      >
      <a
        href="/troubleshooting"
        class={$page.data.pathname === "/troubleshooting" ? "active" : ""}
        >Troubleshooting</a
      >
    </nav>
  </div>
{/if}

<style>
  .navButtonContainer {
    position: absolute;
    top: 30px;
    right: 30px;
    z-index: 100;
  }
  .navButton {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    width: 40px;
    svg {
      width: 100%;
    }
  }
  .navWrapper {
    position: absolute;
    background: oklch(40.12% 0.076 230.01 / 0.9);
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nav {
    width: calc(100% - 40px);
    max-width: 900px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(430px, 1fr));
    align-items: center;
    gap: 20px;
  }
  .nav {
    justify-content: flex-end;
    a {
      color: #fff;
      font-size: clamp(28px, 3.5vw, 40px);
      font-weight: 900;
      text-transform: uppercase;
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.1);
        text-decoration: none;
        text-shadow: none;
      }
      &.active {
        color: var(--secondaryColor);
        text-decoration: underline;
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
</style>
