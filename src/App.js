import { TaskProvider } from './context/TaskContext';
import Routers from './route/routers';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import MainLayout from './MainLayout/MainLayout';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <MainLayout>
          <Routers />
        </MainLayout>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;
