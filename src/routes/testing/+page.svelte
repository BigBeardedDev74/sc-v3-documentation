<script>
  import Prism from "svelte-prism";
</script>

<h1>Testing</h1>
<section class="section">
  <p>
    Testing is done via the JTK splits platform. We will test changes both to
    the form itself and thank you page. Form changes may be design elements,
    functionality, or adding or removing questions. Thank you page tests are
    typically design changes, but may include functionality changes as well.
  </p>
</section>
<section class="section">
  <h3 class="title">Design Tests</h3>
  <p>
    Design changes are handled using AltStyles files, located in the css folder.
    To make changes first copy the default style sheet into the alt style sheet
    that corresponds to the version number you are testing. So if you are
    testing version=1, make changes to AltStyles1.css. It is important that you
    copy the default css into this file and make changes, because both style
    sheets will be added to the form. So it the test is successful, the default
    style sheet will be removed and the alt style sheet will become the default.
    If the test is unsuccessful, the alt style sheet will be removed and the
    default style sheet will remain. If you fail to copy the default style sheet
    and the test is successful you will have to go through and manually add all
    the changes to the default style sheet, which could be time consuming and
    increase the risk of errors.
  </p>
</section>
<section class="section">
  <h3 class="title">Functionality Tests</h3>
  <p>
    Functionality changes are typically going to be based on config options. So
    in the Config in the database you would add an "AltConfig1". To this alt
    config you will only add the options you want to change or add. The default
    Config will always load and the alt config will overwrite any options with
    the same name, or add any options that don't exist in the original.
  </p>
  <Prism source="">
    {`{
      "Config": [
        {
          "title": "Find My Window Pro",
          "offerId": 4520,
          "gTag": "G-HE1V9CF5T6",
          "anuraTrack": true,
          "gtmContainer": "GTM-TWHNRFM",
          "surveyType": "homeservices",
          "surveyName": "findmywindowpro.com",
          "organicLink": "https://suited45trk.com/?f5c=5iUcwp2MKvpQ4hvYIXjeiNPNdXRxXVOb&cp=js&s1=SUB_ID",
          "headline": "Save Money on Your New Windows Today",
          "useWebHooks": true,
          "textInLogo": false,
          "showStepContainer": true,
          "focusOnLoad": true,
          "showHowThisWorks": true,
          "headlineInHeader": true,
          "GOid": "KWFGLZ7",
          "showNextButtonOnRadioButtons": true,
          "nextButtonIcon": "Chevron",
          "nextButton": "Next",
          "backButton": "",
          "backButtonIcon": "BackButtonCircleArrow",
          "submitButton": "See My Results!",
          "submitButtonIcon": "Chevron",
          "keepHeadlineThroughForm": true,
          "BlindsShutterInterest": true,
          "scData": {
            "siteName": "findmywindowpro.com",
            "siteNameV2": "v3.",
            "siteVertical": "hs_window"
          },
          "hiddenFields": [
            {
              "question": "Residential",
              "value": "Yes"
            },
            {
              "question": "Project",
              "value": "Windows"
            },
            {
              "question": "OwnHome",
              "value": "Own"
            },
            {
              "question": "ProjectType",
              "value": "Replace Unit"
            },
            {
              "question": "HasBlindsShutterInterest",
              "value": "1"
            },
            {
              "question": "Windows",
              "value": "10+"
            },
            {
              "question": "CreditRating",
              "value": "good"
            },
            {
              "question": "MilitaryService",
              "value": "0"
            },
            {
              "question": "ProjectTimeFrame",
              "value": "Timing Flexible"
            }
          ]
        }
      ],
      "AltConfig1": [
        {
          "showStepContainer": false,
          "showHowThisWorks": false,
          "headlineInHeader": false,
          "nextButtonIcon": "",
          "showNextButtonOnRadioButtons": false,
          "topStepper": true,
          "showProgressBar": false,
          "nextButton": "Next",
          "backButton": "Back",
          "showInItForYou": true,
          "backButtonIcon": "",
          "keepHeadlineThroughForm": false
        }
      ]
    }`}
  </Prism>
</section>
<section class="section">
  <h3 class="title">Adding or Removing Questions</h3>
  <p>
    To test the adding or removing of questions we use the questions in the
    database and add an AltQuestions1. For this, duplicate Questions and then
    add or remove any additional questions. If you are adding a conditional
    question the conditions will need to be added to the config as well. Also
    double check the styling to ensure it is what you are looking for.
  </p>
</section>
