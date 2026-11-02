import {useState} from 'react';
import {View,Text,Pressable} from 'react-native';
export const dayKey=(d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
export const usDate=(d:Date)=>d.toLocaleDateString('en-US',{month:'2-digit',day:'2-digit',year:'numeric'}); // MM/DD/YYYY
export const fromUs=(u:string)=>{const [m,d,y]=u.split('/');return y&&m&&d?`${y}-${m.padStart(2,'0')}-${d.padStart(2,'0')}`:null};
export function CalendarPicker({marked,selected,onSelect}:{marked:Set<string>;selected:string|null;onSelect:(k:string|null)=>void}){
 const [m,setM]=useState(new Date());const first=new Date(m.getFullYear(),m.getMonth(),1);const n=new Date(m.getFullYear(),m.getMonth()+1,0).getDate();
 const cells:(number|null)[]=[...Array(first.getDay()).fill(null),...Array.from({length:n},(_,i)=>i+1)];
 return <View className="border-2 border-ink dark:border-pencil rounded-xl p-2 my-2">
  <View className="flex-row justify-between"><Pressable onPress={()=>setM(new Date(m.getFullYear(),m.getMonth()-1,1))}><Text className="font-hand text-2xl text-brick">‹</Text></Pressable>
   <Text className="font-hand text-2xl text-ink dark:text-chalk">{m.toLocaleString([], {month:'long',year:'numeric'})}</Text>
   <Pressable onPress={()=>setM(new Date(m.getFullYear(),m.getMonth()+1,1))}><Text className="font-hand text-2xl text-brick">›</Text></Pressable></View>
  <View className="flex-row flex-wrap">{cells.map((d,i)=>{const k=d?dayKey(new Date(m.getFullYear(),m.getMonth(),d)):'';
   return <View key={i} style={{width:'14.28%'}} className="items-center py-1">{d?<Pressable onPress={()=>onSelect(selected===k?null:k)} className={`w-8 h-8 rounded-full items-center justify-center ${selected===k?'bg-brick':marked.has(k)?'bg-pencil':''}`}>
    <Text className="font-hand text-lg text-ink dark:text-chalk">{d}</Text></Pressable>:null}</View>})}</View></View>}
