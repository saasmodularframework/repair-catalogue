const enc=encodeURIComponent,dec=s=>{try{return decodeURIComponent(s.replace(/\+/g,' '))}catch{return s}};
function stringify(obj){if(!obj)return '';return Object.keys(obj).filter(k=>obj[k]!==undefined).sort().map(k=>{const v=obj[k];
 if(v===null)return enc(k);if(Array.isArray(v))return v.filter(x=>x!==undefined).map(x=>x===null?enc(k):enc(k)+'='+enc(x)).join('&');return enc(k)+'='+enc(v)}).filter(Boolean).join('&')}
function parse(str){const out={};if(typeof str!=='string')return out;str=str.trim().replace(/^[?#&]/,'');if(!str)return out;
 for(const part of str.split('&')){if(!part)continue;const i=part.indexOf('=');const k=dec(i<0?part:part.slice(0,i));const v=i<0?null:dec(part.slice(i+1));
  if(k in out){out[k]=[].concat(out[k],v)}else out[k]=v}return out}
const extract=u=>{u=String(u).split('#')[0];const i=u.indexOf('?');return i<0?'':u.slice(i+1)};
function parseUrl(u){const [no,hash]=String(u).split('#');const [url]=no.split('?');return {url,query:parse(extract(no)),...(hash!==undefined?{fragmentIdentifier:hash}:{})}}
function stringifyUrl({url,query,fragmentIdentifier}){const q=stringify({...parse(extract(url)),...query});return String(url).split('#')[0].split('?')[0]+(q?'?'+q:'')+(fragmentIdentifier?'#'+fragmentIdentifier:'')}
module.exports={stringify,parse,extract,parseUrl,stringifyUrl};module.exports.default=module.exports;
