import {useMemo,useState} from 'react';
import {View,Text,Image,ScrollView,Pressable,Platform,NativeSyntheticEvent,NativeScrollEvent} from 'react-native';
import {useLocalSearchParams,router} from 'expo-router';
import _ from 'lodash';
import {Screen,H} from '../../src/components/Chrome';
import {SCENES,webUri} from '../../src/data/scenes';
import {useI18n} from '../../src/lib/i18n';
const TILE=140;
function LinkImg({uri,seed}:{uri:string;seed:string}){const [bad,setBad]=useState(false);
 return <Image source={{uri:bad||Platform.OS!=='web'?`https://picsum.photos/seed/${seed}/90/90`:uri}} onError={()=>setBad(true)} style={{width:90,height:90,borderRadius:8,borderWidth:2,borderColor:'#F2B705'}}/>}
export default function SceneSlug(){const {slug}=useLocalSearchParams<{slug:string}>();const {t}=useI18n();const sc=SCENES.find(s=>s.slug===slug);const [x,setX]=useState(0);
 const links=useMemo(()=>sc?_.shuffle(sc.links).map(l=>({...l,top:_.random(10,60),left:_.random(3,75)})):[],[sc]); // random order and position
 if(!sc)return <Screen title={t('notFound')}><H>{t('notFound')}</H></Screen>;
 const strip=[...sc.images,...sc.images]; // forty images, repeated as a continuation
 const idx=Math.floor(x/TILE)%sc.images.length;const opacity=Math.max(0.4,1-(x/(TILE*sc.images.length))*0.6);
 return <Screen title={`${sc.numeral}. ${sc.title}`} scroll={false}><View className="flex-1">
  <Image source={{uri:webUri(sc.images[idx],`${sc.slug}${idx}`)}} style={{position:'absolute',top:0,bottom:0,left:0,right:0,opacity}} resizeMode="cover"/>
  <View className="p-4"><H icon="home-work">{sc.numeral}. {sc.title}</H></View>
  {links.map(l=><Pressable key={l.to} onPress={()=>router.push(l.to as any)} style={{position:'absolute',top:`${l.top}%`,left:`${l.left}%`}}>
   <LinkImg uri={l.img??''} seed={l.to}/><Text className="font-hand text-lg text-white bg-black/60 text-center">{t('room.'+l.to.split('/').pop(),l.title)}</Text></Pressable>)}
  <ScrollView horizontal onScroll={(e:NativeSyntheticEvent<NativeScrollEvent>)=>setX(e.nativeEvent.contentOffset.x)} scrollEventThrottle={32} style={{position:'absolute',bottom:0,left:0,right:0,height:TILE}} showsHorizontalScrollIndicator={false}>
   {strip.map((u,i)=><Image key={i} source={{uri:webUri(u,`${sc.slug}${i%40}`)}} style={{width:TILE,height:TILE}}/>)}</ScrollView></View></Screen>}
