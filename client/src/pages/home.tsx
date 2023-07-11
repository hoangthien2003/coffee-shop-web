import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "Home";
    window.location.href = "/signup";
  });

  return (
    <div className="bg-red-600">
      <h1 className="text-center">home</h1>
    </div>
  );
}

export default Home;
