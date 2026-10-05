// Case studies. kind: build = real client system (opens detail), example = interactive prototype, collection = sector suite.
// ind: industries where the case is built for that sector. also: industries where it is relevant but not sector-specific.
const INDUSTRIES=[
  {id:'all',name:'All industries',title:'See AI applied to the work your business <em>already does.</em>',lede:'Choose your industry to see what we have built for businesses like yours.'},
  {id:'retail',name:'Retail & consumer goods',title:'Retail &amp; consumer goods, <em>run on AI.</em>',lede:'Client intelligence, trend research and product operations for retailers and consumer brands.'},
  {id:'construction',name:'Construction & scaffolding',title:'Construction, <em>quoted and planned faster.</em>',lede:'Quoting, labour planning, site records and handover for construction and scaffolding businesses.'},
  {id:'real-estate',name:'Real estate',title:'Real estate, <em>handled faster.</em>',lede:'Enquiries, listings, property matching and market intelligence for agencies and property teams.'},
  {id:'financial',name:'Financial services',title:'Financial services, <em>with less manual work.</em>',lede:'Client intake, reporting, reconciliation and reviews for advice and investment firms.'},
  {id:'sales',name:'Sales-led businesses',title:'Every call reviewed, <em>every lead followed up.</em>',lede:'Call analysis, outbound and proposals for teams that live and die by their pipeline.'},
  {id:'any',name:'Any industry',title:'Workflows that fit <em>any business.</em>',lede:'Assessment, content, finance and sales workflows that transfer across sectors.'},
];
const FUNCTIONS=['Sales','Marketing','Operations','Finance','Strategy'];

const T_BEAUTY={q:'This feels like therapy. Joseph gets our business incredibly well. He understands our problems. These builds are absolutely game changing. This will help us sell our business and increase our valuation.',who:'Senior Leader, Beauty and Retail · 12-month engagement, 10 builds'};
const CASES=[
  {kind:'build',img:'call-profiler.jpg',sector:'Luxury retail',title:'Client Intelligence System',ind:['retail'],also:['sales'],fn:['Sales','Operations'],
   line:"London's leading luxury watch dealer now remembers every client as an individual.",
   stats:['15+ hrs/week saved','5 min to follow-up','5x more logged'],
   detail:['Est. 15+ hours per week of manual follow-up and CRM entry eliminated','Client interaction to personalised follow-up: from days to under 5 minutes','Roughly 5x more client interactions now logged'],
   testimonials:[
     {q:'It is not the email being drafted. That is the win. It is the fact that the company just starts remembering all of our customers as individuals.',who:'Operations Director, luxury watch dealer'},
     {q:'You did not come in with a preconception of what the solution was going to be. You looked at how we worked, identified problems we did not even recognise at scale, and then proposed a solution to address that problem.',who:'Luxury watch dealer, London'}]},
  {kind:'build',img:'trend-scraper.jpg',sector:'Beauty & retail',title:'Trend Intelligence Platform',ind:['retail'],fn:['Strategy','Marketing'],
   line:'A £50m beauty supplier to M&S, Tesco and Next cut weeks of research to hours.',
   stats:['Est. 80% time saved','1,000+ sources','Weeks → 4 hours'],
   detail:['Trend research reduced from an estimated 2–3 weeks to under 4 hours','Source coverage expanded from ~20 manual sources to 1,000+','Senior team redirected to strategy and client relationships'],
   testimonials:[T_BEAUTY]},
  {kind:'build',img:'plm.jpg',sector:'Beauty & retail',title:'Product Operating Backbone',ind:['retail'],fn:['Operations'],
   line:'Excel and email threads replaced with a single source of truth.',
   stats:['Est. 200+ hrs/month','Est. £250k savings','10 builds, 12 months'],
   detail:['Est. 200+ hours per month of manual data management eliminated','Direct supplier portal access, with potential est. £250k annual reorder savings','One of 10 builds across a 12-month engagement'],
   testimonials:[T_BEAUTY]},
  {kind:'build',img:'call-coach.jpg',sector:'Coaching & sales tech',title:'Sales Performance Dashboard',ind:['sales'],also:['real-estate','financial'],fn:['Sales'],
   line:'Sales managers can now see why deals are lost, across every call.',
   stats:['Est. 15–20% uplift','100% of calls','~30% faster ramp-up'],
   detail:['100% of calls analysed vs an estimated 10–15% previously','Est. 15–20% conversion improvement within 3 months','Coaching prep from ~2 hours to under 20 minutes per manager per week']},
  {kind:'build',img:'linkedin-engine.jpg',sector:'Content & growth',title:'LinkedIn Growth Engine',ind:['any'],also:['sales','real-estate','financial','construction'],fn:['Marketing'],
   line:'An end-to-end content system driving hundreds of thousands of impressions.',
   stats:['100,000s of impressions','Hours → minutes'],
   detail:['Content engineered around how the LinkedIn algorithm rewards posts','Drafting time cut from hours to minutes','Ideation bank based on audience signals and trending topics']},
  
  {kind:'product',img:'products/scaf-quote.png',sector:'Construction',title:'Drawing-to-Quote Engine',ind:['construction'],fn:['Sales', 'Operations'],line:'Turns a house drawing pack into a reviewed takeoff and a structured quote.',demo:'https://innate-scaffolding-quote-engine.vercel.app/'},
  {kind:'product',img:'products/scaf-crew.png',sector:'Construction',title:'Crew Readiness & Labour Planner',ind:['construction'],fn:['Operations'],line:'Skills, certificates, availability and allocations in one view before crews are assigned.',demo:'https://innate-scaffolding-crew-profiles.vercel.app/'},
  {kind:'product',img:'products/scaf-handover.png',sector:'Construction',title:'Digital Site Handover',ind:['construction'],fn:['Operations'],line:'Turns a handover from site into a checked, approved record.',demo:'https://innate-scaffolding-handover.vercel.app/'},
  {kind:'product',img:'products/scaf-variations.png',sector:'Construction',title:'Site Request & Variations Agent',ind:['construction'],fn:['Operations', 'Finance'],line:'Turns WhatsApp site requests into checked variation records.',demo:'https://innate-scaffolding-variations-agent.vercel.app/'},
  {kind:'product',img:'products/scaf-payments.png',sector:'Construction',title:'Applications & Payment Control',ind:['construction'],fn:['Finance'],line:'Follows completed work through applications and certificates to cash.',demo:'https://innate-scaffolding-payment-control.vercel.app/'},
  {kind:'product',img:'products/re-enquiry.png',sector:'Real estate',title:'Enquiry-to-Viewing Desk',ind:['real-estate'],fn:['Sales'],line:'Turns an email, call or web form into a checked brief and a response ready to send.',demo:'https://innate-real-estate-enquiry-desk.vercel.app/'},
  {kind:'product',img:'products/re-listing-inbox.png',sector:'Real estate',title:'Availability & Listing Inbox',ind:['real-estate'],fn:['Operations'],line:'Turns brochures, spreadsheets and update emails into reviewed property records.',demo:'https://innate-real-estate-listing-inbox.vercel.app/'},
  {kind:'product',img:'products/re-matcher.png',sector:'Real estate',title:'Property Matcher & Shortlist Builder',ind:['real-estate'],fn:['Sales'],line:'Matches a client brief to inventory and builds an editable shortlist.',demo:'https://innate-real-estate-property-matcher.vercel.app/'},
  {kind:'product',img:'products/re-listing-intel.png',sector:'Real estate',title:'Listing Intelligence Console',ind:['real-estate'],fn:['Marketing'],line:'Reviews listing quality and proposes improvements for approval.',demo:'https://innate-real-estate-listing-intelligence.vercel.app/'},
  {kind:'product',img:'products/re-call-coach.png',sector:'Real estate',title:'Call Capture & Broker Coach',ind:['real-estate'],fn:['Sales'],line:'Turns a property call into a clean record, a follow-up and one coaching action.',demo:'https://innate-real-estate-call-coach.vercel.app/'},
  {kind:'product',img:'products/re-deal-control.png',sector:'Real estate',title:'Deal & Viewing Control Tower',ind:['real-estate'],fn:['Operations', 'Strategy'],line:'A weekly management view of stalled deals, missed follow-ups and viewing gaps.',demo:'https://innate-real-estate-deal-control.vercel.app/'},
  {kind:'product',img:'products/w-fact-find.png',sector:'Financial services',title:'Client Intake & Fact Find Review',ind:['financial'],fn:['Operations'],line:'Compares client material with the existing record and surfaces conflicts.',demo:'https://innate-wealth-fact-find.vercel.app/'},
  {kind:'product',img:'products/w-meeting.png',sector:'Financial services',title:'Meeting Actions & Client Follow-up',ind:['financial'],fn:['Operations'],line:'Turns a meeting transcript into owned tasks and a follow-up draft.',demo:'https://innate-wealth-meeting-actions.vercel.app/'},
  {kind:'product',img:'products/w-suitability.png',sector:'Financial services',title:'Recommendation & Suitability Workspace',ind:['financial'],fn:['Operations'],line:'Drafts the suitability document from the adviser\'s recommendation and highlights statements that need supporting evidence.',demo:'https://innate-wealth-suitability-workspace.vercel.app/'},
  {kind:'product',img:'products/w-annual.png',sector:'Financial services',title:'Annual Review Pack Studio',ind:['financial'],fn:['Operations', 'Finance'],line:'Brings evidence, changes and adviser decisions into one annual review pack.',demo:'https://innate-wealth-annual-review.vercel.app/'},

];

// Existing wealth-suite tools recovered from the collection, now visible in the main vault.
CASES.push(
 {kind:'product',img:'products/w-cashflow.png',sector:'Financial services',title:'Statement & Household Cashflow Review',ind:['financial'],fn:['Finance'],line:'Review statement rows, pair transfers and reconcile every cashflow total to the source ledger.',demo:'https://innate-ai-wealth-advice.vercel.app/tools/cashflow',localDemo:'demos/innate-ai-wealth-advice/tools/cashflow'},
 {kind:'product',img:'products/w-provider.png',sector:'Financial services',title:'Provider Operations Desk',ind:['financial'],fn:['Operations'],line:'Review provider responses, prepare authority requests and track transfer checkpoints.',demo:'https://innate-ai-wealth-advice.vercel.app/tools/provider',localDemo:'demos/innate-ai-wealth-advice/tools/provider'}
);

// Restored from the original standalone vault, omitted by the website catalogue.
CASES.push(...[
  {
    "kind": "product",
    "title": "Invoice Operations Agent",
    "img": "products/restored-invoice-operations-agent.png",
    "sector": "Finance",
    "line": "Review invoice exceptions, approve supported records and prepare collections work.",
    "ind": [
      "any"
    ],
    "also": [
      "retail",
      "construction",
      "real-estate",
      "financial",
      "sales"
    ],
    "fn": [
      "Finance"
    ],
    "demo": "https://invoice-operations-agent.vercel.app/",
    "localDemo": "demos/invoice-operations-agent/"
  },
  {
    "kind": "product",
    "title": "Proposal and Quote Agent",
    "img": "products/restored-proposal-quote-agent.png",
    "sector": "Sales",
    "line": "Turn an enquiry into reviewed scope, pricing, approval and a delivery hand-off.",
    "ind": [
      "any"
    ],
    "also": [
      "retail",
      "construction",
      "real-estate",
      "financial",
      "sales"
    ],
    "fn": [
      "Sales"
    ],
    "demo": "https://proposal-quote-agent.vercel.app/",
    "localDemo": "demos/proposal-quote-agent/"
  },
  {
    "kind": "product",
    "title": "Voice Sales Agent",
    "img": "products/restored-voice-sales-agent.png",
    "sector": "Sales",
    "line": "Review calling queues, transcripts, callbacks and human hand-offs.",
    "ind": [
      "any"
    ],
    "also": [
      "retail",
      "construction",
      "real-estate",
      "financial",
      "sales"
    ],
    "fn": [
      "Sales"
    ],
    "demo": "https://voice-sales-agent-five.vercel.app/",
    "localDemo": "demos/voice-sales-agent-five/"
  },
  {
    "kind": "product",
    "title": "Outbound Email Agent",
    "img": "products/restored-outbound-email-agent.png",
    "sector": "Sales",
    "line": "Review evidence, personalise drafts and handle replies and suppression.",
    "ind": [
      "any"
    ],
    "also": [
      "retail",
      "construction",
      "real-estate",
      "financial",
      "sales"
    ],
    "fn": [
      "Sales"
    ],
    "demo": "https://outbound-email-agent-sigma.vercel.app/",
    "localDemo": "demos/outbound-email-agent-sigma/"
  },
  {
    "kind": "product",
    "title": "Reporting and Reconciliation Agent",
    "img": "products/restored-reporting-reconciliation-agent.png",
    "sector": "Finance",
    "line": "Reconcile source records, investigate exceptions and prepare reviewed reporting.",
    "ind": [
      "any"
    ],
    "also": [
      "retail",
      "construction",
      "real-estate",
      "financial",
      "sales"
    ],
    "fn": [
      "Finance"
    ],
    "demo": "https://reporting-recon-agent.vercel.app/",
    "localDemo": "demos/reporting-recon-agent/"
  },
  {
    "kind": "product",
    "title": "Strategic AI Assessment",
    "img": "products/restored-strategic-ai-assessment.png",
    "sector": "Strategy",
    "line": "Explore business evidence, opportunities, prioritisation and an assessment roadmap.",
    "ind": [
      "any"
    ],
    "also": [
      "retail",
      "construction",
      "real-estate",
      "financial",
      "sales"
    ],
    "fn": [
      "Strategy"
    ],
    "demo": "https://innate-example-audit.netlify.app/",
    "localDemo": "demos/innate-example-audit/"
  },
  {
    "kind": "product",
    "title": "Retail Market Intelligence",
    "img": "products/restored-retail-market-intelligence.png",
    "sector": "Retail",
    "line": "Search captured public product records across Home and Beauty.",
    "ind": [
      "retail"
    ],
    "also": [],
    "fn": [
      "Retail"
    ],
    "demo": "https://innate-retail-intelligence.vercel.app/products?division=Home",
    "localDemo": "https://innate-retail-intelligence.vercel.app/products?division=Home"
  }
]);

CASES.push(...[
  {
    "kind": "product",
    "title": "Gang Pay Calculator",
    "img": "products/restored-gang-pay.png",
    "sector": "Construction",
    "line": "Calculate stage-by-stage labour payments from editable quantities, inclusions and rates.",
    "ind": [
      "construction"
    ],
    "fn": [
      "Finance"
    ],
    "demo": "https://innate-scaffolding-gang-pay.vercel.app/"
  },
  {
    "kind": "product",
    "title": "House-Type Takeoff Library",
    "img": "products/restored-house-bank.png",
    "sector": "Construction",
    "line": "Inspect, duplicate and adapt checked house types and their takeoffs.",
    "ind": [
      "construction"
    ],
    "fn": [
      "Operations"
    ],
    "demo": "https://innate-scaffolding-house-bank.vercel.app/"
  },
  {
    "kind": "product",
    "title": "Inspection & Defect Register",
    "img": "products/restored-inspections.png",
    "sector": "Construction",
    "line": "Record inspections, isolate defects and track corrective work through closure.",
    "ind": [
      "construction"
    ],
    "fn": [
      "Operations"
    ],
    "demo": "https://innate-scaffolding-inspections.vercel.app/"
  },
  {
    "kind": "product",
    "title": "Client Self-Bill Pricing Matrix",
    "img": "products/restored-self-bill.png",
    "sector": "Construction",
    "line": "Edit plot pricing, scaffold stages, extras and payment splits, then export the matrix.",
    "ind": [
      "construction"
    ],
    "fn": [
      "Finance"
    ],
    "demo": "https://innate-scaffolding-self-bill.vercel.app/"
  }
]);

// Every vault entry opens its guided working demo. Original evidence remains in the metadata.
const DEMO_EXPERIENCES={
  "Client Intelligence System": {
    "tourId": "client",
    "localDemo": "demos/client-intelligence/"
  },
  "Trend Intelligence Platform": {
    "tourId": "trends",
    "localDemo": "demos/trend-intelligence/"
  },
  "Product Operating Backbone": {
    "tourId": "plm",
    "localDemo": "demos/product-backbone/"
  },
  "Sales Performance Dashboard": {
    "tourId": "sales",
    "localDemo": "demos/sales-performance/"
  },
  "LinkedIn Growth Engine": {
    "tourId": "linkedin",
    "localDemo": "demos/linkedin-growth/"
  },
  "Enquiry-to-Viewing Desk": {
    "tourId": "enquiry",
    "localDemo": "demos/innate-real-estate-enquiry-desk/"
  },
  "Availability & Listing Inbox": {
    "tourId": "listing-inbox",
    "localDemo": "demos/innate-real-estate-listing-inbox/"
  },
  "Property Matcher & Shortlist Builder": {
    "tourId": "matcher",
    "localDemo": "demos/innate-real-estate-property-matcher/"
  },
  "Listing Intelligence Console": {
    "tourId": "listing-intelligence",
    "localDemo": "demos/innate-real-estate-listing-intelligence/"
  },
  "Call Capture & Broker Coach": {
    "tourId": "broker-coach",
    "localDemo": "demos/innate-real-estate-call-coach/"
  },
  "Deal & Viewing Control Tower": {
    "tourId": "deal-control",
    "localDemo": "demos/innate-real-estate-deal-control/"
  },
  "Client Intake & Fact Find Review": {
    "tourId": "fact-find",
    "localDemo": "demos/innate-wealth-fact-find/"
  },
  "Meeting Actions & Client Follow-up": {
    "tourId": "meeting",
    "localDemo": "demos/innate-wealth-meeting-actions/"
  },
  "Recommendation & Suitability Workspace": {
    "tourId": "suitability",
    "localDemo": "demos/innate-wealth-suitability-workspace/"
  },
  "Annual Review Pack Studio": {
    "tourId": "annual",
    "localDemo": "demos/innate-wealth-annual-review/"
  },
  "Statement & Household Cashflow Review": {
    "tourId": "cashflow",
    "localDemo": "demos/innate-ai-wealth-advice/tools/cashflow"
  },
  "Provider Operations Desk": {
    "tourId": "provider",
    "localDemo": "demos/innate-ai-wealth-advice/tools/provider"
  },
  "Drawing-to-Quote Engine": {
    "tourId": "quote",
    "localDemo": "demos/innate-scaffolding-quote-engine/"
  },
  "Crew Readiness & Labour Planner": {
    "tourId": "crew",
    "localDemo": "demos/innate-scaffolding-crew-profiles/"
  },
  "Digital Site Handover": {
    "tourId": "handover",
    "localDemo": "demos/innate-scaffolding-handover/"
  },
  "Site Request & Variations Agent": {
    "tourId": "variations",
    "localDemo": "demos/innate-scaffolding-variations-agent/"
  },
  "Applications & Payment Control": {
    "tourId": "payments",
    "localDemo": "demos/innate-scaffolding-payment-control/"
  },
  "Gang Pay Calculator": {
    "tourId": "gang-pay",
    "localDemo": "demos/innate-scaffolding-gang-pay/"
  },
  "House-Type Takeoff Library": {
    "tourId": "house-bank",
    "localDemo": "demos/innate-scaffolding-house-bank/"
  },
  "Inspection & Defect Register": {
    "tourId": "inspections",
    "localDemo": "demos/innate-scaffolding-inspections/"
  },
  "Client Self-Bill Pricing Matrix": {
    "tourId": "self-bill",
    "localDemo": "demos/innate-scaffolding-self-bill/"
  },
  "Invoice Operations Agent": {
    "tourId": "invoice",
    "localDemo": "demos/invoice-operations-agent/"
  },
  "Proposal and Quote Agent": {
    "tourId": "proposal",
    "localDemo": "demos/proposal-quote-agent/"
  },
  "Voice Sales Agent": {
    "tourId": "voice",
    "localDemo": "demos/voice-sales-agent-five/"
  },
  "Outbound Email Agent": {
    "tourId": "outbound",
    "localDemo": "demos/outbound-email-agent-sigma/"
  },
  "Reporting and Reconciliation Agent": {
    "tourId": "reporting",
    "localDemo": "demos/reporting-recon-agent/"
  },
  "Strategic AI Assessment": {
    "tourId": "assessment",
    "localDemo": "demos/innate-example-audit/"
  },
  "Retail Market Intelligence": {
    "tourId": "retail",
    "localDemo": "demos/innate-retail-intelligence/"
  }
};
for(const c of CASES){const experience=DEMO_EXPERIENCES[c.title];if(experience){Object.assign(c,experience);if(!c.demo)c.demo=c.localDemo;}}
const RECONSTRUCTED_DEMOS={
 'client':{img:'demo-client-intelligence.png',line:'Review a conversation, update client preferences and prepare a personalised follow-up.'},
 'trends':{img:'demo-trend-intelligence.png',line:'Inspect trend evidence, select product directions and build an opportunity brief.'},
 'plm':{img:'demo-product-backbone.png',line:'Edit product specifications, recalculate order values and prepare a supplier action pack.'},
 'sales':{img:'demo-sales-performance.png',line:'Analyse a sample call, inspect the evidence and assign a specific coaching action.'},
 'linkedin':{img:'demo-linkedin-growth.png',line:'Turn an audience observation into editable post variants and a saved draft.'}
};
for(const c of CASES){const d=RECONSTRUCTED_DEMOS[c.tourId];if(d){c.img='products/'+d.img;c.line=d.line;}}
