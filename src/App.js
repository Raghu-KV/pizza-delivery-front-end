import Footer from "./components/Footer";
import Header from "./components/Header";
import ProductList from "./components/ProductList";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <div className="container">
          <ProductList />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
