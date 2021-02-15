const sections = $("section");
const display = $(".maincontent");

let inScroll = false;

sections.first().addClass("active");

const performTransition = (sectionEq) => {

    if (inScroll === false) {
        inScroll = true;
        const position = sectionEq * -100;

        const currentSection = sections.eq(sectionEq);
        const menuTheme = currentSection.attr("data-sidemenu-theme");
        const sideMenu = $(".fixed-menu");

            if(menuTheme === "black") {
                sideMenu.addClass("fixed-menu--black");
            } else {
                sideMenu.removeClass("fixed-menu--black");
            }

        display.css({
         transform: `translateY(${position}%)`,
        });

        sections.eq(sectionEq).addClass("active").siblings().removeClass("active");


        setTimeout(() => {
            inScroll = false;
            sideMenu.find(".fixed-menu__item").eq(sectionEq).addClass("fixed-menu__item--active").siblings().removeClass("fixed-menu__item--active");

        }, 1300);
    }
};

const scrollViewport = direction => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction === "next" && nextSection.length) {

        performTransition(nextSection.index())

    }

    if (direction === "prev" && prevSection.length) {

        performTransition(prevSection.index())
    }
}

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        scrollViewport("next");
    }

    if (deltaY < 0) {
        scrollViewport("prev");
    }
});

$(window).on("keydown", e => {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName != "input" && tagName != "textarea") {
        switch (e.keyCode) {
            case 79: //O
              scrollViewport("prev");
              break;
            case 76: //L
                scrollViewport("next");
              break;
        }
    }
});

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    performTransition(reqSection.index());
})