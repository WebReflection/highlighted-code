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

  const {default: HighlightedCode} =
    await import('https://unpkg.com/highlighted-code');

  // bootstrap a theme through one of these names
  // https://github.com/highlightjs/highlight.js/tree/main/src/styles
  HighlightedCode.useTheme('github-dark');
})(self);
</script>
<textarea is="highlighted-code"
          cols="80" rows="12"
          language="javascript" tab-size="2">
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


## F.A.Q.

<details>
  <summary><strong>How to disable editing?</strong></summary>
  <div>

You can either `textarea.disabled = true` or:

```html
<textarea is="highlighted-code" language="css" disabled>
textarea[is="highlighted-code"]::before {
  content: "it's that simple!";
}
</textarea>
```

  </div>
</details>

<details>
  <summary><strong>How to disable spellcheck?</strong></summary>
  <div>

You can either `textarea.spellcheck = false` or:

```html
<textarea is="highlighted-code" language="css" spellcheck="false">
textarea[is="highlighted-code"]::before {
  content: "it's that simple!";
}
</textarea>
```

  </div>
</details>

<details>
  <summary><strong>How to set cols or rows?</strong></summary>
  <div>

```html
<textarea is="highlighted-code" language="css" cols="40" rows="12">
textarea[is="highlighted-code"]::before {
  content: "it's that simple!";
}
</textarea>
```

  </div>
</details>

<details>
  <summary><strong>How to set a placeholder?</strong></summary>
  <div>

```html
<textarea is="highlighted-code" language="css"
          placeholder="write css..."></textarea>
```

  </div>
</details>

<details>
  <summary><strong>How to ...?</strong></summary>
  <div>

Look, this is a custom element builtin extend.

If you know how and when to use a textarea, you're 90% done with this module.

Now you need just the `is` attribute with value `highlighted-code`, a `language` attribute with a supported language from *highlight.js* library,
optionally a `tab-size` attribute to have tabs wider than 2, and a theme, where `default` would work too, as long as `HighlightedCode.useTheme('default')` is invoked.

  </div>
</details>
