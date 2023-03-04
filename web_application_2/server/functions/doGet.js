export default function doGet () {
  // eslint-disable-next-line no-undef
  const output = HtmlService.createHtmlOutputFromFile('index')
  output.setTitle('Book Management')
  output.addMetaTag('viewport', 'width=device-width, initial-scale=1')
  return output
}
