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
              src="data:image/png;base64,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"
              alt="Jives"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
