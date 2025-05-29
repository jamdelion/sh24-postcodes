import { useMemo, useState } from "react";
import "./App.css";
import useQueryPostcodeLookup from "./api/useQueryPostcodeLookup";
import { isValidPostcode } from "./utils";

function App() {
  const [postcode, setPostcode] = useState("");
  const [submittedPostcode, setSubmittedPostcode] = useState("");

  const REGIONS_IN_SERVICE_AREA = ["Southwark", "Lambeth"];

  const displayResult = (lsoaResult: string) => {
    const isInServiceArea = REGIONS_IN_SERVICE_AREA.some((area) =>
      lsoaResult.includes(area),
    );
    if (!isInServiceArea) {
      return "Not in the service area";
    }
    return "The postcode is in the service area";
  };

  const searchTermIsValid = useMemo(
    () => isValidPostcode(postcode),
    [postcode],
  );

  const { data, isLoading, isError } = useQueryPostcodeLookup(submittedPostcode, {
    enabled: searchTermIsValid && submittedPostcode !== "",
  });

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmittedPostcode(postcode);
        }}
      >
        <label htmlFor="postcode-field">Enter a postcode: </label>
        <input
          id="postcode-field"
          value={postcode}
          onChange={(event) => {
            setSubmittedPostcode("");
            setPostcode(event.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <p>
        {!isLoading && !isError && data
          ? displayResult(data.result.lsoa)
          : "Please enter a postcode above"}
      </p>
    </>
  );
}

export default App;
