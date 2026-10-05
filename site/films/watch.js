const id=new URLSearchParams(location.search).get('product');
const film=PRODUCT_FILMS.find(f=>f.id===id);
if(!film){document.querySelector('#headline').textContent='Choose a film from the vault.';document.querySelector('#video').hidden=true;document.querySelector('.below').hidden=true;}
else if(!film.ready){location.replace('/films/review.html#'+encodeURIComponent(film.id));}
else{document.title=film.title+' | Innate AI';document.querySelector('#name').textContent=film.title+' · Product film';document.querySelector('#headline').textContent=film.headline;document.querySelector('#intro').textContent=film.paragraphs[0];document.querySelector('#outcome').textContent=film.paragraphs[3];document.querySelector('#try').href=film.tool;const video=document.querySelector('#video');video.poster=film.poster;video.src=film.video||'/films/'+encodeURIComponent(film.id)+'.mp4';video.setAttribute('aria-label',film.title+' product film');}
