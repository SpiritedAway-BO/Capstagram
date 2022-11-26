import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import HomeScreen from './components/Nav/HomeScreen.js';
import { AppProvider } from './contexts/AppContext.js';

const queryClient = new QueryClient();

App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <HomeScreen />
      </AppProvider>
    </QueryClientProvider>
  );
};

export default App;
