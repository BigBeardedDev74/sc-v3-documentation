<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Nav from "$components/Nav.svelte";
  import "$css/reset.css";
  import "$css/styles.css";
  import "$css/prism.css";
  import "$css/prism-okaidia.css";
  import { Logo } from "$img";
  import Toggle from "$components/ToggleButton.svelte";
  import { theme } from "$lib/stores";
  import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit";

  export let data;
  let isLoaded = false;

  const validUser = data?.validUser;

  const user = data?.session?.user;

  injectSpeedInsights();
  onMount(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      theme.set("dark");
      isLoaded = true;
      return;
    } else if (
      window.matchMedia("(prefers-color-scheme: dark)").matches &&
      localStorage.getItem("theme") !== "light"
    ) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      theme.set("dark");
      isLoaded = true;
      return;
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      theme.set("light");
      isLoaded = true;
      return;
    }
  });
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Recursive:slnt,wght,CASL,CRSV,MONO@-15..0,300..1000,0..1,0..1,0..1&display=swap"
    rel="stylesheet"
  />
</svelte:head>
{#if isLoaded}
  <header>
    <a href="/">
      <div class="notNav">
        <div class="logoContainer">
          <img src={Logo} alt="Logo" />
        </div>
        <p class="title">V3 - Documentation</p>
      </div>
    </a>

    {#if user}
      <a href="/auth/signout">
        <div class="userContainer">
          {#if user.image}
            <div class="userImageContainer">
              <img src={user?.image} alt="Current User" />
            </div>
          {/if}
          <span>Sign out</span>
        </div>
      </a>
    {:else}
      <a href="/auth/signin">
        <div class="userContainer">
          <span>Sign in</span>
        </div>
      </a>
    {/if}

    <Toggle />
    <Nav isUser={validUser} />
  </header>

  <main>
    {#key data.pathname}
      <div in:fade={{ duration: 150, delay: 155 }} out:fade={{ duration: 150 }}>
        <slot />
      </div>
    {/key}
  </main>
{/if}

<style>
  .notNav {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
  }
  header {
    display: grid;
    grid-template-columns: 1fr 80px 80px;
    gap: 30px;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid var(--borderColor);
    background: var(--bgColor);
    a {
      &:hover {
        --hoverGlow: none;
        text-decoration: none;
      }
    }
  }

  .logoContainer {
    width: clamp(100px, 20vw, 250px);
  }
  .title {
    font-size: clamp(22px, 3.5vw, 40px);
    --wght: "wght" 700;
    --casl: "CASL" 0;
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
  .userImageContainer {
    width: 50px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
  }
  .userContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    a {
      text-decoration: none;
      color: var(--buttonBgColor);
    }
  }
</style>
