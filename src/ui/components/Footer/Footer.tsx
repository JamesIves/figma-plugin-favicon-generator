import React from 'react'

/**
 * @name Footer
 * @description The footer used in the plugin UI. Contains links to the Jives website, GitHub sponsors, and the documentation.
 */
const Footer: React.FC<{}> = () => {
  return (
    <footer className="z-50 block w-full absolute bottom-0 pr-2 left-0 bg-[#2c2c2c]">
      <div className="input flex">
        <div className="label type--bold flex flex-row gap-1 justify-end !text-white">
          <a
            href="https://github.com/sponsors/JamesIves?frequency=one-time&sponsor=JamesIves"
            rel="noopener noreferrer"
            target="_blank"
          >
            ☕ Contribute a Coffee?
          </a>

          <a
            className="pl-1"
            href="https://jives.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              height="18"
              width="18"
              src="https://jamesiv.es/documents/icon.png"
              alt="Jives"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
