
/*{{{  constants*/

const DEF_BPM   = 60;
const DEF_KEY   = 0;
const DEF_SCALE = 0;

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
/*{{{  status*/

function status(s) {
  setText('status-text', s);
}

/*}}}*/
/*{{{  quantiseNote*/

function quantiseNote(midiNote, scale, rootNote) {

  // Transpose note relative to root
  const transposedNote = midiNote - rootNote;
  const octave = Math.floor(transposedNote / 12);
  const noteInOctave = transposedNote - (octave * 12);

  // Find nearest scale note at or below noteInOctave
  let quantised = scale[0];
  for (let i = 0; i < scale.length; i++) {
    if (scale[i] <= noteInOctave) {
      quantised = scale[i];
    }
    else {
      break;
    }
  }

  // If noteInOctave is below all scale notes, use highest note from previous octave
  if (noteInOctave < scale[0]) {
    quantised = scale[scale.length - 1];
    octave--;
  }

  // Transpose back
  return rootNote + octave * 12 + quantised;

}

/*}}}*/
/*{{{  deleteEntry*/

function deleteEntry (a, i) {
  a[i] = a[a.length - 1];
  a.pop();
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

  Object.assign(node, selectedNode ? selectedNode : defNode);

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
  const row4Container = document.getElementById('row4-container');

  setText('inspector-title', 'settings');

  row1Container.innerHTML = '';
  row2Container.innerHTML = '';
  row3Container.innerHTML = '';
  row4Container.innerHTML = '';

  /*{{{  bpm*/
  
  const bpmKnob = new SynthKnob(row1Container, 'bpm-knob', {
    label: 'BPM',
    indicatorColor: themeSettingsKnob,
    min: 40,
    max: 240,
    value: selectedBpm,
    defaultValue: DEF_BPM,
    onChange: (v) => { selectedBpm = v; redrawCanvas(); }
  });
  
  /*}}}*/
  /*{{{  algorithm*/
  
  const algKnob = new SynthKnob(row1Container, 'alg-knob', {
    label: 'ALG.',
    indicatorColor: themeSettingsKnob,
    min: 0,
    max: algLabels.length - 1,
    value: algorithm,
    defaultValue: ALG_RANDOM,
    stepLabels: algLabels,
    onChange: (v) => { algorithm = v; redrawCanvas(); }
  });
  
  /*}}}*/
  /*{{{  key & scale*/
  
  const keyKnob = new SynthKnob(row1Container, 'key-knob', {
    label: 'KEY',
    indicatorColor: themeSettingsKnob,
    min: 0,
    max: 11,
    value: selectedKey,
    defaultValue: DEF_KEY,
    stepLabels: pitchLabels,
    onChange: (v) => { selectedKey = v; redrawCanvas(); }
  });
  
  const scaleKnob = new SynthKnob(row3Container, 'scale-knob', {
    size: 100,
    label: 'SCALE',
    indicatorColor: themeSettingsKnob,
    min: 0,
    max: scaleLabels.length - 1,
    value: selectedScale,
    defaultValue: DEF_SCALE,
    stepLabels: scaleLabels,
    sensitivity: 0.4,
    onChange: (v) => { selectedScale = v; redrawCanvas(); }
  });
  
  /*}}}*/
  /*{{{  spread*/
  
  const spreadKnob = new SynthKnob(row4Container, 'spread-knob', {
    label: 'SPREAD',
    indicatorColor: themeSettingsKnob,
    min: 0,
    max: 24,
    value: selectedSpread,
    defaultValue: 0,
    onChange: (v) => { selectedSpread = v; redrawCanvas(); }
  });
  
  /*}}}*/
  /*{{{  dynamics*/
  
  const dynamicsKnob = new SynthKnob(row4Container, 'dynamics-knob', {
    label: 'DYNAMICS',
    indicatorColor: themeSettingsKnob,
    min: 0,
    max: 64,
    value: selectedDynamics,
    defaultValue: 0,
    onChange: (v) => { selectedDynamics = v; redrawCanvas(); }
  });
  
  /*}}}*/

}

/*}}}*/
/*{{{  redrawInspectorNode*/

function redrawInspectorNode() {

  const row1Container = document.getElementById('row1-container');
  const row2Container = document.getElementById('row2-container');
  const row3Container = document.getElementById('row3-container');
  const row4Container = document.getElementById('row4-container');

  setText('inspector-title', 'note');

  row1Container.innerHTML = '';
  row2Container.innerHTML = '';
  row3Container.innerHTML = '';
  row4Container.innerHTML = '';

  const n = selectedNode;

  if (!n)
    return;

  /*{{{  pitch*/
  
  const pitchNoteKnob = new SynthKnob(row1Container, 'pitch-note-knob', {
    label: 'NOTE',
    indicatorColor: themeNodeKnob,
    min: 0,
    max: 11,
    value: pitchToNote(n.pitch),
    defaultValue: pitchToNote(n.pitch),
    stepLabels: pitchLabels,
    onChange: (v) => { n.pitch = octAndNoteToPitch(pitchToOct(n.pitch), v); redrawCanvas(); }
  });
  
  const pitchOctKnob = new SynthKnob(row1Container, 'pitch-oct-knob', {
    label: 'OCTAVE',
    indicatorColor: themeNodeKnob,
    min: 0,
    max: 8,
    value: pitchToOct(n.pitch),
    defaultValue: pitchToOct(n.pitch),
    onChange: (v) => { n.pitch = octAndNoteToPitch(v, pitchToNote(n.pitch)); redrawCanvas(); }
  });
  
  const pitchVarKnob = new SynthKnob(row1Container, 'pitch-var-knob', {
    label: 'SPREAD',
    indicatorColor: themeNodeKnob,
    min: 0,
    max: 24,
    value: n.pitchVar,
    defaultValue: defNode.pitchvar,
    onChange: (v) => { n.pitchvar = v; redrawCanvas(); }
  });
  
  /*}}}*/
  /*{{{  length + artic*/
  
  const lenKnob = new SynthKnob(row2Container, 'len-knob', {
    label: 'LENGTH',
    indicatorColor: themeNodeKnob,
    min: 0,
    max: 15,
    value: lengthValues.indexOf(n.length),
    stepLabels: lengthLabels,
    defaultValue: lengthValues.indexOf(defNode.length),
    onChange: (v) => { n.length = lengthValues[v]; redrawCanvas(); }
  });
  
  const articKnob = new SynthKnob(row2Container, 'artic-knob', {
    label: 'ARTIC.',
    indicatorColor: themeNodeKnob,
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
    indicatorColor: themeNodeKnob,
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
    indicatorColor: themeNodeKnob,
    min: 0,
    max: 127,
    value: n.vel,
    defaultValue: defNode.vel,
    onChange: (v) => { n.vel = v; redrawCanvas(); }
  });
  
  const velVarKnob = new SynthKnob(row3Container, 'vel-var-knob', {
    label: 'DYNAMICS',
    indicatorColor: themeNodeKnob,
    min: 0,
    max: 16,
    value: n.velVar,
    defaultValue: defNode.velvar,
    onChange: (v) => { n.velvar = v; redrawCanvas(); }
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

let selectedBpm = DEF_BPM;
let running     = false;
let interval    = null;
let budget      = 0;
let loopSum     = 0.0;
let loopNum     = 0;

let audioContext = null;

/*{{{  seqStart*/

function seqStart() {

  loopSum = 0;
  loopNum = 0;

  budget = Math.floor((60/selectedBpm) * 0.25 * 0.3 * 1000);  // 0.3 * 1/16 note resolution (ms).

  console.log('bpm', selectedBpm, 'budget (ms)', budget);

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

  console.log('bpm', selectedBpm, 'budget (ms)', budget, 'mean loop (ms)', (loopSum/loopNum) * 1000, 'loops', loopNum, 'nodes', nodes.length);

  clearInterval(interval);

  running  = false;
  interval = null;

  btnPlay.turnOn();
  btnPlay.enable();
  btnStop.turnOff();
  btnStop.disable();

  /*{{{  clear any gated notes*/
  
  for (let i=gatedNotes.length-1; i >= 0; i--) {
  
    const gn = gatedNotes[i];
  
    midiNoteOff(gn.chan, gn.pitch, 0)
  
    gn.node.gated = false;
  
  }
  
  
  /*}}}*/

  redrawCanvas();

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
  
      deleteEntry(scheduledNotes, i);
  
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
  
      deleteEntry(gatedNotes, i);
  
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
  
      deleteEntry(waitingNotes, i);
  
    }
  
  }
  
  
  /*}}}*/
  /*{{{  service playedNotes*/
  
  for (let i=playedNotes.length-1; i >= 0; i--) {
  
    const pn = playedNotes[i];
    const n  = nodes[Math.floor(Math.random() * nodes.length)];
    const sn = new ScheduledNote();
  
    const duration = 60/selectedBpm * n.length;
  
    sn.node   = n;
    sn.start  = now;
    sn.finish = now + duration * n.artic;
    sn.wait   = now + duration;
    sn.pitch  = quantiseLUT[selectedKey][selectedScale][adjust(n.pitch, n.pitchvar + selectedSpread, 0, 127)];
    sn.vel    = adjust(n.vel, n.velvar + selectedDynamics, 0, 127);
    sn.chan   = n.chan;
  
    scheduledNotes.push(sn);
  
    deleteEntry(playedNotes, i);
  
  }
  
  /*}}}*/

  redrawCanvas();

  loopSum += audioContext.currentTime - now;
  loopNum++;

}

/*}}}*/

/*}}}*/

/*{{{  init theme*/

let themeNode         = '#3867d6';
let themeNodeKnob     = '#ffdd00';
let themeSettingsKnob = '#ff2d55';
let themeButton       = '#00ff66';

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
/*{{{  init key*/

/*{{{  scale specs*/

const scaleSpecs = [
  { name: "chromatic", notes: [0,1,2,3,4,5,6,7,8,9,10,11] },
  { name: "major", notes: [0,2,4,5,7,9,11] },
  { name: "minor", notes: [0,2,3,5,7,8,10] },
  { name: "harmonic minor", notes: [0,2,3,5,7,8,11] },
  { name: "melodic minor", notes: [0,2,3,5,7,9,11] },
  { name: "major pentatonic", notes: [0,2,4,7,9] },
  { name: "minor pentatonic", notes: [0,3,5,7,10] },
  { name: "dorian", notes: [0,2,3,5,7,9,10] },
  { name: "phrygian", notes: [0,1,3,5,7,8,10] },
  { name: "phrygian dominant", notes: [0,1,4,5,7,8,10] },
  { name: "lydian", notes: [0,2,4,6,7,9,11] },
  { name: "lydian dominant", notes: [0,2,4,6,7,9,10] },
  { name: "lydian augmented", notes: [0,2,4,6,8,9,11] },
  { name: "mixolydian", notes: [0,2,4,5,7,9,10] },
  { name: "locrian", notes: [0,1,3,5,6,8,10] },
  { name: "super locrian", notes: [0,1,3,4,6,8,10] },
  { name: "wholetone", notes: [0,2,4,6,8,10] },
  { name: "diminished", notes: [0,2,3,5,6,8,9,11] },
  { name: "blues", notes: [0,3,5,6,7,10] },
  { name: "bebop major", notes: [0,2,4,5,7,8,9,11] },
  { name: "bebop minor", notes: [0,2,3,5,7,8,9,10,11] },
  { name: "bebop dominant", notes: [0,2,4,5,7,9,10,11] },
  { name: "bhairav", notes: [0,1,4,5,7,8,11] },
  { name: "kafi", notes: [0,2,3,5,7,9,10] },
  { name: "marwa", notes: [0,1,4,6,7,9,11] },
  { name: "hijaz", notes: [0,1,4,5,7,8,11] },
  { name: "bayati", notes: [0,1,3,5,7,8,10] },
  { name: "persian", notes: [0,1,4,5,6,8,11] },
  { name: "quartal", notes: [0,5,10] },
  { name: "hexatonic", notes: [0,1,4,5,8,9] },
  { name: "octatonic", notes: [0,1,3,4,6,7,9,10] },
  { name: "in sen", notes: [0,1,5,7,10] },
  { name: "hirajoshi", notes: [0,2,3,7,8] },
  { name: "iwato", notes: [0,1,5,6,10] },
  { name: "yo", notes: [0,2,5,7,9] },
  { name: "pelog", notes: [0,1,3,7,8] },
  { name: "slendro", notes: [0,2,5,7,10] },
  { name: "enigmatic", notes: [0,1,4,6,8,10,11] },
  { name: "hungarian minor", notes: [0,2,3,6,7,8,11] },
  { name: "gypsy minor", notes: [0,2,3,6,7,8,11] },
  { name: "kumoi", notes: [0,2,3,7,9] },
  { name: "akebono", notes: [0,2,3,7,10] },
  { name: "hon kumoi joshi", notes: [0,1,5,7,8] },
  { name: "messiaen 2", notes: [0,1,3,4,6,7,9,10] },
  { name: "messiaen 3", notes: [0,2,3,4,6,7,8,10,11] },
  { name: "messiaen 4", notes: [0,1,2,5,6,7,8,11] },
  { name: "messiaen 5", notes: [0,1,5,6,7,11] },
  { name: "messiaen 6", notes: [0,2,4,5,6,8,10,11] },
  { name: "messiaen 7", notes: [0,1,2,3,5,6,7,8,9,11] },
  { name: "augmented", notes: [0,3,4,7,8,11] },
  { name: "prometheus", notes: [0,2,4,6,9,10] },
  { name: "tritone", notes: [0,1,4,6,7,10] },
  { name: "egyptian", notes: [0,2,5,7,10] },
  { name: "scriabin", notes: [0,1,4,7,9] },
  { name: "fifths", notes: [0,7] }
];

/*}}}*/

const scaleLabels = [];

for (let i=0; i < scaleSpecs.length; i++) {
  scaleLabels.push(scaleSpecs[i].name);
}

let selectedScale = DEF_SCALE;
let selectedKey   = DEF_KEY;

const quantiseLUT = Array(12);

for (let i=0; i < 12; i++) {
  quantiseLUT[i] = Array(scaleSpecs.length);
  for (let j=0; j < scaleSpecs.length; j++) {
    quantiseLUT[i][j] = Array(128);
    let notes = scaleSpecs[j].notes;
    for (let k=0; k < 128; k++) {
      quantiseLUT[i][j][k] = quantiseNote(k, notes, i);
    }
  }
}

/*}}}*/
/*{{{  init spread /dynamics*/

let selectedSpread   = 0;
let selectedDynamics = 0;

/*}}}*/
/*{{{  init algorithm*/

const ALG_RANDOM  = 0;
const ALG_NEAREST = 1;

let algorithm = ALG_RANDOM;

const algLabels = ['random','nearest'];

/*}}}*/
/*{{{  init toolbar*/

const BTN_SIZE = 36;

const btnPlay = new HardwareButton({ icon: 'play', color: themeButton, size: BTN_SIZE, onClick: seqStart });
document.getElementById('btn-play').appendChild(btnPlay.render());
btnPlay.turnOn();
btnPlay.enable();

const btnStop = new HardwareButton({ icon: 'stop', color: themeButton, size: BTN_SIZE, onClick: seqStop });
document.getElementById('btn-stop').appendChild(btnStop.render());
btnStop.disable();

const btnSettings = new HardwareButton({ icon: 'cog', color: themeSettingsKnob, size: BTN_SIZE, onClick: redrawInspectorSettings });
document.getElementById('btn-settings').appendChild(btnSettings.render());
btnSettings.turnOn();

const btnHelp = new HardwareButton({icon: 'help', size: BTN_SIZE, color: themeButton, onClick: () => {
  window.open('https://github.com/op12no2/liminal', '_blank');
}});
document.getElementById('btn-help').appendChild(btnHelp.render());
btnHelp.turnOn();

const btnMidi = new HardwareButton({ icon: 'midi', color: themeButton, size: BTN_SIZE, onClick: () => midiStart(btnMidi) });
document.getElementById('btn-midi').appendChild(btnMidi.render());

/*}}}*/
/*{{{  init midi*/

midiStart(btnMidi);

/*}}}*/

