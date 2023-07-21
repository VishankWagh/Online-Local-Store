function ShopCard() {
    return (
        <>
            <div className="shop-comp mr-1 mb-5 col-3">
                <div className="card" style={{ width: "18rem" }}>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3n1hDUr-6ZnNqdbLgmy8-2YELpShpwq-iyA&usqp=CAU" className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Shop Name</h5>
                        <p className="card-text">Some quick example text to build on the card title.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Reviews ****</li>
                        <li className="list-group-item">A second item</li>
                        <li className="list-group-item">A third item</li>
                    </ul>
                    <div className="card-body">
                        <a href="/" className="card-link">Card link</a>
                        <a href="/" className="card-link">Another link</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShopCard;