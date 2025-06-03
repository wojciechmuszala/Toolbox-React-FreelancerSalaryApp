import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserInputs from "./components/UserInputs";

function App() {
  return (
    <div className='min-h-screen bg-background text-text font-sans'>
      <Header />

      <main className='p-6 max-w-3xl mx-auto space-y-6'>
        <UserInputs />
        <button className='btn-primary mx-auto'>Oblicz</button>
      </main>

      <Footer />
    </div>
  );
}

export default App;
