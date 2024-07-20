import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [price, setPrice] = useState(0);
  const [id, setId] = useState(0);
  const getProducts = async () => {
    let resp = await axios.get("https://api.escuelajs.co/api/v1/products");
    setProducts(resp.data);
    // console.log(products);
  };

  const productEdit = async (id) => {
    let resp = await axios.get(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    setId(id);
    document.getElementById('name').value=(resp.data.title);
    document.getElementById('price').value=(resp.data.price);
  };
  const productDelete = async (id) => {
    let resp = await axios.delete(
      `https://api.escuelajs.co/api/v1/products/${id}`
    );
    console.log(resp.data);
    getProducts();
  };
  const save = async () => {
    let data = {
      title: name,
      price: price,
      description: "A description",
      categoryId: 1,
      images:[image],
    };
    console.log(data);
    let resp = await axios.post(
      `https://api.escuelajs.co/api/v1/products/`,
      data
    );
    localStorage.setItem("products", JSON.stringify(products));
    console.log(resp.data);
    getProducts();
  };
  const update = async () => {
    let data = {
      title: name,
      price: price,
      images:[image],  
     
     
    };
    console.log(data);
    let resp = await axios.put(
      `https://api.escuelajs.co/api/v1/products/${id}`,
      data
    );
    console.log(resp.data);
    getProducts();
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <input
        type="text"
        placeholder="enter name"
        id="name"
        onKeyUp={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        id="price"
        placeholder="enter price"
        onKeyUp={(e) => setPrice(e.target.value)}
      />
       <input
        type="text"
        id="image"
        placeholder="enter image"
        onKeyUp={(e) => setImage(e.target.value)}
      />
      <button onClick={() => save()}>Save</button>
      <button onClick={() => update()}>Update</button>
      <table border={1} width={`100%`}>
        <tr>
          <th>Name</th>
          <th>image</th>
          <th>price</th>
          <th>action</th>
        </tr>
        {products.map((product) => (
          <tr key={product.id}>
            <th>{product.title}</th>
            <th>
              <img src={product.images[0].replace(/[\[\]\"']+/g,'')} width={150} height={150} />
              
            </th>
            <th>{product.price}</th>
            <th>
              <button onClick={() => productEdit(product.id)}>Edit</button>
              <button onClick={() => productDelete(product.id)}>Delete</button>
            </th>
          </tr>
        ))}
      </table>
    </>
  );
}

export default App;
