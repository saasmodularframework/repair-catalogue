import {Link} from 'expo-router';
import {Screen,H} from '../src/components/Chrome';
import {useCatalog} from '../src/lib/catalog';
import {SCENES} from '../src/data/scenes';
import {useI18n} from '../src/lib/i18n';
export default function Sitemap(){const {groups,rooms}=useCatalog();const {t}=useI18n();
 const L=({h,l}:{h:string;l:string})=><Link href={h as any} className="font-hand text-xl text-brick py-0.5">{l}</Link>;
 return <Screen title={t('sitemap')}><H icon="account-tree">{t('sitemap')}</H>
  <L h="/" l={t('scenes')}/><L h="/home" l={t('home')}/><L h="/blog" l={t('blog')}/><L h="/order" l={t('order')}/><L h="/ads" l={t('ads')}/><L h="/gallery" l={t('gallery')}/><L h="/services" l={t('services')}/>
  {SCENES.map(s=><L key={s.slug} h={'/scene/'+s.slug} l={`${s.numeral}. ${s.slug}`}/>)}
  {rooms.map(r=><L key={r.slug} h={'/room/'+r.slug} l={t('room.'+r.slug)}/>)}
  {groups.map(g=><L key={g.key} h={'/services/'+g.key} l={t('grp.'+g.key)}/>)}
  {groups.flatMap(g=>g.items).map(s=><L key={s.slug} h={'/service/'+s.slug} l={t('svc.'+s.slug)}/>)}</Screen>}
