import PropTypes from "prop-types";
import style from "./TrendingCards.module.css";
import Loading from "./Loading";
import { FaStar } from "react-icons/fa";

import { Link } from "react-router-dom";

const TrendingCard = ({ trending }) => {
  TrendingCard.propTypes = {
    trending: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        original_title: PropTypes.string,
        name: PropTypes?.string,
        overview: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        media_type: PropTypes.string,
      })
    ),
    handleMovies: PropTypes.func,
    handleTvs: PropTypes.func,
  };

  return (
    <>
      {!trending || trending.length === 0 ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Loading type="spinningBubbles" color="black" />
        </div>
      ) : (
        <div>
          <div className={style.container_trending}>
            {trending.map((item) => {
              const isMovie = item.title ? true : false;
              return (
                <div key={item.id} className={style.container_trending_card}>
                  {/* ?ismovie=${isMovie} */}
                  <Link to={`/peliculadetalle/${item.id}?ismovie=${isMovie}`}>
                  <div className={style.container_trending_card_img}>
                    <img
                      className={style.trending_card_img}
                      src={`${import.meta.env.VITE_IMAGE_URL}${
                        item.poster_path
                      }`}
                      alt={item.original_title || item.name}
                    />
                    <div className={style.trending_card_valoration}>
                      <FaStar color="yellow" />
                      {item.vote_average.toFixed(2)}
                    </div>

                  </div>
                  </Link>
                  {/* titulo */}
                  
                  <h3 className={style.trending_card_title}>
                    {item.original_title || item.name}
                  </h3>

                  <h5>{item.release_date || item.first_air_date}</h5>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default TrendingCard;
