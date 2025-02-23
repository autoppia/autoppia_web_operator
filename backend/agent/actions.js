/**  
 * Execute a single action on a given Playwright page.  
 * @param {Page} page - The Playwright page instance.  
 * @param {Object} action - The action object.  
 */  
async function executeAction(page, action) {  
  switch (action.type) {  
    case "ClickAction":  
      if (action.selector) {  
        await page.click(action.selector);  
      } else if (action.x !== undefined && action.y !== undefined) {  
        await page.mouse.click(action.x, action.y);  
      } else {  
        throw new Error("Either a selector or (x, y) must be provided.");  
      }  
      break;  

    case "DoubleClickAction":  
      if (!action.selector) throw new Error("DoubleClick requires a selector.");  
      await page.dblclick(action.selector);  
      break;  

    case "NavigateAction":  
      if (action.go_back) {  
        await page.goBack();  
      } else if (action.go_forward) {  
        await page.goForward();  
      } else if (!action.url) {  
        throw new Error("URL must be provided for navigation.");  
      } else {  
        await page.goto(action.url);  
      }  
      break;  

    case "TypeAction":  
      if (!action.selector) throw new Error("TypeAction requires a selector.");  
      if (!action.text) throw new Error("TypeAction requires text to type.");  
      await page.fill(action.selector, action.text);  
      break;  

    case "SelectAction":  
      if (!action.selector) throw new Error("SelectAction requires a selector.");  
      if (!action.value) throw new Error("SelectAction requires a value.");  
      await page.selectOption(action.selector, action.value);  
      break;  

    case "HoverAction":  
      if (!action.selector) throw new Error("HoverAction requires a selector.");  
      await page.hover(action.selector);  
      break;  

    case "WaitAction":  
      if (action.selector) {  
        const timeout = action.time_seconds ? action.time_seconds * 1000 : undefined;  
        await page.waitForSelector(action.selector, { timeout });  
      } else if (action.time_seconds) {  
        await page.waitForTimeout(action.time_seconds * 1000);  
      } else {  
        throw new Error("WaitAction requires either selector or time_seconds.");  
      }  
      break;  

    case "ScrollAction":  
      if (action.up) {  
        if (action.value) {  
          await page.evaluate((val) => window.scrollBy(0, -val), action.value);  
        } else {  
          await page.keyboard.press("PageUp");  
        }  
      } else if (action.down) {  
        if (action.value) {  
          await page.evaluate((val) => window.scrollBy(0, val), action.value);  
        } else {  
          await page.keyboard.press("PageDown");  
        }  
      } else if (action.value) {  
        // Very simplified version to "scroll to text"  
        await page.evaluate((txt) => {  
          const el = Array.from(document.querySelectorAll("*"))  
            .find(n => n.textContent && n.textContent.includes(txt));  
          if (el) el.scrollIntoView();  
        }, action.value);  
      } else {  
        throw new Error("ScrollAction missing direction or value to scroll to.");  
      }  
      break;  

    case "SubmitAction":  
      if (!action.selector) throw new Error("SubmitAction requires a selector.");  
      await page.press(action.selector, "Enter");  
      break;  

    case "AssertAction":  
      if (!action.text_to_assert) {  
        throw new Error("AssertAction requires text_to_assert.");  
      }  
      const content = await page.content();  
      if (!content.includes(action.text_to_assert)) {  
        throw new Error(`'${action.text_to_assert}' not found in page source.`);  
      }  
      break;  

    case "DragAndDropAction":  
      if (!action.source_selector || !action.target_selector) {  
        throw new Error("DragAndDropAction requires source and target selectors.");  
      }  
      await page.dragAndDrop(action.source_selector, action.target_selector);  
      break;  

    case "ScreenshotAction":  
      if (!action.file_path) throw new Error("ScreenshotAction requires a file_path.");  
      await page.screenshot({ path: action.file_path });  
      break;  

    case "SendKeysIWAAction":  
      if (!action.keys) throw new Error("SendKeysIWAAction requires keys.");  
      await page.keyboard.press(action.keys);  
      break;  

    case "GetDropDownOptions":  
      if (!action.selector) throw new Error("GetDropDownOptions requires a selector.");  
      // Very simplified version; real usage might need frames, etc.  
      const options = await page.evaluate((sel) => {  
        const select = document.querySelector(sel);  
        if (!select || select.tagName.toLowerCase() !== "select") return [];  
        return Array.from(select.options).map((opt, idx) => ({  
          index: idx,  
          text: opt.text,  
          value: opt.value,  
        }));  
      }, action.selector);  
      console.log("Dropdown options:", options);  
      break;  

    case "SelectDropDownOption":  
      if (!action.selector) throw new Error("SelectDropDownOption requires a selector.");  
      if (!action.text) throw new Error("SelectDropDownOption requires text.");  
      await page.selectOption(action.selector, { label: action.text });  
      break;  

    case "UndefinedAction":  
      // Do nothing  
      break;  

    case "IdleAction":  
      // Do nothing  
      break;  

    default:  
      throw new Error(`Unsupported action type: ${action.type}`);  
  }  
}  

/**  
 * Create an action object from raw data. (Simple version; no type-checking)  
 * @param {Object} actionData   
 * @returns {Object} action  
 */  
function createAction(actionData) {  
  // Ensure 'type' ends with "Action" if not present  
  if (!actionData.type) {  
    throw new Error("Missing 'type' in action data.");  
  }  
  let finalType = actionData.type;  
  if (!finalType.endsWith("Action")) {  
    finalType = `${finalType.charAt(0).toUpperCase() + finalType.slice(1)}Action`;  
  }  
  return { ...actionData, type: finalType };  
}  

// Export the functions using CommonJS syntax  
module.exports = {  
  executeAction,  
  createAction,  
};