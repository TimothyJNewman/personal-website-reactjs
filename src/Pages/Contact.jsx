import React from "react";
import { isEmail, sanitizeKeepUnicode } from "../Util/StringValidator";
import CoverImage from '../CoverImage/index';

const APIURL = process.env.REACT_APP_BACKEND_URL;

// Parses the JSON returned by a network request
const parseJSON = resp => (resp.json ? resp.json() : resp);

// Checks if a network request came back fine, and throws an error if not
const checkStatus = resp => {
  if (resp.status >= 200 && resp.status < 300) {
    return resp;
  }
  return parseJSON(resp).then(resp => {
    throw resp;
  });
};
const headers = {
  'Content-Type': 'application/json',
};

const initalInputState = {
  name: '',
  email: '',
  message: '',
};

const initalInputValidationState = {
  name: { isValid: true, errorMessage: '' },
  email: { isValid: true, errorMessage: '' },
  message: { isValid: true, errorMessage: '' },
};

const emailValidation = email => {
  if (isEmail(email)) {
    return { isValid: true, errorMessage: null };
  }
  if (email.trim() === '') {
    return { isValid: false, errorMessage: 'Email is required' };
  }
  return { isValid: false, errorMessage: 'Please enter a valid email' };
};

const stringValidation = (testString, name) => {
  if (testString.trim() === '') {
    return { isValid: false, errorMessage: name + 'is required', };
  }
  return { isValid: true, errorMessage: null };
};


class Contact extends React.Component {
  // State of your application
  constructor(props) {
    super(props);
    this.state = {
      // State that contains input values
      modifiedData: initalInputState,
      // State that contains isValid boolean and error message for all inputs
      modifiedDataValidMessage: initalInputValidationState,
      // Social media icons and links
      socialMedias: [],
      // Initially -1 Failure 0 Attempting 0.5 Success 1 
      isSubmitSuccessful: -1,
      // Loading Social Media Icons
      isSocialMediaLoaded: false,
      error: null,
    };
  }

  // Fetch your restaurants immediately after the component is mounted
  componentDidMount = async () => {
    try {
      const socialMedias = await fetch(APIURL + '/socialmedias?_sort=order:ASC', {
        method: 'GET',
        headers: headers,
      })
        .then(checkStatus)
        .then(parseJSON);
      this.setState({ socialMedias, isSocialMediaLoaded: true });
    } catch (error) {
      this.setState({ error, isSocialMediaLoaded: true });
    }
  };

  handleInputChange = ({ target: { name, value } }) => {
    if (name !== "email") {
      value = sanitizeKeepUnicode(value);
    }
    this.setState(prev => ({
      ...prev,
      modifiedData: {
        ...prev.modifiedData,
        [name]: value,
      },
    }));
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({
      modifiedDataValidMessage: {
        name: stringValidation(this.state.modifiedData.name, "Name "),
        email: emailValidation(this.state.modifiedData.email),
        message: stringValidation(this.state.modifiedData.message, "Message "),
      },
    }, async () => {
      // making sure all inputs are valid
      const isValidationCompleted = Object.values(this.state.modifiedDataValidMessage).every(x => (x.isValid === true));
      if (isValidationCompleted) {
        try {
          // set to loading state
          this.setState({ isSubmitSuccessful: 0.5 });
          // making fetch request
          await fetch(APIURL + '/contactforms', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(this.state.modifiedData),
          })
            .then(checkStatus)
            .then((resp) => (resp) ? this.setState({ isSubmitSuccessful: 1, modifiedData: initalInputState }) : "")
        } catch (error) {
          this.setState({ isSubmitSuccessful: 0 });
        }
      } else {
        this.setState({ isSubmitSuccessful: -1 });
      }
    });
  };

  render() {

    // Error message for form
    const errorMessage = (field) => {
      return (
        <span className="error-message">{this.state.modifiedDataValidMessage[field].errorMessage}</span>
      )
    };

    return (
      <>
        <div>
          <CoverImage title="Contact Me!" />
          <br />
          <div className="content-wrapper medium-col content-text">
            <div className="contact-container">
              <div className="contact-left">
                <div className="markdown-text">
                  <h2>I would love to hear from you! </h2>Please fill up the contact form or contact me via the social media icons below. <br /><br />
                </div>
                {this.state.isSocialMediaLoaded
                  ? this.state.error
                    ? <div className="error-message">An error occured: {this.state.error.message} social medias links</div>
                    : <div className="social-media-icon-container">
                      {this.state.socialMedias.map(media => (
                        <a href={media.link} key={media.id}><img src={media.image} alt={media.name} /></a>
                      ))}
                      </div>
                  : <div className="spinner">
                      <div className="bounce1"></div>
                      <div className="bounce2"></div>
                      <div className="bounce3"></div>
                    </div>
                }
              </div>
              <div className="contact-right">
                <div className="contact-form-card">
                  <form>
                    <div className="form-inputs">
                      <label htmlFor="name"><p>Name:&nbsp;</p>{this.state.modifiedDataValidMessage.name.isValid ? "" : errorMessage("name")}</label>
                      <input
                        type="text"
                        name="name"
                        value={this.state.modifiedData.name}
                        onChange={this.handleInputChange}
                        className={this.state.modifiedDataValidMessage.name.isValid ? "" : "red-underline"}
                      />
                    </div>
                    <div className="form-inputs">
                      <label htmlFor="email"><p>Email:&nbsp;</p>{this.state.modifiedDataValidMessage.email.isValid ? "" : errorMessage("email")}</label>
                      <input
                        type="text"
                        name="email"
                        value={this.state.modifiedData.email}
                        onChange={this.handleInputChange}
                        className={this.state.modifiedDataValidMessage.email.isValid ? "" : "red-underline"}
                      />
                    </div>
                    <div className="form-inputs">
                      <label htmlFor="message"><p>Message:&nbsp;</p>{this.state.modifiedDataValidMessage.message.isValid ? "" : errorMessage("message")}</label>
                      <textarea
                        type="textarea"
                        name="message"
                        value={this.state.modifiedData.message}
                        onChange={this.handleInputChange}
                        className={this.state.modifiedDataValidMessage.message.isValid ? "" : "red-underline"}
                      >
                      </textarea>
                      <div className="form-submit-container">
                        {this.state.isSubmitSuccessful === 0
                          ? <div className="error-message submit-message">Failure! Try again later.</div>
                          : this.state.isSubmitSuccessful === 1
                            ? <div className="success-message submit-message">Success! Message sent.</div>
                            : this.state.isSubmitSuccessful === 0.5
                              ? <div className="spinner">
                                <div className="bounce1"></div>
                                <div className="bounce2"></div>
                                <div className="bounce3"></div>
                              </div>
                              : ""}
                        <input
                          type="button"
                          name="submitButton"
                          value="Submit"
                          onClick={this.handleSubmit}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Contact;