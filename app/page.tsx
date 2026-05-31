import { IS_AURUM } from '@/lib/edition';
import { CurrentHome } from '@/components/editions/current/home';
import { AurumHome } from '@/components/editions/aurum/home';

export default function Home() {
  return IS_AURUM ? <AurumHome /> : <CurrentHome />;
}
