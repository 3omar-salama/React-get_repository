import React from "react";
import axios from "axios";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.css";
import "./Pagination.css";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [AllPages, setAllPages] = useState(0);
  const [data, setData] = useState([]);
  const PerPage = 10;

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  function getrepo() {
    axios
      .get(`https://api.github.com/users/${searchInput}/repos?per_page=1000`)
      .then((response) => {
        setData(response.data);
        setAllPages(Math.ceil(response.data.length / PerPage));
      });
  }

  const startIndex = currentPage * PerPage;
  const endIndex = startIndex + PerPage;
  const subset = data.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="container mt-5 mb-5">
        <div className="input-group mb-3">
          <input
            type="text"
            value={searchInput}
            onChange={handleChange}
            className="form-control form-control-lg"
            placeholder="Github Username"
          />
          <button onClick={getrepo} className="btn btn-success" type="submit">
            Get repository
          </button>
        </div>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Repository Name</th>
              <th scope="col">language</th>
              <th scope="col">size</th>
              <th scope="col">Stars</th>
              <th scope="col">Watchers</th>
              <th scope="col">Repository Link</th>
            </tr>
          </thead>
          <tbody>
            {subset.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.language}</td>
                <td>{item.size}</td>
                <td>{item.stargazers_count}</td>
                <td>{item.watchers_count}</td>
                <td>
                  <a
                    href={item.html_url}
                    target="_blank"
                    className="btn btn-info bg-info hover text-center bordered"
                  >
                    Go to the repo
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={AllPages}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Home;
