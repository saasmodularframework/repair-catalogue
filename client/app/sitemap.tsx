import {View,Text} from 'react-native';
import {Link} from 'expo-router';
import {Screen,H,Grid} from '../src/components/Chrome';
import {useCatalog} from '../src/lib/catalog';
import {SCENES} from '../src/data/scenes';
import {useI18n} from '../src/lib/i18n';
const Card=({title,children}:{title:string;children:React.ReactNode})=><View className="border-2 border-ink/30 dark:border-pencil/60 rounded-xl p-3 bg-white/50 dark:bg-ink"><Text className="font-hand text-2xl text-brick mb-1">{title}</Text>{children}</View>;
const L=({h,l}:{h:string;l:string})=><Link href={h as any} className="font-hand text-lg text-ink dark:text-chalk py-0.5">{l}</Link>;
export default function Sitemap(){const {groups,rooms}=useCatalog();const {t}=useI18n();
 return <Screen title={t('sitemap')}><H icon="account-tree">{t('sitemap')}</H><Grid>
  <Card title={t('home')}><L h="/" l={t('scenes')}/><L h="/home" l={t('home')}/><L h="/blog" l={t('blog')}/><L h="/order" l={t('order')}/><L h="/ads" l={t('ads')}/><L h="/gallery" l={t('gallery')}/><L h="/services" l={t('services')}/></Card>
  <Card title={t('scenes')}>{SCENES.map(s=><L key={s.slug} h={'/scene/'+s.slug} l={`${s.numeral}. ${s.slug}`}/>)}</Card>
  <Card title={t('rooms')}>{rooms.map(r=><L key={r.slug} h={'/room/'+r.slug} l={t('room.'+r.slug)}/>)}</Card>
  {groups.map(g=><Card key={g.key} title={t('grp.'+g.key)}>{g.items.map(s=><L key={s.slug} h={'/service/'+s.slug} l={t('svc.'+s.slug)}/>)}</Card>)}</Grid></Screen>}
