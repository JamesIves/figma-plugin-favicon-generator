import {generateCodeSample} from '../src/ui/util'

describe('generateCodeSample', () => {
  it('should generate the basic HTML code snippet with minimal options', () => {
    const options = {
      siteName: 'Minimal Site',
      description: 'A minimal site',
      themeColor: '#ffffff',
      includeWebAppManifest: false,
      includeAppleTouchIcons: false,
      includeExpandedSizes: false
    }
    const codeSample = generateCodeSample(options)
    expect(codeSample).toContain('<title>Minimal Site</title>')
    expect(codeSample).toContain(
      '<meta name="description" content="A minimal site" />'
    )
    expect(codeSample).toContain(
      '<meta name="theme-color" content="#ffffff" />'
    )
    expect(codeSample).not.toContain('apple-touch-icon')
    expect(codeSample).not.toContain('site.webmanifest')
  })

  it('should include web app manifest when option is true', () => {
    const options = {
      siteName: 'Test Site',
      description: 'A test site',
      themeColor: '#000000',
      includeWebAppManifest: true,
      includeAppleTouchIcons: false,
      includeExpandedSizes: false
    }
    const codeSample = generateCodeSample(options)
    expect(codeSample).toContain(
      '<link rel="manifest" href="site.webmanifest" />'
    )
  })

  it('should include apple touch icons when option is true', () => {
    const options = {
      siteName: 'Test Site',
      description: 'A test site',
      themeColor: '#000000',
      includeWebAppManifest: false,
      includeAppleTouchIcons: true,
      includeExpandedSizes: false
    }
    const codeSample = generateCodeSample(options)
    expect(codeSample).toContain('apple-touch-icon-180x180.png')
    expect(codeSample).toContain('apple-touch-icon-192x192.png')
  })

  it('should include expanded sizes when option is true', () => {
    const options = {
      siteName: 'Test Site',
      description: 'A test site',
      themeColor: '#000000',
      includeWebAppManifest: false,
      includeAppleTouchIcons: false,
      includeExpandedSizes: true
    }
    const codeSample = generateCodeSample(options)
    expect(codeSample).toContain('favicon-196x196.png')
    expect(codeSample).toContain('favicon-128x128.png')
    expect(codeSample).toContain('favicon-96x96.png')
    expect(codeSample).toContain('favicon-32x32.png')
    expect(codeSample).toContain('favicon-16x16.png')
  })

  it('should include all options when all are true', () => {
    const options = {
      siteName: 'All Options Site',
      description: 'A site with all options',
      themeColor: '#123456',
      includeWebAppManifest: true,
      includeAppleTouchIcons: true,
      includeExpandedSizes: true
    }
    const codeSample = generateCodeSample(options)
    expect(codeSample).toContain('<title>All Options Site</title>')
    expect(codeSample).toContain(
      '<meta name="theme-color" content="#123456" />'
    )
    expect(codeSample).toContain('favicon-196x196.png')
    expect(codeSample).toContain('apple-touch-icon-180x180.png')
    expect(codeSample).toContain(
      '<link rel="manifest" href="site.webmanifest" />'
    )
  })
})
