function seqStart() {

  if (running || nodes.length == 0)
    return;

  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContext.resume();
  }

  activeBpm = 0;
  loopSum   = 0;
  loopNum   = 0;

  for (let i=0; i < NODE_POOL; i++) {
    notes[i].state = IDLE;
  }

  let numLeadins = 0;
  let now        = audioContext.currentTime;

  for (let i=0; i < nodes.length; i++) {
    const node = nodes[i];
    if (node.leadin) {
      const note = notes[numLeadins++];
      note.state = SCHEDULED;
      note.node  = node;
      performNode(now, node, note);
    }
  }

  if (numLeadins == 0) {
    setStatus('no lead-in notes');
    return;
  }

  btnPlay.turnOff();
  btnPlay.disable();
  btnStop.turnOn();
  btnStop.enable();

  running = true;

  seqLoop();

}

function seqStop() {

  console.log('bpm =', selectedBpm, 'budget(ms) =', budget, 'mean consumed fraction =', loopSum/loopNum, 'loops =', loopNum, 'nodes =', nodes.length);

  clearInterval(interval);

  running  = false;
  interval = null;

  btnPlay.turnOn();
  btnPlay.enable();
  btnStop.turnOff();
  btnStop.disable();

  for (let i=0; i < NODE_POOL; i++) {
  
    const n = notes[i];
  
    if (n.state == GATED) {
      midiNoteOff(n.chan, n.pitch, 0)
      n.node.gated = false;
    }
  
  }
  
  redrawCanvas();

}

function seqLoop() {

  if (activeBpm != selectedBpm) {
  
    clearInterval(interval);
  
    activeBpm = selectedBpm;
    budget    = Math.floor((60/selectedBpm/4/2) * 1000);  // 1/32 note
    interval  = setInterval(seqLoop, budget);
  
    console.log('bpm =', selectedBpm, 'budget(ms) =', budget);
  
  }
  
  const now = audioContext.currentTime;

  for (let i=0; i < NODE_POOL; i++) {

    const n = notes[i];

    if (n.state == IDLE)
      continue;

    if (n.state == GATED) {
            
      if (n.finishAt <= now) {
      
        if (n.duration > 0)
          midiNoteOff(n.chan, n.pitch, 0);
      
        n.state      = RESTING;
        n.node.gated = false;
      
      }
          
    }

    if (n.state == SCHEDULED) {
            
      if (n.startAt <= now) {
      
        midiNoteOn(n.chan, n.pitch, n.vel);
      
        n.state      = GATED;
        n.node.gated = true;
      
      }
      
    }

    if (n.state == RESTING) {
            
      if (n.restUntil <= now) {
      
        n.state = PLAYED;
      
      }
      
    }

    if (n.state == PLAYED) {
      
      n.state = IDLE;
      scheduleNextOr(now, n);

    }
  }

  redrawCanvas();

  loopSum += ((audioContext.currentTime - now) * 1000) / budget;
  loopNum++;

}

function scheduleNextOr(now, note) {

  const lastNode = note.node;

  if (lastNode.links.length == 0)
    return;

  const r        = Math.floor(Math.random() * lastNode.links.length);
  const nextNode = lastNode.links[r];
  const nextNote = getIdleNote();
      
  if (nextNote) {
      
    nextNote.state = SCHEDULED;
    nextNote.node  = nextNode;
      
    performNode(now, nextNode, nextNote);
      
  }
}

function getIdleNote() {

  for (let i=0; i < NODE_POOL; i++) {

    if (notes[i].state == IDLE) {
      return notes[i];
    }

  }

  return null;

}
