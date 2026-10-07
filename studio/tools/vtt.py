import json,re,sys
# Same chunking as the burned-in subtitles in kit/Film.tsx
def chunks(l):
    parts=re.split(r'(?<=[.?!])\s+',l['text']); out=[]
    for p in parts: out+= re.split(r'(?<=[,:])\s+',p) if len(p)>64 else [p]
    m=[]
    for p in out:
        if m and len(m[-1])+len(p)<44: m[-1]+=' '+p
        else: m.append(p)
    tot=sum(len(p) for p in m); t=l['placed']; r=[]
    for p in m:
        d=len(p)/tot*l['dur']; r.append((t,t+d,p)); t+=d
    return r
def ts(x): return f"{int(x//3600):02d}:{int(x%3600//60):02d}:{x%60:06.3f}"
src,dst=sys.argv[1],sys.argv[2]
cues=[c for l in json.load(open(src)) for c in chunks(l)]
open(dst,'w').write('WEBVTT\n\n'+'\n'.join(f"{i+1}\n{ts(a)} --> {ts(min(b+0.25, cues[i+1][0]) if i+1<len(cues) else b+0.25)}\n{t}\n" for i,(a,b,t) in enumerate(cues)))
