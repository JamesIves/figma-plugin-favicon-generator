/**
 * The message types that can be sent between the plugin and the UI.
 */
export enum PluginMessageType {
  /**
   * Emitted when the user cancels the plugin operation.
   */
  CANCEL = 'cancel',
  /**
   * Emitted when the user selects a node in Figma.
   */
  SELECTION = 'selection'
}

/**
 * The data structure for the message sent between the plugin and the UI.
 */
export interface PluginInterfaceEvent {
  /**
   * The type of message being sent.
   */
  type: string
  /**
   * The data to send with the message.
   * This can be any type of data, but it is usually an object representing an image.
   */
  data: Uint8Array | null
}

/**
 * The options the user has available for customizing the output.
 */
export interface UserOptions {
  /**
   * Whether to include the apple touch icons in the output.
   */
  includeAppleTouchIcons: boolean
  /**
   * Whether to include the web app manifest in the output.
   */
  includeWebAppManifest: boolean
  /**
   * Whether to include the expanded sizes for the icons in the output.
   */
  includeExpandedSizes: boolean
  /**
   * The name of the site to use in the web app manifest.
   */
  siteName: string
  /**
   * The description of the site to use in the web app manifest.
   */
  description: string
  /**
   * The theme color to use in the web app manifest.
   */
  themeColor: string
}

/**
 * The icons to generate for the apple touch icon output.
 */
export const appleTouchIcons = [
  {width: 180, height: 180, prefix: 'apple-touch-icon'},
  {width: 192, height: 192, prefix: 'apple-touch-icon'}
]

/**
 * The expanded set of icons to generate for the apple touch icon output.
 */
export const appleTouchIconsExpanded = [
  {width: 57, height: 57, prefix: 'apple-touch-icon'},
  {width: 72, height: 72, prefix: 'apple-touch-icon'},
  {width: 76, height: 76, prefix: 'apple-touch-icon'},
  {width: 114, height: 114, prefix: 'apple-touch-icon'},
  {width: 120, height: 120, prefix: 'apple-touch-icon'},
  {width: 144, height: 144, prefix: 'apple-touch-icon'},
  {width: 152, height: 152, prefix: 'apple-touch-icon'}
]

/**
 * The icons to generate for the favicon output.
 */
export const faviconIconsExpanded = [
  {width: 16, height: 16, prefix: 'favicon'},
  {width: 32, height: 32, prefix: 'favicon'},
  {width: 96, height: 96, prefix: 'favicon'},
  {width: 128, height: 128, prefix: 'favicon'},
  {width: 196, height: 196, prefix: 'favicon'}
]

/**
 * The icons to generate for the web app manifest output.
 */
export const webAppManifestIcons = [
  {width: 192, height: 192, prefix: 'android-chrome'},
  {width: 512, height: 512, prefix: 'android-chrome'}
]
