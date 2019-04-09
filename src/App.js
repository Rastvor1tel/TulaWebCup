import React, {Component} from 'react';
//import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function http_build_query( formdata, numeric_prefix, arg_separator ) {
    var key, use_val, use_key, i = 0, tmp_arr = [];

    if(!arg_separator){
        arg_separator = '&';
    }

    for(key in formdata){
        use_key = escape(key);
        use_val = escape((formdata[key].toString()));
        use_val = use_val.replace(/%20/g, '+');

        if(numeric_prefix && !isNaN(key)){
            use_key = numeric_prefix + i;
        }
        tmp_arr[i] = use_key + '=' + use_val;
        i++;
    }

    return '?' + tmp_arr.join(arg_separator);
}

class App extends Component {
    render() {
        return (
            <div className="App">

            </div>
        );
    }
}

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authLink: 'https://oauth.yandex.ru/authorize',
            clientID: 'd29cd449eb8e40069ce5d5c0b52fdcdb',
            callback: 'http://localhost:3000',
            responce: 'code',
            scope: 'login:birthday login:email login:info',
            clientPass: 'aa9c780d007e4a468451ca765862ba82',
            grant_type: 'authorization_code'
        };
    }

    componentDidMount() {
        this.buildAuthBlock();
    }

    buildAuthBlock() {

        var code = new URLSearchParams(window.location.search).get('code');

        // #TODO Написать обработчик кода для GET

        if (code) {

        } else {
            var authQuery = http_build_query({client_id: this.state.clientID, redirect_uri: this.state.callback, response_type: this.state.responce, scope: this.state.scope});
            this.setState({
                authBlock: this.state.authLink + authQuery
            });
        }

    }

    render() {
        return (
            <React.Fragment>
                <div className="header-logo">
                    <div className="header-logo__image">
                        <img src={logo} alt="" />
                    </div>
                    <div className="header-logo__body">
                        <div className="header-logo__title">React-проект для TulaWebCup</div>
                        <div className="header-logo__descriptor">Максим Рожков</div>
                    </div>
                </div>
                <div className="header-auth">
                    <a href={this.state.authBlock}>Авторизоваться</a>
                </div>
            </React.Fragment>
        );
    }

}


export {App, Header};
