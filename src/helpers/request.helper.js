'use script'

const request = require('request')

module.exports = (method, url, headers = {}, body = {}, json = true, form = {}, formData = {}) => {
  return new Promise((resolve, reject) => {
    let options = {
      method,
      url,
      headers,
      timeout: 240000
    };

    if (Object.keys(body).length > 0) options.body = body
    if (Object.keys(form).length > 0) options.form = form
    if (Object.keys(formData).length > 0) options.formData = formData
    if (json) options.json = true

    request(options, (err, response, body) => {
      if (err || !response || response.statusCode === 400 || response.statusCode === 404 || response.statusCode === 405 || response.statusCode === 406 || response.statusCode === 422 || response.statusCode === 500) {
        reject({
          err: err || body,
          statusCode: response ? response.statusCode : 404,
          responseHeaders: response ? response.headers : {}
        });
        return
      }

      resolve({
        body,
        statusCode: response ? response.statusCode : 200,
        responseHeaders: response ? response.headers : {}
      });

    })
  })
}