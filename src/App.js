import React, { useState, useEffect } from "react";
import "./App.css";
import { ReactTyped } from "react-typed";

const API_URL = "https://gorest.co.in/public/v2/users";

export default function Fetch() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(API_URL);
      const posts = await response.json();
      setPosts(posts);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="mx-auto p-4 bg-[#0E0E0E] min-h-screen w-full sm:min-h-screen md:min-h-screen relative">
      <div className="mt-[10%] mb-[5%] mx-5">
        <div className="max-h-[50vh] sm:max-h-[40vh] md:max-h-[30vh] lg:max-h-[20vh] overflow-hidden">
          <ReactTyped
            strings={["UASC INTERNSHIP"]}
            typeSpeed={100}
            backSpeed={120}
            className="bg-transparent text-6xl sm:text-4xl md:text-5xl xl:text-7xl font-tiny5 mt-3 mx-2 mb-4 text-[#F9CE46] overflow-clip"
            loop
          ></ReactTyped>
        </div>

        <p className="text-white text-sm sm:text-[14px] md:text-[14px] xl:text-lg font-light text-justify my-4 mx-2">
          The aim/goal of the task in the image is to create a single page
          application (SPA) using the React JS framework to display a users page
          with Create, Read, and Search functionalities. The data for the users
          page will be retrieved from a public API (https://gorest.co.in/).
        </p>
        <div className="relative mb-4 mt-6 mx-2 flex items-center">
          <input
            type="text"
            placeholder="Search by name or email"
            className="text-white p-2 pl-4 border border-white rounded-full bg-transparent w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
          {currentPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 border rounded shadow border-white bg-[#765DD2]"
            >
              <h2 className="text-xl font-semibold text-[#F9CE46]">
                {post.name}
              </h2>
              <p className="text-gray-300">{post.email}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 border rounded ${
                currentPage === index + 1
                  ? "bg-[#F9CE46] text-[#0E0E0E]"
                  : "bg-[#0E0E0E] text-[#F9CE46]"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-10 mb-0 bg-[#0E0E0E]">
        <p className="text-white text-[10px] sm:text-[8px] md:text-[8px] xl:text-[10px] font-light text-center">
          Courtesy of Amelia Zakiya Sabrina | 23523099
        </p>
      </div>
    </div>
  );
}
