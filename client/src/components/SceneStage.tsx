import {View,Text} from 'react-native';
import {Link} from 'expo-router';
import type {Scene} from '../lib/api';

export default function SceneStage({scenes}:{scenes:Scene[]}){return <View>{scenes.map(s=><Link key={s.slug} href={('/scene/'+s.slug) as any} className="font-hand text-2xl text-brick py-1">{s.numeral}. {s.title}</Link>)}<Text className="font-hand text-lg text-ink dark:text-chalk">The 3D stage runs on web.</Text></View>}
