<script>
  import "$css/reset.css";
  import "$css/styles.css";

  import { Logo } from "$img";
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
  <div class="logoContainer">
    <img src={Logo} alt="Logo" />
  </div>
  <p class="title">V3 - Documentation</p>
</header>
<main>
  <slot />
</main>

<style>
  header {
    display: flex;
    gap: 30px;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid var(--borderColor);
    background: var(--bgColor);
  }
  .logoContainer {
    width: clamp(100px, 20vw, 250px);
  }
  .title {
    font-size: clamp(22px, 3.5vw, 40px);
    font-weight: 700;
    color: var(--textColor);
    margin: 0;
  }
  main {
    padding: 40px 0;
    width: calc(100% - 40px);
    max-width: 1170px;
    margin: 0 auto;
  }
</style>
