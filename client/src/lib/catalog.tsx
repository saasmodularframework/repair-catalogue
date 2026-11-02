import {createContext,useContext,ReactNode} from 'react';
import {CATALOG} from '../data/catalog';
import type {Catalog} from './api';
const Ctx=createContext<Catalog>(CATALOG);export const useCatalog=()=>useContext(Ctx);
export const CatalogProvider=({children}:{children:ReactNode})=><Ctx.Provider value={CATALOG}>{children}</Ctx.Provider>;
