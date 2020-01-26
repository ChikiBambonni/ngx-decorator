export const serializeObject = (obj?: object): string => {
    let str = '';

    if (obj) {
        Object.keys(obj).forEach((key: string) => {
            if (str !== '') {
                str += '&';
            }

            str += `${key}=${encodeURIComponent(obj[key])}`;
        });
    }

    return str;
};
