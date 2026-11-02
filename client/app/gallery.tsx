import {useEffect,useState} from 'react';
import {View,Text,Image,Pressable,Modal,FlatList,ScrollView} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Screen,H} from '../src/components/Chrome';
import {useI18n} from '../src/lib/i18n';
import {API,j} from '../src/lib/api';
type Slide={img_url:string;alt:string};
export default function Gallery(){const {t}=useI18n();const [d,setD]=useState<{slides:Slide[];filters:{key:string;label:string}[]}>({slides:[],filters:[]});const [flt,setFlt]=useState('');const [side,setSide]=useState(false);const [open,setOpen]=useState<number|null>(null);const [zoom,setZoom]=useState(1);
 useEffect(()=>{j<typeof d>('/gallery').then(setD).catch(()=>{})},[]);
 const src=(s:Slide)=>flt?`${API}/gallery/img?filter=${flt}&src=${encodeURIComponent(s.img_url)}`:s.img_url;const n=d.slides.length;
 const nav=(k:number)=>{setOpen(((open??0)+k+n)%n);setZoom(1)};
 const FilterBtn=<Pressable onPress={()=>setSide(true)} className="flex-row items-center gap-2 bg-ink rounded-full px-4 py-1 self-start"><MaterialIcons name="tune" size={18} color="#fff"/><Text className="font-hand text-xl text-white">{t('applyFilter')}</Text></Pressable>;
 return <Screen title="Gallery" scroll={false}><FlatList className="px-4" data={d.slides} numColumns={3} keyExtractor={(s)=>s.img_url} initialNumToRender={12}
  ListHeaderComponent={<View className="mb-2"><H icon="photo-library">Repairs Catalogue: Workshop Series</H>{FilterBtn}</View>}
  renderItem={({item,index})=><Pressable className="flex-1 m-1" onPress={()=>{setOpen(index);setZoom(1)}}><Image source={{uri:src(item)}} style={{aspectRatio:4/3,borderRadius:8}} className="bg-chalk"/><Text numberOfLines={1} className="font-hand text-base text-center text-ink dark:text-chalk">{item.alt}</Text></Pressable>}/>
  <Modal visible={open!==null} transparent animationType="fade"><View className="flex-1 bg-black/95 items-center justify-center">
   <View className="absolute top-4 right-4 flex-row gap-3">{FilterBtn}<Pressable onPress={()=>setOpen(null)}><MaterialIcons name="close" size={32} color="#fff"/></Pressable></View>
   {open!==null&&<Image source={{uri:src(d.slides[open])}} resizeMode="contain" style={{width:'80%',height:'65%',transform:[{scale:zoom}]}}/>}
   <Text className="font-hand text-xl text-white mt-2">{open!==null&&d.slides[open].alt}</Text>
   <Pressable className="absolute left-3" onPress={()=>nav(-1)}><MaterialIcons name="chevron-left" size={48} color="#fff"/></Pressable><Pressable className="absolute right-3" onPress={()=>nav(1)}><MaterialIcons name="chevron-right" size={48} color="#fff"/></Pressable>
   <View className="absolute bottom-6 flex-row gap-3 bg-black/70 rounded-full px-3 py-1">{[['-',()=>setZoom(Math.max(0.75,zoom-0.25))],['Reset',()=>setZoom(1)],['+',()=>setZoom(Math.min(3,zoom+0.25))]].map(([l,f])=><Pressable key={l as string} onPress={f as()=>void}><Text className="font-hand text-2xl text-white">{l as string}</Text></Pressable>)}</View></View>
   <Modal visible={side} transparent animationType="slide"><View className="flex-1 flex-row justify-end"><Pressable className="flex-1" onPress={()=>setSide(false)}/><View className="w-72 bg-paper dark:bg-night p-4 border-l-2 border-ink"><H icon="tune">{t('applyFilter')}</H>
    <ScrollView>{d.filters.map(f=><Pressable key={f.key} onPress={()=>{setFlt(f.key);setSide(false)}} className={`border border-ink rounded-lg px-3 py-1 my-1 ${flt===f.key?'bg-pencil':''}`}><Text className="font-hand text-xl text-ink dark:text-chalk">{f.label}</Text></Pressable>)}</ScrollView></View></View></Modal></Modal></Screen>}
