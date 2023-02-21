import React from "react";
import { HeroList } from "../components";

export const DcPage = () => {
  return (
    <>
      <h1>DC HEROES</h1>
      <hr />
      <HeroList publisher={"DC Comics"} />
    </>
  );
};
