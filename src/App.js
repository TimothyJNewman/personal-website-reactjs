import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from "@apollo/react-hooks";
import client from "./Util/ApolloClient";
import Header from './Header/index';
import Content from './Content/index';
import Footer from './Footer/index';

const App = () => (
    <Router>
        <ApolloProvider client={client}>
        <div className="App">
            <Header />
            <Content />
            <Footer />
        </div>
        </ApolloProvider>
    </Router>

);

export default App;