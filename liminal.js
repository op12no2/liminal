
/*{{{  constants*/

/*{{{  scales*/

const scaleSpecs = [
  { name: "chromatic", notes: [0,1,2,3,4,5,6,7,8,9,10,11] },
  { name: "major", notes: [0,2,4,5,7,9,11] },
  { name: "minor", notes: [0,2,3,5,7,8,10] },
  { name: "harmonicMinor", notes: [0,2,3,5,7,8,11] },
  { name: "melodicMinor", notes: [0,2,3,5,7,9,11] },
  { name: "majorPentatonic", notes: [0,2,4,7,9] },
  { name: "minorPentatonic", notes: [0,3,5,7,10] },
  { name: "dorian", notes: [0,2,3,5,7,9,10] },
  { name: "phrygian", notes: [0,1,3,5,7,8,10] },
  { name: "lydian", notes: [0,2,4,6,7,9,11] },
  { name: "mixolydian", notes: [0,2,4,5,7,9,10] },
  { name: "locrian", notes: [0,1,3,5,6,8,10] },
  { name: "wholeTone", notes: [0,2,4,6,8,10] },
  { name: "diminished", notes: [0,2,3,5,6,8,9,11] },
  { name: "blues", notes: [0,3,5,6,7,10] },
  { name: "bebopMajor", notes: [0,2,4,5,7,8,9,11] },
  { name: "bebopMinor", notes: [0,2,3,5,7,8,9,10,11] },
  { name: "bebopDominant", notes: [0,2,4,5,7,9,10,11] },
  { name: "bhairav", notes: [0,1,4,5,7,8,11] },
  { name: "kafi", notes: [0,2,3,5,7,9,10] },
  { name: "marwa", notes: [0,1,4,6,7,9,11] },
  { name: "hijaz", notes: [0,1,4,5,7,8,11] },
  { name: "bayati", notes: [0,1,3,5,7,8,10] },
  { name: "persian", notes: [0,1,4,5,6,8,11] },
  { name: "octatonic", notes: [0,1,3,4,6,7,9,10] },
  { name: "inSen", notes: [0,1,5,7,10] },
  { name: "hirajoshi", notes: [0,2,3,7,8] },
  { name: "iwato", notes: [0,1,5,6,10] },
  { name: "yo", notes: [0,2,5,7,9] },
  { name: "pelog", notes: [0,1,3,7,8] },
  { name: "slendro", notes: [0,2,5,7,10] },
  { name: "messiaen2", notes: [0,1,3,4,6,7,9,10] },
  { name: "enigmatic", notes: [0,1,4,6,8,10,11] },
  { name: "hungarianMinor", notes: [0,2,3,6,7,8,11] },
  { name: "kumoi", notes: [0,2,3,7,9] },
  { name: "akebono", notes: [0,2,3,7,10] },
  { name: "honKumoiJoshi", notes: [0,1,5,7,8] },
  { name: "messiaen3", notes: [0,2,3,4,6,7,8,10,11] },
  { name: "messiaen4", notes: [0,1,2,5,6,7,8,11] },
  { name: "messiaen5", notes: [0,1,5,6,7,11] },
  { name: "messiaen6", notes: [0,2,4,5,6,8,10,11] },
  { name: "messiaen7", notes: [0,1,2,3,5,6,7,8,9,11] },
  { name: "augmented", notes: [0,3,4,7,8,11] },
  { name: "prometheus", notes: [0,2,4,6,9,10] },
  { name: "tritone", notes: [0,1,4,6,7,10] },
  { name: "egyptian", notes: [0,2,5,7,10] },
  { name: "scriabin", notes: [0,1,4,7,9] }
];

/*}}}*/
/*{{{  note length*/

const lengthLabels = [
  '1/16',
  '1/16\u00B7',
  '1/8',
  '1/8\u00B7',
  '1/4',
  '1/4\u00B7',
  '1/2',
  '1/2\u00B7',
  '1',
  '1\u00B7',
  '2',
  '4',
  '8',
  '16',
  '32',
  '64'
];

const lengthValues = [
  0.25,
  0.25 + 0.125,
  0.5,
  0.75,
  1.0,
  1.5,
  2.0,
  3.0,
  4.0,
  6.0,
  8.0,
  16.0,
  32.0,
  64.0,
  128.0,
  256.0
];

/*}}}*/

const pitchLabels = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B'];
const articLabels = ['0.0', 'trig.', '0.2', 'stacc.', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', 'legato'];
const articValues = [ 0.0,   0.1,   0.2,   0.3,   0.4,   0.5,   0.6,   0.7,   0.8,   0.9,   1.0];

/*}}}*/

/*{{{  util*/

/*{{{  pitchToNote*/

function pitchToNote(pitch) {

  return pitch % 12;  // C based

}

/*}}}*/
/*{{{  pitchToOct*/

function pitchToOct(pitch) {

  return Math.max(0, Math.floor(pitch / 12) - 1);  // C4 = 60 = oct 4

}

/*}}}*/
/*{{{  octAndNoteToPitch*/

function octAndNoteToPitch(oct, note) {

  return (oct * 12) + note + 12;

}

/*}}}*/
/*{{{  adjust*/

function adjust(x, v, min, max) {

  const randomOffset = Math.floor(Math.random() * (2 * v + 1)) - v;
  const adjusted     = x + randomOffset;

  return Math.max(min, Math.min(max, adjusted));

}

/*}}}*/
/*{{{  thLight*/

function thLight(amount = 1.3) {

  color = theme;

  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  const nr = Math.min(255, Math.round(r * amount));
  const ng = Math.min(255, Math.round(g * amount));
  const nb = Math.min(255, Math.round(b * amount));

  return '#' + [nr, ng, nb].map(x => x.toString(16).padStart(2, '0')).join('');

}

/*}}}*/
/*{{{  status*/

function status(s) {
  setText('status-text', s);
}

/*}}}*/

/*}}}*/
/*{{{  nodes*/

/*{{{  Node*/

function Node() {

  this.x        = 0;
  this.y        = 0;
  this.pitch    = 0;    // midi value
  this.pitchvar = 0;    // +/- random semitones
  this.vel      = 0;    // midi value
  this.velvar   = 0;    // midi value
  this.length   = 0.0;  // fraction of 1/4 note relative to bpm
  this.artic    = 0.0;  // fraction of length to gate on
  this.chan     = 0;    // midi value
  this.size     = 0;
  this.color    = 0;
  this.gated    = 0;

}

/*}}}*/

const nodes   = [];
const defNode = new Node();

/*{{{  createNode*/

function createNode (x, y) {

  const node = new Node();

  nodes.push(node);

  Object.assign(node, defNode);

  node.x = x;
  node.y = y;

  return node;

}

/*}}}*/
/*{{{  findNode*/

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

/*}}}*/

/*}}}*/
/*{{{  dom*/

/*{{{  addClass*/

function addClass(id, className) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add(className);
}

/*}}}*/
/*{{{  removeClass*/

function removeClass(id, className) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove(className);
}

/*}}}*/
/*{{{  toggleClass*/

function toggleClass(id, className) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.toggle(className);
}

/*}}}*/
/*{{{  setText*/

function setText(id, text) {

  const el = document.getElementById(id);

  if (el) {
    el.textContent = text;
  }

}

/*}}}*/

/*}}}*/
/*{{{  inspector*/

/*{{{  redrawInspectorSettings*/

function redrawInspectorSettings() {

  const row1Container = document.getElementById('row1-container');
  const row2Container = document.getElementById('row2-container');
  const row3Container = document.getElementById('row3-container');

  setText('inspector-title', 'settings');

  row1Container.innerHTML = '';
  row2Container.innerHTML = '';
  row3Container.innerHTML = '';

  /*{{{  bpm*/
  
  const bpmKnob = new SynthKnob(row1Container, 'bpm-knob', {
    size: 80,
    label: 'BPM',
    indicatorColor: themeKnob,
    min: 40,
    max: 240,
    value: bpm,
    defaultValue: 120,
    onChange: (v) => { bpm = v; redrawCanvas(); }
  });
  
  /*}}}*/
  /*{{{  algorithm*/
  
  const algKnob = new SynthKnob(row1Container, 'alg-knob', {
    size: 80,
    label: 'ALG.',
    indicatorColor: themeKnob,
    min: 0,
    max: algLabels.length - 1,
    value: algorithm,
    defaultValue: ALG_RANDOM,
    stepLabels: algLabels,
    onChange: (v) => { algorithm = v; redrawCanvas(); }
  });
  
  /*}}}*/
  /*{{{  scale*/
  
  const scaleKnob = new SynthKnob(row2Container, 'scale-knob', {
    size: 120,
    label: 'SCALE',
    indicatorColor: themeKnob,
    min: 0,
    max: scaleLabels.length - 1,
    value: scaleNum,
    defaultValue: 26,
    stepLabels: scaleLabels,
    sensitivity: 0.4,
    onChange: (v) => { scaleNum = v; redrawCanvas(); }
  });
  
  /*}}}*/
  /*{{{  spread*/
  
  const spreadKnob = new SynthKnob(row3Container, 'spread-knob', {
    size: 80,
    label: 'SPREAD',
    indicatorColor: themeKnob,
    min: 0,
    max: 24,
    value: spread,
    defaultValue: 0,
    onChange: (v) => { spread = v; redrawCanvas(); }
  });
  
  /*}}}*/

}

/*}}}*/
/*{{{  redrawInspectorNode*/

function redrawInspectorNode() {

  const row1Container = document.getElementById('row1-container');
  const row2Container = document.getElementById('row2-container');
  const row3Container = document.getElementById('row3-container');

  setText('inspector-title', 'note');

  row1Container.innerHTML = '';
  row2Container.innerHTML = '';
  row3Container.innerHTML = '';

  const n = selectedNode;

  if (!n)
    return;

  /*{{{  pitch*/
  
  const pitchNoteKnob = new SynthKnob(row1Container, 'pitch-note-knob', {
    label: 'NOTE',
    indicatorColor: themeKnob,
    min: 0,
    max: 11,
    value: pitchToNote(n.pitch),
    defaultValue: pitchToNote(defNode.pitch),
    stepLabels: pitchLabels,
    onChange: (v) => { n.pitch = octAndNoteToPitch(pitchToOct(n.pitch), v); redrawCanvas(); }
  });
  
  const pitchOctKnob = new SynthKnob(row1Container, 'pitch-oct-knob', {
    label: 'OCTAVE',
    indicatorColor: themeKnob,
    min: 0,
    max: 8,
    value: pitchToOct(n.pitch),
    defaultValue: pitchToOct(defNode.pitch),
    onChange: (v) => { n.pitch = octAndNoteToPitch(v, pitchToNote(n.pitch)); redrawCanvas(); }
  });
  
  const pitchVarKnob = new SynthKnob(row1Container, 'pitch-var-knob', {
    label: 'SPREAD',
    indicatorColor: themeKnob,
    min: 0,
    max: 24,
    value: n.pitchVar,
    defaultValue: defNode.pitchvar,
    onChange: (v) => { n.pitchVar = v; redrawCanvas(); }
  });
  
  /*}}}*/
  /*{{{  length + artic*/
  
  const lenKnob = new SynthKnob(row2Container, 'len-knob', {
    label: 'LENGTH',
    indicatorColor: themeKnob,
    min: 0,
    max: 15,
    value: lengthValues.indexOf(n.length),
    stepLabels: lengthLabels,
    defaultValue: lengthValues.indexOf(defNode.length),
    onChange: (v) => { n.length = lengthValues[v]; redrawCanvas(); }
  });
  
  const articKnob = new SynthKnob(row2Container, 'artic-knob', {
    label: 'ARTIC.',
    indicatorColor: themeKnob,
    min: 0,
    max: 10,
    value: articValues.indexOf(n.artic),
    stepLabels: articLabels,
    defaultValue: articValues.indexOf(defNode.artic),
    onChange: (v) => { n.artic = articValues[v]; redrawCanvas(); }
  });
  
  
  /*}}}*/
  /*{{{  channel*/
  
  const chanKnob = new SynthKnob(row3Container, 'chan-knob', {
    label: 'CHANNEL',
    indicatorColor: themeKnob,
    min: 0,
    max: 15,
    value: n.chan,
    defaultValue: defNode.chan,
    onChange: (v) => { n.chan = v; redrawCanvas(); }
  });
  
  /*}}}*/
  /*{{{  velocity*/
  
  const velKnob = new SynthKnob(row3Container, 'vel-knob', {
    label: 'VELOCITY',
    indicatorColor: themeKnob,
    min: 0,
    max: 127,
    value: n.vel,
    defaultValue: defNode.vel,
    onChange: (v) => { n.vel = v; redrawCanvas(); }
  });
  
  const velVarKnob = new SynthKnob(row3Container, 'vel-var-knob', {
    label: 'SPREAD',
    indicatorColor: themeKnob,
    min: 0,
    max: 16,
    value: n.velVar,
    defaultValue: defNode.velvar,
    onChange: (v) => { n.velVar = v; redrawCanvas(); }
  });
  
  /*}}}*/

}

/*}}}*/

/*}}}*/
/*{{{  canvas*/

let pointerdownNode = null;
let pointerdownX    = 0;
let pointerdownY    = 0;

let pointerupNode = null;
let pointerupX    = 0;
let pointerupY    = 0;

let pointermoveX = 0;
let pointermoveY = 0;

let selectedNode = null;

/*{{{  primaryModifier*/

function primaryModifier(e) {
  return e.ctrlKey || e.metaKey;
}

/*}}}*/
/*{{{  resizeCanvas*/

function resizeCanvas() {

  const dpr     = window.devicePixelRatio || 1;
  const rect    = canvas.getBoundingClientRect();
  canvas.width  = Math.round(rect.width  * dpr);
  canvas.height = Math.round(rect.height * dpr);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  redrawCanvas();

}

/*}}}*/
/*{{{  redrawCanvas*/

function redrawCanvas() {

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();

  for (const node of nodes) {

    ctx.translate(node.x, node.y);

    const lw         = 2;
    const r          = node.size;
    const isSelected = (node == selectedNode) | 0;
    const isFilled   = node.gated | 0;

    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);

    if (isFilled) {
      ctx.fillStyle = node.color;
      ctx.fill();
    }

    ctx.lineWidth   = lw;
    ctx.strokeStyle = node.color;
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

/*}}}*/

/*{{{  pointerdownCanvas*/

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
    console.log(JSON.stringify(selectedNode, null, 2));
  }
  else if (pointerdownNode) {
    selectedNode = pointerdownNode;
    redrawCanvas();
    redrawInspectorNode();
    console.log(JSON.stringify(selectedNode, null, 2));
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


/*}}}*/
/*{{{  pointerupCanvas*/

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


/*}}}*/
/*{{{  pointermoveCanvas*/

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


/*}}}*/

/*}}}*/
/*{{{  control*/

/*{{{  structs*/

function ScheduledNote() {
  this.node   = null;
  this.start  = 0;
  this.finish = 0;
  this.wait   = 0;
  this.pitch  = 0;
  this.vel    = 0;
  this.chan   = 0;
}

function GatedNote() {
  this.node   = null;
  this.finish = 0;
  this.wait   = 0;
  this.chan   = 0;
}

function WaitingNote() {
  this.node   = null;
  this.wait   = 0;
}

function PlayedNote() {
  this.node = null;
}

/*}}}*/

let scheduledNotes = [];
let gatedNotes     = [];
let waitingNotes   = [];
let playedNotes    = [];

let bpm      = 120;
let running  = false;
let interval = null;
let budget   = 0;
let loopSum  = 0.0;
let loopNum  = 0;

let audioContext = null;

/*{{{  seqStart*/

function seqStart() {

  loopSum = 0;
  loopNum = 0;

  budget = Math.floor((60/bpm) * 0.25 * 0.3 * 1000);  // 0.3 * 1/16 note resolution (ms).

  console.log('bpm', bpm, 'budget (ms)', budget);

  if (running || nodes.length == 0)
    return;

  btnPlay.turnOff();
  btnPlay.disable();
  btnStop.turnOn();
  btnStop.enable();

  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContext.resume();
  }

  running = true;

  scheduledNotes = [];
  gatedNotes     = [];
  restingNotes   = [];
  playedNotes    = [];

  const pn = new PlayedNote();
  pn.node  = nodes[Math.floor(Math.random() * nodes.length)];

  playedNotes.push(pn);  // seed

  interval = setInterval(seqLoop, budget);

}

/*}}}*/
/*{{{  seqStop*/

function seqStop() {

  console.log('bpm', bpm, 'budget (ms)', budget, 'mean loop (ms)', (loopSum/loopNum) * 1000, 'loops', loopNum, 'nodes', nodes.length);

  clearInterval(interval);

  running  = false;
  interval = null;

  btnPlay.turnOn();
  btnPlay.enable();
  btnStop.turnOff();
  btnStop.disable();

}

/*}}}*/
/*{{{  seqLoop*/

function seqLoop() {

  const now = audioContext.currentTime;

  /*{{{  service scheduledNotes*/
  
  for (let i=scheduledNotes.length-1; i >= 0; i--) {
  
    const sn = scheduledNotes[i];
  
    if (sn.start <= now) {
  
      const gn  = new GatedNote();
      gn.node   = sn.node
      gn.finish = sn.finish;
      gn.wait   = sn.wait;
      gn.chan   = sn.chan;
  
      gatedNotes.push(gn);
  
      gn.node.gated = true;
  
      midiNoteOn(sn.chan, sn.pitch, sn.vel)
  
      scheduledNotes.splice(i, 1);
  
    }
  
  }
  
  /*}}}*/
  /*{{{  service gatedNotes*/
  
  for (let i=gatedNotes.length-1; i >= 0; i--) {
  
    const gn = gatedNotes[i];
  
    if (gn.finish <= now) {
  
      const wn  = new WaitingNote();
      wn.node   = gn.node
      wn.wait   = gn.wait
  
      waitingNotes.push(wn);
  
      midiNoteOff(gn.chan, gn.pitch, 0)
  
      gn.node.gated = false;
  
      gatedNotes.splice(i, 1);
  
    }
  
  }
  
  
  /*}}}*/
  /*{{{  service waitingNotes*/
  
  for (let i=waitingNotes.length-1; i >= 0; i--) {
  
    const wn = waitingNotes[i];
  
    if (wn.wait <= now) {
  
      const pn  = new PlayedNote();
      pn.node   = wn.node
  
      playedNotes.push(pn);
  
      waitingNotes.splice(i, 1);
  
    }
  
  }
  
  
  /*}}}*/
  /*{{{  service playedNotes*/
  
  for (let i=playedNotes.length-1; i >= 0; i--) {
  
    const pn = playedNotes[i];
    const n  = nodes[Math.floor(Math.random() * nodes.length)];
    const sn = new ScheduledNote();
  
    const duration = 60/bpm * n.length;
  
    sn.node   = n;
    sn.start  = now;
    sn.finish = now + duration * n.artic;
    sn.wait   = duration;
    sn.pitch  = adjust(n.pitch, n.pitchvar, 0, 127)
    sn.vel    = adjust(n.vel, n.velvar, 0, 127)
    sn.chan   = n.chan
  
    scheduledNotes.push(sn);
  
    playedNotes.splice(i, 1);
  
  }
  
  /*}}}*/

  redrawCanvas();

  loopSum += audioContext.currentTime - now;
  loopNum++;

}

/*}}}*/

/*}}}*/

/*{{{  init theme*/

let theme       = '#3867d6';
let themeNode   = theme;
let themeKnob   = thLight(1.1);
let themeButton = thLight(1.2);

/*}}}*/
/*{{{  init canvas*/

const canvas = document.getElementById('seq-canvas');
const ctx    = canvas.getContext('2d');

window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('pointerdown', pointerdownCanvas);
canvas.addEventListener('pointerup',   pointerupCanvas);
canvas.addEventListener('pointermove', pointermoveCanvas);

canvas.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

resizeCanvas();

/*}}}*/
/*{{{  init default node*/

defNode.pitch    = 60;
defNode.pitchvar = 0;
defNode.vel      = 64;
defNode.velvar   = 0;
defNode.length   = 1.0;
defNode.artic    = 1.0;
defNode.repeat   = 0;
defNode.chan     = 0;

defNode.color = themeNode;
defNode.size  = 15;

/*}}}*/
/*{{{  init global scale*/

const scaleLabels = [];

for (let i=0; i < scaleSpecs.length; i++) {
  scaleLabels.push(scaleSpecs[i].name);
}

let scaleNum = 26;

/*}}}*/
/*{{{  init global spread*/

let spread = 0;

/*}}}*/
/*{{{  init algorithm*/

const ALG_RANDOM  = 0;
const ALG_NEAREST = 1;

let algorithm = ALG_RANDOM;

const algLabels = ['random','nearest'];

/*}}}*/
/*{{{  create top bar content*/

const BTN_SIZE = 36;

const btnPlay = new HardwareButton({ icon: 'play', color: themeButton, size: BTN_SIZE, onClick: seqStart });
document.getElementById('btn-play').appendChild(btnPlay.render());
btnPlay.turnOn();

const btnStop = new HardwareButton({ icon: 'stop', color: themeButton, size: BTN_SIZE, onClick: seqStop });
document.getElementById('btn-stop').appendChild(btnStop.render());

const btnSettings = new HardwareButton({ icon: 'cog', color: themeButton, size: BTN_SIZE, onClick: redrawInspectorSettings });
document.getElementById('btn-settings').appendChild(btnSettings.render());
btnSettings.turnOn();

const btnMidi = new HardwareButton({ icon: 'midi', color: themeButton, size: BTN_SIZE, onClick: () => midiStart(btnMidi) });
document.getElementById('btn-midi').appendChild(btnMidi.render());

/*}}}*/
/*{{{  init midi*/

midiStart(btnMidi);

/*}}}*/

