<script>
  import Accordion from "$components/Accordion.svelte";
  import Prism from "svelte-prism";
</script>

<h2>Getting Started:</h2>

<section class="section packageManager" id="packageManager">
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

  <Prism source="">
    {`pnpm copy {existing site name} {new site name}`}
  </Prism>

  <p>
    If you are using an existing design but moving to a different vertical, add
    the vertical to the end of the command:
  </p>
  <Prism source="">
    {`pnpm copy {existing site name} {new site name} {vertical}`}
  </Prism>
</section>
<section class="section testSite">
  <h3 class="title">Test the new site</h3>
  <p>There are 2 options to run the dev</p>
  <Prism source="">
    {`pnpm dev {site name}`}
  </Prism>
  <p style="text-align: center">-or-</p>
  <Prism source="">
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

<section class="section dbSetup">
  <h3 class="title">Database Setup</h3>

  <h4 class="subTitle">Add Site</h4>

  <p>
    The site needs to be configured in the database, first go to <a
      href="https://jtk.printfinger.tech/sites/survey-sites"
      target="_blank">jtk.printfinger.tech/sites/survey-sites</a
    > and click the 'Add Survey Site' button.
  </p>
  <p>Fill out the form with the following information:</p>
  <ul>
    <li>Site URL - do not include "https://"</li>
    <li>
      Staging Sub Domain - if the site is on a subdomain add "v3-" otherwise add
      "v3."
    </li>
    <li>Site Type - select from the dropdown</li>
    <li>Site-Vertical - select from the dropdown</li>
  </ul>

  <p>
    You have likely not set up the staging and production cloudfronts yet and S3
    Staging Bucket will default to "v3stage.com", which is what you want, so
    click save.
  </p>
  <h4 class="subTitle">Config</h4>

  <p>
    Next, go to <a
      href="https://jtk.printfinger.tech/sites/config-editor"
      target="_blank"
    >
      jtk.printfinger.tech/sites/config-editor
    </a>
    , you can also click "Sites > Config Editor" in the sidebar. The easiest thing
    to do is grab and existing config (best to grab the one from the site you based
    the new site off of). Paste it into your editor and update all the elements that
    need to be changed (ie. title, siteName, offerId, etc). Please note that all
    the boolean values default to false, so if you are changing one from true you
    can simple remove it. Once you have updated the config, return to the config
    editor and click the "Create" button in the config column for the new site. Paste
    the config into the editor and click submit.
  </p>

  <p>
    Once you have updated the config, go to the 'utils>backupSiteData.js' file
    for the new site and update the defaultConfig with the new config
  </p>
  <p>
    There are config options to control many of the elements of the sites. See
    the complete list of <a href="#config">config options</a> and what they do below.
  </p>

  <h4 class="subTitle">Questions</h4>
  <p>
    If you are using the same questions from the site you replicated, you can
    copy the questions from that site on the config editor page. Then return to
    the new page click "Create" in the questions, paste the questions and click
    submit. No need to update the backupSiteData as it will pull from the
    database and rebuild when the site is staged.
  </p>
</section>

<section class="section config" id="config">
  <h3 class="title">Config Example</h3>
  <Prism source="">
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
