import { getPage } from "@/lib/sanity";
import SanityPage from "@/components/custom/SanityPage";

export default async function AboutPage() {
 const page = await getPage("resources");
 return <SanityPage page={page} />;
}
