const mesureWidth = item => {
    let reqItemWidth = 0;

    const screenWidth = $(window).width();
    const container = item.closest(".products-menu");
    const titlesBlocks = container.find(".products-menu__trigger");
    const titleWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = item.find(".products-menu__content");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (isMobile) {
        reqItemWidth =  screenWidth - titleWidth;
    } else {
        reqItemWidth =  500;
    }

    return {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingLeft - paddingRight
    }
    
};

const closeEveryItemInContainer = container => {
    const items = container.find(".products-menu__item");
    const content = container.find(".products-menu__container");

    items.removeClass("active");
    content.width(0);
}

const openBlock = Item => {
    const hiddenContent = Item.find(".products-menu__container");
    const reqWidth = mesureWidth(Item);
    const textBlock = Item.find(".products-menu__content");
    Item.addClass("active");
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
};


$(".products-menu__trigger").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".products-menu__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".products-menu");

    if (itemOpened) {
        closeEveryItemInContainer(container);
    } else {
        closeEveryItemInContainer(container);
        openBlock(item);
    }
});




