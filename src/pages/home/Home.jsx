import Categories from "../../components/home/Categories";
import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="mt-[50px]">
        <Slider />
      </div>
      <div className="container mt-10">
        <Categories />
      </div>
    </>
  );
};

export default Home;
