
let midiOut = null;

/*{{{  midiInit*/

async function midiInit() {
  try {
    const access = await navigator.requestMIDIAccess();

    // Find first output port
    const outputs = Array.from(access.outputs.values());
    if (outputs.length === 0) {
      console.warn('No MIDI outputs available');
      return null;
    }

    console.log('Connected to:', outputs[0].name);
    return outputs[0];
  }
  catch (error) {
    console.error('MIDI access failed:', error);
    return null;
  }
}

/*}}}*/
/*{{{  midiStart*/

function midiStart(led) {
  midiInit().then(output => {
    midiOut = output;
    led.setActive(true);
    console.log(midiOut);
  });
}

/*}}}*/
/*{{{  midiNoteOn/Off*/

function midiNoteOn(channel, pitch, velocity) {
  if (!midiOut)
    return;
  const status = 0x90 | (channel & 0x0F);
  midiOut.send([status, pitch & 0x7F, velocity & 0x7F]);
}

function midiNoteOff(channel, pitch, velocity) {
  if (!midiOut)
    return;
  const status = 0x80 | (channel & 0x0F);
  midiOut.send([status, pitch & 0x7F, velocity & 0x7F]);
}

/*}}}*/
/*{{{  midiPreview*/

function previewNote(channel, pitch, velocity) {
  midiNoteOn(channel, pitch, velocity);
  midiNoteOff(channel, pitch, 0);
}

/*}}}*/

