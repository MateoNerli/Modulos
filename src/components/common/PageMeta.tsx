import React from "react";

const PageMeta = ({ title }: { title: string }) => (
  <>
    <title>{`SGR One Click - ${title}`}</title>
  </>
);

export const AppWrapper = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

export default PageMeta;
