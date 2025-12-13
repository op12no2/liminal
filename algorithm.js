function algRandom(lastNode, lastNote) {
  queued[0] = null;
  const r = Math.max(1, Math.round(2.0 * nodes.length * selectedStrength/100));
  let minDist = 1000000;
  for(let i=0; i < r; i++) {
    const node = nodes[Math.floor(Math.random() * nodes.length)];
    if (node == lastNode || node == queued[0])
      continue;
    const dist = nodeDist(lastNode, node);
    if (dist < minDist) {
      minDist = dist;
      queued[0] = node;
    }
  }
  if (queued[0] == null)
    queued[0] = lastNode;
  queueSize = 1;
}

function algNear(lastNode, lastNote) {
  algRandom(lastNode, lastNote);
}

function algApply (node, note) {

  queueSize = 0;

  switch (selectedAlg) { 
    case ALG_RANDOM:
      algRandom(node, note);
      break;
    case ALG_NEAREST:
      algNear(node, note);
      break;  
    default:
      console.log('no algorithm', selectedAlg);
      break;  
  }
}
