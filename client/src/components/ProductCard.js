import { Link } from "react-router-dom";

function ProductCard(props) {
    const { name, desc, price, qty, reviews } = props.prod;

    function createStars(stars) {
        console.log("str " + stars);
        return Array.from({ length: 5 }, (_, index) => {
            stars--;
            return stars >= 0 ? <span key={index}>&#9733;</span> : <span key={index}>&#9734;</span>;
        });
    }

    function getAvgRatings() {
        let avg = 0;
        let n = 0;
        reviews?.map((rv) => {
            avg += rv.rating;
            n++;
        })
        console.log("rat " + n);
        return avg / n;
    }

    return (
        <>
            <div className="card col-3 m-2" style={{ width: "19.5rem" }}>
                <img src={props.imgUrl || "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?cs=srgb&dl=pexels-math-90946.jpg&fm=jpg"} height="170px" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">
                        {/* <span className="prd-nm">{name.slice(0, 18)}<br />{name.slice(18, name.length)}</span> */}
                        <span className="prd-nm">
                            {name.replace("-", ' ')}
                            {name.length < 23 && <br />}
                        </span><span className="ratings r-rate">
                            {createStars(getAvgRatings())}
                        </span>
                        <br />
                        <span className="offer-price price"><strike>&#8377; {price * 2}</strike></span>
                        <span className="price">&#8377; {price}</span>
                    </h5>
                    {/* <div className="shop-name" style={{ color: "grey", fontSize: "15px", paddingBottom: ".5rem" }}>{props.sname}</div> */}
                    <p className="card-text">{desc.slice(0, 25) + "..."}</p>
                    <Link to={`/customer/product?sname=${props.sname}&pname=${name}`} className="btn">More Details</Link>
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