const ARROW='<svg class="arrow go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const VAULT='https://innate-ai-case-study-vault.vercel.app';

// Open roles on the Join us page. To add a role, add one object here.
const ROLES=[
  {title:'AI Developer',tag:'Engineering',overview:'Not someone who wants to ship AI demos. Someone who wants to sit with a client\'s real process and make it work. You will build and ship AI systems for clients, connect them to the tools they already use, and hand them over cleanly documented.'},
  {title:'AI Strategist',tag:'Strategy',overview:'Work alongside senior consultants on client engagements: interviewing leadership teams, mapping how work gets done, sizing where AI can save time or make money, and turning it into a clear, ranked roadmap. Ideal for early-career consultants or analysts who want to go deep on AI.'},
  {title:'AI Strategy Manager',tag:'Leadership',overview:'Lead client engagements end to end, from the first assessment to delivery. Own the client relationship, guide strategists and developers, and make sure every build delivers a measurable business result. Consulting or strategy experience expected.'},
  {title:'GTM Associate',tag:'Growth',overview:'Help more businesses find Innate AI. Run outreach and follow-up, manage the pipeline in our CRM, support LinkedIn content and events, and turn our case studies into material that wins new clients.'}
];


// Team order as shown on the Team tab. Bios come from each person's LinkedIn.
const TEAM=[{"id": "joseph", "name": "Joseph Gale", "role": "Founder", "img": "joseph-gale-dark.png", "edu": "<a href=\"https://www.ox.ac.uk/\" target=\"_blank\" rel=\"noopener\">University of Oxford</a>", "desc": "Joseph founded Innate AI to bring consulting-grade strategy to how businesses adopt AI. Before Innate, he led AI and technology engagements at <a href=\"https://www.mckinsey.com/\" target=\"_blank\" rel=\"noopener\">McKinsey &amp; Company</a> in London and New York, advising clients across consumer, technology, energy, transport, financial services and media. He sets the firm's strategy and works closely with every client."}, {"id": "lis", "name": "Lis Garcia", "role": "Founder Associate", "img": "lis-garcia-tan.png", "edu": "Master's, <a href=\"https://www.imperial.ac.uk/business-school/\" target=\"_blank\" rel=\"noopener\">Imperial College Business School</a> · <a href=\"https://www.esade.edu/\" target=\"_blank\" rel=\"noopener\">ESADE Business School</a>", "desc": "Lis shapes Innate AI's go-to-market and talent strategy, from how the firm reaches new clients to the people it brings on board. She joined from strategy and operations consulting at <a href=\"https://www.deloitte.com/\" target=\"_blank\" rel=\"noopener\">Deloitte</a> and <a href=\"https://www.capgemini.com/about-us/who-we-are/our-brands/capgemini-invent/\" target=\"_blank\" rel=\"noopener\">Capgemini Invent</a>, where she managed complex transformation programmes for enterprise clients."}, {"id": "rayyan", "name": "Rayyan Taimuri", "role": "AI Project Manager", "img": "rayyan-taimuri-dark.png", "edu": "MSc Business Analytics &amp; AI, <a href=\"https://www.imperial.ac.uk/business-school/\" target=\"_blank\" rel=\"noopener\">Imperial Business School</a> · BEng Aerospace Engineering (First Class), <a href=\"https://www.qmul.ac.uk/\" target=\"_blank\" rel=\"noopener\">Queen Mary University of London</a>", "desc": "Rayyan runs AI delivery on client engagements, taking projects from scoping to live systems, and drives the firm's growth initiatives. He was previously Chief of Staff at Oblex, a VC-backed AI audit intelligence company, working alongside the CEO on go-to-market, partnerships and product strategy, and is incoming at <a href=\"https://www.mckinsey.com/capabilities/mckinsey-digital\" target=\"_blank\" rel=\"noopener\">McKinsey Digital</a>."}, {"id": "max", "name": "Max Bergman", "role": "AI Project Manager", "img": "max-bergman-dark.png", "edu": "", "desc": "Max manages AI projects end to end, translating client problems into working AI systems and keeping each engagement on track. His commercial background spans sales and operations at <a href=\"https://www.marlink.com/\" target=\"_blank\" rel=\"noopener\">Marlink</a> and investment management at <a href=\"https://www.allianzgi.com/\" target=\"_blank\" rel=\"noopener\">Allianz Global Investors</a>."}];

const ADVISORS=[{"id": "uri", "name": "Uri Meirovich", "role": "Partner · Go-to-market &amp; commercial", "img": "../advisors/uri-meirovich.jpg", "edu": "MBA, <a href=\"https://www.london.edu/\" target=\"_blank\" rel=\"noopener\">London Business School</a>", "desc": "Uri is a commercial operator who advises Innate AI on go-to-market strategy. As co-founder and COO of Skarper, he led the commercial build through launch alongside partners including Red Bull Advanced Technologies and Sir Chris Hoy. As COO of QUADSAW, he took a UK-invented power tool into Lowe's and major US retailers while cutting unit cost by 67%. He now works as a fractional COO across health-tech, consumer hardware and AI."}, {"id": "chris", "name": "Chris Smith", "role": "Partner · AI operations &amp; delivery", "img": "../advisors/chris-smith.jpg", "edu": "", "desc": "Chris brings large-scale AI delivery experience to Innate AI. As Head of Global Operations for Senseye Predictive Maintenance at <a href=\"https://www.siemens.com/\" target=\"_blank\" rel=\"noopener\">Siemens</a>, he leads the rollout of AI-driven predictive maintenance software for industrial clients worldwide, with deep expertise in asset management and delivery engineering."}];

const $=s=>document.querySelector(s);
const photo=m=>m.img?`<img src="img/team/${m.img.replace('.png','-sq.png')}" alt="${m.name}" loading="lazy" width="520" height="520">`:`<span class="mono">${m.mono}</span>`;

// ---- case studies: grid (#case-studies) and case pages (#film/<id> flagships, #case/<id> written) ----
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let csInd='all';
// Client line only where it adds to the title (some approved titles already name the client).
const clientLine=v=>v.client&&!v.title.toLowerCase().includes(v.client.toLowerCase().replace(/^(a|the) /,''))?v.client:'';
function vaultHashFor(industry){return '#case-studies'+(industry!=='all'?'/'+industry:'')}
function vaultCard(v,lead){
  const film=vaultFilm(v);
  const badge=film?`<span class="vc-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>Film${film.duration?' &middot; '+fmtDur(film.duration):''}</span>`:'';
  return `<article class="vc${lead?' vc-lead':''}">
    <a class="vc-link-wrap" href="${caseHref(v)}">
      <span class="vc-shot"><img src="${v.img}" alt="" loading="lazy" width="1600" height="1000">${badge}</span>
      <span class="vc-body"><span class="sector">${esc(v.sector)}<i aria-hidden="true">&middot;</i>${esc(v.name)}</span>
      <span class="vc-title">${esc(v.title)}</span>
      ${clientLine(v)?`<span class="vc-client">${esc(clientLine(v))}</span>`:''}
      <span class="vc-more">${film?'Watch the film':'Read the case study'} <span aria-hidden="true">&rarr;</span></span></span>
    </a></article>`;
}
function renderCases(){
  $('#ind-pick').innerHTML=VAULT_INDUSTRIES.map(i=>`<a class="problem-option ${i.id===csInd?'on':''}" href="${vaultHashFor(i.id)}" ${i.id===csInd?'aria-current="true"':''}>${i.name}<b>${vaultList(i.id).length}</b></a>`).join('');
  const list=vaultList(csInd);
  $('#result-count').textContent=list.length+(list.length===1?' case study':' case studies');
  $('#vault-grid').innerHTML=list.map(v=>vaultCard(v,!!vaultFilm(v))).join('');
  $('#cs-empty').hidden=list.length>0;
}
function caseMedia(v){
  const f=vaultFilm(v)?NEW_FILMS[v.id]:null;
  if(!f)return `<figure class="cp-cover"><img src="${v.img}" alt="" width="1600" height="1000"></figure>`;
  // Film first; the cover photo is the poster until the film's own poster exists, and the fallback if the film is missing.
  return `<div class="cp-film" id="cp-film"><video id="cp-video" controls playsinline preload="metadata" poster="${v.img}" aria-label="${esc(v.name)} film">
      <source src="${f.src}" type="video/mp4">${f.vtt?`<track kind="captions" src="${f.vtt}" srclang="en" label="English">`:''}</video>
    <div class="cp-film-soon" hidden><span class="vc-badge"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>Film${f.duration?' &middot; '+fmtDur(f.duration):''}</span><p>The film is on its way. Try the tool below in the meantime.</p></div></div>`;
}
function wireFilm(v){
  const f=NEW_FILMS[v.id],vid=$('#cp-video');if(!vid)return;
  if(f.poster){const im=new Image();im.onload=()=>{vid.poster=f.poster};im.src=f.poster;}
  const fail=()=>{const box=$('#cp-film');if(!box||box.classList.contains('is-missing'))return;box.classList.add('is-missing');vid.removeAttribute('controls');
    const soon=box.querySelector('.cp-film-soon');soon.hidden=false;
    if(!v.tool)soon.querySelector('p').textContent='The film is on its way.';};
  const src=vid.querySelector('source');if(src)src.addEventListener('error',fail);
  vid.addEventListener('error',fail);
}
function renderCase(id,asFilm){
  const v=FEATURED_VAULT.find(x=>x.id===id);
  if(!v){location.replace('#case-studies');return false;}
  const film=vaultFilm(v);
  if(asFilm&&!film){location.replace('#case/'+id);return false;}
  if(!asFilm&&film){location.replace('#film/'+id);return false;}
  const page=$('#page-case');
  if(page.dataset.id!==id){
    page.dataset.id=id;
    $('#cp-eyebrow').innerHTML=`${esc(v.sector)}<i aria-hidden="true">&middot;</i>${esc(v.name)}`;
    $('#cp-title').textContent=v.title;
    const cl=$('#cp-client');cl.textContent=clientLine(v);cl.hidden=!clientLine(v);
    $('#cp-media').innerHTML=caseMedia(v);
    if(film)wireFilm(v);
    const live=$('#cp-live'),frame=$('#cp-frame');
    if(v.tool){live.hidden=false;$('#cp-embed-name').textContent=v.name;frame.title=v.name+', live example';frame.src=v.tool;}
    else{live.hidden=true;frame.removeAttribute('src');}
    const stats=v.stats.map(([n,l])=>`<div class="cp-stat"><b>${esc(n)}</b><span>${esc(l)}</span></div>`).join('');
    $('#cp-body').innerHTML=`
      <section><h2 class="cp-h">The problem</h2>${v.problem.map(p=>`<p>${esc(p)}</p>`).join('')}</section>
      <section><h2 class="cp-h">What we built</h2>${v.built.map(p=>`<p>${esc(p)}</p>`).join('')}</section>
      <section><h2 class="cp-h">The impact</h2><div class="cp-stats">${stats}</div>
        ${v.note?`<p class="cp-note">${esc(v.note)} Figures marked est. are worked estimates.</p>`:''}
        ${v.quote?`<blockquote class="cp-quote"><p>“${esc(v.quote.q)}”</p><cite>${esc(v.quote.who)}</cite></blockquote>`:''}
        ${v.private?`<p class="cp-private">${esc(v.private)} <a class="ulink" href="#book">Book a call &rarr;</a></p>`:''}
      </section>`;
    const ind=VAULT_INDUSTRIES.find(i=>i.id===v.ind);
    $('#cp-meta').innerHTML=`<dl>
      <div><dt>Industry</dt><dd><a class="ulink" href="${vaultHashFor(v.ind)}">${esc(ind?ind.name:v.sector)}</a></dd></div>
      ${v.client?`<div><dt>Client</dt><dd>${esc(v.client)}</dd></div>`:''}
      <div><dt>System</dt><dd>${esc(v.name)}</dd></div>
      <div><dt>Format</dt><dd>${film?'Film'+(v.tool?' and live tool':''):(v.tool?'Written case study and live tool':'Written case study')}</dd></div>
    </dl><a class="btn btn-dark cp-cta" href="#book">Talk about this workflow</a>`;
    const others=FEATURED_VAULT.filter(x=>x.id!==id);
    const same=others.filter(x=>x.ind===v.ind),rest=others.filter(x=>x.ind!==v.ind);
    $('#cp-more').innerHTML=same.concat(rest).slice(0,3).map(x=>vaultCard(x,false)).join('');
  }
  document.title=v.name+' case study | Innate AI';
  const d=document.querySelector('meta[name="description"]');if(d)d.setAttribute('content',v.title+'.');
  return true;
}
// Team & Partners: headshot, one professional description (no years), education last
function renderPeople(sel,list){
  document.querySelector(sel).innerHTML=list.map(m=>`
  <article class="person">
    <div class="person-id"><span class="person-ph">${m.img?`<img src="img/team/${m.img}" alt="${m.name}" loading="lazy">`:`<span class="person-mono">${m.name.split(" ").map(w=>w[0]).join("")}</span>`}</span><div><h3>${m.name}</h3><p class="person-role">${m.role}</p></div></div>
    <div class="person-bio"><p>${m.desc}</p>${m.edu?`<p class="person-creds">${m.edu}</p>`:''}</div>
  </article>`).join('');
}
renderPeople('#partner-list',ADVISORS);

function openModal(html){$('#modal-content').innerHTML=html;$('#modal').classList.add('open');document.body.style.overflow='hidden'}
function closeModal(){$('#modal').classList.remove('open','demo-mode','case-mode');$('#modal-content').innerHTML='';document.body.style.overflow=''}
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

function openCase(i){
  const c=CASES[i];
  if(c.demo){window.open(demoPath(c),'_blank','noopener');return;}
  $('#modal').classList.remove('demo-mode');
  $('#modal').classList.add('case-mode');
  openModal(`<div class="modal-shot"><img src="img/cases/${c.img}" alt=""></div>
    <p class="eyebrow">${c.sector}</p><h3 class="case-title">${c.title}</h3>
    <p class="muted">${c.line}</p>
    <div class="stats">${c.stats.map(s=>`<span>${s}</span>`).join('')}</div>
    <ul>${c.detail.map(d=>`<li>${d}</li>`).join('')}</ul>
    ${c.testimonials?`<div class="case-quotes"><p class="eyebrow">What the client said</p>${c.testimonials.map(t=>`<figure class="case-quote"><blockquote>“${t.q}”</blockquote><figcaption>${t.who}</figcaption></figure>`).join('')}</div>`:''}
    <a href="#book" class="btn btn-dark case-cta" onclick="closeModal()">Book a Call</a>`);
}

// endless carousel: drifts on its own, drag with the mouse, swipe on touch, never reaches an end
function endlessScroller(track,{speed=.4,pauseBtn=null,prev=null,next=null}={}){
  if(!track)return;
  const originals=[...track.children];
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let loopW=0,paused=reduce,hover=false,touching=false,drag=null,moved=false,last=0;
  const gapOf=()=>parseFloat(getComputedStyle(track).columnGap)||0;
  const measure=()=>{loopW=originals.reduce((w,el)=>w+el.getBoundingClientRect().width+gapOf(),0)};
  const fill=()=>{
    measure();if(!loopW||!track.clientWidth)return;
    const need=Math.ceil((loopW*3+track.clientWidth)/loopW);
    for(let n=Math.round(track.children.length/originals.length);n<need&&n<12;n++)originals.forEach(el=>track.appendChild(el.cloneNode(true)));
    if(track.scrollLeft<1)track.scrollLeft=loopW;
  };
  const wrap=()=>{if(!loopW)return;if(track.scrollLeft>=loopW*2)track.scrollLeft-=loopW;else if(track.scrollLeft<loopW*.5)track.scrollLeft+=loopW};
  new ResizeObserver(()=>fill()).observe(track);
  addEventListener('resize',()=>{fill();wrap()});
  track.addEventListener('scroll',wrap,{passive:true});
  track.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')hover=true});
  track.addEventListener('pointerleave',()=>{hover=false});
  track.addEventListener('touchstart',()=>{touching=true},{passive:true});
  track.addEventListener('touchend',()=>{setTimeout(()=>touching=false,1200)},{passive:true});
  track.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;drag={x:e.clientX,s:track.scrollLeft};moved=false;track.classList.add('dragging')});
  addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>4)moved=true;track.scrollLeft=drag.s-dx});
  addEventListener('pointerup',()=>{if(drag){drag=null;track.classList.remove('dragging')}});
  track.addEventListener('click',e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
  track.addEventListener('dragstart',e=>e.preventDefault());
  const step=d=>{const w=originals[0].getBoundingClientRect().width+gapOf();track.scrollBy({left:w*d,behavior:'smooth'})};
  prev&&prev.addEventListener('click',()=>step(-1));next&&next.addEventListener('click',()=>step(1));
  if(pauseBtn){if(reduce)pauseBtn.textContent='▶';pauseBtn.addEventListener('click',()=>{paused=!paused;pauseBtn.textContent=paused?'▶':'❚❚';pauseBtn.setAttribute('aria-label',paused?'Play':'Pause')})}
  (function tick(t){
    const dt=last?Math.min(t-last,50):16;last=t;
    if(!paused&&!hover&&!touching&&!drag&&loopW&&track.clientWidth)track.scrollLeft+=speed*dt/16;
    requestAnimationFrame(tick);
  })(0);
}
endlessScroller(document.getElementById('toolsTrack'),{speed:.5,pauseBtn:document.getElementById('toolsPause')});

// How we can help: lead-qualification diagnostic.
// 8 questions -> contact -> one of four results, with CRM tags sent to /api/submit (form: 'quiz').
(function(){
  const stage=document.getElementById('quiz-stage');if(!stage)return;
  const top=document.getElementById('qz-top'),dots=document.getElementById('qz-dots'),left=document.getElementById('qz-left'),profile=document.getElementById('qz-profile'),meter=document.getElementById('qz-meter');
  const I={
    people:'<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 14.2c3 .2 5.5 2.6 5.5 5.8"/>',
    grid:'<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
    spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18"/>',
    target:'<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
    tool:'<path d="M14 6a4 4 0 0 0 5 5l-8 8a2 2 0 0 1-3-3z"/>',
    clock:'<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
    key:'<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M21 12v2"/>',
    coin:'<circle cx="12" cy="12" r="8"/><path d="M15 9a3 3 0 0 0-5 2v5h5M9 13h4"/>'};
  // each option: [value, label, points]
  const Q=[
    {k:'size',icon:'people',tag:'Company size',q:'How large is your organisation?',o:[['1-10','1 to 10 people',4],['11-50','11 to 50',14],['51-250','51 to 250',20],['250+','250+',22]]},
    {k:'industry',icon:'grid',tag:'Industry',q:'Which industry are you in?',o:[['luxury','Luxury goods',0],['beauty','Beauty & retail',0],['merch','Merchandising',0],['finance','Finance & investment',0],['realestate','Real estate',0],['construction','Construction',0],['other','Other',0]]},
    {k:'timesink',icon:'tool',tag:'Biggest time sink',q:'Where does most of your team\'s time go?',o:[['leads','Finding and qualifying leads',10],['sales','Following up, quoting and closing',10],['service','Answering customer questions and requests',10],['data','Moving information between systems',10],['admin','Reports, invoicing and paperwork',9],['meetings','Meetings, notes and follow-ups',9],['research','Research and looking things up',8],['other','Something else',6]]},
    {k:'freq',icon:'clock',tag:'How often',q:'How often does that work come round?',o:[['daily','Every day',10],['weekly','A few times a week',8],['monthly','Weekly or monthly',5],['rare','Now and then',2]]},
    {k:'challenge',icon:'target',tag:'Goal',q:'What would you most like AI to do for you?',o:[['revenue','Win and convert more business',10],['cost','Cut manual work and cost',10],['scale','Grow without adding headcount',10],['decisions','Faster, better decisions',10],['unsure','Not sure yet',3]]},
    {k:'data',icon:'key',tag:'Where the data lives',q:'Where does the information behind that work live today?',o:[['heads','In people\'s heads and on paper',3],['files','Spreadsheets, email and shared drives',6],['system','One main system, like a CRM or ERP',9],['connected','Several systems, already connected',10]]},
    {k:'maturity',icon:'spark',tag:'AI today',q:'How are you using AI today?',o:[['none','Not yet',3],['informal','ChatGPT here and there',6],['pilots','Tried a project or two',8],['live','AI in live processes',10]]},
    {k:'owner',icon:'coin',tag:'Who would own it',q:'Who would own this inside your business?',o:[['none','Nobody yet',3],['side','Someone alongside their day job',6],['named','A named owner',9],['team','A small team',10]]},
    {k:'urgency',icon:'clock',tag:'Timeline',q:'When would you like to start?',o:[['now','Within a month',10],['quarter','In the next 3 months',8],['half','3 to 6 months',5],['exploring','Just exploring',2]]}
  ];
  const RES={
    exploration:{name:'Explore first',head:'You are at the right place to start.',
      copy:a=>`With ${P.size[a.size]} and ${P.maturity[a.maturity]}, the smartest move is understanding where AI genuinely fits before you spend on it.`,
      action:'Start with our practical guides, then book a call when a process is clearly costing you time.',cta:['Read our AI guides','https://innate-ai-website-review.vercel.app/insights/'],quality:'D'},
    assessment:{name:'Assessment',head:'You have a real problem worth solving. Now prioritise it.',
      copy:a=>`You know the outcome you want: ${label('challenge',a.challenge).toLowerCase()}, and the time is going into ${P.sink[a.timesink]}. The risk now is building the wrong thing first.`,
      action:'Phase 1, Assessment: a fixed-fee diagnostic in 2 to 4 weeks that ranks your highest-return opportunities.',cta:['Book a Call','#book'],quality:'B'},
    implementation:{name:'Build',head:'You are ready to put AI to work.',
      copy:a=>`You have AI experience, a clear goal (${P.goal[a.challenge]}) and a plan to ${P.urgency[a.urgency]}. ${P.sink[a.timesink][0].toUpperCase()+P.sink[a.timesink].slice(1)} is where we would start, inside the tools you already use.`,
      action:'Phase 2, Build: a 25-minute call to scope the first system, then we build it into the tools you already use.',cta:['Book a Call','#book'],quality:'A'},
    enterprise:{name:'Ongoing partnership',head:'This is a strategic opportunity. Let us talk directly.',
      copy:a=>`${P.size[a.size][0].toUpperCase()+P.size[a.size].slice(1)} with AI already in use and a plan to ${P.urgency[a.urgency]}: this deserves senior attention from day one.`,
      action:'All three phases together: Assessment, Build, then Maintain and Secure, shaped in a call with our founder.',cta:['Book a Call','#book'],quality:'A+'}
  };
  const opt=(k,v)=>Q.find(x=>x.k===k).o.find(o=>o[0]===v);
  const label=(k,v)=>((v==='other'||v==='unsure')&&ans[k+'_text'])?ans[k+'_text']:(opt(k,v)||['',''])[1];
  // natural phrases for result copy
  const P={sink:{leads:'finding and qualifying leads',sales:'following up, quoting and closing',service:'answering customer questions',data:'moving information between systems',admin:'reports, invoicing and paperwork',meetings:'meetings, notes and follow-ups',research:'research and looking things up',other:'the work you described'},
    size:{'1-10':'a small team','11-50':'a growing team','51-250':'a mid-sized organisation','250+':'a large organisation'},
    maturity:{none:'no AI in place yet',informal:'AI used informally so far',pilots:'a few AI projects behind you',live:'AI already running in live processes'},
    goal:{revenue:'winning more business',cost:'cutting manual work',scale:'growing without adding headcount',decisions:'faster decisions',unsure:'finding the right starting point'},
    urgency:{now:'start within a month',quarter:'start in the next three months',half:'start in three to six months',exploring:'no fixed start date'},
    need:{strategy:'an AI strategy',discovery:'the right use cases',automation:'workflow automation',product:'an AI product',implementation:'the implementation',training:'team training'},
    budget:{'unsure':'an open budget','<10k':'a budget under £10k','10-50k':'a £10k to £50k budget','50-150k':'a £50k to £150k budget','150k+':'a budget above £150k'}};
  let step=0,ans={},who={};
  const val=k=>((opt(k,ans[k])||[])[2]||0);
  const cat={opportunity:['timesink','freq','challenge'],readiness:['data','maturity','owner'],momentum:['urgency']};
  const catScore=c=>{const ks=cat[c].filter(k=>ans[k]);if(!ks.length)return 0;
    return Math.round(ks.reduce((t,k)=>t+val(k),0)/(ks.length*10)*100)};
  const score=()=>Math.round(catScore('opportunity')*.4+catScore('readiness')*.35+catScore('momentum')*.25);
  function route(a){
    const big=a.size==='250+'||a.size==='51-250',soon=['now','quarter'].includes(a.urgency),used=['pilots','live'].includes(a.maturity);
    if(big&&soon&&used)return'enterprise';
    if(used&&soon&&a.challenge!=='unsure')return'implementation';
    if(a.challenge!=='unsure'&&a.urgency!=='exploring')return'assessment';
    return'exploration';
  }
  function tags(){
    const r=route(ans),p=new URLSearchParams(location.search);
    return{source:'website_quiz',utm_source:p.get('utm_source')||'',utm_campaign:p.get('utm_campaign')||'',referrer:document.referrer||'direct',
      company_size:ans.size,industry:ans.industry,maturity:ans.maturity,goal:ans.challenge,urgency:ans.urgency,
      time_sink:ans.timesink,time_sink_text:ans.timesink_text||'',industry_text:ans.industry_text||'',goal_text:ans.challenge_text||'',frequency:ans.freq,data_home:ans.data,owner:ans.owner,
      opportunity:catScore('opportunity'),readiness:catScore('readiness'),momentum:catScore('momentum'),
      score:score(),result:RES[r].name,lead_quality:RES[r].quality};
  }
  const ic=n=>`<svg viewBox="0 0 24 24" aria-hidden="true">${I[n]}</svg>`;
  function side(){
    profile.innerHTML=Q.map(x=>{const v=ans[x.k];return `<li class="${v?'on':''}"><span class="qp-ic">${ic(x.icon)}</span><span class="qp-k">${x.tag}</span><span class="qp-v">${v?label(x.k,v):'…'}</span></li>`}).join('');
    meter.style.width=Math.round(Object.keys(ans).length/Q.length*100)+'%';
  }
  function chrome(){
    const inQ=step>=0&&step<Q.length;top.hidden=!inQ&&step>Q.length+1;
    dots.innerHTML=Q.map((_,i)=>`<i class="${i<step?'done':i===step?'now':''}"></i>`).join('')+`<i class="${step===Q.length?'now':step>Q.length?'done':''}"></i>`+`<i class="${step===Q.length+1?'now':step>Q.length+1?'done':''}"></i>`;
    const rem=Math.max(0,Q.length-step);left.textContent=step<Q.length?`${rem} question${rem===1?'':'s'} left`:(step===Q.length?'One more thing':'Last step');
  }
  function swap(html){stage.classList.remove('in');void stage.offsetWidth;stage.innerHTML=html;stage.classList.add('in')}
  function intro(){
    swap(`<div class="qz-intro">
      <p class="qz-kicker">AI value diagnostic</p>
      <h2>Where can AI create the most value <em>for you?</em></h2>
      <ul class="qz-bullets"><li><b>9</b> quick questions</li><li><b>2</b> minutes</li><li><b>1</b> clear recommendation</li></ul>
      <button class="btn btn-dark qz-start" type="button">Start the diagnostic →</button>
      <p class="qz-fine">No sales pitch. Your answers shape the recommendation you see at the end.</p></div>`);
    stage.querySelector('.qz-start').addEventListener('click',()=>{step=0;render()});
  }
  function question(){
    const q=Q[step];
    swap(`<p class="qz-count"><span class="qz-ic">${ic(q.icon)}</span>Question ${step+1} of ${Q.length} · ${q.tag}</p>
      <h2 class="qz-q">${q.q}</h2>
      <div class="qz-opts${q.o.length>5?' many':''}">${q.o.map(([v,t],i)=>`<button class="qz-opt${ans[q.k]===v?' on':''}" data-v="${v}" type="button"><kbd>${i+1}</kbd><span>${t}</span></button>`).join('')}</div>
      <div class="qz-nav">${step?'<button class="qz-back" type="button">← Back</button>':'<span></span>'}<span class="qz-hint">Press 1–${q.o.length} to answer</span></div>`);
    stage.querySelectorAll('.qz-opt').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.v,b)));
    stage.querySelector('.qz-back')?.addEventListener('click',()=>{step--;render()});
    stage.querySelector('.qz-opt.on,.qz-opt')?.focus({preventScroll:true});
  }
  function choose(v,btn){
    const q=Q[step];ans[q.k]=v;
    stage.querySelectorAll('.qz-opt').forEach(x=>x.classList.toggle('on',x===btn));
    if(v==='other'||v==='unsure'){
      let box=stage.querySelector('.qz-other');
      if(!box){
        box=document.createElement('div');box.className='qz-other';
        box.innerHTML='<label class="qz-other-l" for="qz-other-in">In your own words (optional)</label><div class="qz-other-row"><input id="qz-other-in" type="text" maxlength="90" placeholder="Tell us in a few words" autocomplete="off"><button class="btn btn-dark" type="button">Continue →</button></div>';
        stage.querySelector('.qz-opts').after(box);
        const inp=box.querySelector('input'),go=box.querySelector('button');
        const submit=()=>{ans[q.k+'_text']=inp.value.trim();side();step++;render()};
        go.addEventListener('click',submit);
        inp.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();submit()}});
      }
      box.querySelector('input').focus({preventScroll:true});side();return;
    }
    const o=stage.querySelector('.qz-other');if(o)o.remove();
    side();setTimeout(()=>{step++;render()},260);
  }
  let note_={text:'',audio:null,mime:''};
  function context(){
    swap(`<p class="qz-count">The part that makes your summary useful</p>
      <h2 class="qz-q">Tell us about your business <em>in your own words.</em></h2>
      <p class="qz-sub">Press record and talk for a minute, or type it. This is the part we read first, and it is what makes your summary specific to you instead of generic.</p>
      <ul class="vn-prompts">
        <li>What your business does, and how the work flows today</li>
        <li>The part that eats the most time, or goes wrong most often</li>
        <li>What you would automate first if you could</li>
      </ul>
      <div class="vn">
        <div class="vn-row">
          <button class="btn btn-dark vn-rec" type="button"><span class="vn-dot" aria-hidden="true"></span><span class="vn-label">Record a voice note</span></button>
          <span class="vn-time" aria-live="polite"></span>
          <button class="vn-clear" type="button" hidden>Delete</button>
        </div>
        <audio class="vn-audio" controls hidden></audio>
        <p class="vn-hint">Up to 2 minutes. Nothing is recorded until you press the button, and you can delete it before sending.</p>
      </div>
      <label class="vn-text">Or type it<textarea rows="4" placeholder="For example: we quote around 40 scaffolding jobs a week. Two people spend a full day each time pulling measurements off drawings, and we still lose jobs because we quote late."></textarea></label>
      <div class="qz-nav"><button class="qz-back" type="button">← Back</button><button class="btn btn-dark vn-next" type="button">Continue →</button></div>`);
    const rec=stage.querySelector('.vn-rec'),time=stage.querySelector('.vn-time'),audio=stage.querySelector('.vn-audio'),clear=stage.querySelector('.vn-clear'),ta=stage.querySelector('textarea');
    if(note_.text)ta.value=note_.text;
    if(note_.audio){audio.hidden=false;audio.src=URL.createObjectURL(note_.audio);clear.hidden=false;rec.querySelector('.vn-label').textContent='Record again'}
    if(!(navigator.mediaDevices&&window.MediaRecorder)){rec.disabled=true;rec.querySelector('.vn-label').textContent='Recording not supported here'}
    let mr=null,chunks=[],t0=0,tick=null;
    const stop=()=>{if(mr&&mr.state!=='inactive')mr.stop();clearInterval(tick);rec.classList.remove('on');rec.querySelector('.vn-label').textContent='Record again'};
    rec.addEventListener('click',async()=>{
      if(rec.classList.contains('on'))return stop();
      try{
        const stream=await navigator.mediaDevices.getUserMedia({audio:true});
        mr=new MediaRecorder(stream);chunks=[];
        mr.ondataavailable=e=>chunks.push(e.data);
        mr.onstop=()=>{stream.getTracks().forEach(t=>t.stop());
          const blob=new Blob(chunks,{type:mr.mimeType||'audio/webm'});
          note_.audio=blob;note_.mime=blob.type;audio.src=URL.createObjectURL(blob);audio.hidden=false;clear.hidden=false};
        mr.start();t0=Date.now();rec.classList.add('on');rec.querySelector('.vn-label').textContent='Stop recording';
        tick=setInterval(()=>{const sec=Math.floor((Date.now()-t0)/1000);time.textContent=Math.floor(sec/60)+':'+String(sec%60).padStart(2,'0');if(sec>=120)stop()},250);
      }catch(e){rec.disabled=true;rec.querySelector('.vn-label').textContent='Microphone not available'}
    });
    clear.addEventListener('click',()=>{note_.audio=null;note_.mime='';audio.hidden=true;clear.hidden=true;time.textContent='';rec.querySelector('.vn-label').textContent='Record a voice note'});
    stage.querySelector('.vn-next').addEventListener('click',()=>{note_.text=ta.value.trim();stop();step++;render()});
    stage.querySelector('.qz-back').addEventListener('click',()=>{step--;render()});
  }
  function details(){
    const r=RES[route(ans)];
    swap(`<p class="qz-count">Your result is ready</p>
      <h2 class="qz-q">Your result is ready. <em>Where should we send it?</em></h2>
      <p class="qz-sub">You will see it straight away. We will email you a copy.</p>
      <form class="site-form qz-form" novalidate>
        <div class="f-row">
          <label>First name*<input id="qz-name" name="name" autocomplete="given-name" required></label>
          <label>Work email*<input id="qz-email" name="email" type="email" autocomplete="email" required></label>
        </div>
        <button class="btn btn-dark" type="submit">Show my result →</button>
        <p class="f-status" role="status" aria-live="polite"></p>
      </form>
      <div class="qz-nav"><button class="qz-back" type="button">← Back</button><span></span></div>`);
    const f=stage.querySelector('form');f.elements.name.focus({preventScroll:true});
    f.addEventListener('submit',e=>{
      e.preventDefault();let bad=false;
      f.querySelectorAll('[required]').forEach(el=>{const v=el.value.trim();const inv=!v||(el.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));el.classList.toggle('invalid',inv);if(inv)bad=true});
      if(bad){f.querySelector('.f-status').className='f-status err';f.querySelector('.f-status').textContent='Please add your first name and a valid work email.';return}
      who={name:f.elements.name.value.trim(),email:f.elements.email.value.trim()};
      step++;render();send();
    });
    stage.querySelector('.qz-back').addEventListener('click',()=>{step--;render()});
  }
  async function send(){
    const t=tags();
    const extra=(note_.text?`\n\nIn their own words:\n${note_.text}`:'')+(note_.audio?`\n\n(Voice note attached, ${Math.round(note_.audio.size/1024)} KB)`:'');
    const message=`Lead quality: ${t.lead_quality} · Result: ${t.result} · Score: ${t.score}/100\n\n`+Q.map(x=>`${x.tag}: ${label(x.k,ans[x.k])}`).join('\n')+extra+`\n\nCRM tags: ${JSON.stringify(t)}`;
    let voice=null;
    if(note_.audio&&note_.audio.size<4*1024*1024){
      try{voice=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res({name:'voice-note.'+((note_.mime||'audio/webm').includes('mp4')?'m4a':'webm'),type:note_.mime||'audio/webm',content:String(r.result).split(',')[1]});r.onerror=rej;r.readAsDataURL(note_.audio)})}catch(e){}
    }
    let ok=false;
    try{const r=await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({form:'quiz',...who,message,tags:t,voice})});ok=r.ok}catch(e){}
    const note=document.getElementById('qz-note');
    if(note&&!ok){const href='mailto:admin@innateaiconsulting.com?subject='+encodeURIComponent('AI scorecard: '+who.name)+'&body='+encodeURIComponent(message);
      note.innerHTML=`Your summary is on this page and ready to download. <a class="ulink" href="${href}">Send it to us</a> and we will come back with what we would look at first.`}
  }
  const DIMS=()=>{
    const band=(n,hi,mid,lo)=>n>=70?hi:n>=45?mid:lo;
    const o=catScore('opportunity'),r=catScore('readiness'),m=catScore('momentum');
    return[
      {n:'Opportunity',v:o,note:band(o,'Work that repeats often, with a clear goal. This is where AI pays back fastest.','A real problem worth solving once it is ranked against the rest.','The work is occasional, so the gain is smaller. Worth finding the bigger repeat first.')},
      {n:'Readiness',v:r,note:band(r,'Your information is already in systems and someone can own this. We can build early.','Some foundations in place. A short assessment shows what to tidy first.','Data sits in heads and files with no owner yet. That shapes what we build first.')},
      {n:'Momentum',v:m,note:band(m,'You want to start now, so the first system can be live in weeks.','A start date in sight. Good time to scope the first build.','No fixed date. Useful to know what it would involve before you commit.')}
    ];
  };
  const IND_NOTES={
    luxury:['Client intelligence: one profile per client, built from calls, emails and purchase history','Personalised follow-up drafted within minutes of an interaction, not days','VIP and repeat-client alerts so nothing depends on one person remembering'],
    beauty:['Trend and competitor research pulled from hundreds of sources instead of a manual shortlist','Product data in one place rather than spreadsheets and email threads','Supplier portals so reorders and specs stop bouncing between inboxes'],
    merch:['Range and assortment planning from live sell-through instead of last season guesswork','Reorder suggestions with the reasoning attached','Weekly reporting built automatically for the trade meeting'],
    finance:['Client intake checked for completeness and consistency before advice work starts','Meeting notes turned into actions, tasks and follow-up letters','Annual review packs assembled from the systems you already use'],
    realestate:['Enquiries from email, phone and web forms turned into qualified, booked viewings','Listings and availability kept current from brochures and supplier emails','Client briefs matched to stock with the reasoning shown'],
    construction:['Quoting from drawing packs: takeoff suggested, estimator confirms','Crew readiness and labour planning in one view before allocation','Applications, variations and site records tracked without paper'],
    other:['The one process that repeats most often, mapped end to end','Where information is rekeyed between systems','The report or document that takes the longest to produce each week']};
  function pdfLines(){
    const t=tags(),d=DIMS();
    const notes=IND_NOTES[ans.industry]||IND_NOTES.other;
    return {score:score(),dims:d,tags:t,notes,
      answers:Q.map(x=>[x.tag,label(x.k,ans[x.k])]),
      result:RES[route(ans)]};
  }
  async function downloadSummary(btn){
    btn.disabled=true;const old=btn.textContent;btn.textContent='Building your summary…';
    try{
      if(!window.jspdf){await new Promise((res,rej)=>{const sc=document.createElement('script');sc.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';sc.onload=res;sc.onerror=rej;document.head.appendChild(sc)})}
      const {jsPDF}=window.jspdf;const doc=new jsPDF({unit:'pt',format:'a4'});
      const P=pdfLines();const M=56;let y=M;const W=595-M*2;
      const ink=[16,18,15],forest=[21,63,55],grey=[96,100,93];
      doc.setFillColor(...ink);doc.rect(0,0,595,96,'F');
      doc.setTextColor(255,255,255);doc.setFont('helvetica','bold');doc.setFontSize(18);doc.text('INNATE AI',M,50);
      doc.setFont('helvetica','normal');doc.setFontSize(10);doc.setTextColor(120,230,182);doc.text('AI SCORECARD SUMMARY',M,70);
      y=140;doc.setTextColor(...ink);doc.setFont('helvetica','bold');doc.setFontSize(22);
      doc.text(`${who.name||'Your'} result: ${P.result.name}`,M,y);y+=26;
      doc.setFont('helvetica','normal');doc.setFontSize(11);doc.setTextColor(...grey);
      doc.text(doc.splitTextToSize(P.result.copy(ans).replace(/<[^>]+>/g,''),W),M,y);y+=46;
      doc.setDrawColor(220,218,210);doc.line(M,y,M+W,y);y+=28;
      doc.setFontSize(34);doc.setTextColor(...forest);doc.setFont('helvetica','bold');doc.text(String(P.score),M,y);
      doc.setFontSize(10);doc.setFont('helvetica','normal');doc.setTextColor(...grey);doc.text('FIT SCORE / 100',M+52,y-4);y+=34;
      P.dims.forEach(d=>{doc.setFont('helvetica','bold');doc.setFontSize(12);doc.setTextColor(...ink);doc.text(`${d.n}: ${d.v}/100`,M,y);y+=15;
        doc.setFont('helvetica','normal');doc.setFontSize(10);doc.setTextColor(...grey);doc.text(doc.splitTextToSize(d.note,W),M,y);y+=30});
      y+=6;doc.setDrawColor(220,218,210);doc.line(M,y,M+W,y);y+=26;
      doc.setFont('helvetica','bold');doc.setFontSize(13);doc.setTextColor(...ink);doc.text('What we would look at first in a business like yours',M,y);y+=20;
      P.notes.forEach(n=>{doc.setFont('helvetica','normal');doc.setFontSize(10.5);doc.setTextColor(...grey);
        const lines=doc.splitTextToSize('•  '+n,W);doc.text(lines,M,y);y+=lines.length*14+6});
      y+=12;doc.setFont('helvetica','bold');doc.setFontSize(13);doc.setTextColor(...ink);doc.text('Recommended next step',M,y);y+=18;
      doc.setFont('helvetica','normal');doc.setFontSize(10.5);doc.setTextColor(...grey);doc.text(doc.splitTextToSize(P.result.action,W),M,y);y+=42;
      doc.setFont('helvetica','bold');doc.setFontSize(13);doc.setTextColor(...ink);doc.text('Your answers',M,y);y+=18;
      P.answers.forEach(([k,v])=>{if(y>760){doc.addPage();y=M}doc.setFont('helvetica','normal');doc.setFontSize(10);doc.setTextColor(...grey);
        doc.text(k,M,y);doc.setTextColor(...ink);doc.text(doc.splitTextToSize(String(v),W-170),M+170,y);y+=17});
      y+=20;if(y>740){doc.addPage();y=M}
      doc.setTextColor(...grey);doc.setFontSize(9);
      doc.text('Innate AI Consulting · London · admin@innateaiconsulting.com · innateaiconsulting.com',M,y);
      doc.save(`Innate-AI-scorecard-${(who.name||'summary').replace(/[^\w]+/g,'-').toLowerCase()}.pdf`);
    }catch(e){btn.textContent='Could not build the PDF';return}
    btn.disabled=false;btn.textContent=old;
  }
  function result(){
    const key=route(ans),r=RES[key],sc=score(),ind={luxury:'retail',beauty:'retail',merch:'retail',finance:'financial',realestate:'real-estate',construction:'construction',other:'all'}[ans.industry];
    const tiers=['exploration','assessment','implementation','enterprise'];
    swap(`<div class="qz-result">
      <p class="qz-count">${who.name?who.name+', here is':'Here is'} your recommendation</p>
      <div class="qz-res-head">
        <div class="qz-ring" style="--p:${sc}"><b>${sc}</b><span>fit score</span></div>
        <div><p class="qz-res-type">${r.name}</p><h2 class="qz-q">${r.head}</h2></div>
      </div>
      <div class="qz-dims">${DIMS().map(d=>`<div class="qz-dim"><span class="qz-dim-top"><span class="qz-dim-n">${d.n}</span><b>${d.v}</b></span><span class="qz-dim-bar"><i style="width:${d.v}%"></i></span><span class="qz-dim-note">${d.note}</span></div>`).join('')}</div>
      <ol class="qz-ladder">${tiers.map(t=>`<li class="${t===key?'on':''}">${RES[t].name}</li>`).join('')}</ol>
      <p class="qz-res-copy">${r.copy(ans)}</p>
      <div class="qz-next"><span class="qz-next-label">Recommended next step</span><p>${r.action}</p></div>
      ${key==='exploration'?`<div class="qz-cta"><a href="${r.cta[1]}" class="btn btn-dark">${r.cta[0]}</a><a class="ulink" href="#book">Or book a call</a></div>`:`<div class="qz-book"><p class="qz-book-h">Book your 25-minute call now</p><div class="qz-cal"><iframe src="https://cal.com/joseph-gale-5lxd9w/intro-chat?embed=true&theme=light&name=${encodeURIComponent(who.name||'')}&email=${encodeURIComponent(who.email||'')}" title="Book a Call" loading="lazy"></iframe></div></div>`}
      <div class="qz-dl"><button class="btn btn-dark qz-pdf" type="button">Download your summary (PDF)</button><span>Yours to keep and share internally.</span></div>
      <p class="qz-more"><a class="ulink" href="#case-studies/${ind}">See work in your industry →</a></p>
      <p class="qz-note" id="qz-note"></p>
      <button class="qz-back" type="button">↺ Start again</button></div>`);
    stage.querySelector('.qz-pdf')?.addEventListener('click',e=>downloadSummary(e.currentTarget));
    stage.querySelector('.qz-back').addEventListener('click',()=>{step=0;ans={};who={};note_={text:'',audio:null,mime:''};side();render()});
  }
  function render(){
    chrome();
    if(step<0)intro();else if(step<Q.length)question();else if(step===Q.length)context();else if(step===Q.length+1)details();else result();
  }
  document.addEventListener('keydown',e=>{
    if(step<0||step>=Q.length||!document.getElementById('page-hire').classList.contains('active'))return;
    if(e.target.matches('input,textarea,select'))return;
    const n=parseInt(e.key,10),o=Q[step].o;
    if(n>=1&&n<=o.length){const b=stage.querySelectorAll('.qz-opt')[n-1];choose(o[n-1][0],b)}
    else if(e.key==='Backspace'&&step>0){step--;render()}
  });
  side();render();
})();

const JOB_ICONS={"AI Developer": "<path d=\"M8 8l-4 4 4 4M16 8l4 4-4 4M13 6l-2 12\"/>", "AI Strategist": "<circle cx=\"12\" cy=\"12\" r=\"8\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/>", "AI Strategy Manager": "<path d=\"M4 20V10M10 20V4M16 20v-8M22 20H2\"/>", "GTM Associate": "<path d=\"M3 17l6-6 4 4 8-8\"/><path d=\"M15 7h6v6\"/>"};
// jobs: single-open role list; one shared form opens under the chosen role
(function(){
  const list=document.getElementById('jobs'),form=document.querySelector('.apply-form');if(!list)return;
  list.innerHTML=ROLES.map((r,i)=>`<div class="job" data-i="${i}">
    <button class="job-head" aria-expanded="false"><span class="job-ic"><svg viewBox="0 0 24 24" aria-hidden="true">${JOB_ICONS[r.title]||''}</svg></span><span class="job-title">${r.title}</span><span class="job-tag">${r.tag}</span><span class="chev">+</span></button>
    <div class="job-body"><div><p>${r.overview}</p><button class="btn btn-dark job-apply" type="button">Apply</button><div class="job-form"></div></div></div>
  </div>`).join('');
  const jobs=[...list.querySelectorAll('.job')];
  jobs.forEach(j=>{
    const head=j.querySelector('.job-head');
    head.addEventListener('click',()=>{
      const open=head.getAttribute('aria-expanded')!=='true';
      jobs.forEach(o=>{o.querySelector('.job-head').setAttribute('aria-expanded','false');o.classList.remove('applying')});
      head.setAttribute('aria-expanded',open);
    });
    j.querySelector('.job-apply').addEventListener('click',()=>{
      const role=ROLES[+j.dataset.i];
      form.elements.interest.value=role.title;
      const tech=/developer|engineer/i.test(role.title)||/engineering/i.test(role.tag||'');
      form.querySelectorAll('.tech-only').forEach(el=>{el.hidden=!tech;el.querySelectorAll('input,textarea').forEach(f=>{if(!tech)f.value=''})});
      j.querySelector('.job-form').appendChild(form);form.hidden=false;
      jobs.forEach(o=>o.classList.toggle('applying',o===j));
      form.querySelector('.f-status').className='f-status';form.querySelector('.f-status').textContent='';
      form.elements.name.focus({preventScroll:true});
    });
  });
})();

// forms: quiz leads and Join us applications -> Lis (via /api/submit)
(function(){
  const FALLBACK='admin@innateaiconsulting.com';
  const readFile=f=>new Promise((ok,bad)=>{const r=new FileReader();r.onload=()=>ok(String(r.result).split(',')[1]);r.onerror=bad;r.readAsDataURL(f)});
  document.querySelectorAll('.file-drop input').forEach(inp=>inp.addEventListener('change',()=>{
    const f=inp.files[0],drop=inp.closest('.file-drop');
    drop.classList.toggle('has-file',!!f);
    drop.querySelector('b').textContent=f?f.name:'Attach your CV';
    drop.querySelector('small').textContent=f?(f.size/1048576).toFixed(1)+' MB · click to change':'PDF or Word, up to 3 MB';
  }));
  function bindSiteForm(form){form.addEventListener('submit',async e=>{
    e.preventDefault();
    const status=form.querySelector('.f-status'),btn=form.querySelector('button[type=submit]');
    const set=(cls,html)=>{status.className='f-status '+cls;status.innerHTML=html};
    let bad=false;
    form.querySelectorAll('[required]').forEach(el=>{const v=el.value.trim();const inv=!v||(el.type==='email'&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v));el.classList.toggle('invalid',inv);if(inv)bad=true});
    if(bad){set('err','Please fill in the highlighted fields.');return}
    const data=Object.fromEntries([...new FormData(form)].filter(([k,v])=>typeof v==='string'));
    data.form=form.dataset.form;
    const file=form.querySelector('input[type=file]')?.files[0];
    if(file){
      if(file.size>3*1048576){set('err','Your CV is larger than 3 MB. Please attach a smaller file.');return}
      data.cv={name:file.name,type:file.type,content:await readFile(file)};
    }
    btn.disabled=true;set('','Sending…');
    try{
      const r=await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      if(!r.ok)throw new Error((await r.json().catch(()=>({}))).error||r.status);
      form.reset();form.querySelectorAll('.file-drop').forEach(d=>{d.classList.remove('has-file');d.querySelector('b').textContent='Attach your CV';d.querySelector('small').textContent='PDF or Word, up to 3 MB'});
      set('ok',form.dataset.form==='join'?'Thank you for applying. We will be in touch if there is a match.':'Thank you. We will be in touch shortly.');
    }catch(err){
      // email sending not set up yet (or failed): hand over to the visitor's mail app with everything prefilled
      const labels={name:'Name',role:'Role',company:'Company',email:'Email',phone:'Phone',reason:'Looking for',linkedin:'LinkedIn',interest:'Interested in',message:'Message'};
      const subject=(form.dataset.form==='join'?'Application from ':'Enquiry from ')+(data.name||'')+(data.company?' ('+data.company+')':'');
      const body=Object.entries(labels).filter(([k])=>data[k]).map(([k,l])=>l+': '+data[k]).join('\n')+(file?'\n\n(CV attached)':'');
      const href=`mailto:${FALLBACK}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      set('ok',`Almost done: your email app has opened with your details${file?'. Please attach your CV':''} and press send. If it did not open, email <a href="${href}">${FALLBACK}</a>.`);
      location.href=href;
    }finally{btn.disabled=false}
  })}
  window.bindSiteForm=bindSiteForm;
  document.querySelectorAll('.site-form').forEach(bindSiteForm);
})();

// how we work: animate visuals when the section scrolls into view
(function(){const h=document.querySelector('.how');if(!h)return;
  new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){h.classList.add('seen');o.disconnect()}},{threshold:.25}).observe(h)})();
(()=>{const o=document.querySelector('.outcomes-light');if(!o)return;new IntersectionObserver((e,ob)=>{if(e[0].isIntersecting){o.classList.add('seen');ob.disconnect()}},{threshold:.3}).observe(o)})();

// accordions: phases, industries, faq
// single-open: opening one item closes the others in the same group
document.querySelectorAll('.phase,.ind').forEach(el=>el.addEventListener('click',()=>{
  const open=el.getAttribute('aria-expanded')!=='true';
  el.parentElement.querySelectorAll(':scope > .phase,:scope > .ind').forEach(o=>o.setAttribute('aria-expanded','false'));
  el.setAttribute('aria-expanded',open);
}));
document.querySelectorAll('.faq-q').forEach(q=>q.addEventListener('click',()=>{
  const item=q.parentElement,open=!item.classList.contains('open');
  document.querySelectorAll('.faq.open').forEach(f=>{f.classList.remove('open');f.querySelector('.faq-q').setAttribute('aria-expanded','false')});
  if(open){item.classList.add('open');q.setAttribute('aria-expanded','true')}
}));

// testimonials: same endless carousel with prev / pause / next
document.getElementById('tTrack')&&endlessScroller(document.getElementById('tTrack'),{speed:.35,pauseBtn:document.getElementById('tPause'),prev:document.querySelector('[data-t="-1"]'),next:document.querySelector('[data-t="1"]')});

// interactive background: dot field that drifts and lights up around the cursor
(function(){
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fields=[];
  document.querySelectorAll('[data-bg]').forEach(sec=>{
    const c=document.createElement('canvas');c.className='bg-canvas';sec.prepend(c);
    const f={sec,c,ctx:c.getContext('2d'),w:0,h:0,mx:-9999,my:-9999,tx:-9999,ty:-9999,visible:false};
    sec.addEventListener('pointermove',e=>{const r=sec.getBoundingClientRect();f.tx=e.clientX-r.left;f.ty=e.clientY-r.top});
    sec.addEventListener('pointerleave',()=>{f.tx=-9999;f.ty=-9999});
    new IntersectionObserver(en=>{f.visible=en[0].isIntersecting;if(reduce&&f.visible)draw(f,0)}).observe(sec);
    fields.push(f);
  });
  function size(f){
    const dpr=Math.min(devicePixelRatio||1,2),r=f.sec.getBoundingClientRect();
    if(r.width===f.w&&r.height===f.h)return;
    f.w=r.width;f.h=r.height;f.c.width=f.w*dpr;f.c.height=f.h*dpr;f.ctx.setTransform(dpr,0,0,dpr,0,0);
  }
  // BG_STYLE: 'lines' (flowing contour lines) or 'dots' (previous dot field)
  const BG_STYLE='dots';
  const GAP=30,R=170;
  function drawDots(f,t){
    const {ctx,w,h}=f;
    for(let y=GAP/2;y<h;y+=GAP){
      for(let x=GAP/2;x<w;x+=GAP){
        const wave=Math.sin(x*.012+t*.0006)+Math.cos(y*.016-t*.0005);
        let px=x+Math.sin(y*.02+t*.0004)*3,py=y+Math.cos(x*.02+t*.0004)*3;
        const dx=px-f.mx,dy=py-f.my,d=Math.hypot(dx,dy);
        let a=.07+(wave+2)*.035,rad=1,near=0;
        if(d<R){near=1-d/R;const push=near*near*14;px+=dx/(d||1)*push;py+=dy/(d||1)*push;a+=near*.75;rad+=near*1.3}
        ctx.fillStyle=near>.02?`rgba(120,230,182,${a})`:`rgba(255,255,255,${a})`;
        ctx.beginPath();ctx.arc(px,py,rad,0,6.283);ctx.fill();
      }
    }
  }
  // flowing contour lines: slow waves, lines part around the cursor and glow mint
  const LINE_GAP=22,STEP=14,LR=190;
  function drawLines(f,t){
    const {ctx,w,h}=f,path=new Path2D(),near=f.mx>-1000;
    for(let i=0,y0=-LINE_GAP;y0<h+LINE_GAP;i++,y0+=LINE_GAP){
      for(let x=0;x<=w+STEP;x+=STEP){
        let y=y0+Math.sin(x*.004+t*.00035+i*.35)*14+Math.sin(x*.011-t*.0005+i*.9)*5;
        if(near){const dx=x-f.mx,dy=y-f.my,d=Math.hypot(dx,dy);if(d<LR){const k=1-d/LR;y+=dy/(d+18)*k*k*34}}
        x?path.lineTo(x,y):path.moveTo(x,y);
      }
    }
    ctx.lineWidth=1;
    const base=ctx.createLinearGradient(0,0,0,h);
    base.addColorStop(0,'rgba(255,255,255,.035)');base.addColorStop(1,'rgba(255,255,255,.085)');
    ctx.strokeStyle=base;ctx.stroke(path);
    if(near){
      const g=ctx.createRadialGradient(f.mx,f.my,0,f.mx,f.my,LR);
      g.addColorStop(0,'rgba(120,230,182,.75)');g.addColorStop(1,'rgba(120,230,182,0)');
      ctx.strokeStyle=g;ctx.stroke(path);
    }
  }
  function draw(f,t){
    size(f);const {ctx,w,h}=f;if(!w||!h)return;
    f.mx+=(f.tx-f.mx)*.1;f.my+=(f.ty-f.my)*.1;
    if(f.tx<-1000){f.mx=f.tx;f.my=f.ty}
    ctx.clearRect(0,0,w,h);
    BG_STYLE==='dots'?drawDots(f,t):drawLines(f,t);
  }
  function loop(t){fields.forEach(f=>{if(f.visible&&f.sec.offsetParent!==null)draw(f,t)});if(!reduce)requestAnimationFrame(loop)}
  addEventListener('resize',()=>fields.forEach(f=>{f.w=0}));
  addEventListener('hashchange',()=>setTimeout(()=>fields.forEach(f=>{f.w=0;if(reduce)draw(f,0)}),50));
  requestAnimationFrame(loop);
})();

// tab routing
const PAGES=['home','case-studies','case','team','media','hire','join','book'];
let currentPage=null;
function route(){
  let [pg,sub]=location.hash.slice(1).split('/');
  if(pg==='advisors')pg='team';
  const isCase=pg==='film'||pg==='case';
  const id=isCase?'case':PAGES.includes(pg)?pg:'home';
  if(isCase&&!renderCase(sub,pg==='film'))return;
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('active',p.id==='page-'+id));
  document.querySelectorAll('header a[data-link]').forEach(a=>a.classList.toggle('active',a.dataset.link===(isCase?'case-studies':id)));
  closeModal();
  if(id==='case-studies'){
    // #case-studies/<industry>; legacy #case-studies/<problem>/<industry> and #case-studies/workflow/... fall back gracefully.
    const parts=location.hash.slice(1).split('/');
    const legacyInd={sales:'any'};
    const pick=parts.slice(1).map(x=>legacyInd[x]||x).reverse().find(x=>VAULT_INDUSTRIES.some(i=>i.id===x));
    csInd=pick||'all';
    renderCases();
  }
  if(!isCase)setMeta(id);
  const key=isCase?location.hash:id;
  if(currentPage!==key)window.scrollTo(0,0);
  currentPage=key;
}
const META={
  home:['Innate AI | AI that actually changes your business','London AI consultancy. We find where AI pays back in your business, then build it into the tools your team already uses.'],
  'case-studies':['Case studies | Innate AI','Real AI systems built for luxury retail, beauty, construction, real estate and financial services, with the results each one delivered.'],
  team:['Team and partners | Innate AI','Strategy, delivery and engineering from McKinsey, Deloitte, Capgemini Invent, Imperial and Siemens, plus our own AI development team.'],
  media:['Podcast and video | Innate AI','The Innate AI podcast and one-minute clips on where AI actually pays back inside real businesses.'],
  hire:['Free AI scorecard | Innate AI','Nine questions, two minutes. Score your Opportunity, Readiness and Momentum, and get a recommended next step.'],
  join:['Careers | Innate AI','Open roles at Innate AI: AI Developer, AI Strategist, AI Strategy Manager and GTM Associate.'],
  book:['Book a call | Innate AI','25 minutes with our team. Tell us how your business runs and we will show you where AI fits.']};
function setMeta(id){
  const m=META[id]||META.home;
  document.title=m[0];
  const set=(sel,attr,v)=>{const el=document.querySelector(sel);if(el)el.setAttribute(attr,v)};
  set('meta[name="description"]','content',m[1]);
  set('meta[property="og:title"]','content',m[0]);
  set('meta[property="og:description"]','content',m[1]);
  set('meta[name="twitter:title"]','content',m[0]);
  set('meta[name="twitter:description"]','content',m[1]);
  set('meta[property="og:url"]','content','https://www.innateaiconsulting.com/#'+id);
  set('link[rel="canonical"]','href','https://www.innateaiconsulting.com/'+(id==='home'?'':'#'+id));
}
window.addEventListener('hashchange',route);
route();

(()=>{const groups=[['.ind-cards','.ind-card']];
if(!('IntersectionObserver' in window))return;
groups.forEach(([g,it])=>document.querySelectorAll(g).forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*.9)return;
el.classList.add('js-stagger');el.querySelectorAll(it).forEach((c,i)=>{c.classList.add('st-item');c.style.setProperty('--i',i)});
new IntersectionObserver((e,o)=>{if(e[0].isIntersecting){el.classList.add('st-in');o.disconnect()}},{rootMargin:'0px 0px -80px 0px'}).observe(el)}))})();

(()=>{const mk=(el,id,cls)=>{const f=document.createElement('iframe');f.className=cls;
  f.src='https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0';f.title='Innate AI video';
  f.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';f.allowFullscreen=true;el.replaceWith(f)};
const b=document.getElementById('vid-main');if(b)b.addEventListener('click',()=>mk(b,b.dataset.yt,'vid-frame'));
document.querySelectorAll('.reel').forEach(r=>r.addEventListener('click',()=>mk(r.querySelector('.reel-shot'),r.dataset.yt,'reel-frame')));})();

document.querySelectorAll('.sc-jump').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();
  const q=document.getElementById('quiz');if(!q)return;
  const y=q.getBoundingClientRect().top+scrollY-90;
  scrollTo({top:y,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'});
  const f=q.querySelector('.qz-opt');if(f)setTimeout(()=>f.focus({preventScroll:true}),400)}));

(()=>{const box=document.getElementById('hero-video');if(!box)return;
 if(matchMedia('(max-width:760px)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 if(navigator.connection&&navigator.connection.saveData)return;
 const load=()=>{const f=document.createElement('iframe');
  f.src='https://www.youtube-nocookie.com/embed/K2SlCB8htRU?autoplay=1&mute=1&loop=1&playlist=K2SlCB8htRU&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&start=45';
  f.title='';f.tabIndex=-1;f.setAttribute('aria-hidden','true');
  f.allow='autoplay; encrypted-media; picture-in-picture';
  box.appendChild(f);setTimeout(()=>box.classList.add('on'),900)};
 if(window.requestIdleCallback){requestIdleCallback(load,{timeout:2000})}else{setTimeout(load,1200)}})();

(()=>{const box=document.getElementById('mini-team');if(!box||typeof TEAM==='undefined')return;
  const ROLE={lis:'Founder Associate · GTM'};
  box.innerHTML=TEAM.filter(m=>m.id!=='joseph').map(m=>`<figure class="mini">
    <span class="mini-ph">${m.img?`<img src="img/team/${m.img.replace('.png','-sq.png')}" alt="${m.name}" loading="lazy" width="520" height="520">`:`<span class="person-mono">${m.name.split(' ').map(w=>w[0]).join('')}</span>`}</span>
    <figcaption><p class="mini-name">${m.name}</p><p class="mini-role">${ROLE[m.id]||m.role}</p></figcaption>
  </figure>`).join('')})();

(()=>{const rail=document.querySelector('.reels');if(!rail)return;
 const nav=document.querySelector('.reels-nav');
 const sync=()=>{if(nav)nav.hidden=rail.scrollWidth<=rail.clientWidth+8};
 document.querySelectorAll('[data-reel]').forEach(b=>b.addEventListener('click',()=>{
   const card=rail.querySelector('.reel');const step=card?card.getBoundingClientRect().width+26:300;
   rail.scrollBy({left:step*+b.dataset.reel,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth'})}));
 sync();addEventListener('resize',sync);new ResizeObserver(sync).observe(rail);})();
