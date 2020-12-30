export function ContactForm() {
  const d = document,
    $form = d.createElement("form");
  $form.classList.add("contact-form");

  let $styles = d.getElementById("dynamic-styles");
  $styles.innerHTML = `.contact-form {
    --form-ok-color: #4caf50;
    --form-error-color: #f44336;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    background-color: rgb(223, 219, 219);
    box-shadow: 1px 2px 4px gray;
  }
  
  .contact-form > * {
    padding: 0.5rem;
    margin: 1rem auto;
    display: block;
    width: 80%;
  }
  
  
  .contact-form textarea{
    resize: none;
  }
  
  .contact-form legend,
  .contact-form-response{
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
  
  .contact-form input,
  .contact-form textarea{
    font-family: sans-serif;
    font-size: 1rem;
  }
  
  .contact-form input[type='submit']{
    width: 50%;
    font-weight: bold;
    cursor: pointer;
  }
  
  .contact-form *::placeholder{
    color: black;
  }
  
  .contact-form [required]:valid{
    border: thin solid var(--form-ok-color);
  }
  .contact-form [required]:invalid{
    border: thin solid var(--form-error-color);
  }
  
  .contact-form-error{
    margin-top: -1rem;
    font-size: 80%;
    background-color: var(--form-error-color);
    color: white;
    transition: all 800ms ease
  }
  
  .contact-form-error.is-active{
    display: block;
    animation: show-error 1s 1 normal 0s ease-out both;
    text-align: center;
  }
  
  .contact-form-loader{
    text-align: center;
  }
  .none{
    display: none;
  }`;

  $form.innerHTML = `
  <legend>Send us your comments</legend>
    <input type="text" name="name" placeholder="Insert Name..." title="The name only accepts letters and blank spaces"
      pattern='^[a-zA-zñáéíóú\\s]+$' required>
    <br>
    <input type="email" name='email' placeholder="Insert Email..." title="The email is invalid"
      pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" required>
    <br>
    <input type="text" name="subject" placeholder="Subject..." title="The subject is required" required>
    <br>
    <textarea name="comments" id="contact-form-area" cols="50" rows="5" placeholder="Comments..."
      data-pattern='^.{1,255}$' title="The text content can't contain more than 255 characters" required></textarea>
    <br>
    <input type="submit" name="send" value="Send">
    <div class="contact-form-loader none">
      <img src="app/assets/three-dots.svg" alt="Loading">
    </div>
    <div class="contact-form-response none">
      <p>Data has been sent</p>
    </div>
  `;

  function contactForm() {
    const $elements = d.querySelectorAll(".contact-form [required]"),
      $form = d.querySelector(".contact-form");

    $elements.forEach((input) => {
      const $span = d.createElement("span");
      $span.textContent = input.title;
      $span.id = input.name;
      input.insertAdjacentElement("afterend", $span);
      $span.classList.add("none", "contact-form-error");
    });

    d.addEventListener("keyup", (e) => {
      if (e.target.matches(".contact-form [required]")) {
        let $input = e.target,
          pattern = $input.pattern || $input.dataset.pattern;

        if (pattern && $input.value !== "") {
          let regex = new RegExp(pattern);
          return !regex.exec($input.value)
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }

        if (!pattern) {
          return $input.value === ""
            ? d.getElementById($input.name).classList.add("is-active")
            : d.getElementById($input.name).classList.remove("is-active");
        }
      }
    });

    d.addEventListener("submit", (e) => {
      e.preventDefault();
      const $loader = d.querySelector(".contact-form-loader"),
        $response = d.querySelector(".contact-form-response");

      $loader.classList.remove("none");

      fetch("https://formsubmit.co/ajax/burritosh1@gmail.com", {
        method: "POST",
        body: new FormData(e.target),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
          console.log(json);
          $loader.classList.add("none");
          $response.classList.remove("none");
          $response.innerHTML = `<p>${json.message}</p>`;
          $form.reset();
        })
        .catch((err) => {
          let message =
            err.statusText || "An error has ocurred, try other time";
          $response.innerHTML = `Error${err.status}:${message}`;
        })
        .finally(() =>
          setTimeout(() => {
            $response.classList.add("none");
            $response.innerHTML = "";
          }, 3000)
        );
      // setTimeout(() => {
      //   $loader.classList.add('none')
      //   $response.classList.remove('none')
      //   $form.reset()
      //   setTimeout(() => $response.classList.add('none'), 3000)
      // }, 3000);
    });
  }
  setTimeout(() => {
    contactForm()
  }, 1000)
  return $form;
}
