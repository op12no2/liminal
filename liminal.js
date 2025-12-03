
/*{{{  constants*/

/*{{{  knob colors*/

const KNOB_PALETTE = {
  yellow:      '#FFEB3B', // Bright, attention-grabbing
  amber:       '#FFCA28', // Vintage, classic
  orange:      '#FFA726', // Warm, inviting
  blue:        '#3867d6', // Clean, technical
  mint:        '#26C6DA', // Fresh, modern
  lime:        '#9CCC65', // Organic, alive
  coral:       '#FF7043', // Energetic, bold
  purple:      '#AB47BC', // Creative, deep
  steel:       '#78909C'  // Neutral, precise
};

/*}}}*/
/*{{{  node colors*/

const NODE_PALETTE = [
  '#3867d6', '#4b7bec', '#2d98da', '#45aaf2',
  '#20bf6b', '#26de81', '#0fb9b1', '#2bcbba',
  '#fa8231', '#f7b731', '#eb3b5a', '#fc5c65',
  '#a55eea', '#8854d0', '#d1d8e0', '#778ca3'
];

/*}}}*/
/*{{{  scales*/

const SCALES = {

  chromatic: {
    pcs: [0,1,2,3,4,5,6,7,8,9,10,11],
    tags: ['chromatic', 'symmetric', 'dissonant']
  },

  major: {
    pcs: [0,2,4,5,7,9,11],
    tags: ['western','heptatonic','diatonic','bright','consonant','chordal']
  },

  minor: {
    pcs: [0,2,3,5,7,8,10],
    tags: ['western','heptatonic','diatonic','dark','consonant','chordal']
  },

  harmonicMinor: {
    pcs: [0,2,3,5,7,8,11],
    tags: ['western','heptatonic','exotic','tense','chordal']
  },

  melodicMinor: {
    pcs: [0,2,3,5,7,9,11],
    tags: ['jazz','heptatonic','ambiguous','chordal']
  },

  majorPentatonic: {
    pcs: [0,2,4,7,9],
    tags: ['pentatonic','bright','consonant','melodic']
  },

  minorPentatonic: {
    pcs: [0,3,5,7,10],
    tags: ['pentatonic','dark','consonant','melodic']
  },

  dorian: {
    pcs: [0,2,3,5,7,9,10],
    tags: ['western','modal','heptatonic','ambiguous','jazz']
  },

  phrygian: {
    pcs: [0,1,3,5,7,8,10],
    tags: ['western','heptatonic','dark','tense','exotic']
  },

  lydian: {
    pcs: [0,2,4,6,7,9,11],
    tags: ['modal','bright','ambiguous','floating']
  },

  mixolydian: {
    pcs: [0,2,4,5,7,9,10],
    tags: ['modal','jazz','bright','melodic']
  },

  locrian: {
    pcs: [0,1,3,5,6,8,10],
    tags: ['modal','dissonant','unstable']
  },

  wholeTone: {
    pcs: [0,2,4,6,8,10],
    tags: ['hexatonic','symmetric','floating','ambient']
  },

  diminished: {
    pcs: [0,2,3,5,6,8,9,11],
    tags: ['octatonic','symmetric','tense','jazz']
  },

  blues: {
    pcs: [0,3,5,6,7,10],
    tags: ['blues','hexatonic','expressive']
  },

  bebopMajor: {
    pcs: [0,2,4,5,7,8,9,11],
    tags: ['jazz','bebop','chromatic']
  },

  bebopMinor: {
    pcs: [0,2,3,5,7,8,9,10,11],
    tags: ['jazz','bebop','chromatic']
  },

  bebopDominant: {
    pcs: [0,2,4,5,7,9,10,11],
    tags: ['jazz','bebop','dominant']
  },

  bhairav: {
    pcs: [0,1,4,5,7,8,11],
    tags: ['indian','heptatonic','tense','exotic']
  },

  kafi: {
    pcs: [0,2,3,5,7,9,10],
    tags: ['indian','heptatonic','consonant']
  },

  marwa: {
    pcs: [0,1,4,6,7,9,11],
    tags: ['indian','tense','ambiguous']
  },

  hijaz: {
    pcs: [0,1,4,5,7,8,11],
    tags: ['arabic','heptatonic','exotic','tense']
  },

  bayati: {
    pcs: [0,1,3,5,7,8,10],
    tags: ['arabic','heptatonic','dark']
  },

  persian: {
    pcs: [0,1,4,5,6,8,11],
    tags: ['middleEastern','tense','exotic']
  },

  octatonic: {
    pcs: [0,1,3,4,6,7,9,10],
    tags: ['symmetric','octatonic','tense','jazz']
  },

  inSen: {
    pcs: [0,1,5,7,10],
    tags: ['japanese','pentatonic','dark','tense']
  },

  hirajoshi: {
    pcs: [0,2,3,7,8],
    tags: ['japanese','pentatonic','dark','ambiguous','exotic']
  },

  iwato: {
    pcs: [0,1,5,6,10],
    tags: ['japanese','pentatonic','tense','sparse']
  },

  yo: {
    pcs: [0,2,5,7,9],
    tags: ['japanese','pentatonic','bright']
  },

  pelog: {
    pcs: [0,1,3,7,8],
    tags: ['indonesian','pentatonic','exotic']
  },

  slendro: {
    pcs: [0,2,5,7,10],
    tags: ['indonesian','pentatonic','floating']
  },

  messiaen2: {
    pcs: [0,1,3,4,6,7,9,10],
    tags: ['messiaen','symmetric','static','ambient']
  },

  enigmatic: {
    pcs: [0,1,4,6,8,10,11],
    tags: ['synthetic','alien','tense']
  },

  hungarianMinor: {
    pcs: [0,2,3,6,7,8,11],
    tags: ['easternEuropean','dark','exotic']
  }

};

/*}}}*/
/*{{{  length lookups*/

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
  this.artic    = 0.0;  // fraction of length to stay down - e.g. 0.1 == stacatto//hack unused
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
/*{{{  redrawInspectorNode*/

const row1Container = document.getElementById('row1-container');
const row2Container = document.getElementById('row2-container');
const row3Container = document.getElementById('row3-container');

function redrawInspectorNode() {

  row1Container.innerHTML = '';
  row2Container.innerHTML = '';
  row3Container.innerHTML = '';

  const n = selectedNode;

  if (!n)
    return;

  /*{{{  pitch*/
  
  const pitchNoteKnob = new SynthKnob(row1Container, 'pitch-note-knob', {
    label: 'NOTE',
    indicatorColor: KNOB_PALETTE.amber,
    min: 0,
    max: 11,
    value: pitchToNote(n.pitch),
    defaultValue: pitchToNote(defNode.pitch),
    stepLabels: pitchLabels,
    onChange: (v) => { n.pitch = octAndNoteToPitch(pitchToOct(n.pitch), v); redrawCanvas(); }
  });
  
  const pitchOctKnob = new SynthKnob(row1Container, 'pitch-oct-knob', {
    label: 'OCTAVE',
    indicatorColor: KNOB_PALETTE.amber,
    min: 0,
    max: 8,
    value: pitchToOct(n.pitch),
    defaultValue: pitchToOct(defNode.pitch),
    onChange: (v) => { n.pitch = octAndNoteToPitch(v, pitchToNote(n.pitch)); redrawCanvas(); }
  });
  
  const pitchVarKnob = new SynthKnob(row1Container, 'pitch-var-knob', {
    label: 'SPREAD',
    indicatorColor: KNOB_PALETTE.amber,
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
    indicatorColor: KNOB_PALETTE.blue,
    min: 0,
    max: 15,
    value: lengthValues.indexOf(n.length),
    stepLabels: lengthLabels,
    defaultValue: lengthValues.indexOf(defNode.length),
    onChange: (v) => { n.length = lengthValues[v]; redrawCanvas(); }
  });
  
  const articKnob = new SynthKnob(row2Container, 'artic-knob', {
    label: 'ARTIC.',
    indicatorColor: KNOB_PALETTE.blue,
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
    indicatorColor: KNOB_PALETTE.mint,
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
    indicatorColor: KNOB_PALETTE.purple,
    min: 0,
    max: 127,
    value: n.vel,
    defaultValue: defNode.vel,
    onChange: (v) => { n.vel = v; redrawCanvas(); }
  });
  
  const velVarKnob = new SynthKnob(row3Container, 'vel-var-knob', {
    label: 'SPREAD',
    indicatorColor: KNOB_PALETTE.purple,
    min: 0,
    max: 16,
    value: n.velVar,
    defaultValue: defNode.velvar,
    onChange: (v) => { n.velVar = v; redrawCanvas(); }
  });
  
  /*}}}*/

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
  else if (pointerdownNode && pointerdownNode != selectedNode) {
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

defNode.color = NODE_PALETTE[0];
defNode.size  = 15;

/*}}}*/
/*{{{  create transport*/

const transport = new Transport('transport-container', {
  positionText: '0.0.00',
  onPlay: () => {
    seqStart();
  },
  onPause: () => {
    console.log('Pause pressed');
  },
  onStop: () => {
    seqStop();
  }
});


/*}}}*/
/*{{{  init midi*/

const midiLED = new LED('midi-led', {
  isActive: false
});

midiStart(midiLED);

/*}}}*/

