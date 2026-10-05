export function cashTotals(rows, decisions={}, paired=false) {
  // heldIncome: inflows a reviewer deferred (or wrongly marked as spending). They are neither
  // counted as income nor treated as an outflow, so remaining cash stays conservative.
  const out={income:0,essential:0,lifestyle:0,saving:0,unresolved:0,heldIncome:0};
  for(const row of rows){
    const choice=decisions[row.id]||'source';
    if(choice==='exclude'||(row.pair&&paired))continue;
    if(row.pair){if(row.amount<0)out.unresolved-=row.amount;continue;}
    if(row.amount>0&&(choice==='defer'||choice==='household')){out.heldIncome+=row.amount;continue;}
    if(choice==='defer'){out.unresolved+=Math.abs(row.amount);continue;}
    if(choice==='household'){out.lifestyle-=row.amount;continue;}
    if(row.category==='Net income')out.income+=row.amount;
    else if(row.amount>0)out.heldIncome+=row.amount;
    else if(['Housing','Groceries','Essential'].includes(row.category))out.essential-=row.amount;
    else if(row.category==='Lifestyle')out.lifestyle-=row.amount;
    else if(row.category==='Saving & investing')out.saving-=row.amount;
    else out.unresolved+=Math.abs(row.amount);
  }
  for(const key in out)out[key]=Math.round(out[key]*100)/100;
  out.remaining=Math.round((out.income-out.essential-out.lifestyle-out.saving-out.unresolved)*100)/100;
  if(!out.heldIncome)delete out.heldIncome; // reported only when some income is held
  return out;
}
// Only outflows can be household spending; inflows can be held or excluded.
export function cashOptionsFor(row){
  return row.amount>0?['source','defer','exclude']:['source','defer','household','exclude'];
}
const MONTHS={jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
// Strict date parsing: "25 Sep 2026", "25 September 2026" or "2026-09-25". Rejects "1", "2026", "31 Feb 2026".
export function parseStrictDate(text){
  const value=String(text||'').trim();let y,m,d;
  let match=value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if(match){y=+match[1];m=+match[2]-1;d=+match[3];}
  else if((match=value.match(/^(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})$/))){
    const key=match[2].slice(0,3).toLowerCase();if(!(key in MONTHS))return null;
    const full=['january','february','march','april','may','june','july','august','september','october','november','december'][MONTHS[key]];
    if(match[2].length>3&&!full.startsWith(match[2].toLowerCase())&&match[2].toLowerCase()!=='sept')return null;
    y=+match[3];m=MONTHS[key];d=+match[1];
  } else return null;
  const date=new Date(Date.UTC(y,m,d));
  return date.getUTCFullYear()===y&&date.getUTCMonth()===m&&date.getUTCDate()===d?date:null;
}
export const SCENARIO_DATE='2026-09-11';
export function dateProblem(text,min=SCENARIO_DATE){
  if(!String(text||'').trim())return 'Enter a due date';
  const date=parseStrictDate(text);
  if(!date)return 'Use a real calendar date, e.g. 25 Sep 2026';
  if(min&&date<parseStrictDate(min))return 'Date is before the scenario date (11 Sep 2026)';
  return '';
}
export function completeAction(owner,date){
  return Boolean(owner?.trim()&&owner!=='Unassigned'&&!dateProblem(date));
}
export function annualPosition(assets,sources,decisions={}) {
  const excludedSources=sources.filter(s=>decisions[s.name]==='Exclude from current pack');
  const included=sources.filter(s=>decisions[s.name]!=='Exclude from current pack');
  const mapping={'Cash':'Household cashflow','Investment ISA':'ISA statement'};
  const components=assets.filter(a=>decisions[mapping[a.name]||a.name]!=='Exclude from current pack');
  const excludedComponents=assets.filter(a=>!components.includes(a));
  const mortgageIncluded=decisions['Mortgage statement']!=='Exclude from current pack';
  const gross=components.reduce((sum,a)=>sum+a.value,0),liabilities=mortgageIncluded?218500:null;
  const partial=components.length!==assets.length||!mortgageIncluded;
  const missing=[...excludedComponents.map(a=>a.name),...(mortgageIncluded?[]:['Mortgage'])];
  // net is the arithmetic of what is included; netAvailable says whether it may be shown as a position.
  return {included,excludedSources,components,excludedComponents,gross,liabilities,net:liabilities===null?null:gross-liabilities,partial,netAvailable:!partial,
    unavailableReason:partial?`${missing.join(', ')} excluded from this pack`:''};
}
// Readiness counts every source that is not both current and included as a gap, so excluding
// a problem source can never make the pack look complete.
export function annualReadiness(sources,decisions={}) {
  const excluded=s=>decisions[s.name]==='Exclude from current pack';
  const ready=sources.filter(s=>s.state==='Current'&&!excluded(s));
  const gaps=sources.filter(s=>!ready.includes(s));
  return {ready:ready.length,total:sources.length,gaps:gaps.length,excludedGaps:gaps.filter(excluded).length,percent:sources.length?Math.round(ready.length/sources.length*100):0,gapSources:gaps};
}
export function applyListing(fields,decisions,previous={}) {
  const next={...previous};
  for(const field of fields)if(decisions[field.name]==='accept'&&field.status!=='stale')next[field.name]=field.next;
  return next;
}
export function downloadText(name,text){
  const url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));
  const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
