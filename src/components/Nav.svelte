<script>
  import { page } from "$app/stores";
  import { slide, fade, scale } from "svelte/transition";
  let { isUser } = $props();

  let showNav = false;

  const clickHandler = () => {
    showNav = !showNav;
  };
</script>

<!-- <div class="navButtonContainer">
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
          class="navClosed"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line
          x1="4"
          y1="19"
          x2="36"
          y2="19"
          class="navClosed"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line
          x1="4"
          y1="4"
          x2="46"
          y2="4"
          class="navClosed"
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
          class="navOpen"
          stroke-width="8"
          stroke-linecap="round"
        />
        <line
          x1="5"
          y1="33.6986"
          x2="34.6985"
          y2="4.00013"
          class="navOpen"
          stroke-width="8"
          stroke-linecap="round"
        />
      </svg>
    {/if}
  </button>
</div> -->

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->

<nav class="nav" in:fade={{ delay: 200 }} out:fade>
  <a href="/" class={$page.data.pathname === "/" ? "active" : ""}
    >Config Options</a
  >
  <a
    href="/new-site-creation"
    class={$page.data.pathname === "/new-site-creation" ? "active" : ""}
    >New Site Creation</a
  >
  <a
    href="/development"
    class={$page.data.pathname === "/development" ? "active" : ""}
    >Development</a
  >
  <a
    href="/deployment"
    class={$page.data.pathname === "/deployment" ? "active" : ""}>Deployment</a
  >
  <a href="/testing" class={$page.data.pathname === "/testing" ? "active" : ""}
    >Testing</a
  >
  {#if isUser}
    <a
      href="/add-config"
      class={$page.data.pathname === "/add-config" ? "active" : ""}
      >Add Config Option</a
    >
  {/if}
</nav>

<style>
  .navButtonContainer {
    position: absolute;
    top: 42px;
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

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    align-items: center;
    gap: 20px;
  }
  .nav {
    grid-column: 1 / -1;
    a {
      color: var(--textColor);
      font-size: clamp(16px, 2vw, 20px);
      font-weight: 600;
      text-transform: uppercase;
      transition: all 0.2s ease-in-out;
      text-align: center;
      padding: 5px 0;

      &:hover {
        transform: scale(1.1);
        text-decoration: none;
        text-shadow: none;
      }
      &.active {
        color: var(--secondaryColor);
        box-shadow: var(--hoverGlow);
        border-radius: 20px;
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
  .navClosed {
    stroke: var(--textColor);
  }
  .navOpen {
    stroke: #fff;
  }
</style>
