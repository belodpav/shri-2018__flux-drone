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

        const itemPath = item.trim().split('.');
        let obj = data;

        for (let i = 0; i < itemPath.length; i++) {
            obj = obj[itemPath[i]];
        }

        if (obj !== undefined) {
            val = obj;
        }

        html = html.replace('{{' + item + '}}', val);
    });

    return html;
}

module.exports = {genCodeWithData};
