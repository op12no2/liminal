
/*{{{  constants*/

const NODE_SIZE   = 15;
const NODE_SEL    = 10;
const NODE_PITCH  = 'C4';
const NODE_VEL    = 64;
const NODE_DUR    = 0.25;  // fraction of a beat defined by bpm.
const NODE_CHAN   = 0;
const KNOB_SIZE   = 60;
const KNOB_MIN    = 0;
const KNOB_MAX    = 127;
const KNOB_SENS   = 1.8;

/*{{{  knob colours*/

const KNOB_PALETTE = {
  yellow:      '#FFEB3B', // Bright, attention-grabbing
  orange:      '#FFA726', // Warm, inviting
  blue:        '#42A5F5', // Clean, technical
  mint:        '#26C6DA', // Fresh, modern
  lime:        '#9CCC65', // Organic, alive
  amber:       '#FFCA28', // Vintage, classic
  coral:       '#FF7043', // Energetic, bold
  purple:      '#AB47BC', // Creative, deep
  steel:       '#78909C'  // Neutral, precise
};

/*}}}*/
/*{{{  node colours*/

const PALETTE = [
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

/*}}}*/

let bpm      = 120;
let randUp   = 12;
let randDown = 12;

let selectedNode = 0;

let pointerdownNode = null;
let pointerdownX    = 0;
let pointerdownY    = 0;

let pointerupNode = null;
let pointerupX    = 0;
let pointerupY    = 0;

let pointermoveX = 0;
let pointermoveY = 0;

/*{{{  synth knob*/

class SynthKnob {
      constructor(rootContainer, knobId, options = {}) {
        const div = document.createElement('div');
        div.id = knobId;
        div.className = 'knob-container';
        rootContainer.appendChild(div);
        this.container = document.getElementById(knobId);
        this.label = options.label || 'PARAM';
        this.min = options.min ?? KNOB_MIN;
        this.max = options.max ?? KNOB_MAX;
        this.steps = options.steps || null; // e.g. [0, 10, 20] or [0, 1, 2]
        this.stepLabels = options.stepLabels || null; // e.g. ['Low', 'Med', 'High']
        this.defaultValue = options.defaultValue ?? this.min;
        this.value = options.value ?? this.defaultValue;
        this.indicatorColor = options.indicatorColor || KNOB_PALETTE.yellow;
        this.size = options.size || KNOB_SIZE;
        this.sensitivity = options.sensitivity ?? KNOB_SENS; // pixels per unit
        this.onChange = options.onChange || (() => {});

        this.isDragging = false;
        this.dragStartY = 0;
        this.dragStartValue = 0;

        this.render();
        this.attachEvents();
      }

      snapToStep(value) {
        if (!this.steps) {
          return value;
        }

        // Find closest step
        let closest = this.steps[0];
        let minDiff = Math.abs(value - closest);

        for (let i = 1; i < this.steps.length; i++) {
          const diff = Math.abs(value - this.steps[i]);
          if (diff < minDiff) {
            minDiff = diff;
            closest = this.steps[i];
          }
        }

        return closest;
      }

      getDisplayValue() {
        const val = Math.round(this.value);

        // If we have step labels, show the corresponding label
        if (this.steps && this.stepLabels) {
          const stepIndex = this.steps.indexOf(val);
          if (stepIndex >= 0 && stepIndex < this.stepLabels.length) {
            return this.stepLabels[stepIndex];
          }
        }

        return val;
      }

      blendColors(color1, color2, ratio) {
        // ratio: 0 = all color1, 1 = all color2, 0.5 = 50/50 mix

        // Parse hex colors to RGB
        const c1 = {
          r: parseInt(color1.slice(1, 3), 16),
          g: parseInt(color1.slice(3, 5), 16),
          b: parseInt(color1.slice(5, 7), 16)
        };

        const c2 = {
          r: parseInt(color2.slice(1, 3), 16),
          g: parseInt(color2.slice(3, 5), 16),
          b: parseInt(color2.slice(5, 7), 16)
        };

        // Blend
        const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
        const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
        const b = Math.round(c1.b + (c2.b - c1.b) * ratio);

        // Convert back to hex
        return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
      }

      render() {
        const svg = this.createKnobSVG();

        this.container.innerHTML = `
          <div class="knob-label">${this.label}</div>
          ${svg}
          <div class="knob-value">${this.getDisplayValue()}</div>
        `;

        this.svgElement = this.container.querySelector('.knob-svg');
        this.valueDisplay = this.container.querySelector('.knob-value');
        this.indicator = this.container.querySelector('.knob-indicator');
      }

      createKnobSVG() {
        const size = this.size;
        const center = size / 2;
        const outerRadius = size / 2 - 2;
        const innerRadius = outerRadius * 0.85;

        // Calculate angle for current value
        // 0° = north/up (12 o'clock)
        // -160° = 7 o'clock (min), +160° = 5 o'clock (max)
        const minAngle = -160;
        const maxAngle = 160;
        const angleRange = maxAngle - minAngle; // 320 degrees
        const valuePercent = (this.value - this.min) / (this.max - this.min);
        const currentAngle = minAngle + (angleRange * valuePercent);
        const centerDotColor = this.blendColors(this.indicatorColor, '#555555', 0.75);

        // Create arc path for indicator
        const arcPath = this.createArcPath(center, innerRadius + 3, minAngle, currentAngle);

        return `
          <svg class="knob-svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
            <defs>
              <!-- Outer shadow -->
              <radialGradient id="outerShadow">
                <stop offset="0%" style="stop-color:#000;stop-opacity:0.3" />
                <stop offset="100%" style="stop-color:#000;stop-opacity:0" />
              </radialGradient>

              <!-- Knob body gradient (dark metal) -->
              <radialGradient id="knobBody" cx="40%" cy="40%">
                <stop offset="0%" style="stop-color:#3a3a3a" />
                <stop offset="70%" style="stop-color:#252525" />
                <stop offset="100%" style="stop-color:#1a1a1a" />
              </radialGradient>

              <!-- Bevel highlight -->
              <radialGradient id="bevelHighlight" cx="35%" cy="35%">
                <stop offset="0%" style="stop-color:#555;stop-opacity:0.9" />
                <stop offset="50%" style="stop-color:#333;stop-opacity:0.5" />
                <stop offset="100%" style="stop-color:#222;stop-opacity:0" />
              </radialGradient>

              <!-- Top surface gradient -->
              <radialGradient id="topSurface" cx="40%" cy="40%">
                <stop offset="0%" style="stop-color:#404040" />
                <stop offset="100%" style="stop-color:#2a2a2a" />
              </radialGradient>
            </defs>

            <!-- Outer shadow circle -->
            <circle cx="${center}" cy="${center}" r="${outerRadius + 2}" fill="url(#outerShadow)" />

            <!-- Main knob body -->
            <circle cx="${center}" cy="${center}" r="${outerRadius}" fill="url(#knobBody)" />

            <!-- Bevel edge highlight -->
            <circle cx="${center}" cy="${center}" r="${outerRadius}" fill="url(#bevelHighlight)" />

            <!-- Inner top surface -->
            <circle cx="${center}" cy="${center}" r="${innerRadius}" fill="url(#topSurface)" />

            <!-- Value indicator arc -->
            <path class="knob-indicator" d="${arcPath}"
                  fill="none"
                  stroke="${this.indicatorColor}"
                  stroke-width="3"
                  stroke-linecap="round" />

            <!-- Center dot -->
            <circle cx="${center}" cy="${center}" r="2" fill="${centerDotColor}" />

            <!-- Pointer line -->
            ${this.createPointerLine(center, innerRadius * 0.4, innerRadius * 0.75, currentAngle)}
          </svg>
        `;
      }

      createArcPath(center, radius, startAngle, endAngle) {
        // Handle the case where we're at minimum (no arc to draw)
        if (endAngle <= startAngle) {
          return '';
        }

        const start = this.polarToCartesian(center, center, radius, endAngle);
        const end = this.polarToCartesian(center, center, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
      }

      createPointerLine(center, innerLen, outerLen, angle) {
        const inner = this.polarToCartesian(center, center, innerLen, angle);
        const outer = this.polarToCartesian(center, center, outerLen, angle);

        return `<line x1="${inner.x}" y1="${inner.y}" x2="${outer.x}" y2="${outer.y}"
                      stroke="#666" stroke-width="2" stroke-linecap="round" />`;
      }

      polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        // 0 degrees = north/up (12 o'clock)
        // Positive angles go clockwise
        const angleInRadians = angleInDegrees * Math.PI / 180.0;
        return {
          x: centerX + (radius * Math.sin(angleInRadians)),
          y: centerY - (radius * Math.cos(angleInRadians))
        };
      }

      attachEvents() {
        this.container.addEventListener('mousedown', (e) => this.onPointerDown(e));
        this.container.addEventListener('dblclick', (e) => this.onDoubleClick(e));
        document.addEventListener('mousemove', (e) => this.onPointerMove(e));
        document.addEventListener('mouseup', () => this.onPointerUp());
      }

      onPointerDown(e) {
        e.preventDefault();
        this.isDragging = true;
        this.dragStartY = e.clientY;
        this.dragStartValue = this.value;
        this.container.style.cursor = 'grabbing';
      }

      onDoubleClick(e) {
        e.preventDefault();
        this.value = this.defaultValue;
        this.updateDisplay();
        this.onChange(Math.round(this.value));
      }

      onPointerMove(e) {
        if (!this.isDragging) return;

        const deltaY = this.dragStartY - e.clientY; // Inverted: drag up = increase
        const valueChange = deltaY * this.sensitivity;

        let newValue = this.dragStartValue + valueChange;

        // Snap to step if steps are defined
        newValue = this.snapToStep(newValue);

        // Clamp to exact min/max bounds
        if (newValue <= this.min) {
          newValue = this.min;
        }
        else if (newValue >= this.max) {
          newValue = this.max;
        }

        this.value = newValue;
        this.updateDisplay();
        this.onChange(Math.round(this.value));
      }

      onPointerUp() {
        if (this.isDragging) {
          this.isDragging = false;
          this.container.style.cursor = 'pointer';
        }
      }

      updateDisplay() {
        this.valueDisplay.textContent = this.getDisplayValue();

        // Update indicator arc and pointer
        const minAngle = -160;
        const maxAngle = 160;
        const angleRange = maxAngle - minAngle;
        const valuePercent = (this.value - this.min) / (this.max - this.min);
        const currentAngle = minAngle + (angleRange * valuePercent);

        const center = this.size / 2;
        const innerRadius = (this.size / 2 - 2) * 0.85;
        const arcPath = this.createArcPath(center, innerRadius + 3, minAngle, currentAngle);

        this.indicator.setAttribute('d', arcPath);

        // Update pointer (find and update the line element)
        const line = this.svgElement.querySelector('line');
        const inner = this.polarToCartesian(center, center, innerRadius * 0.4, currentAngle);
        const outer = this.polarToCartesian(center, center, innerRadius * 0.75, currentAngle);
        line.setAttribute('x1', inner.x);
        line.setAttribute('y1', inner.y);
        line.setAttribute('x2', outer.x);
        line.setAttribute('y2', outer.y);
      }

      setValue(newValue) {
        this.value = Math.max(this.min, Math.min(this.max, newValue));
        this.updateDisplay();
      }
    }

    // Create demo knobs
    //const knob1 = new SynthKnob('knob1', {
      //label: 'CUTOFF',
      //defaultValue: 64,
      //value: 0,
      //indicatorColor: '#ffb347', // warm yellow
      //onChange: (value) => console.log('Cutoff:', value)
    //});

    //const knob2 = new SynthKnob('knob2', {
      //label: 'RESONANCE',
      //defaultValue: 0,
      //value: 32,
      //indicatorColor: '#4a9eff', // cool blue
      //onChange: (value) => console.log('Resonance:', value)
    //});

    //const knob3 = new SynthKnob('knob3', {
      //label: 'FILTER TYPE',
      //min: 0,
      //max: 2,
      //defaultValue: 0,
      //value: 0,
      //steps: [0, 1, 2],
      //stepLabels: ['LOW', 'MED', 'HIGH'],
      //indicatorColor: '#ff6b6b', // warm red
      //sensitivity: 0.05, // slower for discrete steps
      //onChange: (value) => console.log('Filter Type:', value)
    //});

/*}}}*/
/*{{{  init midi*/

let midi = null;

WebMidi.enable().then(midiOnEnabled).catch(err => console.log(err));

function midiOnEnabled() {
  if (WebMidi.inputs.length < 1) {
    console.log("No MIDI device detected.");
  }
  else {
    WebMidi.inputs.forEach(input => console.log('midi input', input.manufacturer, input.name));
    WebMidi.outputs.forEach(output => console.log('midi output', output.manufacturer, output.name));
    midi = WebMidi.outputs[0];
  }
}

/*}}}*/

/*{{{  nodes*/

const nodes = [];

/*{{{  Node*/

function Node () {

  this.x        = 0;
  this.y        = 0;
  this.pitch    = 0;
  this.vel      = 0;
  this.dur      = 0;
  this.chan     = 0;
  this.size     = 0;
  this.colour   = 0;
  this.randUp   = 0;
  this.randDown = 0;

}

/*}}}*/
/*{{{  createNode*/

function createNode (x, y) {

  console.log('create node', x, y);

  const node = new Node();

  nodes.push(node);

  node.x      = x;
  node.y      = y;
  node.colour = PALETTE[0];
  node.size   = NODE_SIZE;
  node.pitch  = NODE_PITCH;
  node.dur    = NODE_DUR;
  node.vel    = NODE_VEL;
  node.chan   = NODE_CHAN;

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
/*{{{  generic css helpers*/

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
/*{{{  canvas*/

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
    if (node.vel === 0) {
      /*{{{  rest*/
      
      const d = r * 2;
      
      ctx.beginPath();
      ctx.rect(-r, -r, d, d);
      
      ctx.lineWidth   = lw;
      ctx.strokeStyle = node.colour;
      ctx.stroke();
      
      /*}}}*/
    }
    else {
      /*{{{  note*/
      
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      
      ctx.lineWidth   = lw;
      ctx.strokeStyle = node.colour;
      ctx.stroke();
      
      /*}}}*/
    }

    // Selection indicator
    if (isSelected) {
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#555'; //node.colour;
      ctx.fill();
    }

    ctx.translate(-node.x, -node.y);
  }
  ctx.restore();
}

/*}}}*/
/*{{{  redrawInspectorNode*/

function redrawInspectorNode() {

  const container     = document.getElementById('properties-container');
  container.innerHTML = '';
  const n             = selectedNode;

  if (!n)
    return;

  const velocityKnob = new SynthKnob(container, 'vel-knob', {
    label: 'VELOCITY',
    min: 0,
    max: 127,
    value: n.vel,
    defaultValue: NODE_VEL,
    onChange: (v) => { n.vel = v; redrawCanvas(); }
  });

  const channelKnob = new SynthKnob(container, 'chan-knob', {
    label: 'CHANNEL',
    min: 0,
    max: 15,
    value: n.chan,
    defaultValue: NODE_CHAN,
    sensitivity: 0.25,
    onChange: (v) => { n.chan = v; redrawCanvas(); }
  });
}

/*}}}*/

/*{{{  pointerdownCanvas*/

function pointerdownCanvas (e) {

  const rect = canvas.getBoundingClientRect();
  const x    = Math.max(0, e.clientX - rect.left);
  const y    = Math.max(0, e.clientY - rect.top);

  console.log('pointerdown', x, y);

  pointerdownNode = findNode(x,y);
  pointerdownX    = x;
  pointerdownY    = y;

  if (!pointerdownNode && primaryModifier(e)) {
    selectedNode = createNode(x, y);
    redrawCanvas();
    redrawInspectorNode();
  }
  else if (pointerdownNode && pointerdownNode != selectedNode) {
    selectedNode = pointerdownNode;
    redrawCanvas();
    redrawInspectorNode();
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

  console.log('pointerup', x, y);

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

  //console.log('pointermove', x, y);

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

