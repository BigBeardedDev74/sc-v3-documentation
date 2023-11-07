<script>
  import Prism from "svelte-prism";
</script>

<h2>Development</h2>

<section class="section">
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
