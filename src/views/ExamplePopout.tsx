import { fin } from '@openfin/core'
import { FC, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { copyAppStyles, createOpenfinWindow } from './helpers'

interface Props {
  title: string
  useFinWindow: boolean
  children: any
}

const popupElementId = `PopupRoot`

export const ExampleHost = () => {
  return <div id={popupElementId}></div>
}

const ExamplePopout: FC<Props> = ({ title, useFinWindow, children }) => {
  const [externalWindow, setExternalWindow] = useState<any>(null)
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(
    null
  )
  const val = useRef()
  useEffect(() => {
    val.current = externalWindow
  }, [externalWindow])

  const unload = () => {
    if (val.current) {
      const w = val.current as any
      w.close()
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', unload)
    renderWindow()
    return () => {
      unload()
    }
  }, [])

  const renderWindow = () => {
    if (externalWindow) {
      //externalWindow.setAsForeground()
    } else {
      if (useFinWindow) {
        fin.System.getMousePosition()
          .then((mousePosition) => {
            createOpenfinWindow(
              title,
              mousePosition.left,
              mousePosition.top,
              true,
              false
            )
              .then((extWindow) => {
                if (extWindow) {
                  const webWindow = extWindow.getWebWindow()
                  setContainerElement(
                    webWindow.document.getElementById(popupElementId)
                  )
                  copyAppStyles(webWindow)
                  extWindow.on('close-requested', () => {
                    extWindow.close(true)
                    setExternalWindow(null)
                  })
                  webWindow.document.title = title
                }
                setExternalWindow(extWindow)
              })
              .catch((err) => console.log('err', err))
          })
          .catch((err) => console.log('err', err))
      } else {
        const extWindow = window.open(
          ``,
          title.toString(),
          'width=364,height=417'
        )
        if (extWindow) {
          const container = extWindow.document.createElement('div')
          extWindow.document.body.appendChild(container)
          setContainerElement(container)

          copyAppStyles(extWindow)

          extWindow.document.title = title
        }
        setExternalWindow(extWindow)
      }
    }
  }

  return (
    containerElement &&
    externalWindow &&
    ReactDOM.createPortal(<div>{children}</div>, containerElement)
  )
}

export default ExamplePopout
