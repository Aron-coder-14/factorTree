
import './App.css';
import FactorTree from './components/FactorTree/FactorTree';

function App() {
  return (
    <div>
      <FactorTree/>
    </div>
  );
}
const factorTreedata = {
  root:{
    value: 360,
    left: {
      value: 2,
    },
    right: {
      value: 180,
      left: {
        value: 2,
      },
      right: {
        value: 90,
        left: {
          value: 2
        },
        right: {
          value: 45,
          left: {
            value: 5
          },
          right: {
            value: 9,
            left: {
              value: 3
            },
            right: {
              value: 3,
            }
          }
        }
      }
      
    }
  }
}
export default App;
 