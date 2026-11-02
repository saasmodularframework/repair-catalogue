import {useState} from 'react';
import {View,Text,Pressable,Share,Linking,Platform} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
export function SpeedDial({text,pdfUrl}:{text:string;pdfUrl?:string}){const [open,setOpen]=useState(false);const [note,setNote]=useState('');
 const go=(f:()=>unknown,n:string)=>async()=>{await f();setNote(n);setOpen(false);setTimeout(()=>setNote(''),1500)};
 const A:{icon:keyof typeof MaterialIcons.glyphMap;label:string;run:()=>unknown}[]=[
  {icon:'share',label:'Share',run:()=>Share.share({message:text})},
  {icon:'print',label:'Print',run:()=>pdfUrl?Linking.openURL(pdfUrl):Platform.OS==='web'?window.print():undefined},
  {icon:'save',label:'Save',run:()=>pdfUrl&&Linking.openURL(pdfUrl)},
  {icon:'content-copy',label:'Copy',run:()=>Clipboard.setStringAsync(text)}];
 return <View className="absolute bottom-4 right-4 items-end z-50">
  {open&&A.map(a=><Pressable key={a.label} onPress={go(a.run,a.label+' done')} className="flex-row items-center mb-2"><Text className="font-hand text-xl bg-ink text-chalk px-2 rounded mr-2">{a.label}</Text>
   <View className="w-11 h-11 rounded-full bg-chalk items-center justify-center border-2 border-ink"><MaterialIcons name={a.icon} size={22} color="#1B2A41"/></View></Pressable>)}
  {!!note&&<Text className="font-hand text-lg text-brick">{note}</Text>}
  <Pressable accessibilityLabel="Speed dial" onPress={()=>setOpen(!open)} className="w-14 h-14 rounded-full bg-brick items-center justify-center"><MaterialIcons name={open?'close':'add'} size={28} color="#fff"/></Pressable></View>}
