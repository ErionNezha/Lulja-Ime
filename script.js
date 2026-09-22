/* LULJA IME 🌹 — starfield + interactive falling petals */
(function () {
    'use strict';

    /* ---------- twinkling stars ---------- */
    var starsBox = document.getElementById('stars');
    var STAR_COUNT = 90;

    for (var i = 0; i < STAR_COUNT; i++) {
        var star = document.createElement('span');
        star.className = 'star';
        star.style.left = (Math.random() * 100) + '%';
        star.style.top = (Math.random() * 70) + '%';
        var size = 1 + Math.random() * 2.2;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDelay = (Math.random() * 3.5) + 's';
        star.style.animationDuration = (2.4 + Math.random() * 3) + 's';
        starsBox.appendChild(star);
    }

    /* ---------- falling petals ---------- */
    var petalsBox = document.getElementById('petals');
    var PALETTE = ['#ff5e8a', '#ffb3c6', '#c77dff', '#f6e27a', '#e0345f', '#ff8fab'];

    function dropPetal(x, burst) {
        var petal = document.createElement('span');
        petal.className = 'petal';

        var size = 1.4 + Math.random() * 2.2; // vmin
        petal.style.width = size + 'vmin';
        petal.style.height = (size * 1.25) + 'vmin';
        petal.style.background = 'linear-gradient(135deg, ' +
            PALETTE[(Math.random() * PALETTE.length) | 0] + ', ' +
            PALETTE[(Math.random() * PALETTE.length) | 0] + ')';

        var startX = (typeof x === 'number') ? x : Math.random() * window.innerWidth;
        petal.style.left = startX + 'px';
        petal.style.setProperty('--sway', ((Math.random() - 0.5) * 220) + 'px');
        petal.style.animationDuration = (5 + Math.random() * 5) + 's';

        if (burst) {
            // petals burst upward briefly before falling
            petal.style.top = 'auto';
            petal.style.bottom = (Math.random() * 30) + 'vh';
        }

        petalsBox.appendChild(petal);
        petal.addEventListener('animationend', function () {
            petal.remove();
        });
    }

    // gentle ambient petal rain
    setInterval(function () {
        if (document.hidden) return;
        dropPetal();
    }, 1400);

    // click / tap → burst of petals at pointer
    var lastBurst = 0;
    function burst(clientX) {
        var now = Date.now();
        if (now - lastBurst < 350) return; // throttle
        lastBurst = now;
        var n = 10 + ((Math.random() * 8) | 0);
        for (var i = 0; i < n; i++) {
            dropPetal(clientX + (Math.random() - 0.5) * 160, true);
        }
    }

    document.addEventListener('pointerdown', function (e) {
        // ignore clicks on the credit link
        if (e.target.closest && e.target.closest('a')) return;
        burst(e.clientX);
    });
})();
