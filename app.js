let currentMode = 'transmuted'; // 'legacy' or 'transmuted'
let currentWorkload = 50; // Millions
let latencyChartInstance = null;

// Initialize when DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    initChart();
    updateDashboard();
    recalcESG();
    startLogStream();
});

function scrollToEngine() {
    document.getElementById('live-engine').scrollIntoView({ behavior: 'smooth' });
}

function setMode(mode) {
    currentMode = mode;
    document.getElementById('btn-legacy').classList.toggle('active', mode === 'legacy');
    document.getElementById('btn-transmuted').classList.toggle('active', mode === 'transmuted');
    updateDashboard();
    addTerminalLog(mode === 'transmuted' 
        ? `[HOT-SWAP] AETERNA Transmutation Layer ENGAGED. Hot-paths routed to AVX-512 Bare-Metal.`
        : `[HOT-SWAP] Transmutation Layer BYPASSED. Fallback to Legacy Heap & Python/Java Interpreter.`
    );
}

function updateWorkload(val) {
    currentWorkload = parseInt(val);
    document.getElementById('load-val').innerText = `${currentWorkload.toLocaleString()},000,000 Ops`;
    updateDashboard();
}

function updateDashboard() {
    const isTrans = currentMode === 'transmuted';
    const scale = currentWorkload / 50.0;

    // Power
    const power = isTrans ? Math.round(42 * scale) : Math.round(850 * scale);
    document.getElementById('val-power').innerHTML = `${power} <span class="unit">Watts</span>`;
    document.getElementById('bar-power').style.width = isTrans ? `${Math.min(100, (power / 850) * 100)}%` : '90%';
    document.getElementById('bar-power').style.background = isTrans ? 'var(--accent-emerald)' : 'var(--accent-rose)';
    document.getElementById('badge-power').innerText = isTrans ? '-95% Cut' : 'HIGH DRAIN';
    document.getElementById('badge-power').style.background = isTrans ? 'rgba(16, 185, 129, 0.15)' : 'rgba(244, 63, 94, 0.15)';
    document.getElementById('badge-power').style.color = isTrans ? 'var(--accent-emerald)' : 'var(--accent-rose)';

    // CO2
    const co2 = isTrans ? (0.021 * scale).toFixed(3) : (0.425 * scale).toFixed(3);
    document.getElementById('val-co2').innerHTML = `${co2} <span class="unit">g / sec</span>`;
    document.getElementById('bar-co2').style.width = isTrans ? `${Math.min(100, (co2 / 0.425) * 100)}%` : '85%';
    document.getElementById('bar-co2').style.background = isTrans ? 'var(--accent-cyan)' : 'var(--accent-rose)';
    document.getElementById('badge-co2').innerText = isTrans ? 'Near Zero' : 'UNSUSTAINABLE';
    document.getElementById('badge-co2').style.color = isTrans ? 'var(--accent-cyan)' : 'var(--accent-rose)';

    // Latency
    const latency = isTrans ? (110.7 * scale).toFixed(1) : (21516.3 * scale).toFixed(1);
    document.getElementById('val-latency').innerHTML = `${Number(latency).toLocaleString()} <span class="unit">ms</span>`;
    document.getElementById('bar-latency').style.width = isTrans ? '5%' : '100%';
    document.getElementById('bar-latency').style.background = isTrans ? 'var(--accent-purple)' : 'var(--accent-rose)';
    document.getElementById('badge-latency').innerText = isTrans ? '194x Speedup' : 'BLOCKED';
    document.getElementById('badge-latency').style.color = isTrans ? 'var(--accent-purple)' : 'var(--accent-rose)';

    // Nodes
    const nodes = isTrans ? 1 : Math.round(195 * scale);
    document.getElementById('val-nodes').innerHTML = `${nodes} <span class="unit">${isTrans ? 'Micro-Node' : 'Servers'}</span>`;
    document.getElementById('bar-nodes').style.width = isTrans ? '2%' : '100%';
    document.getElementById('bar-nodes').style.background = isTrans ? 'var(--accent-blue)' : 'var(--accent-rose)';
    document.getElementById('badge-nodes').innerText = isTrans ? '1 Rack Unit' : 'Sprawl Alert';

    updateChartData();
}

function initChart() {
    const ctx = document.getElementById('latencyChart').getContext('2d');
    
    latencyChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['T-5s', 'T-4s', 'T-3s', 'T-2s', 'T-1s', 'NOW'],
            datasets: [
                {
                    label: 'Legacy Compute (ms)',
                    data: [21500, 21800, 21400, 21600, 21500, 21516],
                    borderColor: '#f43f5e',
                    backgroundColor: 'rgba(244, 63, 94, 0.1)',
                    borderWidth: 2,
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'AETERNA Transmuted (ms)',
                    data: [112, 109, 110, 111, 108, 110],
                    borderColor: '#00f0ff',
                    backgroundColor: 'rgba(0, 240, 255, 0.2)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#94a3b8', font: { family: 'Outfit', size: 12 } }
                }
            },
            scales: {
                y: {
                    type: 'logarithmic',
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#64748b', font: { family: 'JetBrains Mono' } }
                },
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)' },
                    ticks: { color: '#64748b', font: { family: 'JetBrains Mono' } }
                }
            }
        }
    });
}

function updateChartData() {
    if (!latencyChartInstance) return;
    const scale = currentWorkload / 50.0;
    const isTrans = currentMode === 'transmuted';

    if (isTrans) {
        latencyChartInstance.data.datasets[1].data = [112 * scale, 109 * scale, 110 * scale, 111 * scale, 108 * scale, 110.7 * scale];
    } else {
        latencyChartInstance.data.datasets[0].data = [21500 * scale, 21800 * scale, 21400 * scale, 21600 * scale, 21500 * scale, 21516 * scale];
    }
    latencyChartInstance.update();
}

function triggerWorkloadBurst() {
    const btn = document.getElementById('trigger-burst');
    btn.innerText = 'Transmuting Burst...';
    btn.disabled = true;

    addTerminalLog(`[BURST TRIGGER] Ingesting 50M Tensor payload...`);
    
    setTimeout(() => {
        addTerminalLog(`[KERNEL DISPATCH] AVX-512 SIMD Vectorization active on 16 Hardware Threads.`);
        addTerminalLog(`[EXECUTION SUCCESS] 50M records collapsed in 110.76ms. Checksum: 157646480.00 -> 0.0000 Entropy.`);
        btn.innerText = 'Inject 50M Tensor Burst';
        btn.disabled = false;
    }, 600);
}

function addTerminalLog(msg) {
    const body = document.getElementById('term-logs');
    const line = document.createElement('div');
    const time = new Date().toTimeString().split(' ')[0];
    line.className = 'log-line ' + (msg.includes('SUCCESS') ? 'success' : msg.includes('HOT-SWAP') ? 'accent' : 'info');
    line.innerText = `[${time}] ${msg}`;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
}

function startLogStream() {
    const sampleLogs = [
        "eBPF filter intercepted 1,420 SQL deserialization calls -> Transmuted to FlatBuffers",
        "GC Pressure neutralized: zero heap alloc detected in hot path",
        "Memory bandwidth sustained at 3.61 GB/s cache-locality",
        "ESG telemetry sync: Carbon reduction token signed",
        "Hardware core 0-3 pinned: Latency jitter reduced to < 0.02ms"
    ];

    setInterval(() => {
        const rand = sampleLogs[Math.floor(Math.random() * sampleLogs.length)];
        addTerminalLog(rand);
    }, 4500);
}

function recalcESG() {
    const servers = parseFloat(document.getElementById('calc-servers').value) || 100;
    const watts = parseFloat(document.getElementById('calc-watts').value) || 500;
    const costKwh = parseFloat(document.getElementById('calc-cost').value) || 0.22;
    const gridCo2 = parseFloat(document.getElementById('calc-grid').value) || 475; // g/kWh

    // Calculations
    const baselineKw = (servers * watts) / 1000.0;
    const transmutedKw = (servers / 195.0) * (watts * 0.15) / 1000.0; // 195x server collapse + 85% lower per-node draw
    const savedKw = Math.max(0, baselineKw - transmutedKw);

    const hoursPerYear = 8760;
    const savedKwhYear = savedKw * hoursPerYear;
    const savedMwhYear = (savedKwhYear / 1000.0).toFixed(1);

    const savedCo2Tons = ((savedKwhYear * gridCo2) / 1_000_000.0).toFixed(1);
    const savedMoney = Math.round(savedKwhYear * costKwh);
    const consolidatedServers = Math.max(1, Math.ceil(servers / 195));

    document.getElementById('res-kwh').innerText = `${Number(savedMwhYear).toLocaleString()} MWh / yr`;
    document.getElementById('res-co2').innerText = `${Number(savedCo2Tons).toLocaleString()} Metric Tons`;
    document.getElementById('res-money').innerText = `$${savedMoney.toLocaleString()} / yr`;
    document.getElementById('res-servers').innerText = `${servers} Servers ➔ ${consolidatedServers} Micro-Node${consolidatedServers > 1 ? 's' : ''}`;
}
