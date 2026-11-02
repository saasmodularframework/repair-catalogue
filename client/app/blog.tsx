import {useEffect,useMemo,useState} from 'react';
import {SectionList,View,Text,Pressable} from 'react-native';
import {useLocalSearchParams,router} from 'expo-router';
import _ from 'lodash';
import {Screen,H,P} from '../src/components/Chrome';
import {SearchBar} from '../src/components/SearchBar';
import {CalendarPicker,dayKey,usDate,fromUs} from '../src/components/CalendarPicker';
import {Post,j} from '../src/lib/api';
import {useI18n} from '../src/lib/i18n';
export default function Blog(){const {t}=useI18n();const {date}=useLocalSearchParams<{date?:string}>(); // ?date=MM/DD/YYYY
 const [posts,setPosts]=useState<Post[]>([]);const [q,setQ]=useState('');const day=date?fromUs(date):null;
 useEffect(()=>{j<Post[]>('/posts').then(setPosts).catch(()=>{})},[]);
 const marked=useMemo(()=>new Set(posts.map(p=>dayKey(new Date(p.createdAt)))),[posts]);
 const sections=useMemo(()=>{const s=q.toLowerCase();
  const f=posts.filter(p=>(!day||dayKey(new Date(p.createdAt))===day)&&(!s||(p.title+p.body).toLowerCase().includes(s)||p.tags.some(x=>x.includes(s))));
  return _.map(_.groupBy(f,p=>usDate(new Date(p.createdAt))),(data,title)=>({title,data}))},[posts,q,day]);
 return <Screen title="Notes" scroll={false}><SectionList className="px-4" sections={sections} keyExtractor={p=>p.id}
  ListHeaderComponent={<View><H icon="article">{t('blog')}{date?` · ${date}`:''}</H><SearchBar value={q} onChange={setQ} placeholder={t('search')}/><CalendarPicker marked={marked} selected={day} onSelect={k=>router.setParams({date:k?usDate(new Date(k+'T12:00:00')):''})}/></View>}
  renderSectionHeader={({section})=><Text className="font-hand text-2xl text-brick bg-paper dark:bg-night py-1">{section.title}</Text>}
  renderItem={({item})=><View className="border-b border-ink/30 py-2"><Text className="font-hand text-2xl text-ink dark:text-chalk">{item.title}</Text>
   <Text className="font-hand text-base text-ink/70 dark:text-chalk/70">{new Date(item.createdAt).toLocaleString('en-US')} · {item.readMin} min read</Text><P>{item.body}</P>
   <View className="flex-row flex-wrap gap-2">{item.tags.map(g=><Pressable key={g} onPress={()=>setQ(g)} className="bg-pencil rounded-full px-3"><Text className="font-hand text-lg text-ink">#{g}</Text></Pressable>)}</View></View>}/></Screen>}
