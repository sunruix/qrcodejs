var QRMode = {
    MODE_NUMBER: 0,
    MODE_ALPHA_NUM: 1,
    MODE_8BIT_BYTE: 2,
    MODE_KANJI: 3,
    MODE_STRUCTURED_APPEND: 4,
    MODE_ECI: 5,
    MODE_FNC1: 6
};
var QRModeIndicator = [0x1, 0x2, 0x4, 0x8, 0x3, 0x7, 0x35];
var QRBitsNumberOfCharacterCountIndicator = [
    [10, 9, 8, 8],          // version 1 ~ 9, mode: number, alphanum, byte, kanji
    [12, 11, 16, 10],       // version 10 ~ 26
    [14, 13, 16, 12]        // version 27 ~ 40
];
var QRErrorCorrectionLevel = {L : 1, M : 0, Q : 3, H : 2};
var QRErrorCorrectionLevelIndex = [1, 0, 3, 2]; // <-[QRErrorCorrectionLevel.M] == 1
var QRMaskPattern = {PATTERN000 : 0, PATTERN001 : 1, PATTERN010 : 2, PATTERN011 : 3, PATTERN100 : 4, PATTERN101 : 5, PATTERN110 : 6, PATTERN111 : 7};
var DataCapcity = [
                        [[], // numeric mode
                            [41, 34, 27, 17],
                            [77, 63, 48, 34],
                            [127, 101, 77, 58],
                            [187, 149, 111, 82],
                            [255, 202, 144, 106],
                            [322, 255, 178, 139],
                            [370, 293, 207, 154],
                            [461, 365, 259, 202],
                            [552, 432, 312, 235],
                            [652, 513, 364, 288],
                            [772, 604, 427, 331],
                            [883, 691, 489, 374],
                            [1022, 796, 580, 427],
                            [1101, 871, 621, 468],
                            [1250, 991, 703, 530],
                            [1408, 1082, 775, 602],
                            [1548, 1212, 876, 674],
                            [1725, 1346, 948, 746],
                            [1903, 1500, 1063, 813],
                            [2061, 1600, 1159, 919],
                            [2232, 1708, 1224, 969],
                            [2409, 1872, 1358, 1056],
                            [2620, 2059, 1468, 1108],
                            [2812, 2188, 1588, 1228],
                            [3057, 2395, 1718, 1286],
                            [3283, 2544, 1804, 1425],
                            [3517, 2701, 1933, 1501],
                            [3669, 2857, 2085, 1581],
                            [3909, 3035, 2181, 1677],
                            [4158, 3289, 2358, 1782],
                            [4417, 3486, 2473, 1897],
                            [4686, 3693, 2670, 2022],
                            [4965, 3909, 2805, 2157],
                            [5253, 4134, 2949, 2301],
                            [5529, 4343, 3081, 2361],
                            [5836, 4588, 3244, 2524],
                            [6153, 4775, 3417, 2625],
                            [6479, 5039, 3599, 2735],
                            [6743, 5313, 3791, 2927],
                            [7089, 5596, 3993, 3057]],
                        [[], // alphanumeric mode
                            [25, 20, 16, 10],
                            [47, 38, 29, 20],
                            [77, 61, 47, 35],
                            [114, 90, 67, 50],
                            [154, 122, 87, 64],
                            [195, 154, 108, 84],
                            [224, 178, 125, 93],
                            [279, 221, 157, 122],
                            [335, 262, 189, 143],
                            [395, 311, 221, 174],
                            [468, 366, 259, 200],
                            [535, 419, 296, 227],
                            [619, 483, 352, 259],
                            [667, 528, 376, 283],
                            [758, 600, 426, 321],
                            [854, 656, 470, 365],
                            [938, 734, 531, 408],
                            [1046, 816, 574, 452],
                            [1153, 909, 644, 493],
                            [1249, 970, 702, 557],
                            [1352, 1035, 742, 587],
                            [1460, 1134, 823, 640],
                            [1588, 1248, 890, 672],
                            [1704, 1326, 963, 744],
                            [1853, 1451, 1041, 779],
                            [1990, 1542, 1094, 864],
                            [2132, 1637, 1172, 910],
                            [2223, 1732, 1263, 958],
                            [2369, 1839, 1322, 1016],
                            [2520, 1994, 1429, 1080],
                            [2677, 2113, 1499, 1150],
                            [2840, 2238, 1618, 1226],
                            [3009, 2369, 1700, 1307],
                            [3183, 2506, 1787, 1394],
                            [3351, 2632, 1867, 1431],
                            [3537, 2780, 1966, 1530],
                            [3729, 2894, 2071, 1591],
                            [3927, 3054, 2181, 1658],
                            [4087, 3220, 2298, 1774],
                            [4296, 3391, 2420, 1852]],
                        [[],  // byte mode
                            [17, 14, 11, 7],
                            [32, 26, 20, 14],
                            [53, 42, 32, 24],
                            [78, 62, 46, 34],
                            [106, 84, 60, 44],
                            [134, 106, 74, 58],
                            [154, 122, 86, 64],
                            [192, 152, 108, 84],
                            [230, 180, 130, 98],
                            [271, 213, 151, 119],
                            [321, 251, 177, 137],
                            [367, 287, 203, 155],
                            [425, 331, 241, 177],
                            [458, 362, 258, 194],
                            [520, 412, 292, 220],
                            [586, 450, 322, 250],
                            [644, 504, 364, 280],
                            [718, 560, 394, 310],
                            [792, 624, 442, 338],
                            [858, 666, 482, 382],
                            [929, 711, 509, 403],
                            [1003, 779, 565, 439],
                            [1091, 857, 611, 461],
                            [1171, 911, 661, 511],
                            [1273, 997, 715, 535],
                            [1367, 1059, 751, 593],
                            [1465, 1125, 805, 625],
                            [1528, 1190, 868, 658],
                            [1628, 1264, 908, 698],
                            [1732, 1370, 982, 742],
                            [1840, 1452, 1030, 790],
                            [1952, 1538, 1112, 842],
                            [2068, 1628, 1168, 898],
                            [2188, 1722, 1228, 958],
                            [2303, 1809, 1283, 983],
                            [2431, 1911, 1351, 1051],
                            [2563, 1989, 1423, 1093],
                            [2699, 2099, 1499, 1139],
                            [2809, 2213, 1579, 1219],
                            [2953, 2331, 1663, 1273]],
                        [[],  // kanji mode
                            [10, 8, 7, 4],
                            [20, 16, 12, 8],
                            [32, 26, 20, 15],
                            [48, 38, 28, 21],
                            [65, 52, 37, 27],
                            [82, 65, 45, 36],
                            [95, 75, 53, 39],
                            [118, 93, 66, 52],
                            [141, 111, 80, 60],
                            [167, 131, 93, 74],
                            [198, 155, 109, 85],
                            [226, 177, 125, 96],
                            [262, 204, 149, 109],
                            [282, 223, 159, 120],
                            [320, 254, 180, 136],
                            [361, 277, 198, 154],
                            [397, 310, 224, 173],
                            [442, 345, 243, 191],
                            [488, 384, 272, 208],
                            [528, 410, 297, 235],
                            [572, 438, 314, 248],
                            [618, 480, 348, 270],
                            [672, 528, 376, 284],
                            [721, 561, 407, 315],
                            [784, 614, 440, 330],
                            [842, 652, 462, 365],
                            [902, 692, 496, 385],
                            [940, 732, 534, 405],
                            [1002, 778, 559, 430],
                            [1066, 843, 604, 457],
                            [1132, 894, 634, 486],
                            [1201, 947, 684, 518],
                            [1273, 1002, 719, 553],
                            [1347, 1060, 756, 590],
                            [1417, 1113, 790, 605],
                            [1496, 1176, 832, 647],
                            [1577, 1224, 876, 673],
                            [1661, 1292, 923, 701],
                            [1729, 1362, 972, 750],
                            [1817, 1435, 1024, 784]]
];
var QRCodewordsCount = [[],      // Number of data codewords. version as row, error correction level(L, M, Q, H) as col
        [19, 16, 13, 9],
        [34, 28, 22, 16],
        [55, 44, 34, 26],
        [80, 64, 48, 36],
        [108, 86, 62, 46],
        [136, 108, 76, 60],
        [156, 124, 88, 66],
        [194, 154, 110, 86],
        [232, 182, 132, 100],
        [274, 216, 154, 122],
        [324, 254, 180, 140],
        [370, 290, 206, 158],
        [428, 334, 244, 180],
        [461, 365, 261, 197],
        [523, 415, 295, 223],
        [589, 453, 325, 253],
        [647, 507, 367, 283],
        [721, 563, 397, 313],
        [795, 627, 445, 341],
        [861, 669, 485, 385],
        [932, 714, 512, 406],
        [1006, 782, 568, 442],
        [1094, 860, 614, 464],
        [1174, 914, 664, 514],
        [1276, 1000, 718, 538],
        [1370, 1062, 754, 596],
        [1468, 1128, 808, 628],
        [1531, 1193, 871, 661],
        [1631, 1267, 911, 701],
        [1735, 1373, 985, 745],
        [1843, 1455, 1033, 793],
        [1955, 1541, 1115, 845],
        [2071, 1631, 1171, 901],
        [2191, 1725, 1231, 961],
        [2306, 1812, 1286, 986],
        [2434, 1914, 1354, 105],
        [2566, 1992, 1426, 1096],
        [2702, 2102, 1502, 1142],
        [2812, 2216, 1582, 1222],
        [2956, 2334, 1666, 1276],
];
var QRPad = [0xEC, 0x11];
var QRRSBlockTable = [[],
                    [1, 26, 19],
                    [1, 26, 16],
                    [1, 26, 13],
                    [1, 26, 9],
                    [1, 44, 34],
                    [1, 44, 28],
                    [1, 44, 22],
                    [1, 44, 16],
                    [1, 70, 55],
                    [1, 70, 44],
                    [2, 35, 17],
                    [2, 35, 13],
                    [1, 100, 80],
                    [2, 50, 32],
                    [2, 50, 24],
                    [4, 25, 9],
                    [1, 134, 108],
                    [2, 67, 43],
                    [2, 33, 15, 2, 34, 16],
                    [2, 33, 11, 2, 34, 12],
                    [2, 86, 68],
                    [4, 43, 27],
                    [4, 43, 19],
                    [4, 43, 15],
                    [2, 98, 78],
                    [4, 49, 31],
                    [2, 32, 14, 4, 33, 15],
                    [4, 39, 13, 1, 40, 14],
                    [2, 121, 97],
                    [2, 60, 38, 2, 61, 39],
                    [4, 40, 18, 2, 41, 19],
                    [4, 40, 14, 2, 41, 15],
                    [2, 146, 116],
                    [3, 58, 36, 2, 59, 37],
                    [4, 36, 16, 4, 37, 17],
                    [4, 36, 12, 4, 37, 13],
                    [2, 86, 68, 2, 87, 69],
                    [4, 69, 43, 1, 70, 44],
                    [6, 43, 19, 2, 44, 20],
                    [6, 43, 15, 2, 44, 16],
                    [4, 101, 81],
                    [1, 80, 50, 4, 81, 51],
                    [4, 50, 22, 4, 51, 23],
                    [3, 36, 12, 8, 37, 13],
                    [2, 116, 92, 2, 117, 93],
                    [6, 58, 36, 2, 59, 37],
                    [4, 46, 20, 6, 47, 21],
                    [7, 42, 14, 4, 43, 15],
                    [4, 133, 107],
                    [8, 59, 37, 1, 60, 38],
                    [8, 44, 20, 4, 45, 21],
                    [12, 33, 11, 4, 34, 12],
                    [3, 145, 115, 1, 146, 116],
                    [4, 64, 40, 5, 65, 41],
                    [11, 36, 16, 5, 37, 17],
                    [11, 36, 12, 5, 37, 13],
                    [5, 109, 87, 1, 110, 88],
                    [5, 65, 41, 5, 66, 42],
                    [5, 54, 24, 7, 55, 25],
                    [11, 36, 12],
                    [5, 122, 98, 1, 123, 99],
                    [7, 73, 45, 3, 74, 46],
                    [15, 43, 19, 2, 44, 20],
                    [3, 45, 15, 13, 46, 16],
                    [1, 135, 107, 5, 136, 108],
                    [10, 74, 46, 1, 75, 47],
                    [1, 50, 22, 15, 51, 23],
                    [2, 42, 14, 17, 43, 15],
                    [5, 150, 120, 1, 151, 121],
                    [9, 69, 43, 4, 70, 44],
                    [17, 50, 22, 1, 51, 23],
                    [2, 42, 14, 19, 43, 15],
                    [3, 141, 113, 4, 142, 114],
                    [3, 70, 44, 11, 71, 45],
                    [17, 47, 21, 4, 48, 22],
                    [9, 39, 13, 16, 40, 14],
                    [3, 135, 107, 5, 136, 108],
                    [3, 67, 41, 13, 68, 42],
                    [15, 54, 24, 5, 55, 25],
                    [15, 43, 15, 10, 44, 16],
                    [4, 144, 116, 4, 145, 117],
                    [17, 68, 42],
                    [17, 50, 22, 6, 51, 23],
                    [19, 46, 16, 6, 47, 17],
                    [2, 139, 111, 7, 140, 112],
                    [17, 74, 46],
                    [7, 54, 24, 16, 55, 25],
                    [34, 37, 13],
                    [4, 151, 121, 5, 152, 122],
                    [4, 75, 47, 14, 76, 48],
                    [11, 54, 24, 14, 55, 25],
                    [16, 45, 15, 14, 46, 16],
                    [6, 147, 117, 4, 148, 118],
                    [6, 73, 45, 14, 74, 46],
                    [11, 54, 24, 16, 55, 25],
                    [30, 46, 16, 2, 47, 17],
                    [8, 132, 106, 4, 133, 107],
                    [8, 75, 47, 13, 76, 48],
                    [7, 54, 24, 22, 55, 25],
                    [22, 45, 15, 13, 46, 16],
                    [10, 142, 114, 2, 143, 115],
                    [19, 74, 46, 4, 75, 47],
                    [28, 50, 22, 6, 51, 23],
                    [33, 46, 16, 4, 47, 17],
                    [8, 152, 122, 4, 153, 123],
                    [22, 73, 45, 3, 74, 46],
                    [8, 53, 23, 26, 54, 24],
                    [12, 45, 15, 28, 46, 16],
                    [3, 147, 117, 10, 148, 118],
                    [3, 73, 45, 23, 74, 46],
                    [4, 54, 24, 31, 55, 25],
                    [11, 45, 15, 31, 46, 16],
                    [7, 146, 116, 7, 147, 117],
                    [21, 73, 45, 7, 74, 46],
                    [1, 53, 23, 37, 54, 24],
                    [19, 45, 15, 26, 46, 16],
                    [5, 145, 115, 10, 146, 116],
                    [19, 75, 47, 10, 76, 48],
                    [15, 54, 24, 25, 55, 25],
                    [23, 45, 15, 25, 46, 16],
                    [13, 145, 115, 3, 146, 116],
                    [2, 74, 46, 29, 75, 47],
                    [42, 54, 24, 1, 55, 25],
                    [23, 45, 15, 28, 46, 16],
                    [17, 145, 115],
                    [10, 74, 46, 23, 75, 47],
                    [10, 54, 24, 35, 55, 25],
                    [19, 45, 15, 35, 46, 16],
                    [17, 145, 115, 1, 146, 116],
                    [14, 74, 46, 21, 75, 47],
                    [29, 54, 24, 19, 55, 25],
                    [11, 45, 15, 46, 46, 16],
                    [13, 145, 115, 6, 146, 116],
                    [14, 74, 46, 23, 75, 47],
                    [44, 54, 24, 7, 55, 25],
                    [59, 46, 16, 1, 47, 17],
                    [12, 151, 121, 7, 152, 122],
                    [12, 75, 47, 26, 76, 48],
                    [39, 54, 24, 14, 55, 25],
                    [22, 45, 15, 41, 46, 16],
                    [6, 151, 121, 14, 152, 122],
                    [6, 75, 47, 34, 76, 48],
                    [46, 54, 24, 10, 55, 25],
                    [2, 45, 15, 64, 46, 16],
                    [17, 152, 122, 4, 153, 123],
                    [29, 74, 46, 14, 75, 47],
                    [49, 54, 24, 10, 55, 25],
                    [24, 45, 15, 46, 46, 16],
                    [4, 152, 122, 18, 153, 123],
                    [13, 74, 46, 32, 75, 47],
                    [48, 54, 24, 14, 55, 25],
                    [42, 45, 15, 32, 46, 16],
                    [20, 147, 117, 4, 148, 118],
                    [40, 75, 47, 7, 76, 48],
                    [43, 54, 24, 22, 55, 25],
                    [10, 45, 15, 67, 46, 16],
                    [19, 148, 118, 6, 149, 119],
                    [18, 75, 47, 31, 76, 48],
                    [34, 54, 24, 34, 55, 25],
                    [20, 45, 15, 61, 46, 16]];

function QRCodewords(count) {
    this.words = new Uint8Array(count);
    this.bitsCount = 0;
}
QRCodewords.prototype = {
    push: function(code, length) {
        var wordIndex = this.bitsCount >> 3;
        var bitIndex = this.bitsCount & 0x7;    // index inside codeword
        this.bitsCount += length;
        while (length > 8 - bitIndex) {         // putin the code
            length -= (8 - bitIndex);
            this.words[wordIndex++] |= code >>> length;
            bitIndex = 0;
            code &= 0xffffffff >>> (32 - length)
        }
        this.words[wordIndex] |= code << (8 - bitIndex - length);
    },
    fill: function() {
        var wordIndex = (this.bitsCount >> 3) + 1;
        var i = 0;
        while (wordIndex < this.words.length) {
            this.words[wordIndex++] = QRPad[i++ & 1];
        }
    }
}

function QRData(str, errorCorrectionLevel = QRErrorCorrectionLevel.Q) {
    this.str = str;
    this.ecLevel = errorCorrectionLevel;
    this.mode = this.getMode();
    if (this.mode == QRMode.MODE_8BIT_BYTE) {
        encoder = new TextEncoder();
        this.bytes = encoder.encode(str);
        this.charCount = this.bytes.length;
    } else {
        this.charCount = this.str.length;
    }
    this.version = this.getVersion(this.charCount, this.ecLevel);
    this.codewords = new QRCodewords(QRCodewordsCount[this.version][QRErrorCorrectionLevelIndex[this.ecLevel]]);
    this.encodeWords();
}

QRData.prototype = {
    getMode: function() {
        var otherThanNum = new RegExp('[^0-9]');
        var otherThanAlphanum =  new RegExp('[^0-9A-Z $%+*/.:-]');
        return otherThanNum.test(this.str) ? (otherThanAlphanum.test(this.str) ? QRMode.MODE_8BIT_BYTE : QRMode.MODE_ALPHA_NUM) : QRMode.MODE_NUMBER;
    },
    getVersion: function() {
        var capaTable = DataCapcity[this.mode];
        for (var version = 1, j = QRErrorCorrectionLevelIndex[this.ecLevel];
                version < capaTable.length && capaTable[version][j] < this.charCount;
                ++version);
        if (version >= capaTable.length) {
            throw new Error("Too long data, " + textLength + " bytes");
        }
        return version;
    },
    encodeWords: function() {
        this.codewords.push(QRModeIndicator[this.mode], 4);
        this.codewords.push(this.charCount, QRBitsNumberOfCharacterCountIndicator[this.version < 10 ? 0 : (this.version < 27 ? 1 : 2)][this.mode]);

        var code;
        if (this.mode == QRMode.MODE_NUMBER) {
            for (let i = 0; i < this.str.length; i += 3) {
                code = parseInt(this.str.slice(i, i + 3));
                this.codewords.push(code, code < 10 ? 4 : (code < 100 ? 7 : 9));
            }
        } else if (this.mode == QRMode.MODE_ALPHA_NUM) {
            var alphanum = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:"
            for (var i = 0; i + 1 < this.str.length; i += 2) {
                code = alphanum.indexOf(this.str[i]) * 45 + alphanum.indexOf(this.str[i + 1]);
                this.codewords.push(code, 11);
            }
            if (i < this.str.length) {
                this.codewords.push(alphanum.indexOf(this.str[i]), 6);
            }
        } else if (this.mode == QRMode.MODE_8BIT_BYTE) {
            for (let i = 0; i < this.bytes.length; ++i) {
                this.codewords.push(this.bytes[i], 8);
            }
        }
        this.codewords.fill();
    }
}

var gf256 = new function () {
    this.POLY_DEC = new Uint8Array(1 << 8);
    this.LOG = new Uint8Array(1 << 8);
    this.log = function(n) {
        return this.LOG[n];
    }
    this.poly = function(n) {
        return this.POLY_DEC[n % 255];
    }
    var primitive = 0x11d; //000100011101
    this.POLY_DEC[0] = 1;
    for (let i = 1; i < 256; ++i) {
        this.POLY_DEC[i] = this.POLY_DEC[i - 1] >= 0x80 ? (this.POLY_DEC[i - 1] << 1) ^ primitive : this.POLY_DEC[i - 1] << 1;
    }
    for (let i = 0; i < 255; ++i) {
        this.LOG[this.POLY_DEC[i]] = i;
    }
}
var PolynomialOperation = {
    add : function(p1, p2) {
        var p = new Uint8Array(p1.length > p2.length ? p1.length : p2.length);
        for (let i = 0; i < p1.length && i < p2.length; ++i) {
            p[i] = p1[i] ^ p2[i];
        }
        return p;
    },
    multiply : function(p1, p2) {
        var p = new Uint8Array(p1.length + p2.length - 1);
        for (let i = 0; i < p1.length; ++i) {
            for (let j = 0; j < p2.length; ++j) {
                p[i + j] ^= gf256.poly(gf256.log(p1[i]) + gf256.log(p2[j]));
            }
        }
        return p;
    },
    divide : function(p1, p2) {
        var p = p1.slice(p1.length - p2.length, p1.length);
        for (let i = p1.length - p2.length - 1; i >= 0; --i) {
            coef = gf256.log(p[p.length - 1]);
            for (let j = p.length - 1; j > 0; --j) {
                p[j] = p[j - 1] ^ gf256.poly(gf256.log(p2[j - 1]) + coef);
            }
            p[0] = p1[i];
        }
        coef = gf256.log(p[p.length - 1]);
        for (let j = p.length - 1; j > 0; --j) {
            p[j] = p[j - 1] ^ gf256.poly(gf256.log(p2[j - 1]) + coef);
        }
        return p.slice(1, p.length);
    },
    shift : function(p, n) {
        var pp = new Uint8Array(p.length + n);
        for (let i = 0; i < p.length; ++i) {
            pp[i + n] = p[i];
        }
        return pp;
    }
}
function GeneratorPolynomial(n) {
    var p1 = new Uint8Array([1, 1]);
    for (i = 2; i <= n; ++i) {
        var p = PolynomialOperation.multiply(p1, new Uint8Array([gf256.poly(i - 1), 1]));
        p1 = p;
    }
    return p;
}
QRBlock = function(n, m) {
    this.data = new Uint8Array(m);
    this.ec = new Uint8Array(n - m);
}
blockStatus = function(version, ecLevel) {
    this.blocks = new Array();
    var l = QRRSBlockTable[(version - 1) * 4 + QRErrorCorrectionLevelIndex[ecLevel]];
    for (let i = 0; i < l.length; i += 3) {
        for (let j = 0; j < l[i]; ++j) {
            this.blocks.push(new QRBlock(l[i + 1], l[i + 2]));
        }
    }
}
function SimpleRS(bits, gp, ecLen) {
    if (bits != 0) {
        var bitsLen = function(n) { var len = 0; while (n >> ++len); return n == 0 ? 0 : len; }
        var rem = bits << ecLen;
        var len = bitsLen(bits) + ecLen;
        gp <<= len - bitsLen(gp);
        while (len > ecLen) {
            rem ^= gp;
            while (rem >> (len - 1) == 0) {
                gp >>= 1;
                len -= 1;
            }
        }
        return (bits << ecLen | rem);
    } else {
        return 0;
    }
}
function test() {
    for (l in QRErrorCorrectionLevel) {
        for (let i = 0; i < 8; ++i) {
            var lBits = QRErrorCorrectionLevel[l];
            console.log(lBits, i, (SimpleRS(lBits << 3 | i, 0x537, 10) ^ 0x5412).toString(16));
        }
    }
    for (let v = 7; v < 41; ++v) {
        //1 1111 0010 0101
        console.log(v, SimpleRS(v, 0x1f25, 12).toString(16));
    }
}
// gp = new GeneratorPolynomial(128);
cw = new Uint8Array([32, 91, 11, 120, 209, 114, 220, 77, 67, 64, 236, 17, 236, 17, 236, 17]);
cw.reverse();
cw = PolynomialOperation.shift(cw, 10);
// console.log(PolynomialOperation.divide(cw, GeneratorPolynomial(10)));
// console.log(gf256.LOG);
// console.log(GeneratorPolynomial(10));
