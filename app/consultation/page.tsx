import { getPage } from "@/lib/sanity";
import SanityPage from "@/components/custom/SanityPage";

export default async function ConsultationPage() {
 const page = await getPage("consultation");
 return <SanityPage page={page} />;
}
