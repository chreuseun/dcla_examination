import React from 'react';
import 'typeface-roboto';
import { BrowserRouter , Switch, Route } from 'react-router-dom';

// Pages Login
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Main from './components/pages/Main';
import Result from './components/pages/Result';
import Exams from './components/pages/Exams';
import Quiz from './components/pages/Quiz';

import 'semantic-ui-css/semantic.min.css'


const App = () => {
  return (
      // <Sample/>

      <BrowserRouter>


        <Switch>

          <Route 
            exact path="/" 
            render={(props) => 
              <Login {...props} />
            }
          />

          <Route 
            exact path="/signup" 
            render={(props) => 
              <Signup {...props} />
            }
          />

          <Route 
            exact path="/main" 
            render={(props) => 
              <Main {...props} />
            }
          />

          <Route
            exact path="/results" 
            render={(props) => 
              <Result {...props} />
            }
          />


          <Route
            exact path="/results/:studentId" 
            render={(props) => 
              <Exams {...props} />
          }
          />

          <Route
            exact path="/results/:studentId/:quizId" 
            render={(props) => 
              <Quiz {...props} />
          }
          />


        </Switch>

      </BrowserRouter>

      
  );
}




export default App;
