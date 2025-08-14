import PopularMovies from "../../components/home/PopularMovies";
import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";
import MoviesSection from "../../components/home/MoviesSection";
import RecommendedMovies from "../../components/home/RecommendedMovies";

const Home = () => {
  return (
    <>
      <Nav />
      <div className="mt-[50px]">
        <Slider />
      </div>
      <div className="container py-16 space-y-16">
        <PopularMovies />
        <RecommendedMovies />
        <MoviesSection />
      </div>
    </>
  );
};

export default Home;
