import { useState } from "react";
import "./App.css";

function App() {
  const [postcode, setPostcode] = useState("");

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <label htmlFor="postcode-field">Enter a postcode: </label>
        <input
          id="postcode-field"
          value={postcode}
          onChange={(event) => {
            setPostcode(event.target.value);
          }}
        />
      </form>
    </>
  );
}

export default App;
