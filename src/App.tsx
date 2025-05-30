import { useEffect, useMemo, useState } from "react";
import "./App.css";
import useQueryPostcodeLookup from "./api/useQueryPostcodeLookup";
import { isValidPostcode } from "./utils";
import { POSTCODE_ALLOW_LIST, REGIONS_IN_SERVICE_AREA } from "./constants";

function App() {
  const [postcode, setPostcode] = useState("");
  const [submittedPostcode, setSubmittedPostcode] = useState("");
  const [result, setResult] = useState("Please enter a postcode above");

  const submittedPostcodeInAllowList = POSTCODE_ALLOW_LIST.includes(
    submittedPostcode.toUpperCase().trim(),
  );

  const searchTermIsValid = useMemo(
    () => isValidPostcode(postcode),
    [postcode],
  );

  const { data, isLoading, isError, error } = useQueryPostcodeLookup(
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

    if (isError) {
      setResult("⚠ Something went wrong. Please try again.");
      if (error.message.includes("404")) {
        setResult("⚠ Postcode not found. Please try again.");
      }
    }

    if (submittedPostcodeInAllowList) {
      setResult("✅ The postcode is in the service area");
    }

    if (!data) {
      return;
    }

    const isInServiceArea =
      data.status === 200 &&
      REGIONS_IN_SERVICE_AREA.some((area) => data.result.lsoa.includes(area));

    setResult(
      isInServiceArea
        ? "✅ The postcode is in the service area"
        : "👎 The postcode is not in the service area",
    );
  }, [data, isLoading, submittedPostcodeInAllowList, isError, error]);

  return (
    <>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (searchTermIsValid) {
            setSubmittedPostcode(postcode);
          } else {
            setResult("⚠ Please enter a valid UK postcode");
          }
        }}
      >
        <div className="form-contents">
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
          <div className="button-group">
            <button type="submit" disabled={isLoading}>
              Submit
            </button>

            <div
              className="spinner"
              data-testid="loading-spinner"
              style={{ visibility: isLoading ? "visible" : "hidden" }}
            />
          </div>
        </div>
      </form>
      <p>{result}</p>
    </>
  );
}

export default App;
