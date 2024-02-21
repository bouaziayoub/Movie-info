import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";
import { MovieGallery } from "../export";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiKey = "192e0b9821564f26f52949758ea3c473&language=es-MX";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  return (
    <>
      <div className="container-home">
        {movies.length > 0 && (
          <div className="movie-details">
            <div
              className="fullscreen-bg"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movies[currentIndex].poster_path})`,
              }}
            ></div>
            <div className="movie-info">
              <h2>{movies[currentIndex].title}</h2>
              <p> {movies[currentIndex].release_date}</p>
              <p>{movies[currentIndex].overview}</p>
            </div>
          </div>
        )}
      </div>
      <MovieGallery />
    </>
  );
}

export default HomePage;
