import { useEffect, useMemo, useState } from "react";
import "./App.css";
import useQueryPostcodeLookup from "./api/useQueryPostcodeLookup";
import { isValidPostcode } from "./utils";

function App() {
  const [postcode, setPostcode] = useState("");
  const [submittedPostcode, setSubmittedPostcode] = useState("");
  const [result, setResult] = useState("Please enter a postcode above");

  const REGIONS_IN_SERVICE_AREA = ["Southwark", "Lambeth"];

  const POSTCODE_ALLOW_LIST = ["SH24 1AA", "SH24 1AB"];

  const submittedPostcodeInAllowList = POSTCODE_ALLOW_LIST.includes(
    submittedPostcode.toUpperCase().trim(),
  );

  const searchTermIsValid = useMemo(
    () => isValidPostcode(postcode),
    [postcode],
  );

  const { data, isLoading, isError } = useQueryPostcodeLookup(
    submittedPostcode,
    {
      enabled:
        searchTermIsValid &&
        submittedPostcode !== "" &&
        !submittedPostcodeInAllowList,
    },
  );

  useEffect(() => {
    if (isLoading) return;

    if (submittedPostcodeInAllowList) {
      setResult("The postcode is in the service area");
    }

    if (data) {
      const isInServiceArea =
        data.status === 200 &&
        REGIONS_IN_SERVICE_AREA.some((area) => data.result.lsoa.includes(area));

      setResult(
        isInServiceArea
          ? "The postcode is in the service area"
          : "Not in the service area",
      );
    }
  }, [data, isLoading, submittedPostcodeInAllowList]);

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
            setResult("Please enter a postcode above");
            setPostcode(event.target.value);
          }}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{result}</p>
    </>
  );
}

export default App;
