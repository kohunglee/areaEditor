/**
 * AreaEditor
 * @v1.0
 * @github.com/kohunglee/areaEditor
 * @license MIT
 */
(function (global, factory) {
    if (typeof define === 'function' && define.amd) {  // UMD-compatible mode
        define([], factory);  // AMD support
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();  // CommonJS support
    } else {
        global.AreaEditor = factory();  // Browser global variable
    }
}(this, function () {
    'use strict';

    /**
     * Main constructor
     * @param {HTMLElement|string} element Textarea element or selector
     */
    function AreaEditor(element) {
        if (!(this instanceof AreaEditor)) { return new AreaEditor(element); }
        this.element = typeof element === 'string' ? document.querySelectorAll(element) : element;
        this.init();
    }

    // Initialization
    AreaEditor.prototype.init = function() {
        for(var _i = 0; _i < this.element.length; _i++){
            if (!this.element[_i]) {
                console.error('AreaEditor: Missing element');
                return;
            }
    
            if (this.element[_i].tagName !== 'TEXTAREA') {
                console.error('AreaEditor: The element must be a textarea');
                return;
            }
    
            this.indentType = this._detectFirstIndent(this.element[_i].value);  // Indentation type
            this.tabChar = (this.indentType.type === 'tab') ? '\t' : Array(this.indentType.count + 1).join(' ');  // Indentation character  
            this.tabLength = this.indentType.count;  // Length of indentation character
            this.setupEvents(this.element[_i]);
        }
        
    };

    // Set event listeners
    AreaEditor.prototype.setupEvents = function(element) {
        element.addEventListener('keydown', this.onKeyDown.bind(this));
    };

    // Key event handling
    AreaEditor.prototype.onKeyDown = function(e) {
        var start = e.target.selectionStart;
        var end = e.target.selectionEnd;
        var value = e.target.value;

        // Enter key handling
        if (e.key === 'Enter') {
            e.preventDefault();
            
            var lineStart = value.lastIndexOf('\n', start - 1) + 1;
            var currentLine = value.substring(lineStart, start);
            var indent = currentLine.match(/^\s*/)[0];
            var pairs = {
                '{': '}',
                '[': ']',
                '(': ')',
                '<': '>'
            };
            var lastChar = currentLine.trim().slice(-1);
            var nextChar = value.substring(start, start + 1);
            var newText;
            if (pairs[lastChar]) {  // If current character is an opening bracket
                if (nextChar === pairs[lastChar]) {  // Next character is a closing bracket
                    newText = '\n' + indent + this.tabChar + '\n' + indent;
                } else {
                    newText = '\n' + indent + this.tabChar;
                }
                e.target.value = value.substring(0, start) + newText + value.substring(end);
                e.target.selectionStart = e.target.selectionEnd = start + indent.length + 1 + this.tabLength;
            } else {
                newText = '\n' + indent;
                e.target.value = value.substring(0, start) + newText + value.substring(end);
                e.target.selectionStart = e.target.selectionEnd = start + newText.length;
            }
            return;
        }

        // Auto-complete brackets
        var autoPairs = {
            '{': '}',
            '[': ']',
            '(': ')',
            '"': '"',
            "'": "'",
            '`': '`',
            '<': '>'
        };
        if (['{', '(', '[', '<', '"', "'", '`', ']', '}', ')', '>'].includes(e.key) && start === end) {
            e.preventDefault();
            var pairChar = autoPairs[e.key]  || '';
            if (['"', "'", '`', ']', '}', ')', '>'].includes(e.key) && e.target.value.charAt(start) === e.key) {  // don't insert if next character is already the specified character
                e.target.selectionStart = this.selectionEnd = start + 1;
                return;
            }
            e.target.value = value.substring(0, start) + e.key + pairChar + value.substring(start);
            e.target.selectionStart = e.target.selectionEnd = start + 1;
        }

        // TAB key related
        if (e.key === 'Tab') {
            e.preventDefault();
            if (start === end) {  // No text selected by cursor
                e.target.value = value.substring(0, start) + this.tabChar + value.substring(end);
                e.target.selectionStart = e.target.selectionEnd = start + this.tabLength;
                return;
            } else {
                var contentArr = value.split('\n');
                var contentArrOriginal = value.split('\n');
                var startLine = (value.substring(0, start).match(/\n/g) || []).length;
                var endLine = (value.substring(0, end).match(/\n/g) || []).length;
                if (event.shiftKey) {  // If shift is pressed (reduce indentation)
                    for (var _i = startLine; _i <= endLine; _i++) {
                        contentArr[_i] = this._removeLeadingSpaces(contentArr[_i], this.tabLength);
                    }
                    e.target.value = contentArr.join('\n');
                    var lengthDiff = contentArrOriginal[startLine].length - contentArrOriginal[startLine].trimStart().length; // Count indentation at start's line
                    var moveLength = Math.min(this.tabLength, lengthDiff);
                    var limitLineNum = this._arrSum(contentArr, startLine); // Calculate minimum reducible value for start (e.g. prevent start from moving from line 5 to 4 when reducing indentation)
                    var startPoint = limitLineNum > start - moveLength - startLine ? limitLineNum + startLine : start - moveLength; // Handle case where selection starts at indentation (on whitespace)
                    e.target.selectionStart = lengthDiff > 0 ? startPoint : start;
                    e.target.selectionEnd = end - (contentArrOriginal.join('\n').length - e.target.value.length);
                } else {  // Tab pressed alone (increase indentation)
                    for (var _i = startLine; _i <= endLine; _i++) {
                        contentArr[_i] = this.tabChar + contentArr[_i];
                    }
                    e.target.value = contentArr.join('\n');
                    e.target.selectionStart = start + this.tabLength;
                    e.target.selectionEnd = end + this.tabLength * (startLine === endLine ? 1 : endLine - startLine + 1);
                }
            }
        }

    };

    // Get first indentation of document
    AreaEditor.prototype._detectFirstIndent = function(fileContent) {
        var lines = fileContent.split('\n');
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.length > 0 && /^\s/.test(line)) {
            var indent = line.match(/^\s+/)[0];
            var type = indent.indexOf('\t') !== -1 ? 'tab' : 'space';
            var count = (type === 'tab') ? 1 : indent.length;
            return { type: type, count: count };
            }
        }
        return { type: 'space', count: 4 }; // Default indentation is 4 spaces
    };

     // Remove specified number of leading indentation characters from text string
    AreaEditor.prototype._removeLeadingSpaces = function(str, n) {
        var regex = new RegExp("^([ \\t]{0,".concat(n, "})"));
        return str.replace(regex, '');
    };

    // This function calculates sum of first n characters' length in string array
    AreaEditor.prototype._arrSum = function(a, n) {
        var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        return a.slice(0, n).map(function (x) {
            return s += x.length;
        }), s;
    };

    return AreaEditor;
}));
