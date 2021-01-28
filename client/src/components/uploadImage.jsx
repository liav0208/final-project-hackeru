import React, { Component } from "react";
import { apiUrl } from "../config.json";
import http from "../services/httpService";
import { toast } from "react-toastify";
import userService from "../services/userService";
import { imagesUrl } from "../config.json";


class UploadImage extends Component {
  _isMounted = false;
  state = {};

  handleChange = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  doSubmit = async (e) => {
    const { file } = this.state;
    e.preventDefault();
    // create new formData for the file uloading
    const formData = new FormData();
    formData.append("userPhoto", file);
    try {
      await http.post(`${apiUrl}/users/upload-user-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast("Image Uploade successfully");
      this.props.props.history.replace("/user-management");
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    this._isMounted = true;
    const user = await userService.getUserDetails();
    if (this._isMounted) this.setState({ user });
  }

  async componentDidUpdate() {
    this._isMounted = true;
    const { file } = this.state;
    if (file) {
      const fr = new FileReader();
      fr.onload = (r) => {
        this.setState({ imgSrc: r.target.result });
      };
      fr.readAsDataURL(file);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { imgSrc, user } = this.state;
    return (
      <div className="upload">
        {user && !imgSrc && (
          <img
            src={`${imagesUrl}/users/${user.userPhoto}`}
            alt="user-profile"
            className="upload__image"
          />
        )}
        {imgSrc && (
          <img src={imgSrc} alt="user-profile" className="upload__image" />
        )}
        <form action="/upload" method="POST" onSubmit={(e) => this.doSubmit(e)}>
          <label htmlFor="userPhoto">
            <i className="fas fa-download"></i>
            Select File
          </label>
          <input
            type="file"
            name="userPhoto"
            id="userPhoto"
            onChange={(e) => this.handleChange(e)}
          />
          <button className="send-btn">
            <i className="fas fa-share"></i>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default UploadImage;
