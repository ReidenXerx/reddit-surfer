export enum RequestMethods {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
}

export enum ContentType {
  textHtml = 'text/html', // HTML; used for web pages.
  textPlain = 'text/plain', // Plain text; used for simple text.
  applicationJSON = 'application/json', // JSON data; used for exchanging data in the JSON format.
  applicationXML = 'application/xml', // XML data.
  applicationJS = 'application/javascript', // JavaScript code.
  applicationOctetStream = 'application/octet-stream', // Arbitrary binary data.
  multipartFormData = 'multipart/form-data', // Used for uploading files, often with web forms.
  applicationFormEncoded = 'application/x-www-form-urlencoded', // Encoded form data; typically used when submitting form data via HTTP POST.
  imageJPEG = 'image/jpeg',
  imagePNG = 'image/png',
  imageGIF = 'image/gif',
  audioOGG = 'audio/ogg',
  audioMPEG = 'audio/mpeg',
  video = 'video/mp4',
}
