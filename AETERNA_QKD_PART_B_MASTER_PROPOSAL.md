# AETERNA-QKD: PART B — TECHNICAL PROPOSAL
## Next-Generation Quantum Key Distribution and High-Throughput Photon Routing for EuroHPC Supercomputing Backbones and Critical Infrastructure

* **Call:** HORIZON-JU-EUROHPC-2026-NQKD-12  
* **Topic:** HORIZON-JU-EUROHPC-2026-NQKD-12-01 (Next-Generation QKD Systems)  
* **Type of Action:** HORIZON-JU-RIA (Research and Innovation Action)  
* **Proposal Acronym:** AETERNA-QKD  
* **Draft Proposal ID:** SEP-211377138  
* **Duration:** 36 Months  
* **Total Requested EU Contribution:** €8,000,000.00 (100% Funding Rate)  
* **Target TRL Evolution:** TRL 4 (Laboratory Validated) ➔ TRL 7 (Operational Environment Demonstrated)  

---

### CONSORTIUM PARTNERS & BENEFICIARIES:

| No. | Participant Legal Name | Short Name | Country | Key Role & Work Package Leadership |
|:---:|:---|:---:|:---:|:---|
| **1** | **AETERNA** *(Coordinator)* | **AETERNA** | 🇧🇬 BG | Overall Coordination, Core Quantum Architecture, Pomorie Maritime Gateway (Lead WP1, WP2, WP5, WP7) |
| **2** | **LUDWIG-MAXIMILIANS-UNIVERSITAET MUENCHEN** | **LMU** | 🇩🇪 DE | Quantum Optics, Photon Security, Secret Key Rate (SKR) Optimization (Lead WP3) |
| **3** | **BARCELONA SUPERCOMPUTING CENTER (BSC-CNS)** | **BSC** | 🇪🇸 ES | EuroHPC Supercomputing Interconnect, MareNostrum Hybrid PQC Testbed (Lead WP4) |
| **4** | **NATIONAL INFRASTRUCTURES FOR RESEARCH AND TECHNOLOGY** | **GRNET** | 🇬🇷 EL | Cross-Border Balkan Quantum Corridor & Subsea Optical Field Pilot (Lead WP6) |

---

# SECTION 1: EXCELLENCE

## 1.1 Objectives and Ambition

### 1.1.1 Strategic Challenge & State-of-the-Art Baseline
Modern European digital sovereignty is threatened by the impending "Q-Day"—the moment quantum computing architectures (Shor’s & Grover’s algorithms) render legacy public-key cryptosystems (RSA-4096, ECC-384, Diffie-Hellman) obsolete. Furthermore, adversarial nation-state actors are executing **"Harvest Now, Decrypt Later" (HNDL)** surveillance, capturing encrypted European supercomputing data streams, critical subsea energy telemetry, and defense communications to decrypt them retrospectively.

Existing first-generation discrete-variable QKD (DV-QKD) systems deployed in isolated testbeds suffer from three severe technological bottlenecks:
1. **Low Secret Key Generation Rate (SKR):** Typically capped at < 50 kbps over metropolitan distances, creating severe I/O starvation when securing 400 Gbps / 800 Gbps EuroHPC interconnects.
2. **Distance & Fiber Attenuation Limits:** Exponential photon attenuation limits standard unrepeated fiber links to < 100 km, preventing regional cross-border coverage (> 300 km) without deploying vulnerable classical trusted relays.
3. **Lack of Native Network Orchestration (SDN):** First-generation QKD appliances operate as isolated point-to-point "black boxes" unable to dynamically renegotiate keys via Software-Defined Networking (SDN) or integrate seamlessly with Post-Quantum Cryptography (PQC) hybrid standards.

### 1.1.2 The AETERNA-QKD Breakthrough Objectives
AETERNA-QKD solves these roadblocks by engineering a sovereign, high-throughput Continuous-Variable (CV-QKD) and Twin-Field (TF-QKD) photonic routing platform tightly coupled with hybrid PQC primitives (ML-KEM / ML-DSA).

```
 ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 │                                   AETERNA-QKD ARCHITECTURAL TOPOLOGY                            │
 ├──────────────────────────────────────────────────────────────────────────────────────────────────┤
 │                                                                                                  │
 │   [BARCELONA SUPERCOMPUTING] ◄════════════════════════════════════════► [DISCOVERER / SOFIA]     │
 │    (MareNostrum 5 HPC Node)     EuroHPC Hybrid Quantum Interconnect      (Balkan Supercomputer)  │
 │              │                                                                      │            │
 │              │ (High-Rate CV-QKD > 1.2 Gbps)                                        │            │
 │              ▼                                                                      ▼            │
 │   [LMU MUNICH QUANTUM LAB]                                             [AETERNA POMORIE TERMINAL]│
 │   • Photon Squeezing / LO Sync                                         • Subsea Cable Sensor Bed │
 │   • Information-Theoretic Security                                     • Maritime Gateway Link   │
 │              │                                                                      │            │
 │              └──────────────────────────────┬───────────────────────────────────────┘            │
 │                                             ▼                                                    │
 │                             [GRNET S.A. CROSS-BORDER CORRIDOR]                                   │
 │                              Sofia ➔ Thessaloniki ➔ Athens Fiber                                 │
 │                              Twin-Field TF-QKD (> 350 km Span)                                   │
 └──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

#### Key Quantitative & Measurable Target KPIs:
* **KPI-1 (Gigabit Secret Key Rate):** Achieve sustained **SKR > 1.0 Gbps** over metropolitan distances (0–50 km) and **> 10 Mbps** at 150 km, representing a **100x improvement** over European baselines.
* **KPI-2 (Extended Regional Span > 350 km):** Deploy and validate Twin-Field TF-QKD across **> 350 km of continuous unrepeated fiber** connecting Bulgaria and Greece without intermediate trusted nodes.
* **KPI-3 (Subsea Fiber Noise Cancellation):** Demonstrate zero-downtime QKD synchronization over high-noise maritime subsea cables in the Black Sea with dynamic polarization tracking under sea-state vibration.
* **KPI-4 (EuroHPC Line-Rate Integration):** Native line-rate encapsulation into **400 Gbps/800 Gbps optical switches** via ETSI GS QKD 004 / 014 REST APIs and SDN orchestration controllers.
* **KPI-5 (Hybrid QKD-PQC Cryptographic Mesh):** Bit-for-bit mathematical equivalence and deterministic key ratcheting combining CV-QKD entropy with NIST PQC algorithms (ML-KEM-1024 and ML-DSA-87).

---

## 1.2 Methodology & Work Plan Structure

AETERNA-QKD executes across **7 tightly integrated Work Packages (WPs)** structured over 36 months, advancing the technology from TRL 4 (laboratory validated prototypes) to TRL 7 (full operational demonstration in live European critical infrastructures).

```
                                 ┌──────────────────────────────┐
                                 │     WP1: Consortium Mgmt     │
                                 │   & Ethics (AETERNA - BG)    │
                                 └──────────────┬───────────────┘
                                                │
                 ┌──────────────────────────────┴──────────────────────────────┐
                 ▼                                                             ▼
  ┌──────────────────────────────┐                              ┌──────────────────────────────┐
  │   WP2: Core Architecture &   │                              │   WP3: Quantum Optical Lab   │
  │   Transceiver (AETERNA)      │◄════════════════════════════►│  Validation (LMU MUNICH - DE)│
  └──────────────┬───────────────┘                              └──────────────┬───────────────┘
                 │                                                             │
                 ├──────────────────────────────┬──────────────────────────────┤
                 ▼                              ▼                              ▼
  ┌──────────────────────────────┐┌──────────────────────────────┐┌──────────────────────────────┐
  │ WP4: EuroHPC Integration     ││ WP5: Maritime Subsea Pilot   ││ WP6: Cross-Border Corridor   │
  │ & PQC (BSC CNS - ES)         ││ (AETERNA - Pomorie Terminal) ││ (GRNET S.A. - EL)            │
  └──────────────┬───────────────┘└──────────────┬───────────────┘└──────────────┬───────────────┘
                 │                               │                               │
                 └──────────────────────────────┼───────────────────────────────┘
                                                ▼
                                 ┌──────────────────────────────┐
                                 │ WP7: EuroQCI Standardization,│
                                 │ IPR & Exploitation (AETERNA) │
                                 └──────────────────────────────┘
```

---

# SECTION 2: IMPACT

## 2.1 Strategic Autonomy and European Leadership
AETERNA-QKD directly operationalizes the **EU Cybersecurity Strategy**, **Quantum Europe Strategy**, and **EuroHPC Joint Undertaking roadmap** by delivering:
1. **100% European Supply Chain:** Eliminates strategic dependency on US and Asian proprietary quantum components by utilizing indigenous European photonics, sovereign FPGA hardware, and open ETSI interfaces.
2. **Critical Infrastructure Immunity:** Fortifies power grids, financial transaction settlement networks (TARGET2), and naval defense corridors against future quantum-decryption attacks.
3. **Decarbonized Green Quantum Computing:** Incorporates AETERNA's Zero-Entropy runtime acceleration, reducing cooling and optical transponder power consumption by **80%** relative to legacy cryogenic-dependent quantum systems.

## 2.2 Exploitation, Standardization & Open Science
* **Open Science & B2B Ecosystem:** Core components of the AETERNA-EKO hybrid ecosystem (HUD interfaces, marketing, and non-sensitive system integrations) are published as Open Source at **[AETERNA-EKO Public Repository](https://github.com/papica777-eng/AETERNA-EKO)** to drive European B2B integration.
* **ETSI Standardization:** Direct contributions to ETSI ISG-QKD (interfaces 004, 014, 015) and ITU-T Study Group 17.
* **Commercialization Pathway:** AETERNA, LMU, BSC, and GRNET will license certified QKD transceivers to European telecom operators (A1, Vivacom, OTE, Telefonica) with a projected **€120M addressable EU market by 2030**.

---

# SECTION 3: QUALITY AND EFFICIENCY OF THE IMPLEMENTATION

## 3.1 Work Package Breakdown & Resources

### WP1: Project Management, Coordination & Open Science
* **Lead Beneficiary:** AETERNA (BG) | **Duration:** M01–M36 | **Budget:** €600,000
* **Objectives:** Consortium governance, financial tracking, periodic reporting to EuroHPC JU, data management plan (FAIR principles), gender equality monitoring.

### WP2: Core Quantum Photonic Transceiver Architecture & Engine
* **Lead Beneficiary:** AETERNA (BG) | **Duration:** M01–M30 | **Budget:** €2,000,000
* **Objectives:** Design and realization of high-bandwidth continuous-variable optical transceivers, zero-entropy error-reconciliation algorithms on hardware SIMD/FPGA.

### WP3: Photonic Physics, Squeezed States & SKR Optimization
* **Lead Beneficiary:** LMU MUNICH (DE) | **Duration:** M04–M32 | **Budget:** €2,000,000
* **Objectives:** Experimental validation of sub-shot-noise photonic squeezing, phase-noise cancellation, and rigorous information-theoretic security proofs against collective eavesdropping.

### WP4: EuroHPC Supercomputing Interface & Hybrid PQC Orchestration
* **Lead Beneficiary:** BSC CNS (ES) | **Duration:** M06–M36 | **Budget:** €1,800,000
* **Objectives:** Integration into MareNostrum 5 and EuroHPC node architectures, dynamic SDN key lifecycle management, hybrid ML-KEM/QKD microservice ratcheting.

### WP5: Pilot 1 & 2: Subsea Maritime Fiber & Energy Grid Telemetry
* **Lead Beneficiary:** AETERNA (BG) | **Duration:** M12–M36 | **Budget:** €800,000
* **Objectives:** Deployment of the coastal Black Sea quantum terminal in Pomorie; live fiber pilot securing subsea sensor communications and energy telemetry.

### WP6: Pilot 3 & 4: Cross-Border Balkan Quantum Corridor & Long-Haul Validation
* **Lead Beneficiary:** GRNET S.A. (EL) | **Duration:** M12–M36 | **Budget:** €1,600,000
* **Objectives:** Deployment of Twin-Field QKD over the > 350 km Sofia–Thessaloniki–Athens corridor; live high-capacity testbed demonstration with telecom operators.

### WP7: Standardization, EuroQCI Certification & Exploitation
* **Lead Beneficiary:** AETERNA (BG) | **Duration:** M18–M36 | **Budget:** €200,000
* **Objectives:** Certification roadmap with EU national cybersecurity agencies (BSI, ANSSI, BOSA), technology transfer, and commercial exploitation plans.

---

## 3.2 Deliverables and Milestones Summary

| D# | Deliverable Title | WP | Lead | Type | Dissem. | Due (Month) |
|:---|:---|:---:|:---:|:---:|:---:|:---:|
| **D1.1** | Detailed Project Management & Consortium Agreement | WP1 | AETERNA | R | SEN | M03 |
| **D2.1** | Continuous-Variable QKD Hardware Transceiver Spec (v1.0) | WP2 | AETERNA | DEM | PU | M12 |
| **D3.1** | Experimental SKR Optimization Report (> 1 Gbps Benchmark) | WP3 | LMU | R | PU | M18 |
| **D4.1** | EuroHPC SDN Orchestration & Hybrid PQC Software Module | WP4 | BSC | DEM | PU | M24 |
| **D5.1** | Pomorie Black Sea Subsea Quantum Gateway Operational Report | WP5 | AETERNA | DEM | PU | M30 |
| **D6.1** | Cross-Border > 350 km Fiber QKD Demonstration Final Report | WP6 | GRNET | DEM | PU | M34 |
| **D7.1** | Final EuroQCI Standardisation & Commercial Exploitation Plan | WP7 | AETERNA | R | PU | M36 |

---

## 3.3 Critical Risks and Mitigation Strategy

| Risk Description | WP | Level | Mitigation Action |
|:---|:---:|:---:|:---|
| **R1: Optical fiber chromatic dispersion on long spans (>300 km)** | WP3/WP6 | Medium | Implement LMU's adaptive digital phase tracking and local oscillator self-homodyne detection. |
| **R2: Subsea acoustic vibrations affecting polarization stability** | WP5 | Medium | Fast piezoelectric polarization controllers (< 1 ms response time) deployed at Pomorie landing station. |
| **R3: EuroHPC node latency overhead during key injection** | WP4 | Low | Asynchronous key caching and zero-copy hardware ring-buffers developed by BSC and AETERNA. |

---

*This technical proposal strictly complies with all criteria set forth in Call HORIZON-JU-EUROHPC-2026-NQKD-12-01.*
