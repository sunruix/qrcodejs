/**
 * @fileoverview
 * - Using the 'QRCode for Javascript library'
 * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
 * - this library has no dependencies.
 * 
 * @author davidshimjs
 * @see <a href="http://www.d-project.com/" target="_blank">http://www.d-project.com/</a>
 * @see <a href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</a>
 */
var QRCode;

(function () {
    //---------------------------------------------------------------------
    // QRCode for JavaScript
    //
    // Copyright (c) 2009 Kazuhiko Arase
    //
    // URL: http://www.d-project.com/
    //
    // Licensed under the MIT license:
    //   http://www.opensource.org/licenses/mit-license.php
    //
    // The word "QR Code" is registered trademark of 
    // DENSO WAVE INCORPORATED
    //   http://www.denso-wave.com/qrcode/faqpatent-e.html
    //
    //---------------------------------------------------------------------
    //https://www.swisseduc.ch/informatik/theoretische_informatik/qr_codes/docs/qr_standard.pdf

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
    var QRRSBlockTable = [ [1, 26, 19],
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
    var QRAlignmentPatternLocationTable = [[],
                    [],
                    [6, 18],
                    [6, 22],
                    [6, 26],
                    [6, 30],
                    [6, 34],
                    [6, 22, 38],
                    [6, 24, 42],
                    [6, 26, 46],
                    [6, 28, 50],
                    [6, 30, 54],
                    [6, 32, 58],
                    [6, 34, 62],
                    [6, 26, 46, 66],
                    [6, 26, 48, 70],
                    [6, 26, 50, 74],
                    [6, 30, 54, 78],
                    [6, 30, 56, 82],
                    [6, 30, 58, 86],
                    [6, 34, 62, 90],
                    [6, 28, 50, 72, 94],
                    [6, 26, 50, 74, 98],
                    [6, 30, 54, 78, 102],
                    [6, 28, 54, 80, 106],
                    [6, 32, 58, 84, 110],
                    [6, 30, 58, 86, 114],
                    [6, 34, 62, 90, 118],
                    [6, 26, 50, 74, 98, 122],
                    [6, 30, 54, 78, 102, 126],
                    [6, 26, 52, 78, 104, 130],
                    [6, 30, 56, 82, 108, 134],
                    [6, 34, 60, 86, 112, 138],
                    [6, 30, 58, 86, 114, 142],
                    [6, 34, 62, 90, 118, 146],
                    [6, 30, 54, 78, 102, 126, 150],
                    [6, 24, 50, 76, 102, 128, 154],
                    [6, 28, 54, 80, 106, 132, 158],
                    [6, 32, 58, 84, 110, 136, 162],
                    [6, 26, 54, 82, 110, 138, 166],
                    [6, 30, 58, 86, 114, 142, 170]];
    var QRFormatEC = {
        gp: 0x537,         // 101 0011 0111
        mask: 0x5412,      // 101 0100 0001 0010
        len: 10
    }
    var QRVersionEC = {
        gp: 0x1f25,        // 1 1111 0010 0101
        len: 12
    }
    var QRMask = [
        function(i, j) { return ((i + j) & 1) == 0; },    // (i + j) mod 2 = 0
        function(i, j) { return (i & 1) == 0; },             // i mod 2 = 0
        function(i, j) { return j % 3 == 0; },             // j mod 3 = 0
        function(i, j) { return (i + j) % 3 == 0; },    // (i + j) mod 3 = 0
        function(i, j) { return (((i >> 1) + Math.floor(j / 3)) & 1) == 0; }, // (i/2 + j/3) mod 2 = 0
        function(i, j) { return i * j % 6 == 0 },       // (ij) mod 2 + (ij) mod 3 = 0
        function(i, j) { var k=i*j; return (((k & 1) + (k % 3)) & 1) == 0; },       // ((ij) mod 2 + (ij) mod 3) mod 2 = 0
        function(i, j) { return ((((i + j) & 1) + ((i * j) % 3)) & 1) == 0; },       // ((i+j) mod 2 + (ij) mod 3) mod 2 = 0
        function(i, j) { return false; }
    ]
    function QRMaskPenalty(matrix, size) {
        function condition1() {             // Adjacent modules in row/column in same color. 3 points each pattern.
            var i, j, k, score = 0;
            for (i = 0; i < size; ++i) {
                for (j = 0; j < size; j += k) {
                    for (k = 0; j + k < size && matrix[i][j + k] == matrix[i][j]; ++k);
                    score += k < 5 ? 0 : 3 + k - 5;
                }
                for (let j = 0; j < size; j += k) {
                    for (k = 0; j + k < size && matrix[j + k][i] == matrix[j][i]; ++k);
                    score += k < 5 ? 0 : 3 + k - 5;
                }
            }
            return score;
        }
        function condition2() {             // Block of modules in same color. 3 points per 4x4 square.
            var score = 0;
            for (let i = 0; i + 1 < size; ++i) {
                for (let j = 0; j + 1 < size; ++j) {
                    if (matrix[i][j] == matrix[i + 1][j] &&
                        matrix[i][j] == matrix[i][j + 1] &&
                        matrix[i][j] == matrix[i + 1][j + 1]) {
                            score += 3;
                        }
                }
            }
            return score;
        } 
        function condition3() {             // 1:1:3:1:1 ratio(dark:light:dark:light:dark). 40 points each pattern.
            var score = 0;
            for (let i = 0; i < size; ++i) {
                for (let j = 0; j + 6 < size; ++j) {
                    if ((matrix[i][j] & 1) == 1 &&
                            (matrix[i][j + 1] & 1) == 0 &&
                            (matrix[i][j + 2] & 1) == 1 &&
                            (matrix[i][j + 3] & 1) == 1 &&
                            (matrix[i][j + 4] & 1) == 1 &&
                            (matrix[i][j + 5] & 1) == 0 &&
                            (matrix[i][j + 6] & 1) == 1) {
                        score += 40;
                    }
                    if ((matrix[j][i] & 1) == 1 &&
                            (matrix[j + 1][i] & 1) == 0 &&
                            (matrix[j + 2][i] & 1) == 1 &&
                            (matrix[j + 3][i] & 1) == 1 &&
                            (matrix[j + 4][i] & 1) == 1 &&
                            (matrix[j + 5][i] & 1) == 0 &&
                            (matrix[j + 6][i] & 1) == 1) {
                        score += 40;
                    }
                }
            }
            return score;
        }
        function condition4() {          // Propotion of dark modules. Ratio points 10 every 5%.
            var darkCount = 0;
            for (let i = 0; i < size; ++i) {
                for (let j = 0; j < size; ++j) {
                    if (matrix[i][j] & 1 == 1) {
                        darkCount += 1;
                    }
                }
            }
            var r = Math.floor(100 * darkCount / (size * size));
            return Math.floor(Math.abs(r - 50) / 5) * 10;
        }
        // var a, b, c, d;
        a = condition1(); b = condition2(); c = condition3(); d = condition4();
        // console.log(a, b, c, d);
        return a + b + c + d;
        // return condition1() + condition2() + condition3() + condition4();
    }
    function QREncodeTool(count) {
        this.words = new Uint8Array(count);
        this.bitsCount = 0;
    }
    QREncodeTool.prototype = {
        push: function(code, length) {
            var wordIndex = this.bitsCount >> 3;
            var bitIndex = this.bitsCount & 0x7;    // index inside codeword
            this.bitsCount += length;
            while (length > 8 - bitIndex) {         // putin the code
                length -= (8 - bitIndex);
                this.words[wordIndex++] |= (code >>> length);
                bitIndex = 0;
                code &= (0xffffffff >>> (32 - length));
            }
            this.words[wordIndex] |= (code << (8 - bitIndex - length));
        },
        fill: function() {
            var wordIndex = (this.bitsCount >> 3) + (this.bitsCount & 0x7 ? 1 : 0) + 0;
            var i = 1;
            while (wordIndex < this.words.length) {
                this.words[wordIndex++] = QRPad[i ^= 1];
            }
        }
    }

    var gf256 = new function () {
        this.POLY_DEC = new Uint8Array(256);
        this.LOG = new Uint8Array(256);
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
        console.log(this.LOG);
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
            var np = new Uint8Array(p.length + n);
            for (let i = 0; i < p.length; ++i) {
                np[i + n] = p[i];
            }
            return np;
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
    function determineMode(str) {
        var otherThanNum = new RegExp('[^0-9]');
        var otherThanAlphanum =  new RegExp('[^0-9A-Z $%+*/.:-]');
        return otherThanNum.test(str) ? (otherThanAlphanum.test(str) ? QRMode.MODE_8BIT_BYTE : QRMode.MODE_ALPHA_NUM) : QRMode.MODE_NUMBER;
    }
    function minVersion(str, mode, ecLevel) {
        var capaTable = DataCapcity[mode];
        var charCount = mode == QRMode.MODE_8BIT_BYTE ? ((new TextEncoder()).encode(str)).length : str.length;
        for (var version = 1, j = QRErrorCorrectionLevelIndex[ecLevel];
                version < capaTable.length && capaTable[version][j] < charCount;
                ++version);
        if (version >= capaTable.length) {
            throw new Error("Too long data, " + textLength + " bytes");
        }
        return version;
    }
    function encodeRaw(str, mode, version, ecLevel) {
        var encodeTool = new QREncodeTool(QRCodewordsCount[version][QRErrorCorrectionLevelIndex[ecLevel]]);
        encodeTool.push(QRModeIndicator[mode], 4);
        if (mode == QRMode.MODE_8BIT_BYTE) {
            str = (new TextEncoder()).encode(str);
        }
        encodeTool.push(str.length, QRBitsNumberOfCharacterCountIndicator[version < 10 ? 0 : (version < 27 ? 1 : 2)][mode]);

        if (mode == QRMode.MODE_NUMBER) {
            for (let i = 0; i < str.length; i += 3) {
                var group = str.slice(i, i + 3);
                var bits = group.length == 3 ? 10 : (group.length == 2 ? 7 : 4);
                encodeTool.push(parseInt(group), bits);
            }
        } else if (mode == QRMode.MODE_ALPHA_NUM) {
            var alphanum = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:"
            for (var i = 0; i + 1 < str.length; i += 2) {
                encodeTool.push(alphanum.indexOf(str[i]) * 45 + alphanum.indexOf(str[i + 1]), 11);
            }
            if (i < str.length) {
                encodeTool.push(alphanum.indexOf(str[i]), 6);
            }
        } else if (mode == QRMode.MODE_8BIT_BYTE) {
            for (let i = 0; i < str.length; ++i) {
                encodeTool.push(str[i], 8);
            }
        }
        encodeTool.push(0, 4);
        encodeTool.fill();
        return encodeTool.words;
    }
    function constructFinalMessage(str, mode, version, ecLevel) {
        var codewords = encodeRaw(str, mode, version, ecLevel);
        var dataList = new Array();
        var ecList = new Array();
        var partition = QRRSBlockTable[(version - 1) * 4 + QRErrorCorrectionLevelIndex[ecLevel]];
        var dataAnchor = 0;
        for (let i = 0; i < partition.length; i += 3) {
            var n = partition[i + 1], m = partition[i + 2];
            var gp = GeneratorPolynomial(n - m);
            for (let j = 0; j < partition[i]; ++j) {
                var data = new Uint8Array(m);
                for (let k = 0; k < m; ++k) {
                    data[k] = codewords[dataAnchor + k];
                }
                data.reverse();
                var ec = PolynomialOperation.divide(PolynomialOperation.shift(data, n - m), gp)
                function x(n) {
                    return gf256.log(n);
                }
                console.log(ec.map(x));
                console.log(ec);
                data.reverse();
                ec.reverse();
                dataList.push(data);
                ecList.push(ec);
                dataAnchor += m;
            }
        }
        var dataLength = partition.length > 3 ? (partition[2] > partition[5] ? partition[2] : partition[5]) : partition[2];
        var ecLength = partition.length > 3 ? (partition[1] - partition[2] > partition[4] - partition[5] ? partition[1] - partition[2] : partition[4] - partition[5]) : partition[1] - partition[2];
        var cw = new Uint8Array(partition[0] * partition[1] + (partition.length > 3 ? partition[3] * partition[4] : 0));
        var index = 0;
        console.log(partition);
        console.log(cw.length);
        for (let j = 0; j < dataLength; ++j) {
            for (let i = 0; i < dataList.length; ++i) {
                if (dataList[i][j] != undefined) cw[index++] = dataList[i][j];
            }
        }
        console.log(index);
        for (let j = 0; j < ecLength; ++j) {
            for (let i = 0; i < ecList.length; ++i) {
                if (ecList[i][j] != undefined) cw[index++] = ecList[i][j];
            }
        }
        console.log(index);
        return cw;
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

    function QRMatrix(data, errorCorrectionLevel) {
        this.mode = determineMode(data);
        this.ecLevel = errorCorrectionLevel;
        this.version = minVersion(data, this.mode, this.ecLevel);
        this.codewords = constructFinalMessage(data, this.mode, this.version, this.ecLevel);
        this.modules = null;
        this.moduleCount = 0;
    }

    QRMatrix.prototype = {
        isDark: function(row, col) {
            if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
                throw new Error(row + "," + col);
            }
            return this.modules[row][col] & 1 == 1;
        },
        getModuleCount: function() {
            return this.moduleCount;
        },
        init: function() {
            this.moduleCount = this.version * 4 + 17;
            this.modules = new Array(this.moduleCount);
            for (var row = 0; row < this.moduleCount; ++row) {      // (1, 2) denotes (dark, light) for data, (-1, -2) for others
                this.modules[row] = new Int8Array(this.moduleCount);
            }
        },
        placeFunctionPatterns: function() {
            this.placePositionDetectionPatterns();
            this.placeAlignmentPattern();
            this.placeTimingPattern();
            this.modules[this.moduleCount - 8][8] = -1;   // so called "dark module"
        },
        isDataRegion: function(i, j) {
            return this.modules[i][j] >= 0;
        },
        crawl: function() {
            while (true) {
                this.pos.i += this.step.i;
                this.pos.j += this.step.j;
                if (this.pos.i == this.moduleCount || this.pos.i < 0) {
                    this.step.dir = this.step.dir == 'u' ? 'd' : 'u';
                    this.pos.i = this.pos.i < 0 ? 0 : this.moduleCount - 1;
                    this.pos.j -= 2;
                    if (this.pos.j == 6) {      // jump over the vertical timing pattern
                        this.pos.j = 5;
                    }
                }
                this.step.i = (this.step.i == 0 ? (this.step.dir == 'u' ? -1 : 1) : 0);
                this.step.j = -this.step.j;
                if (this.isDataRegion(this.pos.i, this.pos.j)) {
                    return true;
                }
                if (this.pos.i < 0 || this.pos.i == this.moduleCount ||
                    this.pos.j < 0 || this.pos.j == this.moduleCount) {
                        return false;
                }
            }
        },
        placeData: function(mask) {
            this.step = {dir: 'u', i: 0, j: -1};
            this.pos = {i: this.moduleCount - 1, j: this.moduleCount - 1};
            for (let i = 0; i < this.codewords.length; ++i) {
                for (let j = 7; j >= 0; --j) {
                    var dark = ((this.codewords[i] >> j) & 1) == 1 ? 1 : 2;
                    if (mask(this.pos.i, this.pos.j)) {
                        dark = dark == 1 ? 2 : 1;
                    }
                    this.modules[this.pos.i][this.pos.j] = dark;
                    this.crawl();
                }
            }
            
            do {
                this.modules[this.pos.i][this.pos.j] = mask(this.pos.i, this.pos.j) ? 1 : 2;
            } while (this.crawl());
        },
        bestMask: function() {
            var min = 0x7fffffff;
            var score;
            var maskPattern = 0;
            for (let i = 0; i < 8; ++i) {
                this.placeFormat(i);
                this.placeData(QRMask[i]);
                score = QRMaskPenalty(this.modules, this.moduleCount);
                if (score < min) {
                    min = score;
                    maskPattern = i;
                }
            }
            return maskPattern;
        },
        make: function() {
            this.init();
            this.placeFunctionPatterns();
            this.placeVersionInformation();
            var maskPattern = this.bestMask();
            maskPattern = 0;
            // console.log(maskPattern);
            this.placeFormat(maskPattern);
            this.placeData(QRMask[maskPattern]);
            // this.placeData();
        },
        placePositionDetectionPatterns: function() {
            var pos = [{row: 0, col: 0}, {row: this.moduleCount - 7, col: 0}, {row: 0, col: this.moduleCount - 7}];
            function paint(x, y, size, value, matrix) {
                for (let i = x; i < x + size; ++i) {
                    for (let j = y; j < y + size; ++j) {
                        matrix[i][j] = value;
                    }
                }
            }
            for (let i = 0; i < 3; ++i) {
                var row = pos[i].row, col = pos[i].col;
                paint((row > 0 ? row - 1 : row), (col > 0 ? col - 1 : col), 8, -2, this.modules);
                paint(row, col, 7, -1, this.modules);
                paint(row + 1, col + 1, 5, -2, this.modules);
                paint(row + 2, col + 2, 3, -1, this.modules);
            }
        },
        placeTimingPattern: function() {
            for (var i = 8; i < this.moduleCount - 8; ++i) {
                if (this.modules[i][6] == 0) {
                    this.modules[i][6] = this.modules[6][i] = (i & 1 ? -2 : -1);
                }
            }
        },
        placeAlignmentPattern: function() {
            var pos = QRAlignmentPatternLocationTable[this.version];
            for (var i = 0; i < pos.length; i++) {
                for (var j = 0; j < pos.length; j++) {
                    var row = pos[i];
                    var col = pos[j];
                    if (this.modules[row][col] != 0) {
                        continue;
                    }
                    for (var r = -2; r <= 2; r++) {
                        for (var c = -2; c <= 2; c++) {
                            if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
                                this.modules[row + r][col + c] = -1;
                            } else {
                                this.modules[row + r][col + c] = -2;
                            }
                        }
                    }
                }
            }
        },
        placeVersionInformation: function() {
            if (this.version < 7) return;
            var bits = this.version << QRVersionEC.len | SimpleRS(this.version, QRVersionEC.gp, QRVersionEC.len);
            for (let i = 0; i < 6; ++i) {
                for (let j = this.moduleCount - 11; j < this.moduleCount - 9; ++j) {
                    this.modules[i][j] = (bits & 1) ? -1 : -2;
                    this.modules[j][i] = (bits & 1) ? -1 : -2;
                    bits >>= 1;
                }
            }
        },
        placeFormat: function(maskPattern) {
            var bits = this.ecLevel << 3 | maskPattern;
            bits = ((bits << QRFormatEC.len) | SimpleRS(bits, QRFormatEC.gp, QRFormatEC.len)) ^ QRFormatEC.mask;
            // console.log(this.ecLevel, maskPattern, bits.toString(16));
            var getBit = function(n) { return ((bits >> QRFormatEC.len + 5 - n - 1) & 1) == 1 ? -1 : -2; }
            for (let j = 0; j < 6; ++j) {
                this.modules[8][j] = getBit(j);
                this.modules[j][8] = getBit(14 - j);
            }
            for (let i = 0; i < 7; ++i) {
                this.modules[this.moduleCount - 1 - i][8] = getBit(i);
                this.modules[8][this.moduleCount - 1 - i] = getBit(14 - i);
            }
            this.modules[8][8] = this.modules[8][this.moduleCount - 8] = getBit(7);
            this.modules[7][8] = getBit(8);
            this.modules[8][7] = getBit(6);
        },
    };
    
    function _isSupportCanvas() {
        return typeof CanvasRenderingContext2D != "undefined";
    }
    
    // android 2.x doesn't support Data - URI spec
    function _getAndroid() {
        var android = false;
        var sAgent = navigator.userAgent;
        
        if (/android/i.test(sAgent)) { // android
            android = true;
            var aMat = sAgent.toString().match(/android ([0 - 9]\.[0 - 9])/i);
            
            if (aMat && aMat[1]) {
                android = parseFloat(aMat[1]);
            }
        }
        
        return android;
    }
    
    var svgDrawer = (function() {

        var Drawing = function (el, htOption) {
            this._el = el;
            this._htOption = htOption;
        };

        Drawing.prototype.draw = function (oQRCode) {
            var _htOption = this._htOption;
            var _el = this._el;
            var nCount = oQRCode.getModuleCount();
            var nWidth = Math.floor(_htOption.width / nCount);
            var nHeight = Math.floor(_htOption.height / nCount);

            this.clear();

            function makeSVG(tag, attrs) {
                var el = document.createElementNS('http://www.w3.org / 2000 / svg', tag);
                for (var k in attrs)
                    if (attrs.hasOwnProperty(k)) el.setAttribute(k, attrs[k]);
                return el;
            }

            var svg = makeSVG("svg" , {'viewBox': '0 0 ' + String(nCount) + " " + String(nCount), 'width': '100%', 'height': '100%', 'fill': _htOption.colorLight});
            svg.setAttributeNS("http://www.w3.org / 2000 / xmlns/", "xmlns:xlink", "http://www.w3.org / 1999 / xlink");
            _el.appendChild(svg);

            svg.appendChild(makeSVG("rect", {"fill": _htOption.colorLight, "width": "100%", "height": "100%"}));
            svg.appendChild(makeSVG("rect", {"fill": _htOption.colorDark, "width": "1", "height": "1", "id": "template"}));

            for (var row = 0; row < nCount; row++) {
                for (var col = 0; col < nCount; col++) {
                    if (oQRCode.isDark(row, col)) {
                        var child = makeSVG("use", {"x": String(col), "y": String(row)});
                        child.setAttributeNS("http://www.w3.org / 1999 / xlink", "href", "#template")
                        svg.appendChild(child);
                    }
                }
            }
        };
        Drawing.prototype.clear = function () {
            while (this._el.hasChildNodes())
                this._el.removeChild(this._el.lastChild);
        };
        return Drawing;
    })();

    var useSVG = document.documentElement.tagName.toLowerCase() === "svg";

    // Drawing in DOM by using Table tag
    var Drawing = useSVG ? svgDrawer : !_isSupportCanvas() ? (function () {
        var Drawing = function (el, htOption) {
            this._el = el;
            this._htOption = htOption;
        };
            
        /**
         * Draw the QRCode
         * 
         * @param {QRCode} oQRCode
         */
        Drawing.prototype.draw = function (oQRCode) {
            var _htOption = this._htOption;
            var _el = this._el;
            var nCount = oQRCode.getModuleCount();
            var nWidth = Math.floor(_htOption.width / nCount);
            var nHeight = Math.floor(_htOption.height / nCount);
            var aHTML = ['<table style = "border:0; border - collapse:collapse;">'];
            
            for (var row = 0; row < nCount; row++) {
                aHTML.push('<tr>');
                
                for (var col = 0; col < nCount; col++) {
                    aHTML.push('<td style = "border:0; border - collapse:collapse; padding:0; margin:0; width:' + nWidth + 'px; height:' + nHeight + 'px; background - color:' + (oQRCode.isDark(row, col) ? _htOption.colorDark : _htOption.colorLight) + ';"></td>');
                }
                
                aHTML.push('</tr>');
            }
            
            aHTML.push('</table>');
            _el.innerHTML = aHTML.join('');
            
            // Fix the margin values as real size.
            var elTable = _el.childNodes[0];
            var nLeftMarginTable = (_htOption.width - elTable.offsetWidth) / 2;
            var nTopMarginTable = (_htOption.height - elTable.offsetHeight) / 2;
            
            if (nLeftMarginTable > 0 && nTopMarginTable > 0) {
                elTable.style.margin = nTopMarginTable + "px " + nLeftMarginTable + "px";    
            }
        };
        
        /**
         * Clear the QRCode
         */
        Drawing.prototype.clear = function () {
            this._el.innerHTML = '';
        };
        
        return Drawing;
    })() : (function () { // Drawing in Canvas
        function _onMakeImage() {
            this._elImage.src = this._elCanvas.toDataURL("image / png");
            this._elImage.style.display = "block";
            this._elCanvas.style.display = "none";            
        }
        
        // Android 2.1 bug workaround
        // http://code.google.com / p/android / issues / detail?id = 5141
        if (this._android && this._android <= 2.1) {
            var factor = 1 / window.devicePixelRatio;
            var drawImage = CanvasRenderingContext2D.prototype.drawImage; 
            CanvasRenderingContext2D.prototype.drawImage = function (image, sx, sy, sw, sh, dx, dy, dw, dh) {
                if (("nodeName" in image) && /img/i.test(image.nodeName)) {
                    for (var i = arguments.length - 1; i >= 1; i--) {
                        arguments[i] = arguments[i] * factor;
                    }
                } else if (typeof dw == "undefined") {
                    arguments[1] *= factor;
                    arguments[2] *= factor;
                    arguments[3] *= factor;
                    arguments[4] *= factor;
                }
                
                drawImage.apply(this, arguments); 
            };
        }
        
        /**
         * Check whether the user's browser supports Data URI or not
         * 
         * @private
         * @param {Function} fSuccess Occurs if it supports Data URI
         * @param {Function} fFail Occurs if it doesn't support Data URI
         */
        function _safeSetDataURI(fSuccess, fFail) {
            var self = this;
            self._fFail = fFail;
            self._fSuccess = fSuccess;

            // Check it just once
            if (self._bSupportDataURI === null) {
                var el = document.createElement("img");
                var fOnError = function() {
                    self._bSupportDataURI = false;

                    if (self._fFail) {
                        self._fFail.call(self);
                    }
                };
                var fOnSuccess = function() {
                    self._bSupportDataURI = true;

                    if (self._fSuccess) {
                        self._fSuccess.call(self);
                    }
                };

                el.onabort = fOnError;
                el.onerror = fOnError;
                el.onload = fOnSuccess;
                el.src = "data:image / gif; base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8 / w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg == "; // the Image contains 1px data.
                return;
            } else if (self._bSupportDataURI === true && self._fSuccess) {
                self._fSuccess.call(self);
            } else if (self._bSupportDataURI === false && self._fFail) {
                self._fFail.call(self);
            }
        };
        
        /**
         * Drawing QRCode by using canvas
         * 
         * @constructor
         * @param {HTMLElement} el
         * @param {Object} htOption QRCode Options 
         */
        var Drawing = function (el, htOption) {
            this._bIsPainted = false;
            this._android = _getAndroid();
        
            this._htOption = htOption;
            this._elCanvas = document.createElement("canvas");
            this._elCanvas.width = htOption.width;
            this._elCanvas.height = htOption.height;
            el.appendChild(this._elCanvas);
            this._el = el;
            this._oContext = this._elCanvas.getContext("2d");
            this._bIsPainted = false;
            this._elImage = document.createElement("img");
            this._elImage.alt = "Scan me!";
            this._elImage.style.display = "none";
            this._el.appendChild(this._elImage);
            this._bSupportDataURI = null;
        };
            
        /**
         * Draw the QRCode
         * 
         * @param {QRCode} oQRCode 
         */
        Drawing.prototype.draw = function (oQRCode) {
            var _elImage = this._elImage;
            var _oContext = this._oContext;
            var _htOption = this._htOption;
            
            var nCount = oQRCode.getModuleCount();
            var nWidth = _htOption.width / nCount;
            var nHeight = _htOption.height / nCount;
            var nRoundedWidth = Math.round(nWidth);
            var nRoundedHeight = Math.round(nHeight);

            _elImage.style.display = "none";
            this.clear();
            
            for (var row = 0; row < nCount; row++) {
                for (var col = 0; col < nCount; col++) {
                    var bIsDark = oQRCode.isDark(row, col);
                    var nLeft = col * nWidth;
                    var nTop = row * nHeight;
                    _oContext.strokeStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;
                    _oContext.lineWidth = 1;
                    _oContext.fillStyle = bIsDark ? _htOption.colorDark : _htOption.colorLight;                    
                    _oContext.fillRect(nLeft, nTop, nWidth, nHeight);
                    
                    // 안티 앨리어싱 방지 처리
                    _oContext.strokeRect(
                        Math.floor(nLeft) + 0.5,
                        Math.floor(nTop) + 0.5,
                        nRoundedWidth,
                        nRoundedHeight
                    );
                    
                    _oContext.strokeRect(
                        Math.ceil(nLeft) - 0.5,
                        Math.ceil(nTop) - 0.5,
                        nRoundedWidth,
                        nRoundedHeight
                    );
                }
            }
            
            this._bIsPainted = true;
        };
            
        /**
         * Make the image from Canvas if the browser supports Data URI.
         */
        Drawing.prototype.makeImage = function () {
            if (this._bIsPainted) {
                _safeSetDataURI.call(this, _onMakeImage);
            }
        };
            
        /**
         * Return whether the QRCode is painted or not
         * 
         * @return {Boolean}
         */
        Drawing.prototype.isPainted = function () {
            return this._bIsPainted;
        };
        
        /**
         * Clear the QRCode
         */
        Drawing.prototype.clear = function () {
            this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height);
            this._bIsPainted = false;
        };
        
        /**
         * @private
         * @param {Number} nNumber
         */
        Drawing.prototype.round = function (nNumber) {
            if (!nNumber) {
                return nNumber;
            }
            
            return Math.floor(nNumber * 1000) / 1000;
        };
        
        return Drawing;
    })();
    
    /**
     * @class QRCode
     * @constructor
     * @example 
     * new QRCode(document.getElementById("test"), "http://jindo.dev.naver.com / collie");
     *
     * @example
     * var oQRCode = new QRCode("test", {
     *    text : "http://naver.com",
     *    width : 128,
     *    height : 128
     * });
     * 
     * oQRCode.clear(); // Clear the QRCode.
     * oQRCode.makeCode("http://map.naver.com"); // Re - create the QRCode.
     *
     * @param {HTMLElement|String} el target element or 'id' attribute of element.
     * @param {Object|String} vOption
     * @param {String} vOption.text QRCode link data
     * @param {Number} [vOption.width = 256]
     * @param {Number} [vOption.height = 256]
     * @param {String} [vOption.colorDark = "#000000"]
     * @param {String} [vOption.colorLight = "#ffffff"]
     * @param {QRCode.CorrectLevel} [vOption.correctLevel = QRCode.CorrectLevel.H] [L|M|Q|H] 
     */
    QRCode = function (el, vOption) {
        this._htOption = {
            width : 256, 
            height : 256,
            typeNumber : 4,
            colorDark : "#000000",
            colorLight : "#ffffff",
            // correctLevel : QRErrorCorrectionLevel.H
            correctLevel : QRErrorCorrectionLevel.H
        };
        
        if (typeof vOption === 'string') {
            vOption    = {
                text : vOption
            };
        }
        
        // Overwrites options
        if (vOption) {
            for (var i in vOption) {
                this._htOption[i] = vOption[i];
            }
        }
        
        if (typeof el == "string") {
            el = document.getElementById(el);
        }

        if (this._htOption.useSVG) {
            Drawing = svgDrawer;
        }
        
        this._android = _getAndroid();
        this._el = el;
        this._oQRCode = null;
        this._oDrawing = new Drawing(this._el, this._htOption);
        
        if (this._htOption.text) {
            this.makeCode(this._htOption.text);    
        }
    };
    
    /**
     * Make the QRCode
     * 
     * @param {String} sText link data
     */
    QRCode.prototype.makeCode = function (sText) {
        this._oQRCode = new QRMatrix(sText, this._htOption.correctLevel);
        this._oQRCode.make();
        this._el.title = sText;
        this._oDrawing.draw(this._oQRCode);            
        this.makeImage();
    };
    
    /**
     * Make the Image from Canvas element
     * - It occurs automatically
     * - Android below 3 doesn't support Data - URI spec.
     * 
     * @private
     */
    QRCode.prototype.makeImage = function () {
        if (typeof this._oDrawing.makeImage == "function" && (!this._android || this._android >= 3)) {
            this._oDrawing.makeImage();
        }
    };
    
    /**
     * Clear the QRCode
     */
    QRCode.prototype.clear = function () {
        this._oDrawing.clear();
    };
    
    /**
     * @name QRCode.CorrectLevel
     */
    QRCode.CorrectLevel = QRErrorCorrectionLevel;
})();
