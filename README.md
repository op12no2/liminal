# Liminal

Web midi sequencer. In development. Progress cached here. Not released. But click below to preview:-

https://op12no2.github.io/liminal/liminal.html

### Notes

Liminal communicates with DAWs using Web MIDI. Currently it uses the first output port it finds. If successful the MIDI indicator will be on (5 pin DIN icon). When it's off, you can click it to try again or refresh the page. You'll get an alert that you need to allow MIDI access.  

On macOS, the IAC (Inter-Application Communication) driver is built into the system as part of core MIDI. It's always available but you need to enable it in Audio MIDI Setup. It creates virtual MIDI buses that DAWs and Liminal can connect to. Note that Safari will not connect to MIDI, you need to use Chrome or Firefox for example.

On Windows, there's no equivalent built-in virtual MIDI driver, so you need third-party software like loopMIDI (easiest) or virtualMIDI to create virtual MIDI ports. In Bitwig you'll see loopMIDI as a controller.

https://www.tobias-erichsen.de/software.html - loopMIDI and virtualMIDI

Linux is more like macOS - it has ALSA (Advanced Linux Sound Architecture) built into the kernel, which includes virtual MIDI port capabilities. You can create virtual MIDI ports with snd-virmidi kernel module or use ALSA sequencer ports directly. Or use JACK (JACK Audio Connection Kit), which has excellent MIDI routing built in. JACK lets you create virtual MIDI connections between applications graphically, similar to how you'd patch hardware.

### Keyboard UI

On Windows read Cmd as Ctrl.

- Cmd+Click in empty space - drop a note.
- Click a note - select a note and show the note UI.
- Cmd+Click on a note and drag to another note - add a link between the notes.
- Cmd+Click on a note and drag to empty space - add a new note and link.
- Click a link - select a link and show link UI. When notes are interlinked you can tell which link is selected by the highlighted arrow.
- Delete/Backspace - delete selected note/link.
- Double-click a note - toggle between that note being a lead-in note or a regular note. Lead-in notes start the sequence. There can be more than one.

### Link UI

- Weight - specifies the likelyhood that the link is chosen. If a note has 2 outgoing links with weights 1 and 4 the latter is 4 times more likely to be chosen. Only one link is chosen (unless some links have weight=always).
- Weight=always - always play the associated note. Weight is then applied to remaining links.
- Weight=never - WIP.

### References

- https://www.w3.org/TR/webmidi/
- https://www.w3.org/TR/webaudio-1.1/
- https://developer.mozilla.org/en-US/docs/Web/API/SVG_API
- https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
- https://midi.org


