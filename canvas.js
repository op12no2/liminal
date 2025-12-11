

function primaryModifier(e) {
  return e.ctrlKey || e.metaKey;
}

function resizeCanvas() {

  const dpr     = window.devicePixelRatio || 1;
  const rect    = canvas.getBoundingClientRect();
  canvas.width  = Math.round(rect.width  * dpr);
  canvas.height = Math.round(rect.height * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  redrawCanvas();

}

function redrawCanvas() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  for (const node of nodes) {

    ctx.translate(node.x, node.y);

    const lw         = 2;
    const r          = node.size;
    const isSelected = (node == selectedNode) | 0;
    const isFilled   = node.gated | 0;
    const color      = node.leadin ? themeLeadin : node.color;

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);

    if (isFilled) {
      ctx.fillStyle = color;
      ctx.fill();
    }

    ctx.lineWidth   = lw;
    ctx.strokeStyle = color;
    ctx.stroke();

    if (isSelected) {
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#555';
      ctx.fill();
    }
    ctx.translate(-node.x, -node.y);
  }

  ctx.restore();

}

function dblclickCanvas (e) {

  const rect = canvas.getBoundingClientRect();
  const x    = Math.max(0, e.clientX - rect.left);
  const y    = Math.max(0, e.clientY - rect.top);

  pointerdownNode = findNode(x,y);
  pointerdownX    = x;
  pointerdownY    = y;

  if (pointerdownNode) {
    selectedNode = pointerdownNode;
    selectedNode.leadin = selectedNode.leadin ? false : true;
    redrawCanvas();
    redrawInspectorNode();
  }

  pointerdownNode = null;
  pointerdownX    = 0;
  pointerdownY    = 0;

  pointerupNode = null;
  pointerupX    = 0;
  pointerupY    = 0;


}

function pointerdownCanvas (e) {

  const rect = canvas.getBoundingClientRect();
  const x    = Math.max(0, e.clientX - rect.left);
  const y    = Math.max(0, e.clientY - rect.top);

  pointerdownNode = findNode(x,y);
  pointerdownX    = x;
  pointerdownY    = y;

  if (!pointerdownNode && primaryModifier(e)) {
    selectedNode = createNode(x, y);
    redrawCanvas();
    redrawInspectorNode();
    //console.log(JSON.stringify(selectedNode, null, 2));
  }
  else if (pointerdownNode) {
    selectedNode = pointerdownNode;
    redrawCanvas();
    redrawInspectorNode();
    //  (JSON.stringify(selectedNode, null, 2));
  }
  else if (!pointerdownNode && selectedNode) {
    selectedNode = null;
    redrawCanvas();
    redrawInspectorNode();
  }

  pointerupNode = null;
  pointerupX    = 0;
  pointerupY    = 0;

}

function pointerupCanvas (e) {

  const rect = canvas.getBoundingClientRect();
  const x    = Math.max(0, e.clientX - rect.left);
  const y    = Math.max(0, e.clientY - rect.top);

  pointerupNode = findNode(x,y);
  pointerupX    = x;
  pointerupY    = x;

  pointerdownNode = null;
  pointerdownX    = 0;
  pointerdownY    = 0;

}

function pointermoveCanvas (e) {

  const rect = canvas.getBoundingClientRect();
  const x    = Math.max(0, e.clientX - rect.left);
  const y    = Math.max(0, e.clientY - rect.top);

  pointermoveX = x;
  pointermoveY = y;

  if (pointerdownNode) {
    pointerdownNode.x = x;
    pointerdownNode.y = y;
    redrawCanvas();
  }

}
