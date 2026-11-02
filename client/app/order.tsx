import {useState} from 'react';
import {View,Text,Pressable,Linking,GestureResponderEvent} from 'react-native';
import {useLocalSearchParams} from 'expo-router';
import {OutlinedTextField} from 'rn-material-ui-textfield';
import {MaterialIcons} from '@expo/vector-icons';
import {Screen,H,P} from '../src/components/Chrome';
import {SearchBar} from '../src/components/SearchBar';
import {SpeedDial} from '../src/components/SpeedDial';
import {useCatalog} from '../src/lib/catalog';
import {useI18n} from '../src/lib/i18n';
import {API,post} from '../src/lib/api';
const Slip=({title,i,onPress}:{title:string;i:number;onPress:(e:GestureResponderEvent)=>void})=>
 <Pressable onPress={onPress} style={{transform:[{rotate:`${(i%5-2)*1.5}deg`}]}} className="bg-white dark:bg-chalk border border-ink/30 rounded-sm px-3 py-2 m-1"><Text className="font-hand text-xl text-ink">{title}</Text></Pressable>;
// Vertical stepper (MUI-style): numbered circles, a rail, content only under the active step
function Step({n,active,done,label,children}:{n:number;active:boolean;done:boolean;label:string;children:React.ReactNode}){
 return <View className="flex-row"><View className="items-center mr-3"><View className={`w-8 h-8 rounded-full items-center justify-center ${active||done?'bg-brick':'bg-ink/40'}`}>{done?<MaterialIcons name="check" size={18} color="#fff"/>:<Text className="font-hand text-xl text-white">{n}</Text>}</View><View className="w-0.5 flex-1 bg-ink/30 my-1"/></View>
  <View className="flex-1 pb-4"><Text className="font-hand text-2xl text-ink dark:text-chalk">{label}</Text>{active&&<View>{children}</View>}</View></View>}
export default function Order(){const {t}=useI18n();const {groups,rooms}=useCatalog();const params=useLocalSearchParams<{add?:string;room?:string}>();
 const all=groups.flatMap(g=>g.items);const [step,setStep]=useState(params.add?1:0);const [q,setQ]=useState('');const [room,setRoom]=useState(params.room??'workspace');
 const [picked,setPicked]=useState<string[]>(()=>params.add?[params.add]:[]);const [c,setC]=useState({name:'',phone:'',email:'',address:''});const [id,setId]=useState('');const [msg,setMsg]=useState('');
 const title=(s:string)=>all.find(a=>a.slug===s)?.title??s;const pdfUrl=id?`${API}/orders/${id}/pdf`:undefined;
 const summary=`Repair order\nRoom: ${room}\n${picked.map((s,i)=>`${i+1}. ${title(s)}`).join('\n')}\n${c.name} ${c.phone} ${c.email}`;
 const make=async()=>{try{const o=await post<{id:string}>('/orders',{room,items:picked.map(title),customer:c});setId(o.id);setMsg('')}catch{setMsg('Could not save the order')}};
 const send=async()=>{try{await post(`/orders/${id}/email`,{email:c.email});setMsg('Sent')}catch{setMsg('Email failed: check the address and SMTP settings')}};
 const Nav=({next=true}:{next?:boolean})=><View className="flex-row gap-4 mt-2">{step>0&&<Pressable onPress={()=>setStep(step-1)}><Text className="font-hand text-2xl text-ink dark:text-chalk">{t('back')}</Text></Pressable>}{next&&<Pressable onPress={()=>setStep(step+1)}><Text className="font-hand text-2xl text-brick">{t('next')}</Text></Pressable>}</View>;
 const F=(k:keyof typeof c,label:string,kb?:string)=><OutlinedTextField label={label} value={c[k]} keyboardType={kb} autoCapitalize="none" tintColor="#B5472F" onChangeText={(v:string)=>{setC({...c,[k]:v});setId('')}}/>;
 return <Screen title="Build order"><H icon="assignment">{t('order')}</H>
  <Step n={1} active={step===0} done={step>0} label={t('stepRoom')}><View className="flex-row flex-wrap">{rooms.map(r=><Pressable key={r.slug} onPress={()=>setRoom(r.slug)} className={`px-3 border-2 border-ink dark:border-pencil rounded-lg m-1 ${room===r.slug?'bg-pencil':''}`}><Text className="font-hand text-xl text-ink dark:text-chalk">{t('room.'+r.slug)}</Text></Pressable>)}</View><Nav/></Step>
  <Step n={2} active={step===1} done={step>1} label={t('papers')}>
   <View className="min-h-20 border-2 border-dashed border-brick rounded-xl p-2 my-2"><Text className="font-hand text-2xl text-brick">{t('field')} · {t('room.'+room)}</Text>{picked.map((s,i)=><Slip key={s} i={i} title={t('svc.'+s)} onPress={()=>{setPicked(picked.filter(x=>x!==s));setId('')}}/>)}</View>
   <SearchBar value={q} onChange={setQ} placeholder={t('search')}/><View className="flex-row flex-wrap">{all.filter(a=>t('svc.'+a.slug).toLowerCase().includes(q.toLowerCase())&&!picked.includes(a.slug)).map((a,i)=><Slip key={a.slug} i={i} title={t('svc.'+a.slug)} onPress={()=>{setPicked([...picked,a.slug]);setId('')}}/>)}</View><Nav next={!!picked.length}/></Step>
  <Step n={3} active={step===2} done={step>2} label={t('stepDetails')}>{F('name',t('name'))}{F('phone',t('phone'),'phone-pad')}{F('email',t('mail'),'email-address')}{F('address',t('address'))}<Nav/></Step>
  <Step n={4} active={step===3} done={!!id} label={t('stepPdf')}><P>{summary}</P>
   {!id?<Pressable onPress={make} className="bg-brick rounded-lg p-2 items-center"><Text className="font-hand text-2xl text-white">{t('createPdf')}</Text></Pressable>:<View><Pressable onPress={()=>Linking.openURL(pdfUrl!)}><Text className="font-hand text-2xl text-brick">{t('pdf')}</Text></Pressable><Pressable onPress={send}><Text className="font-hand text-2xl text-brick">{t('email')} → {c.email}</Text></Pressable></View>}{!!msg&&<P>{msg}</P>}<Nav next={false}/></Step>
  <SpeedDial text={summary} pdfUrl={pdfUrl}/></Screen>}

