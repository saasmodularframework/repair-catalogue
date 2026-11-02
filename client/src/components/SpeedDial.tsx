import {useEffect,useRef,useState} from 'react';
import {View,Text,Pressable,Share,Linking,Platform} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

export function SpeedDial({text,pdfUrl,title='Repair order'}:{text:string;pdfUrl?:string;title?:string}){
 const [open,setOpen]=useState(false);const [note,setNote]=useState('');const blob=useRef<Blob|null>(null);
 useEffect(()=>{blob.current=null;if(Platform.OS!=='web'||!pdfUrl)return;let live=true; 
  fetch(pdfUrl).then(r=>r.blob()).then(b=>{if(live)blob.current=b}).catch(()=>{});return()=>{live=false}},[pdfUrl]);
 const done=(n:string)=>{setNote(n);setOpen(false);setTimeout(()=>setNote(''),1500)};
 const web=()=>navigator as any;
 const share=()=>{if(Platform.OS==='web'){const nav=web();const file=blob.current?new File([blob.current],'repair-order.pdf',{type:'application/pdf'}):null;
   const p=file&&nav.canShare?.({files:[file]})?nav.share({files:[file],title,text}):nav.share?nav.share({title,text,url:pdfUrl}):Clipboard.setStringAsync(text);
   return Promise.resolve(p).then(()=>done('Shared')).catch((e:any)=>{if(e?.name!=='AbortError')done('Share failed');else setOpen(false)})}
  return Share.share({title,message:text,url:pdfUrl}).then(()=>done('Shared')).catch(()=>setOpen(false))};
 const print=()=>{if(pdfUrl)Linking.openURL(pdfUrl);else if(Platform.OS==='web')window.print();done('Print')};
 const save=()=>{if(!pdfUrl)return done('Create the PDF first');
  if(Platform.OS==='web'&&blob.current){const a=document.createElement('a');a.href=URL.createObjectURL(blob.current);a.download='repair-order.pdf';document.body.appendChild(a);a.click();a.remove()}else Linking.openURL(pdfUrl);done('Saved')};
 const copy=()=>Clipboard.setStringAsync(text).then(()=>done('Copied'));
 const A:{icon:keyof typeof MaterialIcons.glyphMap;label:string;run:()=>unknown}[]=[{icon:'ios-share' as any,label:'Share',run:share},{icon:'print',label:'Print',run:print},{icon:'save',label:'Save',run:save},{icon:'content-copy',label:'Copy',run:copy}];
 return <View className="absolute bottom-4 right-4 items-end z-50">
  {open&&A.map(a=><Pressable key={a.label} onPress={()=>{a.run()}} className="flex-row items-center mb-2"><Text className="font-hand text-xl bg-ink text-chalk px-2 rounded mr-2">{a.label}</Text>
   <View className="w-11 h-11 rounded-full bg-chalk items-center justify-center border-2 border-ink"><MaterialIcons name={a.icon==='ios-share'?'share':a.icon} size={22} color="#1B2A41"/></View></Pressable>)}
  {!!note&&<Text className="font-hand text-lg text-brick">{note}</Text>}
  <Pressable accessibilityLabel="Speed dial" onPress={()=>setOpen(!open)} className="w-14 h-14 rounded-full bg-brick items-center justify-center"><MaterialIcons name={open?'close':'add'} size={28} color="#fff"/></Pressable></View>}
