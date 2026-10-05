// The featured vault: 12 products, in the recommended order (audit 29 Sept 2026).
// Products not listed here stay reachable at their existing tool URLs but are not shown on the page.
// film: 'new' = site-template film page (#film/<id>); otherwise the legacy film id in PRODUCT_FILMS.
const PROBLEMS=[
  {id:'all',name:'All'},
  {id:'win',name:'Win more work'},
  {id:'admin',name:'Reduce administration'},
  {id:'costs',name:'Control costs'},
  {id:'service',name:'Improve client service'},
];
const FEATURED_VAULT=[
  {id:'proposal',title:'Proposal and Quote Agent',sector:'Professional services',ind:['sales','any'],problems:['win'],
   line:'Keeps scope, discount, margin and approval in step before a proposal goes out.',
   img:'films/v3/proposal-and-quote-agent-poster.jpg',tool:'demos/proposal-quote-agent/',legacyFilm:'proposal'},
  {id:'fact-find-writer',title:'Fact Find Writer',sector:'Financial advice',ind:['financial'],problems:['admin','service'],
   line:'Reads meeting transcripts and fact-find documents, proposes client-record updates with the source behind each one, and writes only what the adviser approves.',
   img:'films/v3/fact-find-writer-poster.jpg',tool:null},
  {id:'invoice',title:'Invoice Operations Agent',sector:'Finance',ind:['any','financial'],problems:['costs','admin'],
   line:'Separates routine invoices from the exceptions that need judgement, such as changed bank details, and records who decided what.',
   img:'films/v3/invoice-operations-agent-poster.jpg',tool:'demos/invoice-operations-agent/',legacyFilm:'invoice'},
  {id:'quote',title:'Drawing-to-Quote Engine',sector:'Construction',ind:['construction'],problems:['win'],
   line:'Turns reviewed drawing measurements into scaffold quantities and a quote you can trace back to the page.',
   img:'films/v3/drawing-to-quote-engine-poster.jpg',tool:'demos/innate-scaffolding-quote-engine/',legacyFilm:'quote'},
  {id:'retail',title:'Retail Market Intelligence',sector:'Retail',ind:['retail'],problems:['win'],
   line:'Compares 1,236 dated product records across retailers to show where a range and its pricing sit in the market.',
   img:'img/cases/v3/retail.jpg',tool:'demos/innate-retail-intelligence/',legacyFilm:'retail'},
  {id:'listing-inbox',title:'Availability & Listing Inbox',sector:'Real estate',ind:['real-estate'],problems:['admin'],
   line:'Applies the listing changes a source supports, holds back what it does not, and prepares the question that resolves it.',
   img:'img/cases/v3/listing-inbox.jpg',tool:'demos/innate-real-estate-listing-inbox/',legacyFilm:'listing-inbox'},
  {id:'annual',title:'Annual Review Pack Studio',sector:'Financial advice',ind:['financial'],problems:['service','admin'],
   line:'Builds the annual review pack from the client’s sources and shows what cannot be relied on yet.',
   img:'img/cases/v3/annual.jpg',tool:'demos/innate-wealth-annual-review/',legacyFilm:'annual'},
  {id:'payments',title:'Applications & Payment Control',sector:'Construction',ind:['construction'],problems:['costs'],
   line:'Tracks every application from work completed to certified to paid, so each gap has a status and an owner.',
   img:'img/cases/v3/payments.jpg',tool:'demos/innate-scaffolding-payment-control/',legacyFilm:'payments'},
  {id:'assessment',title:'Strategic AI Assessment',sector:'Any industry',ind:['any'],problems:['win','admin','costs','service'],
   line:'How we start: evidence from the business, ranked opportunities and a sequenced roadmap.',
   img:'img/cases/v3/assessment.jpg',tool:'demos/innate-example-audit/',legacyFilm:'assessment'},
  {id:'matcher',title:'Property Matcher & Shortlist Builder',sector:'Real estate',ind:['real-estate'],problems:['service'],
   line:'Matches a client brief to available space and builds a shortlist with clear trade-offs and caveats.',
   img:'img/cases/v3/matcher.jpg',tool:'demos/innate-real-estate-property-matcher/',legacyFilm:'matcher'},
  {id:'crew',title:'Crew Readiness & Labour Planner',sector:'Construction',ind:['construction'],problems:['costs'],
   line:'Checks every crew member’s tickets and availability against the job before a gang is allocated.',
   img:'img/cases/v3/crew.jpg',tool:'demos/innate-scaffolding-crew-profiles/',legacyFilm:'crew'},
  {id:'variations',title:'Site Request & Variations Agent',sector:'Construction',ind:['construction'],problems:['costs'],
   line:'Checks a site request against the contract, evidence and rules before it becomes a variation.',
   img:'img/cases/v3/variations.jpg',tool:'demos/innate-scaffolding-variations-agent/',legacyFilm:'variations'},
];
// New films produced to the launch standard. Filled in as each film is approved.
const NEW_FILMS={
  'proposal':{src:'films/v3/proposal-and-quote-agent.mp4',vtt:'films/v3/proposal-and-quote-agent.vtt',poster:'films/v3/proposal-and-quote-agent-poster.jpg',duration:131,summary:'Scope, discount, margin and approval stay in step, so a proposal only goes out once the commercial position has been checked.'},
  'quote':{src:'films/v3/drawing-to-quote-engine.mp4',vtt:'films/v3/drawing-to-quote-engine.vtt',poster:'films/v3/drawing-to-quote-engine-poster.jpg',duration:141,summary:'A full drawing pack becomes reviewed measurements, scaffold quantities and a quote you can trace back to the page.'},
  'invoice':{src:'films/v3/invoice-operations-agent.mp4',vtt:'films/v3/invoice-operations-agent.vtt',poster:'films/v3/invoice-operations-agent-poster.jpg',duration:102,summary:'Routine supplier invoices are matched and staged; the risky ones, like a changed bank account, come to one queue with the reason, a recommendation and a record of every decision.'},
  'fact-find-writer':{src:'films/v3/fact-find-writer.mp4',vtt:'films/v3/fact-find-writer.vtt',poster:'films/v3/fact-find-writer-poster.jpg',duration:118,summary:'Everything a client hands over after a review, handwritten fact find, photos of ID and payslips, statements, spreadsheets, the meeting transcript and the adviser\'s voice note, becomes a complete, current client record ready to check, with nobody typing it in.'},
};
const VAULT_INDUSTRIES=[
  {id:'all',name:'All industries'},
  {id:'financial',name:'Financial services'},
  {id:'construction',name:'Construction'},
  {id:'real-estate',name:'Real estate'},
  {id:'retail',name:'Retail'},
  {id:'any',name:'Any industry'},
];
function vaultFilm(v){
  if(NEW_FILMS[v.id])return {kind:'new',href:'#film/'+v.id,duration:NEW_FILMS[v.id].duration};
  return null;
}
function fmtDur(s){if(!s)return '';s=Math.round(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')}
function vaultList(problem,industry){
  return FEATURED_VAULT.filter(v=>(problem==='all'||v.problems.includes(problem))&&(industry==='all'||v.ind.includes(industry)));
}
