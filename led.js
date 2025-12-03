class LED {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.isActive = options.isActive ?? false;
    
    this.render();
  }
  
  render() {
    this.container.innerHTML = `
      <div class="led-indicator ${this.isActive ? 'led-active' : 'led-inactive'}"></div>
    `;
    
    this.ledElement = this.container.querySelector('.led-indicator');
  }
  
  setActive(active) {
    this.isActive = active;
    if (active) {
      this.ledElement.classList.remove('led-inactive');
      this.ledElement.classList.add('led-active');
    }
    else {
      this.ledElement.classList.remove('led-active');
      this.ledElement.classList.add('led-inactive');
    }
  }
  
  toggle() {
    this.setActive(!this.isActive);
  }
}
