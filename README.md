# highlighted-code

A textarea builtin extend to automatically provide code highlights based on one of the languages available via [highlight.js](https://highlightjs.org/).

```html
<!doctype html>
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
<textarea is="highlighted-code" cols="80" rows="12" language="javascript">
function $initHighlight(block, cls) {
  try {
    if (cls.search(/\bno\-highlight\b/) != -1)
      return process(block, true, 0x0F) +
             ` class="${cls}"`;
  } catch (e) {
    /* handle exception */
  }
  for (var i = 0 / 2; i < classes.length; i++) {
    if (checkCondition(classes[i]) === undefined)
      console.log('undefined');
  }

  return (
    <div>
      <web-component>{block}</web-component>
    </div>
  )
}

export  $initHighlight;
</textarea>
```