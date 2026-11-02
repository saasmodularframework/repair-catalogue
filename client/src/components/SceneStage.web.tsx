import {Component,ReactNode,Suspense,useEffect,useMemo,useRef,useState} from 'react';
import {View,Text} from 'react-native';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import {useGLTF,Html} from '@react-three/drei';
import * as THREE from 'three';
import {router} from 'expo-router';
import type {Scene} from '../lib/api';
const FOG_SECONDS=6;
function Building({s,i,sel,setSel,onFocused}:{s:Scene;i:number;sel:number|null;setSel:(n:number|null)=>void;onFocused:()=>void}){
 const {scene}=useGLTF(s.model);const g=useRef<THREE.Group>(null);const [colour,setColour]=useState(false);const done=useRef(false);
 const obj=useMemo(()=>{const c=scene.clone(true);const b=new THREE.Box3().setFromObject(c);const z=b.getSize(new THREE.Vector3());c.scale.setScalar(2.2/Math.max(z.x,z.y,z.z));
  const b2=new THREE.Box3().setFromObject(c);c.position.set(-(b2.min.x+b2.max.x)/2,-b2.min.y,-(b2.min.z+b2.max.z)/2);
  c.traverse(o=>{const m=o as THREE.Mesh;if(m.isMesh){const mm=(m.material as THREE.MeshStandardMaterial).clone();mm.userData.col=mm.color.clone();m.material=mm}});return c},[scene]);
 useEffect(()=>{obj.traverse(o=>{const m=o as THREE.Mesh;if(!m.isMesh)return;const mm=m.material as THREE.MeshStandardMaterial;
  if(colour)mm.color.copy(mm.userData.col);else{const c=mm.userData.col as THREE.Color;mm.color.setScalar(0.3*c.r+0.59*c.g+0.11*c.b)}})},[colour,obj]); // black-scale until hovered, then stays in colour
 useEffect(()=>{done.current=false},[sel]);
 useFrame((st,dt)=>{const grp=g.current;if(!grp)return;const t=st.clock.elapsedTime-i*0.18;if(t<0)return;
  let x=(i-2)*3,z=0,sc=1;
  if(sel!==null){if(sel===i){x=0;z=1.5;sc=2}else{const j=i<sel?i:i-1;x=(j-1.5)*1.7;z=-1;sc=1/3}}
  const k=1-Math.exp(-4*dt);grp.position.x+=(x-grp.position.x)*k;grp.position.z+=(z-grp.position.z)*k;grp.position.y+=(0-grp.position.y)*(1-Math.exp(-2.5*dt)); // slight fall onto the invisible line
  grp.scale.setScalar(grp.scale.x+(sc-grp.scale.x)*k);
  if(sel===i&&!done.current&&Math.abs(grp.scale.x-2)<0.02&&Math.abs(grp.position.x)<0.02){done.current=true;onFocused()}});
 return <group ref={g} position={[(i-2)*3,5,0]} onPointerOver={e=>{e.stopPropagation();setColour(true)}} onClick={e=>{e.stopPropagation();sel===i?router.push(('/scene/'+s.slug) as any):setSel(i)}}>
  <primitive object={obj}/>
  <Html position={[0,-0.25,1.4]} center style={{pointerEvents:'none'}}><div style={{width:44,height:44,borderRadius:'50%',background:'radial-gradient(circle at 35% 30%,#e0a96d,#8a5a2b 70%)',border:'3px solid #5c3a18',color:'#3b2410',fontWeight:700,fontFamily:'serif',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 2px 6px #0006'}}>{s.numeral}</div></Html></group>}
function Fog({startedAt}:{startedAt:number|null}){const {scene}=useThree();
 useFrame(()=>{if(startedAt===null){scene.fog=null;return}const t=(performance.now()-startedAt)/1000;
  if(t>=FOG_SECONDS){scene.fog=null;return}if(!scene.fog)scene.fog=new THREE.FogExp2('#d8dde0',0.4);(scene.fog as THREE.FogExp2).density=0.4*(1-t/FOG_SECONDS)}); // gone six seconds after full enlarge
 return null}
class Boundary extends Component<{children:ReactNode},{err:string|null}>{state={err:null as string|null};static getDerivedStateFromError(e:Error){return {err:e.message}};
 render(){return this.state.err?<Text style={{color:'#B5472F',fontSize:18,padding:12}}>3D error: {this.state.err}</Text>:this.props.children}}
export default function SceneStage({scenes}:{scenes:Scene[]}){const [sel,setSel]=useState<number|null>(null);const [fogAt,setFogAt]=useState<number|null>(null);
 useEffect(()=>{if(sel===null)setFogAt(null)},[sel]);
 return <Boundary><View style={{height:560}}><Canvas camera={{position:[0,2.2,9],fov:45}} onPointerMissed={()=>setSel(null)}>
  <color attach="background" args={['#e9e4d4']}/><ambientLight intensity={0.8}/><directionalLight position={[5,8,5]} intensity={1.2}/>
  <Fog startedAt={fogAt}/><Suspense fallback={null}>{scenes.map((s,i)=><Building key={s.slug} s={s} i={i} sel={sel} setSel={setSel} onFocused={()=>setFogAt(performance.now())}/>)}</Suspense></Canvas></View></Boundary>}
