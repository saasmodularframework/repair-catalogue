import {View} from 'react-native';
import {Link} from 'expo-router';
import {Screen,H} from '../../src/components/Chrome';
import {useCatalog} from '../../src/lib/catalog';
import {useI18n} from '../../src/lib/i18n';
export default function Services(){const {groups}=useCatalog();const {t}=useI18n();
 return <Screen title={t('services')}><H icon="handyman">{t('services')}</H>{groups.map(g=><View key={g.key} className="mb-4"><Link href={('/services/'+g.key) as any} className="font-hand text-3xl text-brick">{t('grp.'+g.key)} ›</Link>
  {g.items.map(s=><Link key={s.slug} href={('/service/'+s.slug) as any} className="font-hand text-xl text-ink dark:text-chalk py-0.5">• {t('svc.'+s.slug)}</Link>)}</View>)}</Screen>}
