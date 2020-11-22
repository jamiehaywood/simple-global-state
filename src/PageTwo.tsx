import React from "react";
import { Debug } from "./GlobalStateProvider";
import { PageContainer } from "./PageContainer";

const PageTwo = () => {
  return (
    <PageContainer>
      <div>
        <h2>State from PageOne:</h2>
        <Debug />
      </div>
    </PageContainer>
  );
};
export default PageTwo;
