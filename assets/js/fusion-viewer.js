// Chain B (the fused binder) residue segments, from the actual AF2-Multimer complex:
// 1-98 = Binder A (LATS2 kinase-domain binder), 99-138 = EAAAK x8 rigid linker, 139-283 = Binder B (LATS1-selective binder)
var FUSION_COLORS = {
  kinase: 0x3f7a52,
  binderA: 0x1f6fb0,
  linker: 0xf0c419,
  binderB: 0xc2255c
};

function initFusionViewer() {
  var el = document.getElementById('fusion-viewer');
  if (!el || typeof $3Dmol === 'undefined' || !window.LATS1_FUSION_PDB) return;

  var viewer = $3Dmol.createViewer(el, { backgroundColor: '#f6f7f9', backgroundAlpha: 1 });
  viewer.addModel(window.LATS1_FUSION_PDB, 'pdb');

  viewer.setStyle({ chain: 'A' }, { cartoon: { color: FUSION_COLORS.kinase, thickness: 0.4, opacity: 0.85 } });
  viewer.setStyle({ chain: 'B', resi: '1-98' }, { cartoon: { color: FUSION_COLORS.binderA, thickness: 0.5, arrows: true } });
  viewer.setStyle({ chain: 'B', resi: '99-138' }, { cartoon: { color: FUSION_COLORS.linker, thickness: 0.12 }, stick: { radius: 0.18, color: FUSION_COLORS.linker } });
  viewer.setStyle({ chain: 'B', resi: '139-283' }, { cartoon: { color: FUSION_COLORS.binderB, thickness: 0.5, arrows: true } });

  viewer.zoomTo();
  viewer.zoom(0.85);
  viewer.render();
  viewer.spin('y', 0.4);

  el.addEventListener('mousedown', function () { viewer.spin(false); });
  el.addEventListener('touchstart', function () { viewer.spin(false); });
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(initFusionViewer, 0);
} else {
  document.addEventListener('DOMContentLoaded', initFusionViewer);
}
