import Handsontable from 'handsontable';

function linkRenderer(instance, td, row, col, prop, value, cellProperties) {
    Handsontable.renderers.TextRenderer.apply(this, arguments);

    if (value && typeof value === 'string' && value.startsWith('http')) {
        td.innerHTML = `<a href="${value}" target="_blank">${value}</a>`;
    } else {
        td.innerHTML = value;
    }

    return td;
}

export { linkRenderer };