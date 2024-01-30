import router from "./router.js";

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
    ).innerHTML = `<p><pre>Hi 👋 I'm 
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    Onur (meaning "Honour" in English), a software engineer, dj, writer, and minimalist based in Amsterdam,
    The Netherlands.</pre></p>"`;
}

function refreshRightContainerForWriting(element, fullPath) {
    if (element == null) {
        return;
    }
    console.log("--------------------------------");
    console.log(fullPath);
    if (fullPath != null) {
        let splitedPath = router.splitPath(fullPath);
        if (
            splitedPath.length > 0 &&
            splitedPath[0].toLowerCase() == "writing"
        ) {
            displayAllChildrenButID(element, "content-container-writing");
            console.log("refreshRightContainerForWriting");
            showWritingPanel(splitedPath);
        }
    }
}

let writingItemBriefs = [];

function createOneWritingListItemContainerEle(
    itemElementContainerID,
    title,
    hint,
    path
) {
    let itemElementContainer = document.createElement("div");
    itemElementContainer.setAttribute("id", itemElementContainerID);
    itemElementContainer.setAttribute(
        "class",
        "writing-brief-info-container menu-item-theme-light"
    );
    let itemElementTitle = document.createElement("div");
    itemElementTitle.setAttribute(
        "class",
        "writing-brief-info-title text-highlight"
    );
    itemElementTitle.innerHTML = title;

    let itemElementHint = document.createElement("div");
    itemElementHint.setAttribute(
        "class",
        "writing-brief-info-hint text-normal"
    );
    itemElementHint.innerHTML = hint;
    itemElementContainer.appendChild(itemElementTitle);
    itemElementContainer.appendChild(itemElementHint);
    itemElementContainer.addEventListener("click", function () {
        updateUrlPath("/writing/" + path);
        clearWritingContentPanel();
        // todo 根据后台内容，填充右侧writingcontentpanel
        showWritingContentPanel(
            "title: " +
                title +
                " content: " +
                "朝辞白帝彩云间，千里江陵一日还，两岸猿声啼不住，轻舟已过万重山。"
        );
    });
    return itemElementContainer;
}

function showWritingPanel(splitedPath) {
    let writingListContainerElement = document.getElementById(
        "content-container-writing-list"
    );
    console.log("-------show writing panel 111");

    if (writingItemBriefs.length == 0) {
        console.log("-------show writing panel 222");
        for (let i = 0; i < 20; i++) {
            let itemContainerEle = createOneWritingListItemContainerEle(
                "writing-brief-info-container-id-" + i,
                "今天天气不错今天天气不错今天天气不错今天天气不错今天天气不错天气不错今天天气不错今天天气不错" +
                    i,
                "October 06 2023·1500 views",
                "this-is-an-article-path-" + i
            );
            writingListContainerElement.appendChild(itemContainerEle);
            writingItemBriefs.push(itemContainerEle);
        }
    }
    if (splitedPath.length > 1) {
        console.log("show writing panel content 33333");
        showWritingContentPanel("hahahaahahahah 测试一下子");
    }
    addListenerForWritingNavElement();
}

function showWritingContentPanel(content) {
    document.getElementById(
        "content-container-writing-content-article-container"
    ).style.display = "block";
    document.getElementById(
        "content-container-writing-content-article"
    ).innerHTML = content;
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
            console.log("refreshRightContainerForColumn");
        }
    }
}

function refreshRightContainerForAbout(element, path) {
    if (element == null) {
        return;
    }
    if (path != null) {
        let splitedPath = router.splitPath(path);
        if (splitedPath.length > 0 && splitedPath[0].toLowerCase() == "about") {
            displayAllChildrenButID(element, "content-container-about");
            console.log("refreshRightContainerForAbout");
        }
    }
}

function addListenerForWritingNavElement() {
    let writingNavEle = document.getElementById(
        "content-container-writing-list-sticky-panel-title"
    );
    console.log(writingNavEle);
    if (writingNavEle != null) {
        if (!writingNavEle.hasAttribute("hasOnClickListener")) {
            writingNavEle.addEventListener("click", function () {
                console.log("writing nav clicked ");
                updateUrlPath("/writing");
                clearWritingContentPanel();
            });
            writingNavEle.setAttribute("hasOnClickListener", "added");
        }
    }
}

function clearWritingContentPanel() {
    let writingContentEmptyEle = document.getElementById(
        "content-container-writing-content-empty"
    );
    writingContentEmptyEle.style.display = "none";
    let writingContentArticleContainerEle = document.getElementById(
        "content-container-writing-content-article-container"
    );
    writingContentArticleContainerEle.style.display = "none";
    let writingContentArticleEle = document.getElementById(
        "content-container-writing-content-article"
    );
    writingContentArticleEle.innerHTML = "";
}

let firstLevelIDS = [
    "menu-item-card-home",
    "menu-item-card-writing",
    "menu-item-card-column",
    "menu-item-card-about",
];

let refreshFunctions = {
    home: refreshRightContainerForHome,
    writing: refreshRightContainerForWriting,
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
