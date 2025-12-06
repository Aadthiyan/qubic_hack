# Nostromo Guardian - Hackathon Demo Video Script

**Target Length**: 3-5 Minutes
**Tone**: Professional, confident, innovation-focused

---

## 0:00 - 0:45 | Introduction
**Visual**: Slide with "Nostromo Guardian" logo and "Trust through Verification".

**Script**:
"Hello, we are team Nostromo, and we're building the 'Guardian' protocol on Qubic.
The Launchpad ecosystem has a problem: Investors don't know who to trust, and Builders don't know what standards to meet.
Rugpulls and weak tokenomics kill innovation.
We solved this with **Nostromo Guardian**—an automated risk scoring engine that analyzes every project across 7 key dimensions before they launch."

---

## 0:45 - 2:00 | The Dashboard & Analytics
**Visual**: Show the main Dashboard (localhost:3000). Scroll through the list.

**Script**:
"Here is the Guardian Dashboard. Every project applying to Nostromo gets a public Score Card.
You can instantly filter by 'Green' (Safe), 'Yellow' (Caution), or 'Red' (High Risk).
Let's look at `Nova DEX`.
(Click Project)
This is the detail view. Our algorithm doesn't just give a number; it visualizes the risk using this 7-point Radar Chart.
We check Tokenomics, Vesting, Team History, and more. Use your mouse to hover over the risk flags—Guardian highlights exactly *why* a project might be risky."

---

## 2:00 - 3:30 | The Builder Sandbox (Interactive Demo)
**Visual**: Go to `/sandbox`.

**Script**:
"But we don't just judge; we help builders improve.
This is the **Builder Sandbox**. Imagine I'm a developer planning a launch.
I'll enter my details: 'My Memecoin'.
I set Team Allocation to 50% (High Check). I set Vesting to 0 months.
(Click Simulate) -> Score: 35/100 (Red).
The system tells me: 'High Risk. Decrease team allocation.'
Okay, let's fix it. I change Team Allocation to 10% and Vesting to 12 months.
(Click Simulate) -> Score: 85/100 (Green).
This feedback loop creates better projects for the Qubic ecosystem."

---

## 3:30 - 4:15 | Nostromo Launchpad Integration
**Visual**: Go to `/nostromo`.

**Script**:
"Finally, how does this look to an investor?
This is the Nostromo Launchpad. Notice the 'Guardian Score' badge on every pool card.
The smart contract automatically enforces these rules—Green projects get Public access; Red projects are restricted.
This protects investors programmatically."

---

## 4:15 - 5:00 | Technical & Conclusion
**Visual**: Rapidly show VS Code (ScoringService.ts), Github Repo, Qubic C++ Contract.

**Script**:
"Under the hood, we used Next.js, a complex weighted scoring algorithm in Node.js, and a custom Qubic Smart Contract in C++ to store the scores immutably.
Nostromo Guardian brings transparency and trust to Qubic launches. Thank you."
