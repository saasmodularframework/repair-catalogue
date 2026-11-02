import {useMemo,useState} from 'react';
import {View,Text,Image,Platform,Linking,Pressable} from 'react-native';
import _ from 'lodash';
const CANDIDATES=8;
function Pic({slug,n,w,align}:{slug:string;n:number;w:number;align:'flex-start'|'center'|'flex-end'}){const [bad,setBad]=useState(false);if(bad)return null;const h=Math.round(w*0.7);
 const uri=Platform.OS==='web'?`/models/${slug}-image-${String(n).padStart(2,'0')}.jpg`:`https://picsum.photos/seed/${slug}${n}/${w}/${h}`;
 return <Image source={{uri}} onError={()=>setBad(true)} style={{width:w,height:h,maxWidth:'100%',alignSelf:align,borderRadius:8,marginVertical:8}}/>}
export function Article({slug,text,source,sourceLabel}:{slug:string;text?:string;source?:{title:string;url:string};sourceLabel:string}){
 const pics=useMemo(()=>_.shuffle(_.range(1,CANDIDATES+1)).map(n=>({n,w:_.random(140,340),align:_.sample(['flex-start','center','flex-end']) as 'flex-start'|'center'|'flex-end'})),[slug]);
 const paras=useMemo(()=>_.chunk(text?.match(/[^.!?。]+[.!?。]*\s*/g)??(text?[text]:[]),2).map(c=>c.join('').trim()),[text]);
 const P=(i:number)=>pics[i]&&<Pic key={'p'+i} slug={slug} {...pics[i]}/>;
 return <View className="mt-4">{paras.map((p,i)=><View key={i}><Text className="font-hand text-xl text-ink dark:text-chalk">{p}</Text>{P(i)}</View>)}{pics.slice(paras.length).map((_p,i)=>P(paras.length+i))}
  {!!source&&<Pressable onPress={()=>Linking.openURL(source.url)}><Text className="font-hand text-base text-brick mt-2">{sourceLabel} · {source.title} · CC BY-SA 4.0</Text></Pressable>}</View>}
