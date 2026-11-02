const fs=require('fs'),path=require('path');const dir=path.join(__dirname,'..','public','models');
const files=fs.readdirSync(dir).filter(f=>/\.(jpe?g|png|webp)$/i.test(f)).sort();
fs.mkdirSync(path.join(__dirname,'..','src','data'),{recursive:true});
fs.writeFileSync(path.join(__dirname,'..','src','data','models-manifest.json'),JSON.stringify({files},null,1));console.log('manifest:',files.length,'images');
