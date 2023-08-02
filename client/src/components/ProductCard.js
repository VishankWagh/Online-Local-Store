function ProductCard(props) {
    const { name, desc, price, qty } = props.prod;
    return (
        <>
            <div className="card col-3 m-3" style={{ width: "18rem" }}>
                <img src={props.imgUrl || "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg"} height="170px" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        <span className="prd-nm">{name.slice(0, 18)}<br />{name.slice(18, name.length)}</span>
                        <br />
                        <span className="offer-price price"><strike>&#8377; {price * 2}</strike></span>
                        <span className="price">&#8377; {price}</span>
                    </h5>
                    {/* <div className="shop-name" style={{ color: "grey", fontSize: "15px", paddingBottom: ".5rem" }}>{props.sname}</div> */}
                    <p className="card-text">{desc.slice(0, 25) + "..."}</p>
                    <a href={`/customer/product?sname=${props.sname}&pname=${name}`} className="btn">More Details</a>
                    <a className="btn addcartbtn" onClick={() => {
                        let citm = {
                            "prodName": name,
                            "qty": 1,
                            "price": price
                        }
                        props.addToCart(props.sname, citm);
                    }}>Add To Cart</a>
                </div>
            </div>
        </>
    );
}

export default ProductCard;