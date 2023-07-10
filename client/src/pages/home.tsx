import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "Home";
  });

  return (
    <div className="bg-red-600">
      <h1 className="text-center">home</h1>
    </div>
  );
}

export default Home;
