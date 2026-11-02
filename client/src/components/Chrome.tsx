import {ReactNode,useEffect,useState} from 'react';
import {View,Text,Pressable,ScrollView,StatusBar,ActivityIndicator,Platform,Image,useWindowDimensions,GestureResponderEvent} from 'react-native';
import {Link,usePathname} from 'expo-router';
import {useColorScheme} from 'nativewind';
import {LANGS,useI18n} from '../lib/i18n';
import {useCatalog} from '../lib/catalog';
import {MaterialIcons} from '@expo/vector-icons';
import {Alerts} from './Alerts';
export const useDark=()=>useColorScheme().colorScheme==='dark';

function ThemeSwitch(){const {colorScheme,toggleColorScheme}=useColorScheme();const dark=colorScheme==='dark';
 return <Pressable accessibilityLabel="Day / night" onPress={toggleColorScheme} className="w-9 h-9 rounded-full border-2 border-ink overflow-hidden flex-row">
  <View className={dark?'flex-1 bg-ink':'flex-1 bg-transparent'}/><View className="flex-1 bg-ink"/></Pressable>}

function LanguageDropdown(){const {lang,setLang}=useI18n();const [open,setOpen]=useState(false);
 return <View className="relative z-50"><Pressable onPress={()=>setOpen(!open)} className="px-3 border-2 border-ink rounded-lg"><Text className="font-hand text-xl text-ink">{lang.toUpperCase()} ▾</Text></Pressable>
  {open&&<View className="absolute top-10 right-0 bg-paper dark:bg-night border-2 border-ink rounded-lg">
   {LANGS.map(l=><Pressable key={l} onPress={()=>{setLang(l);setOpen(false)}} className="px-4 py-1"><Text className="font-hand text-xl text-ink dark:text-chalk">{l.toUpperCase()}</Text></Pressable>)}</View>}</View>}

function Menu({onClose}:{onClose:()=>void}){const {t}=useI18n();const {groups,rooms}=useCatalog();
 const L=({href,label}:{href:string;label:string})=><Link href={href as any} onPress={onClose} className="font-hand text-xl text-ink dark:text-chalk py-1">{label}</Link>;
 return <ScrollView className="max-h-96 bg-paper dark:bg-night border-b-2 border-ink px-4 py-2">
  <L href="/" label={t('scenes')}/><L href="/home" label={t('home')}/><L href="/ads" label={t('ads')}/><L href="/services" label={t('services')}/><L href="/gallery" label={t('gallery')}/><L href="/blog" label={t('blog')}/><L href="/order" label={t('order')}/><L href="/sitemap" label={t('sitemap')}/>
  <Text className="font-hand text-2xl text-brick mt-2">{t('rooms')}</Text>{rooms.map(r=><L key={r.slug} href={'/room/'+r.slug} label={t('room.'+r.slug)}/>)}
  <Text className="font-hand text-2xl text-brick mt-2">{t('services')}</Text>{groups.flatMap(g=>g.items).map(s=><L key={s.slug} href={'/service/'+s.slug} label={t('svc.'+s.slug)}/>)}</ScrollView>}

function Header(){const [open,setOpen]=useState(false);const {t}=useI18n();
 return <View className="z-50 bg-pencil"><View className="flex-row items-center justify-between px-4 py-2">
  <Pressable accessibilityLabel="Menu" onPress={(_e:GestureResponderEvent)=>setOpen(!open)} className="gap-1">{[0].map(i=><MaterialIcons key={i} name="menu" size={30} color="#1B2A41"/>)}</Pressable>
  <Text className="font-hand text-3xl text-ink">Repair Studio</Text><View className="flex-row items-center gap-3"><LanguageDropdown/><ThemeSwitch/></View></View>
  <View className="bg-ink py-1"><Text className="font-hand text-lg text-pencil text-center">{t('a2')}</Text></View>
  {open&&<Menu onClose={()=>setOpen(false)}/>}</View>}

function Banner({side}:{side:'left'|'right'}){const [bad,setBad]=useState(false);const n=side==='left'?'01':'02';

 const uri=bad||Platform.OS!=='web'?`https://picsum.photos/seed/banner${n}/160/600`:`/models/banner-image-${n}.jpg`;
 return <View className="w-40 p-2 bg-chalk dark:bg-ink"><Image source={{uri}} onError={()=>setBad(true)} className="w-full h-96 rounded" resizeMode="cover"/></View>}

function Breadcrumb(){const {t}=useI18n();const NAV:Record<string,string>={room:'rooms',service:'services',services:'services',scene:'scenes',blog:'blog',order:'order',ads:'ads',gallery:'gallery',sitemap:'sitemap',home:'home'};const p=usePathname().split('/').filter(Boolean);let acc='';
 return <View className="flex-row flex-wrap px-4 pt-2"><Link href="/" className="font-hand text-lg text-brick">{t('home')}</Link>{p.map(s=>{acc+='/'+s;return <Text key={acc} className="font-hand text-lg text-ink dark:text-chalk"> / <Link href={acc as any}>{NAV[s]?t(NAV[s]):t(['svc.'+s,'room.'+s,'grp.'+s],s.replace(/-/g,' '))}</Link></Text>})}</View>}

function Footer(){const [now,setNow]=useState(new Date());const path=usePathname();
 useEffect(()=>{const i=setInterval(()=>setNow(new Date()),30000);return()=>clearInterval(i)},[]);
 return <View className="bg-ink px-4 py-2 flex-row justify-between"><Text className="font-hand text-lg text-chalk">© {now.getFullYear()} Repair Studio</Text><Text className="font-hand text-lg text-pencil">{path} · {now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</Text></View>}

export function Screen({title,children,scroll=true}:{title:string;children:ReactNode;scroll?:boolean}){
 const [busy,setBusy]=useState(true);const dark=useDark();const {width}=useWindowDimensions();
 useEffect(()=>{setBusy(true);if(Platform.OS==='web'){document.title=title+' · Repair Studio'} 
  const t=setTimeout(()=>setBusy(false),500);return()=>clearTimeout(t)},[title]);
 const body=busy?<View className="flex-1 items-center justify-center p-10"><ActivityIndicator size="large" color="#F2B705"/></View>:children;
 return <View className="flex-1 bg-paper dark:bg-night"><StatusBar barStyle={dark?'light-content':'dark-content'} backgroundColor="#F2B705"/>
  <Header/><View className="flex-1 flex-row">{width>=900&&<Banner side="left"/>}
  <View className="flex-1"><Alerts/><Breadcrumb/>{scroll?<ScrollView contentContainerClassName="p-4">{body}</ScrollView>:<View className="flex-1">{body}</View>}</View>
  {width>=900&&<Banner side="right"/>}</View><Footer/></View>}
export const H=({children,icon='construction'}:{children:ReactNode;icon?:keyof typeof MaterialIcons.glyphMap})=><View className="flex-row items-center gap-2 mb-2"><MaterialIcons name={icon} size={30} color="#B5472F"/><Text className="font-hand text-4xl text-ink dark:text-chalk">{children}</Text></View>;
export const P=({children}:{children:ReactNode})=><Text className="font-hand text-xl text-ink dark:text-chalk mb-2">{children}</Text>;
