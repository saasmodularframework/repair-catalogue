import {View,Text} from 'react-native';
import {useLocalSearchParams,Link} from 'expo-router';
import {Screen,H} from '../../src/components/Chrome';
import {Hero} from '../../src/components/Hero';
import {useCatalog} from '../../src/lib/catalog';
import {useI18n} from '../../src/lib/i18n';
export default function Group(){const {group}=useLocalSearchParams<{group:string}>();const g=useCatalog().groups.find(x=>x.key===group);const {t}=useI18n();
 if(!g)return <Screen title={t('notFound')}><H>{t('notFound')}</H></Screen>;
 return <Screen title={t('grp.'+g.key)}><Hero title={t('grp.'+g.key)} text={g.items.map(i=>t('svc.'+i.slug)).slice(0,3).join(' · ')}/>
  <View className="mt-4">{g.items.map(s=><Link key={s.slug} href={('/service/'+s.slug) as any} className="font-hand text-2xl text-brick py-1">{t('svc.'+s.slug)}</Link>)}</View></Screen>}
