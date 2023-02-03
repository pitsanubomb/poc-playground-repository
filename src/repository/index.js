class Repository {
  constructor(model) {
    this.model = model;
    console.debug(this.model);
  }

  create(insertObject) {
    this.model.create(insertObject);
  }
}

module.exports = Repository;
