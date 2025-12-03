class Transport {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.onPlay = options.onPlay || (() => {});
    this.onPause = options.onPause || (() => {});
    this.onStop = options.onStop || (() => {});

    this.isPlaying = false;
    this.isPaused = false;
    this.positionText = options.positionText || '1.1.01';

    this.render();
    this.attachEvents();
  }

  render() {
    this.container.innerHTML = `
      <div class="transport-bar">
        <div class="transport-controls">
          ${this.createTransportButton('play', this.createPlayIcon())}
          ${this.createTransportButton('pause', this.createPauseIcon())}
          ${this.createTransportButton('stop', this.createStopIcon())}
        </div>

        <div class="transport-display">
          <div class="position-display">${this.positionText}</div>
        </div>
      </div>
    `;

    // Cache element references
    this.playBtn = this.container.querySelector('.transport-btn-play');
    this.pauseBtn = this.container.querySelector('.transport-btn-pause');
    this.stopBtn = this.container.querySelector('.transport-btn-stop');
    this.positionDisplay = this.container.querySelector('.position-display');
  }

  createTransportButton(id, icon) {
    return `
      <div class="transport-btn transport-btn-${id}">
        <svg width="30" height="30" viewBox="0 0 30 30">
          <defs>
            <!-- Button body gradient -->
            <radialGradient id="btnBody-${id}" cx="40%" cy="40%">
              <stop offset="0%" style="stop-color:#3a3a3a" />
              <stop offset="70%" style="stop-color:#252525" />
              <stop offset="100%" style="stop-color:#1a1a1a" />
            </radialGradient>

            <!-- Button highlight -->
            <radialGradient id="btnHighlight-${id}" cx="35%" cy="35%">
              <stop offset="0%" style="stop-color:#555;stop-opacity:0.7" />
              <stop offset="100%" style="stop-color:#222;stop-opacity:0" />
            </radialGradient>
          </defs>

          <!-- Button body -->
          <circle cx="15" cy="15" r="13" fill="url(#btnBody-${id})" />
          <circle cx="15" cy="15" r="13" fill="url(#btnHighlight-${id})" />

          <!-- Icon -->
          ${icon}
        </svg>
      </div>
    `;
  }

  createPlayIcon() {
    return `
      <path class="btn-icon" d="M 11 9 L 11 21 L 21 15 Z"
            fill="#555" stroke="none" />
    `;
  }

  createPauseIcon() {
    return `
      <g class="btn-icon">
        <rect x="10.5" y="9" width="3" height="12" rx="1" fill="#555" />
        <rect x="16.5" y="9" width="3" height="12" rx="1" fill="#555" />
      </g>
    `;
  }

  createStopIcon() {
    return `
      <rect class="btn-icon" x="10.5" y="10.5" width="9" height="9" rx="1" fill="#555" />
    `;
  }

  attachEvents() {
    this.playBtn.addEventListener('click', () => this.handlePlay());
    this.pauseBtn.addEventListener('click', () => this.handlePause());
    this.stopBtn.addEventListener('click', () => this.handleStop());
  }

  handlePlay() {
    this.isPlaying = true;
    this.isPaused = false;
    this.updateButtonStates();
    this.onPlay();
  }

  handlePause() {
    if (!this.isPlaying) return;

    this.isPaused = true;
    this.isPlaying = false;
    this.updateButtonStates();
    this.onPause();
  }

  handleStop() {
    this.isPlaying = false;
    this.isPaused = false;
    this.setPosition('1.1.01');
    this.updateButtonStates();
    this.onStop();
  }

  updateButtonStates() {
    // Update icon colors based on state
    const playIcon = this.playBtn.querySelector('.btn-icon');
    const pauseIcon = this.pauseBtn.querySelector('.btn-icon');
    const stopIcon = this.stopBtn.querySelector('.btn-icon');

    if (this.isPlaying) {
      playIcon.setAttribute('fill', '#4aff4a');
      pauseIcon.setAttribute('fill', '#555');
      stopIcon.setAttribute('fill', '#555');
    }
    else if (this.isPaused) {
      playIcon.setAttribute('fill', '#555');
      pauseIcon.setAttribute('fill', '#ffa500');
      stopIcon.setAttribute('fill', '#555');
    }
    else {
      playIcon.setAttribute('fill', '#555');
      pauseIcon.setAttribute('fill', '#555');
      stopIcon.setAttribute('fill', '#555');
    }
  }

  setPosition(text) {
    this.positionText = text;
    this.positionDisplay.textContent = text;
  }
}
