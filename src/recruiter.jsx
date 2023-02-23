import React from "react";
import { createRoot } from "react-dom/client";
import Recruiter from "./components/Recruiter";

const root = createRoot(document.getElementById("root")); // createRoot(container!) if you use TypeScript
root.render(<Recruiter />);
