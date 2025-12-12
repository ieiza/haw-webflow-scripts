(function(canvasId) {

    // =================================================================
    // **A. FRAMEWORK UTILITIES & MATH**
    // =================================================================

    const $ = {};
    $.PI = Math.PI;
    $.TAU = $.PI * 2;
    $.E = Math.E;

    const random = (min, max = 0) => {
        if (min instanceof Array) return min[~~(Math.random() * min.length)];
        if (max === 0) [min, max] = [0, min];
        return (max - min) * Math.random() + min;
    };
    const clamp = (val, min = 0, max = 1) => Math.max(min, Math.min(max, val));
    const lerp = (a, b, t) => a + (b - a) * clamp(t);

    const sin = Math.sin;
    const cos = Math.cos;

    // Ease Functions
    const ease = {
        elastic: {
            out: (t, b, c, d, a = 0, p = 0) => {
                if (t == 0) return b;
                if ((t /= d) == 1) return b + c;
                if (!p) p = d * .3;
                let s;
                if (!a || a < Math.abs(c)) {
                    a = c;
                    s = p / 4;
                } else {
                    s = p / $.TAU * Math.asin(c / a);
                }
                return (a * Math.pow(2, -10 * t) * sin((t * d - s) * $.TAU / p) + c + b);
            }
        }
    };

    // Vector Class
    class Vector {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        set(v) {
            if (v.x != null) {
                this.x = v.x;
                this.y = v.y;
            } else {
                this.x = v;
                this.y = v;
            }
            return this;
        }
        mag() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        add(v) {
            this.x += v.x;
            this.y += v.y;
            return this;
        }
        lerp(v, t) {
            this.x = lerp(this.x, v.x, t);
            this.y = lerp(this.y, v.y, t);
            return this;
        }
        // Static methods
        static fa(angle, magnitude = 1) {
            return new Vector(cos(angle) * magnitude, sin(angle) * magnitude);
        }
    }


    // =================================================================
    // **B. CANVAS CONTEXT SETUP & MAIN LOOP**
    // =================================================================

    let canvas, ctx, canvasSize, centered;
    let raf;
    let isDrawing = false;
    let lastTime = 0;

    const canvasOptions = {
        autoClear: true, centered: true, drawAndStop: false
    };

    const init = () => {
        canvas = document.getElementById(canvasId);
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        centered = canvasOptions.centered;

        resize();
        
        if (typeof setup === 'function') {
            setup();
        }

        if (!canvasOptions.drawAndStop) {
            drawLoop(0);
        }
    };

    const resize = () => {
        const parent = canvas.parentElement;
        const w = parent.offsetWidth;
        const h = parent.offsetHeight;
        
        canvas.width = w;
        canvas.height = h;

        canvasSize = new Vector(w, h);
        if (centered) {
            ctx.translate(w / 2, h / 2);
        }
    };

    window.addEventListener('resize', resize);


    const drawLoop = (e) => {
        if (isDrawing) return;
        isDrawing = true;
        
        const dt = e - lastTime;
        lastTime = e;

        if (canvasOptions.autoClear) {
            ctx.save();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (centered) {
                ctx.translate(canvas.width / 2, canvas.height / 2);
            }
            ctx.restore();
        }
        
        if (typeof draw === 'function') {
            draw(e * 0.001); // Pass time in seconds
        }

        isDrawing = false;
        
        if (!canvasOptions.drawAndStop) {
            raf = requestAnimationFrame(drawLoop);
        }
    };

    // Canvas context wrappers
    const beginPath = () => ctx.beginPath();
    const circle = (x, y, r) => ctx.arc(x, y, r, 0, $.TAU);
    const fill = () => ctx.fill();


    // =================================================================
    // **C. YOUR PARTICLE LOGIC (Tiling, Shapes, Lime Color)**
    // =================================================================

    class Particle {
        pos = new Vector();
        targetPos = Vector.fa(random($.TAU), canvasSize.mag() / 2);
        lastPick = -Infinity;
        moves = 0;
        d = 2000;
        t1a = random(0.5, 1.25);
        t2a = random(0.5, 1.25);
        t1p = random(0.2, 0.5);
        t2p = random(0.2, 0.5);
    }

    const particles = [];

    const setup = function() { // Local setup
        if (!canvasSize) return;
        
        // INCREASE PARTICLE COUNT FOR FULL COVERAGE (500 particles)
        for(let i = 0; i < 500; i++) { 
            const p = new Particle();
            particles.push(p);
        }
    };

    const draw = function(e) { // Local draw
        if (!ctx) return;
        
        // Set the color for ALL particles
        ctx.fillStyle = '#A1FD29'; // LIME GREEN COLOR
        
        particles.forEach((p, i) => {
            // Particle movement logic
            if(e - p.lastPick > p.d * 0.001) {
                const t = i / particles.length;
                p.lastPick = e;
                p.pos.set(p.targetPos);
                
                // --- NEW TILING AND FORMATION LOGIC ---
                if(p.moves % 4 === 3) {
                    // 1. STAR PATTERN (Scales to canvas size)
                    const numPoints = 5;
                    const pointAngle = $.TAU / numPoints;
                    const innerRadius = canvasSize.x * 0.2;
                    const outerRadius = canvasSize.x * 0.4;
                    
                    const pointIndex = Math.floor(i / (particles.length / (numPoints * 2)));
                    
                    let angle;
                    let radius;

                    if (pointIndex % 2 === 0) {
                        angle = pointIndex * pointAngle / 2 + $.PI / 2;
                        radius = outerRadius;
                    } else {
                        angle = pointIndex * pointAngle / 2 + $.PI / 2;
                        radius = innerRadius;
                    }
                    
                    p.targetPos.lerp(Vector.fa(angle + e * 0.1, radius), 0.95);
                    
                }
                else if(p.moves % 3 === 2) {
                    // 2. SQUARE PATTERN (Scales to canvas size)
                    const size = Math.min(canvasSize.x, canvasSize.y) * 0.8;
                    const halfSize = size / 2;
                    let x = 0;
                    let y = 0;
                    
                    const side = Math.floor(i / (particles.length / 4));
                    const positionOnSide = (i % (particles.length / 4)) / (particles.length / 4);

                    if (side === 0) { // Top side
                        x = lerp(-halfSize, halfSize, positionOnSide);
                        y = -halfSize;
                    } else if (side === 1) { // Right side
                        x = halfSize;
                        y = lerp(-halfSize, halfSize, positionOnSide);
                    } else if (side === 2) { // Bottom side
                        x = lerp(halfSize, -halfSize, positionOnSide);
                        y = halfSize;
                    } else { // Left side
                        x = -halfSize;
                        y = lerp(halfSize, -halfSize, positionOnSide);
                    }
                    
                    p.targetPos.lerp(new Vector(x, y), 0.95);
                    
                }
                else if(p.moves % 5 === 4) {
                    // 3. RECTANGULAR TILING PATTERN (New Formation)
                    const columns = 25;
                    const rows = 20;
                    
                    const col = i % columns;
                    const row = Math.floor(i / columns) % rows;

                    const tileWidth = canvasSize.x / columns;
                    const tileHeight = canvasSize.y / rows;
                    
                    const targetX = lerp(-canvasSize.x / 2, canvasSize.x / 2, col / columns) + tileWidth / 2;
                    const targetY = lerp(-canvasSize.y / 2, canvasSize.y / 2, row / rows) + tileHeight / 2;
                    
                    p.targetPos.lerp(new Vector(targetX, targetY), 0.8);
                }
                else {
                    // 4. Default: Subtle random movement toward the center
                    p.targetPos.add(Vector.fa(random($.TAU), random(20, 50))) 
                    .lerp(new Vector(), random(0.1, 0.2));
                }
                // --- END TILING AND FORMATION LOGIC ---
                
                p.moves++;
            }
            
            const _t = clamp((e - p.lastPick) / (p.d * 0.001), 0, 1);
            const t1 = ease.elastic.out(_t, 0, 1, 1, p.t1a, p.t1p);
            const t2 = ease.elastic.out(_t, 0, 1, 1, p.t2a, p.t2p);
            
            // DRAWING (Drawing circles, if you want SVGs, use the previous code block)
            ctx.save();
            beginPath(); 
            circle(lerp(p.pos.x, p.targetPos.x, t1), lerp(p.pos.y, p.targetPos.y, t2), 10);
            fill();
            ctx.restore();
        });
    };

    // The IIFE is executed when the DOM is fully loaded, calling init()
    document.addEventListener('DOMContentLoaded', init); 

})('my-animation-canvas');
