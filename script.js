// Elementos DOM
const gameNameInput = document.getElementById('gameName');
const gameSearchInput = document.getElementById('gameSearch');
const gameDropdown = document.getElementById('gameDropdown');
const gameList = document.getElementById('gameList');
const gameSelectorGroup = document.querySelector('.game-selector-group');
const processorInput = document.getElementById('processor');
const gpuInput = document.getElementById('gpu');
const ramInput = document.getElementById('ram');
const storageInput = document.getElementById('storage');
const osInput = document.getElementById('os');
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingSection = document.getElementById('loadingSection');
const resultSection = document.getElementById('resultSection');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const performanceBar = document.getElementById('performanceBar');
const performanceFill = document.getElementById('performanceFill');
const performanceText = document.getElementById('performanceText');
const suggestions = document.getElementById('suggestions');
const suggestionsList = document.getElementById('suggestionsList');
const resetBtn = document.getElementById('resetBtn');
const fpsValue = document.getElementById('fpsValue');

// Base de dados completa de performance de CPUs (score relativo)
const cpuPerformanceDB = {
    // Intel Core i9 (alta performance)
    'i9-13900k': 100, 'i9-13900': 98, 'i9-12900k': 95, 'i9-12900': 93,
    'i9-11900k': 88, 'i9-11900': 86, 'i9-10900k': 85, 'i9-10900': 83,
    'i9-9900k': 78, 'i9-9900': 76, 'i9-8950hk': 72, 'i9-7980xe': 70,
    
    // Intel Core i7 (performance)
    'i7-13700k': 92, 'i7-13700': 90, 'i7-12700k': 87, 'i7-12700': 85,
    'i7-11700k': 82, 'i7-11700': 80, 'i7-10700k': 78, 'i7-10700': 76,
    'i7-9700k': 72, 'i7-9700': 70, 'i7-8700k': 68, 'i7-8700': 66,
    'i7-7700k': 60, 'i7-7700': 58, 'i7-6700k': 55, 'i7-6700': 53,
    'i7-4790k': 48, 'i7-4790': 46, 'i7-4770k': 44, 'i7-4770': 42,
    'i7-3770k': 38, 'i7-3770': 36,
    
    // Intel Core i5 (média performance)
    'i5-13600k': 85, 'i5-13600': 83, 'i5-12600k': 80, 'i5-12600': 78,
    'i5-11600k': 75, 'i5-11600': 73, 'i5-10600k': 70, 'i5-10600': 68,
    'i5-10400': 65, 'i5-9600k': 62, 'i5-9600': 60, 'i5-9400': 58,
    'i5-8600k': 56, 'i5-8600': 54, 'i5-8400': 52, 'i5-7600k': 48,
    'i5-7600': 46, 'i5-6600k': 44, 'i5-6600': 42, 'i5-6500': 40,
    'i5-4460': 35, 'i5-4440': 33, 'i5-3570k': 30, 'i5-3470': 28,
    'i5-2500k': 25, 'i5-2400': 23,
    
    // Intel Core i3 (baixa performance)
    'i3-13100': 60, 'i3-12100': 55, 'i3-10100': 50, 'i3-9100': 45,
    'i3-8100': 40, 'i3-7300': 35, 'i3-6100': 30, 'i3-4150': 25,
    'i3-3225': 20, 'i3-3220': 18,
    
    // AMD Ryzen 9 (7000 series - Zen 4)
    'ryzen 9 7950x': 100, 'ryzen 9 7950x3d': 100, 'ryzen 9 7900x': 98, 'ryzen 9 7900': 96,
    'ryzen 9 7900x3d': 97, 'ryzen 9 7950': 99,
    
    // AMD Ryzen 9 (5000 series - Zen 3)
    'ryzen 9 5950x': 95, 'ryzen 9 5900x': 92, 'ryzen 9 5900': 90, 'ryzen 9 5900hx': 91,
    'ryzen 9 5980hx': 94, 'ryzen 9 5980hs': 93,
    
    // AMD Ryzen 9 (3000 series - Zen 2)
    'ryzen 9 3950x': 88, 'ryzen 9 3900x': 85, 'ryzen 9 3900': 83, 'ryzen 9 3900xt': 86,
    'ryzen 9 4900h': 87, 'ryzen 9 4900hs': 86,
    
    // AMD Ryzen 7 (7000 series - Zen 4)
    'ryzen 7 7800x3d': 98, 'ryzen 7 7700x': 90, 'ryzen 7 7700': 88, 'ryzen 7 7700x3d': 92,
    
    // AMD Ryzen 7 (5000 series - Zen 3)
    'ryzen 7 5800x3d': 88, 'ryzen 7 5800x': 85, 'ryzen 7 5800': 83, 'ryzen 7 5800h': 84,
    'ryzen 7 5700x': 82, 'ryzen 7 5700g': 80, 'ryzen 7 5700u': 75, 'ryzen 7 5800hs': 86,
    'ryzen 7 5800h': 84, 'ryzen 7 5800u': 78,
    
    // AMD Ryzen 7 (3000 series - Zen 2)
    'ryzen 7 3800x': 78, 'ryzen 7 3800xt': 80, 'ryzen 7 3700x': 75, 'ryzen 7 3700': 73,
    'ryzen 7 3750h': 70, 'ryzen 7 4800h': 82, 'ryzen 7 4800hs': 81, 'ryzen 7 4800u': 72,
    
    // AMD Ryzen 7 (2000 series - Zen+)
    'ryzen 7 2700x': 68, 'ryzen 7 2700': 65, 'ryzen 7 2700e': 63, 'ryzen 7 2800h': 66,
    
    // AMD Ryzen 7 (1000 series - Zen)
    'ryzen 7 1800x': 60, 'ryzen 7 1700x': 58, 'ryzen 7 1700': 58, 'ryzen 7 1700e': 56,
    
    // AMD Ryzen 5 (7000 series - Zen 4)
    'ryzen 5 7600x': 82, 'ryzen 5 7600': 80, 'ryzen 5 7500f': 78,
    
    // AMD Ryzen 5 (5000 series - Zen 3)
    'ryzen 5 5600x': 75, 'ryzen 5 5600': 73, 'ryzen 5 5600g': 72, 'ryzen 5 5600h': 74,
    'ryzen 5 5500': 70, 'ryzen 5 5500u': 65, 'ryzen 5 5600hs': 73, 'ryzen 5 5600u': 68,
    
    // AMD Ryzen 5 (3000 series - Zen 2)
    'ryzen 5 3600x': 68, 'ryzen 5 3600xt': 70, 'ryzen 5 3600': 65, 'ryzen 5 3600g': 64,
    'ryzen 5 3500x': 62, 'ryzen 5 4600h': 66, 'ryzen 5 4600hs': 65, 'ryzen 5 4600u': 60,
    'ryzen 5 4500u': 58,
    
    // AMD Ryzen 5 (2000 series - Zen+)
    'ryzen 5 2600x': 58, 'ryzen 5 2600': 55, 'ryzen 5 2600e': 53, 'ryzen 5 2500u': 50,
    'ryzen 5 2500x': 56,
    
    // AMD Ryzen 5 (1000 series - Zen)
    'ryzen 5 1600x': 50, 'ryzen 5 1600': 48, 'ryzen 5 1600af': 52, 'ryzen 5 1500x': 45,
    'ryzen 5 1400': 42,
    
    // AMD Ryzen 3 (5000 series - Zen 3)
    'ryzen 3 5300g': 55, 'ryzen 3 5300u': 52,
    
    // AMD Ryzen 3 (3000 series - Zen 2)
    'ryzen 3 3300x': 50, 'ryzen 3 3100': 45, 'ryzen 3 3200g': 42, 'ryzen 3 4300u': 48,
    
    // AMD Ryzen 3 (2000 series - Zen+)
    'ryzen 3 2200g': 40, 'ryzen 3 2300x': 43, 'ryzen 3 2300u': 38,
    
    // AMD Ryzen 3 (1000 series - Zen)
    'ryzen 3 1200': 35, 'ryzen 3 1300x': 38, 'ryzen 3 1200af': 37,
    
    // AMD Threadripper (HEDT)
    'threadripper 3990x': 100, 'threadripper 3970x': 98, 'threadripper 3960x': 95,
    'threadripper 2990wx': 90, 'threadripper 2970wx': 88, 'threadripper 2950x': 85,
    'threadripper 1950x': 75, 'threadripper 1920x': 70,
    
    // AMD FX Series (antigos, mas ainda usados)
    'fx 9590': 40, 'fx 9370': 38, 'fx 8350': 35, 'fx 8320': 33, 'fx 8310': 32,
    'fx 8300': 31, 'fx 8150': 30, 'fx 8120': 28, 'fx 6100': 25, 'fx 6300': 27,
    'fx 6350': 29, 'fx 4300': 22, 'fx 4350': 24,
    
    // AMD Athlon (modernos)
    'athlon 3000g': 30, 'athlon 200ge': 25, 'athlon 240ge': 27, 'athlon 300u': 28,
    
    // AMD Athlon (antigos)
    'athlon x4 860k': 28, 'athlon x4 880k': 30, 'athlon x4 950': 32, 'athlon x4 970': 33,
    
    // AMD APU (com gráficos integrados)
    'ryzen 7 5700g': 80, 'ryzen 5 5600g': 72, 'ryzen 5 4600g': 65, 'ryzen 5 3400g': 55,
    'ryzen 3 3200g': 42, 'ryzen 3 2200g': 40
};

// Base de dados completa de performance de GPUs (score relativo)
const gpuPerformanceDB = {
    // NVIDIA RTX 40 Series
    'rtx 4090': 100, 'rtx 4080': 90, 'rtx 4070 ti': 82, 'rtx 4070': 75,
    
    // NVIDIA RTX 30 Series
    'rtx 3090 ti': 95, 'rtx 3090': 92, 'rtx 3080 ti': 88, 'rtx 3080': 85,
    'rtx 3070 ti': 78, 'rtx 3070': 75, 'rtx 3060 ti': 68, 'rtx 3060': 62,
    'rtx 3050': 50,
    
    // NVIDIA RTX 20 Series
    'rtx 2080 ti': 80, 'rtx 2080 super': 75, 'rtx 2080': 72,
    'rtx 2070 super': 68, 'rtx 2070': 65, 'rtx 2060 super': 60,
    'rtx 2060': 55,
    
    // NVIDIA GTX 16 Series
    'gtx 1660 ti': 52, 'gtx 1660 super': 50, 'gtx 1660': 48,
    'gtx 1650 super': 42, 'gtx 1650': 38,
    
    // NVIDIA GTX 10 Series
    'gtx 1080 ti': 70, 'gtx 1080': 65, 'gtx 1070 ti': 60, 'gtx 1070': 58,
    'gtx 1060': 50, 'gtx 1050 ti': 40, 'gtx 1050': 35,
    
    // NVIDIA GTX 9 Series
    'gtx 980 ti': 55, 'gtx 980': 50, 'gtx 970': 48, 'gtx 960': 40,
    'gtx 950': 32,
    
    // NVIDIA GTX 7/6 Series
    'gtx 780 ti': 45, 'gtx 780': 42, 'gtx 770': 38, 'gtx 760': 32,
    'gtx 750 ti': 28, 'gtx 750': 25, 'gtx 660 ti': 30, 'gtx 660': 28,
    'gtx 650 ti': 22, 'gtx 650': 20,
    
    // AMD RX 7000 Series
    'rx 7900 xtx': 95, 'rx 7900 xt': 88, 'rx 7800 xt': 80,
    'rx 7700 xt': 72, 'rx 7600': 60,
    
    // AMD RX 6000 Series
    'rx 6950 xt': 85, 'rx 6900 xt': 82, 'rx 6800 xt': 78, 'rx 6800': 75,
    'rx 6700 xt': 68, 'rx 6700': 65, 'rx 6600 xt': 58, 'rx 6600': 55,
    'rx 6500 xt': 42,
    
    // AMD RX 5000 Series
    'rx 5700 xt': 62, 'rx 5700': 58, 'rx 5600 xt': 52, 'rx 5600': 48,
    'rx 5500 xt': 40,
    
    // AMD RX 500 Series
    'rx 590': 50, 'rx 580': 48, 'rx 570': 42, 'rx 560': 35,
    
    // AMD RX 400 Series
    'rx 480': 45, 'rx 470': 40, 'rx 460': 30,
    
    // Integradas (muito baixa performance)
    'hd 4000': 8, 'hd 3000': 5, 'uhd 630': 12, 'uhd 620': 10,
    'vega 8': 20, 'vega 11': 25
};

// Base de dados expandida e atualizada de requisitos de jogos (baseada em requisitos oficiais)
// Requisitos baseados em dados oficiais de 2024
const gameRequirements = {
    // Cyberpunk 2077 - Atualizado 2024
    'cyberpunk 2077': {
        min: { cpuScore: 30, gpuScore: 42, ram: 8, storage: 70 }, // i5-3570K / GTX 780
        rec: { cpuScore: 68, gpuScore: 62, ram: 12, storage: 70 }  // i7-4790 / RTX 2060
    },
    // Elden Ring
    'elden ring': {
        min: { cpuScore: 52, gpuScore: 50, ram: 12, storage: 60 }, // i5-8400 / GTX 1060 3GB
        rec: { cpuScore: 68, gpuScore: 62, ram: 16, storage: 60 }  // i7-8700K / RTX 3060
    },
    // GTA V
    'gta v': {
        min: { cpuScore: 28, gpuScore: 28, ram: 8, storage: 72 }, // i5-3470 / GTX 660
        rec: { cpuScore: 35, gpuScore: 48, ram: 8, storage: 72 }  // i5-4460 / GTX 970
    },
    // Red Dead Redemption 2
    'red dead redemption 2': {
        min: { cpuScore: 25, gpuScore: 38, ram: 8, storage: 150 }, // i5-2500K / GTX 770
        rec: { cpuScore: 46, gpuScore: 50, ram: 12, storage: 150 } // i7-4770K / GTX 1060
    },
    // The Witcher 3
    'the witcher 3': {
        min: { cpuScore: 25, gpuScore: 28, ram: 6, storage: 35 }, // i5-2500K / GTX 660
        rec: { cpuScore: 36, gpuScore: 38, ram: 8, storage: 35 }  // i7-3770 / GTX 770
    },
    // Call of Duty: Warzone
    'call of duty warzone': {
        min: { cpuScore: 25, gpuScore: 32, ram: 8, storage: 175 }, // i5-2500K / GTX 670
        rec: { cpuScore: 46, gpuScore: 48, ram: 12, storage: 175 } // i7-4770K / GTX 970
    },
    // Fortnite
    'fortnite': {
        min: { cpuScore: 20, gpuScore: 8, ram: 4, storage: 26 }, // i3-3225 / HD 4000
        rec: { cpuScore: 35, gpuScore: 28, ram: 8, storage: 26 } // i5-7300U / GTX 660
    },
    // Valorant
    'valorant': {
        min: { cpuScore: 25, gpuScore: 5, ram: 4, storage: 8 }, // i3-4150 / HD 3000
        rec: { cpuScore: 35, gpuScore: 35, ram: 4, storage: 8 }  // i5-4460 / GTX 1050
    },
    // Baldur's Gate 3
    'baldur\'s gate 3': {
        min: { cpuScore: 48, gpuScore: 50, ram: 8, storage: 150 }, // i5-4690 / GTX 970
        rec: { cpuScore: 70, gpuScore: 68, ram: 16, storage: 150 } // i7-8700K / RTX 2060 Super
    },
    // Starfield
    'starfield': {
        min: { cpuScore: 60, gpuScore: 55, ram: 16, storage: 125 }, // i7-6800K / RTX 1070 Ti
        rec: { cpuScore: 75, gpuScore: 75, ram: 16, storage: 125 }  // i5-10600K / RTX 2080
    },
    // Hogwarts Legacy
    'hogwarts legacy': {
        min: { cpuScore: 52, gpuScore: 50, ram: 8, storage: 85 }, // i5-8400 / GTX 1080 Ti
        rec: { cpuScore: 70, gpuScore: 65, ram: 16, storage: 85 }  // i7-8700 / RTX 2080 Ti
    },
    // Diablo 4
    'diablo 4': {
        min: { cpuScore: 50, gpuScore: 48, ram: 8, storage: 90 }, // i5-4670K / GTX 970
        rec: { cpuScore: 68, gpuScore: 62, ram: 16, storage: 90 } // i7-8700K / RTX 2060
    },
    // Counter-Strike 2
    'counter strike 2': {
        min: { cpuScore: 40, gpuScore: 35, ram: 8, storage: 85 }, // i5-750 / GTX 1050
        rec: { cpuScore: 60, gpuScore: 55, ram: 16, storage: 85 }  // i5-9600K / RTX 2060
    },
    // Apex Legends
    'apex legends': {
        min: { cpuScore: 35, gpuScore: 40, ram: 6, storage: 56 }, // i3-6300 / GTX 640
        rec: { cpuScore: 55, gpuScore: 55, ram: 8, storage: 56 }  // i5-3570K / GTX 970
    },
    // League of Legends
    'league of legends': {
        min: { cpuScore: 20, gpuScore: 8, ram: 4, storage: 22 }, // i3-530 / HD 3000
        rec: { cpuScore: 30, gpuScore: 25, ram: 4, storage: 22 }  // i5-3300 / GTX 560
    },
    // Jogos adicionais populares
    'minecraft': {
        min: { cpuScore: 20, gpuScore: 8, ram: 4, storage: 1 },
        rec: { cpuScore: 40, gpuScore: 35, ram: 8, storage: 4 }
    },
    'rocket league': {
        min: { cpuScore: 30, gpuScore: 28, ram: 4, storage: 20 },
        rec: { cpuScore: 50, gpuScore: 48, ram: 8, storage: 20 }
    },
    'overwatch 2': {
        min: { cpuScore: 40, gpuScore: 35, ram: 6, storage: 50 },
        rec: { cpuScore: 60, gpuScore: 55, ram: 8, storage: 50 }
    },
    'resident evil 4 remake': {
        min: { cpuScore: 55, gpuScore: 50, ram: 8, storage: 60 },
        rec: { cpuScore: 75, gpuScore: 68, ram: 16, storage: 60 }
    },
    'alan wake 2': {
        min: { cpuScore: 60, gpuScore: 62, ram: 16, storage: 90 },
        rec: { cpuScore: 80, gpuScore: 75, ram: 16, storage: 90 }
    },
    'spider man remastered': {
        min: { cpuScore: 55, gpuScore: 50, ram: 8, storage: 75 },
        rec: { cpuScore: 75, gpuScore: 68, ram: 16, storage: 75 }
    },
    'god of war': {
        min: { cpuScore: 50, gpuScore: 48, ram: 8, storage: 70 },
        rec: { cpuScore: 70, gpuScore: 62, ram: 16, storage: 70 }
    },
    'the last of us part i': {
        min: { cpuScore: 55, gpuScore: 50, ram: 16, storage: 100 },
        rec: { cpuScore: 75, gpuScore: 68, ram: 16, storage: 100 }
    },
    // FPS e Battle Royale
    'rainbow six siege': {
        min: { cpuScore: 40, gpuScore: 40, ram: 6, storage: 61 },
        rec: { cpuScore: 60, gpuScore: 55, ram: 16, storage: 61 }
    },
    'destiny 2': {
        min: { cpuScore: 42, gpuScore: 40, ram: 6, storage: 105 },
        rec: { cpuScore: 65, gpuScore: 60, ram: 8, storage: 105 }
    },
    'borderlands 3': {
        min: { cpuScore: 35, gpuScore: 40, ram: 6, storage: 75 },
        rec: { cpuScore: 60, gpuScore: 55, ram: 16, storage: 75 }
    },
    // MOBA e Estratégia
    'dota 2': {
        min: { cpuScore: 30, gpuScore: 25, ram: 4, storage: 15 },
        rec: { cpuScore: 50, gpuScore: 45, ram: 8, storage: 15 }
    },
    'age of empires 4': {
        min: { cpuScore: 50, gpuScore: 40, ram: 8, storage: 50 },
        rec: { cpuScore: 70, gpuScore: 60, ram: 16, storage: 50 }
    },
    'civilization 6': {
        min: { cpuScore: 40, gpuScore: 30, ram: 4, storage: 12 },
        rec: { cpuScore: 60, gpuScore: 50, ram: 8, storage: 12 }
    },
    'total war warhammer 3': {
        min: { cpuScore: 55, gpuScore: 50, ram: 8, storage: 120 },
        rec: { cpuScore: 75, gpuScore: 68, ram: 16, storage: 120 }
    },
    // Esportes e Corrida
    'fifa 24': {
        min: { cpuScore: 50, gpuScore: 45, ram: 8, storage: 100 },
        rec: { cpuScore: 70, gpuScore: 62, ram: 16, storage: 100 }
    },
    'forza horizon 5': {
        min: { cpuScore: 55, gpuScore: 50, ram: 8, storage: 110 },
        rec: { cpuScore: 75, gpuScore: 68, ram: 16, storage: 110 }
    },
    'f1 23': {
        min: { cpuScore: 50, gpuScore: 48, ram: 8, storage: 80 },
        rec: { cpuScore: 70, gpuScore: 62, ram: 16, storage: 80 }
    },
    'nba 2k24': {
        min: { cpuScore: 50, gpuScore: 45, ram: 8, storage: 110 },
        rec: { cpuScore: 70, gpuScore: 62, ram: 16, storage: 110 }
    },
    // Sobrevivência e Sandbox
    'rust': {
        min: { cpuScore: 40, gpuScore: 40, ram: 10, storage: 20 },
        rec: { cpuScore: 60, gpuScore: 55, ram: 16, storage: 20 }
    },
    'ark survival evolved': {
        min: { cpuScore: 40, gpuScore: 40, ram: 8, storage: 60 },
        rec: { cpuScore: 65, gpuScore: 60, ram: 16, storage: 60 }
    },
    'terraria': {
        min: { cpuScore: 20, gpuScore: 8, ram: 2, storage: 0.2 },
        rec: { cpuScore: 35, gpuScore: 30, ram: 4, storage: 0.2 }
    },
    'valheim': {
        min: { cpuScore: 40, gpuScore: 35, ram: 8, storage: 1 },
        rec: { cpuScore: 60, gpuScore: 50, ram: 16, storage: 1 }
    },
    'subnautica': {
        min: { cpuScore: 40, gpuScore: 40, ram: 8, storage: 20 },
        rec: { cpuScore: 60, gpuScore: 55, ram: 16, storage: 20 }
    },
    // RPG e Aventura
    'skyrim': {
        min: { cpuScore: 25, gpuScore: 28, ram: 4, storage: 12 },
        rec: { cpuScore: 40, gpuScore: 40, ram: 8, storage: 12 }
    },
    'fallout 4': {
        min: { cpuScore: 30, gpuScore: 35, ram: 8, storage: 30 },
        rec: { cpuScore: 50, gpuScore: 50, ram: 8, storage: 30 }
    },
    'assassins creed valhalla': {
        min: { cpuScore: 50, gpuScore: 48, ram: 8, storage: 50 },
        rec: { cpuScore: 70, gpuScore: 65, ram: 16, storage: 50 }
    },
    'final fantasy xiv': {
        min: { cpuScore: 40, gpuScore: 35, ram: 4, storage: 80 },
        rec: { cpuScore: 60, gpuScore: 55, ram: 8, storage: 80 }
    },
    'monster hunter world': {
        min: { cpuScore: 40, gpuScore: 40, ram: 8, storage: 48 },
        rec: { cpuScore: 65, gpuScore: 60, ram: 16, storage: 48 }
    },
    'dark souls 3': {
        min: { cpuScore: 40, gpuScore: 40, ram: 8, storage: 25 },
        rec: { cpuScore: 60, gpuScore: 55, ram: 8, storage: 25 }
    },
    'sekiro': {
        min: { cpuScore: 50, gpuScore: 48, ram: 8, storage: 25 },
        rec: { cpuScore: 70, gpuScore: 62, ram: 16, storage: 25 }
    },
    'bloodborne': {
        min: { cpuScore: 45, gpuScore: 45, ram: 8, storage: 41 },
        rec: { cpuScore: 65, gpuScore: 60, ram: 16, storage: 41 }
    },
    // Terror e Suspense
    'resident evil village': {
        min: { cpuScore: 50, gpuScore: 48, ram: 8, storage: 27 },
        rec: { cpuScore: 70, gpuScore: 65, ram: 16, storage: 27 }
    },
    'dead space remake': {
        min: { cpuScore: 55, gpuScore: 50, ram: 16, storage: 50 },
        rec: { cpuScore: 75, gpuScore: 68, ram: 16, storage: 50 }
    },
    'phasmophobia': {
        min: { cpuScore: 30, gpuScore: 25, ram: 8, storage: 13 },
        rec: { cpuScore: 50, gpuScore: 45, ram: 8, storage: 13 }
    },
    'the forest': {
        min: { cpuScore: 35, gpuScore: 35, ram: 4, storage: 5 },
        rec: { cpuScore: 55, gpuScore: 50, ram: 8, storage: 5 }
    },
    // Indie e Casual
    'hades': {
        min: { cpuScore: 30, gpuScore: 25, ram: 4, storage: 15 },
        rec: { cpuScore: 50, gpuScore: 45, ram: 8, storage: 15 }
    },
    'hollow knight': {
        min: { cpuScore: 25, gpuScore: 20, ram: 4, storage: 9 },
        rec: { cpuScore: 40, gpuScore: 35, ram: 8, storage: 9 }
    },
    'celeste': {
        min: { cpuScore: 20, gpuScore: 15, ram: 2, storage: 1.2 },
        rec: { cpuScore: 35, gpuScore: 30, ram: 4, storage: 1.2 }
    },
    'stardew valley': {
        min: { cpuScore: 20, gpuScore: 8, ram: 2, storage: 0.5 },
        rec: { cpuScore: 30, gpuScore: 25, ram: 4, storage: 0.5 }
    },
    'among us': {
        min: { cpuScore: 20, gpuScore: 8, ram: 1, storage: 0.25 },
        rec: { cpuScore: 30, gpuScore: 25, ram: 4, storage: 0.25 }
    },
    'fall guys': {
        min: { cpuScore: 30, gpuScore: 25, ram: 4, storage: 2 },
        rec: { cpuScore: 50, gpuScore: 45, ram: 8, storage: 2 }
    },
    // Simuladores
    'microsoft flight simulator': {
        min: { cpuScore: 60, gpuScore: 55, ram: 16, storage: 150 },
        rec: { cpuScore: 80, gpuScore: 75, ram: 32, storage: 150 }
    },
    'euro truck simulator 2': {
        min: { cpuScore: 35, gpuScore: 30, ram: 4, storage: 3 },
        rec: { cpuScore: 55, gpuScore: 50, ram: 8, storage: 3 }
    },
    'farming simulator 22': {
        min: { cpuScore: 40, gpuScore: 35, ram: 8, storage: 25 },
        rec: { cpuScore: 65, gpuScore: 60, ram: 16, storage: 25 }
    },
    'cities skylines': {
        min: { cpuScore: 40, gpuScore: 30, ram: 4, storage: 4 },
        rec: { cpuScore: 65, gpuScore: 55, ram: 16, storage: 4 }
    },
    // Outros Populares
    'genshin impact': {
        min: { cpuScore: 40, gpuScore: 35, ram: 8, storage: 30 },
        rec: { cpuScore: 60, gpuScore: 55, ram: 16, storage: 30 }
    },
    'warframe': {
        min: { cpuScore: 35, gpuScore: 30, ram: 4, storage: 35 },
        rec: { cpuScore: 55, gpuScore: 50, ram: 8, storage: 35 }
    },
    'path of exile': {
        min: { cpuScore: 30, gpuScore: 28, ram: 4, storage: 32 },
        rec: { cpuScore: 50, gpuScore: 48, ram: 8, storage: 32 }
    },
    'world of warcraft': {
        min: { cpuScore: 40, gpuScore: 35, ram: 4, storage: 100 },
        rec: { cpuScore: 60, gpuScore: 55, ram: 8, storage: 100 }
    },
    'lost ark': {
        min: { cpuScore: 50, gpuScore: 48, ram: 8, storage: 50 },
        rec: { cpuScore: 70, gpuScore: 65, ram: 16, storage: 50 }
    },
    'new world': {
        min: { cpuScore: 50, gpuScore: 50, ram: 8, storage: 50 },
        rec: { cpuScore: 70, gpuScore: 68, ram: 16, storage: 50 }
    },
    'palworld': {
        min: { cpuScore: 40, gpuScore: 40, ram: 16, storage: 40 },
        rec: { cpuScore: 60, gpuScore: 55, ram: 16, storage: 40 }
    },
    'helldivers 2': {
        min: { cpuScore: 50, gpuScore: 48, ram: 8, storage: 100 },
        rec: { cpuScore: 70, gpuScore: 65, ram: 16, storage: 100 }
    }
};

// Cache para requisitos buscados online
const onlineRequirementsCache = {};

// Função para tentar buscar requisitos online (futuro - pode ser expandida com API)
async function fetchGameRequirementsOnline(gameName) {
    const normalized = normalizeText(gameName);
    
    // Verificar cache
    if (onlineRequirementsCache[normalized]) {
        return onlineRequirementsCache[normalized];
    }
    
    // Por enquanto, retorna null (pode ser expandido com API real)
    // Exemplo de como seria com uma API:
    /*
    try {
        const response = await fetch(`https://api.example.com/games/${encodeURIComponent(gameName)}/requirements`);
        const data = await response.json();
        onlineRequirementsCache[normalized] = data;
        return data;
    } catch (error) {
        console.log('Não foi possível buscar requisitos online');
        return null;
    }
    */
    
    return null;
}

// Lista completa de jogos disponíveis (nomes formatados para exibição)
const availableGames = [
    // Jogos AAA Modernos
    { id: 'cyberpunk 2077', name: 'Cyberpunk 2077', icon: '🔴' },
    { id: 'elden ring', name: 'Elden Ring', icon: '⚔️' },
    { id: 'starfield', name: 'Starfield', icon: '🚀' },
    { id: 'baldur\'s gate 3', name: 'Baldur\'s Gate 3', icon: '🐉' },
    { id: 'hogwarts legacy', name: 'Hogwarts Legacy', icon: '🪄' },
    { id: 'diablo 4', name: 'Diablo 4', icon: '👹' },
    { id: 'alan wake 2', name: 'Alan Wake 2', icon: '🔦' },
    { id: 'resident evil 4 remake', name: 'Resident Evil 4 Remake', icon: '🧟' },
    { id: 'spider man remastered', name: 'Spider-Man Remastered', icon: '🕷️' },
    { id: 'god of war', name: 'God of War', icon: '⚔️' },
    { id: 'the last of us part i', name: 'The Last of Us Part I', icon: '🧟' },
    { id: 'red dead redemption 2', name: 'Red Dead Redemption 2', icon: '🤠' },
    { id: 'the witcher 3', name: 'The Witcher 3', icon: '🗡️' },
    { id: 'gta v', name: 'GTA V', icon: '🚗' },
    
    // FPS e Battle Royale
    { id: 'call of duty warzone', name: 'Call of Duty: Warzone', icon: '🎯' },
    { id: 'counter strike 2', name: 'Counter-Strike 2', icon: '💣' },
    { id: 'valorant', name: 'Valorant', icon: '🎮' },
    { id: 'apex legends', name: 'Apex Legends', icon: '🏃' },
    { id: 'fortnite', name: 'Fortnite', icon: '🏗️' },
    { id: 'overwatch 2', name: 'Overwatch 2', icon: '🛡️' },
    { id: 'rainbow six siege', name: 'Rainbow Six Siege', icon: '🎖️' },
    { id: 'destiny 2', name: 'Destiny 2', icon: '🌌' },
    { id: 'borderlands 3', name: 'Borderlands 3', icon: '🔫' },
    
    // MOBA e Estratégia
    { id: 'league of legends', name: 'League of Legends', icon: '⚡' },
    { id: 'dota 2', name: 'Dota 2', icon: '🗡️' },
    { id: 'age of empires 4', name: 'Age of Empires IV', icon: '🏰' },
    { id: 'civilization 6', name: 'Civilization VI', icon: '🌍' },
    { id: 'total war warhammer 3', name: 'Total War: Warhammer III', icon: '⚔️' },
    
    // Esportes e Corrida
    { id: 'rocket league', name: 'Rocket League', icon: '⚽' },
    { id: 'fifa 24', name: 'FIFA 24', icon: '⚽' },
    { id: 'forza horizon 5', name: 'Forza Horizon 5', icon: '🏎️' },
    { id: 'f1 23', name: 'F1 23', icon: '🏁' },
    { id: 'nba 2k24', name: 'NBA 2K24', icon: '🏀' },
    
    // Sobrevivência e Sandbox
    { id: 'minecraft', name: 'Minecraft', icon: '🧱' },
    { id: 'rust', name: 'Rust', icon: '🦀' },
    { id: 'ark survival evolved', name: 'ARK: Survival Evolved', icon: '🦖' },
    { id: 'terraria', name: 'Terraria', icon: '⛏️' },
    { id: 'valheim', name: 'Valheim', icon: '🛡️' },
    { id: 'subnautica', name: 'Subnautica', icon: '🌊' },
    
    // RPG e Aventura
    { id: 'skyrim', name: 'The Elder Scrolls V: Skyrim', icon: '🐉' },
    { id: 'fallout 4', name: 'Fallout 4', icon: '☢️' },
    { id: 'assassins creed valhalla', name: 'Assassin\'s Creed Valhalla', icon: '⚔️' },
    { id: 'final fantasy xiv', name: 'Final Fantasy XIV', icon: '⚔️' },
    { id: 'monster hunter world', name: 'Monster Hunter: World', icon: '🦖' },
    { id: 'dark souls 3', name: 'Dark Souls III', icon: '💀' },
    { id: 'sekiro', name: 'Sekiro: Shadows Die Twice', icon: '🗾' },
    { id: 'bloodborne', name: 'Bloodborne', icon: '🩸' },
    
    // Terror e Suspense
    { id: 'resident evil village', name: 'Resident Evil Village', icon: '🧟' },
    { id: 'dead space remake', name: 'Dead Space Remake', icon: '👽' },
    { id: 'phasmophobia', name: 'Phasmophobia', icon: '👻' },
    { id: 'the forest', name: 'The Forest', icon: '🌲' },
    
    // Indie e Casual
    { id: 'hades', name: 'Hades', icon: '🔥' },
    { id: 'hollow knight', name: 'Hollow Knight', icon: '🦗' },
    { id: 'celeste', name: 'Celeste', icon: '⛰️' },
    { id: 'stardew valley', name: 'Stardew Valley', icon: '🚜' },
    { id: 'among us', name: 'Among Us', icon: '👨‍🚀' },
    { id: 'fall guys', name: 'Fall Guys', icon: '🤹' },
    
    // Simuladores
    { id: 'microsoft flight simulator', name: 'Microsoft Flight Simulator', icon: '✈️' },
    { id: 'euro truck simulator 2', name: 'Euro Truck Simulator 2', icon: '🚛' },
    { id: 'farming simulator 22', name: 'Farming Simulator 22', icon: '🚜' },
    { id: 'cities skylines', name: 'Cities: Skylines', icon: '🏙️' },
    
    // Outros Populares
    { id: 'genshin impact', name: 'Genshin Impact', icon: '⚡' },
    { id: 'warframe', name: 'Warframe', icon: '🛸' },
    { id: 'path of exile', name: 'Path of Exile', icon: '💀' },
    { id: 'world of warcraft', name: 'World of Warcraft', icon: '🌍' },
    { id: 'lost ark', name: 'Lost Ark', icon: '⚔️' },
    { id: 'new world', name: 'New World', icon: '🗺️' },
    { id: 'palworld', name: 'Palworld', icon: '🐾' },
    { id: 'helldivers 2', name: 'Helldivers 2', icon: '🛡️' }
];

// Funções auxiliares para controlar dropdown
function showDropdown() {
    gameDropdown.classList.remove('hidden');
    if (gameSelectorGroup) {
        gameSelectorGroup.classList.add('dropdown-open');
    }
}

function hideDropdown() {
    gameDropdown.classList.add('hidden');
    if (gameSelectorGroup) {
        gameSelectorGroup.classList.remove('dropdown-open');
    }
}

// Função para inicializar o seletor de jogos
function initializeGameSelector() {
    // Renderizar lista inicial (limitada para não sobrecarregar)
    const initialGames = availableGames.slice(0, 20);
    renderGameList(initialGames);
    
    // Event listener para busca (com debounce)
    let searchTimeout;
    gameSearchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const searchTerm = normalizeText(e.target.value);
        
        searchTimeout = setTimeout(() => {
            if (searchTerm.length === 0) {
                // Mostrar primeiros 20 jogos quando vazio
                renderGameList(availableGames.slice(0, 20));
                showDropdown();
            } else {
                // Busca inteligente - prioriza correspondências exatas
                const exactMatches = availableGames.filter(game => 
                    normalizeText(game.name) === searchTerm || 
                    normalizeText(game.id) === searchTerm
                );
                
                const startsWith = availableGames.filter(game => 
                    (normalizeText(game.name).startsWith(searchTerm) || 
                     normalizeText(game.id).startsWith(searchTerm)) &&
                    !exactMatches.includes(game)
                );
                
                const contains = availableGames.filter(game => 
                    (normalizeText(game.name).includes(searchTerm) || 
                     normalizeText(game.id).includes(searchTerm)) &&
                    !exactMatches.includes(game) &&
                    !startsWith.includes(game)
                );
                
                const filtered = [...exactMatches, ...startsWith, ...contains];
                renderGameList(filtered);
                showDropdown();
            }
        }, 150);
    });
    
    // Mostrar dropdown ao focar
    gameSearchInput.addEventListener('focus', () => {
        if (!gameNameInput.value) {
            renderGameList(availableGames.slice(0, 20));
        }
        showDropdown();
    });
    
    // Esconder dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.game-selector-wrapper')) {
            hideDropdown();
        }
    });
    
    // Permitir navegação com teclado
    gameSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === 'Escape') {
            e.preventDefault();
            
            if (e.key === 'Escape') {
                hideDropdown();
                return;
            }
            
            const items = gameList.querySelectorAll('.game-item:not(.game-item-no-results)');
            if (items.length === 0) return;
            
            const currentIndex = Array.from(items).findIndex(item => item.classList.contains('selected'));
            
            if (e.key === 'ArrowDown') {
                const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
                items.forEach(item => item.classList.remove('selected'));
                if (items[nextIndex]) {
                    items[nextIndex].classList.add('selected');
                    items[nextIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
            } else if (e.key === 'ArrowUp') {
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
                items.forEach(item => item.classList.remove('selected'));
                if (items[prevIndex]) {
                    items[prevIndex].classList.add('selected');
                    items[prevIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
                }
            } else if (e.key === 'Enter') {
                const selected = gameList.querySelector('.game-item.selected');
                if (selected) {
                    selected.click();
                } else if (items.length > 0) {
                    // Se não há seleção, seleciona o primeiro
                    items[0].click();
                }
            }
        }
    });
}

// Função para renderizar lista de jogos
function renderGameList(games) {
    gameList.innerHTML = '';
    
    if (games.length === 0) {
        gameList.innerHTML = '<div class="game-item-no-results">Nenhum jogo encontrado 😢</div>';
        return;
    }
    
    // Mostrar contador se houver muitos resultados
    if (games.length > 10) {
        const counter = document.createElement('div');
        counter.className = 'game-item-counter';
        counter.textContent = `${games.length} jogos encontrados`;
        counter.style.cssText = 'padding: 0.5rem 1rem; color: var(--neon-blue); font-size: 0.85rem; text-align: center; border-bottom: 1px solid var(--dark-border);';
        gameList.appendChild(counter);
    }
    
    games.forEach((game, index) => {
        const item = document.createElement('div');
        item.className = 'game-item';
        item.innerHTML = `
            <span class="game-item-icon">${game.icon}</span>
            <span class="game-item-name">${game.name}</span>
        `;
        
        item.addEventListener('click', () => {
            selectGame(game);
        });
        
        // Selecionar primeiro item automaticamente se não houver seleção
        if (index === 0 && !gameList.querySelector('.game-item.selected')) {
            item.classList.add('selected');
        }
        
        gameList.appendChild(item);
    });
}

// Função para selecionar um jogo
function selectGame(game) {
    gameNameInput.value = game.id;
    gameSearchInput.value = game.name;
    hideDropdown();
    
    // Adicionar efeito visual
    gameSearchInput.style.borderColor = 'var(--neon-green)';
    gameSearchInput.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.3)';
    setTimeout(() => {
        gameSearchInput.style.borderColor = '';
        gameSearchInput.style.boxShadow = '';
    }, 1000);
}

// Função para normalizar texto (remover acentos, lowercase)
function normalizeText(text) {
    return text.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, '')
        .trim();
}

// Função para identificar CPU e retornar score (melhorada para AMD)
function identifyCPU(cpuText) {
    const normalized = normalizeText(cpuText);
    
    // Primeiro, tentar busca exata ou parcial na base de dados
    // Ordenar por tamanho da chave (mais específico primeiro)
    const sortedKeys = Object.keys(cpuPerformanceDB).sort((a, b) => b.length - a.length);
    
    for (const key of sortedKeys) {
        // Buscar correspondência exata ou parcial
        if (normalized.includes(key)) {
            return cpuPerformanceDB[key];
        }
    }
    
    // Tentar identificar por padrões específicos (AMD primeiro, depois Intel)
    const patterns = {
        // AMD Threadripper
        'threadripper': { base: 85, gen: /(\d{4})/ },
        
        // AMD Ryzen 9
        'ryzen 9': { base: 90, gen: /(\d{4})/, suffix: { 'x3d': 5, 'x': 3, '': 0, 'hx': 2, 'hs': 2, 'h': 1 } },
        
        // AMD Ryzen 7
        'ryzen 7': { base: 70, gen: /(\d{4})/, suffix: { 'x3d': 8, 'x': 5, 'xt': 6, '': 0, 'g': -2, 'u': -5, 'h': 2, 'hs': 3 } },
        
        // AMD Ryzen 5
        'ryzen 5': { base: 55, gen: /(\d{4})/, suffix: { 'x': 3, 'xt': 4, '': 0, 'g': -2, 'u': -5, 'h': 2, 'hs': 3, 'f': -1 } },
        
        // AMD Ryzen 3
        'ryzen 3': { base: 40, gen: /(\d{4})/, suffix: { 'x': 2, '': 0, 'g': -2, 'u': -5 } },
        
        // AMD FX Series
        'fx': { base: 30, model: /(\d{4})/, suffix: { '': 0, 'e': -2 } },
        
        // AMD Athlon
        'athlon': { base: 25, model: /(\d{4})/, suffix: { '': 0, 'ge': 2, 'g': 2, 'u': 1 } },
        
        // Intel Core i9
        'i9': { base: 80, gen: /(\d{4})/ },
        
        // Intel Core i7
        'i7': { base: 65, gen: /(\d{4})/ },
        
        // Intel Core i5
        'i5': { base: 50, gen: /(\d{4})/ },
        
        // Intel Core i3
        'i3': { base: 35, gen: /(\d{4})/ }
    };
    
    for (const [pattern, config] of Object.entries(patterns)) {
        if (normalized.includes(pattern)) {
            let score = config.base;
            
            // Tentar extrair geração/modelo
            if (config.gen) {
                const genMatch = normalized.match(config.gen);
                if (genMatch) {
                    const gen = parseInt(genMatch[1].substring(0, 1));
                    // Ajustar score baseado na geração
                    const genBonus = (gen - 1) * 5;
                    score += genBonus;
                }
            } else if (config.model) {
                const modelMatch = normalized.match(config.model);
                if (modelMatch) {
                    const model = parseInt(modelMatch[1]);
                    // Para FX, modelo maior = melhor (FX-8350 > FX-6300)
                    if (pattern === 'fx') {
                        score += Math.floor(model / 100) * 2;
                    }
                }
            }
            
            // Aplicar sufixos se existirem
            if (config.suffix) {
                for (const [suffix, bonus] of Object.entries(config.suffix)) {
                    if (suffix && normalized.includes(suffix)) {
                        score += bonus;
                        break;
                    }
                }
            }
            
            // Limitar score entre 20 e 100
            return Math.max(20, Math.min(100, score));
        }
    }
    
    // Tentar identificar APUs AMD (com gráficos integrados)
    if (normalized.includes('apu') || (normalized.includes('amd') && (normalized.includes('vega') || normalized.includes('radeon')))) {
        // APUs geralmente têm performance um pouco menor que CPUs equivalentes
        if (normalized.includes('ryzen 7')) return 75;
        if (normalized.includes('ryzen 5')) return 60;
        if (normalized.includes('ryzen 3')) return 40;
        return 35;
    }
    
    // CPU desconhecida - tentar estimar baseado em palavras-chave
    if (normalized.includes('amd')) {
        // Processador AMD genérico - estimativa conservadora
        return 35;
    }
    
    if (normalized.includes('intel')) {
        // Processador Intel genérico - estimativa conservadora
        return 40;
    }
    
    // CPU completamente desconhecida - estimativa muito conservadora
    return 30;
}

// Função para identificar GPU e retornar score
function identifyGPU(gpuText) {
    const normalized = normalizeText(gpuText);
    
    // Buscar correspondência exata ou parcial
    for (const [key, score] of Object.entries(gpuPerformanceDB)) {
        if (normalized.includes(key)) {
            return score;
        }
    }
    
    // Tentar identificar por padrões
    const patterns = {
        'rtx 40': { base: 85, model: /(\d{2})/ },
        'rtx 30': { base: 70, model: /(\d{2})/ },
        'rtx 20': { base: 60, model: /(\d{2})/ },
        'rtx': { base: 55 },
        'gtx 16': { base: 48, model: /(\d{2})/ },
        'gtx 10': { base: 50, model: /(\d{2})/ },
        'gtx 9': { base: 45, model: /(\d{2})/ },
        'gtx': { base: 35 },
        'rx 7': { base: 75, model: /(\d{2})/ },
        'rx 6': { base: 60, model: /(\d{2})/ },
        'rx 5': { base: 50, model: /(\d{2})/ },
        'rx': { base: 40 }
    };
    
    for (const [pattern, config] of Object.entries(patterns)) {
        if (normalized.includes(pattern)) {
            if (config.model) {
                const modelMatch = normalized.match(config.model);
                if (modelMatch) {
                    const model = parseInt(modelMatch[1]);
                    // Ajustar baseado no modelo (maior = melhor)
                    const modelBonus = (model - 50) * 2;
                    return Math.max(20, Math.min(100, config.base + modelBonus));
                }
            }
            return config.base;
        }
    }
    
    // GPU desconhecida - estimativa conservadora
    return 25;
}

// Função para avaliar CPU comparando com requisitos
function evaluateCPU(userCPU, requiredCPUScore) {
    const userScore = identifyCPU(userCPU);
    const ratio = userScore / requiredCPUScore;
    
    if (ratio >= 1.5) return 2.0; // Muito acima
    if (ratio >= 1.2) return 1.7; // Bem acima
    if (ratio >= 1.0) return 1.4; // Acima
    if (ratio >= 0.9) return 1.1; // Próximo
    if (ratio >= 0.8) return 0.9; // Um pouco abaixo
    if (ratio >= 0.7) return 0.7; // Abaixo
    if (ratio >= 0.6) return 0.5; // Bem abaixo
    return 0.3; // Muito abaixo
}

// Função para avaliar GPU comparando com requisitos
function evaluateGPU(userGPU, requiredGPUScore) {
    const userScore = identifyGPU(userGPU);
    const ratio = userScore / requiredGPUScore;
    
    if (ratio >= 1.5) return 2.0; // Muito acima
    if (ratio >= 1.2) return 1.7; // Bem acima
    if (ratio >= 1.0) return 1.4; // Acima
    if (ratio >= 0.9) return 1.1; // Próximo
    if (ratio >= 0.8) return 0.9; // Um pouco abaixo
    if (ratio >= 0.7) return 0.7; // Abaixo
    if (ratio >= 0.6) return 0.5; // Bem abaixo
    return 0.3; // Muito abaixo
}

// Função principal de análise
function analyzePC() {
    const gameName = normalizeText(gameNameInput.value);
    const processor = processorInput.value.trim();
    const gpu = gpuInput.value.trim();
    const ram = parseInt(ramInput.value) || 0;
    const storage = parseInt(storageInput.value) || 0;
    const os = osInput.value;
    
    // Validação básica
    if (!gameName) {
        alert('Por favor, selecione um jogo da lista!');
        gameSearchInput.focus();
        showDropdown();
        return;
    }
    
    if (!processor || !gpu || !ram || !storage || !os) {
        alert('Por favor, preencha todas as configurações do PC!');
        return;
    }
    
    // Esconder resultado anterior
    resultSection.classList.add('hidden');
    
    // Mostrar loading
    loadingSection.classList.remove('hidden');
    
    // Animar FPS
    let fps = 0;
    const fpsInterval = setInterval(() => {
        fps = Math.floor(Math.random() * 60) + 30;
        fpsValue.textContent = fps;
    }, 100);
    
    // Análise melhorada com busca de requisitos
    (async () => {
        try {
            // Atualizar texto de loading
            const loadingText = loadingSection.querySelector('.loading-text');
            
            // Tentar buscar requisitos online primeiro
            if (loadingText) {
                loadingText.textContent = 'Buscando requisitos atualizados...';
            }
            
            let gameReq = await fetchGameRequirementsOnline(gameName);
            let usingOnlineData = false;
            
            // Se não encontrou online, usar base de dados local
            if (!gameReq) {
                if (loadingText) {
                    loadingText.textContent = 'Analisando configurações...';
                }
                
                // Buscar na base de dados local
                gameReq = gameRequirements[gameName];
                
                // Se ainda não encontrou, tentar busca parcial
                if (!gameReq) {
                    for (const [key, req] of Object.entries(gameRequirements)) {
                        if (gameName.includes(key) || key.includes(gameName)) {
                            gameReq = req;
                            break;
                        }
                    }
                }
                
                // Se ainda não encontrou, estimar requisitos
                if (!gameReq) {
                    gameReq = estimateGameRequirements(gameName);
                }
            } else {
                usingOnlineData = true;
                if (loadingText) {
                    loadingText.textContent = 'Requisitos atualizados encontrados!';
                }
            }
            
            // Aguardar um pouco para mostrar o loading
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            clearInterval(fpsInterval);
            loadingSection.classList.add('hidden');
            
            // Identificar componentes do usuário
            const userCPUScore = identifyCPU(processor);
            const userGPUScore = identifyGPU(gpu);
            
            // Avaliar componentes comparando com requisitos mínimos e recomendados
            const cpuScoreMin = evaluateCPU(processor, gameReq.min.cpuScore);
            const gpuScoreMin = evaluateGPU(gpu, gameReq.min.gpuScore);
            
            // Avaliar também contra requisitos recomendados
            const cpuScoreRec = evaluateCPU(processor, gameReq.rec.cpuScore);
            const gpuScoreRec = evaluateGPU(gpu, gameReq.rec.gpuScore);
            
            // Usar média ponderada (60% mínimo, 40% recomendado)
            const cpuScore = (cpuScoreMin * 0.6) + (cpuScoreRec * 0.4);
            const gpuScore = (gpuScoreMin * 0.6) + (gpuScoreRec * 0.4);
            
            // Avaliar RAM (mais preciso)
            let ramScore = 0;
            if (ram >= gameReq.rec.ram) {
                ramScore = 2.0;
            } else if (ram >= gameReq.min.ram * 1.5) {
                ramScore = 1.5;
            } else if (ram >= gameReq.min.ram) {
                ramScore = 1.0;
            } else if (ram >= gameReq.min.ram * 0.8) {
                ramScore = 0.6;
            } else {
                ramScore = 0.3;
            }
            
            // Avaliar armazenamento
            let storageScore = 0;
            if (storage >= gameReq.min.storage * 1.5) {
                storageScore = 1.0;
            } else if (storage >= gameReq.min.storage) {
                storageScore = 0.8;
            } else {
                storageScore = 0.2;
            }
            
            // Score total (pesos ajustados)
            const totalScore = (cpuScore * 0.25) + (gpuScore * 0.55) + (ramScore * 0.15) + (storageScore * 0.05);
            
            // Determinar se roda (threshold mais preciso)
            const meetsMinimum = (cpuScoreMin >= 0.7 && gpuScoreMin >= 0.7 && ram >= gameReq.min.ram && storage >= gameReq.min.storage);
            const canRun = meetsMinimum || totalScore >= 0.65;
            
            // Determinar desempenho
            let performance = 'low';
            let performanceClass = 'low';
            let performancePercent = 25;
            
            const meetsRecommended = (cpuScoreRec >= 1.0 && gpuScoreRec >= 1.0 && ram >= gameReq.rec.ram);
            
            if (meetsRecommended && totalScore >= 1.5) {
                performance = 'ultra';
                performanceClass = 'ultra';
                performancePercent = 100;
            } else if (meetsRecommended || totalScore >= 1.2) {
                performance = 'alta';
                performanceClass = 'high';
                performancePercent = 75;
            } else if (totalScore >= 0.9 || (cpuScoreMin >= 0.9 && gpuScoreMin >= 0.9)) {
                performance = 'média';
                performanceClass = 'medium';
                performancePercent = 50;
            } else if (canRun) {
                performance = 'baixa';
                performanceClass = 'low';
                performancePercent = 25;
            }
            
            // Mostrar resultado
            displayResult(canRun, performance, performanceClass, performancePercent, {
                cpuScore,
                gpuScore,
                ramScore,
                storageScore,
                cpuScoreMin,
                gpuScoreMin,
                cpuScoreRec,
                gpuScoreRec,
                userCPUScore,
                userGPUScore,
                gameReq,
                processor,
                gpu,
                ram,
                storage,
                usingOnlineData,
                gameName: gameNameInput.value
            });
            
        } catch (error) {
            clearInterval(fpsInterval);
            loadingSection.classList.add('hidden');
            alert('Erro ao analisar. Por favor, tente novamente.');
            console.error('Erro na análise:', error);
        }
    })();
}

// Função para estimar requisitos de jogos desconhecidos
function estimateGameRequirements(gameName) {
    const normalized = normalizeText(gameName);
    
    // Padrões baseados em gêneros
    if (normalized.includes('battle royale') || normalized.includes('fps') || normalized.includes('shooter')) {
        return {
            min: { cpuScore: 40, gpuScore: 40, ram: 8, storage: 50 },
            rec: { cpuScore: 60, gpuScore: 55, ram: 16, storage: 50 }
        };
    }
    
    if (normalized.includes('rpg') || normalized.includes('open world') || normalized.includes('adventure')) {
        return {
            min: { cpuScore: 50, gpuScore: 48, ram: 8, storage: 60 },
            rec: { cpuScore: 70, gpuScore: 65, ram: 16, storage: 60 }
        };
    }
    
    if (normalized.includes('indie') || normalized.includes('pixel') || normalized.includes('2d')) {
        return {
            min: { cpuScore: 25, gpuScore: 20, ram: 4, storage: 5 },
            rec: { cpuScore: 40, gpuScore: 35, ram: 8, storage: 5 }
        };
    }
    
    // Padrão conservador para jogos modernos
    return {
        min: { cpuScore: 52, gpuScore: 50, ram: 8, storage: 50 },
        rec: { cpuScore: 68, gpuScore: 62, ram: 16, storage: 50 }
    };
}

// Função para exibir resultado
function displayResult(canRun, performance, performanceClass, performancePercent, scores) {
    resultSection.classList.remove('hidden');
    
    if (!canRun) {
        // PC não roda
        resultIcon.textContent = '🥔';
        resultTitle.textContent = 'PC INSUFICIENTE';
        resultTitle.className = 'result-title error';
        resultMessage.innerHTML = `Seu PC é uma batata, infelizmente não roda esse jogo 🥔😂<br><br>Mas não desanime! Veja as sugestões abaixo para transformar sua batata em uma máquina gamer!`;
        performanceBar.classList.add('hidden');
    } else {
        // PC roda
        resultIcon.textContent = '🎮';
        resultTitle.textContent = 'PC APROVADO!';
        resultTitle.className = 'result-title success';
        
        // Mensagem melhorada com informações sobre a análise
        let dataSource = '';
        if (scores.usingOnlineData) {
            dataSource = '<br><small style="color: var(--neon-green);">✓ Requisitos verificados online</small>';
        } else {
            dataSource = '<br><small style="color: var(--text-secondary);">ℹ Análise baseada em requisitos conhecidos</small>';
        }
        
        resultMessage.innerHTML = `🔥 <strong>BOA NOTÍCIA!</strong> 🔥<br><br>Seu PC consegue rodar esse jogo! Prepare-se para a ação!${dataSource}`;
        performanceBar.classList.remove('hidden');
        performanceFill.className = `bar-fill ${performanceClass}`;
        performanceText.textContent = `Desempenho: ${performance.toUpperCase()}`;
        performanceText.style.color = getPerformanceColor(performanceClass);
    }
    
    // Sugestões de upgrade
    const upgradeSuggestions = generateSuggestions(scores, canRun);
    if (upgradeSuggestions.length > 0) {
        suggestions.classList.remove('hidden');
        suggestionsList.innerHTML = '';
        upgradeSuggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsList.appendChild(li);
        });
    } else {
        suggestions.classList.add('hidden');
    }
    
    // Scroll suave para o resultado
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Função para gerar sugestões
function generateSuggestions(scores, canRun) {
    const suggestions = [];
    
    if (scores.gpuScore < 0.8) {
        suggestions.push(`🎨 Upgrade na Placa de Vídeo: Considere uma GPU mais potente para melhor desempenho gráfico`);
    }
    
    if (scores.cpuScore < 0.8) {
        suggestions.push(`💻 Upgrade no Processador: Um CPU mais moderno pode melhorar significativamente o FPS`);
    }
    
    if (scores.ramScore < 1) {
        const recommended = scores.gameReq.rec.ram;
        suggestions.push(`🧠 Adicione mais RAM: Recomendado ${recommended}GB para uma experiência mais fluida`);
    }
    
    if (scores.storageScore < 1) {
        const required = scores.gameReq.min.storage;
        suggestions.push(`💾 Mais Armazenamento: Você precisa de pelo menos ${required}GB de espaço livre`);
    }
    
    if (canRun && scores.gpuScore < 1.5) {
        suggestions.push(`⚡ Upgrade Opcional: Uma GPU mais potente permitiria jogar em configurações mais altas`);
    }
    
    if (canRun && scores.cpuScore < 1.5) {
        suggestions.push(`⚡ Upgrade Opcional: Um processador melhor aumentaria o desempenho geral`);
    }
    
    if (suggestions.length === 0 && canRun) {
        suggestions.push(`🚀 Seu PC está bem configurado! Aproveite o jogo!`);
    }
    
    return suggestions;
}

// Função para obter cor do desempenho
function getPerformanceColor(performanceClass) {
    const colors = {
        'low': '#ff4444',
        'medium': '#ffaa00',
        'high': '#00ff88',
        'ultra': '#00d9ff'
    };
    return colors[performanceClass] || '#ffffff';
}

// Event Listeners
analyzeBtn.addEventListener('click', analyzePC);

resetBtn.addEventListener('click', () => {
    resultSection.classList.add('hidden');
    loadingSection.classList.add('hidden');
    gameNameInput.value = '';
    gameSearchInput.value = '';
    processorInput.value = '';
    gpuInput.value = '';
    ramInput.value = '';
    storageInput.value = '';
    osInput.value = '';
    hideDropdown();
    gameSearchInput.focus();
});

// Permitir análise com Enter no campo de busca
gameSearchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && gameNameInput.value) {
        analyzePC();
    }
});

processorInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') analyzePC();
});

gpuInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') analyzePC();
});

ramInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') analyzePC();
});

storageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') analyzePC();
});

// Efeito de foco nos inputs
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Animação inicial
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Inicializar seletor de jogos
    initializeGameSelector();
});

