import Navbar from '../components/Navbar';
import Body from '../components/Body';
import Footer from '../components/Footer';
import Card from '../components/Card';

const Home = () => {
  return (
    <main>
      <Navbar />
      <section>
        <Body />
      </section>
      <section id="cardSection">
        <Card />
      </section>
      <section id="footerSection">
        <Footer />
      </section>
    </main>
  );
}

export default Home;
