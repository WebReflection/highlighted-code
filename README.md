# highlighted-code

A textarea builtin extend to automatically provide code highlights based on one of the languages available via [highlight.js](https://highlightjs.org/).

**[Live demo](https://webreflection.github.io/highlighted-code/test/demo.html)**

```html
<!doctype html>
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<style>
textarea[is="highlighted-code"] { padding: 8px; }
</style>
<script type="module">
(async ({chrome, netscape}) => {

  // add Safari polyfill if needed
  if (!chrome && !netscape)
    await import('https://unpkg.com/@ungap/custom-elements');

  const {default: HighlightedCode} = await import('https://unpkg.com/highlighted-code');

  // bootstrap a theme through one of these names
  // https://github.com/highlightjs/highlight.js/tree/main/src/styles
  HighlightedCode.useTheme('github-dark');
})(self);
</script>
<textarea is="highlighted-code" cols="80" rows="12" language="javascript" tab-size="2">
(async ({chrome, netscape}) => {

  // add Safari polyfill if needed
  if (!chrome && !netscape)
    await import('https://unpkg.com/@ungap/custom-elements');

  const {default: HighlightedCode} = await import('https://unpkg.com/highlighted-code');

  // bootstrap a theme through one of these names
  // https://github.com/highlightjs/highlight.js/tree/main/src/styles
  HighlightedCode.useTheme('github-dark');
})(self);
</textarea>
```