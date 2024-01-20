(function () {
    window.onload = function () {
        document.getElementById("my-avatar-image").src = "img/rick-avatar.png";

        function addEventListenerForMenuItems(...strIDs) {
            let elements = Array();
            strIDs.forEach((strID) => {
                elements.push(document.getElementById(strID));
            });

            elements.forEach((element) => {
                element.addEventListener("click", function () {
                    elements.forEach((ele) => {
                        if (element === ele) {
                            if (
                                !element.classList.contains(
                                    "menu-item-selection"
                                )
                            ) {
                                element.classList.add("menu-item-selection");
                            }
                        } else {
                            ele.classList.remove("menu-item-selection");
                        }
                    });
                    console.log(this.dataset.link);
                });
            });
        }

        addEventListenerForMenuItems(
            "menu-item-card-home",
            "menu-item-card-writing",
            "menu-item-card-journey",
            "menu-item-card-about"
        );
        // ----------------------------------------------------------

        /* 
        // 拦截a标签点击事件

var links = document.querySelectorAll('.custom-link');

            // 为每个链接添加点击事件监听器
            links.forEach(function(link) {
                link.addEventListener('click', function(event) {
                    // 阻止默认的链接跳转行为
                    event.preventDefault();

                    // 获取链接的目标地址
                    var targetUrl = link.getAttribute('href');

                    // 在这里你可以执行其他逻辑，比如加载内容、动画效果等

                    // 修改浏览器地址栏的地址
                    window.history.pushState(null, '', targetUrl);
                });
            });
            // 在这个例子中，我们使用了 window.history.pushState 方法来修改浏览器地址栏的地址。请注意，这只会更改地址栏上显示的地址，不会触发浏览器的实际页面导航。这样的行为对于单页应用（Single Page Application，SPA）等场景可能比较常见。

// 请谨慎使用这种技术，因为在某些情况下，更改地址栏的地址可能会导致用户迷惑或影响用户体验。确保你的应用场景和用户交互设计合理。

        */
        /*
        var symbolOfEn = `.?!,:…;-–—()[]{}"'/`;
        var symbolOfEnSet = new Set();
        for (let c of symbolOfEn) {
            symbolOfEnSet.add(c.codePointAt(0));
        }
        var symbolOfZh = `。？！，、；：“”﹃﹄‘’﹁﹂（）［］〔〕【】－～·《》〈〉﹏＿`;
        var symbolOfZhSet = new Set();
        for (let c of symbolOfZh) {
            symbolOfZhSet.add(c.codePointAt(0));
        }

        var symbolOfAllSet = new Set([...symbolOfEnSet, ...symbolOfZhSet]);
        var symbolOfOthers = `+￥÷ 「」﹁﹂『』﹃﹄@#$%^&*<>|\\`;
        for (let c of symbolOfOthers) {
            symbolOfAllSet.add(c.codePointAt(0));
        }
        symbolOfAllSet.add(9); // tab
        symbolOfAllSet.add(10); // enter

        // var eLogoWrapper = document.getElementById("title-logo-wrapper");
        // eLogoWrapper.addEventListener("click", function () {
        //     window.open("https://www.wordcounter007.com");
        // });

        // 监听textarea
        var eTextArea = document.getElementById("word-count-text-area");
        // 全部
        var eCounterAllWords = document.getElementById(
            "counter-result-word-count-value"
        );
        // 汉字
        var eCounterChineseC = document.getElementById(
            "counter-result-zh-word-count-value"
        );
        // 行数
        var eCounterLine = document.getElementById(
            "counter-result-line-count-value"
        );
        // 英文字母
        var eCounterEnglishCharC = document.getElementById(
            "counter-result-en-char-count-value"
        );
        // 英文单词
        var eCounterEnglishWordC = document.getElementById(
            "counter-result-en-word-count-value"
        );
        // 中文标点
        var eCounterChineseSymbolC = document.getElementById(
            "counter-result-zh-symbol-count-value"
        );
        // 英文标点
        var eCounterEnglishSymbolC = document.getElementById(
            "counter-result-en-symbol-count-value"
        );
        // 中英标点
        var eCounterAllSymbolC = document.getElementById(
            "counter-result-all-symbol-count-value"
        );

        eTextArea.addEventListener("input", function () {
            if (this.value.length > 100000 && Promise !== undefined) {
                updateCounterTextAsync(this).then((resultArr) => {
                    updateCounterTextByResult(resultArr);
                });
            } else {
                let resultArr = updateCounterTextDirectly(this);
                updateCounterTextByResult(resultArr);
            }
        });

        function updateCounterTextByResult(resultArr) {
            eCounterAllWords.innerText = resultArr[0];
            eCounterChineseC.innerText = resultArr[1];
            eCounterLine.innerText = resultArr[2];
            eCounterEnglishCharC.innerText = resultArr[3];
            eCounterEnglishWordC.innerText = resultArr[4];
            eCounterChineseSymbolC.innerText = resultArr[5];
            eCounterEnglishSymbolC.innerText = resultArr[6];
            eCounterAllSymbolC.innerText = resultArr[7];
        }
        function updateCounterTextDirectly(textarea) {
            let counterOfAllWord = 0;
            let counterOfChineseCharacter = 0;
            let counterOfLine = 0;
            let counterOfEnglishChar = 0;
            let counterOfEnglishWord = 0;
            let counterOfSymbolCharacterAll = 0;
            let counterOfSymbolCharacterEn = 0;
            let counterOfSymbolCharacterZh = 0;

            let currentCharIsEnglish = false;

            for (let c of textarea.value) {
                counterOfAllWord++;

                let codePoint = c.codePointAt(0);
                if (isEnglishC(codePoint)) {
                    counterOfEnglishChar++;
                    currentCharIsEnglish = true;
                } else if (isChineseC(codePoint)) {
                    counterOfChineseCharacter++;
                    if (currentCharIsEnglish) {
                        currentCharIsEnglish = false;
                        counterOfEnglishWord++;
                    }
                } else if (isNextLineC(codePoint)) {
                    counterOfLine++;
                    if (currentCharIsEnglish) {
                        currentCharIsEnglish = false;
                        counterOfEnglishWord++;
                    }
                } else if (isSymbolAll(codePoint)) {
                    counterOfSymbolCharacterAll++;
                    if (currentCharIsEnglish) {
                        currentCharIsEnglish = false;
                        counterOfEnglishWord++;
                    }
                    if (isSymbolEn(codePoint)) {
                        counterOfSymbolCharacterEn++;
                    } else if (isSymbolZh(codePoint)) {
                        counterOfSymbolCharacterZh++;
                    }
                }
            }
            counterOfLine++;
            return [
                counterOfAllWord,
                counterOfChineseCharacter,
                counterOfLine,
                counterOfEnglishChar,
                counterOfEnglishWord,
                counterOfSymbolCharacterZh,
                counterOfSymbolCharacterEn,
                counterOfSymbolCharacterAll,
            ];
        }
        async function updateCounterTextAsync(textarea) {
            let counterArr = await updateCounterTextDirectly(textarea);
            return counterArr;
        }

        function isEnglishC(codePoint) {
            if (
                (65 <= codePoint && codePoint <= 90) ||
                (97 <= codePoint && codePoint <= 122)
            ) {
                return true;
            }
            return false;
        }

        function isChineseC(codePoint) {
            if (19968 <= codePoint && codePoint <= 40959) {
                return true;
            }
            return false;
        }

        function isNextLineC(codePoint) {
            return codePoint === 0x0a;
        }

        function isSymbolAll(codePoint) {
            return symbolOfAllSet.has(codePoint);
        }

        function isSymbolEn(codePoint) {
            return symbolOfEnSet.has(codePoint);
        }

        function isSymbolZh(codePoint) {
            return symbolOfZhSet.has(codePoint);
        }

        function toast(str) {
            Toastify({
                text: str,
                duration: 3000,
                gravity: "top", // `top` or `bottom`
                position: "center", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "#0b2447",
                    borderRadius: "8px",
                },
                onClick: function () {}, // Callback after click
            }).showToast();
        }

        function addClickCopyFunction(elementID, title, toastMessage) {
            if (navigator.clipboard) {
                var element = document.getElementById(elementID);
                element.onclick = function () {
                    navigator.clipboard.writeText(element.innerText);
                    toast(toastMessage);
                };
                element.setAttribute("title", title);
            }
        }

        function addClickCopyFunctionForCounterButton(elementID) {
            addClickCopyFunction(elementID, "点击复制数字", "复制成功");
        }

        addClickCopyFunctionForCounterButton("counter-result-word-count-value");
        addClickCopyFunctionForCounterButton(
            "counter-result-zh-word-count-value"
        );
        addClickCopyFunctionForCounterButton("counter-result-line-count-value");
        addClickCopyFunctionForCounterButton(
            "counter-result-en-char-count-value"
        );
        addClickCopyFunctionForCounterButton(
            "counter-result-en-word-count-value"
        );
        addClickCopyFunctionForCounterButton(
            "counter-result-zh-symbol-count-value"
        );
        addClickCopyFunctionForCounterButton(
            "counter-result-en-symbol-count-value"
        );
        addClickCopyFunctionForCounterButton(
            "counter-result-all-symbol-count-value"
        );

        let eColorSchemeToggle = document.getElementById("color-scheme-toggle");
        eColorSchemeToggle.onclick = function () {
            (isDarkMode = !isDarkMode),
                sessionStorage.setItem("isDarkMode", isDarkMode),
                updateMode(isDarkMode);
        };

        let eInstructionWrapper = document.getElementById(
            "instruction-wrapper"
        );
        function scrollToInstruction() {
            console.log("scrollToInstruction()");
            window.scrollTo({
                left: 0,
                top: eInstructionWrapper.getBoundingClientRect().top,
                behavior: "smooth", // 可选值：smooth、instant、auto
            });
        }

        let eContentAsideTitleInstruction = document.getElementById(
            "content-aside-title-instruction-image"
        );
        eContentAsideTitleInstruction.addEventListener("click", function () {
            scrollToInstruction();
        });
        let eTitleButtonInstruction = document.getElementById(
            "title-function-button-instruction"
        );
        eTitleButtonInstruction.addEventListener("click", function () {
            scrollToInstruction();
        });
        let eTitleButtonEmoji = document.getElementById(
            "title-function-button-emoji"
        );
        eTitleButtonEmoji.addEventListener("click", function () {
            toast("🚧 新功能施工中... ");
        });
        let eTitleButtonLanguage = document.getElementById(
            "title-function-button-language"
        );
        eTitleButtonLanguage.addEventListener("click", function () {
            if (this.hasPoped) {
                return;
            }
            popupLanguageForTrigger(this);
        });

        let popupElementLanguageContainer;

        function buildPopupLanguageSelection(anchorRect) {
            if (popupElementLanguageContainer) {
                return popupElementLanguageContainer;
            }
            popupElementLanguageContainer = document.createElement("div");
            popupElementLanguageContainer.setAttribute(
                "id",
                "popup-language-container"
            );
            popupElementLanguageContainer.setAttribute(
                "class",
                "popup-container"
            );
            let popupElementHtml = `
                <div id="popup-language-item-zh" class="popup-language-item">中文</div>
                <div id="popup-language-item-en" class="popup-language-item">English</div>
            `;
            popupElementLanguageContainer.innerHTML = popupElementHtml;
            let top = anchorRect.top + anchorRect.height;
            let left =
                anchorRect.left -
                (126 - (anchorRect.right - anchorRect.left)) / 2;
            popupElementLanguageContainer.style.top = top + "px";
            popupElementLanguageContainer.style.left = left + "px";
            return popupElementLanguageContainer;
        }

        function showPopupView(element) {
            element.classList.remove("popup-hide");
            element.classList.add("popup-show");
        }
        function hidePopupView(element) {
            element.classList.remove("popup-show");
            element.classList.add("popup-hide");
        }
        function popupLanguageForTrigger(triggerElement) {
            buildPopupLanguageSelection(triggerElement.getBoundingClientRect());
            document.body.insertBefore(
                popupElementLanguageContainer,
                document.body.firstChild
            );
            document.getElementById("popup-language-item-zh").onclick =
                function () {
                    console.log("popup-language-item-zh clicked");
                    dismissLanguageForTrigger(triggerElement);
                };
            document.getElementById("popup-language-item-en").onclick =
                function () {
                    console.log("popup-language-item-en clicked");
                    dismissLanguageForTrigger(triggerElement);
                };
            showPopupView(popupElementLanguageContainer);
            triggerElement.hasPoped = true;
        }

        function dismissLanguageForTrigger(triggerElement) {
            triggerElement.hasPoped = false;
            hidePopupView(popupElementLanguageContainer);
        }

        let eTitleButtonUnicode = document.getElementById(
            "title-function-button-unicode"
        );
        let eUnicodeWrapper = document.getElementById("unicode-wrapper");

        eTitleButtonUnicode.addEventListener("click", function () {
            window.scrollTo({
                left: 0,
                top: eUnicodeWrapper.getBoundingClientRect().top,
                behavior: "smooth", // 可选值：smooth、instant、auto
            });
        });

        let eUnicodeTranformButton = document.getElementById(
            "unicode-transform-button"
        );
        let eUnicodeInputTextArea = document.getElementById(
            "unicode-textarea-input"
        );
        let eUnicodeOutputTextArea = document.getElementById(
            "unicode-textarea-output"
        );
        eUnicodeTranformButton.addEventListener("click", function () {
            let outputStr = toUnicode(eUnicodeInputTextArea.value);
            if (outputStr != undefined) {
                eUnicodeOutputTextArea.value = outputStr;
            }
        });
        function toUnicode(originStr) {
            if (originStr === undefined || originStr.length == 0) {
                toast("请输入文字");
                return undefined;
            }
            let unicodeStr = "";
            for (let i = 0; i < originStr.length; i++) {
                unicodeStr += "\\u" + originStr.charCodeAt(i).toString(16);
            }
            return unicodeStr;
        }
        */
    };
})();
