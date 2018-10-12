// ../lib/enyo-ilib/version.js
enyo && enyo.version && (enyo.version["enyo-ilib"] = "2.6.0-pre.4.dev");

// ../lib/enyo-ilib/ilib/js/ilib-dyn-standard.js
var ilib = ilib || {};
ilib.getVersion = function() {
    return "10.0"
},
ilib.data = {
    norm: {
        nfc: {},
        nfd: {},
        nfkd: {},
        ccc: {}
    },
    zoneinfo: {
        "Etc/UTC": {
            o: "0:0",
            f: "UTC"
        },
        local: {
            f: "local"
        }
    },
    ctype: null,
    ctype_c: null,
    ctype_l: null,
    ctype_m: null,
    ctype_p: null,
    ctype_z: null,
    scriptToRange: null,
    dateformats: null
},
"undefined" != typeof window && (window.ilib = ilib),
"undefined" != typeof exports && (exports.ilib = ilib),
ilib.pseudoLocales = ["zxx-XX"],
ilib.setAsPseudoLocale = function(t) {
    t && ilib.pseudoLocales.push(t)
},
ilib.clearPseudoLocales = function() {
    ilib.pseudoLocales = ["zxx-XX"]
},
ilib._getPlatform = function() {
    return ilib._platform || (ilib._platform = "undefined" != typeof environment ? "rhino": "undefined" != typeof process || "undefined" != typeof require ? "nodejs": "undefined" != typeof window ? "undefined" != typeof PalmSystem ? "webos": "browser": "unknown"),
    ilib._platform
},
ilib._isGlobal = function(t) {
    switch (ilib._getPlatform()) {
    case "rhino":
        var e = function() {
            return "object" == typeof global ? global: this
        } ();
        return void 0 !== typeof e[t];
    case "nodejs":
        var i = "undefined" != typeof global ? global: this;
        return i && void 0 !== typeof i[t];
    default:
        return void 0 !== typeof window[t]
    }
},
ilib.setLocale = function(t) {
    "string" != typeof t && t || (ilib.locale = t)
},
ilib.getLocale = function() {
    if ("string" != typeof ilib.locale) {
        if ("undefined" != typeof navigator && navigator.language !== void 0) {
            if (ilib.locale = navigator.language, !ilib.locale) {
                var t = navigator.browserLanguage !== void 0 ? navigator.browserLanguage: navigator.userLanguage !== void 0 ? navigator.userLanguage: navigator.systemLanguage !== void 0 ? navigator.systemLanguage: void 0;
                t !== void 0 && t && (ilib.locale = t.substring(0, 3) + t.substring(3, 5).toUpperCase())
            }
        } else if ("undefined" != typeof PalmSystem && PalmSystem.locales !== void 0) PalmSystem.locales.UI !== void 0 && PalmSystem.locales.UI.length > 0 && (ilib.locale = PalmSystem.locales.UI);
        else if ("undefined" != typeof environment && environment.user !== void 0)"string" == typeof environment.user.language && environment.user.language.length > 0 && (ilib.locale = environment.user.language, "string" == typeof environment.user.country && environment.user.country.length > 0 && (ilib.locale += "-" + environment.user.country));
        else if ("undefined" != typeof process && process.env !== void 0) {
            var t = process.env.LANG || process.env.LC_ALL;
            t && "undefined" !== t && (ilib.locale = t.substring(0, 2).toLowerCase() + "-" + t.substring(3, 5).toUpperCase())
        }
        ilib.locale = "string" == typeof ilib.locale ? ilib.locale: "en-US"
    }
    return ilib.locale
},
ilib.setTimeZone = function(t) {
    ilib.tz = t || ilib.tz
},
ilib.getTimeZone = function() {
    return ilib.tz === void 0 && ("undefined" != typeof navigator && navigator.timezone !== void 0 ? navigator.timezone.length > 0 && (ilib.tz = navigator.timezone) : "undefined" != typeof PalmSystem && PalmSystem.timezone !== void 0 ? PalmSystem.timezone.length > 0 && (ilib.tz = PalmSystem.timezone) : "undefined" != typeof environment && environment.user !== void 0 ? environment.user.timezone !== void 0 && environment.user.timezone.length > 0 && (ilib.tz = environment.user.timezone) : "undefined" != typeof process && process.env !== void 0 && process.env.TZ && "undefined" !== process.env.TZ && (ilib.tz = process.env.TZ), ilib.tz = ilib.tz || "local"),
    ilib.tz
},
ilib.Loader = function() {},
ilib.Loader.prototype.loadFiles = function() {},
ilib.Loader.prototype.listAvailableFiles = function() {},
ilib.Loader.prototype.isAvailable = function() {},
ilib.setLoaderCallback = function(t) {
    return "object" == typeof t && t instanceof ilib.Loader || "function" == typeof t || t === void 0 ? (ilib._load = t, !0) : !1
},
ilib.Locale = function(t, e, i, n) {
    if (e === void 0) {
        var o = t || ilib.getLocale();
        if ("string" == typeof o) {
            for (var s = o.split("-"), a = 0; s.length > a; a++) ilib.Locale._isLanguageCode(s[a]) ? this.language = s[a] : ilib.Locale._isRegionCode(s[a]) ? this.region = s[a] : ilib.Locale._isScriptCode(s[a]) ? this.script = s[a] : this.variant = s[a];
            this.language = this.language || void 0,
            this.region = this.region || void 0,
            this.script = this.script || void 0,
            this.variant = this.variant || void 0
        } else "object" == typeof o && (this.language = o.language || void 0, this.region = o.region || void 0, this.script = o.script || void 0, this.variant = o.variant || void 0)
    } else t ? (t = t.trim(), this.language = t.length > 0 ? t.toLowerCase() : void 0) : this.language = void 0,
    e ? (e = e.trim(), this.region = e.length > 0 ? e.toUpperCase() : void 0) : this.region = void 0,
    i ? (i = i.trim(), this.variant = i.length > 0 ? i: void 0) : this.variant = void 0,
    n ? (n = n.trim(), this.script = n.length > 0 ? n: void 0) : this.script = void 0;
    this._genSpec()
},
ilib.Locale.a2toa3regmap = {
    AF: "AFG",
    AX: "ALA",
    AL: "ALB",
    DZ: "DZA",
    AS: "ASM",
    AD: "AND",
    AO: "AGO",
    AI: "AIA",
    AQ: "ATA",
    AG: "ATG",
    AR: "ARG",
    AM: "ARM",
    AW: "ABW",
    AU: "AUS",
    AT: "AUT",
    AZ: "AZE",
    BS: "BHS",
    BH: "BHR",
    BD: "BGD",
    BB: "BRB",
    BY: "BLR",
    BE: "BEL",
    BZ: "BLZ",
    BJ: "BEN",
    BM: "BMU",
    BT: "BTN",
    BO: "BOL",
    BQ: "BES",
    BA: "BIH",
    BW: "BWA",
    BV: "BVT",
    BR: "BRA",
    IO: "IOT",
    BN: "BRN",
    BG: "BGR",
    BF: "BFA",
    BI: "BDI",
    KH: "KHM",
    CM: "CMR",
    CA: "CAN",
    CV: "CPV",
    KY: "CYM",
    CF: "CAF",
    TD: "TCD",
    CL: "CHL",
    CN: "CHN",
    CX: "CXR",
    CC: "CCK",
    CO: "COL",
    KM: "COM",
    CG: "COG",
    CD: "COD",
    CK: "COK",
    CR: "CRI",
    CI: "CIV",
    HR: "HRV",
    CU: "CUB",
    CW: "CUW",
    CY: "CYP",
    CZ: "CZE",
    DK: "DNK",
    DJ: "DJI",
    DM: "DMA",
    DO: "DOM",
    EC: "ECU",
    EG: "EGY",
    SV: "SLV",
    GQ: "GNQ",
    ER: "ERI",
    EE: "EST",
    ET: "ETH",
    FK: "FLK",
    FO: "FRO",
    FJ: "FJI",
    FI: "FIN",
    FR: "FRA",
    GF: "GUF",
    PF: "PYF",
    TF: "ATF",
    GA: "GAB",
    GM: "GMB",
    GE: "GEO",
    DE: "DEU",
    GH: "GHA",
    GI: "GIB",
    GR: "GRC",
    GL: "GRL",
    GD: "GRD",
    GP: "GLP",
    GU: "GUM",
    GT: "GTM",
    GG: "GGY",
    GN: "GIN",
    GW: "GNB",
    GY: "GUY",
    HT: "HTI",
    HM: "HMD",
    VA: "VAT",
    HN: "HND",
    HK: "HKG",
    HU: "HUN",
    IS: "ISL",
    IN: "IND",
    ID: "IDN",
    IR: "IRN",
    IQ: "IRQ",
    IE: "IRL",
    IM: "IMN",
    IL: "ISR",
    IT: "ITA",
    JM: "JAM",
    JP: "JPN",
    JE: "JEY",
    JO: "JOR",
    KZ: "KAZ",
    KE: "KEN",
    KI: "KIR",
    KP: "PRK",
    KR: "KOR",
    KW: "KWT",
    KG: "KGZ",
    LA: "LAO",
    LV: "LVA",
    LB: "LBN",
    LS: "LSO",
    LR: "LBR",
    LY: "LBY",
    LI: "LIE",
    LT: "LTU",
    LU: "LUX",
    MO: "MAC",
    MK: "MKD",
    MG: "MDG",
    MW: "MWI",
    MY: "MYS",
    MV: "MDV",
    ML: "MLI",
    MT: "MLT",
    MH: "MHL",
    MQ: "MTQ",
    MR: "MRT",
    MU: "MUS",
    YT: "MYT",
    MX: "MEX",
    FM: "FSM",
    MD: "MDA",
    MC: "MCO",
    MN: "MNG",
    ME: "MNE",
    MS: "MSR",
    MA: "MAR",
    MZ: "MOZ",
    MM: "MMR",
    NA: "NAM",
    NR: "NRU",
    NP: "NPL",
    NL: "NLD",
    NC: "NCL",
    NZ: "NZL",
    NI: "NIC",
    NE: "NER",
    NG: "NGA",
    NU: "NIU",
    NF: "NFK",
    MP: "MNP",
    NO: "NOR",
    OM: "OMN",
    PK: "PAK",
    PW: "PLW",
    PS: "PSE",
    PA: "PAN",
    PG: "PNG",
    PY: "PRY",
    PE: "PER",
    PH: "PHL",
    PN: "PCN",
    PL: "POL",
    PT: "PRT",
    PR: "PRI",
    QA: "QAT",
    RE: "REU",
    RO: "ROU",
    RU: "RUS",
    RW: "RWA",
    BL: "BLM",
    SH: "SHN",
    KN: "KNA",
    LC: "LCA",
    MF: "MAF",
    PM: "SPM",
    VC: "VCT",
    WS: "WSM",
    SM: "SMR",
    ST: "STP",
    SA: "SAU",
    SN: "SEN",
    RS: "SRB",
    SC: "SYC",
    SL: "SLE",
    SG: "SGP",
    SX: "SXM",
    SK: "SVK",
    SI: "SVN",
    SB: "SLB",
    SO: "SOM",
    ZA: "ZAF",
    GS: "SGS",
    SS: "SSD",
    ES: "ESP",
    LK: "LKA",
    SD: "SDN",
    SR: "SUR",
    SJ: "SJM",
    SZ: "SWZ",
    SE: "SWE",
    CH: "CHE",
    SY: "SYR",
    TW: "TWN",
    TJ: "TJK",
    TZ: "TZA",
    TH: "THA",
    TL: "TLS",
    TG: "TGO",
    TK: "TKL",
    TO: "TON",
    TT: "TTO",
    TN: "TUN",
    TR: "TUR",
    TM: "TKM",
    TC: "TCA",
    TV: "TUV",
    UG: "UGA",
    UA: "UKR",
    AE: "ARE",
    GB: "GBR",
    US: "USA",
    UM: "UMI",
    UY: "URY",
    UZ: "UZB",
    VU: "VUT",
    VE: "VEN",
    VN: "VNM",
    VG: "VGB",
    VI: "VIR",
    WF: "WLF",
    EH: "ESH",
    YE: "YEM",
    ZM: "ZMB",
    ZW: "ZWE"
},
ilib.Locale.a1toa3langmap = {
    ab: "abk",
    aa: "aar",
    af: "afr",
    ak: "aka",
    sq: "sqi",
    am: "amh",
    ar: "ara",
    an: "arg",
    hy: "hye",
    as: "asm",
    av: "ava",
    ae: "ave",
    ay: "aym",
    az: "aze",
    bm: "bam",
    ba: "bak",
    eu: "eus",
    be: "bel",
    bn: "ben",
    bh: "bih",
    bi: "bis",
    bs: "bos",
    br: "bre",
    bg: "bul",
    my: "mya",
    ca: "cat",
    ch: "cha",
    ce: "che",
    ny: "nya",
    zh: "zho",
    cv: "chv",
    kw: "cor",
    co: "cos",
    cr: "cre",
    hr: "hrv",
    cs: "ces",
    da: "dan",
    dv: "div",
    nl: "nld",
    dz: "dzo",
    en: "eng",
    eo: "epo",
    et: "est",
    ee: "ewe",
    fo: "fao",
    fj: "fij",
    fi: "fin",
    fr: "fra",
    ff: "ful",
    gl: "glg",
    ka: "kat",
    de: "deu",
    el: "ell",
    gn: "grn",
    gu: "guj",
    ht: "hat",
    ha: "hau",
    he: "heb",
    hz: "her",
    hi: "hin",
    ho: "hmo",
    hu: "hun",
    ia: "ina",
    id: "ind",
    ie: "ile",
    ga: "gle",
    ig: "ibo",
    ik: "ipk",
    io: "ido",
    is: "isl",
    it: "ita",
    iu: "iku",
    ja: "jpn",
    jv: "jav",
    kl: "kal",
    kn: "kan",
    kr: "kau",
    ks: "kas",
    kk: "kaz",
    km: "khm",
    ki: "kik",
    rw: "kin",
    ky: "kir",
    kv: "kom",
    kg: "kon",
    ko: "kor",
    ku: "kur",
    kj: "kua",
    la: "lat",
    lb: "ltz",
    lg: "lug",
    li: "lim",
    ln: "lin",
    lo: "lao",
    lt: "lit",
    lu: "lub",
    lv: "lav",
    gv: "glv",
    mk: "mkd",
    mg: "mlg",
    ms: "msa",
    ml: "mal",
    mt: "mlt",
    mi: "mri",
    mr: "mar",
    mh: "mah",
    mn: "mon",
    na: "nau",
    nv: "nav",
    nb: "nob",
    nd: "nde",
    ne: "nep",
    ng: "ndo",
    nn: "nno",
    no: "nor",
    ii: "iii",
    nr: "nbl",
    oc: "oci",
    oj: "oji",
    cu: "chu",
    om: "orm",
    or: "ori",
    os: "oss",
    pa: "pan",
    pi: "pli",
    fa: "fas",
    pl: "pol",
    ps: "pus",
    pt: "por",
    qu: "que",
    rm: "roh",
    rn: "run",
    ro: "ron",
    ru: "rus",
    sa: "san",
    sc: "srd",
    sd: "snd",
    se: "sme",
    sm: "smo",
    sg: "sag",
    sr: "srp",
    gd: "gla",
    sn: "sna",
    si: "sin",
    sk: "slk",
    sl: "slv",
    so: "som",
    st: "sot",
    az: "azb",
    es: "spa",
    su: "sun",
    sw: "swa",
    ss: "ssw",
    sv: "swe",
    ta: "tam",
    te: "tel",
    tg: "tgk",
    th: "tha",
    ti: "tir",
    bo: "bod",
    tk: "tuk",
    tl: "tgl",
    tn: "tsn",
    to: "ton",
    tr: "tur",
    ts: "tso",
    tt: "tat",
    tw: "twi",
    ty: "tah",
    ug: "uig",
    uk: "ukr",
    ur: "urd",
    uz: "uzb",
    ve: "ven",
    vi: "vie",
    vo: "vol",
    wa: "wln",
    cy: "cym",
    wo: "wol",
    fy: "fry",
    xh: "xho",
    yi: "yid",
    yo: "yor",
    za: "zha",
    zu: "zul"
},
ilib.Locale._notLower = function(t) {
    var e = t.charCodeAt(0);
    return 97 > e || e > 122
},
ilib.Locale._notUpper = function(t) {
    var e = t.charCodeAt(0);
    return 65 > e || e > 90
},
ilib.Locale._notDigit = function(t) {
    var e = t.charCodeAt(0);
    return 48 > e || e > 57
},
ilib.Locale._isLanguageCode = function(t) {
    if (t === void 0 || 2 > t.length || t.length > 3) return ! 1;
    for (var e = 0; t.length > e; e++) if (ilib.Locale._notLower(t.charAt(e))) return ! 1;
    return ! 0
},
ilib.Locale._isRegionCode = function(t) {
    if (t === void 0 || 2 > t.length || t.length > 3) return ! 1;
    if (2 === t.length) {
        for (var e = 0; t.length > e; e++) if (ilib.Locale._notUpper(t.charAt(e))) return ! 1
    } else for (var e = 0; t.length > e; e++) if (ilib.Locale._notDigit(t.charAt(e))) return ! 1;
    return ! 0
},
ilib.Locale._isScriptCode = function(t) {
    if (t === void 0 || 4 !== t.length || ilib.Locale._notUpper(t.charAt(0))) return ! 1;
    for (var e = 1; 4 > e; e++) if (ilib.Locale._notLower(t.charAt(e))) return ! 1;
    return ! 0
},
ilib.Locale.regionAlpha2ToAlpha3 = function(t) {
    return ilib.Locale.a2toa3regmap[t] || t
},
ilib.Locale.languageAlpha1ToAlpha3 = function(t) {
    return ilib.Locale.a1toa3langmap[t] || t
},
ilib.Locale.prototype = {
    _genSpec: function() {
        this.spec = this.language || "",
        this.script && (this.spec.length > 0 && (this.spec += "-"), this.spec += this.script),
        this.region && (this.spec.length > 0 && (this.spec += "-"), this.spec += this.region),
        this.variant && (this.spec.length > 0 && (this.spec += "-"), this.spec += this.variant)
    },
    getLanguage: function() {
        return this.language
    },
    getLanguageAlpha3: function() {
        return ilib.Locale.languageAlpha1ToAlpha3(this.language)
    },
    getRegion: function() {
        return this.region
    },
    getRegionAlpha3: function() {
        return ilib.Locale.regionAlpha2ToAlpha3(this.region)
    },
    getScript: function() {
        return this.script
    },
    getVariant: function() {
        return this.variant
    },
    getSpec: function() {
        return this.spec
    },
    toString: function() {
        return this.getSpec()
    },
    equals: function(t) {
        return this.language === t.language && this.region === t.region && this.script === t.script && this.variant === t.variant
    },
    isPseudo: function() {
        var t = this.language + "-" + this.region;
        return ilib.pseudoLocales.indexOf(t) > -1
    }
},
ilib.Locale.locales = [],
ilib.Locale.getAvailableLocales = function() {
    return ilib.Locale.locales
},
ilib.LocaleInfo = function(t, e) {
    var i = !0,
    n = void 0;
    switch (this.info = ilib.LocaleInfo.defaultInfo, typeof t) {
    case "string":
        this.locale = new ilib.Locale(t);
        break;
    default:
    case "undefined":
        this.locale = new ilib.Locale;
        break;
    case "object":
        this.locale = t
    }
    e && (e.sync !== void 0 && (i = 1 == e.sync), e.loadParams !== void 0 && (n = e.loadParams)),
    ilib.LocaleInfo.cache || (ilib.LocaleInfo.cache = {}),
    ilib.loadData({
        object: ilib.LocaleInfo,
        locale: this.locale,
        name: "localeinfo.json",
        sync: i,
        loadParams: n,
        callback: ilib.bind(this,
        function(t) {
            if (!t) {
                t = ilib.LocaleInfo.defaultInfo;
                var i = this.locale.getSpec().replace(/-/g, "_");
                ilib.LocaleInfo.cache[i] = t
            }
            this.info = t,
            e && "function" == typeof e.onLoad && e.onLoad(this)
        })
    })
},
ilib.LocaleInfo.defaultInfo = ilib.data.localeinfo,
ilib.LocaleInfo.defaultInfo = ilib.LocaleInfo.defaultInfo || {
    scripts: ["Latn"],
    timezone: "Etc/UTC",
    units: "metric",
    calendar: "gregorian",
    clock: "24",
    currency: "USD",
    firstDayOfWeek: 1,
    numfmt: {
        currencyFormats: {
            common: "{s}{n}",
            commonNegative: "{s}-{n}",
            iso: "{s}{n}",
            isoNegative: "{s}-{n}"
        },
        script: "Latn",
        decimalChar: ",",
        groupChar: ".",
        prigroupSize: 3,
        secgroupSize: 0,
        pctFmt: "{n}%",
        negativepctFmt: "-{n}%",
        pctChar: "%",
        roundingMode: "halfdown",
        exponential: "e",
        digits: ""
    }
},
ilib.LocaleInfo.prototype = {
    getLanguageName: function() {
        return this.info["language.name"]
    },
    getRegionName: function() {
        return this.info["region.name"]
    },
    getClock: function() {
        return this.info.clock
    },
    getLocale: function() {
        return this.locale
    },
    getUnits: function() {
        return this.info.units
    },
    getUnitFormat: function() {
        return this.info.unitfmt
    },
    getCalendar: function() {
        return this.info.calendar
    },
    getFirstDayOfWeek: function() {
        return this.info.firstDayOfWeek
    },
    getTimeZone: function() {
        return this.info.timezone
    },
    getDecimalSeparator: function() {
        return this.info.numfmt.decimalChar
    },
    getNativeDecimalSeparator: function() {
        return this.info.native_numfmt && this.info.native_numfmt.decimalChar || this.info.numfmt.decimalChar
    },
    getGroupingSeparator: function() {
        return this.info.numfmt.groupChar
    },
    getNativeGroupingSeparator: function() {
        return this.info.native_numfmt && this.info.native_numfmt.groupChar || this.info.numfmt.groupChar
    },
    getPrimaryGroupingDigits: function() {
        return this.info.numfmt.prigroupSize !== void 0 && this.info.numfmt.prigroupSize || 0
    },
    getSecondaryGroupingDigits: function() {
        return this.info.numfmt.secgroupSize || 0
    },
    getPercentageFormat: function() {
        return this.info.numfmt.pctFmt
    },
    getNegativePercentageFormat: function() {
        return this.info.numfmt.negativepctFmt
    },
    getPercentageSymbol: function() {
        return this.info.numfmt.pctChar || "%"
    },
    getExponential: function() {
        return this.info.numfmt.exponential
    },
    getNativeExponential: function() {
        return this.info.native_numfmt && this.info.native_numfmt.exponential || this.info.numfmt.exponential
    },
    getNativePercentageSymbol: function() {
        return this.info.native_numfmt && this.info.native_numfmt.pctChar || this.info.numfmt.pctChar || "%"
    },
    getNegativeNumberFormat: function() {
        return this.info.numfmt.negativenumFmt
    },
    getCurrencyFormats: function() {
        return this.info.numfmt.currencyFormats
    },
    getCurrency: function() {
        return this.info.currency
    },
    getDigitsStyle: function() {
        return this.info.numfmt.useNative ? "native": this.info.native_numfmt !== void 0 ? "optional": "western"
    },
    getDigits: function() {
        return this.info.numfmt.digits
    },
    getNativeDigits: function() {
        return this.info.numfmt.useNative && this.info.numfmt.digits || this.info.native_numfmt && this.info.native_numfmt.digits
    },
    getRoundingMode: function() {
        return this.info.numfmt.roundingMode
    },
    getDefaultScript: function() {
        return this.info.scripts ? this.info.scripts[0] : "Latn"
    },
    getScript: function() {
        return this.locale.getScript() || this.getDefaultScript()
    },
    getAllScripts: function() {
        return this.info.scripts || ["Latn"]
    }
},
ilib.Date = function(t) {
    return t && void 0 !== t.noinstance ? void 0 : ilib.Date.newInstance(t)
},
ilib.Date.newInstance = function(t) {
    var e, i = t && t.locale,
    n = t && (t.type || t.calendar);
    if (i || (i = new ilib.Locale), !n) {
        var o = new ilib.LocaleInfo(i);
        n = o.getCalendar()
    }
    return e = ilib.Date._constructors[n],
    e && new e(t)
},
ilib.Date._dateToIlib = function(t, e) {
    return t === void 0 || null === t ? t: t instanceof ilib.Date ? t: t instanceof Date ? ilib.Date.newInstance({
        unixtime: t.getTime(),
        timezone: e
    }) : t instanceof ilib.JulianDay ? ilib.Date.newInstance({
        jd: t,
        timezone: e
    }) : "number" == typeof t ? ilib.Date.newInstance({
        unixtime: t,
        timezone: e
    }) : "object" == typeof t ? ilib.Date.newInstance(t) : ("string" == typeof t && (t = new Date(t)), ilib.Date.newInstance({
        unixtime: t.getTime(),
        timezone: e
    }))
},
ilib.Date._constructors = {},
ilib.Date.prototype = {
    getType: function() {
        return "ilib.Date"
    },
    getTime: function() {
        return this.rd.getTime()
    },
    getTimeExtended: function() {
        return this.rd.getTimeExtended()
    },
    setTime: function(t) {
        this.rd = this.newRd({
            unixtime: t,
            cal: this.cal
        }),
        this._calcDateComponents()
    },
    getDays: function() {
        return this.day
    },
    getMonths: function() {
        return this.month
    },
    getYears: function() {
        return this.year
    },
    getHours: function() {
        return this.hour
    },
    getMinutes: function() {
        return this.minute
    },
    getSeconds: function() {
        return this.second
    },
    getMilliseconds: function() {
        return this.millisecond
    },
    setDays: function(t) {
        this.day = parseInt(t, 10) || 1,
        this.rd._setDateComponents(this)
    },
    setMonths: function(t) {
        this.month = parseInt(t, 10) || 1,
        this.rd._setDateComponents(this)
    },
    setYears: function(t) {
        this.year = parseInt(t, 10) || 0,
        this.rd._setDateComponents(this)
    },
    setHours: function(t) {
        this.hour = parseInt(t, 10) || 0,
        this.rd._setDateComponents(this)
    },
    setMinutes: function(t) {
        this.minute = parseInt(t, 10) || 0,
        this.rd._setDateComponents(this)
    },
    setSeconds: function(t) {
        this.second = parseInt(t, 10) || 0,
        this.rd._setDateComponents(this)
    },
    setMilliseconds: function(t) {
        this.millisecond = parseInt(t, 10) || 0,
        this.rd._setDateComponents(this)
    },
    before: function(t) {
        return this.cal.newDateInstance({
            rd: this.rd.before(t, this.offset),
            timezone: this.timezone
        })
    },
    after: function(t) {
        return this.cal.newDateInstance({
            rd: this.rd.after(t, this.offset),
            timezone: this.timezone
        })
    },
    onOrBefore: function(t) {
        return this.cal.newDateInstance({
            rd: this.rd.onOrBefore(t, this.offset),
            timezone: this.timezone
        })
    },
    onOrAfter: function(t) {
        return this.cal.newDateInstance({
            rd: this.rd.onOrAfter(t, this.offset),
            timezone: this.timezone
        })
    },
    getJSDate: function() {
        var t = this.rd.getTimeExtended();
        return isNaN(t) ? void 0 : new Date(t)
    },
    getRataDie: function() {
        return this.rd.getRataDie()
    },
    setRd: function(t) {
        this.rd = this.newRd({
            rd: t,
            cal: this.cal
        }),
        this._calcDateComponents()
    },
    getJulianDay: function() {
        return this.rd.getJulianDay()
    },
    setJulianDay: function(t) {
        this.rd = this.newRd({
            julianday: "object" == typeof t ? t.getDate() : t,
            cal: this.cal
        }),
        this._calcDateComponents()
    },
    getTimeZone: function() {
        return this.timezone || "local"
    },
    setTimeZone: function(t) {
        t && "" !== t ? "string" == typeof t && (this.timezone = t, this.tz = void 0, this._calcDateComponents()) : (this.timezone = void 0, this.tz = void 0)
    },
    firstSunday: function(t) {
        var e = this.newRd({
            year: t,
            month: 1,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
            cal: this.cal
        }),
        i = this.newRd({
            rd: e.onOrAfter(4),
            cal: this.cal
        });
        return i.before(0)
    },
    getWeekOfYear: function() {
        var t, e = Math.floor(this.rd.getRataDie()),
        i = this._calcYear(e + this.offset),
        n = this.firstSunday(i);
        return n > e ? n = this.firstSunday(i - 1) : (t = this.firstSunday(i + 1), e >= t && (n = t)),
        Math.floor((e - n) / 7) + 1
    },
    getWeekOfMonth: function(t) {
        var e = new ilib.LocaleInfo(t),
        i = this.newRd({
            year: this._calcYear(this.rd.getRataDie() + this.offset),
            month: this.getMonths(),
            day: 1,
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
            cal: this.cal
        }),
        n = i.onOrAfter(e.getFirstDayOfWeek());
        return n - i.getRataDie() > 3 && (n -= 7),
        Math.floor((this.rd.getRataDie() - n) / 7) + 1
    }
},
ilib.bind = function(t, e) {
    function i(t, e) {
        for (var i = [], n = e || 0, o = t.length; o > n; n++) i.push(t[n]);
        return i
    }
    if (!t || !e) return void 0;
    if ("function" == typeof e) {
        var n, o = i(arguments, 2);
        return n = "function" == typeof e.bind ? e.bind.apply(e, [t].concat(o)) : function() {
            var n = i(arguments);
            return e.apply(t, o.concat(n))
        }
    }
    return void 0
},
ilib.merge = function(t, e, i, n, o) {
    var s = void 0,
    a = {};
    for (s in t) s && t[s] !== void 0 && (a[s] = t[s]);
    for (s in e) s && e[s] !== void 0 && (t[s] instanceof Array && e[s] instanceof Array ? "boolean" == typeof i && i ? a[s] = e[s] : (a[s] = [], a[s] = a[s].concat(t[s]), a[s] = a[s].concat(e[s])) : "object" == typeof t[s] && "object" == typeof e[s] ? a[s] = ilib.merge(t[s], e[s], i) : (n && o && a[s] == e[s] && console.log("Property " + s + " in " + n + " is being overridden by the same value in " + o), a[s] = e[s]));
    return a
},
ilib.mergeLocData = function(t, e, i, n) {
    var o, s = void 0,
    a = e || new ilib.Locale,
    r = !1,
    h = t;
    return s = ilib.data[t] || {},
    o = s,
    a.getLanguage() && (h = t + "_" + a.getLanguage(), ilib.data[h] && (r = !0, s = ilib.merge(s, ilib.data[h], i), o = ilib.data[h])),
    a.getRegion() && (h = t + "_" + a.getRegion(), ilib.data[h] && (r = !0, s = ilib.merge(s, ilib.data[h], i), o = ilib.data[h])),
    a.getLanguage() && (h = t + "_" + a.getLanguage(), a.getScript() && (h = t + "_" + a.getLanguage() + "_" + a.getScript(), ilib.data[h] && (r = !0, s = ilib.merge(s, ilib.data[h], i), o = ilib.data[h])), a.getRegion() && (h = t + "_" + a.getLanguage() + "_" + a.getRegion(), ilib.data[h] && (r = !0, s = ilib.merge(s, ilib.data[h], i), o = ilib.data[h]))),
    a.getRegion() && a.getVariant() && (h = t + "_" + a.getLanguage() + "_" + a.getVariant(), ilib.data[h] && (r = !0, s = ilib.merge(s, ilib.data[h], i), o = ilib.data[h])),
    a.getLanguage() && a.getScript() && a.getRegion() && (h = t + "_" + a.getLanguage() + "_" + a.getScript() + "_" + a.getRegion(), ilib.data[h] && (r = !0, s = ilib.merge(s, ilib.data[h], i), o = ilib.data[h])),
    a.getLanguage() && a.getRegion() && a.getVariant() && (h = t + "_" + a.getLanguage() + "_" + a.getRegion() + "_" + a.getVariant(), ilib.data[h] && (r = !0, s = ilib.merge(s, ilib.data[h], i), o = ilib.data[h])),
    a.getLanguage() && a.getScript() && a.getRegion() && a.getVariant() && (h = t + "_" + a.getLanguage() + "_" + a.getScript() + "_" + a.getRegion() + "_" + a.getVariant(), ilib.data[h] && (r = !0, s = ilib.merge(s, ilib.data[h], i), o = ilib.data[h])),
    r ? n ? o: s: void 0
},
ilib.getLocFiles = function(t, e) {
    var i = "",
    n = [],
    o = e || "resources.json",
    s = t || new ilib.Locale,
    a = s.getLanguage(),
    r = s.getRegion(),
    h = s.getScript(),
    l = s.getVariant();
    return n.push(o),
    a && (i = a + "/", n.push(i + o)),
    r && (i = "und/" + r + "/", n.push(i + o)),
    a && (h && (i = a + "/" + h + "/", n.push(i + o)), r && (i = a + "/" + r + "/", n.push(i + o))),
    r && l && (i = "und/" + r + "/" + l + "/", n.push(i + o)),
    a && h && r && (i = a + "/" + h + "/" + r + "/", n.push(i + o)),
    a && r && l && (i = a + "/" + r + "/" + l + "/", n.push(i + o)),
    a && h && r && l && (i = a + "/" + h + "/" + r + "/" + l + "/", n.push(i + o)),
    n
},
ilib.isEmpty = function(t) {
    var e = void 0;
    if (!t) return ! 0;
    for (e in t) if (e && t[e] !== void 0) return ! 1;
    return ! 0
},
ilib.hashCode = function(t) {
    function e(t, e) {
        return t *= 65543,
        t += e,
        t %= 2147483647
    }
    function i(t) {
        for (var i = 0,
        n = 0; t.length > n; n++) i = e(i, t.charCodeAt(n));
        return i
    }
    var n = 0;
    switch (typeof t) {
    case "undefined":
        n = 0;
        break;
    case "string":
        n = i(t);
        break;
    case "function":
    case "number":
    case "xml":
        n = i(t + "");
        break;
    case "boolean":
        n = t ? 1 : 0;
        break;
    case "object":
        var o = [];
        for (var s in t) t.hasOwnProperty(s) && o.push(s);
        o.sort();
        for (var a = 0; o.length > a; a++) n = e(n, i(o[a])),
        n = e(n, ilib.hashCode(t[o[a]]))
    }
    return n
},
ilib._callLoadData = function(t, e, i, n) {
    return "function" == typeof ilib._load ? ilib._load(t, e, i, n) : "object" == typeof ilib._load && ilib._load instanceof ilib.Loader ? ilib._load.loadFiles(t, e, i, n) : void 0
},
ilib.loadData = function(t) {
    var e, i = "resources.json",
    n = void 0,
    o = new ilib.Locale(ilib.getLocale()),
    s = !1,
    a = void 0,
    r = {},
    h = void 0,
    l = !1,
    c = !1;
    if (t && "function" == typeof t.callback) {
        if (t.name && (i = t.name), t.object && (n = t.object), t.locale && (o = "string" == typeof t.locale ? new ilib.Locale(t.locale) : t.locale), t.type && (a = t.type), t.loadParams && (r = t.loadParams), t.sync && (s = t.sync), t.nonlocale && (l = !!t.nonlocale), "boolean" == typeof t.replace && (c = t.replace), h = t.callback, n && !n.cache && (n.cache = {}), !a) {
            var d = i.lastIndexOf(".");
            a = -1 !== d ? i.substring(d + 1) : "text"
        }
        var u = (!l && o.getSpec().replace(/-/g, "_") || "root") + "," + i + "," + (ilib.hashCode(r) + "");
        if (n && n.cache[u] !== void 0) h(n.cache[u]);
        else {
            var g, f = r && r.returnOne;
            if ("json" === a && (e = i.substring(0, i.lastIndexOf(".")), l ? (e = e.replace(/\//g, ".").replace(/[\\\+\-]/g, "_"), g = ilib.data[e]) : g = ilib.mergeLocData(e, o, c, f), g)) return n && (n.cache[u] = g),
            h(g),
            void 0;
            if (ilib._load !== void 0) {
                var p = l ? [i || "resources.json"] : ilib.getLocFiles(o, i);
                "json" !== a && (r.returnOne = !0),
                ilib._callLoadData(p, s, r, ilib.bind(this,
                function(t) {
                    if ("json" === a) {
                        g = ilib.data[e] || {};
                        for (var i = 0; t.length > i; i++) t[i] !== void 0 && (g = r.returnOne ? t[i] : ilib.merge(g, t[i], c));
                        n && (n.cache[u] = g),
                        h(g)
                    } else {
                        for (var i = t.length - 1; i > -1 && !t[i];) i--;
                        i > -1 ? (n && (n.cache[u] = t[i]), h(t[i])) : h(void 0)
                    }
                }))
            } else "json" === a && (g = ilib.data[e]),
            n && g && (n.cache[u] = g),
            h(g)
        }
    }
},
ilib.signum = function(t) {
    var e = t;
    if ("string" == typeof t) e = parseInt(t, 10);
    else if ("number" != typeof t) return 1;
    return 0 > e ? -1 : 1
},
ilib._roundFnc = {
    floor: function(t) {
        return Math.floor(t)
    },
    ceiling: function(t) {
        return Math.ceil(t)
    },
    down: function(t) {
        return 0 > t ? Math.ceil(t) : Math.floor(t)
    },
    up: function(t) {
        return 0 > t ? Math.floor(t) : Math.ceil(t)
    },
    halfup: function(t) {
        return 0 > t ? Math.ceil(t - .5) : Math.floor(t + .5)
    },
    halfdown: function(t) {
        return 0 > t ? Math.floor(t + .5) : Math.ceil(t - .5)
    },
    halfeven: function(t) {
        return 0 === Math.floor(t) % 2 ? Math.ceil(t - .5) : Math.floor(t + .5)
    },
    halfodd: function(t) {
        return 0 !== Math.floor(t) % 2 ? Math.ceil(t - .5) : Math.floor(t + .5)
    }
},
ilib.mod = function(t, e) {
    if (0 == e) return 0;
    var i = t % e;
    return 0 > i ? i + e: i
},
ilib.amod = function(t, e) {
    if (0 == e) return 0;
    var i = t % e;
    return 0 >= i ? i + e: i
},
ilib.String = function(t) {
    this.str = "object" == typeof t ? t instanceof ilib.String ? t.str: "" + t: "string" == typeof t ? new String(t) : "",
    this.length = this.str.length,
    this.cpLength = -1,
    this.localeSpec = ilib.getLocale()
},
ilib.String._isSurrogate = function(t) {
    var e = t.charCodeAt(0);
    return e >= 56320 && 57343 >= e || e >= 55296 && 56319 >= e
},
ilib.String.fromCodePoint = function(t) {
    if (65536 > t) return String.fromCharCode(t);
    var e = Math.floor(t / 65536) - 1,
    i = 65535 & t;
    return String.fromCharCode(55296 | (15 & e) << 6 | (64512 & i) >> 10) + String.fromCharCode(56320 | 1023 & i)
},
ilib.String.toCodePoint = function(t, e) {
    if (!t || 0 === t.length) return - 1;
    var i = -1,
    n = t.charCodeAt(e);
    if (n >= 55296 && 56319 >= n) {
        if (t.length > e + 1) {
            var o = t.charCodeAt(e + 1);
            o >= 56320 && 57343 >= o && (i = ((960 & n) >> 6) + 1 << 16 | ((63 & n) << 10 | 1023 & o))
        }
    } else i = n;
    return i
},
ilib.String.loadPlurals = function(t, e, i, n) {
    var o;
    o = e ? "string" == typeof e ? new ilib.Locale(e) : e: new ilib.Locale(ilib.getLocale());
    var s = o.getLanguage();
    ilib.data["plurals_" + s] ? n && "function" == typeof n && n(ilib.data["plurals_" + s]) : ilib.loadData({
        name: "plurals.json",
        object: ilib.String,
        locale: o,
        sync: t,
        loadParams: i,
        callback: ilib.bind(this,
        function(t) {
            t || (ilib.String.cache[s] = {}),
            ilib.data["plurals_" + s] = t || {},
            n && "function" == typeof n && n(ilib.data["plurals_" + s])
        })
    })
},
ilib.String._fncs = {
    firstProp: function(t) {
        for (var e in t) if (e && t[e]) return e;
        return void 0
    },
    getValue: function(t, e) {
        if ("object" == typeof t) {
            var i = ilib.String._fncs.firstProp(t);
            return ilib.String._fncs[i](t[i], e)
        }
        return "string" == typeof t ? e: t
    },
    matchRangeContinuous: function(t, e) {
        for (var i in e) if (i !== void 0 && e[i] !== void 0) {
            var n = e[i];
            if ("number" == typeof n) {
                if (t === e[i]) return ! 0
            } else if ("[object Array]" === Object.prototype.toString.call(n) && t >= n[0] && n[1] >= t) return ! 0
        }
        return ! 1
    },
    matchRange: function(t, e) {
        return Math.floor(t) !== t ? !1 : ilib.String._fncs.matchRangeContinuous(t, e)
    },
    is: function(t, e) {
        var i = ilib.String._fncs.getValue(t[0], e),
        n = ilib.String._fncs.getValue(t[1], e);
        return i == n
    },
    isnot: function(t, e) {
        return ilib.String._fncs.getValue(t[0], e) != ilib.String._fncs.getValue(t[1], e)
    },
    inrange: function(t, e) {
        return ilib.String._fncs.matchRange(ilib.String._fncs.getValue(t[0], e), t[1])
    },
    notin: function(t, e) {
        return ! ilib.String._fncs.matchRange(ilib.String._fncs.getValue(t[0], e), t[1])
    },
    within: function(t, e) {
        return ilib.String._fncs.matchRangeContinuous(ilib.String._fncs.getValue(t[0], e), t[1])
    },
    mod: function(t, e) {
        return ilib.mod(ilib.String._fncs.getValue(t[0], e), ilib.String._fncs.getValue(t[1], e))
    },
    n: function(t, e) {
        return e
    },
    or: function(t, e) {
        return ilib.String._fncs.getValue(t[0], e) || ilib.String._fncs.getValue(t[1], e)
    },
    and: function(t, e) {
        return ilib.String._fncs.getValue(t[0], e) && ilib.String._fncs.getValue(t[1], e)
    }
},
ilib.String.prototype = {
    _length: function() {
        return this.str.length
    },
    format: function(t) {
        var e = this.str;
        if (t) {
            var i;
            for (var n in t) t[n] !== void 0 && (i = RegExp("{" + n + "}", "g"), e = e.replace(i, t[n]))
        }
        return "" + e
    },
    formatChoice: function(t, e) {
        var i, n, o, s, a = this.str.split("|"),
        r = typeof t,
        h = [],
        l = [],
        c = void 0,
        d = "";
        if (0 === this.str.length) return "";
        for (i = 0; a.length > i; i++) if (n = a[i].split("#"), n.length > 2) h[i] = n[0],
        n = n.shift(),
        l[i] = n.join("#");
        else {
            if (2 !== n.length) throw "syntax error in choice format pattern: " + a[i];
            h[i] = n[0],
            l[i] = n[1]
        }
        for (i = 0; h.length > i; i++) if (0 === h[i].length) d = new ilib.String(l[i]);
        else switch (r) {
        case "number":
            if (s = parseInt(t, 10), "<=" === h[i].substring(0, 2)) o = parseFloat(h[i].substring(2)),
            o >= s && (c = new ilib.String(l[i]), i = h.length);
            else if (">=" === h[i].substring(0, 2)) o = parseFloat(h[i].substring(2)),
            s >= o && (c = new ilib.String(l[i]), i = h.length);
            else if ("<" === h[i].charAt(0)) o = parseFloat(h[i].substring(1)),
            o > s && (c = new ilib.String(l[i]), i = h.length);
            else if (">" === h[i].charAt(0)) o = parseFloat(h[i].substring(1)),
            s > o && (c = new ilib.String(l[i]), i = h.length);
            else switch (this.locale = this.locale || new ilib.Locale(this.localeSpec), h[i]) {
            case "zero":
            case "one":
            case "two":
            case "few":
            case "many":
                var u = ilib.data["plurals_" + this.locale.getLanguage()];
                if (u) {
                    var g = u[h[i]];
                    ilib.String._fncs.getValue(g, s) && (c = new ilib.String(l[i]), i = h.length)
                }
                break;
            default:
                var f = h[i].indexOf("-");
                if ( - 1 !== f) {
                    var p = h[i].substring(0, f),
                    m = h[i].substring(f + 1);
                    s >= parseInt(p, 10) && parseInt(m, 10) >= s && (c = new ilib.String(l[i]), i = h.length)
                } else s === parseInt(h[i], 10) && (c = new ilib.String(l[i]), i = h.length)
            }
            break;
        case "boolean":
            "true" === h[i] && t === !0 ? (c = new ilib.String(l[i]), i = h.length) : "false" === h[i] && t === !1 && (c = new ilib.String(l[i]), i = h.length);
            break;
        case "string":
            var b = RegExp(h[i], "i");
            b.test(t) && (c = new ilib.String(l[i]), i = h.length);
            break;
        case "object":
            throw "syntax error: fmtChoice parameter for the argument index cannot be an object"
        }
        return c || (c = d || new ilib.String("")),
        c = c.format(e),
        "" + c
    },
    toString: function() {
        return "" + this.str
    },
    valueOf: function() {
        return this.str.valueOf()
    },
    charAt: function(t) {
        return new ilib.String(this.str.charAt(t))
    },
    charCodeAt: function(t) {
        return this.str.charCodeAt(t)
    },
    concat: function(t) {
        return new ilib.String(this.str.concat(t))
    },
    indexOf: function(t, e) {
        return this.str.indexOf(t, e)
    },
    lastIndexOf: function(t, e) {
        return this.str.lastIndexOf(t, e)
    },
    match: function(t) {
        return this.str.match(t)
    },
    replace: function(t, e) {
        return new ilib.String(this.str.replace(t, e))
    },
    search: function(t) {
        return this.str.search(t)
    },
    slice: function(t, e) {
        return new ilib.String(this.str.slice(t, e))
    },
    split: function(t, e) {
        return this.str.split(t, e)
    },
    substr: function(t, e) {
        return new ilib.String(this.str.substr(t, e))
    },
    substring: function(t, e) {
        return this.str.substring(t, e)
    },
    toLowerCase: function() {
        return this.str.toLowerCase()
    },
    toUpperCase: function() {
        return this.str.toUpperCase()
    },
    _toCodePoint: function(t) {
        return ilib.String.toCodePoint(this.str, t)
    },
    forEach: function(t) {
        if ("function" == typeof t) for (var e = this.charIterator(); e.hasNext();) t(e.next())
    },
    forEachCodePoint: function(t) {
        if ("function" == typeof t) for (var e = this.iterator(); e.hasNext();) t(e.next())
    },
    iterator: function() {
        function t(t) {
            this.index = 0,
            this.hasNext = function() {
                return this.index < t.str.length
            },
            this.next = function() {
                if (this.index < t.str.length) {
                    var e = t._toCodePoint(this.index);
                    this.index += e > 65535 ? 2 : 1
                } else e = -1;
                return e
            }
        }
        return new t(this)
    },
    charIterator: function() {
        function t(t) {
            this.index = 0,
            this.hasNext = function() {
                return this.index < t.str.length
            },
            this.next = function() {
                var e;
                return this.index < t.str.length && (e = t.str.charAt(this.index), ilib.String._isSurrogate(e) && this.index + 1 < t.str.length && ilib.String._isSurrogate(t.str.charAt(this.index + 1)) && (this.index++, e += t.str.charAt(this.index)), this.index++),
                e
            }
        }
        return new t(this)
    },
    codePointAt: function(t) {
        if (0 > t) return - 1;
        var e, i, n = this.iterator();
        for (e = t; e >= 0 && n.hasNext(); e--) i = n.next();
        return 0 > e ? i: -1
    },
    setLocale: function(t, e, i, n) {
        "object" == typeof t ? this.locale = t: (this.localeSpec = t, this.locale = new ilib.Locale(t)),
        ilib.String.loadPlurals(e !== void 0 ? e: !0, this.locale, i, n)
    },
    getLocale: function() {
        return (this.locale ? this.locale.getSpec() : this.localeSpec) || ilib.getLocale()
    },
    codePointLength: function() {
        if ( - 1 === this.cpLength) {
            var t = this.iterator();
            for (this.cpLength = 0; t.hasNext();) this.cpLength++,
            t.next()
        }
        return this.cpLength
    }
},
ilib.Cal = function() {},
ilib.Cal.newInstance = function(t) {
    var e, i = t && t.locale,
    n = t && t.type;
    if (i || (i = new ilib.Locale), !n) {
        var o = new ilib.LocaleInfo(i);
        n = o.getCalendar()
    }
    return e = ilib.Cal._constructors[n],
    e && new e(t)
},
ilib.Cal._constructors = {},
ilib.Cal.getCalendars = function() {
    var t, e = [];
    for (t in ilib.Cal._constructors) t && ilib.Cal._constructors[t] && e.push(t);
    return e
},
ilib.Cal.prototype = {
    getType: function() {
        throw "Cannot call methods of abstract class ilib.Cal"
    },
    getNumMonths: function() {
        throw "Cannot call methods of abstract class ilib.Cal"
    },
    getMonLength: function() {
        throw "Cannot call methods of abstract class ilib.Cal"
    },
    isLeapYear: function() {
        throw "Cannot call methods of abstract class ilib.Cal"
    }
},
ilib.JulianDay = function(t) {
    this.jd = t,
    this.days = Math.floor(this.jd),
    this.frac = t - this.days
},
ilib.JulianDay.prototype = {
    getDays: function() {
        return this.days
    },
    setDays: function(t) {
        this.days = Math.floor(t),
        this.jd = this.days + this.frac
    },
    getDayFraction: function() {
        return this.frac
    },
    setDayFraction: function(t) {
        var e = Math.floor(t);
        this.frac = t - e,
        this.jd = this.days + this.frac
    },
    getDate: function() {
        return this.jd
    },
    setDate: function(t) {
        this.jd = t
    },
    addDate: function(t) {
        "number" == typeof t && (this.jd += t, this.days = Math.floor(this.jd), this.frac = this.jd - this.days)
    }
},
ilib.Cal.Gregorian = function() {
    this.type = "gregorian"
},
ilib.Cal.Gregorian.monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
ilib.Cal.Gregorian.prototype.getNumMonths = function() {
    return 12
},
ilib.Cal.Gregorian.prototype.getMonLength = function(t, e) {
    return 2 === t && this.isLeapYear(e) ? 29 : ilib.Cal.Gregorian.monthLengths[t - 1]
},
ilib.Cal.Gregorian.prototype.isLeapYear = function(t) {
    var e = "number" == typeof t ? t: t.getYears(),
    i = ilib.mod(e, 400);
    return 0 === ilib.mod(e, 4) && 100 !== i && 200 !== i && 300 !== i
},
ilib.Cal.Gregorian.prototype.getType = function() {
    return this.type
},
ilib.Cal.Gregorian.prototype.newDateInstance = function(t) {
    return new ilib.Date.GregDate(t)
},
ilib.Cal._constructors.gregorian = ilib.Cal.Gregorian,
ilib.Date.RataDie = function(t) {
    if (t) if (t.date !== void 0) {
        var e = t.date;
        e instanceof Date || (e = new Date(e)),
        this._setTime(e.getTime())
    } else t.unixtime !== void 0 ? this._setTime(parseInt(t.unixtime, 10)) : t.julianday !== void 0 ? this._setJulianDay(parseFloat(t.julianday)) : t.year || t.month || t.day || t.hour || t.minute || t.second || t.millisecond || t.parts || t.cycle ? this._setDateComponents(t) : t.rd !== void 0 && (this.rd = "object" == typeof t.rd && t.rd instanceof ilib.Date.RataDie ? t.rd.rd: t.rd);
    if (this.rd === void 0) {
        var i = new Date;
        this._setTime(i.getTime())
    }
},
ilib.Date.RataDie.gregorianEpoch = 1721424.5,
ilib.Date.RataDie.prototype = {
    epoch: ilib.Date.RataDie.gregorianEpoch,
    _setTime: function(t) {
        this._setJulianDay(2440587.5 + t / 864e5)
    },
    _setJulianDay: function(t) {
        var e = "number" == typeof t ? new ilib.JulianDay(t) : t;
        this.rd = ilib._roundFnc.halfup(864e5 * (e.getDate() - this.epoch)) / 864e5
    },
    _onOrBefore: function(t, e) {
        return t - ilib.mod(Math.floor(t) - e - 2, 7)
    },
    onOrBefore: function(t, e) {
        return e = e || 0,
        this._onOrBefore(this.rd + e, t) - e
    },
    onOrAfter: function(t, e) {
        return e = e || 0,
        this._onOrBefore(this.rd + 6 + e, t) - e
    },
    before: function(t, e) {
        return e = e || 0,
        this._onOrBefore(this.rd - 1 + e, t) - e
    },
    after: function(t, e) {
        return e = e || 0,
        this._onOrBefore(this.rd + 7 + e, t) - e
    },
    getTime: function() {
        var t = this.getJulianDay();
        return 2440587.5 > t || t > 2465442.634803241 ? -1 : Math.round(864e5 * (t - 2440587.5))
    },
    getTimeExtended: function() {
        var t = this.getJulianDay();
        return - 97559412.5 > t || t > 102440587.5 ? 0 / 0 : Math.round(864e5 * (t - 2440587.5))
    },
    getJulianDay: function() {
        return this.rd + this.epoch
    },
    getRataDie: function() {
        return this.rd
    }
},
ilib.Date.GregRataDie = function(t) {
    this.cal = t && t.cal || new ilib.Cal.Gregorian,
    this.rd = void 0,
    ilib.Date.RataDie.call(this, t)
},
ilib.Date.GregRataDie.prototype = new ilib.Date.RataDie,
ilib.Date.GregRataDie.prototype.parent = ilib.Date.RataDie,
ilib.Date.GregRataDie.prototype.constructor = ilib.Date.GregRataDie,
ilib.Date.GregRataDie.cumMonthLengths = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365],
ilib.Date.GregRataDie.cumMonthLengthsLeap = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366],
ilib.Date.GregRataDie.prototype._setDateComponents = function(t) {
    var e = parseInt(t.year, 10) || 0,
    i = parseInt(t.month, 10) || 1,
    n = parseInt(t.day, 10) || 1,
    o = parseInt(t.hour, 10) || 0,
    s = parseInt(t.minute, 10) || 0,
    a = parseInt(t.second, 10) || 0,
    r = parseInt(t.millisecond, 10) || 0,
    h = 365 * (e - 1) + Math.floor((e - 1) / 4) - Math.floor((e - 1) / 100) + Math.floor((e - 1) / 400),
    l = (i > 1 ? ilib.Date.GregRataDie.cumMonthLengths[i - 1] : 0) + n + (ilib.Cal.Gregorian.prototype.isLeapYear.call(this.cal, e) && i > 2 ? 1 : 0),
    c = (36e5 * o + 6e4 * s + 1e3 * a + r) / 864e5;
    this.rd = h + l + c
},
ilib.Date.GregRataDie.prototype._onOrBefore = function(t, e) {
    return t - ilib.mod(Math.floor(t) - e, 7)
},
ilib.TimeZone = function(t) {
    if (this.sync = !0, this.locale = new ilib.Locale, this.isLocal = !1, t) {
        if (t.locale && (this.locale = "string" == typeof t.locale ? new ilib.Locale(t.locale) : t.locale), t.id) {
            var e = "" + t.id;
            if ("local" === e) {
                this.isLocal = !0;
                var i = new Date,
                n = new Date(i.getFullYear(), 0, 1),
                o = new Date(i.getFullYear(), 5, 1);
                this.offsetJan1 = -n.getTimezoneOffset(),
                this.offsetJun1 = -o.getTimezoneOffset(),
                this.offset = Math.min(this.offsetJan1, this.offsetJun1)
            }
            this.id = e
        } else t.offset && (this.offset = "string" == typeof t.offset ? parseInt(t.offset, 10) : t.offset, this.id = this.getDisplayName(void 0, void 0));
        t.sync !== void 0 && (this.sync = !!t.sync),
        this.loadParams = t.loadParams,
        this.onLoad = t.onLoad
    }
    this.id ? this._loadtzdata() : new ilib.LocaleInfo(this.locale, {
        sync: this.sync,
        onLoad: ilib.bind(this,
        function(t) {
            this.id = t.getTimeZone() || "Etc/UTC",
            this._loadtzdata()
        })
    })
},
ilib.TimeZone.prototype._loadtzdata = function() {
    ilib.data.zoneinfo[this.id] || void 0 !== this.offset ? this._initZone() : ilib.loadData({
        object: ilib.TimeZone,
        nonlocale: !0,
        name: "zoneinfo/" + this.id + ".json",
        sync: this.sync,
        loadParams: this.loadParams,
        callback: ilib.bind(this,
        function(t) {
            t && !ilib.isEmpty(t) && (ilib.data.zoneinfo[this.id] = t),
            this._initZone()
        })
    })
},
ilib.TimeZone.prototype._initZone = function() {
    if (this.zone = ilib.data.zoneinfo[this.id], this.zone || void 0 !== this.offset || (this.id = "Etc/UTC", this.zone = ilib.data.zoneinfo[this.id]), this._calcDSTSavings(), this.offset === void 0 && this.zone.o) {
        var t = this._offsetStringToObj(this.zone.o);
        this.offset = (60 * Math.abs(t.h || 0) + (t.m || 0)) * ilib.signum(t.h || 0)
    }
    this.onLoad && "function" == typeof this.onLoad && this.onLoad(this)
},
ilib.data.timezone = {},
ilib.TimeZone.getAvailableIds = function(t) {
    var e, i = [];
    if (!ilib.data.timezone.list) if (ilib.data.timezone.list = [], ilib._load instanceof ilib.Loader) {
        var n = ilib._load.listAvailableFiles();
        for (var o in n) {
            var s = n[o];
            "object" == typeof s && s instanceof Array && s.forEach(function(t) {
                t && t.match(/^zoneinfo/) && ilib.data.timezone.list.push(t.replace(/^zoneinfo\//, "").replace(/\.json$/, ""))
            })
        }
    } else for (e in ilib.data.zoneinfo) ilib.data.zoneinfo[e] && ilib.data.timezone.list.push(e);
    if (t) ilib.data.zoneinfo.zonetab || ilib.loadData({
        object: ilib.TimeZone,
        nonlocale: !0,
        name: "zoneinfo/zonetab.json",
        sync: !0,
        callback: ilib.bind(this,
        function(t) {
            t && (ilib.data.zoneinfo.zonetab = t)
        })
    }),
    i = ilib.data.zoneinfo.zonetab[t];
    else {
        i.push("local");
        for (e in ilib.data.timezone.list) ilib.data.timezone.list[e] && i.push(ilib.data.timezone.list[e])
    }
    return i
},
ilib.TimeZone.prototype.getId = function() {
    return "" + this.id
},
ilib.TimeZone.prototype.getDisplayName = function(t, e) {
    switch (e = this.isLocal || this.zone === void 0 ? "rfc822": e || "standard") {
    default:
    case "standard":
        if (this.zone.f && "zzz" !== this.zone.f) {
            if ( - 1 !== this.zone.f.indexOf("{c}")) {
                var i = "";
                i = this.inDaylightTime(t) ? this.zone.s && this.zone.s.c: this.zone.e && this.zone.e.c;
                var n = new ilib.String(this.zone.f);
                return n.format({
                    c: i || ""
                })
            }
            return this.zone.f
        }
        var n = "GMT" + this.zone.o;
        return this.inDaylightTime(t) && (n += "+" + this.zone.s.v),
        n;
    case "rfc822":
        var o = this.getOffset(t),
        s = "UTC",
        a = o.h || 0,
        r = o.m || 0;
        return 0 !== a && (s += a > 0 ? "+": "-", 10 > Math.abs(a) && (s += "0"), s += 0 > a ? -a: a, 10 > r && (s += "0"), s += r),
        s;
    case "long":
        if (this.zone.n) {
            if ( - 1 !== this.zone.n.indexOf("{c}")) {
                var h = this.inDaylightTime(t) ? "Daylight": "Standard",
                n = new ilib.String(this.zone.n);
                return n.format({
                    c: h || ""
                })
            }
            return this.zone.n
        }
        var n = "GMT" + this.zone.o;
        return this.inDaylightTime(t) && (n += "+" + this.zone.s.v),
        n
    }
},
ilib.TimeZone.prototype._offsetStringToObj = function(t) {
    var e, i = "string" == typeof t ? t.split(":") : [],
    n = {
        h: 0
    };
    return i.length > 0 && (n.h = parseInt(i[0], 10), i.length > 1 && (e = parseInt(i[1], 10), e && (n.m = e), i.length > 2 && (e = parseInt(i[2], 10), e && (n.s = e)))),
    n
},
ilib.TimeZone.prototype.getOffset = function(t) {
    if (!t) return this.getRawOffset();
    var e = this.getOffsetMillis(t) / 6e4,
    i = ilib._roundFnc.down(e / 60),
    n = Math.abs(e) - 60 * Math.abs(i),
    o = {
        h: i
    };
    return 0 != n && (o.m = n),
    o
},
ilib.TimeZone.prototype.getOffsetMillis = function(t) {
    var e;
    if (this.isLocal && t.dst === void 0) {
        var i = t ? new Date(t.getTime()) : new Date;
        return 6e4 * -i.getTimezoneOffset()
    }
    return e = this.offset,
    t && this.inDaylightTime(t) && (e += this.dstSavings),
    6e4 * e
},
ilib.TimeZone.prototype._getOffsetMillisWallTime = function(t) {
    var e;
    return e = this.offset,
    t && this.inDaylightTime(t, !0) && (e += this.dstSavings),
    6e4 * e
},
ilib.TimeZone.prototype.getOffsetStr = function(t) {
    var e, i = this.getOffset(t);
    return e = i.h,
    i.m !== void 0 ? (e += ":" + i.m, i.s !== void 0 && (e += ":" + i.s)) : e += ":0",
    e
},
ilib.TimeZone.prototype.getRawOffset = function() {
    var t = ilib._roundFnc.down(this.offset / 60),
    e = Math.abs(this.offset) - 60 * Math.abs(t),
    i = {
        h: t
    };
    return 0 != e && (i.m = e),
    i
},
ilib.TimeZone.prototype.getRawOffsetMillis = function() {
    return 6e4 * this.offset
},
ilib.TimeZone.prototype.getRawOffsetStr = function() {
    var t = this.getRawOffset();
    return t.h + ":" + (t.m || "0")
},
ilib.TimeZone.prototype.getDSTSavings = function() {
    if (this.isLocal) {
        var t = Math.abs(this.offsetJan1 - this.offsetJun1),
        e = ilib._roundFnc.down(t / 60),
        i = t - 60 * e;
        return {
            h: e,
            m: i
        }
    }
    return this.zone && this.zone.s ? this._offsetStringToObj(this.zone.s.v) : {
        h: 0
    }
},
ilib.TimeZone.prototype.getDSTSavingsStr = function() {
    if (this.isLocal) {
        var t = this.getDSTSavings();
        return t.h + ":" + t.m
    }
    return this.offset !== void 0 && this.zone && this.zone.s ? this.zone.s.v: "0:0"
},
ilib.TimeZone.prototype._calcRuleStart = function(t, e) {
    var i, n, o, s, a, r = "=",
    h = 0,
    l = 0,
    c = 0,
    d = 0;
    t.j !== void 0 ? n = new ilib.Date.GregRataDie({
        julianday: t.j
    }) : ("l" == t.r.charAt(0) || "f" == t.r.charAt(0) ? (o = ilib.Cal.newInstance({
        type: "gregorian"
    }), r = t.r.charAt(0), h = parseInt(t.r.substring(1), 10), i = "l" === r ? o.getMonLength(t.m, e) : 1) : (a = t.r.indexOf("<"), -1 == a && (a = t.r.indexOf(">")), -1 != a ? (r = t.r.charAt(a), h = parseInt(t.r.substring(0, a), 10), i = parseInt(t.r.substring(a + 1), 10)) : i = parseInt(t.r, 10)), t.t && (s = t.t.split(":"), l = parseInt(s[0], 10), s.length > 1 && (c = parseInt(s[1], 10), s.length > 2 && (d = parseInt(s[2], 10)))), n = new ilib.Date.GregRataDie({
        year: e,
        month: t.m,
        day: i,
        hour: l,
        minute: c,
        second: d
    }));
    var u = n.getRataDie();
    switch (r) {
    case "l":
    case "<":
        u = n.onOrBefore(h);
        break;
    case "f":
    case ">":
        u = n.onOrAfter(h)
    }
    return u
},
ilib.TimeZone.prototype._calcDSTSavings = function() {
    var t = this.getDSTSavings();
    this.dstSavings = (60 * Math.abs(t.h || 0) + (t.m || 0)) * ilib.signum(t.h || 0)
},
ilib.TimeZone.prototype._getDSTStartRule = function() {
    return this.zone.s
},
ilib.TimeZone.prototype._getDSTEndRule = function() {
    return this.zone.e
},
ilib.TimeZone.prototype.inDaylightTime = function(t, e) {
    var i, n, o;
    if (this.isLocal) {
        var s = 0;
        void 0 === t.dst || t.dst || (s = 6e4 * this.dstSavings);
        var a = new Date(t ? t.getTimeExtended() + s: void 0),
        r = Math.max(this.offsetJan1, this.offsetJun1);
        return - a.getTimezoneOffset() === r
    }
    if (t ? t instanceof ilib.Date.GregDate || (t = new ilib.Date.GregDate({
        julianday: t.getJulianDay(),
        timezone: t.getTimeZone()
    })) : t = new ilib.Date.GregDate, !this.useDaylightTime(t.year)) return ! 1;
    i = t.rd.getRataDie();
    var h = this._getDSTStartRule(t.year),
    l = this._getDSTEndRule(t.year);
    return n = this._calcRuleStart(h, t.year),
    o = this._calcRuleStart(l, t.year),
    e ? n += this.dstSavings / 1440 : (n -= this.offset / 1440, o -= (this.offset + this.dstSavings) / 1440),
    o > i && this.dstSavings / 1440 >= o - i && "boolean" == typeof t.dst ? t.dst: o > n ? i >= n && o > i ? !0 : !1 : i >= n || o > i ? !0 : !1
},
ilib.TimeZone.prototype.useDaylightTime = function() {
    return this.isLocal && this.offsetJan1 !== this.offsetJun1 || this.zone !== void 0 && this.zone.s !== void 0 && this.zone.e !== void 0
},
ilib.TimeZone.prototype.getCountry = function() {
    return this.zone.c
},
ilib.ResBundle = function(t) {
    var e, i;
    this.locale = new ilib.Locale,
    this.baseName = "strings",
    this.type = "text",
    this.loadParams = {},
    this.missing = "source",
    this.sync = !0,
    t && (t.locale && (this.locale = "string" == typeof t.locale ? new ilib.Locale(t.locale) : t.locale), t.name && (this.baseName = t.name), t.type && (this.type = t.type), this.lengthen = t.lengthen || !1, t.sync !== void 0 && (this.sync = 1 == t.sync), t.loadParams !== void 0 && (this.loadParams = t.loadParams), t.missing !== void 0 && ("pseudo" === t.missing || "empty" === t.missing) && (this.missing = t.missing)),
    this.map = {},
    ilib.ResBundle[this.baseName] || (ilib.ResBundle[this.baseName] = {}),
    e = this.locale.isPseudo() ? new ilib.Locale("en-US") : this.locale,
    ilib.loadData({
        object: ilib.ResBundle[this.baseName],
        locale: e,
        name: this.baseName + ".json",
        sync: this.sync,
        loadParams: this.loadParams,
        callback: ilib.bind(this,
        function(n) {
            n || (n = ilib.data[this.baseName] || {},
            i = e.getSpec().replace(/-/g, "_"), ilib.ResBundle[this.baseName].cache[i] = n),
            this.map = n,
            this.locale.isPseudo() ? (ilib.ResBundle.pseudomap || (ilib.ResBundle.pseudomap = {}), this._loadPseudo(this.locale, t.onLoad)) : "pseudo" === this.missing ? (ilib.ResBundle.pseudomap || (ilib.ResBundle.pseudomap = {}), new ilib.LocaleInfo(this.locale, {
                sync: this.sync,
                loadParams: this.loadParams,
                onLoad: ilib.bind(this,
                function(e) {
                    var i = new ilib.Locale("zxx", "XX", void 0, e.getDefaultScript());
                    this._loadPseudo(i, t.onLoad)
                })
            })) : t && "function" == typeof t.onLoad && t.onLoad(this)
        })
    })
},
ilib.ResBundle.defaultPseudo = ilib.data.pseudomap || {
    a: "\u00e0",
    e: "\u00eb",
    i: "\u00ed",
    o: "\u00f5",
    u: "\u00fc",
    y: "\u00ff",
    A: "\u00c3",
    E: "\u00cb",
    I: "\u00cf",
    O: "\u00d8",
    U: "\u00da",
    Y: "\u0176"
},
ilib.ResBundle.prototype = {
    _loadPseudo: function(t, e) {
        ilib.loadData({
            object: ilib.ResBundle.pseudomap,
            locale: t,
            name: "pseudomap.json",
            sync: this.sync,
            loadParams: this.loadParams,
            callback: ilib.bind(this,
            function(i) {
                if (!i || ilib.isEmpty(i)) {
                    i = ilib.ResBundle.defaultPseudo;
                    var n = t.getSpec().replace(/-/g, "_");
                    ilib.ResBundle.pseudomap.cache[n] = i
                }
                this.pseudomap = i,
                "function" == typeof e && e(this)
            })
        })
    },
    getLocale: function() {
        return this.locale
    },
    getName: function() {
        return this.baseName
    },
    getType: function() {
        return this.type
    },
    pseudo: function(t) {
        if (!t) return void 0;
        var e, i = "";
        for (e = 0; t.length > e; e++) if ("raw" !== this.type) {
            if ("html" === this.type || "xml" === this.type) if ("<" === t.charAt(e)) {
                for (i += t.charAt(e++); t.length > e && ">" !== t.charAt(e);) i += t.charAt(e++);
                t.length > e && (i += t.charAt(e++))
            } else if ("&" === t.charAt(e)) {
                for (i += t.charAt(e++); t.length > e && ";" !== t.charAt(e) && " " !== t.charAt(e);) i += t.charAt(e++);
                t.length > e && (i += t.charAt(e++))
            }
            if (t.length > e) if ("{" === t.charAt(e)) {
                for (i += t.charAt(e++); t.length > e && "}" !== t.charAt(e);) i += t.charAt(e++);
                t.length > e && (i += t.charAt(e))
            } else i += this.pseudomap[t.charAt(e)] || t.charAt(e)
        } else i += this.pseudomap[t.charAt(e)] || t.charAt(e);
        if (this.lengthen) {
            var n;
            for (n = 20 >= i.length ? Math.round(i.length / 2) : i.length > 20 && 40 >= i.length ? Math.round(i.length / 3) : Math.round(i.length / 5), e = n - 1; e >= 0; e--) i += e % 10
        }
        return ("Hans" === this.locale.getScript() || "Hant" === this.locale.getScript() || "Hani" === this.locale.getScript() || "Hrkt" === this.locale.getScript() || "Jpan" === this.locale.getScript() || "Hira" === this.locale.getScript() || "Kana" === this.locale.getScript()) && (i = i.replace(/ /g, "")),
        i
    },
    escapeXml: function(t) {
        return t = t.replace(/&/g, "&amp;"),
        t = t.replace(/</g, "&lt;"),
        t = t.replace(/>/g, "&gt;")
    },
    unescapeXml: function(t) {
        return t = t.replace(/&amp;/g, "&"),
        t = t.replace(/&lt;/g, "<"),
        t = t.replace(/&gt;/g, ">")
    },
    makeKey: function(t) {
        var e = t.replace(/\s+/gm, " ");
        return "xml" === this.type || "html" === this.type ? this.unescapeXml(e) : e
    },
    getString: function(t, e, i) {
        if (!t && !e) return new ilib.String("");
        var n;
        if (this.locale.isPseudo()) {
            var o = t ? t: this.map[e];
            n = this.pseudo(o || e)
        } else {
            var s = e || this.makeKey(t);
            n = this.map[s] !== void 0 ? this.map[s] : "pseudo" === this.missing ? this.pseudo(t || e) : "empty" === this.missing ? "": t
        }
        if (i && "none" !== i && ("default" == i && (i = this.type), "xml" === i || "html" === i ? n = this.escapeXml(n) : ("js" == i || "attribute" === i) && (n = n.replace(/'/g, "\\'").replace(/"/g, '\\"'))), void 0 === n) return void 0;
        var a = new ilib.String(n);
        return a.setLocale(this.locale.getSpec(), !0, this.loadParams),
        a
    },
    containsKey: function(t, e) {
        if (t === void 0 && e === void 0) return ! 1;
        var i = e || this.makeKey(t);
        return this.map[i] !== void 0
    },
    getResObj: function() {
        return this.map
    }
},
ilib.shallowCopy = function(t, e) {
    var i = void 0;
    if (t && e) for (i in t) void 0 !== i && t[i] !== void 0 && (e[i] = t[i])
},
ilib.deepCopy = function(t, e) {
    var i;
    for (i in t) i && ("object" == typeof t[i] ? (e[i] = {},
    ilib.deepCopy(t[i], e[i])) : e[i] = t[i]);
    return e
},
ilib.mapString = function(t, e) {
    var i = "";
    if (e && t) for (var n = 0; t.length > n; n++) {
        var o = t.charAt(n);
        i += e[o] || o
    } else i = t;
    return i
},
ilib.indexOf = function(t, e) {
    if (!t || !e) return - 1;
    if ("function" == typeof t.indexOf) return t.indexOf(e);
    for (var i = 0; t.length > i; i++) if (t[i] === e) return i;
    return - 1
},
ilib.toHexString = function(t, e) {
    var i, n = "",
    o = e && 9 > e ? e: 4;
    if (!t) return "";
    for (i = 0; t.length > i; i++) {
        var s = t.charCodeAt(i).toString(16);
        n += "00000000".substring(0, o - s.length) + s
    }
    return n.toUpperCase()
},
ilib.DateFmt = function(t) {
    var e, i, n, o = !0,
    s = void 0;
    if (this.locale = new ilib.Locale, this.type = "date", this.length = "s", this.dateComponents = "dmy", this.timeComponents = "ahm", this.meridiems = "default", t) {
        if (t.locale && (this.locale = "string" == typeof t.locale ? new ilib.Locale(t.locale) : t.locale), t.type && ("date" === t.type || "time" === t.type || "datetime" === t.type) && (this.type = t.type), t.calendar && (this.calName = t.calendar), t.length && ("short" === t.length || "medium" === t.length || "long" === t.length || "full" === t.length) && (this.length = t.length.charAt(0)), t.date) {
            for (e = t.date.split(""), e.sort(function(t, e) {
                return e > t ? -1 : t > e ? 1 : 0
            }), n = !1, i = 0; e.length > i; i++) if ("d" !== e[i] && "m" !== e[i] && "y" !== e[i] && "w" !== e[i] && "n" !== e[i]) {
                n = !0;
                break
            }
            n || (this.dateComponents = e.join(""))
        }
        if (t.time) {
            for (e = t.time.split(""), e.sort(function(t, e) {
                return e > t ? -1 : t > e ? 1 : 0
            }), this.badTime = !1, i = 0; e.length > i; i++) if ("h" !== e[i] && "m" !== e[i] && "s" !== e[i] && "a" !== e[i] && "z" !== e[i]) {
                this.badTime = !0;
                break
            }
            this.badTime || (this.timeComponents = e.join(""))
        } ! t.clock || "12" !== t.clock && "24" !== t.clock || (this.clock = t.clock),
        t.template && (this.type = "", this.length = "", this.dateComponents = "", this.timeComponents = "", this.template = t.template),
        t.timezone ? this.tz = t.timezone instanceof ilib.TimeZone ? t.timezone: new ilib.TimeZone({
            locale: this.locale,
            id: t.timezone
        }) : t.locale && (this.tz = new ilib.TimeZone({
            locale: this.locale
        })),
        "boolean" == typeof t.useNative && (this.useNative = t.useNative),
        t.meridiems !== void 0 && "chinese" === t.meridiems && (this.meridiems = t.meridiems),
        t.sync !== void 0 && (o = t.sync === !0),
        s = t.loadParams
    }
    ilib.DateFmt.cache || (ilib.DateFmt.cache = {}),
    new ilib.LocaleInfo(this.locale, {
        sync: o,
        loadParams: s,
        onLoad: ilib.bind(this,
        function(e) {
            this.locinfo = e,
            this.calName = this.calName || this.locinfo.getCalendar() || "gregorian",
            this.cal = ilib.Cal.newInstance({
                type: this.calName
            }),
            this.cal || (this.cal = new ilib.Cal.Gregorian),
            new ilib.ResBundle({
                locale: this.locale,
                name: "sysres",
                sync: o,
                loadParams: s,
                onLoad: ilib.bind(this,
                function(e) {
                    this.sysres = e,
                    this.template ? (this._massageTemplate(), t && "function" == typeof t.onLoad && t.onLoad(this)) : ilib.loadData({
                        object: ilib.DateFmt,
                        locale: this.locale,
                        name: "dateformats.json",
                        sync: o,
                        loadParams: s,
                        callback: ilib.bind(this,
                        function(e) {
                            if (!e) {
                                e = ilib.data.dateformats || ilib.DateFmt.defaultFmt;
                                var i = this.locale.getSpec().replace(/-/g, "_");
                                ilib.DateFmt.cache[i] = e
                            }
                            this.clock === void 0 && (this.clock = this.locinfo.getClock()),
                            this._initTemplate(e),
                            this._massageTemplate(),
                            t && "function" == typeof t.onLoad && t.onLoad(this)
                        })
                    })
                })
            })
        })
    })
},
ilib.DateFmt.lenmap = {
    s: "short",
    m: "medium",
    l: "long",
    f: "full"
},
ilib.DateFmt.zeros = "0000",
ilib.DateFmt.defaultFmt = {
    gregorian: {
        order: "{date} {time}",
        date: {
            dmwy: "EEE d/MM/yyyy",
            dmy: "d/MM/yyyy",
            dmw: "EEE d/MM",
            dm: "d/MM",
            my: "MM/yyyy",
            dw: "EEE d",
            d: "dd",
            m: "MM",
            y: "yyyy",
            n: "NN",
            w: "EEE"
        },
        time: {
            12 : "h:mm:ssa",
            24 : "H:mm:ss"
        },
        range: {
            c00: "{st} - {et}, {sd}/{sm}/{sy}",
            c01: "{sd}/{sm} {st} - {ed}/{em} {et}, {sy}",
            c02: "{sd}/{sm} {st} - {ed}/{em} {et}, {sy}",
            c03: "{sd}/{sm}/{sy} {st} - {ed}/{em}/{ey} {et}",
            c10: "{sd}-{ed}/{sm}/{sy}",
            c11: "{sd}/{sm} - {ed}/{em} {sy}",
            c12: "{sd}/{sm}/{sy} - {ed}/{em}/{ey}",
            c20: "{sm}/{sy} - {em}/{ey}",
            c30: "{sy} - {ey}"
        }
    },
    islamic: "gregorian",
    hebrew: "gregorian",
    julian: "gregorian",
    buddhist: "gregorian",
    persian: "gregorian",
    "persian-algo": "gregorian",
    han: "gregorian"
},
ilib.DateFmt.monthNameLenMap = {
    "short": "N",
    medium: "NN",
    "long": "MMM",
    full: "MMMM"
},
ilib.DateFmt.weekDayLenMap = {
    "short": "E",
    medium: "EE",
    "long": "EEE",
    full: "EEEE"
},
ilib.DateFmt.prototype = {
    _initTemplate: function(t) {
        if (!t[this.calName]) throw "No formats available for calendar " + this.calName + " in locale " + ("" + this.locale);
        switch (this.formats = t[this.calName], "string" == typeof this.formats && (this.formats = t[this.formats]), this.template = "", this.type) {
        case "datetime":
            this.template = this.formats && this._getLengthFormat(this.formats.order, this.length) || "{date} {time}",
            this.template = this.template.replace("{date}", this._getFormat(this.formats.date, this.dateComponents, this.length) || ""),
            this.template = this.template.replace("{time}", this._getFormat(this.formats.time[this.clock], this.timeComponents, this.length) || "");
            break;
        case "date":
            this.template = this._getFormat(this.formats.date, this.dateComponents, this.length);
            break;
        case "time":
            this.template = this._getFormat(this.formats.time[this.clock], this.timeComponents, this.length)
        }
    },
    _massageTemplate: function() {
        var t;
        if (this.clock && this.template) {
            var e = "";
            switch (this.clock) {
            case "24":
                for (t = 0; this.template.length > t; t++) if ("'" == this.template.charAt(t)) {
                    for (e += this.template.charAt(t++); this.template.length > t && "'" !== this.template.charAt(t);) e += this.template.charAt(t++);
                    this.template.length > t && (e += this.template.charAt(t))
                } else e += "K" == this.template.charAt(t) ? "k": "h" == this.template.charAt(t) ? "H": this.template.charAt(t);
                this.template = e;
                break;
            case "12":
                for (t = 0; this.template.length > t; t++) if ("'" == this.template.charAt(t)) {
                    for (e += this.template.charAt(t++); this.template.length > t && "'" !== this.template.charAt(t);) e += this.template.charAt(t++);
                    this.template.length > t && (e += this.template.charAt(t))
                } else e += "k" == this.template.charAt(t) ? "K": "H" == this.template.charAt(t) ? "h": this.template.charAt(t);
                this.template = e
            }
        }
        this.templateArr = this._tokenize(this.template);
        var i;
        "boolean" == typeof this.useNative ? this.useNative && (i = this.locinfo.getNativeDigits(), i && (this.digits = i)) : "native" === this.locinfo.getDigitsStyle() && (i = this.locinfo.getNativeDigits(), i && (this.useNative = !0, this.digits = i))
    },
    _tokenize: function(t) {
        var e, i, n, o = 0,
        s = [];
        if (t) for (; t.length > o;) {
            if (i = t.charAt(o), e = o, "'" === i) {
                for (o++; t.length > o && "'" !== t.charAt(o);) o++;
                t.length > o && o++
            } else if (i >= "a" && "z" >= i || i >= "A" && "Z" >= i) for (n = t.charAt(o); t.length > o && i === n;) i = t.charAt(++o);
            else for (; t.length > o && "'" !== i && ("a" > i || i > "z") && ("A" > i || i > "Z");) i = t.charAt(++o);
            s.push(t.substring(e, o))
        }
        return s
    },
    _getFormat: function(t, e, i) {
        return e !== void 0 && t[e] ? this._getLengthFormat(t[e], i) : void 0
    },
    _getLengthFormat: function(t, e) {
        return "string" == typeof t ? t: t[e] ? t[e] : void 0
    },
    getLocale: function() {
        return this.locale
    },
    getTemplate: function() {
        return this.template
    },
    getType: function() {
        return this.type
    },
    getCalendar: function() {
        return this.cal.getType()
    },
    getLength: function() {
        return ilib.DateFmt.lenmap[this.length] || ""
    },
    getDateComponents: function() {
        return this.dateComponents || ""
    },
    getTimeComponents: function() {
        return this.timeComponents || ""
    },
    getTimeZone: function() {
        return this.tz || (this.tz = new ilib.TimeZone({
            id: ilib.getTimeZone()
        })),
        this.tz
    },
    getClock: function() {
        return this.clock || this.locinfo.getClock()
    },
    _getTemplate: function(t, e) {
        return "gregorian" !== e ? t + "-" + e: t
    },
    getMonthsOfYear: function(t) {
        var e, i, n = t && t.length || this.getLength(),
        o = ilib.DateFmt.monthNameLenMap[n],
        s = [void 0];
        t && (t.date && (e = ilib.Date._dateToIlib(t.date)), t.year && (e = ilib.Date.newInstance({
            year: t.year,
            month: 1,
            day: 1,
            type: this.cal.getType()
        }))),
        e || (e = this.cal.newDateInstance()),
        i = this.cal.getNumMonths(e.getYears());
        for (var a = 1; i >= a; a++) s[a] = "" + this.sysres.getString(this._getTemplate(o + a, this.cal.getType()));
        return s
    },
    getDaysOfWeek: function(t) {
        for (var e = t && t.length || this.getLength(), i = ilib.DateFmt.weekDayLenMap[e], n = [], o = 0; 7 > o; o++) n[o] = "" + this.sysres.getString(this._getTemplate(i + o, this.cal.getType()));
        return n
    },
    toString: function() {
        return this.getTemplate()
    },
    _pad: function(t, e) {
        "string" != typeof t && (t = "" + t);
        var i = 0;
        return "-" === t.charAt(0) && i++,
        t.length >= e + i ? t: t.substring(0, i) + ilib.DateFmt.zeros.substring(0, e - t.length + i) + t.substring(i)
    },
    _formatTemplate: function(t, e) {
        var i, n, o, s, a = "";
        for (i = 0; e.length > i; i++) switch (e[i]) {
        case "d":
            a += t.day || 1;
            break;
        case "dd":
            a += this._pad(t.day || "1", 2);
            break;
        case "yy":
            o = "" + (t.year || 0) % 100,
            a += this._pad(o, 2);
            break;
        case "yyyy":
            a += this._pad(t.year || "0", 4);
            break;
        case "M":
            a += t.month || 1;
            break;
        case "MM":
            a += this._pad(t.month || "1", 2);
            break;
        case "h":
            o = (t.hour || 0) % 12,
            0 == o && (o = "12"),
            a += o;
            break;
        case "hh":
            o = (t.hour || 0) % 12,
            0 == o && (o = "12"),
            a += this._pad(o, 2);
            break;
        case "K":
            o = (t.hour || 0) % 12,
            a += o;
            break;
        case "KK":
            o = (t.hour || 0) % 12,
            a += this._pad(o, 2);
            break;
        case "H":
            a += t.hour || "0";
            break;
        case "HH":
            a += this._pad(t.hour || "0", 2);
            break;
        case "k":
            a += 0 == t.hour ? "24": t.hour;
            break;
        case "kk":
            o = 0 == t.hour ? "24": t.hour,
            a += this._pad(o, 2);
            break;
        case "m":
            a += t.minute || "0";
            break;
        case "mm":
            a += this._pad(t.minute || "0", 2);
            break;
        case "s":
            a += t.minute || "0";
            break;
        case "ss":
            a += this._pad(t.second || "0", 2);
            break;
        case "S":
            a += t.millisecond || "0";
            break;
        case "SSS":
            a += this._pad(t.millisecond || "0", 3);
            break;
        case "N":
        case "NN":
        case "MMM":
        case "MMMM":
            n = e[i] + (t.month || 1),
            a += this.sysres.getString(void 0, n + "-" + this.calName) || this.sysres.getString(void 0, n);
            break;
        case "E":
        case "EE":
        case "EEE":
        case "EEEE":
            n = e[i] + t.getDayOfWeek(),
            a += this.sysres.getString(void 0, n + "-" + this.calName) || this.sysres.getString(void 0, n);
            break;
        case "a":
            n = "chinese" === this.meridiems ? 6 > t.hour ? "azh0": 9 > t.hour ? "azh1": 12 > t.hour ? "azh2": 13 > t.hour ? "azh3": 18 > t.hour ? "azh4": 21 > t.hour ? "azh5": "azh6": 12 > t.hour ? "a0": "a1",
            a += this.sysres.getString(void 0, n + "-" + this.calName) || this.sysres.getString(void 0, n);
            break;
        case "w":
            a += t.getWeekOfYear();
            break;
        case "ww":
            a += this._pad(t.getWeekOfYear(), 2);
            break;
        case "D":
            a += t.getDayOfYear();
            break;
        case "DD":
            a += this._pad(t.getDayOfYear(), 2);
            break;
        case "DDD":
            a += this._pad(t.getDayOfYear(), 3);
            break;
        case "W":
            a += t.getWeekOfMonth(this.locale);
            break;
        case "G":
            n = "G" + t.getEra(),
            a += this.sysres.getString(void 0, n + "-" + this.calName) || this.sysres.getString(void 0, n);
            break;
        case "O":
            o = this.sysres.getString("1#1st|2#2nd|3#3rd|21#21st|22#22nd|23#23rd|31#31st|#{num}th", "ordinalChoice"),
            a += o.formatChoice(t.day, {
                num: t.day
            });
            break;
        case "z":
            s = this.getTimeZone(),
            a += s.getDisplayName(t, "standard");
            break;
        case "Z":
            s = this.getTimeZone(),
            a += s.getDisplayName(t, "rfc822");
            break;
        default:
            a += e[i].replace(/'/g, "")
        }
        return this.digits && (a = ilib.mapString(a, this.digits)),
        a
    },
    format: function(t) {
        var e = this.tz && this.tz.getId() || "local",
        i = ilib.Date._dateToIlib(t, e);
        if (! (i.getCalendar && i instanceof ilib.Date)) throw "Wrong date type passed to ilib.DateFmt.format()";
        var n = i.timezone || "local";
        if (n !== e || i.getCalendar() !== this.calName) {
            var o = ilib.Date.newInstance({
                type: this.calName,
                timezone: e,
                julianday: i.getJulianDay()
            });
            i = o
        }
        return this._formatTemplate(i, this.templateArr)
    },
    formatRelative: function(t, e) {
        t = ilib.Date._dateToIlib(t),
        e = ilib.Date._dateToIlib(e);
        var i, n, o, s, a, r;
        if ("object" != typeof t || !t.getCalendar || t.getCalendar() !== this.calName || "object" != typeof e || !e.getCalendar || e.getCalendar() !== this.calName) throw "Wrong calendar type";
        if (i = t.getRataDie(), n = e.getRataDie(), i > n ? (a = i - n, o = this.sysres.getString("{duration} ago")) : (a = n - i, o = this.sysres.getString("in {duration}")), 694444e-9 > a) switch (r = Math.round(86400 * a), this.length) {
        case "s":
            s = this.sysres.getString("#{num}s");
            break;
        case "m":
            s = this.sysres.getString("1#1 se|#{num} sec");
            break;
        case "l":
            s = this.sysres.getString("1#1 sec|#{num} sec");
            break;
        default:
        case "f":
            s = this.sysres.getString("1#1 second|#{num} seconds")
        } else if (.041666667 > a) switch (r = Math.round(1440 * a), this.length) {
        case "s":
            s = this.sysres.getString("#{num}m", "durationShortMinutes");
            break;
        case "m":
            s = this.sysres.getString("1#1 mi|#{num} min");
            break;
        case "l":
            s = this.sysres.getString("1#1 min|#{num} min");
            break;
        default:
        case "f":
            s = this.sysres.getString("1#1 minute|#{num} minutes")
        } else if (1 > a) switch (r = Math.round(24 * a), this.length) {
        case "s":
            s = this.sysres.getString("#{num}h");
            break;
        case "m":
            s = this.sysres.getString("1#1 hr|#{num} hrs", "durationMediumHours");
            break;
        case "l":
            s = this.sysres.getString("1#1 hr|#{num} hrs");
            break;
        default:
        case "f":
            s = this.sysres.getString("1#1 hour|#{num} hours")
        } else if (14 > a) switch (r = Math.round(a), this.length) {
        case "s":
            s = this.sysres.getString("#{num}d");
            break;
        case "m":
            s = this.sysres.getString("1#1 dy|#{num} dys");
            break;
        case "l":
            s = this.sysres.getString("1#1 day|#{num} days", "durationLongDays");
            break;
        default:
        case "f":
            s = this.sysres.getString("1#1 day|#{num} days")
        } else if (84 > a) switch (r = Math.round(a / 7), this.length) {
        case "s":
            s = this.sysres.getString("#{num}w");
            break;
        case "m":
            s = this.sysres.getString("1#1 wk|#{num} wks", "durationMediumWeeks");
            break;
        case "l":
            s = this.sysres.getString("1#1 wk|#{num} wks");
            break;
        default:
        case "f":
            s = this.sysres.getString("1#1 week|#{num} weeks")
        } else if (730 > a) switch (r = Math.round(a / 30.4), this.length) {
        case "s":
            s = this.sysres.getString("#{num}m", "durationShortMonths");
            break;
        case "m":
            s = this.sysres.getString("1#1 mo|#{num} mos");
            break;
        case "l":
            s = this.sysres.getString("1#1 mon|#{num} mons");
            break;
        default:
        case "f":
            s = this.sysres.getString("1#1 month|#{num} months")
        } else switch (r = Math.round(a / 365), this.length) {
        case "s":
            s = this.sysres.getString("#{num}y");
            break;
        case "m":
            s = this.sysres.getString("1#1 yr|#{num} yrs", "durationMediumYears");
            break;
        case "l":
            s = this.sysres.getString("1#1 yr|#{num} yrs");
            break;
        default:
        case "f":
            s = this.sysres.getString("1#1 year|#{num} years")
        }
        return o.format({
            duration: s.formatChoice(r, {
                num: r
            })
        })
    }
},
ilib.DateRngFmt = function(t) {
    var e = !0,
    i = void 0;
    this.locale = new ilib.Locale,
    this.length = "s",
    t && (t.locale && (this.locale = "string" == typeof t.locale ? new ilib.Locale(t.locale) : t.locale), t.calendar && (this.calName = t.calendar), t.length && ("short" === t.length || "medium" === t.length || "long" === t.length || "full" === t.length) && (this.length = t.length.charAt(0)), t.sync !== void 0 && (e = 1 == t.sync), i = t.loadParams);
    var n = {};
    ilib.shallowCopy(t, n),
    n.sync = e,
    n.loadParams = i,
    n.onLoad = ilib.bind(this,
    function(e) {
        this.dateFmt = e,
        e && (this.locinfo = this.dateFmt.locinfo, this.calName = this.calName || this.locinfo.getCalendar() || "gregorian", this.cal = ilib.Cal.newInstance({
            type: this.calName
        }), this.cal || (this.cal = new ilib.Cal.Gregorian), this.timeTemplate = this.dateFmt._getFormat(this.dateFmt.formats.time[this.dateFmt.clock], this.dateFmt.timeComponents, this.length) || "hh:mm", this.timeTemplateArr = this.dateFmt._tokenize(this.timeTemplate), t && "function" == typeof t.onLoad && t.onLoad(this))
    }),
    new ilib.DateFmt(n)
},
ilib.DateRngFmt.prototype = {
    getLocale: function() {
        return this.locale
    },
    getCalendar: function() {
        return this.dateFmt.getCalendar()
    },
    getLength: function() {
        return ilib.DateFmt.lenmap[this.length] || ""
    },
    getTimeZone: function() {
        return this.dateFmt.getTimeZone()
    },
    getClock: function() {
        return this.dateFmt.getClock()
    },
    format: function(t, e) {
        var i, n, o, s, a, r = "";
        if ("object" != typeof t || !t.getCalendar || t.getCalendar() !== this.calName || "object" != typeof e || !e.getCalendar || e.getCalendar() !== this.calName) throw "Wrong calendar type";
        return i = t.getRataDie(),
        n = e.getRataDie(),
        r = 3 > n - i ? t.year === e.year ? t.month === e.month ? t.day === e.day ? new ilib.String(this.dateFmt._getFormat(this.dateFmt.formats.range, "c00", this.length)) : new ilib.String(this.dateFmt._getFormat(this.dateFmt.formats.range, "c01", this.length)) : new ilib.String(this.dateFmt._getFormat(this.dateFmt.formats.range, "c02", this.length)) : new ilib.String(this.dateFmt._getFormat(this.dateFmt.formats.range, "c03", this.length)) : 730 > n - i ? t.year === e.year ? t.month === e.month ? new ilib.String(this.dateFmt._getFormat(this.dateFmt.formats.range, "c10", this.length)) : new ilib.String(this.dateFmt._getFormat(this.dateFmt.formats.range, "c11", this.length)) : new ilib.String(this.dateFmt._getFormat(this.dateFmt.formats.range, "c12", this.length)) : 3650 > n - i ? new ilib.String(this.dateFmt._getFormat(this.dateFmt.formats.range, "c20", this.length)) : new ilib.String(this.dateFmt._getFormat(this.dateFmt.formats.range, "c30", this.length)),
        o = this.dateFmt._tokenize(this.dateFmt._getFormat(this.dateFmt.formats.date, "y", this.length) || "yyyy"),
        s = this.dateFmt._tokenize(this.dateFmt._getFormat(this.dateFmt.formats.date, "m", this.length) || "MM"),
        a = this.dateFmt._tokenize(this.dateFmt._getFormat(this.dateFmt.formats.date, "d", this.length) || "dd"),
        r.format({
            sy: this.dateFmt._formatTemplate(t, o),
            sm: this.dateFmt._formatTemplate(t, s),
            sd: this.dateFmt._formatTemplate(t, a),
            st: this.dateFmt._formatTemplate(t, this.timeTemplateArr),
            ey: this.dateFmt._formatTemplate(e, o),
            em: this.dateFmt._formatTemplate(e, s),
            ed: this.dateFmt._formatTemplate(e, a),
            et: this.dateFmt._formatTemplate(e, this.timeTemplateArr)
        })
    }
},
ilib.bsearch = function(t, e, i) {
    if (e === void 0 || !e || t === void 0) return - 1;
    for (var n, o = e.length - 1,
    s = 0,
    a = 0,
    r = i || ilib.bsearch.numbers; o >= s;) if (a = Math.floor((o + s) / 2), n = r(e[a], t), n > 0) o = a - 1;
    else {
        if (! (0 > n)) return a;
        s = a + 1
    }
    return s
},
ilib.bsearch.numbers = function(t, e) {
    return t - e
},
ilib.bisectionSearch = function(t, e, i, n, o) {
    if ("number" != typeof t || "number" != typeof e || "number" != typeof i || "function" != typeof o) return 0 / 0;
    var s, a = 0,
    r = n > 0 ? n: 1e-13;
    do a = (i + e) / 2,
    s = o(a),
    s > t ? i = a: t > s && (e = a);
    while (i - e > r);
    return a
},
ilib.Date.GregDate = function(t) {
    if (this.cal = new ilib.Cal.Gregorian, this.timezone = "local", t) {
        if (t.locale) {
            this.locale = "string" == typeof t.locale ? new ilib.Locale(t.locale) : t.locale;
            var e = new ilib.LocaleInfo(this.locale);
            this.timezone = e.getTimeZone()
        }
        if (t.timezone && (this.timezone = "" + t.timezone), t.year || t.month || t.day || t.hour || t.minute || t.second || t.millisecond) {
            if (this.year = parseInt(t.year, 10) || 0, this.month = parseInt(t.month, 10) || 1, this.day = parseInt(t.day, 10) || 1, this.hour = parseInt(t.hour, 10) || 0, this.minute = parseInt(t.minute, 10) || 0, this.second = parseInt(t.second, 10) || 0, this.millisecond = parseInt(t.millisecond, 10) || 0, "boolean" == typeof t.dst && (this.dst = t.dst), this.rd = this.newRd(t), this.offset = 0, "local" === this.timezone && t.dst === void 0) {
                var i = new Date(this.year, this.month - 1, this.day, this.hour, this.minute, this.second, this.millisecond);
                this.offset = -i.getTimezoneOffset() / 1440
            } else this.tz || (this.tz = new ilib.TimeZone({
                id: this.timezone
            })),
            this.offset = this.tz._getOffsetMillisWallTime(this) / 864e5;
            0 !== this.offset && (this.rd = this.newRd({
                rd: this.rd.getRataDie() - this.offset
            }))
        }
    }
    this.rd || (this.rd = this.newRd(t), this._calcDateComponents())
},
ilib.Date.GregDate.prototype = new ilib.Date({
    noinstance: !0
}),
ilib.Date.GregDate.prototype.parent = ilib.Date,
ilib.Date.GregDate.prototype.constructor = ilib.Date.GregDate,
ilib.Date.GregDate.prototype.newRd = function(t) {
    return new ilib.Date.GregRataDie(t)
},
ilib.Date.GregDate._calcYear = function(t) {
    var e, i, n, o, s, a, r, h;
    return o = Math.floor((t - 1) / 146097),
    e = ilib.mod(t - 1, 146097),
    s = Math.floor(e / 36524),
    i = ilib.mod(e, 36524),
    a = Math.floor(i / 1461),
    n = ilib.mod(i, 1461),
    r = Math.floor(n / 365),
    h = 400 * o + 100 * s + 4 * a + r,
    4 !== s && 4 !== r && h++,
    h
},
ilib.Date.GregDate.prototype._calcYear = function(t) {
    return ilib.Date.GregDate._calcYear(t)
},
ilib.Date.GregDate.prototype._calcDateComponents = function() {
    if ("local" === this.timezone && this.rd.getRataDie() >= 719163 && 744018.134803241 >= this.rd.getRataDie()) {
        var t = new Date(this.rd.getTime());
        this.year = t.getFullYear(),
        this.month = t.getMonth() + 1,
        this.day = t.getDate(),
        this.hour = t.getHours(),
        this.minute = t.getMinutes(),
        this.second = t.getSeconds(),
        this.millisecond = t.getMilliseconds(),
        this.offset = -t.getTimezoneOffset() / 1440
    } else {
        this.offset === void 0 && (this.year = this._calcYear(this.rd.getRataDie()), this.tz || (this.tz = new ilib.TimeZone({
            id: this.timezone
        })), this.offset = this.tz.getOffsetMillis(this) / 864e5);
        var e = this.rd.getRataDie();
        0 !== this.offset && (e += this.offset),
        this.year = this._calcYear(e);
        var i = this.newRd({
            year: this.year,
            month: 1,
            day: 1,
            cal: this.cal
        }),
        n = e - i.getRataDie() + 1,
        o = ilib.Cal.Gregorian.prototype.isLeapYear.call(this.cal, this.year) ? ilib.Date.GregRataDie.cumMonthLengthsLeap: ilib.Date.GregRataDie.cumMonthLengths;
        this.month = ilib.bsearch(Math.floor(n), o),
        n -= o[this.month - 1],
        this.day = Math.floor(n),
        n -= this.day,
        n = Math.round(864e5 * n),
        this.hour = Math.floor(n / 36e5),
        n -= 36e5 * this.hour,
        this.minute = Math.floor(n / 6e4),
        n -= 6e4 * this.minute,
        this.second = Math.floor(n / 1e3),
        n -= 1e3 * this.second,
        this.millisecond = Math.floor(n)
    }
},
ilib.Date.GregDate.prototype.getDayOfWeek = function() {
    var t = Math.floor(this.rd.getRataDie() + (this.offset || 0));
    return ilib.mod(t, 7)
},
ilib.Date.GregDate.prototype.getDayOfYear = function() {
    var t = this.cal.isLeapYear(this.year) ? ilib.Date.GregRataDie.cumMonthLengthsLeap: ilib.Date.GregRataDie.cumMonthLengths;
    return t[this.month - 1] + this.day
},
ilib.Date.GregDate.prototype.getEra = function() {
    return 1 > this.year ? -1 : 1
},
ilib.Date.GregDate.prototype.getCalendar = function() {
    return "gregorian"
},
ilib.Date._constructors.gregorian = ilib.Date.GregDate,
ilib.Cal.ThaiSolar = function() {
    this.type = "thaisolar"
},
ilib.Cal.ThaiSolar.prototype = new ilib.Cal.Gregorian,
ilib.Cal.ThaiSolar.prototype.parent = ilib.Cal.Gregorian,
ilib.Cal.ThaiSolar.prototype.constructor = ilib.Cal.ThaiSolar,
ilib.Cal.ThaiSolar.prototype.isLeapYear = function(t) {
    var e = "number" == typeof t ? t: t.getYears();
    e -= 543;
    var i = ilib.mod(e, 400);
    return 0 === ilib.mod(e, 4) && 100 !== i && 200 !== i && 300 !== i
},
ilib.Cal.ThaiSolar.prototype.newDateInstance = function(t) {
    return new ilib.Date.ThaiSolarDate(t)
},
ilib.Cal._constructors.thaisolar = ilib.Cal.ThaiSolar,
ilib.Date.ThaiSolarDate = function(t) {
    var e = t;
    t && (e = {},
    ilib.shallowCopy(t, e), e.year !== void 0 && (e.year -= 543), e.rd !== void 0 && (e.rd -= 198327)),
    this.rd = void 0,
    this.offset = void 0,
    ilib.Date.GregDate.call(this, e),
    this.cal = new ilib.Cal.ThaiSolar,
    t && t.year !== void 0 && (this.year = parseInt(t.year, 10))
},
ilib.Date.ThaiSolarDate.prototype = new ilib.Date.GregDate,
ilib.Date.ThaiSolarDate.prototype.parent = ilib.Date.GregDate.prototype,
ilib.Date.ThaiSolarDate.prototype.constructor = ilib.Date.ThaiSolarDate,
ilib.Date.ThaiSolarDate.epoch = 1523097.5,
ilib.Date.ThaiSolarDate.prototype._calcDateComponents = function() {
    this.parent._calcDateComponents.call(this),
    this.year += 543
},
ilib.Date.ThaiSolarDate.prototype.getRataDie = function() {
    return this.rd.getRataDie() + 198327
},
ilib.Date.ThaiSolarDate.prototype.before = function(t) {
    return this.cal.newDateInstance({
        rd: this.rd.before(t, this.offset) + 198327,
        timezone: this.timezone
    })
},
ilib.Date.ThaiSolarDate.prototype.after = function(t) {
    return this.cal.newDateInstance({
        rd: this.rd.after(t, this.offset) + 198327,
        timezone: this.timezone
    })
},
ilib.Date.ThaiSolarDate.prototype.onOrBefore = function(t) {
    return this.cal.newDateInstance({
        rd: this.rd.onOrBefore(t, this.offset) + 198327,
        timezone: this.timezone
    })
},
ilib.Date.ThaiSolarDate.prototype.onOrAfter = function(t) {
    return this.cal.newDateInstance({
        rd: this.rd.onOrAfter(t, this.offset) + 198327,
        timezone: this.timezone
    })
},
ilib.Date.ThaiSolarDate.prototype.getCalendar = function() {
    return "thaisolar"
},
ilib.Date._constructors.thaisolar = ilib.Date.ThaiSolarDate,
ilib.Date.initAstro = function(t, e, i) {
    ilib.data.astro ? i && "function" == typeof i && i(ilib.data.astro) : ilib.loadData({
        name: "astro.json",
        locale: "-",
        nonLocale: !0,
        sync: t,
        loadParams: e,
        callback: ilib.bind(this,
        function(t) {
            ilib.data.astro = t,
            i && "function" == typeof i && i(t)
        })
    })
},
ilib.Date._dtr = function(t) {
    return t * Math.PI / 180
},
ilib.Date._rtd = function(t) {
    return 180 * t / Math.PI
},
ilib.Date._dcos = function(t) {
    return Math.cos(ilib.Date._dtr(t))
},
ilib.Date._dsin = function(t) {
    return Math.sin(ilib.Date._dtr(t))
},
ilib.Date._dtan = function(t) {
    return Math.tan(ilib.Date._dtr(t))
},
ilib.Date._fixangle = function(t) {
    return t - 360 * Math.floor(t / 360)
},
ilib.Date._fixangr = function(t) {
    return t - 2 * Math.PI * Math.floor(t / (2 * Math.PI))
},
ilib.Date._equinox = function(t, e) {
    var i, n, o, s, a, r, h, l, c, d;
    for (1e3 > t ? (r = ilib.data.astro._JDE0tab1000, d = t / 1e3) : (r = ilib.data.astro._JDE0tab2000, d = (t - 2e3) / 1e3), s = r[e][0] + r[e][1] * d + r[e][2] * d * d + r[e][3] * d * d * d + r[e][4] * d * d * d * d, l = (s - 2451545) / 36525, c = 35999.373 * l - 2.47, i = 1 + .0334 * ilib.Date._dcos(c) + 7e-4 * ilib.Date._dcos(2 * c), h = 0, o = 0, n = 0; 24 > n; n++) h += ilib.data.astro._EquinoxpTerms[o] * ilib.Date._dcos(ilib.data.astro._EquinoxpTerms[o + 1] + ilib.data.astro._EquinoxpTerms[o + 2] * l),
    o += 3;
    return a = s + 1e-5 * h / i
},
ilib.Date._deltat = function(t) {
    var e, i, n, o;
    return t >= 1620 && 2014 >= t ? (n = Math.floor(t - 1620), i = t - 1620 - n, e = ilib.data.astro._deltaTtab[n] + (ilib.data.astro._deltaTtab[n + 1] - ilib.data.astro._deltaTtab[n]) * i) : (o = (t - 2e3) / 100, 948 > t ? e = 2177 + 497 * o + 44.1 * o * o: (e = 102 + 102 * o + 25.3 * o * o, t > 2e3 && 2100 > t && (e += .37 * (t - 2100)))),
    e
},
ilib.Date._obliqeq = function(t) {
    var e, i, n, o;
    if (n = i = (t - 2451545) / 3652500, e = 23.43929111111111, 1 > Math.abs(i)) for (o = 0; 10 > o; o++) e += ilib.data.astro._oterms[o] / 3600 * n,
    n *= i;
    return e
},
ilib.Date._sunpos = function(t) {
    var e, i, n, o, s, a, r = {};
    return e = (t - 2451545) / 36525,
    i = e * e,
    n = e * i,
    r.meanLongitude = ilib.Date._fixangle(280.46646 + 36000.76983 * e + 3032e-7 * i),
    r.meanAnomaly = ilib.Date._fixangle(357.52911 + 35999.05029 * e - 1537e-7 * i - 4.8e-7 * n),
    r.eccentricity = .016708634 - 42037e-9 * e - 1.267e-7 * i,
    r.equationOfCenter = (1.914602 - .004817 * e - 14e-6 * i) * ilib.Date._dsin(r.meanAnomaly) + (.019993 - 101e-6 * e) * ilib.Date._dsin(2 * r.meanAnomaly) + 289e-6 * ilib.Date._dsin(3 * r.meanAnomaly),
    r.sunLongitude = r.meanLongitude + r.equationOfCenter,
    o = 125.04 - 1934.136 * e,
    r.apparentLong = r.sunLongitude + -.00569 + -.00478 * ilib.Date._dsin(o),
    a = ilib.Date._obliqeq(t),
    s = a + .00256 * ilib.Date._dcos(o),
    r.inclination = ilib.Date._fixangle(23.4392911 - .013004167 * e - 1.6389e-7 * i + 5.036e-7 * n),
    r.apparentRightAscension = ilib.Date._fixangle(ilib.Date._rtd(Math.atan2(ilib.Date._dcos(s) * ilib.Date._dsin(r.apparentLong), ilib.Date._dcos(r.apparentLong)))),
    r
},
ilib.Date._nutation = function(t) {
    var e, i, n, o, s, a, r = (t - 2451545) / 36525,
    h = [],
    l = 0,
    c = 0,
    d = {};
    for (o = r * (n = r * r), h[0] = ilib.Date._dtr(297.850363 + 445267.11148 * r - .0019142 * n + o / 189474), h[1] = ilib.Date._dtr(357.52772 + 35999.05034 * r - 1603e-7 * n - o / 3e5), h[2] = ilib.Date._dtr(134.96298 + 477198.867398 * r + .0086972 * n + o / 56250), h[3] = ilib.Date._dtr(93.27191 + 483202.017538 * r - .0036825 * n + o / 327270), h[4] = ilib.Date._dtr(125.04452 - 1934.136261 * r + .0020708 * n + o / 45e4), e = 0; 5 > e; e++) h[e] = ilib.Date._fixangr(h[e]);
    for (s = r / 10, e = 0; 63 > e; e++) {
        for (a = 0, i = 0; 5 > i; i++) 0 != ilib.data.astro._nutArgMult[5 * e + i] && (a += ilib.data.astro._nutArgMult[5 * e + i] * h[i]);
        l += (ilib.data.astro._nutArgCoeff[4 * e + 0] + ilib.data.astro._nutArgCoeff[4 * e + 1] * s) * Math.sin(a),
        c += (ilib.data.astro._nutArgCoeff[4 * e + 2] + ilib.data.astro._nutArgCoeff[4 * e + 3] * s) * Math.cos(a)
    }
    return d.deltaPsi = l / 36e6,
    d.deltaEpsilon = c / 36e6,
    d
},
ilib.Date._equationOfTime = function(t) {
    var e, i, n, o, s, a, r;
    a = (t - 2451545) / 365250,
    s = 280.4664567 + 360007.6982779 * a + .03032028 * a * a + a * a * a / 49931 + -(a * a * a * a / 15300) + -(a * a * a * a * a / 2e6),
    s = ilib.Date._fixangle(s),
    r = ilib.Date._sunpos(t),
    e = r.apparentRightAscension;
    var h = ilib.Date._nutation(t);
    return i = h.deltaPsi,
    o = ilib.Date._obliqeq(t) + h.deltaEpsilon,
    n = s - .0057183 - e + i * ilib.Date._dcos(o),
    n > 180 && (n -= 360),
    n = 4 * n,
    n /= 1440
},
ilib.Date._poly = function(t, e) {
    for (var i = e[0], n = t, o = 1; e.length > o; o++) i += e[o] * n,
    n *= t;
    return i
},
ilib.Date._universalFromLocal = function(t, e) {
    return t - e / 1440
},
ilib.Date._localFromUniversal = function(t, e) {
    return t + e / 1440
},
ilib.Date._aberration = function(t) {
    return 974e-7 * ilib.Date._dcos(177.63 + 35999.01847999999 * t) - .005575
},
ilib.Date._nutation2 = function(t) {
    var e = ilib.Date._poly(t, ilib.data.astro._nutCoeffA),
    i = ilib.Date._poly(t, ilib.data.astro._nutCoeffB);
    return - .004778 * ilib.Date._dsin(e) - 3667e-7 * ilib.Date._dsin(i)
},
ilib.Date._ephemerisCorrection = function(t) {
    var e = ilib.Date.GregDate._calcYear(t - 1721424.5);
    if (e >= 1988 && 2019 >= e) return (e - 1933) / 86400;
    if (e >= 1800 && 1987 >= e) {
        var i = new ilib.Date.GregRataDie({
            year: e,
            month: 7,
            day: 1,
            hour: 0,
            minute: 0,
            second: 0
        }),
        n = (i.getRataDie() - 693596) / 36525;
        return ilib.Date._poly(n, e >= 1900 ? ilib.data.astro._coeff19th: ilib.data.astro._coeff18th)
    }
    if (e >= 1620 && 1799 >= e) return e -= 1600,
    (196.58333 - 4.0675 * e + .0219167 * e * e) / 86400;
    var o = new ilib.Date.GregRataDie({
        year: e,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0
    }),
    s = .5 + (o.getRataDie() - 660724);
    return (s * s / 41048480 - 15) / 86400
},
ilib.Date._ephemerisFromUniversal = function(t) {
    return t + ilib.Date._ephemerisCorrection(t)
},
ilib.Date._universalFromEphemeris = function(t) {
    return t - ilib.Date._ephemerisCorrection(t)
},
ilib.Date._julianCenturies = function(t) {
    return (ilib.Date._ephemerisFromUniversal(t) - 2451545) / 36525
},
ilib.Date._solarLongitude = function(t) {
    for (var e = ilib.Date._julianCenturies(t), i = 0, n = ilib.data.astro._solarLongCoeff.length, o = 0; n > o; o++) i += ilib.data.astro._solarLongCoeff[o] * ilib.Date._dsin(ilib.data.astro._solarLongAddends[o] + ilib.data.astro._solarLongMultipliers[o] * e);
    return i *= 5729577951308232e-21,
    i += 282.7771834 + 36000.76953744 * e,
    i += ilib.Date._aberration(e) + ilib.Date._nutation2(e),
    ilib.Date._fixangle(i)
},
ilib.Date._lunarLongitude = function(t) {
    for (var e = ilib.Date._julianCenturies(t), i = ilib.Date._fixangle(ilib.Date._poly(e, ilib.data.astro._meanMoonCoeff)), n = ilib.Date._fixangle(ilib.Date._poly(e, ilib.data.astro._elongationCoeff)), o = ilib.Date._fixangle(ilib.Date._poly(e, ilib.data.astro._solarAnomalyCoeff)), s = ilib.Date._fixangle(ilib.Date._poly(e, ilib.data.astro._lunarAnomalyCoeff)), a = ilib.Date._fixangle(ilib.Date._poly(e, ilib.data.astro._moonFromNodeCoeff)), r = ilib.Date._poly(e, ilib.data.astro._eCoeff), h = 0, l = 0; ilib.data.astro._lunarElongationLongCoeff.length > l; l++) {
        var c = ilib.data.astro._solarAnomalyLongCoeff[l];
        h += ilib.data.astro._sineCoeff[l] * Math.pow(r, Math.abs(c)) * ilib.Date._dsin(ilib.data.astro._lunarElongationLongCoeff[l] * n + c * o + ilib.data.astro._lunarAnomalyLongCoeff[l] * s + ilib.data.astro._moonFromNodeLongCoeff[l] * a)
    }
    var d = h / 1e6,
    u = .003958 * ilib.Date._dsin(119.75 + 131.849 * e),
    g = 318e-6 * ilib.Date._dsin(53.09 + 479264.29 * e),
    f = .001962 * ilib.Date._dsin(i - a);
    return ilib.Date._fixangle(i + d + u + g + f + ilib.Date._nutation2(e))
},
ilib.Date._newMoonTime = function(t) {
    for (var e = t - 24724,
    i = e / 1236.85,
    n = ilib.Date._poly(i, ilib.data.astro._nmApproxCoeff), o = ilib.Date._poly(i, ilib.data.astro._nmCapECoeff), s = ilib.Date._poly(i, ilib.data.astro._nmSolarAnomalyCoeff), a = ilib.Date._poly(i, ilib.data.astro._nmLunarAnomalyCoeff), r = ilib.Date._poly(i, ilib.data.astro._nmMoonArgumentCoeff), h = ilib.Date._poly(i, ilib.data.astro._nmCapOmegaCoeff), l = -17e-5 * ilib.Date._dsin(h), c = 0; ilib.data.astro._nmSineCoeff.length > c; c++) l += ilib.data.astro._nmSineCoeff[c] * Math.pow(o, ilib.data.astro._nmEFactor[c]) * ilib.Date._dsin(ilib.data.astro._nmSolarCoeff[c] * s + ilib.data.astro._nmLunarCoeff[c] * a + ilib.data.astro._nmMoonCoeff[c] * r);
    for (var d = 0,
    c = 0; ilib.data.astro._nmAddConst.length > c; c++) d += ilib.data.astro._nmAddFactor[c] * ilib.Date._dsin(ilib.data.astro._nmAddConst[c] + ilib.data.astro._nmAddCoeff[c] * e);
    var u = 325e-6 * ilib.Date._dsin(ilib.Date._poly(i, ilib.data.astro._nmExtra));
    return ilib.Date._universalFromEphemeris(n + l + u + d + ilib.Date.RataDie.gregorianEpoch)
},
ilib.Date._lunarSolarAngle = function(t) {
    var e = ilib.Date._lunarLongitude(t),
    i = ilib.Date._solarLongitude(t);
    return ilib.Date._fixangle(e - i)
},
ilib.Date._newMoonBefore = function(t) {
    var e, i, n = ilib.Date._lunarSolarAngle(t),
    o = Math.round((t - 11.450086114414322 - ilib.Date.RataDie.gregorianEpoch) / 29.530588853 - n / 360) - 1;
    for (e = i = ilib.Date._newMoonTime(o); t > e;) o++,
    i = e,
    e = ilib.Date._newMoonTime(o);
    return i
},
ilib.Date._newMoonAtOrAfter = function(t) {
    for (var e, i = ilib.Date._lunarSolarAngle(t), n = Math.round((t - 11.450086114414322 - ilib.Date.RataDie.gregorianEpoch) / 29.530588853 - i / 360); t > (e = ilib.Date._newMoonTime(n));) n++;
    return e
},
ilib.Date._nextSolarLongitude = function(t, e) {
    var i = 365.242189 / 360,
    n = t + i * ilib.Date._fixangle(e - ilib.Date._solarLongitude(t)),
    o = Math.max(t, n - 5),
    s = n + 5;
    return ilib.bisectionSearch(0, o, s, 1e-6,
    function(t) {
        return 180 - ilib.Date._fixangle(ilib.Date._solarLongitude(t) - e)
    })
},
ilib.Date._floorToJD = function(t) {
    return Math.floor(t - .5) + .5
},
ilib.Date._ceilToJD = function(t) {
    return Math.ceil(t + .5) - .5
},
ilib.Date.PersAstroRataDie = function(t) {
    this.rd = void 0,
    ilib.Date.initAstro(t && "boolean" == typeof t.sync ? t.sync: !0, t && t.loadParams, ilib.bind(this,
    function() {
        ilib.Date.RataDie.call(this, t),
        t && "function" == typeof t.callback && t.callback(this)
    }))
},
ilib.Date.PersAstroRataDie.prototype = new ilib.Date.RataDie,
ilib.Date.PersAstroRataDie.prototype.parent = ilib.Date.RataDie,
ilib.Date.PersAstroRataDie.prototype.constructor = ilib.Date.PersAstroRataDie,
ilib.Date.PersAstroRataDie.prototype.epoch = 1948319.5,
ilib.Date.PersAstroRataDie.prototype._tehranEquinox = function(t) {
    var e, i, n, o, s, a;
    return e = ilib.Date._equinox(t, 0),
    i = e - ilib.Date._deltat(t) / 86400,
    a = 360 * ilib.Date._equationOfTime(e),
    a = (a - 20 * Math.floor(a / 20)) / 360,
    n = i + a,
    s = 52.5 / 360,
    o = n + s
},
ilib.Date.PersAstroRataDie.prototype._getYear = function(t) {
    var e, i = new ilib.Date.GregDate({
        julianday: t
    }),
    n = i.getYears() - 2,
    o = {};
    for (o.equinox = this._tehranEquinox(n); o.equinox > t;) n--,
    o.equinox = this._tehranEquinox(n);
    for (e = o.equinox - 1; ! (t >= Math.floor(o.equinox) + .5 && Math.floor(e) + .5 > t);) o.equinox = e,
    n++,
    e = this._tehranEquinox(n);
    return o.year = Math.round((o.equinox - this.epoch - 1) / 365.24219878) + 1,
    o
},
ilib.Date.PersAstroRataDie.prototype._setDateComponents = function(t) {
    var e, i, n;
    for (i = this.epoch + 1 + 365.24219878 * (t.year - 2), e = {
        year: t.year - 1,
        equinox: 0
    }; e.year < t.year;) e = this._getYear(i),
    i = e.equinox + 367.24219878;
    n = Math.floor(e.equinox) + (7 >= t.month ? 31 * (t.month - 1) : 30 * (t.month - 1) + 6) + (t.day - 1 + .5),
    n += (36e5 * t.hour + 6e4 * t.minute + 1e3 * t.second + t.millisecond) / 864e5,
    this.rd = n - this.epoch
},
ilib.Date.PersAstroRataDie.prototype._onOrBefore = function(t, e) {
    return t - ilib.mod(Math.floor(t) - e - 3, 7)
},
ilib.Cal.Persian = function() {
    this.type = "persian"
},
ilib.Cal.Persian.monthLengths = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
ilib.Cal.Persian.prototype.getNumMonths = function() {
    return 12
},
ilib.Cal.Persian.prototype.getMonLength = function(t, e) {
    return 12 === t && this.isLeapYear(e) ? 30 : ilib.Cal.Persian.monthLengths[t - 1]
},
ilib.Cal.Persian.prototype.isLeapYear = function(t) {
    var e = new ilib.Date.PersAstroRataDie({
        cal: this,
        year: t + 1,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    }),
    i = new ilib.Date.PersAstroRataDie({
        cal: this,
        year: t,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    });
    return e.getRataDie() - i.getRataDie() > 365
},
ilib.Cal.Persian.prototype.getType = function() {
    return this.type
},
ilib.Cal.Persian.prototype.newDateInstance = function(t) {
    return new ilib.Date.PersDate(t)
},
ilib.Cal._constructors.persian = ilib.Cal.Persian,
ilib.Date.PersDate = function(t) {
    if (this.cal = new ilib.Cal.Persian, this.timezone = "local", t) {
        if (t.locale) {
            this.locale = "string" == typeof t.locale ? new ilib.Locale(t.locale) : t.locale;
            var e = new ilib.LocaleInfo(this.locale);
            this.timezone = e.getTimeZone()
        }
        t.timezone && (this.timezone = t.timezone)
    }
    ilib.Date.initAstro(t && "boolean" == typeof t.sync ? t.sync: !0, t && t.loadParams, ilib.bind(this,
    function() {
        t && (t.year || t.month || t.day || t.hour || t.minute || t.second || t.millisecond) && (this.year = parseInt(t.year, 10) || 0, this.month = parseInt(t.month, 10) || 1, this.day = parseInt(t.day, 10) || 1, this.hour = parseInt(t.hour, 10) || 0, this.minute = parseInt(t.minute, 10) || 0, this.second = parseInt(t.second, 10) || 0, this.millisecond = parseInt(t.millisecond, 10) || 0, this.dayOfYear = parseInt(t.dayOfYear, 10), "boolean" == typeof t.dst && (this.dst = t.dst), this.rd = this.newRd(this), this.tz || (this.tz = new ilib.TimeZone({
            id: this.timezone
        })), this.offset = this.tz._getOffsetMillisWallTime(this) / 864e5, 0 !== this.offset && (this.rd = this.newRd({
            rd: this.rd.getRataDie() - this.offset
        }))),
        this.rd || (this.rd = this.newRd(t), this._calcDateComponents()),
        t && "function" == typeof t.onLoad && t.onLoad(this)
    }))
},
ilib.Date.PersDate.prototype = new ilib.Date({
    noinstance: !0
}),
ilib.Date.PersDate.prototype.parent = ilib.Date,
ilib.Date.PersDate.prototype.constructor = ilib.Date.PersDate,
ilib.Date.PersDate.cumMonthLengths = [0, 31, 62, 93, 124, 155, 186, 216, 246, 276, 306, 336, 366],
ilib.Date.PersDate.prototype.newRd = function(t) {
    return new ilib.Date.PersAstroRataDie(t)
},
ilib.Date.PersDate.prototype._calcYear = function(t) {
    var e = t + this.rd.epoch;
    return this.rd._getYear(e).year
},
ilib.Date.PersDate.prototype._calcDateComponents = function() {
    var t, e = this.rd.getRataDie();
    this.year = this._calcYear(e),
    this.offset === void 0 && (this.tz || (this.tz = new ilib.TimeZone({
        id: this.timezone
    })), this.offset = this.tz.getOffsetMillis(this) / 864e5),
    0 !== this.offset && (e += this.offset, this.year = this._calcYear(e));
    var i = this.newRd({
        year: this.year,
        month: 1,
        day: 1,
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
    });
    t = e - i.getRataDie() + 1,
    this.dayOfYear = t,
    this.month = ilib.bsearch(Math.floor(t), ilib.Date.PersDate.cumMonthLengths),
    t -= ilib.Date.PersDate.cumMonthLengths[this.month - 1],
    this.day = Math.floor(t),
    t -= this.day,
    t = Math.round(864e5 * t),
    this.hour = Math.floor(t / 36e5),
    t -= 36e5 * this.hour,
    this.minute = Math.floor(t / 6e4),
    t -= 6e4 * this.minute,
    this.second = Math.floor(t / 1e3),
    t -= 1e3 * this.second,
    this.millisecond = t
},
ilib.Date.PersDate.prototype.getDayOfWeek = function() {
    var t = Math.floor(this.getRataDie());
    return ilib.mod(t - 3, 7)
},
ilib.Date.PersDate.prototype.getDayOfYear = function() {
    return ilib.Date.PersDate.cumMonthLengths[this.month - 1] + this.day
},
ilib.Date.PersDate.prototype.getEra = function() {
    return 1 > this.year ? -1 : 1
},
ilib.Date.PersDate.prototype.getCalendar = function() {
    return "persian"
},
ilib.Date._constructors.persian = ilib.Date.PersDate,
ilib.CType = {
    _inRange: function(t, e, i) {
        var n;
        if (0 > t || !e || !i) return ! 1;
        if (n = i[e], !n) return ! 1;
        var o = function(t, e) {
            return 1 === t.length ? t[0] - e: t[0] > e ? t[0] - e: e > t[1] ? t[1] - e: 0
        },
        s = ilib.bsearch(t, n, o);
        return n.length > s && 0 === o(n[s], t)
    },
    withinRange: function(t, e) {
        if (!e) return ! 1;
        var i;
        switch (typeof t) {
        case "number":
            i = t;
            break;
        case "string":
            i = ilib.String.toCodePoint(t, 0);
            break;
        case "undefined":
            return ! 1;
        default:
            i = t._toCodePoint(0)
        }
        return ilib.CType._inRange(i, e.toLowerCase(), ilib.data.ctype)
    },
    _init: function(t, e, i) {
        ilib.CType._load("ctype", t, e, i)
    },
    _load: function(t, e, i, n) {
        if (ilib.data[t]) n && "function" == typeof n && n(ilib.data[t]);
        else {
            var o = t ? t + ".json": "ctype.json";
            ilib.loadData({
                name: o,
                locale: "-",
                nonlocale: !0,
                sync: e,
                loadParams: i,
                callback: ilib.bind(this,
                function(e) {
                    ilib.data[t] = e,
                    n && "function" == typeof n && n(ilib.data[t])
                })
            })
        }
    }
},
ilib.CType.isDigit = function(t) {
    var e;
    switch (typeof t) {
    case "number":
        e = t;
        break;
    case "string":
        e = ilib.String.toCodePoint(t, 0);
        break;
    case "undefined":
        return ! 1;
    default:
        e = t._toCodePoint(0)
    }
    return ilib.CType._inRange(e, "digit", ilib.data.ctype)
},
ilib.CType.isDigit._init = function(t, e, i) {
    ilib.CType._init(t, e, i)
},
ilib.CType.isSpace = function(t) {
    var e;
    switch (typeof t) {
    case "number":
        e = t;
        break;
    case "string":
        e = ilib.String.toCodePoint(t, 0);
        break;
    case "undefined":
        return ! 1;
    default:
        e = t._toCodePoint(0)
    }
    return ilib.CType._inRange(e, "space", ilib.data.ctype) || ilib.CType._inRange(e, "Zs", ilib.data.ctype_z) || ilib.CType._inRange(e, "Zl", ilib.data.ctype_z) || ilib.CType._inRange(e, "Zp", ilib.data.ctype_z)
},
ilib.CType.isSpace._init = function(t, e, i) {
    ilib.CType._load("ctype_z", t, e,
    function() {
        ilib.CType._init(t, e, i)
    })
},
ilib.Number = function(t, e) {
    var i, n, o, s = "",
    a = !0;
    if (this.locale = new ilib.Locale, this.type = "number", e) {
        if (e.locale && (this.locale = "string" == typeof e.locale ? new ilib.Locale(e.locale) : e.locale), e.type) switch (e.type) {
        case "number":
        case "currency":
        case "percentage":
            this.type = e.type;
            break;
        default:
        }
        e.sync !== void 0 && (a = 1 == e.sync),
        n = e.loadParams,
        o = e.onLoad
    }
    ilib.CType.isDigit._init(a, n, ilib.bind(this,
    function() {
        ilib.CType.isSpace._init(a, n, ilib.bind(this,
        function() {
            new ilib.LocaleInfo(this.locale, {
                sync: a,
                onLoad: ilib.bind(this,
                function(n) {
                    switch (this.decimal = n.getDecimalSeparator(), typeof t) {
                    case "string":
                        var o = !0;
                        for (this.str = t || "0", i = 0, i = 0; this.str.length > i; i++) o && "-" === this.str.charAt(i) ? (o = !1, s += this.str.charAt(i)) : ilib.CType.isDigit(this.str.charAt(i)) ? (s += this.str.charAt(i), o = !1) : this.str.charAt(i) === this.decimal && (s += ".", o = !1);
                        this.value = parseFloat(s);
                        break;
                    case "number":
                        this.str = "" + t,
                        this.value = t;
                        break;
                    case "object":
                        this.value = t.valueOf(),
                        this.str = "" + this.value;
                        break;
                    case "undefined":
                        this.value = 0,
                        this.str = "0"
                    }
                    switch (this.type) {
                    default:
                        break;
                    case "percentage":
                        -1 !== this.str.indexOf(n.getPercentageSymbol()) && (this.value /= 100);
                        break;
                    case "currency":
                        for (s = "", i = 0; this.str.length > i && !ilib.CType.isDigit(this.str.charAt(i)) && !ilib.CType.isSpace(this.str.charAt(i));) s += this.str.charAt(i++);
                        if (0 === s.length) {
                            for (; this.str.length > i && ilib.CType.isDigit(this.str.charAt(i)) || ilib.CType.isSpace(this.str.charAt(i)) || "." === this.str.charAt(i) || "," === this.str.charAt(i);) i++;
                            for (; this.str.length > i && !ilib.CType.isDigit(this.str.charAt(i)) && !ilib.CType.isSpace(this.str.charAt(i));) s += this.str.charAt(i++)
                        }
                        return new ilib.Currency({
                            locale: this.locale,
                            sign: s,
                            sync: a,
                            onLoad: ilib.bind(this,
                            function(t) {
                                this.currency = t,
                                e && "function" == typeof e.onLoad && e.onLoad(this)
                            })
                        }),
                        void 0
                    }
                    e && "function" == typeof e.onLoad && e.onLoad(this)
                })
            })
        }))
    }))
},
ilib.Number.prototype = {
    getLocale: function() {
        return this.locale
    },
    toString: function() {
        return this.str
    },
    getCurrency: function() {
        return this.currency
    },
    valueOf: function() {
        return this.value
    }
},
ilib.Currency = function(t) {
    this.sync = !0,
    t && (t.code && (this.code = t.code), t.locale && (this.locale = "string" == typeof t.locale ? new ilib.Locale(t.locale) : t.locale), t.sign && (this.sign = t.sign), t.sync !== void 0 && (this.sync = t.sync), t.loadParams && (this.loadParams = t.loadParams)),
    this.locale = this.locale || new ilib.Locale,
    ilib.data.currency === void 0 ? ilib.loadData({
        name: "currency.json",
        object: ilib.Currency,
        locale: "-",
        sync: this.sync,
        loadParams: this.loadParams,
        callback: ilib.bind(this,
        function(e) {
            ilib.data.currency = e,
            this._loadLocinfo(t && t.onLoad)
        })
    }) : this._loadLocinfo(t && t.onLoad)
},
ilib.Currency.getAvailableCurrencies = function() {
    var t, e = [],
    i = new ilib.ResBundle({
        name: "currency"
    }).getResObj();
    for (t in i) t && i[t] && e.push(t);
    return e
},
ilib.Currency.prototype = {
    _loadLocinfo: function(t) {
        new ilib.LocaleInfo(this.locale, {
            onLoad: ilib.bind(this,
            function(e) {
                var i;
                if (this.locinfo = e, this.code) {
                    if (i = ilib.data.currency[this.code], !i) throw "currency " + this.code + " is unknown"
                } else if (this.sign) if (i = ilib.data.currency[this.sign], i !== void 0) this.code = this.sign;
                else if (this.code = this.locinfo.getCurrency(), i = ilib.data.currency[this.code], i.sign !== this.sign) for (var n in ilib.data.currency) if (n && ilib.data.currency[n] && (i = ilib.data.currency[n], i.sign === this.sign)) {
                    this.code = n;
                    break
                }
                i && this.code || (this.code = this.locinfo.getCurrency(), i = ilib.data.currency[this.code]),
                this.name = i.name,
                this.fractionDigits = i.decimals,
                this.sign = i.sign,
                "function" == typeof t && t(this)
            })
        })
    },
    getCode: function() {
        return this.code
    },
    getFractionDigits: function() {
        return this.fractionDigits
    },
    getSign: function() {
        return this.sign
    },
    getName: function() {
        return this.name
    },
    getLocale: function() {
        return this.locale
    }
},
ilib.NumFmt = function(t) {
    var e = !0;
    this.locale = new ilib.Locale,
    this.type = "number";
    var i = void 0;
    t && (t.locale && (this.locale = "string" == typeof t.locale ? new ilib.Locale(t.locale) : t.locale), t.type && ("number" === t.type || "currency" === t.type || "percentage" === t.type) && (this.type = t.type), t.currency && (this.currency = t.currency), "number" == typeof t.maxFractionDigits && (this.maxFractionDigits = this._toPrimitive(t.maxFractionDigits)), "number" == typeof t.minFractionDigits && (this.minFractionDigits = this._toPrimitive(t.minFractionDigits)), t.style && (this.style = t.style), "boolean" == typeof t.useNative && (this.useNative = t.useNative), this.roundingMode = t.roundingMode, t.sync !== void 0 && (e = 1 == t.sync), i = t.loadParams),
    this.localeInfo = void 0,
    new ilib.LocaleInfo(this.locale, {
        sync: e,
        loadParams: i,
        onLoad: ilib.bind(this,
        function(n) {
            if (this.localeInfo = n, "number" === this.type) this.templateNegative = new ilib.String(this.localeInfo.getNegativeNumberFormat() || "-{n}");
            else {
                if ("currency" === this.type) {
                    var o;
                    if (!this.currency || "string" != typeof this.currency) throw "A currency property is required in the options to the number formatter constructor when the type property is set to currency.";
                    return new ilib.Currency({
                        locale: this.locale,
                        code: this.currency,
                        sync: e,
                        loadParams: i,
                        onLoad: ilib.bind(this,
                        function(e) {
                            this.currencyInfo = e,
                            "common" !== this.style && "iso" !== this.style && (this.style = "common"),
                            "number" != typeof this.maxFractionDigits && "number" != typeof this.minFractionDigits && (this.minFractionDigits = this.maxFractionDigits = this.currencyInfo.getFractionDigits()),
                            o = this.localeInfo.getCurrencyFormats(),
                            this.template = new ilib.String(o[this.style] || o.common),
                            this.templateNegative = new ilib.String(o[this.style + "Negative"] || o.commonNegative),
                            this.sign = "iso" === this.style ? this.currencyInfo.getCode() : this.currencyInfo.getSign(),
                            this.roundingMode || (this.roundingMode = this.currencyInfo && this.currencyInfo.roundingMode),
                            this._init(),
                            t && "function" == typeof t.onLoad && t.onLoad(this)
                        })
                    }),
                    void 0
                }
                "percentage" === this.type && (this.template = new ilib.String(this.localeInfo.getPercentageFormat() || "{n}%"), this.templateNegative = new ilib.String(this.localeInfo.getNegativePercentageFormat() || this.localeInfo.getNegativeNumberFormat() + "%"))
            }
            this._init(),
            t && "function" == typeof t.onLoad && t.onLoad(this)
        })
    })
},
ilib.NumFmt.getAvailableLocales = function() {
    return void 0
},
ilib.NumFmt.zeros = "0000000000000000000000000000000000000000000000000000000000000000000000",
ilib.NumFmt.prototype = {
    getUseNative: function() {
        return "boolean" == typeof this.useNative ? this.useNative: "native" === this.localeInfo.getDigitsStyle()
    },
    _init: function() {
        if (this.maxFractionDigits < this.minFractionDigits && (this.minFractionDigits = this.maxFractionDigits), this.roundingMode || (this.roundingMode = this.localeInfo.getRoundingMode()), this.roundingMode || (this.roundingMode = "halfdown"), this.round = ilib._roundFnc[this.roundingMode], this.round || (this.roundingMode = "halfdown", this.round = ilib._roundFnc[this.roundingMode]), "nogrouping" === this.style ? this.prigroupSize = this.secgroupSize = 0 : (this.prigroupSize = this.localeInfo.getPrimaryGroupingDigits(), this.secgroupSize = this.localeInfo.getSecondaryGroupingDigits(), this.groupingSeparator = this.getUseNative() ? this.localeInfo.getNativeGroupingSeparator() : this.localeInfo.getGroupingSeparator()), this.decimalSeparator = this.getUseNative() ? this.localeInfo.getNativeDecimalSeparator() : this.localeInfo.getDecimalSeparator(), this.getUseNative()) {
            var t = this.localeInfo.getNativeDigits() || this.localeInfo.getDigits();
            t && (this.digits = t.split(""))
        }
        this.exponentSymbol = this.localeInfo.getExponential() || "e"
    },
    _pad: function(t, e, i) {
        return t.length >= e ? t: i ? ilib.NumFmt.zeros.substring(0, e - t.length) + t: t + ilib.NumFmt.zeros.substring(0, e - t.length)
    },
    _toPrimitive: function(t) {
        var e = 0;
        switch (typeof t) {
        case "number":
            e = t;
            break;
        case "string":
            e = parseFloat(t);
            break;
        case "object":
            e = t.valueOf()
        }
        return e
    },
    _formatScientific: function(t) {
        var e, i = new Number(t);
        if (this.maxFractionDigits !== void 0) {
            var n, o, s = i.toExponential(),
            a = s.split("e"),
            r = a[0];
            n = a[1],
            o = Math.pow(10, this.maxFractionDigits),
            r = this.round(r * o) / o,
            e = "" + r + this.exponentSymbol + n
        } else e = i.toExponential(this.minFractionDigits),
        "e" !== this.exponentSymbol && (e = e.replace(/e/, this.exponentSymbol));
        return e
    },
    _formatStandard: function(t) {
        var e, i;
        if (this.maxFractionDigits !== void 0 && this.maxFractionDigits > -1) {
            var n = Math.pow(10, this.maxFractionDigits);
            t = this.round(t * n) / n
        }
        t = Math.abs(t);
        var o, s, a = ("" + t).split("."),
        r = a[0],
        h = a[1];
        if (r = "" + r, this.minFractionDigits > 0 && (h = this._pad(h || "", this.minFractionDigits, !1)), this.secgroupSize > 0) {
            if (r.length > this.prigroupSize) {
                var l = this.prigroupSize,
                c = r.length,
                d = c - l;
                r = r.slice(0, d) + this.groupingSeparator + r.slice(d);
                var u = r.substring(0, r.indexOf(this.groupingSeparator));
                for (i = u.length; i > this.secgroupSize;) {
                    var g = this.secgroupSize,
                    f = u.length,
                    p = f - g;
                    r = r.slice(0, p) + this.groupingSeparator + r.slice(p),
                    u = r.substring(0, r.indexOf(this.groupingSeparator)),
                    i = u.length
                }
            }
            s = r
        } else if (0 !== this.prigroupSize) {
            for (o = ilib.mod(r.length - 1, this.prigroupSize), s = "", e = 0; r.length - 1 > e; e++) s += r.charAt(e),
            0 === o && (s += this.groupingSeparator),
            o = ilib.mod(o - 1, this.prigroupSize);
            s += r.charAt(r.length - 1)
        } else s = r;
        return h && (this.maxFractionDigits === void 0 || this.maxFractionDigits > 0) && (s += this.decimalSeparator, s += h),
        this.digits && (s = ilib.mapString(s, this.digits)),
        s
    },
    format: function(t) {
        var e, i;
        if (t === void 0) return "";
        if (i = this._toPrimitive(t), "number" === this.type) e = "scientific" === this.style ? this._formatScientific(i) : this._formatStandard(i),
        0 > t && (e = this.templateNegative.format({
            n: e
        }));
        else {
            e = this._formatStandard(i);
            var n = 0 > i ? this.templateNegative: this.template;
            e = n.format({
                n: e,
                s: this.sign
            })
        }
        return e
    },
    getType: function() {
        return this.type
    },
    getLocale: function() {
        return this.locale
    },
    isGroupingUsed: function() {
        return "undefined" !== this.groupingSeparator && this.groupingSeparator.length > 0
    },
    getMaxFractionDigits: function() {
        return this.maxFractionDigits !== void 0 ? this.maxFractionDigits: -1
    },
    getMinFractionDigits: function() {
        return this.minFractionDigits !== void 0 ? this.minFractionDigits: -1
    },
    getCurrency: function() {
        return this.currencyInfo && this.currencyInfo.getCode()
    },
    getRoundingMode: function() {
        return this.roundingMode
    },
    getStyle: function() {
        return this.style
    }
},
ilib.DurFmt = function(t) {
    var e = !0,
    i = void 0;
    this.locale = new ilib.Locale,
    this.length = "short",
    this.style = "text",
    t && (t.locale && (this.locale = "string" == typeof t.locale ? new ilib.Locale(t.locale) : t.locale), t.length && ("short" === t.length || "medium" === t.length || "long" === t.length || "full" === t.length) && (this.length = t.length), t.style && ("text" === t.style || "clock" === t.style) && (this.style = t.style), t.sync !== void 0 && (e = 1 == t.sync), "boolean" == typeof t.useNative && (this.useNative = t.useNative), i = t.loadParams),
    new ilib.ResBundle({
        locale: this.locale,
        name: "sysres",
        sync: e,
        loadParams: i,
        onLoad: ilib.bind(this,
        function(n) {
            switch (this.length) {
            case "short":
                this.components = {
                    year: n.getString("#{num}y"),
                    month: n.getString("#{num}m", "durationShortMonths"),
                    week: n.getString("#{num}w"),
                    day: n.getString("#{num}d"),
                    hour: n.getString("#{num}h"),
                    minute: n.getString("#{num}m", "durationShortMinutes"),
                    second: n.getString("#{num}s"),
                    millisecond: n.getString("#{num}m", "durationShortMillis"),
                    separator: n.getString(" ", "separatorShort"),
                    finalSeparator: ""
                };
                break;
            case "medium":
                this.components = {
                    year: n.getString("1#1 yr|#{num} yrs", "durationMediumYears"),
                    month: n.getString("1#1 mo|#{num} mos"),
                    week: n.getString("1#1 wk|#{num} wks", "durationMediumWeeks"),
                    day: n.getString("1#1 dy|#{num} dys"),
                    hour: n.getString("1#1 hr|#{num} hrs", "durationMediumHours"),
                    minute: n.getString("1#1 mi|#{num} min"),
                    second: n.getString("1#1 se|#{num} sec"),
                    millisecond: n.getString("#{num} ms"),
                    separator: n.getString(" ", "separatorMedium"),
                    finalSeparator: ""
                };
                break;
            case "long":
                this.components = {
                    year: n.getString("1#1 yr|#{num} yrs"),
                    month: n.getString("1#1 mon|#{num} mons"),
                    week: n.getString("1#1 wk|#{num} wks"),
                    day: n.getString("1#1 day|#{num} days", "durationLongDays"),
                    hour: n.getString("1#1 hr|#{num} hrs"),
                    minute: n.getString("1#1 min|#{num} min"),
                    second: n.getString("1#1 sec|#{num} sec"),
                    millisecond: n.getString("#{num} ms"),
                    separator: n.getString(", ", "separatorLong"),
                    finalSeparator: ""
                };
                break;
            case "full":
                this.components = {
                    year: n.getString("1#1 year|#{num} years"),
                    month: n.getString("1#1 month|#{num} months"),
                    week: n.getString("1#1 week|#{num} weeks"),
                    day: n.getString("1#1 day|#{num} days"),
                    hour: n.getString("1#1 hour|#{num} hours"),
                    minute: n.getString("1#1 minute|#{num} minutes"),
                    second: n.getString("1#1 second|#{num} seconds"),
                    millisecond: n.getString("1#1 millisecond|#{num} milliseconds"),
                    separator: n.getString(", ", "separatorFull"),
                    finalSeparator: n.getString(" and ", "finalSeparatorFull")
                }
            }
            return "clock" === this.style ? (new ilib.DateFmt({
                locale: this.locale,
                type: "time",
                time: "ms",
                sync: e,
                loadParams: i,
                useNative: this.useNative,
                onLoad: ilib.bind(this,
                function(n) {
                    this.timeFmtMS = n,
                    new ilib.DateFmt({
                        locale: this.locale,
                        type: "time",
                        time: "hm",
                        sync: e,
                        loadParams: i,
                        useNative: this.useNative,
                        onLoad: ilib.bind(this,
                        function(n) {
                            this.timeFmtHM = n,
                            new ilib.DateFmt({
                                locale: this.locale,
                                type: "time",
                                time: "hms",
                                sync: e,
                                loadParams: i,
                                useNative: this.useNative,
                                onLoad: ilib.bind(this,
                                function(e) {
                                    this.timeFmtHMS = e,
                                    this.timeFmtHM.template = this.timeFmtHM.template.replace(/hh?/, "H"),
                                    this.timeFmtHM.templateArr = this.timeFmtHM._tokenize(this.timeFmtHM.template),
                                    this.timeFmtHMS.template = this.timeFmtHMS.template.replace(/hh?/, "H"),
                                    this.timeFmtHMS.templateArr = this.timeFmtHMS._tokenize(this.timeFmtHMS.template),
                                    this._init(this.timeFmtHM.locinfo, t && t.onLoad)
                                })
                            })
                        })
                    })
                })
            }), void 0) : (new ilib.LocaleInfo(this.locale, {
                sync: e,
                loadParams: i,
                onLoad: ilib.bind(this,
                function(e) {
                    this._init(e, t && t.onLoad)
                })
            }), void 0)
        })
    })
},
ilib.DurFmt.complist = {
    text: ["year", "month", "week", "day", "hour", "minute", "second", "millisecond"],
    clock: ["year", "month", "week", "day"]
},
ilib.DurFmt.prototype._mapDigits = function(t) {
    return this.useNative && this.digits ? ilib.mapString("" + t, this.digits) : t
},
ilib.DurFmt.prototype._init = function(t, e) {
    var i;
    "boolean" == typeof this.useNative ? this.useNative && (i = t.getNativeDigits(), i && (this.digits = i)) : "native" === t.getDigitsStyle() && (i = t.getNativeDigits(), i && (this.useNative = !0, this.digits = i)),
    "function" == typeof e && e(this)
},
ilib.DurFmt.prototype.format = function(t) {
    var e, i, n, o = !0,
    s = "";
    for (i = ilib.DurFmt.complist[this.style], e = i.length - 1; e >= 0; e--) t[i[e]] !== void 0 && 0 != t[i[e]] && (s.length > 0 && (s = ("full" === this.length && o ? this.components.finalSeparator: this.components.separator) + s, o = !1), s = this.components[i[e]].formatChoice(t[i[e]], {
        num: this._mapDigits(t[i[e]])
    }) + s);
    return "clock" === this.style && (n = t.hour !== void 0 ? t.second !== void 0 ? this.timeFmtHMS: this.timeFmtHM: this.timeFmtMS, s.length > 0 && (s += this.components.separator), s += n._formatTemplate(t, n.templateArr)),
    new ilib.String(s)
},
ilib.DurFmt.prototype.getLocale = function() {
    return this.locale
},
ilib.DurFmt.prototype.getLength = function() {
    return this.length
},
ilib.DurFmt.prototype.getStyle = function() {
    return this.style
},
ilib.ScriptInfo = function(t, e) {
    var i = !0,
    n = void 0;
    this.script = t,
    e && (e.sync !== void 0 && (i = 1 == e.sync), e.loadParams !== void 0 && (n = e.loadParams)),
    ilib.ScriptInfo.cache || (ilib.ScriptInfo.cache = {}),
    ilib.data.scripts ? this.info = ilib.data.scripts[t] : ilib.loadData({
        object: ilib.ScriptInfo,
        locale: "-",
        name: "scripts.json",
        sync: i,
        loadParams: n,
        callback: ilib.bind(this,
        function(i) {
            if (!i) {
                i = {
                    Latn: {
                        nb: 215,
                        nm: "Latin",
                        lid: "Latin",
                        rtl: !1,
                        ime: !1,
                        casing: !0
                    }
                };
                var n = this.locale.getSpec().replace(/-/g, "_");
                ilib.ScriptInfo.cache[n] = i
            }
            ilib.data.scripts = i,
            this.info = t && ilib.data.scripts[t],
            e && "function" == typeof e.onLoad && e.onLoad(this)
        })
    })
},
ilib.ScriptInfo.getAllScripts = function() {
    var t = [],
    e = void 0,
    i = ilib.data.scripts;
    for (e in i) e && i[e] && t.push(e);
    return t
},
ilib.ScriptInfo.prototype = {
    getCode: function() {
        return this.info && this.script
    },
    getCodeNumber: function() {
        return this.info && this.info.nb || 0
    },
    getName: function() {
        return this.info && this.info.nm
    },
    getLongCode: function() {
        return this.info && this.info.lid
    },
    getScriptDirection: function() {
        return this.info && this.info.rtl !== void 0 && this.info.rtl ? "rtl": "ltr"
    },
    getNeedsIME: function() {
        return this.info && this.info.ime ? !0 : !1
    },
    getCasing: function() {
        return this.info && this.info.casing ? !0 : !1
    }
},
ilib.CaseMapper = function(t) {
    switch (this.up = !0, this.locale = new ilib.Locale, t && (t.locale !== void 0 && (this.locale = "string" == typeof t.locale ? new ilib.Locale(t.locale) : t.locale), this.up = !t.direction || "toupper" === t.direction), this.locale.getLanguage()) {
    case "az":
    case "tr":
    case "crh":
    case "kk":
    case "krc":
    case "tt":
        this.mapData = this.up ? {
            i: "\u0130",
            "\u0131": "I"
        }: {
            "\u0130": "i",
            I: "\u0131"
        },
        this.mapper = this._charMapper;
        break;
    case "de":
        this.up && (this.mapper = this._charMapper, this.mapData = {
            "\u00df": "SS"
        });
        break;
    case "fr":
        this.up && "CA" !== this.locale.getRegion() && (this.mapData = {
            "\u00e0": "A",
            "\u00e1": "A",
            "\u00e2": "A",
            "\u00e3": "A",
            "\u00e4": "A",
            "\u00e7": "C",
            "\u00e8": "E",
            "\u00e9": "E",
            "\u00ea": "E",
            "\u00eb": "E",
            "\u00ec": "I",
            "\u00ed": "I",
            "\u00ee": "I",
            "\u00ef": "I",
            "\u00f1": "N",
            "\u00f2": "O",
            "\u00f3": "O",
            "\u00f4": "O",
            "\u00f6": "O",
            "\u00f9": "U",
            "\u00fa": "U",
            "\u00fb": "U",
            "\u00fc": "U"
        },
        this.mapper = this._charMapper);
        break;
    case "el":
        this.mapData = this.up ? {
            "\u0390": "\u0399",
            "\u03ac": "\u0391",
            "\u03ad": "\u0395",
            "\u03ae": "\u0397",
            "\u03af": "\u0399",
            "\u03b0": "\u03a5",
            "\u03ca": "\u0399",
            "\u03cb": "\u03a5",
            "\u03cc": "\u039f",
            "\u03cd": "\u03a5",
            "\u03ce": "\u03a9"
        }: {},
        this.mapper = this._charMapper;
        break;
    case "abq":
    case "ady":
    case "av":
    case "ce":
    case "dar":
    case "inh":
    case "kbd":
    case "lbe":
    case "lez":
    case "tab":
    case "ru":
        this.up || (this.mapData = {
            "\u04c0": "\u04c0"
        },
        this.mapper = this._charMapper)
    }
    this.mapper || (this.mapper = function(t) {
        return this.up ? t.toUpperCase() : t.toLowerCase()
    })
},
ilib.CaseMapper.prototype = {
    _charMapper: function(t) {
        var e;
        if (!t) return t;
        e = "string" == typeof t ? new ilib.String(t) : "" + t;
        for (var i, n = "",
        o = e.charIterator(); o.hasNext();) if (i = o.next(), this.up || "\u03a3" !== i) n += this.mapData[i] ? this.mapData[i] : this.up ? i.toUpperCase() : i.toLowerCase();
        else if (o.hasNext()) {
            i = o.next();
            var s = i.charCodeAt(0);
            n += 904 > s && 902 !== s || s > 974 ? "\u03c2": "\u03c3",
            n += i.toLowerCase()
        } else n += "\u03c2";
        return n
    },
    getLocale: function() {
        return this.locale
    },
    map: function(t) {
        return this.mapper(t)
    }
};

// ../lib/enyo-ilib/packedbuffer.js
var PackedBuffer = function(t) {
    this.buffer = t,
    this.index = 0
};
PackedBuffer.prototype.getLongs = function(t) {
    var e = void 0;
    if (this.buffer && this.index < this.buffer.length) {
        e = [];
        for (var i = 0; t > i && this.index + 3 < this.buffer.length; i++) {
            var n = this.buffer[this.index] << 24 | this.buffer[this.index + 1] << 16 | this.buffer[this.index + 2] << 8 | this.buffer[this.index + 3];
            e.push(n),
            this.index += 4
        }
    }
    return e
},
PackedBuffer.prototype.getLong = function() {
    var t = this.getLongs(1);
    return t && t.length > 0 ? t[0] : void 0
},
PackedBuffer.prototype.getBytes = function(t) {
    var e = void 0;
    if (this.buffer && this.index < this.buffer.length) {
        e = [];
        for (var i = 0; t > i && this.index < this.buffer.length; i++) {
            var n = this.buffer[this.index++];
            128 & n && (n -= 256),
            e.push(n)
        }
    }
    return e
},
PackedBuffer.prototype.getByte = function() {
    var t = this.getBytes(1);
    return t && t.length > 0 ? t[0] : void 0
},
PackedBuffer.prototype.getUnsignedBytes = function(t) {
    var e = void 0;
    if (this.buffer && this.index < this.buffer.length) {
        e = [];
        for (var i = 0; t > i && this.index < this.buffer.length; i++) e.push(this.buffer[this.index++])
    }
    return e
},
PackedBuffer.prototype.getString = function(t) {
    for (var e = this.getUnsignedBytes(t), i = "", n = 0; e.length > n; n++) i += String.fromCharCode(e[n]);
    return i
},
PackedBuffer.prototype.skip = function(t) {
    this.index += t
},
"undefined" != typeof exports && (exports.PackedBuffer = PackedBuffer);

// ../lib/enyo-ilib/zoneinfo.js
var _platform = "unknown"; (function() {
    "undefined" != typeof enyo ? _platform = "enyo": "undefined" != typeof environment ? _platform = "rhino": "undefined" != typeof process || "undefined" != typeof require ? _platform = "nodejs": "undefined" != typeof window && (_platform = "undefined" != typeof PalmSystem ? "webos": "browser")
})();
var PackedBuffer = PackedBuffer || ("nodejs" === _platform ? require("./packedbuffer.js").PackedBuffer: void 0),
ZoneInfoFile = function(t) {
    var e = this;
    switch (_platform) {
    case "nodejs":
        var i = require("fs"),
        n = new Buffer(i.readFileSync(t)),
        o = new Uint8Array(n);
        this._parseInfo(o);
        break;
    default:
        var s = new XMLHttpRequest;
        s.open("GET", "file:" + t, !1),
        s.responseType = "arraybuffer",
        s.onload = function() {
            var t = new Uint8Array(s.response);
            e._parseInfo(t)
        },
        s.onerror = function() {
            throw "Cannot load file " + t
        },
        s.send()
    }
};
ZoneInfoFile.prototype._parseInfo = function(t) {
    var e = new PackedBuffer(t);
    if ("TZif" != e.getString(4)) throw "file format not recognized";
    e.skip(16);
    var i = e.getLong(),
    n = e.getLong(),
    o = e.getLong(),
    s = e.getLong(),
    a = e.getLong(),
    r = e.getLong();
    this.transitionTimes = s ? e.getLongs(s) : [],
    this.transitionTimes = this.transitionTimes.map(function(t) {
        return 1e3 * t
    }),
    this.ruleIndex = s ? e.getUnsignedBytes(s) : [],
    this.zoneInfo = [];
    for (var h = 0; a > h; h++) this.zoneInfo.push({
        offset: Math.floor(e.getLong() / 60),
        isdst: !!e.getByte(),
        abbreviationIndex: e.getByte()
    });
    for (var l = e.getString(r), h = 0; a > h; h++) {
        var c = l.substring(this.zoneInfo[h].abbreviationIndex);
        this.zoneInfo[h].abbreviation = c.substring(0, c.indexOf("\0"))
    }
    o && e.skip(2 * o),
    n && e.skip(n),
    i && e.skip(i);
    var d = this;
    this.ruleIndex = this.ruleIndex.map(function(t) {
        return {
            offset: d.zoneInfo[t].offset,
            isdst: d.zoneInfo[t].isdst,
            abbreviation: d.zoneInfo[t].abbreviation
        }
    });
    for (var h = 0; s > h; h++) h > 0 && this.ruleIndex[h].isdst && (this.ruleIndex[h].savings = this.ruleIndex[h].offset - this.ruleIndex[h - 1].offset);
    if (this.transitionTimes.length) {
        for (var u = s - 1; u > -1; u--) {
            var g = this.ruleIndex[u];
            if (this.standardTime || g.isdst ? !this.daylightTime && g.isdst && (this.daylightTime = g) : this.standardTime = g, this.daylightTime && this.standardTime) break
        }
        this.daylightTime && !this.standardTime && (this.standardTime = this.daylightTime);
        for (var f = this.zoneInfo.length - 1; f > 0; f--) if (!this.zoneInfo[f].isdst) {
            this.defaultTime = this.zoneInfo[f];
            break
        }
    } else this.standardTime = this.zoneInfo[0];
    this.defaultTime || (this.defaultTime = this.zoneInfo[this.zoneInfo.length - 1])
},
ZoneInfoFile.prototype.bsearch = function(t, e) {
    if (e === void 0 || !e || t === void 0 || e[0] > t) return - 1;
    if (t > e[e.length - 1]) return e.length - 1;
    for (var i, n = e.length - 1,
    o = 0,
    s = 0; n >= o;) if (s = Math.floor((n + o) / 2), i = e[s] - t, i > 0) n = s - 1;
    else {
        if (! (0 > i)) return s;
        o = s + 1
    }
    return n
},
ZoneInfoFile.prototype.usesDST = function(t) {
    var e = t.getTime(),
    i = e + 31536e6,
    n = this.bsearch(e, this.transitionTimes);
    if ( - 1 !== n) for (; this.transitionTimes.length > n && i > this.transitionTimes[n];) if (this.ruleIndex[n++].isdst) return ! 0;
    return ! 1
},
ZoneInfoFile.prototype.getRawOffset = function(t) {
    var e = t.getTime(),
    i = e + 31536e6,
    n = this.bsearch(e, this.transitionTimes),
    o = this.defaultTime.offset;
    if (n > -1) {
        for (; this.transitionTimes.length > n && this.ruleIndex[n].isdst && i > this.transitionTimes[n + 1];) n++;
        this.transitionTimes.length > n && !this.ruleIndex[n].isdst && (o = this.ruleIndex[n].offset)
    }
    return o
},
ZoneInfoFile.prototype.getDSTSavings = function(t) {
    var e = t.getTime(),
    i = e + 31536e6,
    n = this.bsearch(e, this.transitionTimes),
    o = 0;
    if (n > -1) {
        for (; this.transitionTimes.length > n && !this.ruleIndex[n].isdst && i > this.transitionTimes[n + 1];) n++;
        this.transitionTimes.length > n && this.ruleIndex[n].isdst && (o = this.ruleIndex[n].savings)
    }
    return o
},
ZoneInfoFile.prototype.getDSTStartDate = function(t) {
    var e = t.getFullYear(),
    i = new Date(e, 0, 1).getTime(),
    n = new Date(e + 1, 0, 1).getTime(),
    o = this.bsearch(i, this.transitionTimes),
    s = -1;
    if (o > -1) {
        for (i > this.transitionTimes[o] && o++; this.transitionTimes.length > o && !this.ruleIndex[o].isdst && n > this.transitionTimes[o + 1];) o++;
        this.transitionTimes.length > o && this.ruleIndex[o].isdst && (s = this.transitionTimes[o])
    }
    return s
},
ZoneInfoFile.prototype.getDSTEndDate = function(t) {
    var e = t.getFullYear(),
    i = new Date(e, 0, 1).getTime(),
    n = new Date(e + 1, 0, 1).getTime(),
    o = this.bsearch(i, this.transitionTimes),
    s = -1;
    if (o > -1) {
        for (i > this.transitionTimes[o] && o++; this.transitionTimes.length > o && this.ruleIndex[o].isdst && n > this.transitionTimes[o + 1];) o++;
        this.transitionTimes.length > o && !this.ruleIndex[o].isdst && (s = this.transitionTimes[o])
    }
    return s
},
ZoneInfoFile.prototype.getAbbreviation = function(t) {
    var e, i = t.getTime(),
    n = i + 31536e6;
    if (this.transitionTimes.length > 0) {
        var o = this.bsearch(i, this.transitionTimes);
        if (e = this.ruleIndex[o].abbreviation, o > -1) {
            for (; this.transitionTimes.length > o && this.ruleIndex[o].isdst && n > this.transitionTimes[o + 1];) o++;
            this.transitionTimes.length > o && !this.ruleIndex[o].isdst && (e = this.ruleIndex[o].abbreviation)
        }
    } else e = this.standardTime.abbreviation;
    return e
},
ZoneInfoFile.prototype.getDSTAbbreviation = function(t) {
    var e, i = t.getTime(),
    n = i + 31536e6;
    if (this.transitionTimes.length > 0) {
        var o = this.bsearch(i, this.transitionTimes);
        if (e = this.ruleIndex[o].abbreviation, o > -1) {
            for (; this.transitionTimes.length > o && !this.ruleIndex[o].isdst && n > this.transitionTimes[o + 1];) o++;
            this.transitionTimes.length > o && this.ruleIndex[o].isdst && (e = this.ruleIndex[o].abbreviation)
        }
    } else e = this.standardTime.abbreviation;
    return e
},
ZoneInfoFile.prototype.getIlibZoneInfo = function(t) {
    function e(t) {
        var e = Math.floor(t / 60),
        i = t - 60 * e;
        return e + ":" + i
    }
    function i(t) {
        return 2440587.5 + t / 864e5
    }
    var n = {
        o: e(this.getRawOffset(t))
    };
    return this.usesDST(t) ? (n.f = "{c}", n.e = {
        c: this.getAbbreviation(t),
        j: i(this.getDSTEndDate(t))
    },
    n.s = {
        c: this.getDSTAbbreviation(t),
        j: i(this.getDSTStartDate(t)),
        v: e(this.getDSTSavings(t))
    }) : n.f = this.getAbbreviation(t),
    n
},
"nodejs" === _platform && "undefined" != typeof exports && (exports.ZoneInfoFile = ZoneInfoFile);

// ../lib/enyo-ilib/glue.js
(function() {
    var t = function() {
        this.base = enyo.path.rewrite("$lib/enyo-ilib/ilib/"),
        "webos" === enyo.platform.platformName && (this.webos = !0)
    };
    t.prototype = new ilib.Loader,
    t.prototype.constructor = t,
    t.prototype._createZoneFile = function(t) {
        var e = t.substring(t.indexOf("zoneinfo"));
        e = e.substring(0, e.length - 5);
        try {
            var i = new ZoneInfoFile("/usr/share/" + e);
            return i.getIlibZoneInfo(new Date)
        } catch(n) {
            return void 0
        }
    },
    t.prototype._pathjoin = function(t, e) {
        return t && t.length ? e && e.length ? t + ("/" !== t.charAt(t.length - 1) ? "/": "") + e: t: e
    },
    t.prototype._loadFilesAsync = function(t, e, i, n, o) {
        var s = "resources";
        if (n && n.root !== void 0 && (s = n.root), e.length > 0) {
            var a = e.shift(),
            r = void 0;
            if (this.webos && -1 !== a.indexOf("zoneinfo")) i.push(this._createZoneFile(a));
            else {
                this.isAvailable(s, a) ? r = this._pathjoin(s, a) : this.isAvailable(this.base + "locale", a) && (r = this._pathjoin(this._pathjoin(this.base, "locale"), a));
                var h = function(s, a) {
                    i.push(s.failed || "object" != typeof a ? void 0 : a),
                    e.length > 0 ? this._loadFilesAsync(t, e, i, n, o) : o.call(t, i)
                };
                if (r) {
                    var l = new enyo.Ajax({
                        url: r,
                        cacheBust: !1
                    });
                    l.response(this, h),
                    l.error(this, h),
                    l.go()
                } else h({},
                void 0)
            }
        }
    },
    t.prototype.loadFiles = function(t, e, i, n) {
        if (e) {
            var o = [],
            s = "resources",
            a = this._pathjoin(this.base, "locale");
            return i && i.root !== void 0 && (s = i.root),
            enyo.forEach(t,
            function(t) {
                if (this.webos && -1 !== t.indexOf("zoneinfo")) o.push(this._createZoneFile(t));
                else {
                    var e = !1,
                    i = function(t, i) {
                        t.failed || "object" != typeof i || (o.push(i), e = !0)
                    };
                    if (this.isAvailable(s, t)) {
                        var n = new enyo.Ajax({
                            url: this._pathjoin(s, t),
                            sync: !0,
                            cacheBust: !1
                        });
                        n.response(this, i),
                        n.error(this, i),
                        n.go()
                    }
                    if (!e && this.isAvailable(a, t)) {
                        var n = new enyo.Ajax({
                            url: this._pathjoin(a, t),
                            sync: !0,
                            cacheBust: !1
                        });
                        n.response(this, i),
                        n.error(this, i),
                        n.go()
                    }
                    e || o.push(void 0)
                }
            },
            this),
            "function" == typeof n && n.call(this, o),
            o
        }
        var r = [];
        this._loadFilesAsync(this, t, r, i, n)
    },
    t.prototype._loadManifest = function(t, e) {
        this.manifest || (this.manifest = {});
        var i = this._pathjoin(t, e),
        n = this._pathjoin(i, "ilibmanifest.json"),
        o = new enyo.Ajax({
            url: n,
            sync: !0,
            cacheBust: !1,
            handleAs: "json"
        }),
        s = function(t, e) {
            this.manifest[i] = t.failed || "object" != typeof e ? "*": e.files
        };
        o.response(this, s),
        o.error(this, s),
        o.go()
    },
    t.prototype._loadStandardManifests = function() {
        this.manifest || (this._loadManifest(this.base, "locale"), this._loadManifest("", "resources"))
    },
    t.prototype.listAvailableFiles = function() {
        return this._loadStandardManifests(),
        this.manifest
    },
    t.prototype.isAvailable = function(t, e) {
        return this._loadStandardManifests(),
        this.manifest[t] || this._loadManifest(t, ""),
        "*" === this.manifest[t] || -1 !== ilib.indexOf(this.manifest[t], e) ? !0 : !1
    },
    ilib.setLoaderCallback(new t),
    window.UILocale !== void 0 && ilib.setLocale(window.UILocale),
    enyo.isNonLatinLocale = function(t) {
        var e = new ilib.LocaleInfo(t),
        i = e.getLocale(),
        n = ["bs", "cs", "ha", "hr", "hu", "lv", "lt", "pl", "ro", "sr", "sl", "tr", "vi"],
        o = ["ko"];
        return ("Latn" !== e.getScript() || -1 !== enyo.indexOf(i.getLanguage(), n)) && 0 > enyo.indexOf(i.getLanguage(), o)
    },
    enyo.updateI18NClasses = function() {
        var t = new ilib.LocaleInfo,
        e = t.getLocale(),
        i = "enyo-locale-";
        document && document.body && document.body.className && document.body.className && (document.body.className = document.body.className.replace(RegExp("(^|\\s)" + i + "[^\\s]*", "g"), "")),
        enyo.isNonLatinLocale(e) && enyo.dom.addBodyClass(i + "non-latin");
        var n = t.getScript();
        "Latn" !== n && "Cyrl" !== n && "Grek" !== n && enyo.dom.addBodyClass(i + "non-italic");
        var o = new ilib.ScriptInfo(n);
        "rtl" === o.getScriptDirection() ? (enyo.dom.addBodyClass(i + "right-to-left"), enyo.Control && (enyo.Control.prototype.rtl = !0)) : enyo.Control && (enyo.Control.prototype.rtl = !1),
        e.getLanguage() && (enyo.dom.addBodyClass(i + e.getLanguage()), e.getScript() ? (enyo.dom.addBodyClass(i + e.getLanguage() + "-" + e.getScript()), e.getRegion() && enyo.dom.addBodyClass(i + e.getLanguage() + "-" + e.getScript() + "-" + e.getRegion())) : e.getRegion() && enyo.dom.addBodyClass(i + e.getLanguage() + "-" + e.getRegion())),
        e.getScript() && enyo.dom.addBodyClass(i + e.getScript()),
        e.getRegion() && enyo.dom.addBodyClass(i + e.getRegion()),
        enyo.setCaseMappers()
    }
})(),
$L = function(t) {
    var e;
    if ($L.rb || $L.setLocale(), "string" == typeof t) {
        if (!$L.rb) return t;
        e = $L.rb.getString(t)
    } else if ("object" == typeof t) if (t.key !== void 0 && t.value !== void 0) {
        if (!$L.rb) return t.value;
        e = $L.rb.getString(t.value, t.key)
    } else e = "";
    else e = t;
    return "" + e
},
$L.setLocale = function(t) {
    var e = new ilib.Locale(t);
    $L.rb && t === $L.rb.getLocale().getSpec() || ($L.rb = new ilib.ResBundle({
        locale: e,
        type: "html",
        name: "strings",
        sync: !0,
        lengthen: !0
    }))
},
enyo.setCaseMappers = function() {
    enyo.toLowerCase.mapper = new ilib.CaseMapper({
        direction: "tolower"
    }),
    enyo.toUpperCase.mapper = new ilib.CaseMapper({
        direction: "toupper"
    })
},
enyo.toLowerCase = function(t) {
    return null != t ? enyo.toLowerCase.mapper.map("" + t) : t
},
enyo.toUpperCase = function(t) {
    return null != t ? enyo.toUpperCase.mapper.map("" + t) : t
},
function(t) {
    enyo.updateLocale = function(e) {
        ilib._load && (ilib._load.manifest = void 0),
        ilib.setLocale(e || navigator.language),
        $L.setLocale(e || navigator.language),
        enyo.updateI18NClasses(),
        t()
    }
} (enyo.updateLocale),
enyo.updateLocale(null, !0);