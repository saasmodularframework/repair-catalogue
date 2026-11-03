const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const group=(key,title,items)=>({key,title,items:items.map(t=>({slug:slug(t),title:t,group:key}))});
const groups=[
group('main','Main services',['Inspect technical state of real estate','Maintained repair','Residential repair','Commercial repair','Industrial repair']),
group('available','Available services',['Sound insulation works','Drywall work','Glazing sheet metal cladding','Plastering (basic, finishing)','Painting works','Finishing materials (accountancy, layout, cutting, setting)','Covering floors and walls with tiles','Covering floors and walls: finishing parquet, wallpapers','Finishing carpentry works','Installation of steel structures','Installation of equipment','Laying of brick and stone','Installation of electrical wiring and electrical fittings','Backsplash, baseboard','Built-in kitchen equipment (electricity, lighting, refrigerators)','Underfloor heating','Lighting systems','Curtaining fabrics installations','Ventilation equipment','Installation of pipeline equipment (faucets, food waste disposal systems)','Arches, columns','Furnishing','Post-construction cleaning','Technical maintenance']),
group('development','Services in development',['Reinforcement of walls','Demolition of walls','Countertop','Suspended ceilings'])];
const rooms=['Workspace','Hallway','Kitchen','Storage','Laundry','Balcony','Lounge'].map(t=>({slug:slug(t),title:t}));
module.exports={slug,groups,rooms,services:groups.flatMap(g=>g.items)};
