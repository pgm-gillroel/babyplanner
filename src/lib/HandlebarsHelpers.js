export default {
  link(url, options) {
    return `<a href="${url}" class="sidebar__link">${options.fn(this)}</a>`;
  },
};
