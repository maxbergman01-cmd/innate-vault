const WORKFLOWS = [
  {
    "id": "sales",
    "name": "Sales & client relationships",
    "titles": [
      "Client Intelligence System",
      "Sales Performance Dashboard",
      "Drawing-to-Quote Engine",
      "Proposal and Quote Agent", "Voice Sales Agent", "Outbound Email Agent",
      "Enquiry-to-Viewing Desk",
      "Property Matcher & Shortlist Builder",
      "Call Capture & Broker Coach"
    ]
  },
  {
    "id": "research",
    "name": "Research & marketing",
    "titles": [
      "Trend Intelligence Platform",
      "LinkedIn Growth Engine",
      "Listing Intelligence Console", "Strategic AI Assessment", "Retail Market Intelligence"
    ]
  },
  {
    "id": "data",
    "name": "Product & property data",
    "titles": [
      "Product Operating Backbone", "House-Type Takeoff Library",
      "Availability & Listing Inbox"
    ]
  },
  {
    "id": "delivery",
    "name": "People & project delivery",
    "titles": [
      "Crew Readiness & Labour Planner",
      "Digital Site Handover", "Inspection & Defect Register",
      "Site Request & Variations Agent",
      "Deal & Viewing Control Tower"
    ]
  },
  {
    "id": "finance",
    "name": "Finance & payments",
    "titles": [
      "Gang Pay Calculator", "Client Self-Bill Pricing Matrix", "Invoice Operations Agent", "Reporting and Reconciliation Agent", "Applications & Payment Control", "Statement & Household Cashflow Review"
    ]
  },
  {
    "id": "reviews",
    "name": "Client reviews & follow-up",
    "titles": [
      "Client Intake & Fact Find Review",
      "Meeting Actions & Client Follow-up",
      "Recommendation & Suitability Workspace",
      "Annual Review Pack Studio", "Provider Operations Desk"
    ]
  }
];

function workflowOf(c) { return WORKFLOWS.find(w => w.titles.includes(c.title)); }
function inIndustry(c, id) { return id === 'all' || c.ind.includes(id) || (c.also || []).includes(id); }
function filteredCases(workflow='all', industry='all') {
  return CASES.filter(c => inIndustry(c, industry) && (workflow === 'all' || workflowOf(c)?.id === workflow));
}
function vaultHash(workflow, industry) {
  return '#case-studies/workflow/' + workflow + '/' + industry;
}
function productFilm(c) { return typeof PRODUCT_FILMS === 'undefined' ? null : PRODUCT_FILMS.find(f=>f.id===c.tourId); }
function demoPath(c) { const film=productFilm(c); return film?.ready ? film.page : c.tourId === 'client' ? 'films/client-intelligence.html' : c.tourId ? 'experiences/player.html?demo='+c.tourId : c.localDemo || 'demos/' + new URL(c.demo).hostname.split('.')[0] + '/'; }
