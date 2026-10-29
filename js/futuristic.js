/**
 * BK PARADISE & BK DEVOPS // FUTURISTIC COMMAND DECK ENGINE
 * Interactive Canvas, Live Telemetry & Cyber HUD Controls
 */
(function() {
  'use strict';

  // 1. Inject Canvas for Particle Constellation
  function initCyberCanvas() {
    if (document.getElementById('cyber-canvas')) return;

    var canvas = document.createElement('canvas');
    canvas.id = 'cyber-canvas';
    document.body.prepend(canvas);

    var ctx = canvas.getContext('2d');
    var width, height;
    var particles = [];
    var maxParticles = window.innerWidth < 768 ? 25 : 55;
    var mouse = { x: null, y: null, radius: 120 };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    window.addEventListener('mousemove', function(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', function() {
      mouse.x = null;
      mouse.y = null;
    });

    function Particle() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.8 + 0.8;
      this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(157, 0, 255, ';
    }

    Particle.prototype.draw = function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.7)';
      ctx.fill();
    };

    Particle.prototype.update = function() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interactivity
      if (mouse.x && mouse.y) {
        var dx = mouse.x - this.x;
        var dy = mouse.y - this.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          var angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * 1.5;
          this.y -= Math.sin(angle) * 1.5;
        }
      }
      this.draw();
    };

    for (var i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < particles.length; i++) {
        particles[i].update();
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(0, 240, 255, ' + (0.15 * (1 - dist / 110)) + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // 2. Real-time Telemetry updates
  function initTelemetry() {
    var pingEl = document.getElementById('cyber-ping');
    var timeEl = document.getElementById('cyber-time');

    function updateTelemetry() {
      if (pingEl) {
        var simulatedPing = Math.floor(Math.random() * 8) + 18;
        pingEl.textContent = simulatedPing + 'ms';
      }
      if (timeEl) {
        var now = new Date();
        var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        var slDate = new Date(utc + (3600000 * 5.5)); // Sri Lanka UTC+5:30
        var hours = String(slDate.getHours()).padStart(2, '0');
        var mins = String(slDate.getMinutes()).padStart(2, '0');
        var secs = String(slDate.getSeconds()).padStart(2, '0');
        timeEl.textContent = hours + ':' + mins + ':' + secs + ' (UTC+5:30)';
      }
    }
    updateTelemetry();
    setInterval(updateTelemetry, 1000);
  }

  // 3. Smooth Command Dock Navigation
  function initDockNavigation() {
    var dockLinks = document.querySelectorAll('.cyber-dock-item');
    dockLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          var targetElem = document.querySelector(targetId);
          if (targetElem) {
            // Check if Smooth-Scrollbar is active
            var scrollFrame = document.querySelector('#scrollbar');
            var scrollbarInstance = window.Scrollbar ? window.Scrollbar.get(scrollFrame) : null;
            if (scrollbarInstance) {
              scrollbarInstance.scrollIntoView(targetElem, { damping: 0.1, offsetTop: 20 });
            } else {
              targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            dockLinks.forEach(function(l) { l.classList.remove('active'); });
            this.classList.add('active');
          }
        }
      });
    });
  }

  // 4. Subtle Cyber Click Ring
  function initClickWave() {
    window.addEventListener('click', function(e) {
      var ring = document.createElement('div');
      ring.style.position = 'fixed';
      ring.style.left = (e.clientX - 20) + 'px';
      ring.style.top = (e.clientY - 20) + 'px';
      ring.style.width = '40px';
      ring.style.height = '40px';
      ring.style.borderRadius = '50%';
      ring.style.border = '1px solid #00F0FF';
      ring.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.8)';
      ring.style.pointerEvents = 'none';
      ring.style.zIndex = '999999';
      ring.style.transition = 'all 0.5s ease-out';
      document.body.appendChild(ring);

      requestAnimationFrame(function() {
        ring.style.transform = 'scale(2.5)';
        ring.style.opacity = '0';
      });

      setTimeout(function() {
        if (ring.parentNode) ring.parentNode.removeChild(ring);
      }, 550);
    });
  }

  // Initialize all futuristic modules
  function initFuturisticSuite() {
    initCyberCanvas();
    initTelemetry();
    initDockNavigation();
    initClickWave();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFuturisticSuite);
  } else {
    initFuturisticSuite();
  }

  document.addEventListener('swup:contentReplaced', function() {
    initDockNavigation();
  });
})();
