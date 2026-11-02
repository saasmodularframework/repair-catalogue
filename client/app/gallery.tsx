import {useState} from 'react';
import {View,Text,Image,Pressable,Modal,FlatList,ScrollView,Platform} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {Screen,H} from '../src/components/Chrome';
import {useI18n} from '../src/lib/i18n';
import MANIFEST from '../src/data/models-manifest.json'; // every image in client/public/models (npm run manifest)
const FILES:string[]=MANIFEST.files;
const catOf=(f:string)=>f.startsWith('scene-')?'scenes':f.startsWith('apartment-')?'apartment':f.startsWith('banner-')?'banners':'services';
const CATS=['all','services','scenes','apartment','banners'];
const FILTERS:[string,string,string][]=[['','Normal',''],['grayscale','Grayscale','grayscale(1)'],['sepia','Sepia','sepia(1)'],['blur','Blur','blur(2px)'],['gaussian-blur','Blur Ext','blur(5px)'],['sharpen','Sharpen','contrast(1.3) saturate(1.1)'],
 ['smooth','Smooth','blur(1px)'],['invert','Invert','invert(1)'],['enhance','Enhance','saturate(1.6) contrast(1.1)'],['emboss','Remap','grayscale(1) contrast(2) brightness(1.2)'],['edges','Detect','grayscale(1) contrast(6) invert(1)'],
 ['sketch','Sketch','grayscale(1) contrast(3) brightness(1.4)'],['cutout','Cutout','contrast(2) saturate(2)'],['solarize','Solarize','invert(0.6) contrast(1.4)']];
const uri=(f:string)=>Platform.OS==='web'?`/models/${f}`:`https://picsum.photos/seed/${f}/400/300`;
export default function Gallery(){const {t}=useI18n();const [cat,setCat]=useState('all');const [flt,setFlt]=useState('');const [side,setSide]=useState(false);const [open,setOpen]=useState<number|null>(null);const [zoom,setZoom]=useState(1);
 const list=FILES.filter(f=>cat==='all'||catOf(f)===cat);const css=FILTERS.find(f=>f[0]===flt)?.[2];const fx:any=css&&Platform.OS==='web'?{filter:css}:{};const n=list.length;
 const nav=(k:number)=>{setOpen(((open??0)+k+n)%n);setZoom(1)};const name=(f:string)=>f.replace(/\.\w+$/,'');
 const FilterBtn=<Pressable onPress={()=>setSide(true)} className="flex-row items-center gap-2 bg-ink rounded-full px-4 py-1 self-start"><MaterialIcons name="tune" size={18} color="#fff"/><Text className="font-hand text-xl text-white">{t('applyFilter')}</Text></Pressable>;
 return <Screen title={t('gallery')} scroll={false}><FlatList className="px-4" data={list} numColumns={3} keyExtractor={f=>f} initialNumToRender={12} windowSize={7}
  ListHeaderComponent={<View className="mb-2"><H icon="photo-library">{t('gallery')} ({n})</H><View className="flex-row flex-wrap gap-2 mb-2">{CATS.map(c=><Pressable key={c} onPress={()=>setCat(c)} className={`px-3 border-2 border-ink dark:border-pencil rounded-full ${cat===c?'bg-pencil':''}`}><Text className={`font-hand text-xl ${cat===c?'text-ink':'text-ink dark:text-chalk'}`}>{t(c)}</Text></Pressable>)}</View>{FilterBtn}</View>}
  ListEmptyComponent={<Text className="font-hand text-xl text-ink dark:text-chalk">Add images to client/public/models, then run npm run manifest.</Text>}
  renderItem={({item,index})=><Pressable className="flex-1 m-1" onPress={()=>{setOpen(index);setZoom(1)}}><Image source={{uri:uri(item)}} style={[{aspectRatio:4/3,borderRadius:8},fx]} className="bg-chalk"/><Text numberOfLines={1} className="font-hand text-base text-center text-ink dark:text-chalk">{name(item)}</Text></Pressable>}/>
  <Modal visible={open!==null} transparent animationType="fade" onRequestClose={()=>setOpen(null)}><View className="flex-1 bg-black/95 items-center justify-center">
   <View className="absolute top-4 right-4 flex-row gap-3 items-center">{FilterBtn}<Pressable onPress={()=>setOpen(null)}><MaterialIcons name="close" size={32} color="#fff"/></Pressable></View>
   {open!==null&&list[open]&&<Image source={{uri:uri(list[open])}} resizeMode="contain" style={[{width:'80%',height:'65%',transform:[{scale:zoom}]},fx]}/>}
   <Text className="font-hand text-xl text-white mt-2">{open!==null&&list[open]?name(list[open]):''}</Text>
   <Pressable className="absolute left-3" onPress={()=>nav(-1)}><MaterialIcons name="chevron-left" size={48} color="#fff"/></Pressable><Pressable className="absolute right-3" onPress={()=>nav(1)}><MaterialIcons name="chevron-right" size={48} color="#fff"/></Pressable>
   <View className="absolute bottom-6 flex-row gap-3 bg-black/70 rounded-full px-3 py-1">{([['-',()=>setZoom(Math.max(0.75,zoom-0.25))],['Reset',()=>setZoom(1)],['+',()=>setZoom(Math.min(3,zoom+0.25))]] as [string,()=>void][]).map(([l,f])=><Pressable key={l} onPress={f}><Text className="font-hand text-2xl text-white">{l}</Text></Pressable>)}</View>
   <Modal visible={side} transparent animationType="slide"><View className="flex-1 flex-row justify-end"><Pressable className="flex-1" onPress={()=>setSide(false)}/><View className="w-72 bg-paper dark:bg-night p-4 border-l-2 border-ink"><H icon="tune">{t('applyFilter')}</H>
    <ScrollView>{FILTERS.map(([k,label])=><Pressable key={k} onPress={()=>{setFlt(k);setSide(false)}} className={`border border-ink rounded-lg px-3 py-1 my-1 ${flt===k?'bg-pencil':''}`}><Text className={`font-hand text-xl ${flt===k?'text-ink':'text-ink dark:text-chalk'}`}>{label}</Text></Pressable>)}</ScrollView></View></View></Modal></View></Modal></Screen>}
