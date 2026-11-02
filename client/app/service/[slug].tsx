import {Linking,Pressable,Text} from 'react-native';
import {useLocalSearchParams,Link} from 'expo-router';
import {Screen,H} from '../../src/components/Chrome';
import {Hero} from '../../src/components/Hero';
import {useCatalog} from '../../src/lib/catalog';
import {useI18n} from '../../src/lib/i18n';
import {API} from '../../src/lib/api';
export default function Service(){const {slug}=useLocalSearchParams<{slug:string}>();const {groups}=useCatalog();const {t}=useI18n();
 const item=groups.flatMap(g=>g.items).find(i=>i.slug===slug);const g=groups.find(x=>x.key===item?.group);
 if(!item)return <Screen title={t('notFound')}><H>{t('notFound')}</H></Screen>;const title=t('svc.'+item.slug);
 return <Screen title={title}><Hero title={title} text={`${t('grp.'+g!.key)}.`}/>
  <Link href={('/order?add='+item.slug) as any} className="font-hand text-2xl text-brick mt-3">+ {t('putOrder')}</Link>
  <Pressable onPress={()=>Linking.openURL(`${API}/rss/${item.slug}.xml`)}><Text className="font-hand text-xl text-ink dark:text-chalk mt-2">RSS</Text></Pressable></Screen>}
