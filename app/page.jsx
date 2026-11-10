import HomePage from '@/components/HomePage';
import { HOME_FAQS } from '@/lib/faqs';
import { JsonLd, faqLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({"title":"Bait Systematics | Software House in Manchester & Faisalabad — Web, App & AI Development","description":"Bait Systematics is a software house in Manchester and Faisalabad building websites, mobile apps, AI software and business systems, plus SEO and Google Ads.","path":"/"});

export default function Page() {
  return <><JsonLd items={[faqLd(HOME_FAQS)]} /><HomePage /></>;
}
