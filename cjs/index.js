'use strict';
const hljs = (m => /* c8 ignore start */ m.__esModule ? m.default : m /* c8 ignore stop */)(require('highlight.js'));

const TAG = 'highlighted-code';

const targets = new WeakMap;

const options = {timeout: 300, box: 'border-box'};

const noIdle = typeof cancelIdleCallback !== 'function';
const setIdle = noIdle ? setTimeout : requestIdleCallback;
const dropIdle = noIdle ? clearTimeout : cancelIdleCallback;

let theme, resizeObserver;

/**
 * A textarea builtin extend able to automatically highlight while the area is
 * being typed. Requires `HighlightedCode.useTheme('default')` call to actually
 * highlight the resulting code.
 * @example `<textarea is="highlighted-code" language="css"></textarea>`
 */
class HighlightedCode extends HTMLTextAreaElement {
  static get observedAttributes() { return ['language']; }
  static get library() { return hljs; }

  /**
   * Automatically set a CSS theme for the highlighted code.
   * @param {string} name One of the themes from highlight.js or a css file to
   * point at. Names are like `default`, `github`, `tokio-night-dark` and so on
   * https://github.com/highlightjs/highlight.js/tree/main/src/styles
   */
  static useTheme(name) {
    if (!theme) {
      theme = document.head.appendChild(
        document.createElement('link')
      );
      theme.rel = 'stylesheet';
      theme.addEventListener('load', () => {
        for (const textarea of document.querySelectorAll(`textarea[is="${TAG}"]`))
          _backgroundColor.call(textarea);
      });
    }
    theme.href = name.includes('.') ? name : `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.5.0/styles/${name}.min.css`;
  }

  constructor() {
    super();
    this.idle = 0;
    const pre = this.ownerDocument.createElement('pre');
    pre.className = TAG;
    pre.innerHTML = '<code></code>';
    targets.set(this, pre);
    this.style.cssText += `
      white-space: pre;
      font-family: monospace;
      color: transparent;
      background-color: transparent;
    `;
    // setup internal class
    const {language} = this;
    if (language) {
      delete this.language;
      this.language = language;
    }
  }

  /**
   * The used language, compatible with hljs.
   * @type {string}
   */
  get language() {
    return this.getAttribute('language');
  }
  set language(name) {
    this.setAttribute('language', name);
  }

  attributeChangedCallback(language, _, name) {
    let className = 'hljs';
    if (name)
      className += ' language-' + name;
    targets.get(this).querySelector('code').className = className;
  }
  connectedCallback() {
    const pre = targets.get(this);
    this.parentElement.insertBefore(pre, this.nextSibling);
    this.oninput();
    _backgroundColor.call(this);
    resizeObserver.observe(this, options);
    this.addEventListener('input', this);
    this.addEventListener('scroll', this);
  }
  disconnectedCallback() {
    resizeObserver.unobserve(this);
    this.removeEventListener('input', this);
    this.removeEventListener('scroll', this);
  }

  handleEvent(event) { this['on' + event.type](event); }
  oninput() {
    dropIdle(this.idle);
    this.idle = setIdle(
      () => {
        const pre = targets.get(this);
        const code = pre.querySelector('code');
        const {language, value} = this;

        // Please note no language is very slow!
        if (!language)
          code.className = 'hljs';

        code.innerHTML = (
          language ?
            hljs.highlight(value, {language}) :
            hljs.highlightAuto(value)
        ).value + '<br>';
        this.onscroll();
      },
      options
    );
  }
  onscroll() {
    const {scrollTop, scrollLeft} = this;
    const pre = targets.get(this);
    pre.scrollTop = scrollTop;
    pre.scrollLeft = scrollLeft;
    // a very Firefox specific issue
    if ('scrollLeftMax' in pre)
      this.scrollLeft = Math.min(scrollLeft, pre.scrollLeftMax);
  }
}

if (!customElements.get(TAG)) {
  resizeObserver = new ResizeObserver(entries => {
    for (const {target} of entries) {
      const pre = targets.get(target);
      const {border, font, letterSpacing, lineHeight, padding, wordSpacing} = getComputedStyle(target);
      const {top, left, width, height} = target.getBoundingClientRect();
      pre.style.cssText = `
        position: absolute;
        pointer-events: none;
        overflow: auto;
        box-sizing: border-box;
        top: ${top}px;
        left: ${left}px;
        width: ${width}px;
        height: ${height}px;
        font: ${font};
        letter-spacing: ${letterSpacing};
        word-spacing: ${wordSpacing};
        line-height: ${lineHeight};
        padding: ${padding};
        border: ${border};
        margin: 0;
        background: none;
        border-color: transparent;
      `;
    }
  });
  customElements.define(TAG, HighlightedCode, {extends: 'textarea'});
}

/** @type {HighlightedCode} */
module.exports = customElements.get(TAG);

function _backgroundColor() {
  const code = targets.get(this).querySelector('code');
  code.style.backgroundColor = null;
  const {color, backgroundColor} = getComputedStyle(code);
  this.style.caretColor = color;
  this.style.backgroundColor = backgroundColor;
  code.style.cssText = `
    background-color: transparent;
    overflow: unset;
    margin: 0;
    padding: 0;
  `;
}
