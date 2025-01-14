let popups = {};

function makePopup(...content) {
    let popup = $make("div");
    popup.classList.add("popup");

    let body = popup.$body = $make("div", ...content);
    popup.append(body);

    popup.close = () => {
        popup.remove();
    }

    document.body.append(popup);
    return popup;
}

function callPopup(popup, ...args) {
    let popupd = popups[popup].call(...args);
    let close = popupd.close;
    popupd.close = () => {
        popups[popup].onClose?.();
        close();
    }
    return popupd;
}