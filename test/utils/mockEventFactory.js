module.exports = {
  emptyEvent: () => {
    return ({
      "httpMethod": 'GET',
      "body": "{\"id\": \"1\"}"
    })
  },
  putEvent: (id = 1, counterValue = 1) => {
    return ({
      "httpMethod": 'PUT',
      "body": `{\"id\": \"${id}\", \"counter\": \"${counterValue}\"}`
    })
  }
}