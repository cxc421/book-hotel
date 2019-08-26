let loadingMask = null;
let enableDoneTransition = false;
let startKey = null;

function createMaek() {
  const loadingMask = document.createElement('div');
  loadingMask.id = 'loading-mask';
  loadingMask.style.position = 'fixed';
  loadingMask.style.zIndex = '999999';
  loadingMask.style.top = '0px';
  loadingMask.style.left = '0px';
  loadingMask.style.right = '0px';
  loadingMask.style.bottom = '0px';
  loadingMask.style.background = 'rgba(56, 71, 11, 0.8)';
  loadingMask.style.opacity = '0';  
  loadingMask.style.transition = 'opacity 200ms';
  loadingMask.style.display = 'flex';
  loadingMask.style.justifyContent = 'center';  

  const loader = document.createElement('div');
  loader.className = 'loader';
  loader.textContent = 'Loading...';
  loader.style.top = '40%';

  loadingMask.append(loader);
  document.body.append(loadingMask);  
  return loadingMask;
}

function start() {  
  if (!loadingMask) {
    loadingMask = createMaek();
  }

  loadingMask.addEventListener('transitionstart', () => {
    enableDoneTransition = true;
  });

  clearTimeout(startKey);

  startKey = setTimeout(() => {    
    loadingMask.style.transitionDelay = '0ms';
    loadingMask.style.transitionDuration = '300ms';
    loadingMask.style.opacity = '1';    
    enableDoneTransition = false;
  }, 0);
}

function done() {
  if (!loadingMask) return;

  if (!enableDoneTransition) {
    loadingMask.remove();
    loadingMask = null;
    return;    
  }

  loadingMask.addEventListener('transitionend', () => {
    loadingMask.remove();
    loadingMask = null;
  });

  loadingMask.style.transitionDelay = '0ms';
  loadingMask.style.transitionDuration = '200ms';
  loadingMask.style.opacity = '0';  
}

export default {
  start,
  done
};