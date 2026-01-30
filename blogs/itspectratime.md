---
title: "It’s Pectra Time!"
date: 2025-05-06
author: Pooja Ranjan
image: https://miro.medium.com/v2/resize:fit:1100/format:webp/1*sCDRZdHLR2DX32DyCUipNA.png
---

#### EL & CL changes, PEEPanEIP, Quizzes, NFT and a Watch party invite.

The Ethereum community is expecting to activate **Pectra** on mainnet on **May 07, 2025 at epoch 364032** (10:05:11 UTC).  This is the 3rd upgrade on the post-Merge Ethereum blockchain. It is also the 19th network upgrade since the launch in 2015, probably the highest number of upgrades to an active blockchain.  

Pectra is bringing a combination of execution and consensus layer changes. The upgrade will be activated in less than 24 hours. It will introduce features such as staking exits from the execution layer, code-enabled EOAs, calldata cost adjustments, and blob throughput increases, among many others. It intends to continue the protocol’s development toward scalability, security, and decentralization.

Alongside the technical upgrades, Ethereum Cat Herders and the broader community have collaborated on educational content, including PEEPanEIP recordings, testing call summaries, NFT for Author’s Recognition and a Shapella- Dencun-style watch party to mark the occasion.

# ✨ Why is it called “Pectra”?

Ethereum upgrades are named using a simple pattern: the execution layer is named after a Devcon city, and the consensus layer is named after a star. “**Pectra**” is a mix of **Prague** (the city where Devcon IV was held) and **Electra** (a bright star in the Taurus constellation). This name shows that both layers of Ethereum are being upgraded at the same time.

# 🔧 What’s Included: Meta EIP & Core EIPs
[Preparing for Pectra: A Paw-some Video by EthCatHerders](https://www.youtube.com/live/5pMkHeG-lC0)

To help the community understand what’s changing, the Ethereum Cat Herders have recorded several PEEPanEIP episodes with EIP authors and implementers, offering deep dives into individual proposals and their rationale. Catch the full [Pectra Playlist](https://www.youtube.com/playlist?list=PL4cwHXAawZxqOHV_F40AJbzcl8b6tG8xw).

[Meta EIP-7600](https://eips.ethereum.org/EIPS/eip-7600) documents the upgrade scope.

### Core EIPs

- [EIP-2537: Precompile for BLS12-381 curve operations](https://eips.ethereum.org/EIPS/eip-2537) | [Video](https://youtu.be/Kr0WRewb_AA) | [Audio](https://open.spotify.com/episode/1KxdekZhgm3rldRgkdNP6m?si=vaMmGJqcSmCkARjR7yYA5g)
- [EIP-2935: Save historical block hashes in state](https://eips.ethereum.org/EIPS/eip-2935) | [Video](https://youtu.be/QH5yuNd3B6o) 
- [EIP-6110: Supply validator deposits on chain](https://eips.ethereum.org/EIPS/eip-6110) | [Video](https://youtu.be/tRTBgCN9VgY)
- [EIP-7002: Execution layer-triggerable exits](https://eips.ethereum.org/EIPS/eip-7002) | [Video](https://youtu.be/MxvX1gNh-_4) | [Audio](https://open.spotify.com/episode/164Ab6thqzVFBMczqB7gAK?si=mfy-B6N6Qe6ORzh_8zGpig)
- [EIP-7251: Increase the MAX_EFFECTIVE_BALANCE](https://eips.ethereum.org/EIPS/eip-7251) | [Video](https://youtu.be/3cVhNXDTjgg) | [Audio](https://open.spotify.com/episode/4vv1Pb9FMpAIeTKfFlmhl8?si=lXilQeu6Ru2M3lDe5HWPew)
- [EIP-7549: Move committee index outside Attestation](https://eips.ethereum.org/EIPS/eip-7549) | [Video](https://youtu.be/oZfV4Ell9WQ) | [Audio](https://open.spotify.com/episode/5gfoCw4D5iBCutoKSDJmZs?si=vm5uYlXdSQ2lLyC0ZlHVdg)
- [EIP-7623: Increase calldata cost](https://eips.ethereum.org/EIPS/eip-7623) | [Video](https://youtu.be/D8UnMN2Cjw4) | [Audio](https://open.spotify.com/episode/2oBW6edgzaeJl13hajRuFf?si=BzfkENKDTiGlD6KSlmmJJg)
- [EIP-7685: General purpose execution layer requests](https://eips.ethereum.org/EIPS/eip-7685) | [Video](https://youtu.be/3g71BGZFASE) | [Audio](https://open.spotify.com/episode/2jrYzcPZfHLlt6T9xwQAYQ?si=WIVbJBHfSHCRukJvxK4VtQ)
- [EIP-7691: Blob throughput increase](https://eips.ethereum.org/EIPS/eip-7691) | [Video](https://youtu.be/Ma31xvBoySw)
- [EIP-7702: Set EOA account code](https://eips.ethereum.org/EIPS/eip-7702) | [Video](https://youtu.be/ome47qtvuU0) | [Audio](https://open.spotify.com/episode/0nk32qp3QRBl84x1eh3VeL?si=JXZ1XDqFRJWzumwLU8WaNg)

### Other EIPs
- [EIP-7840: Add blob schedule to EL config files](https://eips.ethereum.org/EIPS/eip-7840) 
- [EIP-7642: eth/69 – Drop pre-merge fields](https://eips.ethereum.org/EIPS/eip-7642)

# 🚀 Testnet Deployments & Incident Reports
The Pectra upgrade underwent a rigorous multi-phase testing process across Ethereum’s public testnets to ensure network readiness and client stability over several [Devnets](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md). Initial deployment on **Holesky** (Feb 24, 2025) revealed sync issues and client incompatibilities, which were promptly addressed and documented in the[ Holesky Post-Mortem](https://github.com/ethereum/pm/blob/master/Pectra/holesky-postmortem.md). These early findings informed critical improvements ahead of the **Sepolia** deployment (Mar 5, 2025), which encountered a known bug that was swiftly fixed—also captured in the[ Sepolia Post-Mortem](https://github.com/ethereum/pm/blob/master/Pectra/sepolia-postmortem.md).

A final pre-mainnet run on the **Hoodi testnet** (Mar 26, 2025) served as the final staging ground, confirming system readiness for mainnet. Each testnet phase contributed valuable insights, reinforcing the reliability of the client releases and validator configurations.

The upgrade is scheduled for mainnet activation on May 7, 2025 at 10:05:11 UTC, following the activation plan outlined in the[ Mainnet Upgrade & Incident Response Team Plan](https://github.com/ethereum/pm/blob/master/Pectra/pectra-mainnet-plan.md). This phased rollout has exemplified Ethereum’s commitment to secure and transparent upgrade coordination.

## Activation Plan & Client Requirements

The Pectra upgrade is scheduled to activate on the Ethereum mainnet on May 7, 2025. To remain compatible and continue participating in Ethereum’s consensus, **node operators and validators must upgrade** both their Execution Layer (EL) and Consensus Layer (CL) clients to a Pectra-ready version. 

One notable development in this upgrade cycle is the participation of **Reth**, the latest addition to Ethereum’s Execution Layer clients, and **Grandine**, as an open-source Consensus Layer client now included in the upgrade process. 

Upgrading is essential—**nodes that do not upgrade will fork from the main network and be left on an incompatible chain**. 

Refer to the [Ethereum Foundation blog post](https://blog.ethereum.org/2025/04/23/pectra-mainnet) for complete client upgrade instructions and FAQ. Be sure to update your clients to the minimum compatible versions to remain part of Ethereum’s mainnet consensus.

# 🙌 Education, Community Engagement & Author Recognition
Ethereum Cat Herders championed a series of community-driven initiatives to ensure the Pectra upgrade was not only technically successful but also widely understood, celebrated, and accessible to all.

## 🎙️ PEEPanEIP Series
To deepen public understanding of the [EIPs included in Pectra ](https://www.youtube.com/playlist?list=PL4cwHXAawZxqOHV_F40AJbzcl8b6tG8xw), we recorded detailed walkthroughs with EIP authors and client implementers. These educational discussions are part of the ongoing [PEEPanEIP series](https://www.youtube.com/playlist?list=PL4cwHXAawZxpby7LszzOnyuAyQl8WLLvh), designed to make Ethereum protocol changes transparent and approachable.

## 📜 Ethereum Protocol Progress
Ethereum Cat Herders has launched a new series titled “Ethereum Protocol Progress” — a curated collection of tweet threads that document each major Ethereum network upgrade. This initiative aims to make Ethereum’s evolution more accessible and understandable to the broader community. Each thread breaks down an upgrade’s Introduction, Core Features, Benefits, Community Impact, Challenges, and a Fun Fact, offering a concise yet informative snapshot of how the protocol has progressed over time. Browse the **full series** below and follow along to revisit Ethereum’s most important milestones leading to Pectra:

Here’s a look back at Ethereum’s upgrade history, leading to Pectra:

1. [Frontier](https://x.com/EthCatHerders/status/1914364555020656790)
2. [Frontier Thawing](https://x.com/EthCatHerders/status/1914709625217409218)
3. [Homestead](https://x.com/EthCatHerders/status/1915081040147968482)
4. [The DAO Fork](https://x.com/EthCatHerders/status/1915499430335422581)
5. [Byzantium (Metropolis)](https://x.com/EthCatHerders/status/1915853562569232439)
6. [Constantinople (Metropolis 2)](https://x.com/EthCatHerders/status/1916208464306835772)
7. [St. Petersburg (Constantinople 2)](https://x.com/EthCatHerders/status/1916959128481878269)
8. [Istanbul](https://x.com/EthCatHerders/status/1917293814869348499)
9. [Muir Glacier](https://x.com/EthCatHerders/status/1917659596682060071)
10. [Beaconchain (Phase 0)](https://x.com/EthCatHerders/status/1918029124318503242)
11. [Berlin](https://x.com/EthCatHerders/status/1918397954446262347)
12. [London](https://x.com/EthCatHerders/status/1918769912983790035)
13. [Altair](https://x.com/EthCatHerders/status/1919054227470467157)
14. [Arrow Glacier](https://x.com/EthCatHerders/status/1919127397485691117)
15. [Gray Glacier](https://x.com/EthCatHerders/status/1919401665641513189)
16. [The Merge (Bellatrix + Paris)](https://x.com/EthCatHerders/status/1919699605672828991)
17. [Shapella (Shanghai + Capella)](https://x.com/EthCatHerders/status/1919837102025654437)
18. [Dencun (Deneb + Cancun)](https://x.com/EthCatHerders/status/1919881792649052661)
19. Pectra (Prague + Electra)

Each step brought Ethereum closer to a more efficient, scalable, and secure decentralized future.

## 🏅 Author Recognition: Pectra Commemorative NFTs
To recognize the invaluable contributions of EIP authors, Ethereum Cat Herders have launched a **special edition commemorative NFT** for those who contributed to the Pectra upgrade. Read more [here](https://hackmd.io/@georgeh/S1tPHHAuye).

If you’ve authored one or more EIPs included in Pectra, you can[ claim your NFT here](https://www.ethcatherders.com/upgrades/pectra).

To claim:
- Verify your GitHub username (as cited in the EIP)
- Submit your ENS or Base-compatible wallet address
- The NFT will be **airdropped gas-free** to your wallet

This limited-edition NFT is a symbol of gratitude from the Ethereum Cat Herders and the broader Ethereum community. Thank you for helping shape the protocol’s future.

## 🐉 Octant’s Dragon Den Raffle & Quiz
In collaboration with the[ Octant community](https://x.com/OctantApp/status/1917262864064340428), Ethereum Cat Herders organized a Pectra-themed quiz and raffle, rewarding winners with free or discounted tickets to Ethereum events. This initiative helped grow awareness of protocol upgrades in a fun and inclusive way.

## 🏛️ Onsite Engagement at ETH Cluj
We also partnered with[ ETH Cluj](https://lu.ma/v871m3uc) to promote [Pectra-related education](https://www.youtube.com/watch?v=YCL-cAT8gqs) on the ground, bringing conversations about Ethereum’s evolving architecture directly to the builder and staker communities. 

# 🎉 Join the Watch Party!
We’re celebrating the Pectra mainnet upgrade with a fun livestream watch party — and you’re invited!
Hosted by **Ethereum Cat Herders**, **EthStaker**, along with **The Daily Gwei** & **Bankless**, this event brings together developers, researchers, validators, and the community to walk through the upgrade as it happens live.

📺[ Watch on YouTube](https://twitter.com/i/broadcasts/1kvJpyZdeLbxE)

🧵 [Watch on X](https://x.com/i/broadcasts/1kvJpyZdeLbxE)

Bring your snacks, questions, and good vibes! 🧃🎉

This isn’t just an upgrade — it’s a moment for the whole Ethereum community. Let’s enjoy it together!

# 🫶 Thank You, Ethereum Community!
Pectra happened because of the amazing work from so many people — client teams, researchers, testers, node operators, educators, and community contributors from all over the world.
Let’s take a moment to celebrate this big step in Ethereum’s journey — and look forward to what’s coming next!
Special thanks to [Akash Kshirsagar](https://x.com/LookUpForSky) for beautiful designs, [Vaelyn Luo](https://x.com/Cyph3rVae) for leading community events [George Hervey](https://x.com/georgeh0x) for the NFT distribution.

Looking forward to a **Pawsome** future! 🐾

##### [Support](https://www.ethcatherders.com/donate) & Follow on [X](https://twitter.com/EthCatHerders) | [Warpcast ](https://warpcast.com/ethcatherders) | [YouTube](https://youtube.com/@ethcatherders) | [LinkedIn](https://www.linkedin.com/company/ethcatherders) | [Website](https://www.ethcatherders.com/)
