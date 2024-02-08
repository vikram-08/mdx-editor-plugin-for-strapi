import * as React from "react";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  linkPlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  linkDialogPlugin,
  imagePlugin,
  tablePlugin,
  KitchenSinkToolbar,
  frontmatterPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  directivesPlugin,
  diffSourcePlugin,
  markdownShortcutPlugin,
  sandpackPlugin
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";

import { useIntl } from "react-intl";

const Input = React.forwardRef((props, ref) => {
  const { attribute, disabled, intlLabel, name, onChange, required, value } =
    props; // these are just some of the props passed by the content-manager

  const { formatMessage } = useIntl();

  const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim();

  const simpleSandpackConfig = {
    defaultPreset: 'react',
    presets: [
      {
        label: 'React',
        name: 'react',
        meta: 'live react',
        sandpackTemplate: 'react',
        sandpackTheme: 'light',
        snippetFileName: '/App.js',
        snippetLanguage: 'jsx',
        initialSnippetContent: defaultSnippetContent
      },
    ]
  }

  const handleChange = (value) => {
    onChange({
      target: { name: "mdx", type: "text", value: value },
    });
  };

  return (
    <label>
      {formatMessage(intlLabel)}
      <MDXEditor
        markdown={atob("IyBXZWxjb21lCgpUaGlzIGlzIGEgKipsaXZlIGRlbW8qKiBvZiBNRFhFZGl0b3Igd2l0aCBhbGwgZGVmYXVsdCBmZWF0dXJlcyBvbi4KCj4gVGhlIG92ZXJyaWRpbmcgZGVzaWduIGdvYWwgZm9yIE1hcmtkb3du4oCZcyBmb3JtYXR0aW5nIHN5bnRheCBpcyB0byBtYWtlIGl0IGFzIHJlYWRhYmxlIGFzIHBvc3NpYmxlLgo+IFRoZSBpZGVhIGlzIHRoYXQgYSBNYXJrZG93bi1mb3JtYXR0ZWQgZG9jdW1lbnQgc2hvdWxkIGJlIHB1Ymxpc2hhYmxlIGFzLWlzLCBhcyBwbGFpbiB0ZXh0LAo+IHdpdGhvdXQgbG9va2luZyBsaWtlIGl04oCZcyBiZWVuIG1hcmtlZCB1cCB3aXRoIHRhZ3Mgb3IgZm9ybWF0dGluZyBpbnN0cnVjdGlvbnMuCgpb4oCUIERhcmluZyBGaXJlYmFsbF0oaHR0cHM6Ly9kYXJpbmdmaXJlYmFsbC5uZXQvcHJvamVjdHMvbWFya2Rvd24vKS4KCkluIGhlcmUsIHlvdSBjYW4gZmluZCB0aGUgZm9sbG93aW5nIG1hcmtkb3duIGVsZW1lbnRzOgoKKiBIZWFkaW5ncwoqIExpc3RzCiAgKiBVbm9yZGVyZWQKICAqIE9yZGVyZWQKICAqIENoZWNrIGxpc3RzCiAgKiBBbmQgbmVzdGVkIDspCiogTGlua3MKKiBCb2xkL0l0YWxpYy9VbmRlcmxpbmUgZm9ybWF0dGluZwoqIFRhYmxlcwoqIENvZGUgYmxvY2sgZWRpdG9ycwoqIEFuZCBtdWNoIG1vcmUuCgpUaGUgY3VycmVudCBlZGl0b3IgY29udGVudCBpcyBzdHlsZWQgdXNpbmcgdGhlIGBAdGFpbHdpbmRjc3MvdHlwb2dyYXBoeWAgW3BsdWdpbl0oaHR0cHM6Ly90YWlsd2luZGNzcy5jb20vZG9jcy90eXBvZ3JhcGh5LXBsdWdpbikuCgojIyBXaGF0IGNhbiB5b3UgZG8gaGVyZT8KClRoaXMgaXMgYSBncmVhdCBsb2NhdGlvbiBmb3IgeW91IHRvIHRlc3QgaG93IGVkaXRpbmcgbWFya2Rvd24gZmVlbHMuIElmIHlvdSBoYXZlIGFuIGV4aXN0aW5nIG1hcmtkb3duIHNvdXJjZSwgeW91IGNhbiBzd2l0Y2ggdG8gc291cmNlIG1vZGUgdXNpbmcgdGhlIHRvZ2dsZSBncm91cCBpbiB0aGUgdG9wIHJpZ2h0LCBwYXN0ZSBpdCBpbiB0aGVyZSwgYW5kIGdvIGJhY2sgdG8gcmljaCB0ZXh0IG1vZGUuCgpJZiB5b3UgbmVlZCBhIGZldyBpZGVhcywgaGVyZSdzIHdoYXQgeW91IGNhbiB0cnk6CgoxLiBBZGQgeW91ciBvd24gY29kZSBzYW1wbGUKMi4gQ2hhbmdlIHRoZSB0eXBlIG9mIHRoZSBoZWFkaW5ncwozLiBJbnNlcnQgYSB0YWJsZSwgYWRkIGEgZmV3IHJvd3MgYW5kIGNvbHVtbnMKNC4gU3dpdGNoIGJhY2sgdG8gc291cmNlIG1hcmtkb3duIHRvIHNlZSB3aGF0IHlvdSdyZSBnb2luZyB0byBnZXQgYXMgYW4gb3V0cHV0CjUuIFRlc3QgdGhlIGRpZmYgZmVhdHVyZSB0byBzZWUgaG93IHRoZSBtYXJrZG93biBoYXMgY2hhbmdlZAo2LiBBZGQgYSBmcm9udG1hdHRlciBibG9jayB0aHJvdWdoIHRoZSB0b29sYmFyIGJ1dHRvbgoKIyMgQSBjb2RlIHNhbXBsZQoKTURYRWRpdG9yIGVtYmVkcyBDb2RlTWlycm9yIGZvciBjb2RlIGVkaXRpbmcuCgpgYGB0c3gKZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gQXBwKCkgewogIHJldHVybiAoPGRpdj5IZWxsbyB3b3JsZDwvZGl2PikKfQpgYGAKCiMjIEEgbGl2ZSBjb2RlIGV4YW1wbGUKClRoZSBibG9jayBiZWxvdyBpcyBhIGxpdmUgUmVhY3QgY29tcG9uZW50LiBZb3UgY2FuIGNvbmZpZ3VyZSBtdWx0aXBsZSBsaXZlIGNvZGUgcHJlc2V0cyB0aGF0IHNwZWNpZnkgdGhlIGF2YWlsYWJsZSBucG0gcGFja2FnZXMgYW5kIHRoZSBkZWZhdWx0IGltcG9ydHMuIFlvdSBjYW4gYWxzbyBzcGVjaWZ5IGEgZGVmYXVsdCBjb21wb25lbnQgdGhhdCB3aWxsIGJlIHJlbmRlcmVkIGluIHRoZSBsaXZlIGNvZGUgYmxvY2suCgojIyBBIHRhYmxlCgpQbGF5IHdpdGggdGhlIHRhYmxlIGJlbG93IC0gYWRkIHJvd3MsIGNvbHVtbnMsIGNoYW5nZSBjb2x1bW4gYWxpZ25tZW50LiBXaGVuIGVkaXRpbmcsCnlvdSBjYW4gbmF2aWdhdGUgdGhlIGNlbGxzIHdpdGggYGVudGVyYCwgYHNoaWZ0K2VudGVyYCwgYHRhYmAgYW5kIGBzaGlmdCt0YWJgLgoKfCBJdGVtICAgICAgICAgICAgICB8IEluIFN0b2NrIHwgUHJpY2UgfAp8IDotLS0tLS0tLS0tLS0tLS0tIHwgOi0tLS0tLTogfCAtLS0tOiB8CnwgUHl0aG9uIEhhdCAgICAgICAgfCAgIFRydWUgICB8IDIzLjk5IHwKfCBTUUwgSGF0ICAgICAgICAgICB8ICAgVHJ1ZSAgIHwgMjMuOTkgfAp8IENvZGVjYWRlbXkgVGVlICAgIHwgICBGYWxzZSAgfCAxOS45OSB8CnwgQ29kZWNhZGVteSBIb29kaWUgfCAgIEZhbHNlICB8IDQyLjk5IHw=")}
        plugins={[
          toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
          listsPlugin(),
          quotePlugin(),
          headingsPlugin(),
          linkPlugin(),
          linkDialogPlugin(),
          imagePlugin(),
          tablePlugin(),
          thematicBreakPlugin(),
          frontmatterPlugin(),
          codeBlockPlugin({ defaultCodeBlockLanguage: "txt" }),
          codeMirrorPlugin({
            codeBlockLanguages: {
              js: "JavaScript",
              css: "CSS",
              txt: "text",
              tsx: "TypeScript",
            },
          }),
          directivesPlugin(),
          diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
          markdownShortcutPlugin(),
          sandpackPlugin({ sandpackConfig: simpleSandpackConfig })
        ]}
        onChange={handleChange}
      />
    </label>
  );
});

export default Input;
