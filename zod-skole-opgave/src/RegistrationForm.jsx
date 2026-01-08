import { z } from "zod";
import userScema from "./signUpSchema";
import { useState } from "react";

function Formular() {
  const [errors, setErrors] = useState({});
  function handleChange(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formDataObject = Object.fromEntries(formData.entries());
    const result = userScema.safeParse(formDataObject);

    console.log(form.Fødselsdag.value);

    if (result.success) {
      setErrors({});
      alert("Du er nu en bruger :)");
    } else {
      const Fejlbesked = z.treeifyError(result.error);
      console.log(Fejlbesked.properties);
      setErrors(Fejlbesked.properties);
    }
  }
  return (
    <>
      <form action="" onSubmit={handleChange}>
        <legend>Formvalidering med zod</legend>
        <label htmlFor="">
          <span>Fornavn</span>
          <input type="text" name="Fornavn" id="Fornavn" />
          <ul>
            {errors.Fornavn?.errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </label>
        <label htmlFor="">
          <span>Efternavn</span>
          <input type="text" name="Efternavn" id="Efternavn" />
          <ul>
            {errors.Efternavn?.errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </label>
        <label htmlFor="">
          <span>Brugernavn</span>
          <input type="text" name="Brugernavn" id="Brugernavn" />
          <ul>
            {errors.Brugernavn?.errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </label>
        <label htmlFor="">
          <span>Email</span>
          <input type="email" name="Email" id="Email" />
          <ul>
            {errors.Email?.errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </label>
        <label htmlFor="">
          <span>Adgangskode</span>
          <input type="password" name="Password" id="Password" />
          <ul>
            {errors.Password?.errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </label>
        <label htmlFor="">
          <span>Gentag adgangskode</span>
          <input type="password" name="RepeatPassword" id="RepeatPassword" />
          <ul>
            {errors.RepeatPassword?.errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </label>
        <label htmlFor="">
          <span>Fødselsdag</span>
          <input type="date" name="Fødselsdag" id="Fødselsdag" />
          <ul>
            {errors.Fødselsdag?.errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </label>
        <label htmlFor="">
          <span>Telefon Nummmer</span>
          <input type="number" name="Nummer" id="Nummer" />
          <ul>
            {errors.Nummer?.errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </label>
        <label htmlFor="">
          <span>Adresse</span>
          <input type="text" name="Adress" id="Adress" />
          <ul>
            {errors.Adress?.errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </label>
        <label htmlFor="">
          <span>Post nummer</span>
          <input type="number" max="4" name="Postnummer" id="Postnummer" />
          <ul>
            {errors.Postnummer?.errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </label>
        <button type="Submit">Send</button>
      </form>
    </>
  );
}

export default Formular;
