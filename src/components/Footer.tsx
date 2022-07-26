import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="w-full bg-black grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 text-white pt-3 pb-3">
      {/* <Link to="/about">About</Link>
      <Link to="/contact">Contact Us</Link> */}
      <div className="text-center pl-2 pr-4">
        <p className="text-2xl font-semibold">How to play</p>
        <p className="p-5">
          Choose a game to play, connect your wallet, stake an amount, play and
          win
        </p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-semibold">About Us</p>
        <p className="p-5">
          We are a group of brilliant minds who have carefully designed a system
          where your skills are no longer just for fun alone, you earn as you
          play your favourite game.
        </p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-semibold">Terms & Conditions</p>
        <p className="p-5">
          Click <button className="text-blue-500">here</button>
        </p>
      </div>
    </div>
  );
};
