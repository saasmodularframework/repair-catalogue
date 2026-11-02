import i18n from 'i18next';
import {initReactI18next,useTranslation} from 'react-i18next';
import {I18nManager} from 'react-native';
import type {ReactNode} from 'react';
import {STR} from './strings'; 
export const LANGS=['en','de','hi','es','ar','fr'] as const;export type Lang=typeof LANGS[number];
i18n.use(initReactI18next).init({resources:Object.fromEntries(Object.entries(STR).map(([k,v])=>[k,{translation:v}])),lng:'en',fallbackLng:'en',keySeparator:false,interpolation:{escapeValue:false}});
export function useI18n(){const {t,i18n:i}=useTranslation();
 return {lang:i.language as Lang,t:(k:string|string[],d?:string)=>String(t(k as any,{defaultValue:d??(Array.isArray(k)?k[0]:k)})),
  setLang:(l:Lang)=>{I18nManager.allowRTL(true);I18nManager.forceRTL(l==='ar');i.changeLanguage(l)}}}
export const I18nProvider=({children}:{children:ReactNode})=><>{children}</>;
