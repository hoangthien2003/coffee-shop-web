import logo from "@images/logo_title.png";

function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex items-center">
        <img src={logo} />
        <p className="text-[18px] font-bold">Loading...</p>
      </div>
    </div>
  );
}

export default Loading;
