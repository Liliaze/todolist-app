// export function createElement(type, attributes, content) {
//   const element = Object.assign(document.createElement(type), {
//     ...(typeof attributes === 'function' ? attributes(element) : attributes), // TODO: to fix
//     addContent: function (content) {
//       if (content != null) {
//         if (Array.isArray(content)) {
//           content.forEach(element.addContent);
//         } else if (content.appendChild) {
//           element.appendChild(content);
//         } else {
//           const contentString = typeof content === 'object' ? JSON.stringify(content) : String(content);
//           element.innerText += contentString;
//         }
//       }
//       return element;
//     },
//     removeContent: function () {
//       while (element.firstChild) {
//         element.removeChild(element.firstChild);
//       }
//     },
//     replaceContent: function (content) {
//       element.removeContent();
//       return element.addContent(content);
//     }
//   });
//   return element.addContent(content);
// }

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
