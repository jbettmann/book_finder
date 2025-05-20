import { Loader2 } from "lucide-react";
import { Suspense } from "react";

interface ReusableTableWrapperProps {
  header?: React.ReactNode;
  showToggleView?: boolean;
  isTableView: boolean;
  setIsTableView: (val: boolean) => void;
  tableComponent: React.ReactNode;
  cardComponent?: React.ReactNode;
  isLoading?: boolean;
}

export function ReusableTableWrapper({
  header,

  tableComponent,

  isLoading,
}: ReusableTableWrapperProps) {
  return (
    <>
      <div className="flex flex-nowrap gap-2 mb-4">
        <div className="flex flex-wrap items-center gap-4 w-full">{header}</div>
      </div>
      <Suspense fallback={isLoading ? <Loader2 /> : null}>
        {tableComponent}
      </Suspense>
    </>
  );
}
