function createNode (x, y) {

  const node = new Node();

  nodes.push(node);

  if (selectedNode) {
    const {x, y, links, ...rest} = selectedNode;
    Object.assign(node, rest);
  }
  else {
    Object.assign(node, defNode);
  }

  node.x     = x;
  node.y     = y;
  node.links = [];
  
  return node;

}

function findNode(x, y) {

  let closest    = null;
  let bestDistSq = Infinity;
  let slop       = 2;

  for (const node of nodes) {
    const dx = x - node.x;
    const dy = y - node.y;

    const r = node.size + slop;
    const distSq = dx * dx + dy * dy;

    if (distSq <= r * r && distSq < bestDistSq) {
      bestDistSq = distSq;
      closest = node;
    }
  }

  return closest;

}

function performNode (now, node, note) {

  if (!node)
    console.log('performNode, no node');

  const duration = 60/selectedBpm * node.dur;

  note.startAt   = now;
  note.finishAt  = now + duration * node.artic;
  note.restUntil = now + duration;
  note.pitch     = quantiseLUT[selectedKey][selectedScale][adjust(node.pitch, node.pitchvar + selectedSpread, 0, 127)];
  note.vel       = adjust(node.vel, node.velvar + selectedDynamics, 0, 127);
  note.chan      = node.chan;

}

function nodeDist (n1, n2) {
  const x = n1.x - n2.x;
  const y = n1.y - n2.y;
  //return Math.sqrt(x * x + y * y);
  return x * x + y * y;
}
