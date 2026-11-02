import {Text} from 'react-native';
import {Screen,H} from '../src/components/Chrome';
import SceneStage from '../src/components/SceneStage';
import {SCENES} from '../src/data/scenes';
import {useI18n} from '../src/lib/i18n';
export default function Start(){const {t}=useI18n();
 return <Screen title={t('scenes')}><H icon="apartment">{t('scenes')}</H>
  <Text className="font-hand text-xl text-ink dark:text-chalk">Hover = colour · click = bring forward · click again = enter</Text><SceneStage scenes={SCENES}/></Screen>}
