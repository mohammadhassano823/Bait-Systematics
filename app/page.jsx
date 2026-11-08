import HomePage from '@/components/HomePage';
import { HOME_FAQS } from '@/lib/faqs';
import { JsonLd, faqLd } from '@/lib/seo';

export const metadata = { title: "Bait Systematics | Software House in Manchester & Faisalabad — Web, App & AI Development", description: "Websites, mobile apps, AI-powered software, agentic AI, inventory, pharmacy and POS systems, plus SEO and Google & Facebook ads. Offices in Faisalabad and Manchester.", alternates: { canonical: "/" } };

export default function Page() {
  return <><JsonLd items={[faqLd(HOME_FAQS)]} /><HomePage /></>;
}
