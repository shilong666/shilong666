import { useSysdataStore } from '@/store/sysdata.js';

export function getLabelByTypeAndCode(type, code) {
    const sysdataStore = useSysdataStore();
    const dictionaryData = sysdataStore.dictionaryData;
    if (dictionaryData && dictionaryData[type] && dictionaryData[type][code]) {
        return dictionaryData[type][code];
    }
    return code;
}

export function getOptionsByType(type, needNullOption) {
    const sysdataStore = useSysdataStore();
    const dictionaryData = sysdataStore.dictionaryData;
    if (!dictionaryData) {
        return [];
    }
    const typeCodeMap = dictionaryData[type];
    if (!typeCodeMap) {
        return [];
    }
    const codes = Object.keys(typeCodeMap);
    if (!codes && codes.length <= 0) {
        return [];
    }
    const options = [];
    if (needNullOption) {
        options.push({
            code: null,
            desc: '请选择'
        });
    }
    codes.forEach((item) => {
        options.push({
            code: item,
            desc: typeCodeMap[item]
        });
    });
    return options;
}

export function getOptionsWithFilterByType(type, needNullOption, filterArray) {
    const sysdataStore = useSysdataStore();
    const dictionaryData = sysdataStore.dictionaryData;
    if (!dictionaryData) {
        return [];
    }
    const typeCodeMap = dictionaryData[type];
    if (!typeCodeMap) {
        return [];
    }
    const codes = Object.keys(typeCodeMap);
    if (!codes && codes.length <= 0) {
        return [];
    }
    const options = [];
    if (needNullOption) {
        options.push({
            code: '',
            desc: '请选择'
        });
    }
    codes.forEach((item) => {
        if (filterArray && filterArray.length > 0) {
            if (filterArray.indexOf(item) === -1) {
                options.push({
                    code: item,
                    desc: typeCodeMap[item]
                });
            }
        } else {
            options.push({
                code: item,
                desc: typeCodeMap[item]
            });
        }
    });
    return options;
}

const vDict = {};

vDict.getLabelByTypeAndCode = function getLabelByTypeAndCode(type, code) {
    const sysdataStore = useSysdataStore();
    const dictionaryData = sysdataStore.dictionaryData;
    if (dictionaryData && dictionaryData[type] && dictionaryData[type][code]) {
        return dictionaryData[type][code];
    }
    return code;
};

vDict.getOptionsByType = function getOptionsByType(type, needNullOption) {
    const sysdataStore = useSysdataStore();
    const dictionaryData = sysdataStore.dictionaryData;
    if (!dictionaryData) {
        return [];
    }
    const typeCodeMap = dictionaryData[type];
    if (!typeCodeMap) {
        return [];
    }
    const codes = Object.keys(typeCodeMap);
    if (!codes && codes.length <= 0) {
        return [];
    }
    const options = [];
    if (needNullOption) {
        options.push({
            code: '',
            desc: '请选择'
        });
    }
    codes.forEach((item) => {
        options.push({
            code: item,
            desc: typeCodeMap[item]
        });
    });
    return options;
};
vDict.getOptionsWithFilterByType = function getOptionsByType(
    type,
    needNullOption,
    filterArray
) {
    const sysdataStore = useSysdataStore();
    const dictionaryData = sysdataStore.dictionaryData;
    if (!dictionaryData) {
        return [];
    }
    const typeCodeMap = dictionaryData[type];
    if (!typeCodeMap) {
        return [];
    }
    const codes = Object.keys(typeCodeMap);
    if (!codes && codes.length <= 0) {
        return [];
    }
    const options = [];
    if (needNullOption) {
        options.push({
            code: '',
            desc: '请选择'
        });
    }
    codes.forEach((item) => {
        if (filterArray && filterArray.length > 0) {
            if (filterArray.indexOf(item) === -1) {
                options.push({
                    code: item,
                    desc: typeCodeMap[item]
                });
            }
        } else {
            options.push({
                code: item,
                desc: typeCodeMap[item]
            });
        }
    });
    return options;
};

export default vDict;