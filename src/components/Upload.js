import {useRef, useState} from 'react';

function Upload({uploadMsg, uploadProduct}) {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const nameVal = useRef();
    const quantityVal = useRef();
    const priceVal = useRef();

    function upload() {
        uploadProduct(name, quantity, price);
        nameVal.current.value = '';
        quantityVal.current.value = '';
        priceVal.current.value = '';
    }

    return (
        <div className="pt-50 mb-100">
            <h2 className="text-center">Upload form</h2>
            <div className="upload-form">
                <input ref={nameVal} type="text" placeholder="Name" onChange={() => setName(nameVal.current.value)}/>
                <input ref={quantityVal} type="number" placeholder="Quantity"
                       onChange={() => setQuantity(quantityVal.current.value)}/>
                <input ref={priceVal} type="number" placeholder="price"
                       onChange={() => setPrice(priceVal.current.value)}/>
                {!!uploadMsg ? <div className="text-center h-30">{uploadMsg}</div> : <div className="h-30"></div>}
                <button className="btn-submit" onClick={upload}>Submit</button>
            </div>
        </div>
    );
}

export default Upload;