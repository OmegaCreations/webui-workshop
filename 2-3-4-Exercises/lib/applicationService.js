class ApplicationService {
  getInfo() {
    return {
      data: {
        header1: ["some data"],
        header2: ["same data", "some data"],
        hader3: ["some data1", "some data2", "some data 3"],
      },
    };
  }
}

module.exports = new ApplicationService();
