import React from "react";
import { useEffect, useState } from "react";
import { Api } from "./api";

export const DataLoaderGuard = (props) => {
  const { children } = props;
  const [mode, setMode] = useState("LOADING");

  useEffect(() => {
    (async function () {
      try {
        await Api.getInstance().init();
        setMode("LOADED");
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const render = () => {
    switch (mode) {
      case "LOADING":
        return <div>Loading...</div>;
      case "LOADED":
        return <>{children}</>;
      default:
        return;
    }
  };

  return render();
};
