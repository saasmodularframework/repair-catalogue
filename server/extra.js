const sharp=require('sharp');const {services,rooms}=require('./data');
const KEYS=['price','days','crew','area','rating','warranty'];
const seed=()=>services.flatMap(s=>[0,1]).map((_,n)=>{const s=services[Math.floor(n/2)],r=k=>((n*37+k*91+7)%100)/100;
 return {id:'ad'+n,title:s.title,slug:s.slug,price:Math.round(50+r(1)*4950),days:Math.round(1+r(2)*59),crew:Math.round(1+r(3)*11),area:Math.round(5+r(4)*495),rating:Math.round((1+r(5)*4)*10)/10,warranty:Math.round(r(6)*60)}});
const rng=(a,b,skip=[])=>Array.from({length:b-a+1},(_,i)=>a+i).filter(i=>!skip.includes(i));
const gen=(p,nums)=>nums.map(i=>({img_url:`https://govsim.pythonanywhere.com/static/${p}${String(i).padStart(2,'0')}.jpg`,alt:`${p.toUpperCase().replace(/-/g,'')} Placeholder ${i}`}));
const slides=[...gen('image-',rng(1,25)),...gen('sw-image-',[...rng(1,19),...rng(22,26)]),...gen('cn-image-',rng(1,18)),...gen('pb-image-',rng(1,24)),...gen('bw-image-',rng(2,42)),...gen('ra-image-',rng(1,46)),...gen('st-image-',[...rng(1,8),...rng(11,25)])];
const K=(a)=>({conv:{width:3,height:3,kernel:a}});
const FILTERS={ '':{label:'Normal',f:i=>i},grayscale:{label:'Grayscale',f:i=>i.grayscale()},sepia:{label:'Sepia',f:i=>i.grayscale().tint('#a0743c')},
 blur:{label:'Blur',f:i=>i.blur(2)},'gaussian-blur':{label:'Blur Ext',f:i=>i.blur(5)},sharpen:{label:'Sharpen',f:i=>i.sharpen({sigma:2})},smooth:{label:'Smooth',f:i=>i.median(5)},
 invert:{label:'Invert',f:i=>i.negate()},enhance:{label:'Enhance',f:i=>i.modulate({saturation:1.6}).sharpen()},
 emboss:{label:'Remap',f:i=>i.grayscale().convolve({width:3,height:3,kernel:[-2,-1,0,-1,1,1,0,1,2],offset:128})},
 edges:{label:'Detect',f:i=>i.grayscale().convolve({width:3,height:3,kernel:[-1,-1,-1,-1,8,-1,-1,-1,-1]})},
 sketch:{label:'Sketch',f:i=>i.grayscale().convolve({width:3,height:3,kernel:[-1,-1,-1,-1,8,-1,-1,-1,-1]}).negate()},
 cutout:{label:'Cutout',f:i=>i.png({palette:true,colors:4})},solarize:{label:'Solarize',f:i=>i.threshold(128)}};
const SCENES=[['scene-03','Loft apartment with programming workspace','I'],['scene-05','Ten-store renaissance skyscraper with attic','II'],
 ['scene-01','Three-store Amsterdam-like cottage','III'],['scene-04','Nine-store tower with shopping-mall ground floor','IV'],['scene-02','Two-store industrial building','V']]
 .map(([slug,title])=>({slug,title,numeral:['I','II','III','IV','V'][+slug.slice(-2)-1],model:`/models/${slug}.glb`,
  images:Array.from({length:40},(_,i)=>`https://picsum.photos/seed/${slug}${i%20}/140/140`),
  links:[...rooms.slice(0,3).map(r=>({to:'/room/'+r.slug,title:r.title})),...services.slice(0,2).map(s=>({to:'/service/'+s.slug,title:s.title}))]}));
module.exports=(r,get,set)=>{
 r.get('/ads',async(q,s)=>{let ads=await get('ads');if(!ads){ads=seed();await set('ads',ads)}
  const f=ads.filter(a=>KEYS.every(k=>{const v=Number(q.query[k]);return isNaN(v)||(k==='rating'?a[k]>=v:a[k]<=v)}));
  const page=Math.max(1,parseInt(q.query.page)||1),per=4;s.json({items:f.slice((page-1)*per,page*per),total:f.length,pages:Math.max(1,Math.ceil(f.length/per)),page})});
 r.get('/gallery',(q,s)=>s.json({slides,filters:Object.entries(FILTERS).map(([k,v])=>({key:k,label:v.label}))}));
 r.get('/gallery/img',async(q,s)=>{try{const u=new URL(String(q.query.src));if(u.hostname!=='govsim.pythonanywhere.com')return s.sendStatus(400); // SSRF guard
  const F=FILTERS[q.query.filter||''];if(!F)return s.sendStatus(400);
  const buf=Buffer.from(await (await fetch(u,{signal:AbortSignal.timeout(5000)})).arrayBuffer());
  s.type('image/png').set('Cache-Control','public, max-age=86400').send(await F.f(sharp(buf).resize(640,480,{fit:'cover'})).png().toBuffer())}catch{s.sendStatus(502)}});
 r.get('/scenes',(q,s)=>s.json(SCENES));
};
