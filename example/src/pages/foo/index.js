/* eslint no-console: "off" */

import './style.css'

document.querySelector('pre').textContent = `
DEBUG: ${DEBUG}
VERSION: ${VERSION}
CONFIG: ${JSON.stringify(CONFIG)}
`
