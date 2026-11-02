import {useState} from 'react';
import {View,TextInput,Pressable,Text,StyleProp,ViewStyle,GestureResponderEvent,NativeSyntheticEvent,TextInputFocusEventData} from 'react-native';
type Props={value:string;onChange:(v:string)=>void;placeholder?:string;style?:StyleProp<ViewStyle>};
export function SearchBar({value,onChange,placeholder,style}:Props){const [focus,setFocus]=useState(false);

 const onFocus=(e:NativeSyntheticEvent<TextInputFocusEventData>)=>{setFocus(true);console.debug('focus target',e.nativeEvent.target)};
 const onBlur=(e:NativeSyntheticEvent<TextInputFocusEventData>)=>{setFocus(false);console.debug('blur target',e.nativeEvent.target)};

 const clear=(e:GestureResponderEvent)=>{console.debug('press x',e.nativeEvent.locationX);onChange('')};
 return <View style={[{borderWidth:focus?3:2},style]} className="flex-row items-center border-ink dark:border-pencil rounded-xl bg-white/70 dark:bg-ink px-3 my-2">
  <TextInput value={value} onChangeText={onChange} onFocus={onFocus} onBlur={onBlur} placeholder={placeholder} placeholderTextColor="#888" className="flex-1 py-2 font-hand text-xl text-ink dark:text-chalk"/>
  {!!value&&<Pressable onPress={clear}><Text className="font-hand text-2xl text-brick">✕</Text></Pressable>}</View>}
