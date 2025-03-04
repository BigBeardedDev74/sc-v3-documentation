<script>
  import { sites } from "$lib/siteData/allSites.js";

  let { data } = $props();
  const validUser = data?.validUser ?? false;

  const screenshots = import.meta.glob(
    "/src/lib/siteData/screenshots/**/*.webp",
    {
      eager: true,
      as: "url",
    }
  );
</script>

{#if validUser}
  {#each [...new Set(sites.map((site) => site.type))] as type}
    <h2 class="typeHeader">{type}</h2>
    <div class="siteGroup">
      {#each sites.filter((site) => site.type === type) as site}
        <div class="site">
          <div class="siteImage">
            <img
              src={screenshots[
                `/src/lib/siteData/screenshots/${site.type}/${site.site}.webp`
              ]}
              alt={site.site}
            />
          </div>
          <p>
            <a href={`https://${site.site}`} target="_blank">{site.site}</a>
          </p>
        </div>
      {/each}
    </div>
  {/each}
{:else}
  <p>You are not authorized to view this page.</p>
{/if}

<style lang="postcss">
  .typeHeader {
    margin: 2rem 0 1rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--textColor);
  }

  .siteGroup {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .sitesContainer {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  .site {
    border: 1px solid var(--textColor);
    border-radius: 10px;
    overflow: hidden;
    background-color: var(--bgColor);
    p {
      margin-inline: 1em;
    }
  }
  .siteImage {
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    object-fit: cover;
  }
  a {
    color: var(--color-text);
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .typeHeader {
    text-transform: capitalize;
    text-decoration: underline;
  }
</style>
