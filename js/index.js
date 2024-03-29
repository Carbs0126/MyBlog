import router from "./router.js";
import net from "./net.js";
import util from "./util.js";
import keys from "./keys.js";
import consts from "./consts.js";

function displayAllChildrenButID(element, id) {
    for (let childEle of element.children) {
        if (childEle.id == id) {
            childEle.style.display = "block";
        } else {
            childEle.style.display = "none";
        }
    }
}

// element是包含的容器
function refreshRightContainerForHome(element, path) {
    if (element == null) {
        return;
    }
    displayAllChildrenButID(element, "content-container-home");

    element.querySelector(
        "#content-container-home-article"
    ).innerHTML = `Hi 👋 I'm Onur (meaning Honour in English), a software engineer, dj, writer, and minimalist based in Amsterdam,
    The Netherlands.`;
    clearArticlePanel();
}

function refreshRightContainerForArticle(element, fullPath) {
    if (element == null) {
        return;
    }
    if (fullPath != null) {
        let splitedPath = router.splitPath(fullPath);
        if (
            splitedPath.length > 0 &&
            splitedPath[0].toLowerCase() == "article"
        ) {
            displayAllChildrenButID(element, "content-container-article");
            showArticlePanel(splitedPath);
        }
    }
}

function refreshRightContainerForColumn(element, path) {
    if (element == null) {
        return;
    }
    if (path != null) {
        let splitedPath = router.splitPath(path);
        if (
            splitedPath.length > 0 &&
            splitedPath[0].toLowerCase() == "column"
        ) {
            displayAllChildrenButID(element, "content-container-column");
        }
    }
    clearArticlePanel();
}

function refreshRightContainerForAbout(element, path) {
    if (element == null) {
        return;
    }
    if (path != null) {
        let splitedPath = router.splitPath(path);
        if (splitedPath.length > 0 && splitedPath[0].toLowerCase() == "about") {
            displayAllChildrenButID(element, "content-container-about");
        }
    }
    element.querySelector(
        "#content-container-about-article"
    ).innerHTML = `<p><pre><h3 style="display:inline;">           将进酒</h3>（唐·李白）

    君不见，黄河之水天上来，奔流到海不复回。
    
    君不见，高堂明镜悲白发，朝如青丝暮成雪。
    
    人生得意须尽欢，莫使金樽空对月。
    
    天生我材必有用，千金散尽还复来。
    
    烹羊宰牛且为乐，会须一饮三百杯。
    
    岑夫子，丹丘生，将进酒，君莫停。
    
    与君歌一曲，请君为我倾耳听。
    
    钟鼓馔玉不足贵，但愿长醉不复醒。
    
    古来圣贤皆寂寞，惟有饮者留其名。
    
    陈王昔时宴平乐，斗酒十千恣欢谑。
    
    主人何为言少钱，径须沽取对君酌。
    
    五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。</pre></p>`;
    clearArticlePanel();
}

let articleItemBriefs = [];
function clearArticlePanel() {
    if (articleItemBriefs.length > 0) {
        articleItemBriefs = [];
        clearArticleListPanel();
        clearArticleContentPanel();
    }
}

function clearArticleListPanel() {
    let articleListContainerElement = document.getElementById(
        "content-container-article-list"
    );
    if (articleListContainerElement != null) {
        articleListContainerElement.innerHTML = "";
    }
}

function createOneArticleListItemContainerEle(containerID, title, hint, path) {
    let itemElementContainer = document.createElement("div");
    itemElementContainer.setAttribute("id", containerID);
    itemElementContainer.setAttribute(
        "class",
        "article-brief-info-container menu-item-theme-light"
    );
    let itemElementTitle = document.createElement("div");
    itemElementTitle.setAttribute(
        "class",
        "article-brief-info-title text-highlight"
    );
    itemElementTitle.innerHTML = title;

    let itemElementHint = document.createElement("div");
    itemElementHint.setAttribute(
        "class",
        "article-brief-info-hint text-normal"
    );
    itemElementHint.innerHTML = hint;
    itemElementContainer.appendChild(itemElementTitle);
    itemElementContainer.appendChild(itemElementHint);
    itemElementContainer.addEventListener("click", function () {
        updateUrlPath("/article/" + path);
        clearArticleContentPanel();
        requestArticleDetailAndShowContent(path);
        updateArticleItemForSelectedAndUnselectedTheme(this);
    });
    itemElementContainer.setAttribute("article-path", path);
    return itemElementContainer;
}

function requestArticleDetailAndShowContent(articleIdentifier) {
    net.getData(consts.URL_ARTICLE_DETAIL + articleIdentifier).then((data) => {
        if (data.code == 0) {
            showArticleContentPanel(
                data.data.title,
                data.data.content,
                data.data.create_date,
                data.data.update_date
            );
        }
    });
}

function updateArticleItemForSelectedAndUnselectedTheme(selectedElement) {
    for (let element of articleItemBriefs) {
        if (element == selectedElement) {
            element.setAttribute(
                "class",
                "article-brief-info-container menu-item-theme-light menu-item-selection"
            );
            let titleElement = element.children[0];
            titleElement.setAttribute(
                "class",
                "article-brief-info-title text-highlight-reverse-bg"
            );
        } else {
            element.setAttribute(
                "class",
                "article-brief-info-container menu-item-theme-light"
            );
            let titleElement = element.children[0];
            titleElement.setAttribute(
                "class",
                "article-brief-info-title text-highlight"
            );
        }
    }
}

function showArticlePanel(splitedPath) {
    let articleListContainerElement = document.getElementById(
        "content-container-article-list"
    );
    let uniqueIdentifierInPath = "";
    if (splitedPath.length >= 2) {
        uniqueIdentifierInPath = splitedPath[1];
    }
    if (articleItemBriefs.length == 0) {
        net.getData(consts.URL_ARTICLE_LIST_ALL).then((data) => {
            if (data.code == 0) {
                let selectedItem = null;
                for (let i = 0; i < data.data.length; i++) {
                    let dataItem = data.data[i];
                    let itemContainerEle = createOneArticleListItemContainerEle(
                        "article-brief-info-container-id-" + i,
                        dataItem.title,
                        util.secondTimeToDateStr(dataItem.create_date),
                        dataItem.unique_identifier
                    );
                    articleListContainerElement.appendChild(itemContainerEle);
                    articleItemBriefs.push(itemContainerEle);
                    if (uniqueIdentifierInPath == dataItem.unique_identifier) {
                        selectedItem = itemContainerEle;
                    }
                }
                if (selectedItem != null) {
                    updateArticleItemForSelectedAndUnselectedTheme(
                        selectedItem
                    );
                    requestArticleDetailAndShowContent(uniqueIdentifierInPath);
                }
            }
        });
    }
    addListenerForArticleNavElement();
}

function showArticleContentPanel(title, content, createTime, updateDate) {
    document.getElementById(
        "content-container-article-content-article-container"
    ).style.display = "block";
    document.getElementById(
        "content-container-article-content-article-title"
    ).innerHTML = title;
    document.getElementById(
        "content-container-article-content-article-hint"
    ).innerHTML = util.secondTimeToDateStr(createTime);
    document.getElementById(
        "content-container-article-content-article-content"
    ).innerHTML = content;
}

function addListenerForArticleNavElement() {
    let articleNavEle = document.getElementById(
        "content-container-article-list-sticky-panel-title"
    );
    if (articleNavEle != null) {
        if (!articleNavEle.hasAttribute("hasOnClickListener")) {
            articleNavEle.addEventListener("click", function () {
                updateUrlPath("/article");
                clearArticleContentPanel();
            });
            articleNavEle.setAttribute("hasOnClickListener", "added");
        }
    }
}

function clearArticleContentPanel() {
    let articleContentEmptyEle = document.getElementById(
        "content-container-article-content-empty"
    );
    articleContentEmptyEle.style.display = "none";
    let articleContentArticleContainerEle = document.getElementById(
        "content-container-article-content-article-container"
    );
    articleContentArticleContainerEle.style.display = "none";
    document.getElementById(
        "content-container-article-content-article-title"
    ).innerHTML = "";
    document.getElementById(
        "content-container-article-content-article-hint"
    ).innerHTML = "";
    document.getElementById(
        "content-container-article-content-article-content"
    ).innerHTML = "";
}

let firstLevelIDS = [
    "menu-item-card-home",
    "menu-item-card-article",
    "menu-item-card-column",
    "menu-item-card-about",
];

let refreshFunctions = {
    home: refreshRightContainerForHome,
    article: refreshRightContainerForArticle,
    column: refreshRightContainerForColumn,
    about: refreshRightContainerForAbout,
};

const firstLevelIDElementMap = new Map();

function updateFirstLevelMenuItemUIForSelected(element) {
    if (!element.classList.contains("menu-item-selection")) {
        element.classList.add("menu-item-selection");
    }
}

function updateFirstLevelMenuItemUIForUnselected(element) {
    element.classList.remove("menu-item-selection");
}

function inflateFirstLevelIDElementMap() {
    for (let key of firstLevelIDS) {
        firstLevelIDElementMap.set(key, document.getElementById(key));
    }
}

function addEventListenerForMenuItems() {
    let contentRightContainer = document.getElementById(
        "content-container-right"
    );
    firstLevelIDElementMap.forEach((value, key) => {
        // 添加一级菜单router
        router.addFirstLevelRouter(
            value.dataset.link,
            contentRightContainer,
            refreshFunctions[value.dataset.link]
        );
        // 添加一级菜单点击事件
        value.addEventListener("click", function () {
            // 更新MenuItem的UI
            for (let ele of firstLevelIDElementMap.values()) {
                if (value === ele) {
                    updateFirstLevelMenuItemUIForSelected(value);
                } else {
                    updateFirstLevelMenuItemUIForUnselected(ele);
                }
            }
            // 先变更地址
            updateUrlPath("/" + value.dataset.link);
            // 更新右侧面板
            router.updateFirstLevelContainer(value.dataset.link);
        });
    });
}

function updateUIForPath(urlPath) {
    let splitedPath = router.splitPath(urlPath);
    let menuItemElementIDToBeSelected = "menu-item-card-home";
    if (splitedPath.length > 0) {
        let firstLevelPath = splitedPath[0].toLowerCase();
        if (
            firstLevelPath != "home" &&
            firstLevelPath != "index.html" &&
            firstLevelPath in refreshFunctions
        ) {
            menuItemElementIDToBeSelected = "menu-item-card-" + firstLevelPath;
        } else {
            updateUrlPath("/home");
        }
    }
    updateMenuItemsUIForPath(splitedPath, menuItemElementIDToBeSelected);
    updateRightContainerForPath(
        urlPath,
        splitedPath,
        menuItemElementIDToBeSelected
    );
}

function updateUrlPath(path) {
    window.history.replaceState(null, "", path);
}

function updateMenuItemsUIForPath(splitedPath, menuItemElementIDToBeSelected) {
    firstLevelIDElementMap.forEach((value, key) => {
        if (key == menuItemElementIDToBeSelected) {
            updateFirstLevelMenuItemUIForSelected(value);
        } else {
            updateFirstLevelMenuItemUIForUnselected(value);
        }
    });
}

function updateRightContainerForPath(
    urlPath,
    splitedPath,
    menuItemElementIDToBeSelected
) {
    let contentRightContainer = document.getElementById(
        "content-container-right"
    );
    if (menuItemElementIDToBeSelected == "menu-item-card-home") {
        // home
        refreshRightContainerForHome(contentRightContainer, "home");
    } else if (splitedPath.length > 0 && splitedPath[0] in refreshFunctions) {
        // 展示firstlevel
        refreshFunctions[splitedPath[0]](contentRightContainer, urlPath);
    }
}

function updateAvatar() {
    document.getElementById("my-avatar-image").src = "/img/rick-avatar.png";
}

(function () {
    window.onload = function () {
        updateAvatar();
        inflateFirstLevelIDElementMap();
        addEventListenerForMenuItems();
        updateUIForPath(window.location.pathname);
    };
})();
