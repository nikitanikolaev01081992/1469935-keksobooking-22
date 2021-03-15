//-----------------------------------------------------------------------
// function hides dom element
const hideElement = (element) => {
  element.classList.add('hidden');
};

//-----------------------------------------------------------------------
//function adds text content to dom element or hide element in case of empty content
const addNodeContent = (node, content, useInnerHTML = false, htmlString = '') => {
  if (content) {
    if (useInnerHTML) {
      node.innerHTML = htmlString;
    } else {
      node.textContent = content;
    }
  } else {
    hideElement(node);
  }
};

//-----------------------------------------------------------------------
//function adds src url to dom element or hide element in case of empty src url
const addNodeSrc = (node, srcUrl) => {
  if (srcUrl) {
    node.setAttribute('src', srcUrl);
  } else {
    hideElement(node);
  }
};

//-----------------------------------------------------------------------
//function return node by selector or throw error in case of non-existing node
const getNode = (selector, parentNode = document) => {
  const node = parentNode.querySelector(selector);

  if (!node) {
    throw new Error(`${selector} не найден!`);
  }

  return node;
};

//-----------------------------------------------------------------------
//function returns object with children of given DOM container
const queryNodes = (selectors, parentNode = document) => {
  let nodes = {};

  for (const key of Object.keys(selectors)) {
    const childNode = getNode(selectors[key], parentNode);

    nodes[key] = childNode;
  }

  return nodes;
};

//-----------------------------------------------------------------------
// function add generated fragment using getElement function from data array to node
const renderItem = (node, data, getElement) => {
  if (data.length > 0) {
    const fragment = getElement(node, data);

    node.innerHTML = '';
    node.appendChild(fragment);
  } else {
    hideElement(node);
  }
};

// -----------------------------------------------------------------------
// EXPORTS
export { hideElement, addNodeContent, addNodeSrc, getNode, queryNodes, renderItem };
