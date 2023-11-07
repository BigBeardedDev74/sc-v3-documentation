<script>
  import Accordion from "$components/Accordion.svelte";
  import { fly, fade } from "svelte/transition";
  import "$css/prism.css";
  import "$css/prism-okaidia.css";
  import Prism from "svelte-prism";
  import configOptions from "$data/configOptions";

  let configDetails = configOptions;

  configDetails.sort((a, b) => {
    if (a.required && b.required) {
      return 0;
    }
    if (a.required) {
      return -1;
    }
    if (b.required) {
      return 1;
    }
    return a.title.localeCompare(b.title);
  });
</script>

<h2>Getting Started:</h2>

<section class="section packageManager" id="packageManager" transition:fade>
  <h3 class="title">Package Management</h3>
  <p>
    We are using PNPM as our package manager, all commands will be done using
    pnpm.
  </p>
</section>

<section class="section newSite" id="newSite">
  <h3 class="title">Create a new site</h3>
  <p>
    Start by copying and existing site (you can create a site from scratch but
    it'll be more work than it's worth):
  </p>

  <Prism>
    {`pnpm copy {existing site name} {new site name}`}
  </Prism>

  <p>
    If you are using an existing design but moving to a different vertical, add
    the vertical to the end of the command:
  </p>
  <Prism>
    {`pnpm copy {existing site name} {new site name} {vertical}`}
  </Prism>
</section>
<section class="section testSite">
  <h3 class="title">Test the new site</h3>
  <p>There are 2 options to run the dev</p>
  <Prism>
    {`pnpm dev {site name}`}
  </Prism>
  <p>-or-</p>
  <Prism>
    {`pnpm -F {site name} dev`}
  </Prism>
  <p>
    The new site will be available on <a
      href="http://localhost:3000"
      target="_blank"
      class="address"
    >
      localhost:3000
    </a>

    The site can be dev'd at this point however it will pull the information
    from the site it was copied from. See the
    <a href="#config">Config section</a> for more info.
  </p>
</section>

<section class="section config" id="config">
  <div class="titleContainer">
    <h3 class="title">Config Options</h3>
    <div class="buttonContainer">
      <button
        on:click={() => {
          configDetails = configOptions;
        }}>All</button
      >
      <button
        on:click={() =>
          (configDetails = configOptions.filter(
            (option) => option.required === true
          ))}>Required</button
      >
      <button
        on:click={() =>
          (configDetails = configOptions.filter(
            (option) => option.required === false
          ))}>Optional</button
      >
    </div>
  </div>
  {#each configDetails as option, i}
    <div
      in:fly={{ x: -200, duration: 25 * i }}
      out:fly={{ x: 200, duration: 25 * i }}
    >
      <Accordion
        title={option.title}
        type={option.type}
        desc={option.desc}
        required={option.required}
      />
    </div>
  {/each}
  <h3 class="title">Config Example</h3>
  <Prism>
    {`{
  "Config": [
    {
      "title": "Find My Gutter Pro",
      "offerId": 4696,
      "anuraTrack": true,
      "gTag": "G-VG59X3Q6FF",
      "gtmContainer": "GTM-TWHNRFM",
      "surveyType": "homeservices",
      "surveyName": "findmygutterpro.com",
      "organicLink": "https://suited45trk.com/?bbz=lSMA4bl%2fMofkHbQf%2brERHNPNdXRxXVOb&cp=js&s1=SUB_ID",
      "GOid": "",
      "headline": "Compare Quotes From Top-Rated Gutter Experts",
      "subHeadline": "30-second form! Find your Pro!",
      "useWebHooks": true,
      "gutterStepper": true,
      "headlineInHeader": false,
      "backButton": "Back",
      "nextButton": "Next",
      "focusOnLoad": true,
      "textInLogo": "",
      "additionalGutterSubHeadline": true,
      "showGutterInItForYou": true,
      "submitButton": "View My Pros!",
      "submitButtonIcon": "none",
      "scData": {
        "siteName": "findmygutterpro.com",
        "siteNameV2": "v3.",
        "siteVertical": "hs_gutter"
      },
      "hiddenFields": [
        {
          "question": "Residential",
          "value": "Yes"
        },
        {
          "question": "Project",
          "value": "Gutters"
        },
        {
          "question": "PropertyType",
          "value": "Single Family"
        }
      ]
    }
  ]
}`}
  </Prism>
</section>

<style lang="postcss">
  .section {
    padding: 1rem;
    border: 2px solid #ccc;
    border-radius: 10px;
    margin-bottom: 2rem;
    background: var(--bgColor);
    overflow-x: hidden;
  }
  .title {
    text-decoration: underline;
  }
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
  .titleContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  button {
    margin: 0 0 0 1rem;
    background: var(--buttonBgColor);
    color: var(--buttonTextColor);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
    &:hover {
      background: oklch(47.44% 0.077 233.06);
    }
  }
</style>
