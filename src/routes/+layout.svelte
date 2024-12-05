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

  let { data, children } = $props();
  let isLoaded = $state(false);

  const validUser = data?.validUser;

  const user = data?.session?.user;

  $inspect(validUser.role);
  function closePopover() {
    document.getElementById("adminMenu")?.hidePopover();
  }

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
      <div class="userContainer">
        {#if user.image}
          <button class="userImageContainer" popovertarget="adminMenu">
            <img src={user?.image} alt="Current User" />
          </button>
        {/if}
      </div>
      <dialog id="adminMenu" popover class="adminMenu">
        {#if validUser.role === "admin"}
          <a
            href="/users"
            onclick={() => {
              closePopover();
            }}>Users</a
          >
        {/if}
        <a
          href="/auth/signout"
          onclick={() => {
            closePopover();
          }}>Log Out</a
        >
      </dialog>
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
      <div
        in:fade={{ duration: 150, delay: 155 }}
        out:fade={{ duration: 150 }}
        class="content"
      >
        {@render children?.()}
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
      width: fit-content;
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
    anchor-name: --userImageContainer;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    display: grid;
    place-items: center;
    padding: 0;
    margin: 0;
    cursor: pointer;
    img {
      width: 100%;
      margin: 0;
      padding: 0;
    }
  }
  .adminMenu {
    position: absolute;
    position-anchor: --userImageContainer;
    border: none;
    opacity: 0;
    display: grid;
    gap: 10px;
    top: anchor(bottom);
    left: anchor(left);
    padding-inline: 1.5rem;
    padding-block: 1rem;
    border-radius: 10px;
    margin: 0;
    background: var(--bgColor);
    margin-block-start: 1rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
    transition:
      display 0.3s ease-in-out,
      opacity 0.3s ease-in-out;
    transition-behavior: allow-discrete;
    &:popover-open {
      display: grid;

      opacity: 1;

      @starting-style {
        display: grid;
        opacity: 0;
      }
    }
  }
</style>
