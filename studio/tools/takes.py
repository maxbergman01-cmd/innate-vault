# Three takes per VO line in Joseph's clone, for picking by ear.
#  A: multilingual v2, high stability, no style exaggeration, with surrounding text for natural prosody
#  B: same model, a little more expressive, different seed
#  C: eleven_v3 (newer model, different delivery)
import os,re,sys,json,urllib.request,concurrent.futures as cf
S=sys.argv[1]; KEY=os.environ['XI']; VOICE='2RYMxgnxJwtEU7pYY8Ah'
def tts(body,out):
    if os.path.exists(out) and os.path.getsize(out)>1000: return
    req=urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_192',data=json.dumps(body).encode(),headers={'xi-api-key':KEY,'Content-Type':'application/json'})
    for i in range(4):
        try: data=urllib.request.urlopen(req,timeout=180).read(); open(out,'wb').write(data); return
        except urllib.error.HTTPError as e:
            if e.code==429: import time; time.sleep(3*(i+1)); continue
            raise RuntimeError(f'{out}: {e.code} {e.read()[:300]}')
jobs=[]; manifest={}
for film in (sys.argv[2:] or ['fact-find-writer','client-intelligence','enquiry','proposal']):
    lines=[]
    for row in open(f'{S}/pack2/{film}.md'):
        c=[x.strip() for x in row.strip().strip('|').split('|')]
        if len(c)<3 or not re.match(r'\d:\d\d',c[0]): continue
        q=re.findall(r'"([^"]+)"',c[-1])
        if q: lines.append(' '.join(q))
    d=f'{S}/takes/{film}'; os.makedirs(d,exist_ok=True); manifest[film]=lines
    for i,t in enumerate(lines):
        prev=' '.join(lines[max(0,i-1):i]); nxt=' '.join(lines[i+1:i+2])
        jobs.append(({'text':t,'model_id':'eleven_multilingual_v2','seed':101,'previous_text':prev,'next_text':nxt,
                      'voice_settings':{'stability':0.72,'similarity_boost':0.85,'style':0.0,'use_speaker_boost':True}},f'{d}/l{i+1:02d}-A.mp3'))
        jobs.append(({'text':t,'model_id':'eleven_multilingual_v2','seed':202,'previous_text':prev,'next_text':nxt,
                      'voice_settings':{'stability':0.55,'similarity_boost':0.85,'style':0.05,'use_speaker_boost':True}},f'{d}/l{i+1:02d}-B.mp3'))
        jobs.append(({'text':t,'model_id':'eleven_v3','seed':303,'voice_settings':{'stability':0.5,'similarity_boost':0.85}},f'{d}/l{i+1:02d}-C.mp3'))
json.dump(manifest,open(f'{S}/takes/manifest-'+'-'.join(manifest)+'.json','w'),indent=1)
errs=[]
with cf.ThreadPoolExecutor(2) as ex:
    for f in cf.as_completed([ex.submit(tts,b,o) for b,o in jobs]):
        try: f.result()
        except Exception as e: errs.append(str(e))
print(len(jobs),'jobs',len(errs),'errors'); print('\n'.join(errs[:5]))
