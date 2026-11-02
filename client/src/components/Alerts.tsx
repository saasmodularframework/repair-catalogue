import {useEffect,useState} from 'react';
import {View,Text,Pressable} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useI18n} from '../lib/i18n';
const A=[{k:'a1',icon:'check-circle',bg:'#E3F1E6',bd:'#B9DBC2',fg:'#2F6B3F'},{k:'a2',icon:'info',bg:'#E1EEF6',bd:'#B7D3E6',fg:'#2C5F82'},
 {k:'a3',icon:'warning',bg:'#FBF0D9',bd:'#EBD7A5',fg:'#8A6418'},{k:'a4',icon:'error',bg:'#F8E3E0',bd:'#E8BDB7',fg:'#8F3B33'}] as const;
export function Alerts(){const {t}=useI18n();const [list,setList]=useState<string[]>(A.map(a=>a.k));const [i,setI]=useState(0);
 const n=list.length;useEffect(()=>{if(n<2)return;const id=setInterval(()=>setI(x=>(x+1)%n),5000);return()=>clearInterval(id)},[n]);
 if(!n)return null;const idx=i%n;const a=A.find(x=>x.k===list[idx])!;
 return <View style={{backgroundColor:a.bg,borderBottomColor:a.bd,borderBottomWidth:1}} className="flex-row items-center px-2 py-1">
  <Pressable accessibilityLabel="Previous alert" onPress={()=>setI((idx-1+n)%n)}><MaterialIcons name="chevron-left" size={22} color={a.fg}/></Pressable>
  <MaterialIcons name={a.icon} size={20} color={a.fg}/><Text numberOfLines={1} style={{color:a.fg}} className="flex-1 font-hand text-lg mx-2">{t(a.k)}</Text>
  <Text style={{color:a.fg}} className="font-hand text-base mr-1">{idx+1}/{n}</Text>
  <Pressable accessibilityLabel="Next alert" onPress={()=>setI((idx+1)%n)}><MaterialIcons name="chevron-right" size={22} color={a.fg}/></Pressable>
  <Pressable accessibilityLabel="Close alert" onPress={()=>{setList(list.filter(k=>k!==a.k));setI(0)}}><MaterialIcons name="close" size={20} color={a.fg}/></Pressable></View>}
