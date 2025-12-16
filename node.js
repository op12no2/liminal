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

function findNode(x, y, slop=2) {

  let closest    = null;
  let bestDistSq = Infinity;

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
    ('performNode, no node');

  const duration = 60/selectedBpm * node.dur;

  note.startAt   = now;
  note.finishAt  = now + duration * node.artic;
  note.restUntil = now + duration;
  note.pitch     = quantiseLUT[selectedKey][selectedScale][adjust(node.pitch, node.pitchvar + selectedSpread, 0, 127)];
  note.vel       = adjust(node.vel, node.velvar + selectedDynamics, 0, 127);
  note.chan      = node.chan;

}

function deleteNode(node) {
  
  // Remove this node from any other node's links
  for (const n of nodes) {
    const index = n.links.indexOf(node);
    if (index !== -1) {
      n.links.splice(index, 1);
    }
  }
  
  // Remove the node itself from the nodes array
  const nodeIndex = nodes.indexOf(node);
  if (nodeIndex !== -1) {
    nodes.splice(nodeIndex, 1);
  }
}

