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

function drawArrow(fromX, fromY, toX, toY, color) {
  // Draw line
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.strokeStyle = color;
  ctx.stroke();
  
  // Arrow head at 1/3 distance
  const dx = toX - fromX;
  const dy = toY - fromY;
  const arrowX = fromX + dx * 0.5;
  const arrowY = fromY + dy * 0.5;
  
  // Perpendicular for arrow wings
  const angle = Math.atan2(dy, dx);
  const arrowSize = 6;
  const arrowAngle = Math.PI / 6; // 30 degrees
  
  ctx.beginPath();
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(
    arrowX - arrowSize * Math.cos(angle - arrowAngle),
    arrowY - arrowSize * Math.sin(angle - arrowAngle)
  );
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(
    arrowX - arrowSize * Math.cos(angle + arrowAngle),
    arrowY - arrowSize * Math.sin(angle + arrowAngle)
  );
  ctx.stroke();
}

function redrawCanvas() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const node of nodes) {

    const color = node.leadin ? themeLeadin : node.color;

    // Draw node circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Draw gate dot
    if (node.gated) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ccc';
      ctx.fill();
    }

    // Draw links
    for (const link of node.links) {
      drawArrow(node.x, node.y, link.x, link.y, color);
    }

    // Draw selection ring on top
    if (selectedNode) {
      ctx.beginPath();
      ctx.arc(selectedNode.x, selectedNode.y, selectedNode.size, 0, Math.PI * 2);
      ctx.lineWidth   = 1;
      ctx.strokeStyle = '#999';
      ctx.stroke();
    }
  }  
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
  pointerdownPri  = primaryModifier(e);

  if (!pointerdownNode && pointerdownPri) { // create node
    selectedNode = createNode(x, y);
    redrawCanvas();
    redrawInspectorNode();
    //console.log(JSON.stringify(selectedNode, null, 2));
  }
  else if (pointerdownNode) { // select node
    selectedNode = pointerdownNode;
    redrawCanvas();
    redrawInspectorNode();
    //  (JSON.stringify(selectedNode, null, 2));
  }
  else if (!pointerdownNode && selectedNode) { // clear selection
    selectedNode = null;
    redrawCanvas();
    redrawInspectorSettings();
  }

  pointerupNode  = null;
  pointerupX     = 0;
  pointerupY     = 0;
  pointerupPri   = false;

}

function pointerupCanvas (e) {

  const rect = canvas.getBoundingClientRect();
  const x    = Math.max(0, e.clientX - rect.left);
  const y    = Math.max(0, e.clientY - rect.top);

  pointerupNode = findNode(x,y);
  pointerupX    = x;
  pointerupY    = y;
  pointerupPri  = primaryModifier(e);

  if (pointerdownNode && pointerdownPri && pointerupNode && pointerupPri && pointerdownNode != pointerupNode && !pointerdownNode.links.includes(pointerupNode)) {
    pointerdownNode.links.push(pointerupNode);
    redrawCanvas();
  }

  pointerdownNode = null;
  pointerdownX    = 0;
  pointerdownY    = 0;
  pointerdownPri  = false;
}

function pointermoveCanvas (e) {

  const rect = canvas.getBoundingClientRect();
  const x    = Math.max(0, e.clientX - rect.left);
  const y    = Math.max(0, e.clientY - rect.top);

  pointermoveX = x;
  pointermoveY = y;

  if (pointerdownNode && !pointerdownPri && !primaryModifier(e)) { // drag node
    pointerdownNode.x = x;
    pointerdownNode.y = y;
    redrawCanvas();
  }

}
