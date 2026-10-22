let controller;
const status = document.getElementById('status');
async function showAd(type, onSuccess) {
  if (!window.Adsun) { status.textContent='SDK unavailable. Check the network and reload.'; return; }
  const blockId=document.getElementById('block').value.trim();
  if (!blockId) {status.textContent='Enter your public block ID.'; return;}
  const button=document.getElementById('watch'); button.disabled=true;
  status.textContent='Loading debug ad…';
  try {
    controller?.destroy();
    controller=window.Adsun.init({blockId,debug:true,debugConsole:true,debugBannerType:type});
    await controller.show(); status.textContent='Debug ad completed.'; onSuccess?.();
  } catch(error) {status.textContent='No reward: '+(error?.description || error?.message || 'Ad unavailable');}
  finally {button.disabled=false;}
}
document.getElementById('watch').onclick=()=>showAd('RewardedVideo');
