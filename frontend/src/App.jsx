import "./App.css";
import logo from "./assets/IMBD_logo.png";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import star from "./assets/star.jpg";
import alt from "./assets/alt.png";

function App() {
    const [data, setData] = useState([]);
    const [userReview, setUserReview] = useState("");

    let DEFAULT_IMG = alt;

    const handleSubmitReview = () => {
        fetch("http://127.0.0.1:8080/predict", {
            method: "POST",
            body: JSON.stringify({ text: userReview }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            });
    };

    useEffect(() => {
        Papa.parse("/src/MovieGenre.csv", {
            header: true,
            download: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function (results) {
                setData(results.data.slice(0, 100));
            },
            error: function (error) {
                console.error("Error parsing CSV:", error);
            },
        });
    });

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div>
            <div className="navbar">
                <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="movieDetails">
                <Slider {...settings} className="sliderOfMovie">
                    {data?.map((item) => {
                        return (
                            <div key={item.imdbId} className="movieBox">
                                <div className="movieTitleAndRating">
                                    <p className="movieTitle">{item.Title}</p>
                                    <div className="IMDbRating">
                                        <p className="IMDbRatingTitle">
                                            {" "}
                                            IMDb RATING
                                        </p>
                                        <div className="actualRatingDiv">
                                            <img
                                                className="starOfRating"
                                                src={star}
                                                alt="star"
                                            />
                                            <p className="actualIMDbRating">
                                                {item["IMDB Score"]}{" "}
                                                <span className="outOfTen">
                                                    /10
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mainContentOfMovie">
                                    <img
                                        className="moviePoster"
                                        src={item.Poster}
                                        onError={(e) => {
                                            e.target.src = DEFAULT_IMG;
                                        }}
                                        alt={alt}
                                    />
                                    <div className="genreAndUserInput">
                                        <div className="movieGenre">
                                            {item.Genre.split("|").map(
                                                (genre, index) => {
                                                    return (
                                                        <p
                                                            className="displayMovieGenre"
                                                            key={index}
                                                        >
                                                            {genre}
                                                        </p>
                                                    );
                                                }
                                            )}
                                        </div>
                                        <div className="movieReviewInputDiv">
                                            <p>
                                                Enter Your Review for The Movie
                                            </p>
                                            <textarea
                                                className="movieReviewUserInput"
                                                onChange={(e) => {
                                                    setUserReview(
                                                        e.target.value
                                                    );
                                                }}
                                            />
                                            <button
                                                className="submitUserReview"
                                                onClick={handleSubmitReview}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="movieBoxBackground"
                                    style={{
                                        backgroundImage: `url(${item.Poster})`,
                                    }}
                                ></div>
                                <div className="movieBoxOverlay"></div>
                            </div>
                        );
                    })}
                </Slider>
                <div className="output-container"></div>
            </div>

            <div className="footer">
                <p>About the Project</p>
                <p>socials</p>
            </div>
        </div>
    );
}

export default App;

{
    /* <br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<div className="slider-controls">
    <button
        onClick={() => {
            goToSlide(currentSlide - 1);
            console.log("clicked");
        }}
    >
        Previous
    </button>
    <button
        onClick={() => {
            goToSlide(currentSlide + 1);
            console.log("clicked");
        }}
    >
        Next
    </button>
</div> */
}
