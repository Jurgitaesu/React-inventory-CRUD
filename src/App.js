import Products from "./components/Products";
import Upload from "./components/Upload";
import {useState, useEffect} from 'react';

function App() {
    const [addProduct, setAddProduct] = useState(false);
    const [infoMsg, setInfoMsg] = useState("");
    const [uploadMsg, setUploadMsg] = useState("");
    const [inventory, setInventory] = useState([]);

    useEffect(() => {
        setAddProduct(false);
        showInventory();
    }, [addProduct]);

    function showInventory() {
        setTimeout(function () {
            setInfoMsg('');
            setUploadMsg('');
        }, 3500);
        fetch('http://localhost:3005/show')
            .then(res => res.json())
            .then(data => {
                setInventory(data.inventory);
            })
    }

    function uploadProduct(name, quantity, price) {
        const product = {
            name,
            quantity,
            price
        }
        fetch('http://localhost:3005/add', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                setAddProduct(data.success);
                setUploadMsg(data.message);
            })
    }

    function reduceQuantity(id) {
        fetch(`http://localhost:3005/reduce/${id}`)
            .then(res => res.json())
            .then(data => {
                setInfoMsg(data.message);
                showInventory();
            })
    }

    function addQuantity(id) {
        fetch(`http://localhost:3005/add/${id}`)
            .then(res => res.json())
            .then(data => {
                setInfoMsg(data.message);
                showInventory();
            })
    }

    function deleteProduct(id) {
        fetch(`http://localhost:3005/delete/${id}`)
            .then(res => res.json())
            .then(data => {
                setInfoMsg(data.message);
                showInventory();
            })
    }

    return (
        <div className="App">
            <Products
                infoMsg={infoMsg}
                inventory={inventory}
                reduceId={reduceQuantity}
                addId={addQuantity}
                deleteId={deleteProduct}/>
            <Upload
                uploadMsg={uploadMsg}
                uploadProduct={uploadProduct}/>
        </div>
    );
}

export default App;
