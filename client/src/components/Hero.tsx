import {useEffect,useRef} from 'react';
import {View,Animated,Image} from 'react-native';
import {Video,ResizeMode} from 'expo-av';
import {H,P} from './Chrome';
const SIZES:[number,number][]=[[220,150],[140,200],[300,120],[160,160],[240,180]];
export function Hero({title,text,gallery=true}:{title:string;text:string;gallery?:boolean}){const o=useRef(new Animated.Value(0)).current;
 useEffect(()=>{Animated.timing(o,{toValue:1,duration:1600,delay:700,useNativeDriver:true}).start()},[o]); // lazily appearing text
 return <View><View className="h-96 rounded-xl overflow-hidden bg-ink justify-end">
  <Video source={{uri:process.env.EXPO_PUBLIC_HERO_VIDEO??''}} shouldPlay isLooping isMuted resizeMode={ResizeMode.COVER} style={{position:'absolute',top:0,bottom:0,left:0,right:0}}/>
  <Animated.View style={{opacity:o,transform:[{translateY:o.interpolate({inputRange:[0,1],outputRange:[24,0]})}]}} className="p-4 bg-black/50"><H>{title}</H><P>{text}</P></Animated.View></View>
  {gallery&&<View className="flex-row flex-wrap gap-2 mt-3">{SIZES.map(([w,h],i)=><Image key={i} source={{uri:`https://picsum.photos/seed/site${i}/${w}/${h}`}} style={{width:w,height:h,maxWidth:'100%'}} className="rounded-lg"/>)}</View>}</View>}
