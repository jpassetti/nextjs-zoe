import { getPage } from "@/lib/sanity";
import SanityPage from "@/components/custom/SanityPage";

export default async function AboutPage() {
 const page = await getPage("contact");
 return <SanityPage page={page} />;
}
