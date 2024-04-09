export async function fetchAllProducts() {
  try {
    //TODO: we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    console.log("Fetched Data", data); // Logging data instead of response.data

    return data;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw error;
  }
}

export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    console.log("Fetched Data", data);
    resolve({ data });
  });
}

export function createProduct(formData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/", {
      method: "POST",
      body: formData, // Pass FormData directly as the body
    });
    const data = await response.json(formData);
    resolve({ data });
  });
}

export async function updateProduct(update) {
  try {
    let bodyData;
    let headers = {};

    if (update instanceof FormData) {
      bodyData = update;
    } else {
      bodyData = JSON.stringify(update);
      headers = { "Content-Type": "application/json" };
    }

    const response = await fetch(
      `http://localhost:8080/products/${update.id}`,
      {
        method: "PATCH",
        body: bodyData,
        headers: headers,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update product with ID ${update.id}. Server responded with status ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating product with ID ${update.id}:`, error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const response = await fetch(`http://localhost:8080/products/${id}`, {
      method: "DELETE",
    });

    // Check if the response status indicates success
    if (response.ok) {
      // If the response is empty, return a success message
      if (response.status === 204) {
        console.log("Product deleted successfully.");
        return { success: true };
      }

      // If the response contains data, parse and return it
      const data = await response.json();
      console.log("Deleted Product:", data);
      return data;
    } else {
      // If the response status indicates an error, throw an error
      throw new Error(
        "Failed to delete product. Server responded with status: " +
          response.status
      );
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export function fetchProductsByFilters(filter, sort, pagination) {
  // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}
  // TODO : on server we will support multi values in filter
  // TODO : Server will filter deleted products in case of non-admin

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  console.log(pagination);
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
