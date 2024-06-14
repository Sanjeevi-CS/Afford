import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../Api/product";

function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    company: "AMZ",
    category: "Phone",
    minPrice: 1,
    maxPrice: 10000,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await getProducts(
          filters.company,
          filters.category,
          10,
          filters.minPrice,
          filters.maxPrice,
          "your-auth-token"
        );
        setProducts(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    if (name === "minPrice" && value < 1) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: 1,
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const rows = [];
  for (let i = 0; i < products.length; i += 4) {
    rows.push(products.slice(i, i + 6));
  }

  return (
    <div className="App">
      <div className="flex justify-center space-x-4 my-4">
        <div>
          <label htmlFor="company">Company:</label>
          <select
            id="company"
            name="company"
            value={filters.company}
            onChange={handleFilterChange}
          >
            <option value="AMZ">AMZ</option>
            <option value="FLP">FLP</option>
            <option value="MYN">MYN</option>
            <option value="SNP">SNP</option>
            <option value="AZO">AZO</option>
          </select>
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="Phone">Phone</option>
            <option value="Laptop">Laptop</option>
            <option value="Computer">Computer</option>
            <option value="TV">TV</option>
            <option value="Earphone">Earphone</option>
            <option value="Tablet">Tablet</option>
          </select>
        </div>
        <div>
          <label htmlFor="minPrice">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap justify-center space-x-4">
          {row.map((product) => (
            <Link
              key={product.id}
              to={{ pathname: `/product/${product.id}`, state: { product } }}
              className="card-link"
            >
              <div className="card text-gray-300 w-[clamp(260px,80%,300px)] hover:brightness-90 transition-all cursor-pointer group bg-gradient-to-tl from-gray-900 to-gray-950 hover:from-gray-800 hover:to-gray-950 border-r-2 border-t-2 border-gray-900 m-4 rounded-lg overflow-hidden relative">
                <div className="px-8 py-10">
                  <div className="bg-orange-500 w-10 h-10 rounded-full rounded-tl-none mb-4 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-red-900 transition-all"></div>
                  <div className="uppercase font-bold text-xl">
                    {product.productName}
                  </div>
                  <div className="text-gray-300 uppercase tracking-widest">
                    {product.rating}
                  </div>
                  <div className="text-gray-400 mt-8">
                    <p className="font-bold">${product.price}</p>
                    <p>Discount: {product.discount}%</p>
                    <p>Availability: {product.availability}</p>
                  </div>
                </div>
                <div className="h-2 w-full bg-gradient-to-l via-yellow-500 group-hover:blur-xl blur-2xl m-auto rounded transition-all absolute bottom-0"></div>
                <div className="h-0.5 group-hover:w-full bg-gradient-to-l via-yellow-950 group-hover:via-yellow-500 w-[70%] m-auto rounded transition-all"></div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default AllProducts;
