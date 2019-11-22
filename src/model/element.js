export function createElement(type, attributes, content) {
    const element = Object.assign(document.createElement(type), {
        ...attributes,
        addContent: function (content) {
            if (content != null) {
                if (Array.isArray(content)) {
                    content.forEach(element.addContent);
                } else if (content.appendChild) {
                    element.appendChild(content);
                } else {
                    const contentString = typeof content === 'object' ? JSON.stringify(content) : String(content);
                    element.innerText += contentString;
                }
            }
            return element;
        },
        removeContent: function () {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        },
        replaceContent: function (content) {
            element.removeContent();
            return element.addContent(content);
        }
    });
    return element.addContent(content);
}