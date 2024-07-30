<script lang="ts">
  import Config from "$components/Config.svelte";
  export let data;

  $: console.log("data from +page", data);
</script>

<section class="section">
  <Config configDetails={data.configOptions} />
</section>
