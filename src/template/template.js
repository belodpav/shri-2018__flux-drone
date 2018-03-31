/**
 * Returns String with injected data
 * @param {String} srcTemplate
 * @param {Object} data
 * @return {String}
 */
function genCodeWithData(srcTemplate, data) {
    const pattern = /{{(.*?)}}/g;
    const matches = srcTemplate.match(pattern);
    let html = srcTemplate;

    matches.forEach((item) => {
        let val = null;
        item = item.replace('{{', '');
        item = item.replace('}}', '');

        if (data[item] !== undefined) {
            val = data[item];
        }

        html = html.replace('{{' + item + '}}', val);
    });

    return html;
}

export {genCodeWithData};
