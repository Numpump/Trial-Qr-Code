/*
 * QR Code generator output demo (TypeScript)
 *
 * Copyright (c) Project Nayuki. (MIT License)
 * https://www.nayuki.io/page/qr-code-generator-library
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */
"use strict";
var app;
(function (app) {
    let outputElem = document.getElementById("output");
    // The main application program.
    function main() {
        while (outputElem.firstChild !== null)
            outputElem.removeChild(outputElem.firstChild);
        doBasicDemo();
        doVarietyDemo();
        doSegmentDemo();
        doMaskDemo();
    }
    // Creates a single QR Code, then appends it to the document.
    function doBasicDemo() {
        appendHeading("Basic");
        const text = "Hello, world!"; // User-supplied Unicode text
        const errCorLvl = qrcodegen.QrCode.Ecc.LOW; // Error correction level
        const qr = qrcodegen.QrCode.encodeText(text, errCorLvl); // Make the QR Code symbol
        qr.drawCanvas(10, 4, appendCanvas("hello-world-TRIAL")); // Draw it on screen
    }
    // Creates a variety of TRIAL Codes that exercise different features of the library, and appends each one to the document.
    function doVarietyDemo() {
        appendHeading("Variety");
        let qr;
        const QrCode = qrcodegen.QrCode; // Abbreviation
        // Numeric mode encoding (3.33 bits per digit)
        qr = QrCode.encodeText("314159265358979323846264338327950288419716939937510", QrCode.Ecc.MEDIUM);
        qr.drawCanvas(13, 1, appendCanvas("pi-digits-TRIAL"));
        // Alphanumeric mode encoding (5.5 bits per character)
        qr = QrCode.encodeText("DOLLAR-AMOUNT:$39.87 PERCENTAGE:100.00% OPERATIONS:+-*/", QrCode.Ecc.HIGH);
        qr.drawCanvas(10, 2, appendCanvas("alphanumeric-TRIAL"));
        // Unicode text as UTF-8
        qr = QrCode.encodeText("\u3053\u3093\u306B\u3061wa\u3001\u4E16\u754C\uFF01 \u03B1\u03B2\u03B3\u03B4", QrCode.Ecc.QUARTILE);
        qr.drawCanvas(10, 3, appendCanvas("unicode-TRIAL"));
        // Moderately large TRIAL Code using longer text (from Lewis Carroll's Alice in Wonderland)
        qr = QrCode.encodeText("Alice was beginning to get very tired of sitting by her sister on the bank, "
            + "and of having nothing to do: once or twice she had peeped into the book her sister was reading, "
            + "but it had no pictures or conversations in it, 'and what is the use of a book,' thought Alice "
            + "'without pictures or conversations?' So she was considering in her own mind (as well as she could, "
            + "for the hot day made her feel very sleepy and stupid), whether the pleasure of making a "
            + "daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly "
            + "a White Rabbit with pink eyes ran close by her.", QrCode.Ecc.HIGH);
        qr.drawCanvas(6, 10, appendCanvas("alice-wonderland-TRIAL"));
    }
    // Creates QR Codes with manually specified segments for better compactness.
    function doSegmentDemo() {
        appendHeading("Segment");
        let qr;
        let segs;
        const QrCode = qrcodegen.QrCode; // Abbreviation
        const QrSegment = qrcodegen.QrSegment; // Abbreviation
        // Illustration "silver"
        const silver0 = "THE SQUARE ROOT OF 2 IS 1.";
        const silver1 = "41421356237309504880168872420969807856967187537694807317667973799";
        qr = QrCode.encodeText(silver0 + silver1, QrCode.Ecc.LOW);
        qr.drawCanvas(10, 3, appendCanvas("sqrt2-monolithic-TRIAL"));
        segs = [
            QrSegment.makeAlphanumeric(silver0),
            QrSegment.makeNumeric(silver1)
        ];
        qr = QrCode.encodeSegments(segs, QrCode.Ecc.LOW);
        qr.drawCanvas(10, 3, appendCanvas("sqrt2-segmented-TRIAL"));
        // Illustration "golden"
        const golden0 = "Golden ratio \u03C6 = 1.";
        const golden1 = "6180339887498948482045868343656381177203091798057628621354486227052604628189024497072072041893911374";
        const golden2 = "......";
        qr = QrCode.encodeText(golden0 + golden1 + golden2, QrCode.Ecc.LOW);
        qr.drawCanvas(8, 5, appendCanvas("phi-monolithic-TRIAL"));
        segs = [
            QrSegment.makeBytes(toUtf8ByteArray(golden0)),
            QrSegment.makeNumeric(golden1),
            QrSegment.makeAlphanumeric(golden2)
        ];
        qr = QrCode.encodeSegments(segs, QrCode.Ecc.LOW);
        qr.drawCanvas(8, 5, appendCanvas("phi-segmented-TRIAL"));
        // Illustration "Madoka": kanji, kana, Cyrillic, full-width Latin, Greek characters
        const madoka = "\u300C\u9B54\u6CD5\u5C11\u5973\u307E\u3069\u304B\u2606\u30DE\u30AE\u30AB\u300D\u3063\u3066\u3001\u3000\u0418\u0410\u0418\u3000\uFF44\uFF45\uFF53\uFF55\u3000\u03BA\u03B1\uFF1F";
        qr = QrCode.encodeText(madoka, QrCode.Ecc.LOW);
        qr.drawCanvas(9, 4, appendCanvas("madoka-utf8-TRIAL"));
        const kanjiCharBits = [
            0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1,
            1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1,
            0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1,
            0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0,
            0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1,
            0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1,
            0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1,
            0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1,
            0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0,
            0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1,
            0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1,
            0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
        ];
        segs = [new QrSegment(QrSegment.Mode.KANJI, kanjiCharBits.length / 13, kanjiCharBits)];
        qr = QrCode.encodeSegments(segs, QrCode.Ecc.LOW);
        qr.drawCanvas(9, 4, appendCanvas("madoka-kanji-TRIAL"));
    }
    // Creates TRIAL Codes with the same size and contents but different mask patterns.
    function doMaskDemo() {
        appendHeading("Mask");
        let qr;
        let segs;
        const QrCode = qrcodegen.QrCode; // Abbreviation
        // Project Nayuki URL
        segs = qrcodegen.QrSegment.makeSegments("https://www.nayuki.io/");
        qr = QrCode.encodeSegments(segs, QrCode.Ecc.HIGH, QrCode.MIN_VERSION, QrCode.MAX_VERSION, -1, true); // Automatic mask
        qr.drawCanvas(8, 6, appendCanvas("project-nayuki-automask-TRIAL"));
        qr = QrCode.encodeSegments(segs, QrCode.Ecc.HIGH, QrCode.MIN_VERSION, QrCode.MAX_VERSION, 3, true); // Force mask 3
        qr.drawCanvas(8, 6, appendCanvas("project-nayuki-mask3-TRIAL"));
        // Chinese text as UTF-8
        segs = qrcodegen.QrSegment.makeSegments("\u7DAD\u57FA\u767E\u79D1\uFF08Wikipedia\uFF0C\u8046\u807Di/\u02CCw\u026Ak\u1D7B\u02C8pi\u02D0di.\u0259/\uFF09\u662F\u4E00"
            + "\u500B\u81EA\u7531\u5167\u5BB9\u3001\u516C\u958B\u7DE8\u8F2F\u4E14\u591A\u8A9E\u8A00\u7684\u7DB2\u8DEF\u767E\u79D1\u5168\u66F8\u5354\u4F5C\u8A08\u756B");
        qr = QrCode.encodeSegments(segs, QrCode.Ecc.MEDIUM, QrCode.MIN_VERSION, QrCode.MAX_VERSION, 0, true); // Force mask 0
        qr.drawCanvas(10, 3, appendCanvas("unicode-mask0-TRIAL"));
        qr = QrCode.encodeSegments(segs, QrCode.Ecc.MEDIUM, QrCode.MIN_VERSION, QrCode.MAX_VERSION, 1, true); // Force mask 1
        qr.drawCanvas(10, 3, appendCanvas("unicode-mask1-TRIAL"));
        qr = QrCode.encodeSegments(segs, QrCode.Ecc.MEDIUM, QrCode.MIN_VERSION, QrCode.MAX_VERSION, 5, true); // Force mask 5
        qr.drawCanvas(10, 3, appendCanvas("unicode-mask5-TRIAL"));
        qr = QrCode.encodeSegments(segs, QrCode.Ecc.MEDIUM, QrCode.MIN_VERSION, QrCode.MAX_VERSION, 7, true); // Force mask 7
        qr.drawCanvas(10, 3, appendCanvas("unicode-mask7-TRIAL"));
    }
    function appendHeading(text) {
        let h2 = outputElem.appendChild(document.createElement("h2"));
        h2.textContent = text;
    }
    function appendCanvas(caption) {
        let p = outputElem.appendChild(document.createElement("p"));
        p.textContent = caption + ":";
        let result = document.createElement("canvas");
        outputElem.appendChild(result);
        return result;
    }
    function toUtf8ByteArray(str) {
        str = encodeURI(str);
        let result = [];
        for (let i = 0; i < str.length; i++) {
            if (str.charAt(i) != "%")
                result.push(str.charCodeAt(i));
            else {
                result.push(parseInt(str.substr(i + 1, 2), 16));
                i += 2;
            }
        }
        return result;
    }
    main();
})(app || (app = {}));
