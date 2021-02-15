const openItem = item => {
    const container = item.closest(".team__item");
    const contentBlock = container.find(".team__content");
    const textBlock = contentBlock.find(".team__content-block");
    const recHeight = textBlock.height();

    item.addClass("team__title--active");
    container.addClass("active");
    contentBlock.height(recHeight);
}

const closeEveryItem = container => {
    const items = container.find(".team__content");
    const itemContainer = container.find(".team__item");
    const itemTitle = container.find(".team__title");

    itemContainer.removeClass("active");
    itemTitle.removeClass("team__title--active");
    items.height(0);
}

$('.team__title').click( e => {
    const $this = $(e.currentTarget);
    const container = $this.closest(".team");
    const elemContainer = $this.closest(".team__item");

    if(elemContainer.hasClass("active")) {
        closeEveryItem(container);
    } else {
        closeEveryItem(container);
        openItem($this);
    }

})