import React from "react";
import { HeroList } from "../components";

export const MarvelPage = () => {
  return (
    <>
      <h1>MARVEL HEROES</h1>
      <hr />
      <HeroList publisher={"Marvel Comics"} />
    </>
  );
};
