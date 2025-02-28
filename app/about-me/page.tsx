import { getPage } from "@/lib/sanity";
import SanityPage from "@/components/custom/SanityPage";

export default async function AboutPage() {
 const page = await getPage("about-me");
 return <SanityPage page={page} />;
}
