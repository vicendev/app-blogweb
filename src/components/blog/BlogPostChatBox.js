import React, {Component} from 'react'

export class BlogPostChatBox extends Component {

  // CARGAR CAJA DE COMENTARIOS CUANDO COMPONENTE SE MONTE
  constructor () {
    super();
  }

  componentDidMount() {

    if (window.FB) {
      window.FB.XFBML.parse();
    }

    window.fbAsyncInit = function() {
        window.FB.init({
            appId             : '690323478217593',
            cookie            : true,  // enable cookies to allow the server to access the session
            autoLogAppEvents  : true,
            xfbml             : true,  // parse social plugins on this page
            version           : 'v10.0' // use version 10.0
        });
    };

    //Load the SDK asynchronously
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  componentDidUpdate() {
    window.FB.XFBML.parse();
  }

  render(){
    return (
      <>
        <div className="fb-comments" data-href={`http://localhost:3000/blog/post/${this.props.id}`} data-width="700" data-numposts="5"></div>
      </>
    )
  }
}
