import React from 'react'

/**
 * Props for the ImageGrid component
 */
interface ImageGridProps {
  /**
   * The favicon image to display in the grid.
   * This is encoded as a data URL.
   */
  favicon: string | null
}

/**
 * @name ImageGrid
 * @description A grid of images to display the favicon in different sizes. Used to preview the favicon before exporting.
 */
const ImageGrid: React.FC<ImageGridProps> = ({favicon}) => {
  if (!favicon) {
    return (
      <div className="flex items-center">
        <div className="w-full border-2 border-dotted border-gray-300 flex justify-center items-center h-48 text-gray-300">
          <p className="type p-8 text-center mx-auto text-black-8">
            <div className="icon icon--image icon--purple !w-full bg-no-repeat"></div>
            Select a layer with an image fill to get started.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1 m-auto">
      <div
        className="w-[196px] h-[196px] bg-cover bg-center"
        style={{backgroundImage: `url(${favicon})`}}
      ></div>
      <div className="flex items-center w-full">
        <div className="flex gap-1">
          <div
            className="w-[128px] h-[128px] bg-cover bg-center"
            style={{backgroundImage: `url(${favicon})`}}
          ></div>

          <div className="flex flex-col justify-start items-start gap-1">
            <div
              className="w-[64px] h-[64px] bg-cover bg-center"
              style={{backgroundImage: `url(${favicon})`}}
            ></div>
            <div
              className="w-[32px] h-[32px] bg-cover bg-center"
              style={{backgroundImage: `url(${favicon})`}}
            ></div>
            <div
              className="w-[16px] h-[16px] bg-cover bg-center"
              style={{backgroundImage: `url(${favicon})`}}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGrid
