import os,re,sys,json,subprocess,urllib.request
S=sys.argv[1]; KEY=os.environ['XI']; VOICE=os.environ.get('VOICE','pFZP5JQG7iQjIQuC4Bku')
def tts(text,out):
    req=urllib.request.Request(f'https://api.elevenlabs.io/v1/text-to-speech/{VOICE}?output_format=mp3_44100_192',
      data=json.dumps({'text':text,'model_id':'eleven_multilingual_v2','voice_settings':{'stability':0.5,'similarity_boost':0.8,'style':0.15,'use_speaker_boost':True}}).encode(),
      headers={'xi-api-key':KEY,'Content-Type':'application/json'})
    open(out,'wb').write(urllib.request.urlopen(req,timeout=120).read())
def dur(f): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
def ts(t): m,s=t.split(':'); return int(m)*60+int(s)
for film in ['fact-find-writer','client-intelligence','enquiry','proposal']:
    d=f'{S}/audio/{film}'; os.makedirs(d,exist_ok=True); lines=[]
    for row in open(f'{S}/pack2/{film}.md'):
        c=[x.strip() for x in row.strip().strip('|').split('|')]
        if len(c)<3 or not re.match(r'\d:\d\d',c[0]): continue
        q=re.findall(r'"([^"]+)"',c[-1])
        if q: lines.append((ts(c[0].split('-')[0]),' '.join(q)))
    meta=[]
    for i,(t,text) in enumerate(lines):
        f=f'{d}/line{i+1:02d}.mp3'
        if not os.path.exists(f): tts(text,f)
        meta.append({'file':os.path.basename(f),'start':t,'dur':round(dur(f),2),'text':text})
    json.dump(meta,open(f'{d}/lines.json','w'),indent=1)
    # full VO track: each line placed at its scripted start (or after previous line + 0.4s if it would overlap)
    cur=0; parts=[]; inputs=[]
    for i,m in enumerate(meta):
        st=max(m['start'],cur+0.4 if i else m['start']); m['placed']=round(st,2); cur=st+m['dur']
        inputs+=['-i',f"{d}/{m['file']}"]; parts.append(f'[{i}]adelay={int(st*1000)}|{int(st*1000)}[a{i}]')
    fc=';'.join(parts)+';'+''.join(f'[a{i}]' for i in range(len(meta)))+f'amix=inputs={len(meta)}:normalize=0,apad=whole_dur=75[o]'
    subprocess.run(['ffmpeg','-y','-v','error',*inputs,'-filter_complex',fc,'-map','[o]','-t','75','-b:a','192k',f'{d}/{film}-vo-full.mp3'],check=True)
    json.dump(meta,open(f'{d}/lines.json','w'),indent=1)
    print(film, [(m['placed'],m['dur']) for m in meta], 'end', round(cur,1))
