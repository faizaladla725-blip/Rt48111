// RT48 Player untuk Vercel (JavaScript, bukan TypeScript)
const HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="referrer" content="no-referrer">
<meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
<title>RT48 Player</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:100%;height:100%;overflow:hidden;background:#000}
iframe{width:100%;height:100%;border:none;position:absolute;top:0;left:0}
.overlay{position:absolute;top:0;left:0;width:100%;height:100%;z-index:10;pointer-events:none}
</style>
<script>
document.addEventListener('contextmenu',function(e){e.preventDefault()});
document.addEventListener('keydown',function(e){
  if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='J'))||(e.ctrlKey&&e.key==='u'))e.preventDefault();
});
if(window.top!==window.self){try{document.domain=document.domain}catch(e){}}
</script>
</head>
<body>
<iframe id="ytplayer" src="https://www.youtube.com/embed/{{VIDEO_ID}}?autoplay=1&mute=1&rel=0&modestbranding=1&showinfo=0&fs=1&playsinline=1&enablejsapi=0&controls=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="eager"></iframe>
<div class="overlay"></div>
</body>
</html>`;

export default function handler(req, res) {
  const { id } = req.query;
  
  if (!id) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(400).send('<h1>Error: Video ID required</h1><p>Usage: ?id=YOUTUBE_VIDEO_ID</p>');
  }
  
  // Validasi YouTube ID (11 karakter)
  if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) {
    res.setHeader('Content-Type', 'text/html');
    return res.status(400).send('<h1>Error: Invalid YouTube ID</h1>');
  }
  
  const html = HTML_TEMPLATE.replace('{{VIDEO_ID}}', id);
  
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.send(html);
}
