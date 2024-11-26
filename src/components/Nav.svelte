<script>
  import { page } from "$app/stores";
  import { slide, fade, scale } from "svelte/transition";
  let { isUser } = $props();

  let showNav = false;

  const clickHandler = () => {
    showNav = !showNav;
  };
</script>

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
</style>
