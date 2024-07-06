import {PluginInterfaceEvent, PluginMessageType} from '../constants'

/**
 * This file is the entry point for the plugin code. It is responsible for
 * setting up the plugin UI and handling interactions between the plugin and
 * the Figma document. The code in this file is executed in the Figma process.
 */

/**
 * @describe Parameters passed to the Figma plugin UI.
 */
figma.showUI(__html__, {
  height: 500,
  width: 600
})

/**
 * @describe Sends a message to the plugin UI with the specified data and type.
 */
function sendToPluginUi({data, type}: PluginInterfaceEvent): void {
  figma.ui.postMessage({type, data})
}

/**
 * @describe Exports the image fill of the specified node as a PNG image.
 */
async function exportSelection(node: SceneNode): Promise<void> {
  try {
    const result = await node.exportAsync({
      format: 'PNG',
      constraint: {
        type: 'WIDTH',
        value: 512
      }
    })

    sendToPluginUi({
      type: PluginMessageType.SELECTION,
      data: result
    })
  } catch (error) {
    console.error('An error occurred exporting the image from Figma... ', error)
  }
}

/**
 * @describe Listens for messages sent from the plugin UI.
 */
figma.ui.onmessage = (msg: {type: string}) => {
  if (msg.type === PluginMessageType.CANCEL) {
    figma.closePlugin()
  }
}

/**
 * @describe Resets the selection in the plugin UI.
 * This is used when the selected node is not a frame or rectangle with an image fill.
 * This function is also used when the selection is cleared in the Figma document.
 */
function resetSelection(): void {
  sendToPluginUi({
    type: 'selection',
    data: null
  })
}

/**
 * @describe Listens for changes in the selection in the Figma document.
 */
figma.on('selectionchange', () => {
  const selection = figma.currentPage.selection

  // Ensure that just a single node is selected.
  if (selection.length === 1) {
    const node = selection[0]

    if (node.width >= 1 && node.height >= 1) {
      // Export the image fill if it exists and the node has dimensions.
      exportSelection(node)
    } else {
      resetSelection()
    }
  } else {
    console.log('Please select exactly one frame or rectangle.')

    resetSelection()
  }
})
