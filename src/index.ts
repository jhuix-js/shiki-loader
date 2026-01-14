import * as shiki from './loader.js';

export default shiki;

if (typeof window !== 'undefined' && window && !('Shiki' in window)) {
  // @ts-ignore
  window['Shiki'] = shiki;
}
