import React from "react";
import Styles from "./layout.css";
import MessageBox from "../MessageBox";

export default function Layout(props) {
  return (
    <>
      <div className="vms-layout">
          <MessageBox />
          <main className="main-body">
                {props.children}
          </main>
      </div>
    </>
  );
}
