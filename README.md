# areaEditor
A lightweight (&lt;2kb) mini web-based editor using JavaScript to enhance &lt;textarea> with smart indentation &amp; bracket pairing for smoother coding.

![image](https://github.com/user-attachments/assets/fcb09041-6a9e-4ca8-96fa-9261780089af)

# demo

https://www.ccgxk.com/areaEditorjs.html

## Introduction‌
`areaEditor.js` is an enhanced `<textarea>` runtime library developed based on several `JavaScript APIs` for manipulating the native HTML text editing box element `<textarea>`. It weighs less than 2kb but significantly improves your code-editing experience.

## Features‌

### 1. Press TAB for indentation control‌

Pressing the `tab` key inserts one indentation unit.

Additionally, in the following scenario, pressing the `tab` key shifts the selected code (highlighted in blue) one unit to the right:

Before

![image](https://github.com/user-attachments/assets/ba5bc7a7-8061-4057-b8eb-249f3e11f74a)

After

![image](https://github.com/user-attachments/assets/5e38fba0-3f09-4037-8938-7452ba29dfcd)

Of course, pressing ‌`tab + shift‌` simultaneously shifts the indentation one unit to the left.

![image](https://github.com/user-attachments/assets/375f9301-b3f2-4ae9-b4aa-370a03c215cc)

### 2. Smart indentation detection‌

There are three common indentation types: four spaces, eight spaces, or one tab character (`\t`). So, which does `areaEditor.js` use?

By default, areaEditor.js uses ‌four spaces‌ (for an empty textbox), but it intelligently detects and adjusts to the document's existing indentation style, adopting the first indentation it encounters as the standard.

Note: To avoid confusion, when pressing the ‌`backspace‌` key, it deletes spaces one by one rather than removing an entire indentation unit at once.

### 3. Smart bracket pairing‌

When typing symbols like  <code>{ } [ ] ( ) &lt; > ' " `</code> , it auto-completes them like other code editors:

Example

![image](https://github.com/user-attachments/assets/9a7e94a4-cc21-42ff-8e46-5742097a55b0)

If you manually complete the symbol by typing it again, the auto-completion is ignored.

### 4. Indentation after closing symbols‌

‌Case 1‌: If the cursor is between paired symbols like <code>{ }, [ ], ( ), or &lt; > </code>, pressing ‌Enter‌ automatically adds a new line with one indentation unit:

Before

![image](https://github.com/user-attachments/assets/9a6b22ac-a0a9-4ee3-92f4-8295c3ba7a42)

After pressing Enter:

![image](https://github.com/user-attachments/assets/c3b9efde-0ea7-47d9-b69f-cb866f65ad1f)

‌Case 2‌: If the cursor is positioned right after an opening symbol (`{, [, (, or <`), pressing ‌Enter‌ also adds a new line with one indentation unit:

Before

![image](https://github.com/user-attachments/assets/f2ac2573-fec0-42e5-9a4f-2ab3f67a8fcc)

After pressing Enter:

![image](https://github.com/user-attachments/assets/11709e89-c9e3-4b32-aa5e-4cb4a98b273c)


## How to Include the Code‌

### 1. Download from GitHub
Download the complete package from https://github.com/kohunglee/areaEditor or [click here to download].

### 2. Import via jsDelivr

We provide three versions of the file:

- Development version (with comments, raw version 7.8KB)
- Standard minified version (3.23KB)
- Ultra-minified version (1.74KB)

Their respective jsDelivr URLs are:

```markdown
https://cdn.jsdelivr.net/gh/kohunglee/areaeditor/src/areaeditor.1.1.js
https://cdn.jsdelivr.net/gh/kohunglee/areaeditor/src/areaeditor.1.1.min.js
https://cdn.jsdelivr.net/gh/kohunglee/areaeditor/src/areaeditor.1.1.x.min.js
```

### Activation Method

You can use it in HTML like this:

```html
<textarea></textarea>
<script src="https://cdn.jsdelivr.net/gh/kohunglee/areaeditor/src/areaeditor.1.1.x.min.js" integrity="sha384-+vfsvi7N0nVQf4Tblj94ynWzrYyimaK1LTSLBS5XYZ2LaDUEGc5OUADMEbTbTDrr" crossorigin="anonymous"></script>
<script>
    var editor = new AreaEditor('textarea');
</script>
```

The parameter for `AreaEditor()` works the same way as `document.querySelectorAll()`.

```JavaScript
var editor = new AreaEditor('textarea'); // Selects all textarea elements
var editor = new AreaEditor('.code-editor'); // Selects all textarea elements with class "code-editor"
var editor = new AreaEditor('#code-editor'); // Selects the textarea element with ID "code-editor"
```

## Why This Design?‌

When designing web pages, we sometimes need to edit code directly on the page. The usual approach is to use a native <code>&lt;textarea></code>, but this offers a poor experience. Alternatively, we could integrate full-fledged code editors like ‌[Code Mirror](https://codemirror.net/ "Code Mirror") or [Ace](https://ace.c9.io/ "Ace"), but their size is excessive (even minified versions often exceed 100kb), making them overkill for simple pages.

In reality, for basic code editing, features like syntax highlighting, autocompletion, or bracket hints aren’t always essential—‌indentation is the real necessity‌. By solving just this problem, we can dramatically improve the webpage’s usability.

To maintain the library’s lightweight nature, no additional features will likely be added in the future. Instead, the focus will remain on refining the four core functionalities described above.
