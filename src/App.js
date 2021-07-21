import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header/index';
import Content from './Content/index';
import Footer from './Footer/index';

const App = () => (
    <Router>
    <div className="App">
            <Header />
            <Content />
            <Footer />
    </div>
    </Router>
    
);

export default App;