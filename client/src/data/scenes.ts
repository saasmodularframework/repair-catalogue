import {Platform} from 'react-native';
import type {Scene} from '../lib/api';
export const webUri=(path:string,seed:string,w=140,h=140)=>Platform.OS==='web'?path:`https://picsum.photos/seed/${seed}/${w}/${h}`;
const ROOM_LINKS=[['workspace','01'],['hallway','02'],['kitchen','03'],['storage','04'],['laundry','06']];
const TITLES=['Three-store Amsterdam-like cottage','Two-store industrial building','Residential loft apartment','Nine-store commercial tower','Ten-store renaissance skyscraper'];
const OTHER=[['workspace','Workspace'],['kitchen','Kitchen'],['lounge','Lounge'],['balcony','Balcony'],['hallway','Hallway']];
export const SCENES:Scene[]=TITLES.map((title,i)=>{const slug=`scene-0${i+1}`;
 return {slug,title,numeral:['I','II','III','IV','V'][i],model:`/models/${slug}.glb`,
  images:Array.from({length:40},(_,k)=>`/models/${slug}-image-${String(k+1).padStart(2,'0')}.jpg`),
  links:slug==='scene-03'?ROOM_LINKS.map(([r,n])=>({to:'/room/'+r,title:r,img:`/models/apartment-floor-template-${n}.jpg`})):OTHER.map(([r,t])=>({to:'/room/'+r,title:t}))}});
