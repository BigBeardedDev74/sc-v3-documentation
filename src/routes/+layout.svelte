<script>
  import { fade } from "svelte/transition";
  import { page } from "$app/stores";
  import "$css/reset.css";
  import "$css/styles.css";
  import "$css/prism.css";
  import "$css/prism-okaidia.css";
  import { Logo } from "$img";

  export let data;
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;200;300;400;500;600;700&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
    rel="stylesheet"
  />
</svelte:head>
<header>
  <div class="notNav">
    <div class="logoContainer">
      <img src={Logo} alt="Logo" />
    </div>
    <p class="title">V3 - Documentation</p>
  </div>
  <nav class="nav">
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
</header>
<main>
  {#key data.pathname}
    <div in:fade={{ duration: 150, delay: 155 }} out:fade={{ duration: 150 }}>
      <slot />
    </div>
  {/key}
</main>

<style>
  header {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid var(--borderColor);
    background: var(--bgColor);
  }
  .notNav,
  .nav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
  }
  .nav {
    justify-content: flex-end;
    a {
      color: var(--buttonBgColor);
      transition: all 0.2s ease-in-out;

      &:hover {
        transform: scale(1.1);
        text-decoration: none;
        text-shadow: none;
      }
      &.active {
        color: var(--secondaryColor);
        border-bottom: 2px solid var(--secondaryColor);
        &:hover {
          text-decoration: none;
        }
      }
    }
  }

  .logoContainer {
    width: clamp(100px, 20vw, 250px);
  }
  .title {
    font-size: clamp(22px, 3.5vw, 40px);
    font-weight: 700;
    color: var(--textColor);
    margin: 0;
    text-decoration: none;
  }
  main {
    display: grid;
    grid-template-columns:
      [full-width-start] minmax(var(--padding-inline), 1fr)
      [breakout-start] minmax(0, var(--breakout-size))
      [content-start] min(
        100% - (var(--padding-inline) * 2),
        var(--content-max-width)
      )
      [content-end]
      minmax(0, var(--breakout-size)) [breakout-end]
      minmax(var(--padding-inline), 1fr) [full-width-end];
    padding: 40px 0;

    margin: 0 auto;
  }
  main > :not(.breakout, .full-width),
  .full-width > :not(.breakout, .full-width) {
    grid-column: content;
  }

  main > .breakout {
    grid-column: breakout;
  }

  main > .full-width {
    grid-column: full-width;

    display: grid;
    grid-template-columns: inherit;
  }
</style>
