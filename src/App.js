import React from 'react';
//import logo from './logo.svg';
import './App.css';

import { Apps } from 'cognitive-tools-luis-conversation-apps';


class AppItem extends React.Component {
	render() {
  	const app = this.props;
  	return (
        <tr >
          <td>{app.name}</td><td>{app.culture}</td><td>{app.createdDateTime}</td><td>{app.endpointHitsCount}</td><td>{app.activeVersion}</td>
        </tr>
    );
  }
}

const AppList = (props) => (
  
	<div>
    <span>AppList</span>
    <table border="1">
    {props.apps.map(app => <AppItem key={app.id} {...app}/>)}
    </table>
	</div>
);

class Form extends React.Component {
  state = { 
    key: "",
    endpoint: "westus.api.cognitive.microsoft.com" 
  };
	handleSubmit = async (event) => {

    console.log("handleSubmit");
    event.preventDefault();
    
    // TBD - get list from service
    this.props.onSubmit(this.state.key, this.state.endpoint);


    this.setState({key:'',endpoint:'westus.api.cognitive.microsoft.com'})
  };
	render() {
  	return (
    	<form onSubmit={this.handleSubmit}>
        <div>
        <input 
          size="50"
          type="text" 
          value={this.state.key}
          onChange={event => this.setState({ key: event.target.value })}
          placeholder="LUIS Auth Key" 
          
        /></div>
        <div><input 
          size="50"
          type="text" 
          value={this.state.endpoint}
          onChange={event => this.setState({ endpoint: event.target.value })}
          placeholder="LUIS Auth Endpoint" 
          
        />
        </div>
        <button>Get List</button>
    	</form>
    );
  }
}

class App extends React.Component {

  state = {
    luisapps: []
  };

  // TBD: fix this
  getAppsList =  async (key, endpoint) => {
    console.log(`key = ${key}`);
    console.log(`endpoint = ${endpoint}`);

    const apps = new Apps();
    const list = await apps.list(key, endpoint);

    console.log(`remote list = ${JSON.stringify(this.state.luisapps)}`);

    this.setState(prevState => ({
      luisapps: [...prevState.luisapps, ...JSON.parse(list)]
    }));
    console.log(`new state length= ${this.state.luisapps.length}`);
    console.log(`new state = ${JSON.stringify(this.state.luisapps)}`);
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <Form onSubmit={this.getAppsList} /><hr/>
            <AppList apps={this.state.luisapps} />
          </header>
        </div>
        
      );
    }
}

export default App;
