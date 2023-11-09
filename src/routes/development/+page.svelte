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
</section>
<section class="section">
  <h3 class="title">CSS Changes</h3>
  <p>
    Style changes are handled in the styles.css file. They site is component
    based and those components are build using css variables. The first portion
    of the style sheet is a list of variables that can be used to changes
    elements of the form. The remaining styles are also handled within that
    page.
  </p>
</section>

<section class="section">
  <h3 class="title">Components</h3>
  <p>
    Some changes need to be done on a component level, however these are shared
    components so it is important that any updates do not impact other sites.
  </p>
</section>
