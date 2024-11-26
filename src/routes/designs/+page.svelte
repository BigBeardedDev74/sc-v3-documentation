<script>
  import { allSites } from "$lib/siteData/allSites.js";

  const screenshots = import.meta.glob(
    "/src/lib/siteData/screenshots/**/*.webp",
    {
      eager: true,
      as: "url",
    }
  );
</script>

<div class="sitesContainer">
  {#each allSites as site}
    <div class="site">
      <div class="siteImage">
        <img
          src={screenshots[
            `/src/lib/siteData/screenshots/${site.type}/${site.site}.webp`
          ]}
          alt={site.site}
        />
      </div>
      <p><a href={`https://${site.site}`} target="_blank">{site.site}</a></p>
    </div>
  {/each}
</div>

<style>
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
</style>
