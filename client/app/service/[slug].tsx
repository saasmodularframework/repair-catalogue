import {useEffect,useState} from 'react';
import {Linking,Pressable,Text} from 'react-native';
import {useLocalSearchParams,Link} from 'expo-router';
import {Screen,H} from '../../src/components/Chrome';
import {Hero} from '../../src/components/Hero';
import {Article} from '../../src/components/Article';
import {useCatalog} from '../../src/lib/catalog';
import {useI18n} from '../../src/lib/i18n';
import {API,j} from '../../src/lib/api';
export default function Service(){const {slug}=useLocalSearchParams<{slug:string}>();const {groups}=useCatalog();const {t,lang}=useI18n();
 const [def,setDef]=useState<{title:string;extract:string;url:string}|null>(null);
 useEffect(()=>{setDef(null);if(slug)j<typeof def>(`/definition/${slug}?lang=${lang}`).then(setDef).catch(()=>{})},[slug,lang]);
 const item=groups.flatMap(g=>g.items).find(i=>i.slug===slug);const g=groups.find(x=>x.key===item?.group);
 if(!item)return <Screen title={t('notFound')}><H>{t('notFound')}</H></Screen>;const title=t('svc.'+item.slug);
 return <Screen title={title}><Hero title={title} text={`${t('grp.'+g!.key)}.`} gallery={false}/>
  <Article slug={item.slug} text={def?.extract} source={def??undefined} sourceLabel={t('source')}/>
  <Link href={('/order?add='+item.slug) as any} className="font-hand text-2xl text-brick mt-3">+ {t('putOrder')}</Link>
  <Pressable onPress={()=>Linking.openURL(`${API}/rss/${item.slug}.xml`)}><Text className="font-hand text-xl text-ink dark:text-chalk mt-2">RSS</Text></Pressable></Screen>}
