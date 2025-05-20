import { Loader2 } from "lucide-react";
import React, { Suspense } from "react";

const MainSuspense: React.FC<{ ChildComponent: React.ElementType }> = ({
  ChildComponent,
}) => {
  return (
    <Suspense
      fallback={
        <Loader2
          className="animate-spin
"
        />
      }
    >
      <ChildComponent />
    </Suspense>
  );
};

export default MainSuspense;
