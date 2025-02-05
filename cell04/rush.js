import $ from "jquery";
import { useEffect } from "react";

const Example = () => {
  useEffect(() => {
    $("#myDiv").fadeIn(500);
  }, []);

  return <div id="myDiv" style={{ display: "none" }}>Hello jQuery in React</div>;
};
