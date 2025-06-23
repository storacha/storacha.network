import type { Ecosystem } from '~/types'

export const projects: Ecosystem.Project[] = [
  {
    "name": "3s Game Studio",
    "description": "A game studio built an Unreal plugin to use Storacha for progressive game installs and distributing game binaries with content-addressed storage and user-owned assets.",
    "url": "https://www.3studio.online/",
    "categories": ["gaming"],
    "icon": "3s-game-studio.jpg"
  },
  {
    "name": "elizaOS",
    "description": "elizaOS integrates Storacha's decentralized storage layer to give autonomous AI agents persistent, verifiable memory for storing and sharing data across the decentralized web.",
    "url": "https://www.elizaos.ai/",
    "categories": ["ai"],
    "icon": "elizaos.png"
  },
  {
    "name": "Fleek",
    "description": "A decentralized compute platform (DePin) that stores large-scale compute data and logs on Storacha for fast and efficient retrieval via CID.",
    "url": "https://fleek.network/",
    "categories": ["depin_compute"],
    "icon": "fleek.svg"
  },
  {
    "name": "Glitter Protocol",
    "description": "A blockchain-based data platform that leverages Storacha as its decentralized storage infrastructure, providing robust and scalable solutions for its customers.",
    "url": "https://glitterprotocol.io/",
    "categories": ["web3_infra"]
  },
  {
    "name": "Lit Protocol",
    "description": "Lit Protocol integrates with Storacha to encrypt data, store it securely, and enable seamless decryption using the new UCAN-based space/content/decrypt capability.",
    "url": "https://www.litprotocol.com/",
    "categories": ["ai"],
    "icon": "lit-protocol.png"
  },
  {
    "name": "Magic Eden",
    "description": "The leading NFT marketplace on Solana relies on Storacha to store NFT collections, ensuring fast and reliable retrieval speeds.",
    "url": "https://magiceden.io",
    "categories": ["nfts_metaverse"],
    "icon": "magic-eden.png"
  },
  {
    "name": "Mira",
    "description": "Mira uses Storacha's decentralized storage network to immutably store AI consensus transactions, ensuring verifiable, high-performance data availability for trustless autonomous AI systems.",
    "url": "https://mira.network",
    "categories": ["ai"],
    "icon": "mira.png"
  },
  {
    "name": "NFT.Storage",
    "description": "Classic.nft.storage ensures the secure and efficient storage of NFT assets and metadata, managing large collections with tens of thousands of NFTs on Storacha, guaranteeing they are always readily accessible and quickly retrievable.",
    "url": "https://classic.nft.storage",
    "categories": ["nfts_metaverse"],
    "icon": "nft-storage.jpg"
  },
  {
    "name": "OpenSea",
    "description": "The world's largest NFT marketplace, OpenSea, leverages Storacha to secure and efficiently retrieve end-users' NFT collections via IPFS, ensuring optimal performance.",
    "url": "https://opensea.io",
    "categories": ["nfts_metaverse"],
    "icon": "opensea.svg"
  },
  {
    "name": "Station",
    "description": "An analytics and verification network for DePIN and Web3 ecosystems that harnesses Storacha to securely store compute logs and reports, ensuring comprehensive backups on Filecoin.",
    "url": "https://www.filstation.app/",
    "categories": ["depin_compute"],
    "icon": "station.svg"
  },
  {
    "name": "Tatum",
    "description": "A blockchain development platform that utilizes Storacha to provide IPFS storage services, offering seamless integration, scalability, and enhanced user control.",
    "url": "https://tatum.io",
    "categories": ["web3_infra"],
    "icon": "tatum.webp"
  }
]

export const categories: Ecosystem.Category[] = [
  {
    "id": "gaming",
    "name": "Gaming",
    "icon": "👾"
  },
  {
    "id": "web3_infra",
    "name": "Web3 Infrastructure",
    "icon": "⚙️"
  },
  {
    "id": "depin_compute",
    "name": "DEPIN & Compute",
    "icon": "💻"
  },
  {
    "id": "nfts_metaverse",
    "name": "NFTS & Metaverse",
    "icon": "🖼"
  },
  {
    "id": "ai",
    "name": "AI",
    "icon": "✨"
  },
  {
    "id": "de_social",
    "name": "Decentralized Social",
    "icon": "📱"
  }
]