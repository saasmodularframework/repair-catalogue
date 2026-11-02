import {View} from 'react-native';
import {Link} from 'expo-router';
import {Screen,H,Grid} from '../../src/components/Chrome';
import {useCatalog} from '../../src/lib/catalog';
import {useI18n} from '../../src/lib/i18n';
export const ServiceCard=({href,label}:{href:string;label:string})=><Link href={href as any} className="font-hand text-xl text-ink dark:text-chalk border-2 border-ink/30 dark:border-pencil/60 rounded-xl px-3 py-3 bg-white/50 dark:bg-ink">{label}</Link>;
export default function Services(){const {groups}=useCatalog();const {t}=useI18n();
 return <Screen title={t('services')}><H icon="handyman">{t('services')}</H>{groups.map(g=><View key={g.key} className="mb-4"><Link href={('/services/'+g.key) as any} className="font-hand text-3xl text-brick">{t('grp.'+g.key)} ›</Link>
  <Grid>{g.items.map(s=><ServiceCard key={s.slug} href={'/service/'+s.slug} label={t('svc.'+s.slug)}/>)}</Grid></View>)}</Screen>}
