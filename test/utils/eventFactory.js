module.exports = {
  emptyEvent: () => {
    return ({
      httpMethod: 'GET',
      body: { }
    })
  },
  putEvent: () => {
    return ({
      httpMethod: 'PUT',
      body: { 
        id: "1",
        counter: '1' 
      }
    })
  }
}

exports.emptyEvent = {
  httpMethod: 'GET',
  body: {}
};

