import {useEffect,useMemo,useState} from 'react';
import {View,Text,FlatList,Pressable} from 'react-native';
import Slider from '@react-native-community/slider';
import {MaterialIcons} from '@expo/vector-icons';
import {Link} from 'expo-router';
import _ from 'lodash';
import {Screen,H} from '../src/components/Chrome';
import {useI18n} from '../src/lib/i18n';
import {Ad,j} from '../src/lib/api';
const K=[{k:'price',l:'maxPrice',min:50,max:5000,step:50,icon:'attach-money'},{k:'days',l:'maxDays',min:1,max:60,step:1,icon:'schedule'},{k:'crew',l:'maxCrew',min:1,max:12,step:1,icon:'groups'},
 {k:'area',l:'maxArea',min:5,max:500,step:5,icon:'square-foot'},{k:'rating',l:'minRating',min:1,max:5,step:0.5,icon:'star'},{k:'warranty',l:'maxWarranty',min:0,max:60,step:6,icon:'verified'}] as const;
export default function Ads(){const {t}=useI18n();const init=useMemo(()=>Object.fromEntries(K.map(c=>[c.k,c.k==='rating'?1:c.max])) as Record<string,number>,[]);
 const [f,setF]=useState(init);const [q,setQ]=useState(init);const [page,setPage]=useState(1);const [res,setRes]=useState<{items:Ad[];pages:number;total:number}>({items:[],pages:1,total:0});
 const push=useMemo(()=>_.debounce((v:Record<string,number>)=>{setQ(v);setPage(1)},300),[]);
 useEffect(()=>{j<typeof res>('/ads?'+new URLSearchParams({...Object.fromEntries(Object.entries(q).map(([k,v])=>[k,String(v)])),page:String(page)})).then(setRes).catch(()=>{})},[q,page]);
 return <Screen title="Repair ads" scroll={false}><FlatList className="px-4" data={res.items} numColumns={2} keyExtractor={a=>a.id} columnWrapperStyle={{gap:8}}
  ListHeaderComponent={<View><H icon="campaign">{t('ads')} ({res.total})</H>{K.map(c=><View key={c.k}><View className="flex-row items-center"><MaterialIcons name={c.icon} size={20} color="#B5472F"/><Text className="font-hand text-lg text-ink dark:text-chalk ml-1">{t(c.l)}: {f[c.k]}</Text></View>
   <Slider minimumValue={c.min} maximumValue={c.max} step={c.step} value={f[c.k]} minimumTrackTintColor="#F2B705" onValueChange={v=>{const n={...f,[c.k]:v};setF(n);push(n)}}/></View>)}</View>}
  renderItem={({item})=><Link href={('/service/'+item.slug) as any} asChild><Pressable className="flex-1 border-2 border-ink dark:border-pencil rounded-xl p-2 my-1"><Text className="font-hand text-xl text-ink dark:text-chalk" numberOfLines={2}>{item.title}</Text>
   <Text className="font-hand text-base text-brick">${item.price} · {item.days}d · crew {item.crew}</Text><Text className="font-hand text-base text-ink dark:text-chalk">{item.area} m² · ★{item.rating} · {item.warranty} mo</Text></Pressable></Link>}
  ListFooterComponent={<View className="flex-row justify-center items-center gap-4 py-3"><Pressable disabled={page<=1} onPress={()=>setPage(page-1)}><MaterialIcons name="chevron-left" size={32} color={page<=1?'#999':'#B5472F'}/></Pressable>
   <Text className="font-hand text-xl text-ink dark:text-chalk">{page} / {res.pages}</Text><Pressable disabled={page>=res.pages} onPress={()=>setPage(page+1)}><MaterialIcons name="chevron-right" size={32} color={page>=res.pages?'#999':'#B5472F'}/></Pressable></View>}/></Screen>}
