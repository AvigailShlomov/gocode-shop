import { useState } from "react";
import "./StrDisplayBtn.css";

function StrDisplayBtn() {
  const [display, setDisplay] = useState(true);

  return (
    <>
      {display && <h1 id="toggelBTN">🎉yey🎉</h1>}
      <button
        id="btn"
        onClick={() => {
          setDisplay(!display);
        }}
      >
        Press Me^_^
      </button>
    </>
  );
}

export default StrDisplayBtn;
