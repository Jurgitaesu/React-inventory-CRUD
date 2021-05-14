function Products({infoMsg, inventory, reduceId, addId, deleteId}) {
    return (
        <div className="pt-50">
            <h2 className="text-center">Warehouse inventory</h2>
            {!!infoMsg ? <div className="text-center h-30">{infoMsg}</div> : <div className="h-30"></div>}
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {inventory.map(product =>
                    <tr key={product._id}>
                        <td>{product.name}</td>
                        <td className="text-center">
                            <button onClick={() => reduceId(product._id)}>-</button>
                            {product.quantity}
                            <button onClick={() => addId(product._id)}>+</button>
                        </td>
                        <td>{product.price} €</td>
                        <td>{product.quantity * product.price} €</td>
                        <td className="text-center" onClick={() => deleteId(product._id)}><i
                            className="fas fa-trash-alt"></i></td>
                    </tr>
                )}

                </tbody>
            </table>
        </div>
    );
}

export default Products;