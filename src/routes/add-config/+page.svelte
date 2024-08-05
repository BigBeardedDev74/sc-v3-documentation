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
  <Toast {showPopover} message="🏁 --- New Config Added! --- 🏁" />

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
      <div class="field">
        <p class="label">Type:</p>
        <div class="radioGroup">
          <input
            type="radio"
            name="type"
            id="type"
            value="string"
            checked
            bind:group={fields.type}
          />
          <label class="label" for="type">String</label>
          <input
            type="radio"
            name="type"
            id="number"
            value="number"
            bind:group={fields.type}
          />
          <label class="label" for="number">Number</label>
          <input
            type="radio"
            name="type"
            id="boolean"
            value="boolean"
            bind:group={fields.type}
          />
          <label class="label" for="boolean">Boolean</label>
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
      <div class="field">
        <p class="label">Required:</p>
        <div class="radioGroup">
          <input
            type="radio"
            name="required"
            id="notRequired"
            value="0"
            bind:group={fields.required}
          />
          <label class="label" for="notRequired">Not Required</label>
          <input
            type="radio"
            name="required"
            id="isRequired"
            value="1"
            bind:group={fields.required}
          />
          <label class="label" for="isRequired">Required</label>
        </div>
      </div>
      <input type="hidden" name="createdBy" value={validUser?.user_name} />

      <div class="field">
        <button class="button is-link" type="submit">Add</button>
      </div>
    </form>
  </section>
{/if}

<style>
  .form {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
  }
  input[type="text"] {
    height: 50px;
    padding: 0 10px;
    border-radius: 10px;
  }

  textarea {
    padding: 10px;
    border-radius: 10px;
    min-height: 140px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .small {
    font-size: 0.8rem;
  }

  .radioGroup {
    display: flex;
    flex-direction: column;
    gap: 10px;
    input {
      display: none;
    }
    .label {
      cursor: pointer;
      display: flex;
      align-items: center;
      &:before {
        content: "";
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1em;
        height: 1em;
        border: 1px solid #ccc;
        border-radius: 50px;
        margin-right: 0.5em;
        padding: 0.2em;
        transition: background-color 150ms ease-in-out;
      }
    }

    input:checked + .label:before {
      content: "\2713";
      background-color: var(--primaryColor);
      border-color: var(--primaryColor);
    }
  }
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
  .error {
    color: var(--errorColor);
    font-style: italic;
    margin: 0 0 10px;
  }
  .imageContainer {
    width: 40px;
  }
</style>
