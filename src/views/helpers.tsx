import { fin } from '@openfin/core'

export const copyAppStyles = (window: Window) => {
  // Copy the app's styles into the new window
  const stylesheets = Array.from(document.styleSheets)
  stylesheets.forEach((stylesheet) => {
    const css = stylesheet
    if (stylesheet.href) {
      const newStyleElement = document.createElement('link')
      newStyleElement.rel = 'stylesheet'
      newStyleElement.href = stylesheet.href
      window.document.head.appendChild(newStyleElement)
    } else if (css && css.cssRules && css.cssRules.length > 0) {
      const newStyleElement = document.createElement('style')
      Array.from(css.cssRules).forEach((rule) => {
        newStyleElement.appendChild(document.createTextNode(rule.cssText))
      })
      window.document.head.appendChild(newStyleElement)
    }
  })
}

export const createOpenfinWindow = async (
  name: string,
  windowLeft: number,
  windowTop: number,
  frame: boolean = true,
  resizable: boolean = true
) => {
  const winOption = {
    name,
    defaultWidth: 500,
    defaultHeight: 500,
    defaultLeft: windowLeft,
    defaultTop: windowTop,
    url: `/${name}`,
    frame,
    saveWindowState: true,
    contextMenu: true,
    maximizable: false,
    autoShow: true,
    showTaskbarIcon: true,
    cornerRounding: {
      height: 10,
      width: 10,
    },
    resizable,
  }
  const newWindow = await fin.Window.create(winOption)
  return newWindow
}
