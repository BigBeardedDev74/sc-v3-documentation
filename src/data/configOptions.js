const configOptions = [
  {
    title: "title",
    type: "string",
    desc: "Title for the page tab",
    required: true,
  },
  {
    title: "offerId",
    type: "integer",
    desc: "offer id from cake, this will be provided in the new site ticket",
    required: true,
  },
  {
    title: "surveyName",
    type: "string",
    desc: "name of site (harpquiz.com)",
    required: true,
  },
  {
    title: "surveyType",
    type: "string",
    desc: "home services, insurance, mortgage",
    required: true,
  },
  {
    title: "organicLink",
    type: "string",
    desc: "this needs to be created in cake based on the offer id",
    required: true,
  },
  {
    title: "gTag",
    type: "string",
    desc: "GA 4 Tracking ID (G-XXXXXXXXXX)",
    required: true,
  },

  {
    title: "gtmContainer",
    type: "string",
    desc: "GTM container you want to load: ‘GTM-TWHNRFM’",
    required: true,
  },
  {
    title: "hiddenFields",
    type: "array of objects",
    desc: `Hidden fields you want to pass to backend. If no values are being passed, pass an empty array: 
      <div>Example:
      <code class="configCodeBlock">
      "hiddenFields": [
        {"question": "ProjectType", "value": "Roofing"}
        ]
      </code>
      </div>`,
    required: true,
  },
  {
    title: "scData",
    type: "object",
    desc: `includes 3 elements: 
      <ul>
        <li>siteName:string - {site name}</li> 
        <li>siteVertical:string - {sub vertical}</li>
        <li>siteNameV2:string - current platform, ie: "v3"</li>
      </ul>
      <div>Example: 
      <code class="configCodeBlock">
      "scData": {
        <p class="codeIndent">siteName: "bathremodelspecialists.com",</p>
        <p class="codeIndent">siteVertical: "hs_br",</p>
        <p class="codeIndent">siteNameV2: "v3."</p>}
      </code>
      </div>
      `,
    required: true,
  },
  {
    title: "isSCLabs",
    type: "boolean",
    desc: "is the site a sclabs site",
    required: false,
  },

  {
    title: "textInLogo",
    type: "string",
    desc: "add text to Logo instead of just using an image",
    required: false,
  },
  {
    title: "showStepContainer",
    type: "boolean",
    desc: "3 step container used on mostly window sites. ‘Enter zip, add details, find pros’.",
    required: false,
  },
  {
    title: "showHowThisWorks",
    type: "boolean",
    desc: "show how this works",
    required: false,
  },
  {
    title: "headline",
    type: "string",
    desc: "headline you want to use",
    required: false,
  },
  {
    title: "subHeadline",
    type: "string",
    desc: "sub headline you want to use",
    required: false,
  },
  {
    title: "headlineInHeader",
    type: "boolean",
    desc: "show headline in the header. Default is shown in the body.",
    required: false,
  },
  {
    title: "gutterStepper",
    type: "boolean",
    desc: "show new gutter stepper",
    required: false,
  },
  {
    title: "stepperType",
    type: "string",
    desc: "‘mobileAndDesktopStepper’",
    required: false,
  },

  {
    title: "additionalGutterSubHeadline",
    type: "boolean",
    desc: "show additional sub headline",
    required: false,
  },
  {
    title: "dualPath",
    type: "boolean",
    desc: "site has a dual path ie. refi/purchase",
    required: false,
  },
  {
    title: "howThisWorksLocation",
    type: "string",
    desc: "location of how this works. ‘inside form’, ‘outside form’",
    required: false,
  },
  {
    title: "showRoofingHowThisWorks",
    type: "boolean",
    desc: "for roofing",
    required: false,
  },
  {
    title: "showGutterInItForYou",
    type: "boolean",
    desc: "for gutters",
    required: false,
  },
  {
    title: "keepHeadlineThroughForm",
    type: "boolean",
    desc: "keeps headline through the whole form minus final frame",
    required: false,
  },
  {
    title: "keepHeadlineOnFinalFrame",
    type: "boolean",
    desc: "keeps headline through whole form including final frame",
    required: false,
  },
  {
    title: "progressBar",
    type: "boolean",
    desc: "show progress bar",
    required: false,
  },
  {
    title: "showProgressPercentage",
    type: "boolean",
    desc: "show progress bar percentage",
    required: false,
  },
  {
    title: "progressTitle",
    type: "string",
    desc: "progress title you want shown",
    required: false,
  },
  {
    title: "mortgageSteps",
    type: "boolean",
    desc: "new mortgage stepper",
    required: false,
  },
  {
    title: "nextButton",
    type: "string",
    desc: "next button text",
    required: false,
  },
  {
    title: "submitButton",
    type: "string",
    desc: "submit button text",
    required: false,
  },
  {
    title: "buttonReverse",
    type: "boolean",
    desc: "show back button before next button",
    required: false,
  },
  {
    title: "showNextButtonOnRadioButtons",
    type: "boolean",
    desc: "show next button when radio buttons are present.",
    required: false,
  },
  {
    title: "backButtonOnMobileOnly",
    type: "boolean",
    desc: "show back button only on mobile",
    required: false,
  },
  {
    title: "tcpaBeforeButton",
    type: "string",
    desc: "show TCPA before submit button. Solar",
    required: false,
  },
  {
    title: "nextButtonIcon",
    type: "string",
    desc: "type of icon you want next to the next button",
    required: false,
  },
  {
    title: "submitButtonIcon",
    type: "string",
    desc: "type of icon you want next to the submit button",
    required: false,
  },
  {
    title: "backButtonIcon",
    type: "string",
    desc: "back button image instead of the word back",
    required: false,
  },
  {
    title: "showStepsInForm",
    type: "boolean",
    desc: "question 1 of …",
    required: false,
  },
  {
    title: "stepText",
    type: "string",
    desc: "change the word question to desired word",
    required: false,
  },
  {
    title: "keepBackButtonOnFinalFrame",
    type: "boolean",
    desc: "show back button on final frame",
    required: false,
  },
  {
    title: "tcpaInForm",
    type: "boolean",
    desc: "show tcpa in the form",
    required: false,
  },
  {
    title: "anuraTrack",
    type: "boolean",
    desc: "turn Anura tracking on and off",
    required: false,
  },
  {
    title: "offerId",
    type: "integer",
    desc: "offer id from cake",
    required: false,
  },
  {
    title: "organicLink",
    type: "string",
    desc: "organic cake pixel value",
    required: false,
  },
  {
    title: "useWebHooks",
    type: "boolean",
    desc: "turn web hook tracking",
    required: false,
  },
];
export default configOptions;
