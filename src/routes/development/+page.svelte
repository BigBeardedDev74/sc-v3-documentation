<script>
  import Prism from "svelte-prism";
</script>

<h2>Development</h2>

<section class="section">
  <h3 class="title">Dev Mode</h3>
  <p>
    Once you have completed all the set up for a new site you're ready to start
    development. There are 2 options to run the dev server:
  </p>
  <Prism source="">
    {`pnpm dev {site name}`}
  </Prism>
  <p style="text-align: center">-or-</p>
  <Prism source="">
    {`pnpm -F {site name} dev`}
  </Prism>
  <p>
    Once the dev server is running you can view the site at <a
      href="http://localhost:3000"
      target="_blank">localhost:3000</a
    >. The site will automatically reload as you make changes to the code.
  </p>
  <p>
    If you are making changes to and of the packages, questions, components,
    api, thankyou, stores or utils, you will need to repackage when you make a
    change.
  </p>
  <Prism source="">
    {`pnpm -F questions package`}
  </Prism>
  <p>Substitute the appropriate package name for <em>questions</em></p>

  <p>
    Alternatively, you can watch a package if you are making multiple changes
  </p>
  <Prism source="">
    {`pnpm -F questions package:watch`}
  </Prism>
</section>
<section class="section">
  <h3 class="title">CSS Changes</h3>
  <p>
    Style changes are handled in the styles.css file. They site is component
    based and those components are build using css variables. The first portion
    of the style sheet is a list of variables that can be used to changes
    elements of the form. The remaining styles are also handled within that
    page. If the styles are for a test they will be in the AltStyles1.css file.
    The number at the end of the AltStyles will correspond to the test number.
    We currently use 1-8. If you add a new alt styles file you will need to
    include the :root variables at the top of the file. The styles are not
    inherited from the default styles.css file. So if you want to use the
    default styles as a base, it is best to cope and paste the styles.css sheet
    into the new alt styles file, then make your changes.
  </p>
</section>

<section class="section">
  <h3 class="title">Components</h3>
  <p>
    Some changes need to be done on a component level, however these are shared
    components so it is important that any updates do not impact other sites.
    The best way to do this is to control any variations with a config option.
  </p>
</section>
