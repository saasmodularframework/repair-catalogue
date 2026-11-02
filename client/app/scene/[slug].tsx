import {useMemo,useState} from 'react';
import {View,Text,Image,ScrollView,Pressable,Modal,Platform,NativeSyntheticEvent,NativeScrollEvent} from 'react-native';
import {useLocalSearchParams,router} from 'expo-router';
import _ from 'lodash';
import {Screen,H} from '../../src/components/Chrome';
import {SCENES,webUri} from '../../src/data/scenes';
import {useI18n} from '../../src/lib/i18n';
const TILE=140,THUMB=90;
const imgUri=(uri:string,bad:boolean,seed:string,size:number)=>bad||Platform.OS!=='web'||!uri?`https://picsum.photos/seed/${seed}/${size}/${size}`:uri;
function LinkImg({uri,seed,size=THUMB}:{uri:string;seed:string;size?:number}){const [bad,setBad]=useState(false);
 return <Image source={{uri:imgUri(uri,bad,seed,size)}} onError={()=>setBad(true)} style={{width:size,height:size,borderRadius:8,borderWidth:2,borderColor:'#F2B705'}}/>}
type L={to:string;title:string;img?:string;top:number;left:number};
export default function SceneSlug(){const {slug}=useLocalSearchParams<{slug:string}>();const {t}=useI18n();const sc=SCENES.find(s=>s.slug===slug);const [x,setX]=useState(0);const [big,setBig]=useState<L|null>(null);
 const links:L[]=useMemo(()=>sc?_.shuffle(sc.links).map(l=>({...l,top:_.random(10,60),left:_.random(3,75)})):[],[sc]); // random order and position
 if(!sc)return <Screen title={t('notFound')}><H>{t('notFound')}</H></Screen>;
 const name=(l:L)=>t('room.'+l.to.split('/').pop(),l.title);const strip=[...sc.images,...sc.images];
 const idx=Math.floor(x/TILE)%sc.images.length;const opacity=Math.max(0.4,1-(x/(TILE*sc.images.length))*0.6);
 return <Screen title={`${sc.numeral}. ${sc.title}`} scroll={false}><View className="flex-1">
  <Image source={{uri:webUri(sc.images[idx],`${sc.slug}${idx}`)}} style={{position:'absolute',top:0,bottom:0,left:0,right:0,opacity}} resizeMode="cover"/>
  <View className="p-4"><H icon="home-work">{sc.numeral}. {sc.title}</H></View>
  {links.map(l=><Pressable key={l.to} onPress={()=>l.img?setBig(l):router.push(l.to as any)} style={{position:'absolute',top:`${l.top}%`,left:`${l.left}%`}}>
   <LinkImg uri={l.img??''} seed={l.to}/><Text className="font-hand text-lg text-white bg-black/60 text-center">{name(l)}</Text></Pressable>)}
  <ScrollView horizontal onScroll={(e:NativeSyntheticEvent<NativeScrollEvent>)=>setX(e.nativeEvent.contentOffset.x)} scrollEventThrottle={32} style={{position:'absolute',bottom:0,left:0,right:0,height:TILE}} showsHorizontalScrollIndicator={false}>
   {strip.map((u,i)=><Image key={i} source={{uri:webUri(u,`${sc.slug}${i%40}`)}} style={{width:TILE,height:TILE}}/>)}</ScrollView></View>
  <Modal transparent visible={!!big} animationType="fade" onRequestClose={()=>setBig(null)}><View className="flex-1 bg-black/80 items-center justify-center">
   {big&&<View className="items-center"><LinkImg uri={big.img??''} seed={big.to} size={THUMB*3}/><Text className="font-hand text-2xl text-white mt-2">{name(big)}</Text>
    <View className="flex-row gap-6 mt-3"><Pressable onPress={()=>{const to=big.to;setBig(null);router.push(to as any)}}><Text className="font-hand text-2xl text-pencil">{t('openPage')}</Text></Pressable>
     <Pressable onPress={()=>setBig(null)}><Text className="font-hand text-2xl text-white">{t('close')} ✕</Text></Pressable></View></View>}</View></Modal></Screen>}
