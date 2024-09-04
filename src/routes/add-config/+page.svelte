<script>
  export let data;
  import Toast from "$components/Toast.svelte";

  let configOptions = data.configOptions;
  const validUser = data.validUser;

  const titles = configOptions.map((option) => option.title.toLowerCase());

  let fields = {
    title: "",
    desc: "",
    type: "string",
    required: "0",
    keywords: "",
    createdBy: validUser?.user_name,
  };
  $: showPopover = false;

  let errors = { title: "", desc: "" };

  let formIsValid = false;

  const validateField = (fieldName, value) => {
    let error = "";
    switch (fieldName) {
      case "title":
        if (value.length < 2) {
          errors.title = "You must enter a title";
        } else if (titles.includes(value.toLowerCase())) {
          errors.title = "This title already exists";
        } else {
          errors.title = "";
        }
        break;
      case "desc":
        if (value.length < 2) {
          errors.desc = "You must enter a description";
        } else {
          errors.desc = "";
        }
        break;
    }
    return error;
  };

  const handleSubmit = async (e) => {
    formIsValid = true;

    const formData = new FormData(e.currentTarget);

    if (fields.title.length < 2) {
      formIsValid = false;
      errors.title = "You must enter a title";
    } else if (titles.includes(fields.title.toLowerCase())) {
      formIsValid = false;
      errors.title = "This title already exists";
    } else {
      errors.title = "";
    }

    if (fields.desc.length < 2) {
      formIsValid = false;
      errors.desc = "You must enter a description";
    } else {
      errors.desc = "";
    }

    if (formIsValid) {
      try {
        const response = await fetch(e.currentTarget.action, {
          method: "POST",
          body: formData,
        });
        fields = {
          title: "",
          desc: "",
          type: "string",
          required: "0",
          keywords: "",
          createdBy: validUser?.user_name,
        };
        showPopover = true;
        setTimeout(() => (showPopover = false), 3250);
      } catch (error) {
        console.log(error);
      }
    }
  };
</script>

{#if !validUser}
  <section class="section">
    <h3 class="oops">
      It looks like you don't have permission to access this page.
    </h3>
    <h3 class="oops">
      To request access please reach out to one of the members of the front end
      team.
    </h3>
    <a href="/" class="button is-link">Back to home</a>
  </section>
{:else}
  <Toast {showPopover} message="New Config Added!" />

  <section class="section">
    <h3 class="title">Add a New Config Option</h3>
    <form
      action="?/addConfigOption"
      on:submit|preventDefault={handleSubmit}
      class="form"
    >
      <div class="field">
        <label class="label" for="title">Title:</label>
        <input
          class="input"
          type="text"
          placeholder="Title"
          id="title"
          name="title"
          bind:value={fields.title}
          on:blur={() => validateField("title", fields.title)}
        />
        <p class="error">{errors.title}</p>
      </div>
      <div class="field">
        <label class="label" for="description">Description:</label>
        <textarea
          class="input"
          placeholder="Description"
          name="desc"
          id="description"
          bind:value={fields.desc}
          on:blur={() => validateField("desc", fields.desc)}
        />
        <p class="error">{errors.desc}</p>
      </div>
      <div class="multiFields">
        <div class="field">
          <p class="label">Config Type:</p>
          <div class="radioGroup">
            <input
              type="radio"
              name="type"
              id="type"
              value="string"
              checked
              bind:group={fields.type}
            />
            <label class="label radioLabel" for="type">String</label>
            <input
              type="radio"
              name="type"
              id="number"
              value="number"
              bind:group={fields.type}
            />
            <label class="label radioLabel" for="number">Number</label>
            <input
              type="radio"
              name="type"
              id="boolean"
              value="boolean"
              bind:group={fields.type}
            />
            <label class="label radioLabel" for="boolean">Boolean</label>
          </div>
        </div>

        <div class="field">
          <p class="label">Is this item Required:</p>
          <div class="radioGroup">
            <input
              type="radio"
              name="required"
              id="notRequired"
              value="0"
              bind:group={fields.required}
            />
            <label class="label radioLabel" for="notRequired"
              >Not Required</label
            >
            <input
              type="radio"
              name="required"
              id="isRequired"
              value="1"
              bind:group={fields.required}
            />
            <label class="label radioLabel" for="isRequired">Required</label>
          </div>
        </div>
      </div>
      <div class="field">
        <label class="label" for="keywords">
          Keywords <span class="small">
            (add search terms that are not included in the description)
          </span>:
        </label>
        <input
          class="input"
          type="text"
          placeholder="Keywords"
          id="keywords"
          name="keywords"
          bind:value={fields.keywords}
        />
      </div>
      <input type="hidden" name="createdBy" value={validUser?.user_name} />

      <div class="field">
        <button class="button is-link" type="submit">Add</button>
      </div>
    </form>
  </section>
{/if}

<style>
  button {
    margin: 2em auto;
    width: 300px;
    height: 50px;
    background: var(--buttonBgColor);
    color: var(--buttonTextColor);
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition:
      box-shadow 0.3s ease-in-out,
      scale 0.3s ease-in-out;
    font-size: 1.4rem;
    font-weight: 700;
    &:hover {
      box-shadow: var(--hoverGlow);
      scale: 1.1;
    }
  }
  .imageContainer {
    width: 40px;
  }
  .multiFields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    margin-bottom: 1em;
  }
  label,
  .label {
    font-size: 1.2rem;
    --wght: "wght" 700;
  }
  .radioLabel {
    --wght: "wght" 400;
  }
</style>
