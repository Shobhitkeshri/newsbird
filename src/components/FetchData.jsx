import React, { useEffect, useState } from "react";
import axios from "axios";



const FetchData = ({ cat }) => {
  const [Data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        cat
          ? `https://newsapi.org/v2/top-headlines?country=us&category=${cat}&apiKey=${process.env.REACT_APP_API_KEY}`
          : `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_API_KEY}`
      );
      if (response.data.status === "ok") {
        setData(response.data.articles);
      } else {
        console.error("API Error: ", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching data: ", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cat]);

  return (
    <div className="container my-4">
      <h3>
        <u>TOP HEADLINES</u>
      </h3>
      <div
        className="container d-flex justify-content-center align-items-center flex-column my-3"
        style={{ minHeight: "100vh" }}
      >
        {Data.length > 0
          ? Data.map((items, index) => (
              <div
                key={index}
                className="container my-3 p-3"
                style={{
                  width: "600px",
                  boxShadow: "2px 2px 10px silver",
                  borderRadius: "10px",
                }}
              >
                <h5 className="my-2">{items.title}</h5>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    src={items.urlToImage}
                    alt="image not found"
                    className="img-fluid"
                    style={{
                      width: "100%",
                      height: "300px",
                      objectFit: "cover",
                    }}
                  />
                </div>

                <p className="my-1">{items.content}</p>
                <a href={items.url} target="_blank" rel="noopener noreferrer">
                  View More
                </a>
              </div>
            ))
          : "LOADING..."}
      </div>
    </div>
  );
};

export default FetchData;
//`https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=${process.env.REACT_APP_API_KEY}`
      //     : `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY}`
      // );