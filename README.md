# areaEditor
A lightweight (&lt;2kb) web-based editor using JavaScript to enhance &lt;textarea> with smart indentation &amp; bracket pairing for smoother coding.

# demo

https://www.ccgxk.com/areaEditorjs.html

## Introduction‌
`areaEditor.js` is an enhanced `<textarea>` runtime library developed based on several `JavaScript APIs` for manipulating the native HTML text editing box element `<textarea>`. It weighs less than 2kb but significantly improves your code-editing experience.

## Features‌

### 1.Press TAB for indentation control‌

Pressing the `tab` key inserts one indentation unit.

Additionally, in the following scenario, pressing the `tab` key shifts the selected code (highlighted in blue) one unit to the right:

Before

<a href="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221705557NKzPT.png">
    <img loading="lazy" class="thisis-temp-class"   src="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221705557NKzPT.png-testccgxk" alt="img">
</a>

After

<a href="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221706527NPvAY.png">
    <img loading="lazy" class="thisis-temp-class"   src="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221706527NPvAY.png-testccgxk" alt="img">
</a>


Of course, pressing ‌`tab + shift‌` simultaneously shifts the indentation one unit to the left.

<a href="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221708057NxHqr.png">
    <img loading="lazy" class="thisis-temp-class"   src="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221708057NxHqr.png-testccgxk" alt="img">
</a>

### 2.Smart indentation detection‌

There are three common indentation types: four spaces, eight spaces, or one tab character (`\t`). So, which does `areaEditor.js` use?

By default, areaEditor.js uses ‌four spaces‌ (for an empty textbox), but it intelligently detects and adjusts to the document's existing indentation style, adopting the first indentation it encounters as the standard.

Note: To avoid confusion, when pressing the ‌`backspace‌` key, it deletes spaces one by one rather than removing an entire indentation unit at once.

### 3.Smart bracket pairing‌

When typing symbols like  <code>{ } [ ] ( ) &lt; > ' " `</code> , it auto-completes them like other code editors:

Example

<a href="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221747037NcXxQ.png">
    <img loading="lazy" class="thisis-temp-class"   src="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221747037NcXxQ.png-testccgxk" alt="img">
</a>

If you manually complete the symbol by typing it again, the auto-completion is ignored.

### 4.Indentation after closing symbols‌

‌Case 1‌: If the cursor is between paired symbols like <code>{ }, [ ], ( ), or &lt; > </code>, pressing ‌Enter‌ automatically adds a new line with one indentation unit:

Before

<a href="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221733527NGm0I.png">
    <img loading="lazy" class="thisis-temp-class"   src="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221733527NGm0I.png-testccgxk" alt="img">
</a>

After pressing Enter:

<a href="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221734197N99Yh.png">
    <img loading="lazy" class="thisis-temp-class"   src="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221734197N99Yh.png-testccgxk" alt="img">
</a>

‌Case 2‌: If the cursor is positioned right after an opening symbol (`{, [, (, or <`), pressing ‌Enter‌ also adds a new line with one indentation unit:

Before

<a href="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221750047NyxYO.png">
    <img loading="lazy" class="thisis-temp-class"   src="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221750047NyxYO.png-testccgxk" alt="img">
</a>


After pressing Enter:

<a href="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221750437NkQw4.png">
    <img loading="lazy" class="thisis-temp-class"   src="https://img1.ccgxk.com/ccgxk-oss/2025/04/202504221750437NkQw4.png-testccgxk" alt="img">
</a>


## How to Include the Code‌

## Why This Design?‌

When designing web pages, we sometimes need to edit code directly on the page. The usual approach is to use a native <code>&lt;textarea></code>, but this offers a poor experience. Alternatively, we could integrate full-fledged code editors like ‌[Code Mirror](https://codemirror.net/ "Code Mirror") or [Ace](https://ace.c9.io/ "Ace"), but their size is excessive (even minified versions often exceed 100kb), making them overkill for simple pages.

In reality, for basic code editing, features like syntax highlighting, autocompletion, or bracket hints aren’t always essential—‌indentation is the real necessity‌. By solving just this problem, we can dramatically improve the webpage’s usability.

To maintain the library’s lightweight nature, no additional features will likely be added in the future. Instead, the focus will remain on refining the four core functionalities described above.
