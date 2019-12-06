export function createElement(type, attributes, content) {
  const element = document.createElement(type);

  element.addContent = content => {
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
  };

  element.removeContent = () => {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  element.replaceContent = content => {
    element.removeContent();
    return element.addContent(content);
  };

  if (attributes != null) {
    const attributeDict = typeof attributes === 'function' ? attributes(element) : attributes;
    Object.keys(attributeDict).forEach(key => { element[key] = attributeDict[key]; });
  }

  return element.addContent(content);
}
