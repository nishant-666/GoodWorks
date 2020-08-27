import React from "react";
import mime from "mime-types";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

class FileModal extends React.Component {
  state = {
    file: null,
    authorized: ["image/jpeg", "image/png"]
  };

  addFile = event => {
    const file = event.target.files[0];
    if (file) {
      this.setState({ file });
    }
  };

  sendFile = () => {
    const { file } = this.state;
    const { uploadFile, closeModal } = this.props;

    if (file !== null) {
      if (this.isAuthorized(file.name)) {
        const metadata = { contentType: mime.lookup(file.name) };
        uploadFile(file, metadata);
        closeModal();
        this.clearFile();
      }
    }
  };

  isAuthorized = filename =>
    this.state.authorized.includes(mime.lookup(filename));

  clearFile = () => this.setState({ file: null });

  render() {
    const { modal, closeModal } = this.props;

    return (
      <Modal basic open={modal} onClose={closeModal}>
        <Modal.Header style={{fontFamily:'Poppins'}}>Select an Image!</Modal.Header>
        <Modal.Content>
          <Input
            onChange={this.addFile}
            fluid
            name="file"
            type="file"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.sendFile} style={{fontFamily:'Poppins',borderRadius:10}} color="green" inverted>
            <Icon name="checkmark" /> Upload
          </Button>
          <Button color="red" inverted style={{fontFamily:'Poppins',borderRadius:10}} onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default FileModal;