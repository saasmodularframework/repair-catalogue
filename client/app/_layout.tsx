import '../global.css';
import {Slot} from 'expo-router';
import {useFonts,Caveat_500Medium} from '@expo-google-fonts/caveat';
import {ActivityIndicator,View} from 'react-native';
import {I18nProvider} from '../src/lib/i18n';
import {CatalogProvider} from '../src/lib/catalog';
export default function Root(){const [ok]=useFonts({Caveat_500Medium});
 if(!ok)return <View className="flex-1 items-center justify-center"><ActivityIndicator/></View>;
 return <I18nProvider><CatalogProvider><Slot/></CatalogProvider></I18nProvider>}
