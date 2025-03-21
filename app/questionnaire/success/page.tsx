import { Suspense } from "react";
import SuccessPage from "@/components/custom/SuccessPage";

export default function SuccessPageWrapper() {
 return (
  <Suspense fallback={<p>Loading...</p>}>
   <SuccessPage />
  </Suspense>
 );
}
