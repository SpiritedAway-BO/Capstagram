import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import HomeScreen from './components/Nav/HomeScreen.js';

const queryClient = new QueryClient();

App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomeScreen/>
    </QueryClientProvider>
  );
};

export default App;
