import PortfolioPage from '@/components/PortfolioPage';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({"title":"Portfolio — Websites, Apps & Software Projects | Bait Systematics","description":"Websites, apps and software Bait Systematics has designed, built and launched for growing businesses — real projects, real clients, live today.","path":"/portfolio"});

export default function Page() {
  return <PortfolioPage />;
}
