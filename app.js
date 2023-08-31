// event listeners to the buttons
document.getElementById("aboveAverage").addEventListener("click", () => {
  aboveAverage();
});

document.getElementById("highestRating").addEventListener("click", () => {
  displayTopProducts();
})

document.getElementById("distinctCategories").addEventListener("click", () => {
  distinctCategories();
})

document.getElementById("averagePR").addEventListener("click", () => {
  averagePR();
})

document.getElementById("lowestPrice").addEventListener("click", () => {
  displayLowPriceP();
})

// FUNCTION FOR LISTING ALL PRODUCTS WITH ABOVE AVERAGE PRICE
const aboveAverage = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    const averagePrice = products.reduce((sum, product) => sum + product.price, 0) / products.length;

    let table = `
      <table>
        <thead>
          <tr><th>All the Products with above average price. </th></tr>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
    `;

    products.forEach(product => {
      if (product.price > averagePrice) {
        table += `
          <tr>
            <td>${product.id}</td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td><img src="${product.image}" alt="${product.title}" width="70"></td>
          </tr>
        `;
      }
    });

    table += `
        </tbody>
      </table>
    `;

    document.getElementById("highPriceProducts").innerHTML = table;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
       /* ************************************************************************ */

// FUNCTION FOR LISTING THE TOP 5 PRODUCTS WITH HIGHEST RATING
const highestRating = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    // Sort the products by rating in descending order
    const sortedProducts = products.sort((a, b) => b.rating.rate - a.rating.rate);

    // Get the top 5 products with the highest rating
    const top5Products = sortedProducts.slice(0, 5);

    return top5Products;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const displayTopProducts = async () => {
  const topProducts = await highestRating();

  let table = `
    <table>
      <thead>
      <tr><th>The top 5 products with the highest rating. </th></tr>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
  `;

  topProducts.forEach(product => {
    table += `
      <tr>
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>$${product.price}</td>
        <td>${product.rating.rate} (${product.rating.count} reviews)</td>
        <td><img src="${product.image}" alt="${product.title}" width="70"></td>
      </tr>
    `;
  });

  table += `
      </tbody>
    </table>
  `;

  document.getElementById("topProductsList").innerHTML = table;
};
      /* ********************************************************************** */
// FUNCTION FOR LISTING ALL DISTINCT CATEGORIES
const distinctCategories = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    const categoriesSet = new Set();
    products.forEach(product => {
      categoriesSet.add(product.category);
    });

    let table = `
      <table>
        <thead>
          <tr><th>All the Distinct Categories</th></tr>
          <tr>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
    `;

    categoriesSet.forEach(category => {
      table += `
        <tr>
          <td>${category}</td>
        </tr>
      `;
    });

    table += `
        </tbody>
      </table>
    `;

    document.getElementById("allCategories").innerHTML = table;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
      /* **************************************************************** */
// FUNCTION TO PRINT THE AVERAGE PRICE AND RATING OF THE PRODUCTS.
const averagePR = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    const averagePrice =
      products.reduce((sum, product) => sum + product.price, 0) / products.length;

    const totalRatings = products.reduce((sum, product) => sum + product.rating.rate, 0);
    const averageRating = totalRatings / products.length;

    let table = `
      <table>
        <thead>
        <tr>
          <th colspan="5">The average price and rating of the products.</th>
        </tr>
          <tr><th>Average Price: ${averagePrice.toFixed(2)}</th></tr>
          <tr><th>Average Rating: ${averageRating.toFixed(2)}</th></tr>
        </thead>
      </table>
    `;

    document.getElementById("aPriceRating").innerHTML = table;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
       /* ****************************************************** */
// FUNCTION TO LIST THE TOP 5 PRODUCTS WITH HIGHEST RATING AND LOWEST PRICE
const lowestPrice = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();

    // Sort the products by rating in descending order and then by price in ascending order
    const sortedProducts = products.sort((a, b) => {
      if (b.rating.rate !== a.rating.rate) {
        return b.rating.rate - a.rating.rate;
      } else {
        return a.price - b.price; // Sort by price in ascending order if ratings are the same
      }
    });

    // Get the top 5 products with the highest rating and lowest price
    const low5Products = sortedProducts.slice(0, 5);

    return low5Products;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const displayLowPriceP = async () => {
  const lowPriceP = await lowestPrice();

  let table = `
    <table>
      <thead>
        <tr>
          <th colspan="5">The top 5 products with the highest rating and lowest price</th>
        </tr>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Price</th>
          <th>Rating</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
  `;

  lowPriceP.forEach(product => {
    table += `
      <tr>
        <td>${product.id}</td>
        <td>${product.title}</td>
        <td>${product.price}</td>
        <td>${product.rating.rate} (${product.rating.count} reviews)</td>
        <td><img src="${product.image}" alt="${product.title}" width="70"></td>
      </tr>
    `;
  });

  table += `
      </tbody>
    </table>
  `;

  document.getElementById("topLowestList").innerHTML = table;
};
