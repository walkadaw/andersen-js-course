class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.initEvents();
    this.init();
  }

  init = () => {
    this.model.setType(this.view.type);
    this.model.setState().then(state => {
      this.view.clearList();
      state.forEach(notes => {
        this.view.addItem(notes);
      });
    });
  };

  initEvents = () => {
    this.view.on('add', this.addNotes);
    this.view.on('edit', this.editNotes);
    this.view.on('remove', this.removeNotes);

    this.view.on('fullNotes', this.fullNotes);
    this.view.on('changeType', this.init);
  };

  addNotes = text => {
    this.model.addItem(text).then(notes => {
      this.view.addItem(notes);
    });
  };

  editNotes = ({ id, text }) => {
    this.model.updateItem(id, text).then(() => {
      this.view.editItem(id, text);
    });
  };

  fullNotes = id => {
    this.model.getItem(id).then(item => {
      this.view.showFullNotes(item);
    });
  };

  removeNotes = ({ id }) => {
    this.model.removeItem(id).then(() => {
      this.view.removeItem(id);
      this.view.hideFullNotes();
    });
  };
}

export default Controller;
