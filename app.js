// event listeners to the buttons
document.getElementById("aboveAverage").addEventListener("click", () => {
  aboveAverage();
});

document.getElementById("highestRating").addEventListener("click", () => {
  displayTopProducts();
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
