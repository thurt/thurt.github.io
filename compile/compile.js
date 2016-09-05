const fs = require('fs')
const handlebars = require('handlebars')
const icongen = require('icon-gen')

const page = fs.readFileSync('./compile/index.html.handlebars', { encoding: "utf8" })
const icon = fs.readFileSync('./compile/favicon.svg.handlebars', { encoding: "utf8" })
const presentation_data = require('./presentation-data.json')

const page_template = handlebars.compile(page)
const icon_template = handlebars.compile(icon)

fs.writeFileSync('./index.html', page_template(presentation_data))
fs.writeFileSync('./compile/favicon.svg', icon_template(presentation_data))

icongen('./compile/favicon.svg', './', {
  modes: ['ico'],
  names: {
    ico: 'favicon'
  }
})
