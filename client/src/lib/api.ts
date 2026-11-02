export const API=process.env.EXPO_PUBLIC_API??'http://localhost:4000/api';
export type Item={slug:string;title:string;group:string};
export type Catalog={groups:{key:string;title:string;items:Item[]}[];rooms:{slug:string;title:string}[]};
export type Post={id:string;title:string;body:string;tags:string[];createdAt:string;readMin:number};
export async function j<T>(p:string,init?:RequestInit):Promise<T>{const r=await fetch(API+p,init);if(!r.ok)throw new Error(String(r.status));return r.json()}
export const post=<T,>(p:string,body:unknown)=>j<T>(p,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
export type Scene={slug:string;title:string;numeral:string;model:string;images:string[];links:{to:string;title:string;img?:string}[]};
export type Ad={id:string;title:string;slug:string;price:number;days:number;crew:number;area:number;rating:number;warranty:number};
