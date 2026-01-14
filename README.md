# ShiKi loader

[ShiKi](https://github.com/shikijs/shiki) is a beautiful syntax highlighter based on TextMate grammar, accurate and powerful.

The shiki loader is a esm's module of shiki package for browser or node.js.

## Installation

```
npm install @jhuix/shiki-loader

```

## Usage

For node.js:


```typescript
import shiki from '@jhuix/shiki-loader';

const code = `
let i = 0;

console.log(i);
`;

shiki.codeToHtml(code, { lang: 'javascript', theme: 'github-light' }).then((output) => {
  console.log(output);
});

```

For browser:

```html

<script type="module" src="https://path/to/@jhuix/shiki-loader/dist/index.js">
  const code = `
  let i = 0;

  console.log(i);
  `;

  Shiki.codeToHtml(code, { lang: 'javascript', theme: 'github-light' }).then((output) => {
    console.log(output);
  });
</script>

```

OR

```html

<script type="module">
  import * as shiki from "https://path/to/@jhuix/shiki-loader/dist/index.js";

  const code = `
  let i = 0;

  console.log(i);
  `;

  shiki.codeToHtml(code, { lang: 'javascript', theme: 'github-light' }).then((output) => {
    console.log(output);
  });
</script>

```

## License

[MIT](LICENSE) © 2025 [Jhuix](mailto:jhuix0117@gmail.com) (Hui Jin)
