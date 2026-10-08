# Build each film's VO from the picked takes, place lines at their scripted times, mix under a quiet music bed.
import json,re,os,subprocess,sys
S=sys.argv[1]; PICKS=json.loads(sys.argv[2]); MUSIC=sys.argv[3]; only=sys.argv[4:] or None
def dur(f): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
def lufs(f):
    o=subprocess.run(['ffmpeg','-i',f,'-af','ebur128','-f','null','-'],capture_output=True,text=True).stderr
    return float(re.findall(r'I:\s+(-?[\d.]+) LUFS',o)[-1])
def ts(t): m,s=t.split(':'); return int(m)*60+int(s)
for film,picks in PICKS.items():
    if only and film not in only: continue
    starts,texts=[],[]
    for row in open(f'{S}/pack2/{film}.md'):
        c=[x.strip() for x in row.strip().strip('|').split('|')]
        if len(c)<3 or not re.match(r'\d:\d\d',c[0]): continue
        q=re.findall(r'"([^"]+)"',c[-1])
        if q: starts.append(ts(c[0].split('-')[0])); texts.append(' '.join(q))
    out=f'{S}/final-audio/{film}'; os.makedirs(out,exist_ok=True)
    meta=[]; cur=0
    for i,(st,tx) in enumerate(zip(starts,texts)):
        f=picks[i] if '/' in picks[i] else f'{S}/takes/{film}/l{i+1:02d}-{picks[i]}.mp3'
        d=dur(f); p=max(st,cur+0.45) if i else st; cur=p+d
        meta.append({'file':f,'start':st,'placed':round(p,2),'dur':round(d,2),'text':tx})
    ins=sum((['-i',m['file']] for m in meta),[])
    fc=';'.join(f'[{i}]adelay={int(m["placed"]*1000)}:all=1[a{i}]' for i,m in enumerate(meta))
    fc+=';'+''.join(f'[a{i}]' for i in range(len(meta)))+f'amix=inputs={len(meta)}:normalize=0,apad=whole_dur=75[o]'
    subprocess.run(['ffmpeg','-y','-v','error',*ins,'-filter_complex',fc,'-map','[o]','-t','75','-ar','48000','-c:a','pcm_s16le',f'{out}/vo.wav'],check=True)
    # two-step: VO to -16 LUFS, music to -36 LUFS (very quiet), gentle duck, fades, peak limit
    subprocess.run(['ffmpeg','-y','-v','error','-i',f'{out}/vo.wav','-i',MUSIC,'-filter_complex',
      f'[0]volume={-16-lufs(out+"/vo.wav"):.2f}dB,asplit=2[vo][sc];'
      f'[1]volume={-36-lufs(MUSIC):.2f}dB,afade=t=in:d=2,afade=t=out:st=71.5:d=3.5[m];'
      '[m][sc]sidechaincompress=threshold=0.05:ratio=3:attack=120:release=900[md];'
      '[vo][md]amix=inputs=2:normalize=0,alimiter=limit=0.7:level=false[o]',
      '-map','[o]','-t','75','-ar','48000','-b:a','192k',f'{out}/{film}.mp3'],check=True)
    json.dump([{k:m[k] for k in ('start','placed','dur','text')} for m in meta],open(f'{out}/lines.json','w'),indent=1)
    print(film,[(m['placed'],m['dur']) for m in meta])
