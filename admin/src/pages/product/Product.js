import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import PublishIcon from '@mui/icons-material/Publish';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import app from "../../firbase";

export default function Product() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);
    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
  
    const product = useSelector((state) =>
    state.product.products.find((product) => product?._id === productId) || {}
);

    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      };

      const handleClick = (e) => {
        e.preventDefault();

        if(file){
            console.log(file)
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              const newProduct = { ...inputs, image: downloadURL };
              updateProduct(productId, newProduct, dispatch);
            });
          }
        );
        }else{
                const newProduct = { ...inputs, image: product.image };
                updateProduct(productId, newProduct, dispatch);
        }
      };
  
    const MONTHS = useMemo(
      () => [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Agu",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      []
    );
  
    useEffect(() => {
      const getStats = async () => {
        try {
          const res = await userRequest.get("order/income?pid=" + productId);
          const list = res.data.sort((a,b)=>{
              return a._id - b._id
          })
          list.map((item) =>
            setPStats((prev) => [
              ...prev,
              { name: MONTHS[item._id - 1], Sales: item.total },
            ])
          );
        } catch (err) {
          console.log(err);
        }
      };
      getStats();
    }, [productId, MONTHS]);
  
    return (
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Product</h1>
          <Link to="/newproduct">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
        <div className="productTop">
          <div className="productTopLeft">
            <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
          </div>
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src={product.image} alt="" className="productInfoImg" />
              <span className="productName">{product.title}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">Id:</span>
                <span className="productInfoValue">{product._id}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">In Stock:</span>
                <span className="productInfoValue">{product.inStock ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>Product Name</label>
              <input 
               type="text" 
               placeholder={product.title}
               name="title"
               onChange={handleChange}
              />
              <label>Product Description</label>
              <input 
              type="text" 
              placeholder={product.description}
              name="description"
              onChange={handleChange}
              />
              <label>Price</label>
              <input 
              type="number" 
              placeholder={product.price} 
              name="price"
              onChange={handleChange}
              />
              <label>In Stock</label>
              <select name="inStock" id="idStock" onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="productFormRight">
              <div className="productUpload">
                <img src={product.image} alt="" className="productUploadImg" />
                <label for="file">
                  <PublishIcon />
                </label>
                <input type="file" id="file" style={{display: "none"}}
                onChange={(e) => setFile(e.target.files[0])}/>
              </div>
              <button className="productButton" onClick={handleClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    );
  }