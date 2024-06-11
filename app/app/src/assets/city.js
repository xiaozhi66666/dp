const Fpage = [
    ["成都", 500, 0.6, 0.6, 0],
    ["绵阳", 350, 0.8, 0.4, 0.4],
    ["内江", 200, 0.4, 0.5, -0.1],
    ["德阳", 300, 0.7, 0.5, -0.2],
    ["乐山", 250, 0.8, 0.5, 0.3],
    ["宜宾", 180, 0.5, 0.5, 0],
    ["自贡", 150, 0.8, 0.6, 0.2],
    ["泸州", 120, 0.6, 0.4, 0.2],
    ["攀枝花", 90, 0.3, 0.2, 0.1],
    ["广元", 200, 1.2, 0.8, 0.4],
    ["达州", 170, 1, 0.5, 0.5],
    ["遂宁", 120, 0.5, 0.3, 0.2],
    ["南充", 220, 1.5, 1, 0.5],
    ["广安", 130, 0.7, 0.4, 0.3],
    ["巴中", 100, 0.4, 0.3, 0.1],
    ["眉山", 110, 0.5, 0.3, 0.2],
    ["雅安", 80, 0.3, 0.2, 0.1],
    ["资阳", 70, 0.2, 0.1, 0.1],
    ["阿坝", 50, 0.2, 0.1, 0.1],
    ["甘孜", 60, 0.3, 0.2, 0.1],
    ["凉山", 100, 0.5, 0.4, 0.1],
];

const HomeHome = [
    ["成都", 2126.8, 6.92, 5.96, 0.96],
    ["自贡", 245.2, 5.18, 10.56, -5.38],
    ["攀枝花", 121.6, 6.58, 7.24, -0.66],
    ["泸州", 426.3, 7.36, 11.97, -4.61],
    ["德阳", 346.1, 5.98, 10.14, -4.16],
    ["绵阳", 489.8, 6.41, 8.8, -2.39],
    ["广元", 227.1, 7.03, 9.25, -2.23],
    ["遂宁", 277.2, 6.31, 6.6, -0.29],
    ["内江", 308.8, 7.35, 14.71, -7.36],
    ["乐山", 315.3, 7.2, 10.2, -3.0],
    ["南充", 554.9, 5.65, 6.88, -1.23],
    ["眉山", 296.1, 6.84, 10.58, -3.74],
    ["宜宾", 461.8, 9.31, 11.48, -2.17],
    ["广安", 323.8, 9.65, 14.16, -4.51],
    ["达州", 535.5, 5.75, 7.19, -1.44],
    ["雅安", 143.3, 6.91, 8.58, -1.67],
    ["巴中", 265.8, 7.91, 8.64, -0.73],
    ["资阳", 226.9, 6.13, 12.25, -6.13],
    ["阿坝", 82.3, 9.64, 4.94, 4.7],
    ["甘孜", 110.3, 8.43, 3.17, 5.26],
    ["凉山", 489.1, 17.17, 7.56, 9.61],
];

const getPopulationThree = [
    { name: '成都市', value: 1484 },
    { name: '自贡市', value: 560 },
    { name: '攀枝花市', value: 164 },
    { name: '泸州市', value: 348 },
    { name: '德阳市', value: 586 },
    { name: '绵阳市', value: 242 },
    { name: '广元市', value: 139 },
    { name: '遂宁市', value: 521 },
    { name: '内江市', value: 573 },
    { name: '乐山市', value: 248 },
    { name: '南充市', value: 445 },
    { name: '眉山市', value: 415 },
    { name: '宜宾市', value: 348 },
    { name: '广安市', value: 511 },
    { name: '达州市', value: 323 },
    { name: '雅安市', value: 95 },
    { name: '巴中市', value: 216 },
    { name: '资阳市', value: 395 },
    { name: '阿坝藏族羌族自治州', value: 10 },
    { name: '甘孜藏族自治州', value: 7 },
    { name: '凉山彝族自治州', value: 81 }
];

const Spage = [
    [10, 90, 15, 85],
    [20, 80, 25, 75],
    [30, 70, 35, 65],
    [40, 60, 50, 50],
    [9, 4, 8, 6],
    [4, 8, 6, 7],
    [8, 6, 7, 5],
    [6, 7, 5, 8],
    [5, 8, 6, 7],
    [7, 5, 8, 6],
    [8, 6, 7, 5],
    [6, 7, 5, 8],
    [5, 8, 6, 7],
    [5, 5, 8, 2],
    [4, 6, 7, 3],
    [6, 4, 5, 5],
    [5, 5, 6, 4],
    [7, 3, 8, 2],
    [4, 6, 7, 3],
    [3, 7, 5, 5],
    [5, 8, 6, 4],
]

function getFpage() {
    return Fpage;
}

function getHomeHome() {
    return HomeHome;
}

function getPopulationThree() {
    return getPopulationThree;
}

function getSpage() {
    return Spage;
}
export { getFpage };
export { getHomeHome };
export { getPopulationThree };
export { getSpage };