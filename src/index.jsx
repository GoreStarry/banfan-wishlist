import React from "react";
import { createRoot } from "react-dom/client";
import IndexContainer from "./components/IndexContainer";

const root = createRoot(document.getElementById("root")); // createRoot(container!) if you use TypeScript
root.render(<IndexContainer />);
