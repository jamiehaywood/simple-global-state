import React from "react";
import { Debug, useGlobalState } from "./GlobalStateProvider";
import { PageContainer } from "./PageContainer";

const PageTwo = () => {
  const { state } = useGlobalState();
  const { firstname, age, lastname } = state;
  return (
    <PageContainer>
      <div>
        <h1>State from PageOne:</h1>

        <h2>Name:</h2>
        <p>{`${firstname} ${lastname}`}</p>

        <h2>Age:</h2>
        <p>{age}</p>
        <h2>Debug the state:</h2>
        <Debug />
      </div>
    </PageContainer>
  );
};
export default PageTwo;
