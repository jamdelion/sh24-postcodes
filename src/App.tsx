import { useState, useMemo } from "react";
import "./App.css";
import useQueryPostcodeLookup from "./api/useQueryPostcodeLookup";
import { isValidPostcode } from "./utils";
import React from "react";

function App() {
  const [postcode, setPostcode] = useState("");
  const [submittedPostcode, setSubmittedPostcode] = useState("");

    const searchTermIsValid = useMemo(
    () => isValidPostcode(postcode),
    [postcode]
  );

  const { data, isLoading, isError } = useQueryPostcodeLookup(postcode, {
    enabled: searchTermIsValid && submittedPostcode !== "",
  });

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmittedPostcode(postcode)
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
        <button type='submit'>Submit</button>
      </form>
      {!isLoading && !isError && data && <p>{data.result.lsoa}</p>}
    </>
  );
}

export default App;
