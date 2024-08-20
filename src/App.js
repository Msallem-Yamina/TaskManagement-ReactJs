import { TaskProvider } from './context/TaskContext';
import Routers from './route/routers';
import { BrowserRouter as Router } from 'react-router-dom';
import './i18n';
import MainLayout from './MainLayout/MainLayout';

function App() {
  return (
    <TaskProvider>
      <Router basename="/TaskManagement-ReactJs">
        <MainLayout>
          <Routers />
        </MainLayout>
      </Router>
    </TaskProvider>
  );
}

export default App;
