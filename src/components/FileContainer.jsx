import React from "react";
import "./FileContainer.css";
import downloadIcon from "../assets/download.png";

export default function FileContainer(props) {
  const fileName = props.name.substring(
    props.name.indexOf("o/") + 2,
    props.name.indexOf("?")
  );

  return (
    <div className="file-container">
      <p>{fileName.replace("%20", " ")}</p>
      <a href={props.name} target="blank">
        <div>
          <img src={downloadIcon} alt="" />
        </div>
      </a>
    </div>
  );
}
