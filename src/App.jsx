import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import UserInputs from "./components/UserInputs";
import Results from "./components/Results";
import { calculateEarnings } from "./utils/calculateEarnings";

function App() {
  const [userData, setUserData] = useState({});

  return (
    <div className='min-h-screen bg-background text-text font-sans'>
      <Header />

      <main className='p-6 max-w-3xl mx-auto space-y-6'>
        <UserInputs onSetUserData={setUserData} />
        <button
          className='btn-primary mx-auto'
          onClick={() => {
            const results = calculateEarnings(userData);
            console.log(results);
          }}>
          [TEST] Pokaż dane
        </button>
        <Results userData={userData} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
