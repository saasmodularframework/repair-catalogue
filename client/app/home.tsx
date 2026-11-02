import {View} from 'react-native';
import {Link,router} from 'expo-router';
import {useEffect,useState} from 'react';
import {CalendarPicker,dayKey,usDate} from '../src/components/CalendarPicker';
import {Post,j} from '../src/lib/api';
import {Screen,H} from '../src/components/Chrome';
import {Hero} from '../src/components/Hero';
import {useCatalog} from '../src/lib/catalog';
import {useI18n} from '../src/lib/i18n';
export default function Home(){const {groups,rooms}=useCatalog();const {t}=useI18n();const [marked,setMarked]=useState(new Set<string>());useEffect(()=>{j<Post[]>('/posts').then(p=>setMarked(new Set(p.map(x=>dayKey(new Date(x.createdAt)))))).catch(()=>{})},[]);
 return <Screen title="Home"><CalendarPicker marked={marked} selected={null} onSelect={k=>k&&router.push(('/blog?date='+encodeURIComponent(usDate(new Date(k+'T12:00:00')))) as any)}/><Hero title="Repairs, built properly" text="From inspection to post-construction cleaning. Pick the work, name the room, print the order."/>
  {groups.map(g=><View key={g.key} className="mt-4"><H>{g.title}</H>{g.items.map(s=><Link key={s.slug} href={('/service/'+s.slug) as any} className="font-hand text-xl text-brick py-0.5">{s.title}</Link>)}</View>)}
  <View className="mt-4"><H>{t('rooms')}</H><View className="flex-row flex-wrap gap-2">{rooms.map(r=><Link key={r.slug} href={('/room/'+r.slug) as any} className="font-hand text-xl text-ink dark:text-chalk border-2 border-ink dark:border-pencil rounded-lg px-3">{r.title}</Link>)}</View></View></Screen>}
