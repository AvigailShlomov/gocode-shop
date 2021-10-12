import { useState } from "react";

export default function StrDisplayBtn() {
  const [stringToShow, setDisplay] = useState(true);

  return (
    <button onClick={() => (setDisplay(!stringToShow) ? "hey I made it!" : "")}>
      Press Me^_^
    </button>
  );
}
