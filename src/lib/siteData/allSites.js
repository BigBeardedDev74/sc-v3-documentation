const sites = [
  { site: "autorefi.loan.info", type: "finance" },
  { site: "abcroofingusa.com", type: "homeservices" },
  { site: "americansolarprograms.com", type: "homeservices" },
  { site: "bath-remodel-pros.org", type: "homeservices" },
  { site: "bath.serviceselector.net", type: "homeservices" },
  { site: "bathremodel.homeownersguide.net", type: "homeservices" },
  { site: "bathremodel.myhomepros.com", type: "homeservices" },
  { site: "bathremodel2.myhomepros.com", type: "homeservices" },
  { site: "bathremodel3.myhomepros.com", type: "homeservices" },
  { site: "bathremodelingspecialists.com", type: "homeservices" },
  { site: "bathremodelspecialists.com", type: "homeservices" },
  { site: "costcuttingsolar.com", type: "homeservices" },
  { site: "doors.myhomepros.com", type: "homeservices" },
  { site: "eliteroofingsurvey.com", type: "homeservices" },
  { site: "elitewindowsurvey.com", type: "homeservices" },
  { site: "findmybathpro.com", type: "homeservices" },
  { site: "findmydoorpro.com", type: "homeservices" },
  { site: "findmygutterpro.com", type: "homeservices" },
  { site: "findmylocalbathpro.com", type: "homeservices" },
  { site: "findmylocalwindowpro.com", type: "homeservices" },
  { site: "findmyroofingpro.com", type: "homeservices" },
  { site: "findmysidingpro.com", type: "homeservices" },
  { site: "findmysolarpro.com", type: "homeservices" },
  { site: "findmywalkintubpro.com", type: "homeservices" },
  { site: "findmywindowexpert.com", type: "homeservices" },
  { site: "findmywindowpro.com", type: "homeservices" },
  { site: "gutters.homeownersguide.net", type: "homeservices" },
  { site: "gutters.myhomepros.com", type: "homeservices" },
  { site: "gutters.serviceselector.net", type: "homeservices" },
  { site: "homebath-pro.com", type: "homeservices" },
  { site: "homeroof-pro.com", type: "homeservices" },
  { site: "homesolarclub.com", type: "homeservices" },
  { site: "homewindow-pro.com", type: "homeservices" },
  { site: "hvac.myhomepros.com", type: "homeservices" },
  { site: "metrohomesolar.com", type: "homeservices" },
  { site: "nationwidewindowpros.com", type: "homeservices" },
  { site: "qualifiedsolarsurvey.com", type: "homeservices" },
  { site: "qualifysolarsurvey.com", type: "homeservices" },
  { site: "roofing.homeownersguide.net", type: "homeservices" },
  { site: "roofing.myhomepros.com", type: "homeservices" },
  { site: "roofing.serviceselector.net", type: "homeservices" },
  { site: "roofingserviceshome.com", type: "homeservices" },
  { site: "roofprostoday.com", type: "homeservices" },
  { site: "saviorwindows.com", type: "homeservices" },
  { site: "siding.myhomepros.com", type: "homeservices" },
  { site: "signup.solarenergyincentiveprogram.com", type: "homeservices" },
  { site: "solar.homeownersguide.net", type: "homeservices" },
  { site: "solar.myhomepros.com", type: "homeservices" },
  { site: "solar.serviceselector.net", type: "homeservices" },
  { site: "solar.smarthomemortgages.com", type: "homeservices" },
  { site: "solarenergybonus.com", type: "homeservices" },
  { site: "solarhomessolution.com", type: "homeservices" },
  { site: "solarprostoday.com", type: "homeservices" },
  { site: "solarqualifiedhome.com", type: "homeservices" },
  { site: "sunwaysolarsystems.com", type: "homeservices" },
  { site: "trustedroofingresource.com", type: "homeservices" },
  { site: "try.get-bathroom.com", type: "homeservices" },
  { site: "walkintub.myhomepros.com", type: "homeservices" },
  { site: "windowandhomesolutions.com", type: "homeservices" },
  { site: "windowprostoday.com", type: "homeservices" },
  { site: "windows.homeownersguide.net", type: "homeservices" },
  { site: "windows.myhomepros.com", type: "homeservices" },
  { site: "windows.serviceselector.net", type: "homeservices" },
  { site: "windows.smarthomemortgages.com", type: "homeservices" },
  { site: "windowsinfopro.com", type: "homeservices" },
  { site: "windowsremodelnow.org", type: "homeservices" },
  { site: "yournationwidesolar.com", type: "homeservices" },
  { site: "americanhealthpros.com", type: "insurance" },
  { site: "auto.homeownersguide.net", type: "insurance" },
  { site: "auto.serviceselector.net", type: "insurance" },
  { site: "autogo2.insurancespecialists.com", type: "insurance" },
  { site: "autogo2savings.com", type: "insurance" },
  { site: "autosavertoday.com", type: "insurance" },
  { site: "dailyprosperhealth.com", type: "insurance" },
  { site: "findyourhealthpro.com", type: "insurance" },
  { site: "health.insurancespecialists.com", type: "insurance" },
  { site: "health2.insurancespecialists.com", type: "insurance" },
  { site: "health3.insurancespecialists.com", type: "insurance" },
  { site: "healthsavingsselect.com", type: "insurance" },
  { site: "home.insurancespecialists.com", type: "insurance" },
  { site: "insuranceprofinders.com", type: "insurance" },
  { site: "life.insurancespecialists.com", type: "insurance" },
  { site: "localamericanhealthexperts.com", type: "insurance" },
  { site: "localhealthinsurancepro.com", type: "insurance" },
  { site: "localhealthselect.com", type: "insurance" },
  { site: "localhealthspecialist.com", type: "insurance" },
  { site: "localinsurancespecialist.com", type: "insurance" },
  { site: "med.insurancespecialists.com", type: "insurance" },
  { site: "med.usmedicarepros.com", type: "insurance" },
  { site: "med2.insurancespecialists.com", type: "insurance" },
  { site: "med4.insurancespecialists.com", type: "insurance" },
  { site: "medical.insurancespecialists.com", type: "insurance" },
  { site: "medicare.insurancespecialists.com", type: "insurance" },
  { site: "myauto.insurancespecialists.com", type: "insurance" },
  { site: "myautoins.insurancespecialists.com", type: "insurance" },
  { site: "officialautosurvey.com", type: "insurance" },
  { site: "simplehealthpro.com", type: "insurance" },
  { site: "simplehealthprofessionals.com", type: "insurance" },
  { site: "simplehealthselect.com", type: "insurance" },
  { site: "simplehealthselectusa.com", type: "insurance" },
  { site: "simplemedselect.com", type: "insurance" },
  { site: "trustedhomesurvey.com", type: "insurance" },
  { site: "trustedmedicalsurvey.com", type: "insurance" },
  { site: "usahealthadvisorpros.com", type: "insurance" },
  { site: "usahealthexperts.com", type: "insurance" },
  { site: "usahealthprofessionals.com", type: "insurance" },
  { site: "usahealthpros.com", type: "insurance" },
  { site: "usahealthspecialist.com", type: "insurance" },
  { site: "yourhealthfinders.com", type: "insurance" },
  { site: "yourhealthprofinder.com", type: "insurance" },
  { site: "yourlocalhealthexperts.com", type: "insurance" },
  { site: "3708savings.com", type: "mortgage" },
  { site: "cashequityprograms.com", type: "mortgage" },
  { site: "cashoutwithhomeequity.com", type: "mortgage" },
  { site: "clickandgocashout.com", type: "mortgage" },
  { site: "clickandgocashout.govhomeprograms.com", type: "mortgage" },
  { site: "clickandgohomebuy.com", type: "mortgage" },
  { site: "downpayment-survey.com", type: "mortgage" },
  { site: "downpaymentsurvey.com", type: "mortgage" },
  { site: "enhanced-relief.com", type: "mortgage" },
  { site: "enhancedrelief.com", type: "mortgage" },
  { site: "fedbackedprograms.com", type: "mortgage" },
  { site: "fedloanoptions.com", type: "mortgage" },
  { site: "fedscutrates.com", type: "mortgage" },
  { site: "fedsrateupdate.com", type: "mortgage" },
  { site: "fhaquiz.com", type: "mortgage" },
  { site: "govhomeprograms.com", type: "mortgage" },
  { site: "harpquiz.com", type: "mortgage" },
  { site: "lenderqualified.com", type: "mortgage" },
  { site: "mortgage.ebridgefinancial.com", type: "mortgage" },
  { site: "mycashoutquiz.com", type: "mortgage" },
  { site: "onepercentpurchase.com", type: "mortgage" },
  { site: "purchase.homeownersguide.net", type: "mortgage" },
  { site: "purchase.serviceselector.net", type: "mortgage" },
  { site: "qualifytodayva.com", type: "mortgage" },
  { site: "refinance.homeownersguide.net", type: "mortgage" },
  { site: "refinance.serviceselector.net", type: "mortgage" },
  { site: "secure.blownmortgage.com", type: "mortgage" },
  { site: "secure.downpaymentassistanceprograms.org", type: "mortgage" },
  { site: "secure.dpasearch.com", type: "mortgage" },
  { site: "secure.fhastreamlinemortgage.com", type: "mortgage" },
  { site: "secure.irrrl.com", type: "mortgage" },
  { site: "signup.govbackedhousingprograms.com", type: "mortgage" },
  { site: "signup.homequizveteran.com", type: "mortgage" },
  { site: "trustedrefisurvey.com", type: "mortgage" },
  { site: "trustedvasurvey.com", type: "mortgage" },
  { site: "vasurveyinfo.com", type: "mortgage" },
  { site: "yourvasurvey.info", type: "mortgage" },
  { site: "claimyourhealthcoverage.com", type: "other" },
  { site: "findmymedicare.insurancespecialists.com", type: "other" },
  { site: "medicosespecialistassalud.com", type: "other" },
  { site: "mylife.insurancespecialists.com", type: "other" },
  { site: "mymedicare.insurancespecialists.com", type: "other" },
  { site: "myotcmedicarecard.insurancespecialists.com", type: "other" },
];
export { sites };
