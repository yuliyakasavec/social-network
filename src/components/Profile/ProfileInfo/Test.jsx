import React, { useEffect, useState } from "react";

export const Test = () => {
  return (
    <div>
      <div style={{ color: "red", fontWeight: "bold" }}>Warning!</div>
      <div>
        Name
        <input type="text" />
        Age
        <input type="number" />
      </div>
      <button>Confirm</button>
    </div>
  );
};
