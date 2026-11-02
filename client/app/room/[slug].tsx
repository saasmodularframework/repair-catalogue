import {Linking,Pressable,Text} from 'react-native';
import {useLocalSearchParams,Link} from 'expo-router';
import {Screen,H} from '../../src/components/Chrome';
import {useCatalog} from '../../src/lib/catalog';
import {useI18n} from '../../src/lib/i18n';
import {API} from '../../src/lib/api';
export default function Room(){const {slug}=useLocalSearchParams<{slug:string}>();const r=useCatalog().rooms.find(x=>x.slug===slug);const {t}=useI18n();
 if(!r)return <Screen title={t('notFound')}><H>{t('notFound')}</H></Screen>;const title=t('room.'+r.slug);
 return <Screen title={title}><H icon="meeting-room">{title}</H><Link href={('/order?room='+r.slug) as any} className="font-hand text-2xl text-brick">{t('order')} · {title}</Link>
  <Pressable onPress={()=>Linking.openURL(`${API}/rss/${r.slug}.xml`)}><Text className="font-hand text-xl text-ink dark:text-chalk mt-2">RSS</Text></Pressable></Screen>}
