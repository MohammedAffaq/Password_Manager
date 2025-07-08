import Footer from "./components/Footer";
import Manager from "./components/Manager";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="absolute -z-10 min-h-screen w-full bg-green-100">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(56,154,82,0.73)] opacity-50 blur-[80px]"></div>
        <Navbar />
        <Manager />
        <Footer />
      </div>
    </>
  );
}

export default App;
