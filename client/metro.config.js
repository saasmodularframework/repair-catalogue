const {getDefaultConfig}=require('expo/metro-config');const {withNativeWind}=require('nativewind/metro');const path=require('path'),fs=require('fs');
const config=getDefaultConfig(__dirname);
const serverApp=path.resolve(__dirname,'../server/app.js');
if(fs.existsSync(serverApp)){const prev=config.server&&config.server.enhanceMiddleware;
 config.server={...config.server,enhanceMiddleware:(mw,server)=>{const base=prev?prev(mw,server):mw;let api;
  try{api=require(serverApp)}catch(e){console.warn('API not mounted (run npm i in ../server):',e.message);return base}
  return (req,res,next)=>/^\/(api\/|sitemap\.xml)/.test(req.url)?api(req,res,next):base(req,res,next)}}}
const nw=withNativeWind(config,{input:'./global.css'});const prev=nw.resolver.resolveRequest;
nw.resolver.resolveRequest=(ctx,name,platform)=>name==='query-string'?{type:'sourceFile',filePath:path.resolve(__dirname,'shims/query-string.js')}:(prev?prev(ctx,name,platform):ctx.resolveRequest(ctx,name,platform));
module.exports=nw;
